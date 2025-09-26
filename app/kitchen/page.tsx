"use client";
import { useRef } from "react";
import Editor from "@/components/Editor/Editor";
import React, { useState, useMemo, useEffect } from "react";
import QuestionWindow from "@/components/ui/QuestionWindow";
import TestCases from "@/components/TestCases/TestCases";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import useKitchenStore, { TestCase } from "store/zustant";
import { LANGUAGES } from "@/lib/languages";
import { getKitchenData } from "../api/kitchen";
import Header from "@/components/Header/Header";
import TabButton from "@/components/ui/TabButton";
import { ImperativePanelHandle } from "react-resizable-panels";
import toast, { ToastBar } from "react-hot-toast";

export default function Kitchen() {
  const {
    selectedQuestionId,
    fullScreenEditor,
    fullScreenTestCases,
    fullScreenQuestion,
    setFullScreenEditor,
    setFullScreenTestCases,
    testCases,
    testResults,
    compilerDetails,
    setQuestions,
    setTestCases,
  } = useKitchenStore();

  // Rehydrate the store on client side to prevent hydration mismatches
  useEffect(() => {
    useKitchenStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { questions, testcases } = await getKitchenData();
      setQuestions(questions);
      setTestCases(testcases);
    };
    fetchData();
  }, [setQuestions, setTestCases]);
  const [testCasesPanelSize, setTestCasesPanelSize] = useState(20);

    const selectedTestcases = useMemo(() => {
    const testCasesForQuestion = testResults.filter(
      (tc) => tc && tc.question_id === selectedQuestionId
    );
    
    if (testCasesForQuestion.length > 0) {
      return testCasesForQuestion;
    }
    
    // Only show template test cases if no execution results exist
    // This prevents showing "0/X Test Cases Passed" when no code has been run
    return testCases
      .filter((tc) => tc && tc.QuestionID=== selectedQuestionId)
      .map(
        (tc) =>
          ({
            id: tc.ID,
            input: tc.Input,
            output: "", // Empty output indicates no execution
            expected_output: tc.ExpectedOutput,
            hidden: tc.Hidden,
            runtime: 0, // 0 indicates no execution
            memory: 0, // 0 indicates no execution
            question_id: selectedQuestionId,
          } as TestCase)
      );
  }, [testCases, testResults, selectedQuestionId]);
  const defaultCompilerDetails = {
    isCompileSuccess: false,
    message: "No code executed yet",
  };
  
  const languages = Object.values(LANGUAGES);

  const handleSetFullScreenEditor: React.Dispatch<
    React.SetStateAction<boolean>
  > = (fullScreen) =>
    setFullScreenEditor(
      typeof fullScreen === "function"
        ? fullScreen(fullScreenEditor)
        : fullScreen
    );
  const handleSetFullScreenTestCases: React.Dispatch<
    React.SetStateAction<boolean>
  > = (fullScreen) =>
    setFullScreenTestCases(
      typeof fullScreen === "function"
        ? fullScreen(fullScreenTestCases)
        : fullScreen
    );

  if (fullScreenQuestion) {
    return <QuestionWindow />;
  }

  if (fullScreenEditor) {
    return (
      <Editor
        languages={languages}
        round="round 0"
        setfullScreen={handleSetFullScreenEditor}
        fullScreen={fullScreenEditor}
      />
    );
  }

  if (fullScreenTestCases) {
    return (
      <TestCases
        results={selectedTestcases}
        compilerDetails={compilerDetails || defaultCompilerDetails}
        panelSize={100}
      />
    );
  }
  return (
    <div className="relative bg-[#070E0A] max-h-screen text-gray-200 overflow-hidden">
      <ResizablePanelGroup direction="horizontal" className="">
        <ResizablePanel defaultSize={50} maxSize={50}>
          <div className="grid grid-cols-1 gap-6 lg:gap-10">
            <div className="-mt-2 py-4 pr-2 min-h-[90vh] -translate-y-5 [&::-webkit-scrollbar]:w-0">
              <QuestionWindow />
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={70}>
          <ResizablePanelGroup
            direction="vertical"
            className="translate-y-4"
            defaultValue={80}
          >
            <ResizablePanel defaultSize={75} className="pb-4 pl-4">
              <div className="h-full flex flex-col gap-2 mt-0">
                <Editor
                  languages={languages}
                  round="round 0"
                  setfullScreen={handleSetFullScreenEditor}
                  fullScreen={fullScreenEditor}
                />
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel
              defaultSize={20}
              className="pt-4 pl-4"
              onResize={(size) => setTestCasesPanelSize(size)}
            >
              <div className="bg-[#131414]">
                <TestCases
                  results={selectedTestcases}
                  compilerDetails={compilerDetails || defaultCompilerDetails}
                  panelSize={testCasesPanelSize}
                />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
