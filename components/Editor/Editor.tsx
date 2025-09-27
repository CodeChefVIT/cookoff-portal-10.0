"use client";

import React, { useRef, useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { indentUnit } from "@codemirror/language";
import type { EditorView } from "@codemirror/view";
import type { ViewUpdate } from "@codemirror/view";
import LanguageSelector from "./LanguageSelector/LanguageSelector";
import RoundTimer from "./RoundTimer/RoundTimer";
import Button from "../ui/Button";
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

      const transformedResults = response.result.map((result, index) => {
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
      setIsRunning(false);
    }
  };

  const submitCodeHandler = async () => {
    if (!selectedQuestionId || !code.trim()) {
      toast.error("Please select a question and write some code");
      return;
    }

    const submissionToastId = toast.loading("Submitting code...");

    try {
      setSubmissionStatus("submitted");
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

        const successMessage = `Submission completed: ${submissionResult.passed
          }/${submissionResult.passed + submissionResult.failed
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
      } else {
        setCode(questionLanguage.template);
      }

      try {
        const email = localStorage.getItem("email");
        const res = await axios.get(
          `/api/save-code?questionId=${selectedQuestionId}&email=${email}`
        );
        if (res.status === 200) {
          const data = await res.data;
          if (data?.code) {
            setCode(data.code);
            setCodeForQuestion(selectedQuestionId, data.code);
          } else {
            setCode(questionLanguage.template);
            // Set cursor position for new template
            setTimeout(() => {
              if (
                editorRef.current &&
                editorRef.current.dispatch &&
                questionLanguage.cursorPosition
              ) {
                try {
                  const { line, ch } = questionLanguage.cursorPosition;
                  const doc = editorRef.current.state.doc;

                  // Ensure line number is within bounds
                  const lineNumber = Math.min(Math.max(1, line), doc.lines);
                  const lineObj = doc.line(lineNumber);
                  const pos = Math.min(
                    lineObj.from + Math.max(0, ch),
                    lineObj.to
                  );

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
          }
        } else {
          setCode(questionLanguage.template);
          // Set cursor position for new template
          setTimeout(() => {
            if (
              editorRef.current &&
              editorRef.current.dispatch &&
              questionLanguage.cursorPosition
            ) {
              try {
                const { line, ch } = questionLanguage.cursorPosition;
                const doc = editorRef.current.state.doc;

                // Ensure line number is within bounds
                const lineNumber = Math.min(Math.max(1, line), doc.lines);
                const lineObj = doc.line(lineNumber);
                const pos = Math.min(
                  lineObj.from + Math.max(0, ch),
                  lineObj.to
                );

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
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          setCode(questionLanguage.template);
        } else {
          console.error("Error fetching saved code:", err);
        }
      }
    };

    fetchSavedCode();
  }, [
    selectedQuestionId,
    codeByQuestion,
    setCodeForQuestion,
    questionLanguage.template,
    questionLanguage.cursorPosition,
  ]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (code.trim() === "" || code === questionLanguage.template) return;

      const payload = {
        questionId: selectedQuestionId,
        code,
        language: questionLanguage.name,
        email: localStorage.getItem("email"),
      };

      try {
        await axios.post("/api/save-code", payload);
      } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          // console.log("User not authenticated - skipping auto-save");
        } else {
          console.error("Error auto-saving code:", err);
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [
    code,
    questionLanguage.name,
    questionLanguage.template,
    selectedQuestionId,
  ]);

  // Update code when question changes to show the correct template for the language
  useEffect(() => {
    if (selectedQuestionId) {
      const cachedCode = codeByQuestion.find(
        (state) => state.questionId === selectedQuestionId
      );
      if (!cachedCode) {
        // No cached code for this question, use the template for this question's language
        setCode(questionLanguage.template);
      }
    }
  }, [selectedQuestionId, questionLanguage.template, codeByQuestion]);

  return (
    <div
      className={`${fullScreen
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
              className="scale-200 h-6 w-6 hover:cursor-pointer"
              onClick={() => setfullScreen((prev) => !prev)}
            />
          ) : (
            <MdFullscreen
              className="scale-200 h-6 w-6  hover:cursor-pointer"
              onClick={() => setfullScreen((prev) => !prev)}
            />
          )}
        </div>
      </div>

      <div
        className={`flex-grow overflow-hidden ${fullScreen ? "h-[100vh]" : "min-h-[200px]"
          }`}
      >
        <CodeMirror
          ref={editorRef}
          value={code || questionLanguage.template}
          height="100%"
          width="100%"
          theme={oneDark}
          extensions={[
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
      <div className="flex items-center justify-end px-6 py-2 bg-[#181919] text-gray-400 text-sm border-b border-gray-700">
        Line: {cursor.line} &nbsp;|&nbsp; Col: {cursor.ch}
      </div>
      <div className="flex items-center justify-between px-6 py-3 bg-[#181919] z-100">
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
      </div>
    </div>
  );
}
