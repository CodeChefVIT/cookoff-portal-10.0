"use client";
import React, { useState } from "react";
import InputOutputCard from "./InputOutputCard";
import Button from "../ui/Button";
import { BsEyeSlash, BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import CompilerMessage from "./CompilerMessage";
import { TestcaseFromAPI } from "@/api/question";
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
  results: TestcaseFromAPI[];
  compilerDetails: CompilerResult;
}

function getScoreColor(count: number, total: number) {
  const percentage = (count / total) * 100;
  if (percentage >= 90) return "text-ring";
  if (percentage >= 50) return "text-chart-4";
  return "text-accent";
}

const TestCases = ({ results, compilerDetails }: TestCasesProps) => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);

  const visibleCases = results.filter((r) => !r.hidden);
  const hiddenCases = results.filter((r) => r.hidden);
  const passedCount = results.filter(
    (r) => r.expected_output === r.output
  ).length;
  const hiddenPassedCount = hiddenCases.filter(
    (r) => r.expected_output === r.output
  ).length;

  const activeCaseData = visibleCases[activeCaseIndex];
  const totalCases = results.length;

  return (
    <div className="flex w-[50vw] flex-col flex-wrap gap-4 bg-testcasesBG p-2 font-roboto">
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
            variant={"secondary"}
            className={`rounded-xl px-4 py-2 text-sm font-semibold bg-secondary hover:bg-border`}
            onClick={() => setActiveCaseIndex(idx)}
          >
            {testCase.expected_output === testCase.expected_output ? (
              <BsCheckCircleFill className={`mr-2 size-4 text-ring`} />
            ) : (
              <BsXCircleFill className={`mr-2 size-4 text-accent`} />
            )}
            {`Case ${idx + 1}`}
          </Button>
        ))}
        {hiddenCases.length > 0 && (
          <div className="ml-auto flex cursor-pointer items-center gap-2 rounded-xl bg-secondary px-4 py-2 text-sm hover:scale-105 hover:bg-border">
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
          {activeCaseData.expected_output ? (
            <div className="flex justify-between font-inter">
              <InputOutputCard
                title={"Input"}
                data={activeCaseData.input}
                className={"w-[31%]"}
              />
              <InputOutputCard
                title={"Expected Output"}
                data={activeCaseData.expected_output}
                className={"w-[31%]"}
              />
              <InputOutputCard
                title={"Your Output"}
                data={
                  activeCaseData.output
                    ? activeCaseData.output
                    : "no output given"
                }
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
                data={
                  activeCaseData.output
                    ? activeCaseData.output
                    : "no output given"
                }
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
