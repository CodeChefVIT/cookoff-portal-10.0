import React from "react";
import Button from "../ui/Button";
import { BsEyeSlash, BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import { TestcaseFromAPI } from "@/api/question";

interface TestCasesMediumProps {
  visibleCases: TestcaseFromAPI[];
  hiddenCases: TestcaseFromAPI[];
  hiddenPassedCount: number;
  setActiveCaseIndex: (index: number) => void;
  getTestCaseScoreColor: (count: number, total: number) => string;
}

const TestCasesMedium: React.FC<TestCasesMediumProps> = ({
  visibleCases,
  hiddenCases,
  hiddenPassedCount,
  setActiveCaseIndex,
  getTestCaseScoreColor,
}) => {
  return (
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

export default TestCasesMedium;
