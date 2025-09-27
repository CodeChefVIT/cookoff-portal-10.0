import React from "react";
import InputOutputCard from "./InputOutputCard";
import CompilerMessage from "./CompilerMessage";
import { TestCase } from "store/zustant";
import useKitchenStore from "store/zustant";

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
  const { submissionStatus } = useKitchenStore();

  const testCaseMessage =
    activeCaseData?.statusDescription || compilerDetails.message;

  let testCaseSuccess;
  if (submissionStatus === "submitted") {
    testCaseSuccess = testCaseMessage.toLowerCase().includes("accepted");
  } else {
    testCaseSuccess = activeCaseData
      ? !activeCaseData.stderr &&
        !!activeCaseData.output &&
        !!activeCaseData.expected_output &&
        activeCaseData.output.trim() === activeCaseData.expected_output.trim()
      : compilerDetails.isCompileSuccess;
  }

  return (
    <div className="">
      {outputExists && (
        <CompilerMessage
          message={submissionStatus === "running" ? "" : testCaseMessage}
          isCompileSuccess={testCaseSuccess}
        />
      )}
      {activeCaseData && (
        <>
          {activeCaseData.output ? (
            <div className="flex justify-between font-inter gap-4">
              <InputOutputCard
                title={"Input: "}
                data={
                  submissionStatus === "running" ? "" : activeCaseData.input
                }
                className="w-full"
              />
              <InputOutputCard
                title={"Your Output:"}
                data={
                  submissionStatus === "running"
                    ? ""
                    : activeCaseData.output
                    ? activeCaseData.output
                    : "no output given"
                }
                className="w-full"
              />
            </div>
          ) : (
            <div className="flex justify-between font-inter">
              <InputOutputCard
                title={"Input: "}
                data={
                  submissionStatus === "running" ? "" : activeCaseData.input
                }
                className={"w-full"}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Input;
