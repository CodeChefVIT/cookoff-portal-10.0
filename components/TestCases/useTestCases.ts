import { useMemo } from "react";
import { TestCase } from "store/zustant";

export function useTestCases(results: TestCase[]) {
  const visibleCases = useMemo(
    () => results.filter((r) => !r.hidden),
    [results]
  );

  const hiddenCases = useMemo(() => results.filter((r) => r.hidden), [results]);

  const passedCount = useMemo(() => {
    return results.filter((r) => {
      if (!r.expected_output || !r.output) return false;
      return r.expected_output.trim() === r.output.trim();
    }).length;
  }, [results]);

  const hiddenPassedCount = useMemo(() => {
    return hiddenCases.filter((r) => {
      if (!r.expected_output || !r.output) return false;
      return r.expected_output.trim() === r.output.trim();
    }).length;
  }, [hiddenCases]);

  const outputExists = useMemo(
    () => results.some((r) => r.output && r.output.trim() !== ""),
    [results]
  );

  const totalCases = results.length;

  return {
    visibleCases,
    hiddenCases,
    passedCount,
    hiddenPassedCount,
    totalCases,
    outputExists,
  };
}
