"use client";

import Link from "next/link";
import Editor from "@/components/Editor/Editor";
import React, { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import TabButton from "@/components/ui/TabButton";
import Modal from "@/components/Modal/Modal";
import QuestionWindow from "@/components/ui/QuestionWindow";
import TestCases from "@/components/TestCases/TestCases";
import { Question } from "@/schemas/api";
import { byRound } from "@/api/question";

export default function UIPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("C++");
  const [showModal, setShowModal] = useState<"default" | "green" | "red" | "yellow" | null>(null);
  const [questionID, setQuestionID] = useState<number>(1);

  const [questions, setQuestions] = useState<Question []>();
  useEffect(() => {
    // Fetch questions from API or use static data
    const fetchQuestions = async () => {
      const response = await byRound();
      setQuestions(response.map((item, index) => (item.question)));
    };

    fetchQuestions();
  }, []);
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
    { id: 1, status: "Passed", input: "2 3", output: "5", expectedOutput: "5", isHidden: false },
    { id: 2, status: "Failed", input: "10 4", output: "15", expectedOutput: "14", isHidden: false },
    { id: 4, status: "Passed", input: "10 5", output: "20", expectedOutput: "20", isHidden: false },
    { id: 3, status: "Passed", input: "7 8", output: "15", expectedOutput: "15", isHidden: true },
  ];

  const defaultCompilerDetails = {
    isCompileSuccess: false,
    message: "Compilation Successful !!",
  };

  const languages = ["C++", "C", "C#", "Java", "Python3", "PHP", "Rust", "Racket", "Ruby", "Go"];

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
              results={defaultResults.map(tc => ({
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
        </div>
      </div>
    </div>
  );
}
