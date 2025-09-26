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

export default function Kitchen() {
  const {
    selectedQuestionId,
    setSelectedQuestionId,
    fullScreenEditor,
    fullScreenTestCases,
    fullScreenQuestion,
    setFullScreenEditor,
    testCases,
    testResults,
    compilerDetails,
    questions,
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
  const [sidebarWidth, setSidebarWidth] = useState(50);
  const panelRef = useRef<ImperativePanelHandle | null>(null);

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

  const handleSetQuestionID: React.Dispatch<React.SetStateAction<string>> = (
    id
  ) =>
    setSelectedQuestionId(
      typeof id === "function" ? id(selectedQuestionId) : id
    );

  const handleSetFullScreenEditor: React.Dispatch<
    React.SetStateAction<boolean>
  > = (fullScreen) =>
    setFullScreenEditor(
      typeof fullScreen === "function"
        ? fullScreen(fullScreenEditor)
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
    <div className="flex flex-col h-screen bg-[#070E0A] text-gray-200 overflow-hidden">
      <Header />
      <ResizablePanelGroup direction="horizontal" className="flex-grow">
        <ResizablePanel
          ref={panelRef}
          defaultSize={50}
          minSize={4}
          maxSize={50}
          onResize={(size) => setSidebarWidth(size)}
        >
          <div className="h-full overflow-hidden">
            {sidebarWidth > 10 ? (
              <div className="grid grid-cols-1 gap-6 lg:gap-10">
                <div className="-mt-2 py-4 pr-2 min-h-[90vh] -translate-y-5 [&::-webkit-scrollbar]:w-0">
                  <QuestionWindow />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-20 pt-14">
                {questions.map((q, index) => (
                  <div key={q.ID} className="rotate-90">
                    <TabButton
                      id={q.ID}
                      newId={index }
                      active={selectedQuestionId === q.ID}
                      onClick={() => {
                        handleSetQuestionID(q.ID);
                        if (panelRef.current) {
                          panelRef.current.resize(50);
                        }
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
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
              maxSize={60}
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
