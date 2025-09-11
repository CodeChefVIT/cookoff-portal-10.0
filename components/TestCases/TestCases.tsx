"use client";
import React, { useState } from "react";
import InputOutputCard from "./InputOutputCard";
import { Button } from "../ui/button";
import { BsEyeSlash, BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import CompilerMessage from "./CompilerMessage";

interface TestCase {
  id: number;
  status: "Passed" | "Failed" | "Error";
  input: string;
  output: string;
  expectedOutput: string;
  isHidden: boolean;
}

interface CompilerResult {
  isCompileSuccess: boolean;
  message: string;
}

interface TestCasesProps {
  results: TestCase[];
  compilerDetails: CompilerResult;
}

function getScoreColor(count: number, total: number) {
  const percentage = (count / total) * 100;
  if (percentage >= 90) return "text-primary";
  if (percentage >= 50) return "text-chart-4";
  return "text-accent";
}

const TestCases = ({ results, compilerDetails }: TestCasesProps) => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);

  const visibleCases = results.filter((r) => !r.isHidden);
  const hiddenCases = results.filter((r) => r.isHidden);
  const passedCount = results.filter((r) => r.status === "Passed").length;
  const hiddenPassedCount = hiddenCases.filter(
    (r) => r.status === "Passed"
  ).length;

  const activeCaseData = visibleCases[activeCaseIndex];
  const totalCases = results.length;

  return (
    <div className="flex w-[50vw] flex-col gap-4 bg-testcasesBG p-1 font-roboto">
      <div
        className={`rounded-xl bg-secondary px-4 py-4 text-3xl font-bold ${getScoreColor(
          passedCount,
          totalCases
        )}`}
      >
        {`${passedCount}/${totalCases} Test Cases Passed !!`}
      </div>

      <div className="flex items-center gap-3">
        {visibleCases.map((testCase, idx) => (
          <Button
            key={testCase.id}
            variant={activeCaseIndex === idx ? "secondary" : "ghost"}
            className={`rounded-xl px-4 py-2 text-sm font-semibold`}
            onClick={() => setActiveCaseIndex(idx)}
          >
            {testCase.status === "Passed" ? (
              <BsCheckCircleFill className={`mr-2 size-4 text-primary`} />
            ) : (
              <BsXCircleFill className={`mr-2 size-4 text-accent`} />
            )}
            {`Case ${idx + 1}`}
          </Button>
        ))}
        {hiddenCases.length > 0 && (
          <div className="ml-auto flex cursor-pointer items-center gap-2 rounded-xl bg-secondary px-4 py-2 text-sm hover:scale-105">
            <BsEyeSlash
              className={`opacity-80 ${getScoreColor(
                hiddenPassedCount,
                hiddenCases.length
              )}`}
            />
            <span className="opacity-80">Hidden Testcases</span>
            <span className="opacity-80">{`${hiddenPassedCount}/${hiddenCases.length}`}</span>
          </div>
        )}
      </div>

      <CompilerMessage isCompileSuccess={compilerDetails.isCompileSuccess} />

      {activeCaseData && (
        <>
          {activeCaseData.expectedOutput ? (
            <div className="flex justify-between font-inter">
              <InputOutputCard
                title={"Input"}
                data={activeCaseData.input}
                className={"w-[31%]"}
              />
              <InputOutputCard
                title={"Expected Output"}
                data={activeCaseData.expectedOutput}
                className={"w-[31%]"}
              />
              <InputOutputCard
                title={"Your Output"}
                data={activeCaseData.output}
                className={"w-[31%]"}
              />
            </div>
          ) : (
            <div className="flex justify-between font-inter">
              <InputOutputCard
                title={"Input"}
                data={activeCaseData.input}
                className={"w-[48%]"}
              />
              <InputOutputCard
                title={"Your Output"}
                data={activeCaseData.output}
                className={"w-[48%]"}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TestCases;
