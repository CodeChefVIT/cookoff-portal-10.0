"use client";

import Link from "next/link";
import Editor from "@/components/Editor/Editor";
import React, { useState } from "react";
import Button from "@/components/ui/Button";
import TabButton from "@/components/ui/TabButton";
import Modal from "@/components/Modal/Modal";
import QuestionWindow from "@/components/ui/QuestionWindow";
import TestCases from "@/components/TestCases/TestCases";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function UIPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("C++");
  const [showModal, setShowModal] = useState<
    "default" | "green" | "red" | "yellow" | null
  >(null);
  const [questionID, setQuestionID] = useState<number>(1);

  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: "PROBLEM 1: HELLO WORLD",
      points: 10,
      content: [
        "A queue is an abstract data type that maintains order...",
        "A basic queue has the following operations:",
        "Enqueue: add to the end.",
        "Dequeue: remove from the front.",
      ],
    },
    {
      id: 2,
      title: "PROBLEM 2: STACK IMPLEMENTATION",
      points: 15,
      content: [
        "A stack is a Last-In-First-Out (LIFO) data structure...",
        "Operations: Push, Pop, Peek.",
      ],
    },
  ]);

  // local test case type
  type TestCase = {
    id: number;
    status: "Passed" | "Failed" | "Error";
    input: string;
    output: string;
    expectedOutput: string;
    isHidden: boolean;
  };

  const defaultResults: TestCase[] = [
    {
      id: 1,
      status: "Passed",
      input: "2 3",
      output: "5",
      expectedOutput: "5",
      isHidden: false,
    },
    {
      id: 2,
      status: "Failed",
      input: "10 4",
      output: "15",
      expectedOutput: "14",
      isHidden: false,
    },
    {
      id: 4,
      status: "Passed",
      input: "10 5",
      output: "20",
      expectedOutput: "20",
      isHidden: false,
    },
    {
      id: 3,
      status: "Passed",
      input: "7 8",
      output: "15",
      expectedOutput: "15",
      isHidden: true,
    },
  ];

  const defaultCompilerDetails = {
    isCompileSuccess: false,
    message: "Compilation Successful !!",
  };

  const languages = [
    "C++",
    "C",
    "C#",
    "Java",
    "Python3",
    "PHP",
    "Rust",
    "Racket",
    "Ruby",
    "Go",
  ];

  return (
    <div className="bg-[#070E0A] h-screen p-4 text-gray-200 overflow-hidden">
      <ResizablePanelGroup direction="horizontal" className="w-full h-full">
        {/* Left: Question Panel */}
        <ResizablePanel defaultSize={50} className="pr-4">
          <div className="bg-[#131414] h-full rounded-lg overflow-auto">
            <QuestionWindow
              questions={questions}
              setQuestions={setQuestions}
              questionID={questionID}
              setQuestionID={setQuestionID}
            />
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Right: Code + TestCases */}
        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="vertical" className="h-full">
            {/* Editor */}
            <ResizablePanel defaultSize={25} className="pb-4 pl-4">
              <div className="bg-[#131414] h-full rounded-lg overflow-auto">
                <Editor
                  languages={languages}
                  selectedLanguage={selectedLanguage}
                  onLanguageChange={setSelectedLanguage}
                  round="Round 1"
                />
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Test Cases */}
            <ResizablePanel defaultSize={75} className="pt-4 pl-4">
              <div className="bg-[#131414] h-full rounded-lg overflow-auto p-2">
                <TestCases
                  results={defaultResults.map((tc) => ({
                    id: String(tc.id),
                    input: tc.input,
                    output: tc.output,
                    expected_output: tc.expectedOutput,
                    hidden: tc.isHidden,
                    runtime: 0,
                    memory: 0,
                    question_id: String(questionID),
                  }))}
                  compilerDetails={defaultCompilerDetails}
                />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
