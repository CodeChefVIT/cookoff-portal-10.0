"use client";

import { byRound } from "@/api/question";
import axios from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

import { Inter } from "next/font/google";
import TabButton from "./TabButton";
import Markdown from "react-markdown";
import toast from "react-hot-toast";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import vscDarkPlus from "react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus";

const inter = Inter({ subsets: ["latin"] });



interface Question {
  id: number;
  title: string;
  points: number;
  content: string[];
  description?: string;
  inputFormat?: string[];
  constraints?: string[];
  outputFormat?: string[];
  sampleTestInput?: string[];
  sampleTestOutput?: string[];
  explanation?: string[];
}

interface QuestionWindowProps {
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  setQuestionID: React.Dispatch<React.SetStateAction<number>>;
  questionID: number;
}

const QuestionWindow: React.FC<QuestionWindowProps> = ({
  questions,
  setQuestions,
  questionID,
  setQuestionID,
}) => {
  const [activeTab, setActiveTab] = useState<number>(
    questionID || questions[0]?.id || 1
  );
  const [selectedQuestion, setSelectedQuestion] = useState<Question | undefined>(
    questions[0]
  );
  const router = useRouter();

  const handleQuestionChange = (id: number) => {
    setActiveTab(id);
    setQuestionID(id);
    setSelectedQuestion(questions.find((q) => q.id === id));
  };

  useEffect(() => {
    const found = questions.find((q) => q.id === activeTab);
    setSelectedQuestion(found);
  }, [questions, activeTab]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await byRound();
        const fetched: Question[] = response.map(
          (item: unknown, index: number) => {
            const question = item as {
              question: {
                Title: string;
                Points: number;
                Description: string;
                Constraints?: string[];
              };
            };
            return {
              id: index + 1,
              title: question.question.Title,
              points: question.question.Points,
              content: [
                question.question.Description,
                ...(question.question.Constraints ?? []),
              ],
              description: question.question.Description,
              constraints: question.question.Constraints ?? [],
            };
          }
        );

        setQuestions(fetched);

        if (fetched[0]) {
          setActiveTab(fetched[0].id);
          setQuestionID(fetched[0].id);
          setSelectedQuestion(fetched[0]);
        }
      } catch (err) {
        if (err instanceof ApiError && err.statusCode === 401) {
          router.push("/");
          return;
        }
        toast.error("Failed to fetch questions");
        setTimeout(() => router.push("/kitchen"), 2000);
      }
    };

    void fetchQuestions();
  }, [router, setQuestions, setQuestionID]);

  return (
    <div className="bg-[#131414] p-6 sm:p-8 max-w-4xl mx-auto relative w-full min-h-[120vh]">
      <div className="w-full max-w-4xl">
        {/* Tabs */}
        <div className="flex items-center space-x-1 sm:space-x-2 mb-[-1px] pl-4">
          {questions.map((q) => (
            <TabButton
              key={q.id}
              id={String(q.id)}
              active={activeTab === q.id}
              onClick={() => handleQuestionChange(q.id)}
            />
          ))}
        </div>

        {/* Question content */}
        <div className="bg-[#131414] p-6 sm:p-8 max-w-4xl mx-auto relative w-full min-h-[120vh]">
          {selectedQuestion && (
            <main>
              <h1 className="text-2xl sm:text-3xl font-bold text-green-400 mb-2 font-nulshock">
                {selectedQuestion.title}
              </h1>
              <span className="inline-block bg-[#484848] text-gray-200 text-xs font-semibold px-3 py-1 mt-4 mb-8">
                {selectedQuestion.points} Points
              </span>
              <div className="prose prose-invert prose-sm sm:prose-base max-w-none text-gray-400 space-y-4">
                {selectedQuestion.content.map((para, i) => (
                  <Markdown key={i}>{para}</Markdown>
                ))}
              </div>

              <div className="prose prose-invert prose-sm sm:prose-base max-w-none text-gray-400 space-y-6">
                {/* Problem */}
                <section>
                  <h2 className="text-green-400 font-semibold mb-2">Problem</h2>
                  <Markdown>{selectedQuestion.description ?? ""}</Markdown>
                </section>

                <section>
  <h2 className="text-green-400 font-semibold mb-2">Input Format</h2>
  {selectedQuestion.inputFormat?.length ? (
    <Markdown>
      {selectedQuestion.inputFormat.map((item) => `- ${item}`).join("\n")}
    </Markdown>
  ): null }
</section>


               {/* Constraints */}
<section>
  <h2 className="text-green-400 font-semibold mb-2">Constraints</h2>
  {selectedQuestion.constraints?.length ? (
    <Markdown>
      {selectedQuestion.constraints.map((item) => `- ${item}`).join("\n")}
    </Markdown>
  ) : (
    <p className="text-gray-500">No constraints provided.</p>
  )}
</section>

{/* Output Format */}
<section>
  <h2 className="text-green-400 font-semibold mb-2">Output Format</h2>
  {selectedQuestion.outputFormat?.length ? (
    <Markdown>
      {selectedQuestion.outputFormat.map((item) => `- ${item}`).join("\n")}
    </Markdown>
  ) : (
    <p className="text-gray-500">No output format provided.</p>
  )}
</section>

{/* Sample Test Cases */}
<section>
  <h2 className="text-green-400 font-semibold mb-2">Sample Test Cases</h2>
  {(() => {
    const sampleCount = Math.max(
      selectedQuestion.sampleTestInput?.length || 0,
      selectedQuestion.sampleTestOutput?.length || 0,
      selectedQuestion.explanation?.length || 0
    );

    return sampleCount > 0 ? (
      Array.from({ length: sampleCount }).map((_, i) => (
        <div key={i} className="mb-6">
          {selectedQuestion.sampleTestInput?.[i] && (
            <div className="mb-4">
              <h3 className="text-green-400 font-semibold">
                Sample Input {i + 1}
              </h3>
              <Markdown>{`\`\`\`\n${selectedQuestion.sampleTestInput[i]}\n\`\`\``}</Markdown>
            </div>
          )}

          {selectedQuestion.sampleTestOutput?.[i] && (
            <div className="mb-4">
              <h3 className="text-green-400 font-semibold">
                Sample Output {i + 1}
              </h3>
              <Markdown>{`\`\`\`\n${selectedQuestion.sampleTestOutput[i]}\n\`\`\``}</Markdown>
            </div>
          )}

          {selectedQuestion.explanation?.[i] && (
            <div className="mb-4">
              <h3 className="text-green-400 font-semibold">
                Explanation {i + 1}
              </h3>
              <Markdown>{selectedQuestion.explanation[i]}</Markdown>
            </div>
          )}
        </div>
      ))
    ) : (
      <p className="text-gray-500">No sample test cases available.</p>
    );
  })()}
</section>

              </div>
            </main>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionWindow;
