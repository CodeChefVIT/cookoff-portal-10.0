"use client";

import { Question } from "@/api/question";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import TabButton from "./TabButton";
import Markdown from "react-markdown";
import useKitchenStore from "store/zustant";

const inter = Inter({ subsets: ["latin"] });

const QuestionWindow: React.FC = () => {
  const router = useRouter();
  const { questions, selectedQuestionId, setSelectedQuestionId } =
    useKitchenStore();

  const [activeTab, setActiveTab] = useState<string>(selectedQuestionId);
  const [selectedQuestion, setSelectedQuestion] = useState<
    Question | undefined
  >(undefined);

  const handleQuestionChange = (id: string) => {
    setActiveTab(id);
    setSelectedQuestionId(id);
    const found = questions.find((q) => q.ID === id);
    setSelectedQuestion(found);
  };

  useEffect(() => {
    if (questions.length > 0) {
      const initialQuestion =
        questions.find((q) => q.ID === selectedQuestionId) || questions[0];
      if (initialQuestion) {
        setActiveTab(initialQuestion.ID);
        setSelectedQuestionId(initialQuestion.ID);
        setSelectedQuestion(initialQuestion);
      }
    }
  }, [questions, selectedQuestionId, setSelectedQuestionId]);

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
          {questions.map((q, key) => (
            <TabButton
              key={q.ID}
              id={q.ID}
              newId={key}
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
                  <h2 className="text-green-400 font-semibold mb-2">Problem</h2>

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
