"use client";

<<<<<<< HEAD
=======

import Link from "next/link";
>>>>>>> upstream/main
import Editor from "@/components/Editor/Editor";
import React, { useState } from "react";
import Button from "@/components/ui/Button";
import Modal from "@/components/Modal/Modal";
import QuestionWindow from "@/components/ui/QuestionWindow";
import TestCases from "@/components/TestCases/TestCases";


export default function UIPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("C++");
  const [showModal, setShowModal] = useState<
    "default" | "green" | "red" | "yellow" | null
  >(null);
  const [questionID, setQuestionID] = useState<number>(1);

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
  ];

  const questions = [
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
  ];

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

  return (
    <div className="bg-[#070E0A] min-h-screen p-4 sm:p-6 text-gray-200">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
        {/* Left- Question window */}
        <div className="bg-[#131414] p-4 sm:p-0 -mt-5">
     
        </div>

        {/*Right: Editor and Test case */}
        <div className="flex flex-col space-y-6 mt-0 transform -translate-x-6 translate-y-12">
          <div className="bg-[#131414]">
            <Editor
              languages={languages}
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
              round="Round 1"
            />
          </div>

          <div className="bg-[#131414] p-4 sm:p-6 transform scale-90 -translate-x-8">
            <TestCases
              results={defaultResults}
              compilerDetails={defaultCompilerDetails}
            />
          </div>
        </div>
      </div>

      {/* Modal showcase */}
      <div className="mt-12">
        {(["default", "green", "destructive", "secondary"] as const).map(
          (variant) => {
            const modalVariant: "default" | "green" | "red" | "yellow" =
              variant === "destructive"
                ? "red"
                : variant === "secondary"
                ? "yellow"
                : variant;
            const buttonVariant:
              | "green"
              | "secondary"
              | "destructive"
              | "link"
              | "outline"
              | "ghost"
              | "run" = variant === "default" ? "outline" : variant;
            const displayName =
              modalVariant.charAt(0).toUpperCase() + modalVariant.slice(1);
            return (
              <div key={variant} className="mb-6">
                <div className="flex gap-2 mb-2">
                  <Button
                    variant={buttonVariant}
                    onClick={() => setShowModal(modalVariant)}
                  >
                    Show {displayName} Modal
                  </Button>
                </div>
                {showModal === modalVariant && (
                  <Modal
                    title={`Sample ${displayName} Modal`}
                    message={`This is a demonstration of the ${modalVariant} Modal variant.`}
                    variant={modalVariant}
                    onClose={() => setShowModal(null)}
                  >
                    <Button variant={buttonVariant}>Nested Button</Button>
                  </Modal>
                )}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
