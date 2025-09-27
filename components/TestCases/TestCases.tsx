'use client';
import React, { useState, useMemo } from 'react';
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md';
import useKitchenStore from 'store/zustant';
import { TestCase } from 'store/zustant';
import { useTestCases } from './useTestCases';
import SelectTestCases from './SelectTestCases';
import Input from './Input';
import { Skeleton } from '../ui/skeleton';

const TestCasesSkeleton = () => (
  <div className="flex flex-col gap-4">
    <div className="flex items-center gap-4">
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-8 w-32" />
    </div>
    <div className="flex flex-col gap-2">
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
    </div>
  </div>
);

function getTestCaseScoreColor(count: number, total: number) {
  const percentage = (count / total) * 100;
  if (percentage >= 90) return 'text-ring';
  if (percentage >= 50) return 'text-chart-4';
  return 'text-accent';
}

const TestCases = () => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const {
    fullScreenTestCases,
    setFullScreenTestCases,
    testResults,
    compilerDetails,
    testCases,
    selectedQuestionId,
    submissionStatus,
  } = useKitchenStore();

  const displayedTestCases = useMemo(() => {
    const initialCases = testCases
      .filter((tc) => tc && tc.QuestionID === selectedQuestionId)
      .map(
        (tc) =>
          ({
            id: tc.ID,
            input: tc.Input,
            output: '',
            expected_output: tc.ExpectedOutput,
            hidden: tc.Hidden,
            runtime: 0,
            memory: 0,
            question_id: selectedQuestionId,
          } as TestCase)
      );

    const resultsForQuestion = testResults.filter(
      (tc) => tc && tc.question_id === selectedQuestionId
    );

    if (resultsForQuestion.length === 0) {
      return initialCases;
    }

    let resultIndex = 0;
    const mergedCases = initialCases.map((c) => {
      if (!c.hidden) {
        const result = resultsForQuestion[resultIndex];
        if (result) {
          resultIndex++;
          return {
            ...c,
            id: result.id, // This is the judge token
            output: result.output,
            runtime: result.runtime,
            memory: result.memory,
            stderr: result.stderr,
            statusDescription: result.statusDescription,
          };
        }
      }
      return c;
    });

    return mergedCases;
  }, [testCases, testResults, selectedQuestionId]);

  const {
    visibleCases,
    hiddenCases,
    passedCount: calculatedPassedCount,
    hiddenPassedCount: calculatedHiddenPassedCount,
    totalCases,
    outputExists,
  } = useTestCases(displayedTestCases);
  const activeCaseData = visibleCases[activeCaseIndex];

  const defaultCompilerDetails = {
    isCompileSuccess: false,
    message: 'No code executed yet',
    passedCount: 0,
    totalCount: totalCases,
    hiddenPassedCount: 0,
  };

  const finalCompilerDetails = compilerDetails || defaultCompilerDetails;

  const passedCount =
    submissionStatus === 'submitted'
      ? finalCompilerDetails.passedCount ?? 0
      : calculatedPassedCount;

  const totalFromSubmit = finalCompilerDetails.totalCount ?? totalCases;
  const displayTotal =
    submissionStatus === 'submitted' ? totalFromSubmit : totalCases;
  const hiddenPassedCount = calculatedHiddenPassedCount;

  return (
    <div
      className={`${
        fullScreenTestCases
          ? 'h-[100vh] w-screen -top-0 left-0 fixed z-50 '
          : ' h-full  '
      }flex flex-col gap-4 bg-testcasesBG p-2 font-roboto`}
    >
      <div>
        <div className="flex justify-between items-center mb-2">
          <div
            className={`rounded-xl bg-testcasesBG text-3xl py-2 items-center font-bold ${
              outputExists && submissionStatus === 'submitted'
                ? getTestCaseScoreColor(passedCount, displayTotal)
                : 'text-gray-400'
            }`}
          >
            {outputExists && submissionStatus === 'submitted'
              ? `${passedCount}/${displayTotal} Test Cases Passed !!`
              : submissionStatus === 'running'
              ? 'Submitting...'
              : `${totalCases} Test Cases`}
          </div>{' '}
          {fullScreenTestCases ? (
            <MdFullscreenExit
              className="scale-200 mr-2"
              onClick={() => setFullScreenTestCases(false)}
            />
          ) : (
            <MdFullscreen
              className="scale-200 mr-2"
              onClick={() => setFullScreenTestCases(true)}
            />
          )}
        </div>
        {submissionStatus === 'running' ? (
          <TestCasesSkeleton />
        ) : (
          <SelectTestCases
            visibleCases={visibleCases}
            hiddenCases={hiddenCases}
            hiddenPassedCount={hiddenPassedCount}
            setActiveCaseIndex={setActiveCaseIndex}
            getTestCaseScoreColor={getTestCaseScoreColor}
            outputExists={outputExists}
            activeCaseIndex={activeCaseIndex}
            showHidden={submissionStatus === 'submitted'}
          />
        )}
      </div>

      {submissionStatus !== 'running' && (
        <Input
          compilerDetails={finalCompilerDetails}
          activeCaseData={activeCaseData}
          outputExists={outputExists}
        />
      )}
    </div>
  );
};
export default TestCases;
