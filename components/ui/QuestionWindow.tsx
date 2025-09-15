"use client";

import React, { useState } from "react";
import { Inter } from "next/font/google";
import TabButton from "./TabButton";
import Markdown from "react-markdown";

const inter = Inter({ subsets: ["latin"] });

type Question = {
  id: number;
  title: string;
  points: number;
  content: string[];
};

interface QuestionWindowProps {
  questions: Question[];
  setQuestionID: React.Dispatch<React.SetStateAction<number>>;
  questionID: number;
}

const QuestionWindow: React.FC<QuestionWindowProps> = ({
  questions,
  questionID,
  setQuestionID,
}) => {
  const [activeTab, setActiveTab] = useState(questionID || questions[0]?.id || 1);

  return (
    <div
      className={`bg-[#070E0A] text-gray-300 min-h-screen p-4 sm:p-8 flex items-center justify-center ${inter.className}`}
    >
      <div className="w-full max-w-4xl">
        <div className="flex items-center space-x-1 sm:space-x-2 mb-[-1px] pl-4">
          {questions.map((q) => (
            <TabButton
              key={q.id}
              id={q.id}
              active={activeTab === q.id}
              onClick={() => {
                setActiveTab(q.id);
                setQuestionID(q.id);
              }}
            />
          ))}
        </div>

        <div className="bg-[#131414] p-6 sm:p-8 max-w-4xl mx-auto relative w-full min-h-[170vh]">
          <main>
            {questions
              .filter((q) => q.id === activeTab)
              .map((q) => (
                <div key={q.id}>
                  <h1 className="text-2xl sm:text-3xl font-bold text-green-400 mb-2 font-nulshock">
                    {q.title}
                  </h1>
                  <span className="inline-block bg-[#484848] text-gray-200 text-xs font-semibold px-3 py-1 mt-12 mb-8">
                    {q.points} Points
                  </span>
                  <div className="prose prose-invert prose-sm sm:prose-base max-w-none text-gray-400 space-y-4">
                    {q.content.map((para, i) => (
                      <Markdown key={i}>{para}</Markdown>
                    ))}
                  </div>
                </div>
              ))}
          </main>
        </div>
      </div>
    </div>
  );
};

export default QuestionWindow;
