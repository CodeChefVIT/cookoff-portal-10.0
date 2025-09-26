import React from "react";
import InputOutputCard from "./InputOutputCard";
import CompilerMessage from "./CompilerMessage";
import { TestCase } from "store/zustant";
import toast from "react-hot-toast";

interface InputProps {
  compilerDetails: {
    isCompileSuccess: boolean;
    message: string;
  };
  activeCaseData: TestCase;
  outputExists: boolean;
}

const Input: React.FC<InputProps> = ({
  compilerDetails,
  activeCaseData,
  outputExists,
}) => {
  return (
    <div className="">
      {outputExists && (
        <CompilerMessage message={compilerDetails.message} isCompileSuccess={compilerDetails.isCompileSuccess} />
      )}
      {activeCaseData && (
        <>
          {activeCaseData.output ? (
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
                title={"Expected Output"}
                data={
                  activeCaseData.expected_output
                    ? activeCaseData.expected_output
                    : "no expected output given"
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

export default Input;
