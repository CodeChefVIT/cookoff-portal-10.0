"use client";
import React from "react";
import { useState } from "react";
import InputOutputCard from "./InputOutputCard";
import { Button } from "../ui/button";
import { BsEyeSlash } from "react-icons/bs";
import CompilerMessage from "./CompilerMessage";

function getScoreColor(count: number) {
  if (count >= 9) return "text-primary";
  else if (count > 5) return "text-chart-4";
  else if (count <= 2) return "text-accent";
  return "text-chart-4";
}

const TestCases = () => {
  const [noTestCases, setNoTestCases] = useState(10);
  const [noFailedCases, setNoFailedCases] = useState(2);
  const [activeCaseIndex, setActiveCaseIndex] = useState(2);
  const [hiddenPassed, setHiddenPassed] = useState(0);
  const [expectedOutputVisible, setexpectedOutputVisible] = useState(false);
  const [isCompileSuccess, setIsCompileSuccess] = useState(true);
  const [input, setInput] = useState("dummy input");
  const [output, setOutput] = useState("dummy output");
  const [expectedOutput, setExpectedOutput] = useState("dummy expected output");
  const passedCount = noTestCases - noFailedCases;

  return (
    <>
      <div className="flex flex-col w-[50vw] bg-testcasesBG font-roboto p-2 gap-4">
        <div
          className={`text-3xl bg-secondary font-bold py-4 px-4 rounded-2xl ${getScoreColor(
            passedCount
          )}`}
        >
          {`${passedCount}/${noTestCases} Test Cases Passed !!`}
        </div>

        <div className="flex items-center gap-3">
          {[0, 1, 2].map((idx) => (
            <Button
              key={idx}
              variant={activeCaseIndex === idx ? "secondary" : "ghost"}
              className={`rounded-xl px-4 py-2 text-sm font-semibold`}
              onClick={() => setActiveCaseIndex(idx)}
            >
              <span
                className={`mr-2 size-2 rounded-full ${
                  activeCaseIndex === idx ? "bg-green-400" : "bg-accent"
                }`}
              ></span>
              {`Case ${idx + 1}`}
            </Button>
          ))}
          <div className="ml-auto flex items-center gap-2 rounded-xl bg-secondary px-4 py-2 text-sm hover:scale-101 ">
            <BsEyeSlash
              className={`opacity-80 ${getScoreColor(hiddenPassed)}`}
            />
            <span className="opacity-80">Hidden Testcases</span>
            <span className="opacity-80">{`${hiddenPassed}/10`}</span>
          </div>
        </div>

        <CompilerMessage isCompileSuccess={isCompileSuccess} />
        {expectedOutputVisible ? (
          <div className="flex justify-between font-inter">
            <InputOutputCard
              title={"Input"}
              data={"Hello World !"}
              className={"w-[31%]"}
            />
            <InputOutputCard
              title={"Expected Output"}
              data={expectedOutput}
              className={"w-[31%]"}
            />
            <InputOutputCard
              title={"Output"}
              data={output}
              className={"w-[31%]"}
            />
          </div>
        ) : (
          <div className="flex justify-between font-inter">
            <InputOutputCard
              title={"Input"}
              data={"Hello World !"}
              className={"w-[48%]"}
            />
            <InputOutputCard
              title={"Output"}
              data={input}
              className={"w-[48%]"}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default TestCases;
