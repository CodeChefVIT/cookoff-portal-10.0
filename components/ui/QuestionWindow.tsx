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

type Question = {
  id: number;
  title: string;
  points: number;
  content: string[];
};

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

  // fetch questions from API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await byRound();
        const fetched: Question[] = response.map((item: any, index: number) => ({
          id: index + 1,
          title: item.question.Title,
          points: item.question.Points,
          content: [item.question.Description, ...(item.question.Constraints ?? [])],
        }));

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
    <div
      className={`bg-[#070E0A] text-gray-300 min-h-screen p-4 sm:p-8 flex items-center justify-center ${inter.className}`}
    >
      <div className="w-full max-w-4xl">
        {/* Tabs */}
        <div className="flex items-center space-x-1 sm:space-x-2 mb-[-1px] pl-4">
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

              {/* Example syntax highlighting block */}
              <div className="mt-6">
                <SyntaxHighlighter
                  language="plaintext"
                  style={vscDarkPlus}
                  className="rounded-md"
                >
                  {"Sample code or input/output can go here"}
                </SyntaxHighlighter>
              </div>
            </main>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionWindow;
