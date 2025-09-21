"use client";
import Editor from "@/components/Editor/Editor";
import React, { useState, useMemo } from "react";
import Button from "@/components/ui/Button";
import Modal from "@/components/Modal/Modal";
import QuestionWindow from "@/components/ui/QuestionWindow";
import TestCases from "@/components/TestCases/TestCases";
import { QuestionWithTestcases } from "@/api/question";

export default function UIPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("C++");
  const [showModal, setShowModal] = useState<
    "default" | "green" | "red" | "yellow" | null
  >(null);
  const [questionID, setQuestionID] = useState<string>("1");

  const [questionsWithTestcases, setQuestionsWithTestcases] = useState<
    QuestionWithTestcases[]
  >([
    {
      question: {
        id: "1",
        title: "PROBLEM 1: TWO SUM",
        points: 10,
        description:
          "# Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
        qType: "EASY",
        isBountyActive: false,
        inputFormat: [
          "Line 1: An array of integers nums.",
          "Line 2: An integer target.",
        ],
        round: 1,
        constraints: [
          "2 <= nums.length <= 10^4",
          "-10^9 <= nums[i] <= 10^9",
          "-10^9 <= target <= 10^9",
          "Only one valid answer exists.",
        ],
        outputFormat: ["An array containing the indices of the two numbers."],
        sampleTestInput: ["[2, 7, 11, 15]", "9"],
        sampleTestOutput: ["[0, 1]"],
        explanation: ["Because nums[0] + nums[1] == 9, we return [0, 1]."],
      },
      testcases: [
        {
          id: "t1-1",
          expected_output: "[0, 1]",
          memory: 100,
          input: "[2, 7, 11, 15]\n9",
          hidden: false,
          runtime: 1,
          question_id: "1",
        },
        {
          id: "t1-2",
          expected_output: "[1, 2]",
          memory: 100,
          input: "[3, 2, 4]\n6",
          hidden: false,
          runtime: 1,
          question_id: "1",
        },
        {
          id: "t1-3",
          expected_output: "[0, 1]",
          memory: 100,
          input: "[3, 3]\n6",
          hidden: true,
          runtime: 1,
          question_id: "1",
        },
      ],
    },
    {
      question: {
        id: "2",
        title: "PROBLEM 2: PALINDROME NUMBER",
        points: 15,
        description:
          "Given an integer x, return true if x is a palindrome, and false otherwise.",
        qType: "EASY",
        isBountyActive: true,
        inputFormat: ["Line 1: An integer x."],
        round: 1,
        constraints: ["-2^31 <= x <= 2^31 - 1"],
        outputFormat: ["A boolean value."],
        sampleTestInput: ["121"],
        sampleTestOutput: ["true"],
        explanation: [
          "121 reads as 121 from left to right and from right to left.",
        ],
      },
      testcases: [
        {
          id: "t2-1",
          expected_output: "true",
          memory: 50,
          input: "121",
          hidden: false,
          runtime: 1,
          question_id: "2",
        },
        {
          id: "t2-2",
          expected_output: "false",
          memory: 50,
          input: "-121",
          hidden: false,
          runtime: 1,
          question_id: "2",
        },
        {
          id: "t2-3",
          expected_output: "false",
          memory: 50,
          input: "10",
          hidden: true,
          runtime: 1,
          question_id: "2",
        },
      ],
    },
  ]);

  const questions = useMemo(
    () => questionsWithTestcases.map((q) => q.question),
    [questionsWithTestcases]
  );
  const selectedTestcases = useMemo(
    () =>
      questionsWithTestcases.find((q) => q.question.id === questionID)
        ?.testcases || [],
    [questionsWithTestcases, questionID]
  );

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
    <div className="bg-[#070E0A] min-h-screen p-4 sm:p-6 text-gray-200">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
        {/* Left - Question window */}
        <div className="bg-[#131414] p-4 sm:p-0 -mt-5">
          <QuestionWindow
            questions={questions}
            setQuestions={() => {}}
            questionID={questionID}
            setQuestionID={setQuestionID}
          />
        </div>

        {/* Right - Editor and Test cases */}
        <div className="flex flex-col space-y-6 mt-0 transform -translate-x-6 translate-y-12">
          <div className="bg-[#131414]">
            <Editor
              languages={languages}
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
              round="Round 1"
              questionId={questionID}
            />
          </div>

          <div className="bg-[#131414] p-4 sm:p-6 transform scale-90 -translate-x-8">
            <TestCases
              results={selectedTestcases}
              compilerDetails={defaultCompilerDetails}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
