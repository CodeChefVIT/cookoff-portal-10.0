"use client";
import React, { useState } from "react";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";
import useKitchenStore from "store/zustant";
import { TestcaseFromAPI } from "@/api/question";
import { useTestCases } from "./useTestCases";
import TestCasesLarge from "./TestCasesLarge";
import TestCasesMedium from "./TestCasesMedium";
import TestCasesSmall from "./TestCasesSmall";

interface CompilerResult {
  isCompileSuccess: boolean;
  message: string;
}

interface TestCasesProps {
  results: TestcaseFromAPI[];
  compilerDetails: CompilerResult;
  panelSize: number;
}

function getTestCaseScoreColor(count: number, total: number) {
  const percentage = (count / total) * 100;
  if (percentage >= 90) return "text-ring";
  if (percentage >= 50) return "text-chart-4";
  return "text-accent";
}

const TestCases = ({ results, compilerDetails, panelSize }: TestCasesProps) => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const { fullScreenTestCases, setFullScreenTestCases } = useKitchenStore();
  const {
    visibleCases,
    hiddenCases,
    passedCount,
    hiddenPassedCount,
    totalCases,
  } = useTestCases(results);

  const activeCaseData = visibleCases[activeCaseIndex];

  const isPanelLarge = panelSize >= 40;
  const isPanelMedium = panelSize >= 15;
  const isPanelSmall = panelSize > 10;

  return (
    <div
      className={`${
        fullScreenTestCases
          ? "h-[95vh] w-screen -top-0 left-0 fixed z-50 overflow-y-scroll "
          : "min-h-[50vh] h-full "
      }flex flex-col flex-wrap gap-4 bg-testcasesBG p-2 font-roboto`}
    >
      <div className="flex justify-between items-center">
        {isPanelMedium ? (
          <div
            className={`rounded-xl bg-testcasesBG px-4 py-4 text-3xl font-bold ${getTestCaseScoreColor(
              passedCount,
              totalCases
            )}`}
          >
            {`${passedCount}/${totalCases} Test Cases Passed !!`}
          </div>
        ) : (
          <div
            className={`rounded-xl bg-testcasesBG px-2 py-2 text-lg font-bold ${getTestCaseScoreColor(
              passedCount,
              totalCases
            )}`}
          >
            {`${passedCount}/${totalCases}`}
          </div>
        )}

        {isPanelMedium &&
          (fullScreenTestCases ? (
            <MdFullscreenExit
              className="scale-200"
              onClick={() => setFullScreenTestCases(false)}
            />
          ) : (
            <MdFullscreen
              className="scale-200 "
              onClick={() => setFullScreenTestCases(true)}
            />
          ))}
      </div>
      {isPanelMedium ? (
        <TestCasesMedium
          visibleCases={visibleCases}
          hiddenCases={hiddenCases}
          hiddenPassedCount={hiddenPassedCount}
          setActiveCaseIndex={setActiveCaseIndex}
          getTestCaseScoreColor={getTestCaseScoreColor}
        />
      ) : (
        <TestCasesSmall
          visibleCases={visibleCases}
          setActiveCaseIndex={setActiveCaseIndex}
        />
      )}

      {isPanelLarge && (
        <TestCasesLarge
          compilerDetails={compilerDetails}
          activeCaseData={activeCaseData}
        />
      )}
    </div>
  );
};

export default TestCases;
