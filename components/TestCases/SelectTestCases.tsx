import React, { useMemo } from "react";
import Button from "../ui/Button";
import { BsEyeSlash, BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import { TestCase } from "store/zustant";

interface SelectTestCasesProps {
  visibleCases: TestCase[];
  hiddenCases: TestCase[];
  hiddenPassedCount: number;
  setActiveCaseIndex: (index: number) => void;
  getTestCaseScoreColor: (count: number, total: number) => string;
}

const SelectTestCases: React.FC<SelectTestCasesProps> = ({
  visibleCases,
  hiddenCases,
  hiddenPassedCount,
  setActiveCaseIndex,
  getTestCaseScoreColor,
}) => {
  const testCaseStatus = useMemo(() => {
    return visibleCases.map((testCase) => {
      const isPassed =
        testCase.expected_output &&
        testCase.output &&
        testCase.expected_output.trim() === testCase.output.trim();
      return {
        id: testCase.id,
        isPassed,
      };
    });
  }, [visibleCases]);

  return (
    <div className="flex items-center justify-between gap-3">
      <div>
        {visibleCases.map((testCase, idx) => {
          const status = testCaseStatus.find((s) => s.id === testCase.id);
          const isPassed = status?.isPassed || false;

          return (
            <Button
              key={testCase.id}
              variant={"secondary"}
              className={`rounded-xl px-4 py-2 text-sm font-semibold bg-secondary hover:bg-border`}
              onClick={() => setActiveCaseIndex(idx)}
            >
              {isPassed ? (
                <BsCheckCircleFill className={`mr-2 size-4 text-ring`} />
              ) : (
                <BsXCircleFill className={`mr-2 size-4 text-accent`} />
              )}
              {`Case ${idx + 1}`}
            </Button>
          );
        })}
      </div>
      {hiddenCases.length > 0 && (
        <div className=" flex cursor-pointer items-center gap-2 rounded-xl bg-secondary px-4 py-2 text-sm hover:scale-105 hover:bg-border">
          <BsEyeSlash
            className={`opacity-80 ${getTestCaseScoreColor(
              hiddenPassedCount,
              hiddenCases.length
            )}`}
          />
          <span className="opacity-80">Hidden</span>
          <span className="opacity-80">{`${hiddenPassedCount}/${hiddenCases.length}`}</span>
        </div>
      )}
    </div>
  );
};

export default SelectTestCases;
