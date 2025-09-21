"use client";
import Editor from "@/components/Editor/Editor";
import React, { useState, useMemo, useEffect } from "react";
import Button from "@/components/ui/Button";
import Modal from "@/components/Modal/Modal";
import QuestionWindow from "@/components/ui/QuestionWindow";
import TestCases from "@/components/TestCases/TestCases";
import { QuestionWithTestcases } from "@/api/question";

export default function UIPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("C++");
  const [fullScreenRight, setFullScreen] = useState(false);
  const [fullScreenEditor, setFullScreenEditor] = useState(false);
  const [fullScreenTestCases, setFullScreenTestCases] = useState(false);
  const [fullScreenQuestion, setFullScreenQuestion] = useState(false);
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
          "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
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
  useEffect(() => {
    let bol = fullScreenEditor || fullScreenTestCases;
    setFullScreen(bol);
  }, [fullScreenEditor, fullScreenTestCases]);

  return (
    <div
      className={`relative  bg-[#070E0A] max-h-screen text-gray-200 overflow-hidden  ${
        fullScreenEditor || fullScreenTestCases || fullScreenQuestion
          ? `absolute`
          : ` `
      }`}
    >
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 align-baseline `}>
        {/* Left - Question window */}
        <div className=" -mt-2 py-4 pr-2 min-h-[90vh] -translate-y-5 [&::-webkit-scrollbar]:w-0">
          {!fullScreenRight && (
            <QuestionWindow
              questions={questions}
              setQuestions={() => {}}
              questionID={questionID}
              setQuestionID={setQuestionID}
              setfullScreen={setFullScreenQuestion}
              fullScreen={fullScreenQuestion}
            />
          )}
        </div>

        {/* Right - Editor and Test cases */}
        <div
          className={`${
            fullScreenRight ? `absolute` : ` `
          } flex flex-col gap-2 mt-0 transform translate-y-12`}
        >
          <div className="bg-[#131414]">
            <Editor
              languages={languages}
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
              round="Round 1"
              setfullScreen={setFullScreenEditor}
              fullScreen={fullScreenEditor}
            />
          </div>

          <div className={`bg-[#131414]`}>
            <TestCases
              results={selectedTestcases}
              compilerDetails={defaultCompilerDetails}
              fullScreen={fullScreenTestCases}
              setfullScreen={setFullScreenTestCases}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
