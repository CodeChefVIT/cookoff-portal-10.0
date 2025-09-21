"use client";

import Link from "next/link";
import Editor from "@/components/Editor/Editor";
import React, { useEffect, useState } from "react";
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
import { byRound } from "@/api/question";

export interface Question {
  id: string;
  title: string;
  points: number;
  description: string;
  constraints: string[];
  explanation: string[];
  inputFormat: string[];
  outputFormat: string[];
  sampleTestInput: string[];
  sampleTestOutput: string[];
  qType: string;
  round: number;
  isBountyActive: boolean;
}

type TestCase = {
  id: string;
  input: string;
  output: string;
  expected_output: string;
  hidden: boolean;
  runtime: number;
  memory: number;
  question_id: string;
};

export default function UIPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("C++");
  const [showModal, setShowModal] = useState<
    "default" | "green" | "red" | "yellow" | null
  >(null);

  const [questionID, setQuestionID] = useState<string>("1");

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      title: "PROBLEM 1: HELLO WORLD",
      points: 10,
      description: "A queue is an abstract data type that maintains order...",
      constraints: [],
      explanation: [],
      inputFormat: [
        "Enqueue: add to the end.",
        "Dequeue: remove from the front.",
      ],
      outputFormat: [],
      sampleTestInput: ["2 3"],
      sampleTestOutput: ["5"],
      qType: "DS",
      round: 1,
      isBountyActive: false,
    },
    {
      id: "2",
      title: "PROBLEM 2: STACK IMPLEMENTATION",
      points: 15,
      description: "A stack is a Last-In-First-Out (LIFO) data structure...",
      constraints: [],
      explanation: [],
      inputFormat: ["Operations: Push, Pop, Peek."],
      outputFormat: [],
      sampleTestInput: ["1 2 3"],
      sampleTestOutput: ["3"],
      qType: "DS",
      round: 1,
      isBountyActive: false,
    },
  ]);

  const defaultResults: TestCase[] = [
    {
      id: "1",
      input: "2 3",
      output: "5",
      expected_output: "5",
      hidden: false,
      runtime: 0,
      memory: 0,
      question_id: "1",
    },
    {
      id: "2",
      input: "10 4",
      output: "15",
      expected_output: "14",
      hidden: false,
      runtime: 0,
      memory: 0,
      question_id: "1",
    },
    {
      id: "3",
      input: "10 5",
      output: "20",
      expected_output: "20",
      hidden: false,
      runtime: 0,
      memory: 0,
      question_id: "1",
    },
    {
      id: "4",
      input: "7 8",
      output: "15",
      expected_output: "15",
      hidden: true,
      runtime: 0,
      memory: 0,
      question_id: "2",
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
                  results={defaultResults}
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
