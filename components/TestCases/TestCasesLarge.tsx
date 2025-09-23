import React from "react";
import InputOutputCard from "./InputOutputCard";
import CompilerMessage from "./CompilerMessage";
import { TestcaseFromAPI } from "@/api/question";

interface TestCasesLargeProps {
  compilerDetails: {
    isCompileSuccess: boolean;
    message: string;
  };
  activeCaseData: TestcaseFromAPI;
}

const TestCasesLarge: React.FC<TestCasesLargeProps> = ({ compilerDetails, activeCaseData }) => {
  return (
    <div className="">
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
                data={activeCaseData.output ? activeCaseData.output : "no output given"}
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
                data={activeCaseData.output ? activeCaseData.output : "no output given"}
                className={"w-[48%]"}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TestCasesLarge;
