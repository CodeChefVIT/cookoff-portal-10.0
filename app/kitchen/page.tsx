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
  const [mobileActiveTab, setMobileActiveTab] = useState<'question' | 'editor' | 'testcases'>('question');
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
      
      {/* Mobile Layout (< md) */}
      <div className="md:hidden flex-grow flex flex-col">

        {/* Mobile Content - Tabs */}
        <div className="flex-grow flex flex-col">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-700 bg-[#0A0F0B]">
            <button 
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                mobileActiveTab === 'question' 
                  ? 'text-white border-b-2 border-green-500' 
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setMobileActiveTab('question')}
            >
              Question
            </button>
            <button 
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                mobileActiveTab === 'editor' 
                  ? 'text-white border-b-2 border-green-500' 
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setMobileActiveTab('editor')}
            >
              Editor
            </button>
            <button 
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                mobileActiveTab === 'testcases' 
                  ? 'text-white border-b-2 border-green-500' 
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setMobileActiveTab('testcases')}
            >
              Test Cases
            </button>
          </div>
          
          {/* Tab Content */}
          <div className="flex-grow overflow-hidden">
            {mobileActiveTab === 'question' && (
              <div className="h-full flex flex-col">
                {/* Question Selector */}
                <div className="flex overflow-x-auto px-3 py-2 bg-[#0F1310] border-b border-gray-700">
                  <div className="flex gap-2 min-w-max">
                    {questions.map((q, index) => (
                      <TabButton
                        key={q.ID}
                        id={q.ID}
                        newId={index}
                        active={selectedQuestionId === q.ID}
                        onClick={() => handleSetQuestionID(q.ID)}
                      />
                    ))}
                  </div>
                </div>
                {/* Question Content */}
                <div className="flex-grow overflow-hidden p-3">
                  <QuestionWindow />
                </div>
              </div>
            )}
            
            {mobileActiveTab === 'editor' && (
              <div className="h-full p-3">
                <Editor
                  languages={languages}
                  round="round 0"
                  setfullScreen={handleSetFullScreenEditor}
                  fullScreen={fullScreenEditor}
                />
              </div>
            )}
            
            {mobileActiveTab === 'testcases' && (
              <div className="h-full p-3 bg-[#131414]">
                <TestCases
                  results={selectedTestcases}
                  compilerDetails={compilerDetails || defaultCompilerDetails}
                  panelSize={100}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Layout (>= md) */}
      <div className="hidden md:flex flex-grow">
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
                <div className="grid grid-cols-1 gap-4 lg:gap-6">
                  <div className="-mt-2 py-3 pr-2 min-h-[90vh] -translate-y-5 [&::-webkit-scrollbar]:w-0">
                    <QuestionWindow />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-12 lg:gap-20 pt-8 lg:pt-14">
                  {questions.map((q, index) => (
                    <div key={q.ID} className="rotate-90">
                      <TabButton
                        id={q.ID}
                        newId={index}
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
              className="translate-y-2 lg:translate-y-4"
              defaultValue={80}
            >
              <ResizablePanel defaultSize={75} className="pb-2 lg:pb-4 pl-2 lg:pl-4">
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
                className="pt-2 lg:pt-4 pl-2 lg:pl-4"
                onResize={(size) => setTestCasesPanelSize(size)}
              >
                <div className="bg-[#131414] rounded lg:rounded-lg">
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
    </div>
  );
}
