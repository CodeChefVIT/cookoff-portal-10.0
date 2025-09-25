"use client";
import { useRef } from "react";
import Editor from "@/components/Editor/Editor";
import React, { useState, useMemo } from "react";
import QuestionWindow from "@/components/ui/QuestionWindow";
import TestCases from "@/components/TestCases/TestCases";
import { QuestionWithTestcases } from "@/api/question";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import useKitchenStore from "store/zustant";
import { LANGUAGES } from "@/lib/languages";
import Header from "@/components/Header/Header";
import TabButton from "@/components/ui/TabButton";
import { ImperativePanelHandle } from "react-resizable-panels";

export interface Question {
  id: string;
  description: string;
  title: string;
  qType: string;
  isBountyActive: boolean;
  inputFormat: string[];
  points: number;
  round: number;
  constraints: string[];
  outputFormat: string[];
  sampleTestInput: string[];
  sampleTestOutput: string[];
  explanation: string[];
}

export default function UIPage() {
  const {
    selectedQuestionId,
    setSelectedQuestionId,
    fullScreenEditor,
    fullScreenTestCases,
    fullScreenQuestion,
    setFullScreenEditor,
    setFullScreenTestCases,
    setFullScreenQuestion,
  } = useKitchenStore();

  const [testCasesPanelSize, setTestCasesPanelSize] = useState(20);
  const [sidebarWidth, setSidebarWidth] = useState(50);
  const panelRef = useRef<ImperativePanelHandle | null>(null);
  const [questionsWithTestcases, setQuestionsWithTestcases] = useState<
    QuestionWithTestcases[]
  >([
    {
      question: {
        id: "1",
        title: "PROBLEM 1: REVERSE STRING",
        points: 10,
        description:
          "Given a string s, return the string reversed. The string may contain letters, digits, and special characters. You must return the reversed version of the string without modifying the original input.",
        qType: "EASY",
        isBountyActive: false,
        inputFormat: ["Line 1: A string s."],
        round: 1,
        constraints: [
          "1 <= s.length <= 10^5",
          "s consists of printable ASCII characters.",
        ],
        outputFormat: ["A reversed string."],
        sampleTestInput: ["hello"],
        sampleTestOutput: ["olleh"],
        explanation: ["Reversing 'hello' gives 'olleh'."],
      },
      testcases: [
        {
          id: "t1-1",
          expected_output: "olleh",
          memory: 50,
          input: "hello",
          hidden: false,
          runtime: 1,
          output: "[something]",
          question_id: "1",
        },
        {
          id: "t1-2",
          expected_output: "321cba",
          memory: 50,
          input: "abc123",
          hidden: false,
          runtime: 1,
          output: "[something]",
          question_id: "1",
        },
        {
          id: "t1-3",
          expected_output: "racecar",
          memory: 50,
          input: "racecar",
          hidden: true,
          runtime: 1,
          output: "[something]",
          question_id: "1",
        },
      ],
    },
    {
      question: {
        id: "2",
        title: "PROBLEM 2: MAXIMUM ELEMENT",
        points: 15,
        description:
          "Given an array of integers nums, return the maximum element in the array. You must do this in O(n) time by scanning through the array once.",
        qType: "EASY",
        isBountyActive: false,
        inputFormat: ["Line 1: An array of integers nums."],
        round: 1,
        constraints: ["1 <= nums.length <= 10^5", "-10^9 <= nums[i] <= 10^9"],
        outputFormat: ["An integer representing the maximum element."],
        sampleTestInput: ["[1, 5, 3, 9, 2]"],
        sampleTestOutput: ["9"],
        explanation: ["The maximum element in [1,5,3,9,2] is 9."],
      },
      testcases: [
        {
          id: "t2-1",
          expected_output: "9",
          memory: 100,
          input: "[1, 5, 3, 9, 2]",
          hidden: false,
          runtime: 1,
          output: "[something]",
          question_id: "2",
        },
        {
          id: "t2-2",
          expected_output: "-1",
          memory: 100,
          input: "[-5, -10, -1, -3]",
          hidden: false,
          runtime: 1,
          output: "[something]",
          question_id: "2",
        },
        {
          id: "t2-3",
          expected_output: "1000000000",
          memory: 100,
          input: "[1, 1000000000, 500, 999999999]",
          hidden: true,
          runtime: 1,
          output: "[something]",
          question_id: "2",
        },
      ],
    },
  ]);

  const questions = useMemo(
    () => questionsWithTestcases.map((q: QuestionWithTestcases) => q.question),
    [questionsWithTestcases]
  );
  const selectedTestcases = useMemo(
    () =>
      questionsWithTestcases.find(
        (q: QuestionWithTestcases) => q.question.id === selectedQuestionId
      )?.testcases || [],
    [questionsWithTestcases, selectedQuestionId]
  );
  const defaultCompilerDetails = {
    isCompileSuccess: false,
    message: "Compilation Successful !!",
  };

  const languages = Object.values(LANGUAGES);
  const handleSetQuestionID: React.Dispatch<React.SetStateAction<string>> = (
    id
  ) =>
    setSelectedQuestionId(
      typeof id === "function" ? id(selectedQuestionId) : id
    );
  const handleSetFullScreenQuestion: React.Dispatch<
    React.SetStateAction<boolean>
  > = (fullScreen) =>
    setFullScreenQuestion(
      typeof fullScreen === "function"
        ? fullScreen(fullScreenQuestion)
        : fullScreen
    );
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
    return (
      <QuestionWindow
        questions={questions}
        setQuestions={() => {}}
        questionID={selectedQuestionId}
        setQuestionID={handleSetQuestionID}
        setfullScreen={handleSetFullScreenQuestion}
        fullScreen={fullScreenQuestion}
      />
    );
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
        compilerDetails={defaultCompilerDetails}
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
          minSize={3}
          onResize={(size) => setSidebarWidth(size)}
        >
          <div className="h-full overflow-hidden">
            {sidebarWidth > 8 ? (
              <QuestionWindow
                questions={questions}
                setQuestions={() => {}}
                questionID={selectedQuestionId}
                setQuestionID={handleSetQuestionID}
                setfullScreen={handleSetFullScreenQuestion}
                fullScreen={fullScreenQuestion}
              />
            ) : (
              <div className="flex flex-col items-center gap-20 pt-14">
                {questions.map((q) => (
                  <div key={q.id} className="rotate-90">
                    <TabButton
                      id={q.id}
                      active={selectedQuestionId === q.id}
                      onClick={() => {
                        handleSetQuestionID(q.id);
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
              className="pt-4 pl-4"
              onResize={(size) => setTestCasesPanelSize(size)}
            >
              <div className="bg-[#131414]">
                <TestCases
                  results={selectedTestcases}
                  compilerDetails={defaultCompilerDetails}
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
