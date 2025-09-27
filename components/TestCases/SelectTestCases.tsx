import React, { useMemo } from "react";
import Button from "../ui/Button";
import { BsEyeSlash, BsCheckCircleFill, BsXCircleFill, BsCircle, BsCircleFill } from "react-icons/bs";
import { TestCase } from "store/zustant";

interface SelectTestCasesProps {
  visibleCases: TestCase[];
  hiddenCases: TestCase[];
  hiddenPassedCount: number;
  setActiveCaseIndex: (index: number) => void;
  getTestCaseScoreColor: (count: number, total: number) => string;
  outputExists: boolean;
  activeCaseIndex: number;
}

const SelectTestCases: React.FC<SelectTestCasesProps> = ({
  visibleCases,
  hiddenCases,
  hiddenPassedCount,
  setActiveCaseIndex,
  getTestCaseScoreColor,
  outputExists,
  activeCaseIndex
}) => {
  const testCaseStatus = useMemo(() => {
    return visibleCases.map((testCase) => {
      // If no output exists globally, don't show any status
      if (!outputExists) {
        return {
          id: testCase.id,
          status: 'neutral',
        };
      }
      
      // Use statusDescription to determine the status
      if (testCase.statusDescription) {
        const statusDesc = testCase.statusDescription.toLowerCase();
        
        // Check for success indicators in status description
        if (statusDesc.includes('successful') || statusDesc.includes('accepted')) {
          return {
            id: testCase.id,
            status: 'passed',
          };
        }
        
        // Check for failure indicators in status description
        if (statusDesc.includes('wrong answer') || 
            statusDesc.includes('failed') || 
            statusDesc.includes('time limit') ||
            statusDesc.includes('runtime error') ||
            statusDesc.includes('compilation error')) {
          return {
            id: testCase.id,
            status: 'failed',
          };
        }
      }
      
      // Fallback to output comparison if statusDescription is not available
      const hasOutput = testCase.output && testCase.output.trim() !== "";
      if (!hasOutput) {
        return {
          id: testCase.id,
          status: 'neutral',
        };
      }
      
      const isPassed =
        testCase.expected_output &&
        testCase.output &&
        testCase.expected_output.trim() === testCase.output.trim();
        
      return {
        id: testCase.id,
        status: isPassed ? 'passed' : 'failed',
      };
    });
  }, [visibleCases, outputExists]);

  return (
    <div className="flex items-center justify-between gap-3 -ml-2">
      <div>
        {visibleCases.map((testCase, idx) => {
          const status = testCaseStatus.find((s) => s.id === testCase.id);
          const testStatus = status?.status || 'neutral';
          const isActive = idx === activeCaseIndex;
          const renderIcon = () => {
            const baseClasses = "mr-2 transition-all duration-200";
            switch (testStatus) {
              case "passed":
                return isActive ? (
                  <BsCircleFill className={`${baseClasses} text-green-500`} />
                ) : (
                  <BsCircle className={`${baseClasses} text-green-500`} />
                );
              case "failed":
                return isActive ? (
                  <BsCircleFill className={`${baseClasses} text-red-500`} />
                ) : (
                  <BsCircle className={`${baseClasses} text-red-500`} />
                );
              case "neutral":
              default:
                return isActive ? (
                  <BsCircleFill className={`${baseClasses} text-gray-500`} />
                ) : (
                  <BsCircle className={`${baseClasses} text-gray-500`} />
                );
            }
          };

          const getButtonStyles = () => {
            const baseStyles = "rounded-xl px-4 py-2 text-sm font-semibold transition-colors";
            switch (testStatus) {
              case 'passed':
                return `${baseStyles} bg-green-900/20 border border-green-500/30 hover:bg-green-900/30 text-green-100`;
              case 'failed':
                return `${baseStyles} bg-red-900/20 border border-red-500/30 hover:bg-red-900/30 text-red-100`;
              case 'neutral':
              default:
                return `${baseStyles} bg-secondary hover:bg-border`;
            }
          };

          return (
            <Button
              key={testCase.id}
              variant={"secondary"}
              className={getButtonStyles()}
              onClick={() => setActiveCaseIndex(idx)}
            >
              {renderIcon()}
              {`Case ${idx + 1}`}
            </Button>
          );
        })}
      </div>
      {hiddenCases.length > 0 && (
        <div className=" flex cursor-pointer items-center gap-2 rounded-xl bg-secondary px-4 py-2 text-sm ">
          <BsEyeSlash
            className={`opacity-80 ${
              outputExists 
                ? getTestCaseScoreColor(hiddenPassedCount, hiddenCases.length)
                : "text-gray-400"
            }`}
          />
          <span className="opacity-80">Hidden</span>
          <span className="opacity-80">
            {outputExists 
              ? `${hiddenPassedCount}/${hiddenCases.length}`
              : `${hiddenCases.length}`
            }
          </span>
        </div>
      )}
    </div>
  );
};

export default SelectTestCases;
