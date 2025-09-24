import { useMemo } from "react";
import useKitchenStore from "store/zustant";

export function useTestCases() {
  const { testCases, selectedQuestionId } = useKitchenStore();
  // console.log("testcases id: ", selectedQuestionId, testCases);

  const results = useMemo(
    () =>
      testCases.filter((tc) => {
        // console.log(tc.QuestionID);
        // console.log(tc);

        return tc.QuestionID === selectedQuestionId;
      }),
    [testCases, selectedQuestionId]
  );
  console.log(results);
  const visibleCases = useMemo(
    () => results.filter((r) => !r.Hidden),
    [results]
  );
  const hiddenCases = useMemo(() => results.filter((r) => r.Hidden), [results]);

  const passedCount = useMemo(() => {
    return results.filter((r) => r.ExpectedOutput === r.Output).length;
  }, [results]);
  console.log("visible cases", visibleCases);

  const hiddenPassedCount = useMemo(() => {
    return hiddenCases.filter((r) => r.ExpectedOutput === r.Output).length;
  }, [hiddenCases]);

  const totalCases = results.length;

  return {
    visibleCases,
    hiddenCases,
    passedCount,
    hiddenPassedCount,
    totalCases,
  };
}
