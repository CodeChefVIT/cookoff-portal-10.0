import { useMemo } from "react";
import { TestcaseFromAPI } from "@/api/question";

export function useTestCases(results: TestcaseFromAPI[]) {
  const visibleCases = useMemo(
    () => results.filter((r) => !r.hidden),
    [results]
  );
  const hiddenCases = useMemo(() => results.filter((r) => r.hidden), [results]);

  const passedCount = useMemo(() => {
    return results.filter((r) => r.expected_output === r.output).length;
  }, [results]);

  const hiddenPassedCount = useMemo(() => {
    return hiddenCases.filter((r) => r.expected_output === r.output).length;
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
