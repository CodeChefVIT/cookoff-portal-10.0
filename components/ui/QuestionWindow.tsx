"use client";

import { byRound, Question } from "@/api/question";
import { ApiError } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import TabButton from "./TabButton";
import Markdown from "react-markdown";
import toast from "react-hot-toast";
import useKitchenStore from "store/zustant";

const inter = Inter({ subsets: ["latin"] });

const hardcodedQuestions = [
  {
    question: {
      ID: "1",
      Title: "PROBLEM 1: REVERSE STRING",
      Points: 10,
      Description:
        "Given a string s, return the string reversed. The string may contain letters, digits, and special characters. You must return the reversed version of the string without modifying the original input.",
      Qtype: "EASY",
      Isbountyactive: false,
      InputFormat: ["Line 1: A string s."],
      Round: 1,
      Constraints: [
        "1 <= s.length <= 10^5",
        "s consists of printable ASCII characters.",
      ],
      OutputFormat: ["A reversed string."],
      SampleTestInput: ["hello"],
      SampleTestOutput: ["olleh"],
      Explanation: ["Reversing 'hello' gives 'olleh'"],
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
      ID: "2",
      Title: "PROBLEM 2: MAXIMUM ELEMENT",
      Points: 15,
      Description:
        "Given an array of integers nums, return the maximum element in the array. You must do this in O(n) time by scanning through the array once.",
      Qtype: "EASY",
      Isbountyactive: false,
      InputFormat: ["Line 1: An array of integers nums."],
      Round: 1,
      Constraints: ["1 <= nums.length <= 10^5", "-10^9 <= nums[i] <= 10^9"],
      OutputFormat: ["An integer representing the maximum element."],
      SampleTestInput: ["[1, 5, 3, 9, 2]"],
      SampleTestOutput: ["9"],
      Explanation: ["The maximum element in [1,5,3,9,2] is 9."],
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
];

const QuestionWindow: React.FC = () => {
  const router = useRouter();
  const {
    questions,
    selectedQuestionId,
    setQuestionsAndTestcases,
    setSelectedQuestionId,
  } = useKitchenStore();

  const [activeTab, setActiveTab] = useState<string>(selectedQuestionId);
  const [selectedQuestion, setSelectedQuestion] = useState<
    Question | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(questions.length === 0);

  const handleQuestionChange = (id: string) => {
    setActiveTab(id);
    setSelectedQuestionId(id);
    const found = questions.find((q) => q.ID === id);
    setSelectedQuestion(found);
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      if (questions.length > 0) {
        setIsLoading(false);
        const initialQuestion =
          questions.find((q) => q.ID === selectedQuestionId) || questions[0];
        if (initialQuestion) {
          setActiveTab(initialQuestion.ID);
          setSelectedQuestionId(initialQuestion.ID);
          setSelectedQuestion(initialQuestion);
        }
        return;
      }

      try {
        setIsLoading(true);
        const response = await byRound();
        const fetchedQuestions: Question[] = response.map(
          ({ question }) => question
        );
        const fetchedTestcases = response.flatMap(
          ({ testcases }) => testcases ?? []
        );

        setQuestionsAndTestcases(fetchedQuestions, fetchedTestcases);

        if (fetchedQuestions.length > 0) {
          const initialQuestion =
            fetchedQuestions.find((q) => q.ID === selectedQuestionId) ||
            fetchedQuestions[0];
          setActiveTab(initialQuestion.ID);
          setSelectedQuestionId(initialQuestion.ID);
          setSelectedQuestion(initialQuestion);
        }
      } catch (err) {
        if (err instanceof ApiError && err.statusCode === 401) {
          router.push("/");
          return;
        }
        toast.error("Failed to fetch questions, using hardcoded data.");

        const fallbackQuestions = hardcodedQuestions.map(
          ({ question }) => question
        );
        const fallbackTestcases = hardcodedQuestions.flatMap(
          ({ testcases }) => testcases
        );
        setQuestionsAndTestcases(fallbackQuestions, fallbackTestcases);

        if (fallbackQuestions.length > 0) {
          const initialQuestion =
            fallbackQuestions.find((q) => q.ID === selectedQuestionId) ||
            fallbackQuestions[0];
          setActiveTab(initialQuestion.ID);
          setSelectedQuestionId(initialQuestion.ID);
          setSelectedQuestion(initialQuestion);
        }
      } finally {
        setIsLoading(false);
      }
    };

    void fetchQuestions();
  }, [
    questions,
    selectedQuestionId,
    setQuestionsAndTestcases,
    setSelectedQuestionId,
    router,
  ]);

  if (isLoading) {
    return (
      <div className="bg-[#131414] p-6 sm:p-8 max-w-4xl mx-auto relative w-full min-h-[120vh] flex items-center justify-center">
        <div className="text-green-400 text-xl">Loading questions...</div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="bg-[#131414] p-6 sm:p-8 max-w-4xl mx-auto relative w-full min-h-[120vh] flex items-center justify-center">
        <div className="text-gray-400 text-xl">No questions available</div>
      </div>
    );
  }

  return (
    <div
      className={`bg-[#070E0A] text-gray-300 min-h-screen flex items-center justify-center ${inter.className}`}
    >
      <div className="w-full max-w-4xl">
        {/* Tabs */}
        <div className="flex items-center space-x-1 sm:space-x-2 mb-[-1px] pl-4 ">
          {questions.map((q) => (
            <TabButton
              key={q.ID}
              id={q.ID}
              active={activeTab === q.ID}
              onClick={() => handleQuestionChange(q.ID)}
            />
          ))}
        </div>

        {/* Question content */}
        <div className="bg-[#131414] p-6 sm:p-8 max-w-4xl mx-auto relative w-full min-h-[50vh] h-[90vh] overflow-y-scroll [&::-webkit-scrollbar]:w-0">
          {selectedQuestion ? (
            <main>
              <h1 className="text-2xl sm:text-3xl font-bold text-green-400 mb-2 font-nulshock">
                {selectedQuestion.Title}
              </h1>
              <span className="inline-block bg-[#484848] text-gray-200 text-xs font-semibold px-3 py-1 mt-4 mb-8">
                {selectedQuestion.Points} Points
              </span>
              <div className="prose prose-invert prose-sm sm:prose-base max-w-none text-gray-400 space-y-4">
                <section>
                  <h2 className="text-green-400 font-semibold mb-2">
                    Problem
                  </h2>

                  <Markdown>{selectedQuestion.Description}</Markdown>
                </section>

                {/* Input Format */}
                <section>
                  <h2 className="text-green-400 font-semibold mb-2">
                    Input Format
                  </h2>
                  <Markdown>
                    {(selectedQuestion.InputFormat ?? [])
                      .map((item) => `- ${item}`)
                      .join("\n")}
                  </Markdown>
                </section>

                {/* Constraints */}
                <section>
                  <h2 className="text-green-400 font-semibold mb-2">
                    Constraints
                  </h2>
                  <Markdown>
                    {(selectedQuestion.Constraints ?? [])
                      .map((item) => `- ${item}`)
                      .join("\n")}
                  </Markdown>
                </section>

                {/* Output Format */}
                <section>
                  <h2 className="text-green-400 font-semibold mb-2">
                    Output Format
                  </h2>
                  <Markdown>
                    {(selectedQuestion.OutputFormat ?? [])
                      .map((item) => `- ${item}`)
                      .join("\n")}
                  </Markdown>
                </section>

                {/* Sample Test Cases */}
                <section>
                  <h2 className="text-green-400 font-semibold mb-2">
                    Sample Test Cases
                  </h2>
                  {(selectedQuestion.SampleTestInput ?? []).map((input, i) => (
                    <div key={i} className="mb-6">
                      <div className="mb-4">
                        <h3 className="text-green-400 font-semibold">
                          Sample Input {i + 1}
                        </h3>
                        <Markdown>{`
${input}
`}</Markdown>
                      </div>
                      <div className="mb-4">
                        <h3 className="text-green-400 font-semibold">
                          Sample Output {i + 1}
                        </h3>
                        <Markdown>{`
${(selectedQuestion.SampleTestOutput ?? [])[i]}
`}</Markdown>
                      </div>
                      <div className="mb-4">
                        <h3 className="text-green-400 font-semibold">
                          Explanation {i + 1}
                        </h3>
                        <Markdown>
                          {(selectedQuestion.Explanation ?? [])[i]}
                        </Markdown>
                      </div>
                    </div>
                  ))}
                </section>
              </div>
            </main>
          ) : (
            <div className="flex items-center justify-center h-64">
              <div className="text-gray-400 text-xl">Question not found</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionWindow;