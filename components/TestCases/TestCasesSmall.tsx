import React from "react";
import Button from "../ui/Button";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import { TestcaseFromAPI } from "@/api/question";

interface TestCasesSmallProps {
  visibleCases: TestcaseFromAPI[];
  setActiveCaseIndex: (index: number) => void;
}

const TestCasesSmall: React.FC<TestCasesSmallProps> = ({ visibleCases, setActiveCaseIndex }) => {
  return (
    <div className="flex items-center gap-2">
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
  );
};

export default TestCasesSmall;
