"use client";

import React, { useState } from "react";
import { Inter, Quicksand } from "next/font/google"; 

const inter = Inter({ subsets: ["latin"] });
const quicksand = Quicksand({ subsets: ["latin"] });

type Question = {
  id: number;
  title: string;
  points: number;
  content: string[];
};

interface QuestionWindowProps {
  questions: Question[];
}

const QuestionWindow: React.FC<QuestionWindowProps> = ({ questions }) => {
  const [activeTab, setActiveTab] = useState(questions[0]?.id || 1);

  return (
    <div
      className={`bg-[#070E0A] text-gray-300 min-h-screen p-4 sm:p-8 flex items-center justify-center ${inter.className}`}
    >
      <div className="w-full max-w-4xl">
        <div className="flex items-center space-x-1 sm:space-x-2 mb-[-1px] pl-4">
          {questions.map((q) => (
            <button
              key={q.id}
              onClick={() => setActiveTab(q.id)}
              className={`
                relative w-[100px] h-[35px] flex items-center justify-center p-0 group
                transition-transform duration-200 ease-out
                bg-transparent hover:bg-transparent active:bg-transparent
                border-none shadow-none outline-none
                ${activeTab === q.id ? "scale-110 z-10" : ""}
              `}
              style={{ background: 'none' }}
            >
              {/* Trapezium instead of svg */}
              <div
                className={`
                  absolute inset-0 w-full h-full
                  transform transition duration-200 ease-out
                  ${activeTab === q.id ? "scale-115" : "group-hover:scale-110"}
                `}
                style={{
                  backgroundColor: activeTab === q.id ? '#B7AB98' : '#B7AB9880',
                  clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
                  borderRadius: '8px'
                }}
              />
              
              <span
                className={`relative z-10 font-bold text-xl ${quicksand.className}`}
                style={{ color: "#000000ff", userSelect: "none" }}
              >
                {q.id}
              </span>
            </button>
          ))}
        </div>

        <div className="bg-[#131414] p-6 sm:p-8 max-w-4xl mx-auto relative w-full">
          <main>
            {questions
              .filter((q) => q.id === activeTab)
              .map((q) => (
                <div key={q.id}>
                  <h1 className="text-2xl sm:text-3xl font-bold text-green-400 mb-2 font-nulshock">
                    {q.title}
                  </h1>
                  <span className="inline-block bg-[#484848] text-white-200 text-xs font-semibold px-3 py-1 mt-12 mb-8">
                    {q.points} Points
                  </span>
                  <div className="prose prose-invert prose-sm sm:prose-base max-w-none text-white-400 space-y-4">
                    {q.content.map((para, i) => (
                      <p key={i}>{para}</p>
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