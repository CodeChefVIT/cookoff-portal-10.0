"use client";
import React, { useState } from "react";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";
import useKitchenStore from "store/zustant";
import { TestCase } from "store/zustant";
import { useTestCases } from "./useTestCases";
import SelectTestCases from "./SelectTestCases";
import Input from "./Input";

interface CompilerResult {
  isCompileSuccess: boolean;
  message: string;
}

interface TestCasesProps {
  results: TestCase[];
  compilerDetails: CompilerResult;
  panelSize: number;
}

function getTestCaseScoreColor(count: number, total: number) {
  const percentage = (count / total) * 100;
  if (percentage >= 90) return "text-ring";
  if (percentage >= 50) return "text-chart-4";
  return "text-accent";
}

const TestCases = ({ results, compilerDetails }: TestCasesProps) => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const { fullScreenTestCases, setFullScreenTestCases } = useKitchenStore();
  const {
    visibleCases,
    hiddenCases,
    passedCount,
    hiddenPassedCount,
    totalCases,
    outputExists,
  } = useTestCases(results);
  const activeCaseData = visibleCases[activeCaseIndex];
  return (
    <div
      className={`${
        fullScreenTestCases
          ? "h-[100vh] w-screen -top-0 left-0 fixed z-50 overflow-y-scroll "
          : "min-h-[50vh] h-full  "
      }flex flex-col flex-wrap gap-4 bg-testcasesBG p-2 font-roboto`}
    >
      <div>
        <div className="flex justify-between items-center">
          <div
            className={`rounded-xl bg-testcasesBG px-4 py-4 text-3xl font-bold ${
              outputExists
                ? getTestCaseScoreColor(passedCount, totalCases)
                : "text-gray-400"
            }`}
          >
            {outputExists
              ? `${passedCount}/${totalCases} Test Cases Passed !!`
              : `${totalCases} Test Cases`}
          </div>
          {fullScreenTestCases ? (
            <MdFullscreenExit
              className="scale-200"
              onClick={() => setFullScreenTestCases(false)}
            />
          ) : (
            <MdFullscreen
              className="scale-200 "
              onClick={() => setFullScreenTestCases(true)}
            />
          )}
        </div>
        <SelectTestCases
          visibleCases={visibleCases}
          hiddenCases={hiddenCases}
          hiddenPassedCount={hiddenPassedCount}
          setActiveCaseIndex={setActiveCaseIndex}
          getTestCaseScoreColor={getTestCaseScoreColor}
          outputExists={outputExists}
        />
      </div>

      <Input
        compilerDetails={compilerDetails}
        activeCaseData={activeCaseData}
        outputExists={outputExists}
      />
    </div>
  );
};

export default TestCases;
