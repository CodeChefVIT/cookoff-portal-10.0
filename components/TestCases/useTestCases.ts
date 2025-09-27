import { useMemo } from "react";
import { TestCase } from "store/zustant";

export function useTestCases(results: TestCase[]) {
  const visibleCases = useMemo(
    () => results.filter((r) => !r.hidden),
    [results]
  );
  const hiddenCases = useMemo(() => results.filter((r) => r.hidden), [results]);

  const passedCount = useMemo(() => {
    return visibleCases.filter((r) => {
      // First check statusDescription for explicit failure cases
      if (r.statusDescription) {
        const statusDesc = r.statusDescription.toLowerCase();
        // Explicitly check for failure keywords first
        if (statusDesc.includes("wrong answer") || 
            statusDesc.includes("time limit exceeded") || 
            statusDesc.includes("runtime error") ||
            statusDesc.includes("compilation error")) {
          return false;
        }
        // Then check for success keywords
        return (
          statusDesc.includes("successful") || statusDesc.includes("accepted")
        );
      }

      // Fallback to output comparison only if no status description
      if (!r.expected_output || !r.output) return false;
      return r.expected_output.trim() === r.output.trim();
    }).length;
  }, [visibleCases]);

  const hiddenPassedCount = useMemo(() => {
    return hiddenCases.filter((r) => {
      // First check statusDescription for explicit failure cases
      if (r.statusDescription) {
        const statusDesc = r.statusDescription.toLowerCase();
        // Explicitly check for failure keywords first
        if (statusDesc.includes("wrong answer") || 
            statusDesc.includes("time limit exceeded") || 
            statusDesc.includes("runtime error") ||
            statusDesc.includes("compilation error")) {
          return false;
        }
        // Then check for success keywords
        return (
          statusDesc.includes("successful") || statusDesc.includes("accepted")
        );
      }

      // Fallback to output comparison only if no status description
      if (!r.expected_output || !r.output) return false;
      return r.expected_output.trim() === r.output.trim();
    }).length;
  }, [hiddenCases]);

  const outputExists = useMemo(
    () =>
      results.some(
        (r) =>
          (r.output && r.output.trim() !== "") ||
          r.statusDescription ||
          (r.runtime !== undefined && r.runtime > 0) ||
          (r.memory !== undefined && r.memory > 0)
      ),
    [results]
  );

  const totalCases = visibleCases.length;

  return {
    visibleCases,
    hiddenCases,
    passedCount,
    hiddenPassedCount,
    totalCases,
    outputExists,
  };
}
