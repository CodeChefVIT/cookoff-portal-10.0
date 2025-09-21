"use client";

import { byRound } from "@/api/question";
import { ApiError } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import TabButton from "./TabButton";
import Markdown from "react-markdown";
import toast from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

/* ---------- Types ---------- */
interface TestcaseFromAPI {
  id: string;
  input: string;
  output: string;
  expected_output: string;
  hidden: boolean;
  runtime: number;
  memory: number;
  question_id: string;
}

interface QuestionWithTestcases {
  id: string; // uuid
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
  testcases: TestcaseFromAPI[];
}

// derive Question from API shape (no testcases)
type Question = Omit<QuestionWithTestcases, "testcases">;

interface QuestionWindowProps {
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  setQuestionID: React.Dispatch<React.SetStateAction<string>>;
  questionID: string;
}

/* ---------- Component ---------- */
const QuestionWindow: React.FC<QuestionWindowProps> = ({
  questions,
  setQuestions,
  questionID,
  setQuestionID,
}) => {
  const [activeTab, setActiveTab] = useState<string>(questionID);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(questions.length === 0);
  const router = useRouter();

  const handleQuestionChange = (id: string) => {
    setActiveTab(id);
    setQuestionID(id);
    const found = questions.find((q) => q.id === id);
    setSelectedQuestion(found);
  };

  useEffect(() => {
    if (questions.length > 0) {
      const found = questions.find((q) => q.id === activeTab);
      setSelectedQuestion(found);
    }
  }, [questions, activeTab]);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (questions.length > 0) {
        setIsLoading(false);
        const initialQuestion = questions.find((q) => q.id === questionID) || questions[0];
        if (initialQuestion) {
          setActiveTab(initialQuestion.id);
          setQuestionID(initialQuestion.id);
          setSelectedQuestion(initialQuestion);
        }
        return;
      }

      try {
        setIsLoading(true);
        const response: QuestionWithTestcases[] = await byRound();

        // strip testcases
        const fetched: Question[] = response.map(({ testcases, ...rest }) => rest);

        setQuestions(fetched);

        if (fetched.length > 0) {
          const initialQuestion = fetched.find((q) => q.id === questionID) || fetched[0];
          setActiveTab(initialQuestion.id);
          setQuestionID(initialQuestion.id);
          setSelectedQuestion(initialQuestion);
        }
      } catch (err) {
        if (err instanceof ApiError && err.statusCode === 401) {
          router.push("/");
          return;
        }
        toast.error("Failed to fetch questions");
        setTimeout(() => router.push("/kitchen"), 2000);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchQuestions();
  }, []); // run once

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
    <div className="bg-[#131414] max-w-4xl mx-auto relative w-full min-h-[120vh]">
      {/* Tabs */}
      <div className="flex items-center space-x-1 sm:space-x-2 mb-[-1px] pl-4 pt-6 sm:pt-8">
        {questions.map((q) => (
          <TabButton
            key={q.id}
            id={q.id}
            active={activeTab === q.id}
            onClick={() => handleQuestionChange(q.id)}
          />
        ))}
      </div>

      {/* Question content */}
      <div className="p-6 sm:p-8">
        {selectedQuestion ? (
          <main>
            <h1 className="text-2xl sm:text-3xl font-bold text-green-400 mb-2 font-nulshock">
              {selectedQuestion.title}
            </h1>
            <span className="inline-block bg-[#484848] text-gray-200 text-xs font-semibold px-3 py-1 mt-4 mb-8">
              {selectedQuestion.points} Points
            </span>

            <div className="prose prose-invert prose-sm sm:prose-base max-w-none text-gray-400 space-y-6 mt-8">
              {/* Problem */}
              <section>
                <h2 className="text-green-400 font-semibold mb-2">Problem</h2>
                <Markdown>{selectedQuestion.description}</Markdown>
              </section>

              {/* Input Format */}
              <section>
                <h2 className="text-green-400 font-semibold mb-2">Input Format</h2>
                <Markdown>
                  {selectedQuestion.inputFormat.map((item) => `- ${item}`).join("\n")}
                </Markdown>
              </section>

              {/* Constraints */}
              <section>
                <h2 className="text-green-400 font-semibold mb-2">Constraints</h2>
                <Markdown>
                  {selectedQuestion.constraints.map((item) => `- ${item}`).join("\n")}
                </Markdown>
              </section>

              {/* Output Format */}
              <section>
                <h2 className="text-green-400 font-semibold mb-2">Output Format</h2>
                <Markdown>
                  {selectedQuestion.outputFormat.map((item) => `- ${item}`).join("\n")}
                </Markdown>
              </section>

              {/* Sample Test Cases */}
              <section>
                <h2 className="text-green-400 font-semibold mb-2">Sample Test Cases</h2>
                {selectedQuestion.sampleTestInput.map((input, i) => (
                  <div key={i} className="mb-6">
                    <div className="mb-4">
                      <h3 className="text-green-400 font-semibold">Sample Input {i + 1}</h3>
                      <Markdown>{`\`\`\`\n${input}\n\`\`\``}</Markdown>
                    </div>
                    <div className="mb-4">
                      <h3 className="text-green-400 font-semibold">Sample Output {i + 1}</h3>
                      <Markdown>{`\`\`\`\n${selectedQuestion.sampleTestOutput[i]}\n\`\`\``}</Markdown>
                    </div>
                    <div className="mb-4">
                      <h3 className="text-green-400 font-semibold">Explanation {i + 1}</h3>
                      <Markdown>{selectedQuestion.explanation[i]}</Markdown>
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
  );
};

export default QuestionWindow;
