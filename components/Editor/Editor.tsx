"use client";

import React, { useRef, useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { indentUnit } from "@codemirror/language";
import type { EditorView } from "@codemirror/view";
import type { ViewUpdate } from "@codemirror/view";
import { vim } from "@replit/codemirror-vim";
import LanguageSelector from "./LanguageSelector/LanguageSelector";
import RoundTimer from "./RoundTimer/RoundTimer";
import Button from "../ui/Button";
import { Toggle } from "../ui/toggle";
import useKitchenStore from "store/zustant";
import { Language } from "@/lib/languages";
import axios from "axios";
import {
  getTestCasesAfterRun,
  getSubmissionResult,
} from "../../app/api/kitchen";
import { MdFullscreen } from "react-icons/md";
import { MdFullscreenExit } from "react-icons/md";
import { submitCode } from "@/api/kitchen";
import toast from "react-hot-toast";
type EditorProps = {
  languages: Language[];
  round?: string;
  setfullScreen: React.Dispatch<React.SetStateAction<boolean>>;
  fullScreen: boolean;
};

export default function Editor({
  languages,
  fullScreen,
  setfullScreen,
}: EditorProps) {
  const {
    setLanguageForQuestion,
    getLanguageForQuestion,
    setTestResults,
    setCompilerDetails,
    selectedQuestionId,
    selectedLanguage,
    setSelectedLanguage,
    codeByQuestion,
    setCodeForQuestion,
    testCases: originalTestCases,
    setSubmissionStatus,
    testResults,
  } = useKitchenStore();

  // Get the language for the current question
  const questionLanguage = selectedQuestionId
    ? getLanguageForQuestion(selectedQuestionId)
    : selectedLanguage;
  const [code, setCode] = useState("");
  const [cursor, setCursor] = useState({ line: 1, ch: 1 });
  const [isRunning, setIsRunning] = useState(false);
  const [editorReady, setEditorReady] = useState(false);
  const [vimMode, setVimMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("vimMode") === "true";
    }
    return false;
  });
  const editorRef = useRef<EditorView | null>(null);

  const handleLanguageChange = (language: Language) => {
    // Set language for current question instead of globally
    if (selectedQuestionId) {
      setLanguageForQuestion(selectedQuestionId, language);
    } else {
      setSelectedLanguage(language);
    }

    // Use template instead of placeholder
    const newCode = language.template;
    setCode(newCode);

    if (selectedQuestionId) {
      setCodeForQuestion(selectedQuestionId, newCode);
    }

    // Set cursor position after a brief delay to ensure editor is updated
    const setCursorPosition = () => {
      if (
        editorRef.current &&
        editorRef.current.dispatch &&
        language.cursorPosition
      ) {
        try {
          const { line, ch } = language.cursorPosition;
          const doc = editorRef.current.state.doc;

          // Ensure line number is within bounds
          const lineNumber = Math.min(Math.max(1, line), doc.lines);
          const lineObj = doc.line(lineNumber);
          const pos = Math.min(lineObj.from + Math.max(0, ch), lineObj.to);

          editorRef.current.dispatch({
            selection: { anchor: pos, head: pos },
            scrollIntoView: true,
          });
          editorRef.current.focus();
        } catch (error) {
          console.warn("Failed to set cursor position:", error);
        }
      } else if (language.cursorPosition) {
        // If editor isn't ready yet, try again in a moment
        setTimeout(setCursorPosition, 100);
      }
    };

    setTimeout(setCursorPosition, 200);
  };

  const handleChange = (value: string, viewUpdate: ViewUpdate) => {
    setCode(value);
    if (selectedQuestionId) {
      setCodeForQuestion(selectedQuestionId, value);
    }

    // Store the EditorView reference for later use
    editorRef.current = viewUpdate.view;
    if (!editorReady) {
      setEditorReady(true);
    }

    const view = viewUpdate.view;
    const pos = view.state.selection.main.head;
    const currentLine = view.state.doc.lineAt(pos);
    const line = currentLine.number;
    const ch = pos - currentLine.from + 1;
    setCursor({ line, ch });
  };

  const runCode = async () => {
    if (!selectedQuestionId || !code.trim()) {
      toast.error("Please select a question and write some code");
      return;
    }

    setTestResults([]);
    setCompilerDetails(null);
    setIsRunning(true);
    const toastId = toast.loading("Running code...");

    try {
      setSubmissionStatus("running");
      const response = await getTestCasesAfterRun(
        code,
        questionLanguage.id,
        selectedQuestionId
      );
      console.log(response);

      const transformedResults = response.result.map((result) => {
        let statusDesc = result.status.description;
        if (result.compile_output) {
          statusDesc += `\n${result.compile_output}`;
        }
        console.log(result);

        return {
          id: result.token,
          input: "",
          output: result.stdout || result.stderr || result.message || "",
          expected_output: "",
          hidden: false,
          runtime: parseFloat(result.time),
          memory: result.memory,
          question_id: selectedQuestionId,
          stderr: result.stderr || undefined,
          statusDescription: statusDesc,
        };
      });

      const questionTestCases = originalTestCases.filter(
        (tc) => tc.QuestionID === selectedQuestionId
      );

      const finalResults = transformedResults.map((result, index) => {
        const originalTestCase = questionTestCases[index];
        return {
          ...result,
          input: originalTestCase?.Input || "",
          expected_output: originalTestCase?.ExpectedOutput || "",
          hidden: originalTestCase?.Hidden || false,
        };
      });
      console.log(finalResults);

      setTestResults(finalResults);

      const hasErrors = response.result.some(
        (r) => r.stderr || r.status.id !== 3
      );
      const successCount = response.result.filter(
        (r) => r.status.id === 3 && !r.stderr
      ).length;
      const totalCount = response.result.length;

      if (hasErrors) {
        toast.error(
          `Code execution completed: ${successCount}/${totalCount} test cases passed`,
          { id: toastId }
        );
      } else {
        toast.success(`All ${totalCount} test cases passed successfully`, {
          id: toastId,
        });
      }

      // Set overall compiler details with summary
      setCompilerDetails({
        isCompileSuccess: !hasErrors,
        message: `Execution completed: ${successCount}/${totalCount} test cases passed`,
      });
    } catch (error) {
      console.error("Error running code:", error);
      toast.error("Failed to run code. Please try again.", { id: toastId });

      setCompilerDetails({
        isCompileSuccess: false,
        message: "Failed to run code. Please try again.",
      });
    } finally {
      setSubmissionStatus("idle");
      setIsRunning(false);
    }
  };

  const submitCodeHandler = async () => {
    if (!selectedQuestionId || !code.trim()) {
      toast.error("Please select a question and write some code");
      return;
    }

    setTestResults([]);
    setCompilerDetails(null);
    const submissionToastId = toast.loading("Submitting code...");

    try {
      setSubmissionStatus("running");
      const response = await submitCode(
        code,
        questionLanguage.id,
        selectedQuestionId
      );

      toast.success(`Code submitted successfully! Getting results...`, {
        id: submissionToastId,
      });

      // Now fetch the submission results
      const resultToastId = toast.loading("Fetching submission results...");

      try {
        const submissionResult = await getSubmissionResult(
          response.submission_id
        );
        console.log(submissionResult);
        const questionTestCases = originalTestCases.filter(
          (tc) => tc.QuestionID === selectedQuestionId
        );

        // Transform submission results to match the existing TestCase format
        const transformedResults = submissionResult.testcases.map(
          (testcase, index) => {
            const originalTestCase = questionTestCases[index];
            const currentRunResult = testResults[index]; // result from the last run

            let statusDesc = testcase.description;
            if (testcase.compile_output) {
              statusDesc += `\n${testcase.compile_output}`;
            }

            const isAccepted =
              testcase.status.trim().toLowerCase() === "accepted";

            console.log("current run result :", currentRunResult);
            return {
              id: testcase.id,
              input: originalTestCase?.Input || "",
              output: isAccepted
                ? currentRunResult?.output || ""
                : testcase.description,
              expected_output: originalTestCase?.ExpectedOutput || "",
              hidden: originalTestCase?.Hidden || false,
              runtime: testcase.runtime,
              memory: testcase.memory,
              question_id: selectedQuestionId,
              stderr: isAccepted
                ? undefined
                : testcase.stderr || testcase.description,
              statusDescription: statusDesc,
            };
          }
        );

        setTestResults(transformedResults);

        const successMessage = `Submission completed: ${
          submissionResult.passed
        }/${
          submissionResult.passed + submissionResult.failed
        } test cases passed`;

        if (submissionResult.failed > 0) {
          toast.error(successMessage, { id: resultToastId });
        } else {
          toast.success(successMessage, { id: resultToastId });
        }

        const hiddenPassed = submissionResult.testcases.reduce(
          (acc, testcase, index) => {
            const originalTestCase = questionTestCases[index];
            if (
              originalTestCase?.Hidden &&
              testcase.status.trim().toLowerCase() === "accepted"
            ) {
              return acc + 1;
            }
            return acc;
          },
          0
        );

        // Set overall compiler details with submission summary
        setCompilerDetails({
          isCompileSuccess: submissionResult.failed === 0,
          message: successMessage,
          passedCount: submissionResult.passed,
          totalCount: submissionResult.passed + submissionResult.failed,
          hiddenPassedCount: hiddenPassed,
        });
        setSubmissionStatus("submitted");
      } catch (resultError) {
        console.error("Error fetching submission result:", resultError);
        toast.error("Submission successful, but failed to fetch results", {
          id: resultToastId,
        });
      }
    } catch (error) {
      console.error("Error submitting code:", error);
      toast.error("Failed to submit code. Please try again.", {
        id: submissionToastId,
      });
    }
  };

  useEffect(() => {
    const fetchSavedCode = async () => {
      if (!selectedQuestionId || selectedQuestionId === "1") return;

      const cachedState = codeByQuestion.find(
        (state) => state.questionId === selectedQuestionId
      );
      if (cachedState) {
        setCode(cachedState.code);
        return;
      }

      const key = `code_${selectedQuestionId}_${questionLanguage.name}`;
      const localSaved = localStorage.getItem(key);

      if (localSaved) {
        setCode(localSaved);
        setCodeForQuestion(selectedQuestionId, localSaved);
        return;
      }

      try {
        const email = localStorage.getItem("email");
        if (!email) throw new Error("No email found in localStorage");

        const res = await axios.get(
          `/api/save-code?questionId=${selectedQuestionId}&email=${email}`
        );

        if (res.status === 200) {
          const data = res.data;
          if (data?.code) {
            setCode(data.code);
            setCodeForQuestion(selectedQuestionId, data.code);

            localStorage.setItem(key, data.code);
          } else {
            setCode(questionLanguage.template);
            setCursorToTemplatePos();
          }
        } else {
          setCode(questionLanguage.template);
          setCursorToTemplatePos();
        }
      } catch (err: unknown) {
        console.error("Error fetching code from MongoDB:", err);
        setCode(questionLanguage.template);
        setCursorToTemplatePos();
      }
    };

    const setCursorToTemplatePos = () => {
      setTimeout(() => {
        if (
          editorRef.current &&
          editorRef.current.dispatch &&
          questionLanguage.cursorPosition
        ) {
          try {
            const { line, ch } = questionLanguage.cursorPosition;
            const doc = editorRef.current.state.doc;

            const lineNumber = Math.min(Math.max(1, line), doc.lines);
            const lineObj = doc.line(lineNumber);
            const pos = Math.min(lineObj.from + Math.max(0, ch), lineObj.to);

            editorRef.current.dispatch({
              selection: { anchor: pos, head: pos },
              scrollIntoView: true,
            });
            editorRef.current.focus();
          } catch (error) {
            console.warn("Failed to set cursor position:", error);
          }
        }
      }, 200);
    };

    fetchSavedCode();
  }, [
    selectedQuestionId,
    codeByQuestion,
    setCodeForQuestion,
    questionLanguage.name,
    questionLanguage.template,
    questionLanguage.cursorPosition,
  ]);

  useEffect(() => {
    const localInterval = setInterval(() => {
      if (code.trim() === "" || code === questionLanguage.template) return;

      const key = `code_${selectedQuestionId}_${questionLanguage.name}`;
      localStorage.setItem(key, code);
    }, 5000);

    const mongoInterval = setInterval(async () => {
      if (code.trim() === "" || code === questionLanguage.template) return;

      const email = localStorage.getItem("email");
      if (!email) return;

      const payload = {
        questionId: selectedQuestionId,
        code,
        language: questionLanguage.name,
        email,
      };

      try {
        await axios.post("/api/save-code", payload);
        console.log("Auto-saved code to MongoDB");
      } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          console.warn("User not authenticated, skipping auto-save");
        } else {
          console.error("Error auto-saving code:", err);
        }
      }
    }, 300000);

    return () => {
      clearInterval(localInterval);
      clearInterval(mongoInterval);
    };
  }, [
    code,
    questionLanguage.name,
    questionLanguage.template,
    selectedQuestionId,
  ]);

  useEffect(() => {
    if (selectedQuestionId) {
      const cachedCode = codeByQuestion.find(
        (state) => state.questionId === selectedQuestionId
      );
      if (!cachedCode) {
        setCode(questionLanguage.template);
      }
    }
  }, [selectedQuestionId, questionLanguage.template, codeByQuestion]);

  // Save vim mode preference to localStorage
  useEffect(() => {
    localStorage.setItem("vimMode", vimMode.toString());
  }, [vimMode]);

  const saveCode = async (
    selectedQuestionId: string,
    code: string,
    questionLanguage: { name: string }
  ) => {
    if (!selectedQuestionId || !code.trim()) return;

    const email = localStorage.getItem("email");
    if (!email) {
      console.error("No email found in localStorage, cannot save code");
      return;
    }

    const payload = {
      questionId: selectedQuestionId,
      code,
      language: questionLanguage.name,
      email,
    };

    try {
      const res = await axios.post("/api/save-code", payload);
      if (res.status === 200) {
        console.log("✅ Code saved successfully!");
      } else {
        console.warn("⚠️ Save request did not return 200:", res.status);
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        console.warn("User not authenticated, cannot save code.");
      } else {
        console.error("❌ Error saving code:", err);
      }
    }
  };

  return (
    <div
      className={`${
        fullScreen
          ? "h-[100vh] w-screen -top-0 left-0 fixed z-50 "
          : "h-full w-[50vw]"
      }mx-auto flex flex-col shadow-lg overflow-x-hidden`}
    >
      <div className="flex items-center justify-between mb-4 z-20">
        <div className="flex gap-4 items-center ">
          <RoundTimer />
        </div>
        <div className="flex flex-row items-center gap-4">
          <LanguageSelector
            languages={languages}
            selectedLanguage={questionLanguage}
            onLanguageChange={handleLanguageChange}
          />
          {fullScreen ? (
            <MdFullscreenExit
              className="scale-200 h-6 w-6 hover:cursor-pointer mr-2"
              onClick={() => setfullScreen((prev) => !prev)}
            />
          ) : (
            <MdFullscreen
              className="scale-200 h-6 w-6  hover:cursor-pointer mr-2"
              onClick={() => setfullScreen((prev) => !prev)}
            />
          )}
        </div>
      </div>

      <div
        className={`flex-grow overflow-hidden ${
          fullScreen ? "h-[100vh]" : "min-h-[200px]"
        }`}
      >
        <CodeMirror
          ref={editorRef}
          value={code || questionLanguage.template}
          height="100%"
          width="100%"
          theme={oneDark}
          extensions={[
            ...(vimMode ? [vim()] : []),
            questionLanguage.extension,
            indentUnit.of("    "), // 4 spaces for indentation
          ]}
          onChange={handleChange}
          basicSetup={{
            tabSize: 4,
            indentOnInput: true,
            autocompletion: true,
            bracketMatching: true,
            foldGutter: true,
            highlightSelectionMatches: true,
          }}
        />
      </div>
      {/* Footer sections */}
      <div className="flex items-center justify-between px-6 py-2 bg-[#181919] text-gray-400 text-sm border-b border-gray-700">
        <div className="flex items-center gap-4">
          {vimMode && (
            <span className="text-green-400 font-mono">VIM MODE</span>
          )}
        </div>
        <div>
          Line: {cursor.line} &nbsp;|&nbsp; Col: {cursor.ch}
        </div>
      </div>
      <div className="flex items-center justify-between px-6 py-3 bg-[#181919] z-50">
        <div className="flex gap-4">
          <Button
            variant="run"
            size="default"
            onClick={runCode}
            disabled={isRunning}
          >
            {isRunning ? "Running..." : "Run Code"}
          </Button>
          <Button variant="green" size="default" onClick={submitCodeHandler}>
            Submit Code
          </Button>
        </div>
        <div className="flex gap-2">
          <Toggle
            pressed={vimMode}
            onPressedChange={(pressed) => {
              setVimMode(pressed);
              // Focus editor after mode change
              setTimeout(() => {
                if (editorRef.current && editorRef.current.dom) {
                  editorRef.current.dom.focus();
                }
              }, 100);
            }}
            variant="outline"
            size="sm"
            className={`px-3 py-1 text-sm transition-colors ${
              vimMode
                ? "bg-green-600 text-white hover:bg-green-700 border-green-600"
                : "text-gray-300 hover:bg-gray-700"
            }`}
            title={vimMode ? "Disable Vim Mode" : "Enable Vim Mode"}
          >
            {vimMode ? "VIM" : "NOT VIM"}
          </Toggle>
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              saveCode(selectedQuestionId, code, questionLanguage)
            }
          >
            Cloud save
          </Button>
        </div>
      </div>
    </div>
  );
}
