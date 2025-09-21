"use client";

import Link from "next/link";
import Editor from "@/components/Editor/Editor";
import React, { useState } from "react";
import Button from "@/components/ui/Button";
import TabButton from "@/components/ui/TabButton";
import Modal from "@/components/Modal/Modal";
import QuestionWindow from "@/components/ui/QuestionWindow";
import TestCases from "@/components/TestCases/TestCases";

// ✅ Define the Question type (same structure as API schema / QuestionWindow props)
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

// ✅ TestCase type
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

  // ✅ use string UUIDs for question IDs
  const [questionID, setQuestionID] = useState<string>("1");

  // ✅ Explicitly typed as Question[]
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      title: "PROBLEM 1: HELLO WORLD",
      points: 10,
      description: "A queue is an abstract data type that maintains order...",
      constraints: [],
      explanation: [],
      inputFormat: ["Enqueue: add to the end.", "Dequeue: remove from the front."],
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

  // ✅ Mock test cases
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
    <div className="bg-[#070E0A] h-screen px-6 py-2 text-gray-200 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
        {/* Left - Question window */}
        <div className="bg-[#131414] h-full rounded-lg overflow-hidden">
          <QuestionWindow
            questions={questions}
            setQuestions={setQuestions}
            questionID={questionID}
            setQuestionID={setQuestionID}
          />
        </div>

        {/* Right - Editor and Test cases */}
        <div className="flex flex-col gap-2 h-full rounded-lg overflow-hidden">
          <div className="bg-[#131414] flex-shrink-0 h-60 rounded-lg overflow-hidden">
            <Editor
              languages={languages}
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
              round="Round 1"
            />
          </div>

          <div className="bg-[#131414] p-2 flex-1 min-h-0 rounded-lg overflow-hidden">
            <TestCases
              results={defaultResults}
              compilerDetails={defaultCompilerDetails}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
