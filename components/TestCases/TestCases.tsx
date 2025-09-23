"use client";
import React, { useState } from "react";
import InputOutputCard from "./InputOutputCard";
import Button from "../ui/Button";
import { BsEyeSlash, BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import CompilerMessage from "./CompilerMessage";
import { TestcaseFromAPI } from "@/api/question";
import { MdFullscreen } from "react-icons/md";
import { MdFullscreenExit } from "react-icons/md";
interface CompilerResult {
  isCompileSuccess: boolean;
  message: string;
}

interface TestCasesProps {
  results: TestcaseFromAPI[];
  compilerDetails: CompilerResult;
  setfullScreen: React.Dispatch<React.SetStateAction<boolean>>;
  fullScreen: boolean;
  panelSize: number;
}

function getScoreColor(count: number, total: number) {
  const percentage = (count / total) * 100;
  if (percentage >= 90) return "text-ring";
  if (percentage >= 50) return "text-chart-4";
  return "text-accent";
}

const TestCases = ({
  results,
  compilerDetails,
  fullScreen,
  setfullScreen,
  panelSize,
}: TestCasesProps) => {
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
  
  // Helper function to determine if panel is large enough for certain components
  const isPanelLarge = panelSize >= 70; // 30% or larger
  const isPanelMedium = panelSize >= 15; // 20% or larger
  const isPanelSmall = panelSize < 5; // Less than 20%
  
  return (
    <div
      className={`${
        fullScreen
          ? "h-[95vh] w-screen -top-0 left-0 fixed z-50 overflow-y-scroll "
          : "min-h-[50vh] h-full "
      }flex flex-col flex-wrap gap-4 bg-testcasesBG p-2 font-roboto`}
    >
      <div className="flex justify-between items-center">
        {/* Conditional score display based on panel size */}
        {isPanelMedium ? (
          <div
            className={`rounded-xl bg-testcasesBG px-4 py-4 text-3xl font-bold ${getScoreColor(
              passedCount,
              totalCases
            )}`}
          >
            {`${passedCount}/${totalCases} Test Cases Passed !!`}
          </div>
        ) : (
          <div
            className={`rounded-xl bg-testcasesBG px-2 py-2 text-lg font-bold ${getScoreColor(
              passedCount,
              totalCases
            )}`}
          >
            {`${passedCount}/${totalCases}`}
          </div>
        )}
        
        {/* Conditional fullscreen button */}
        {isPanelMedium && (fullScreen ? (
          <MdFullscreenExit
            className="scale-200"
            onClick={() => setfullScreen((prev) => !prev)}
          />
        ) : (
          <MdFullscreen
            className="scale-200 "
            onClick={() => setfullScreen((prev) => !prev)}
          />
        ))}
      </div>
      {/* Conditional test case buttons based on panel size */}
      {isPanelMedium ? (
        <div className="flex items-center gap-3">
          {visibleCases.map((testCase, idx) => (
            <Button
              key={testCase.id}
              variant={"secondary"}
              className={`rounded-xl px-4 py-2 text-sm font-semibold bg-secondary hover:bg-border`}
              onClick={() => setActiveCaseIndex(idx)}
            >
              {testCase.expected_output === testCase.output ? (
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
              <span className="opacity-80">Hidden</span>
              <span className="opacity-80">{`${hiddenPassedCount}/${hiddenCases.length}`}</span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          {/* Compact view for small panels */}
          {visibleCases.slice(0, 3).map((testCase, idx) => (
            <Button
              key={testCase.id}
              variant={"secondary"}
              className={`rounded-lg px-2 py-1 text-xs font-semibold bg-secondary hover:bg-border`}
              onClick={() => setActiveCaseIndex(idx)}
            >
              {testCase.expected_output === testCase.output ? (
                <BsCheckCircleFill className={`mr-1 size-3 text-ring`} />
              ) : (
                <BsXCircleFill className={`mr-1 size-3 text-accent`} />
              )}
              {idx + 1}
            </Button>
          ))}
          {visibleCases.length > 3 && (
            <span className="text-xs opacity-60">+{visibleCases.length - 3} more</span>
          )}
        </div>
      )}
      {/* Conditional compiler message and input/output cards */}
      {isPanelMedium && (
        <div className="">
          <CompilerMessage
            isCompileSuccess={compilerDetails.isCompileSuccess}
          />
          {activeCaseData && (
            <>
              {activeCaseData.expected_output ? (
                <div className="flex justify-between font-inter">
                  <InputOutputCard
                    title={"Input"}
                    data={activeCaseData.input}
                    className={isPanelLarge ? "w-[31%]" : "w-[48%]"}
                  />
                  <InputOutputCard
                    title={"Expected Output"}
                    data={activeCaseData.expected_output}
                    className={isPanelLarge ? "w-[31%]" : "w-[48%]"}
                  />
                  {isPanelLarge && (
                    <InputOutputCard
                      title={"Your Output"}
                      data={
                        activeCaseData.output
                          ? activeCaseData.output
                          : "no output given"
                      }
                      className={"w-[31%]"}
                    />
                  )}
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
      )}
      
      {/* Show minimal info for very small panels */}
      {isPanelSmall && (
        <div className="text-center text-sm opacity-60">
          Resize panel to view test case details
        </div>
      )}
    </div>
  );
};

export default TestCases;
