import TestCases from "@/components/TestCases/TestCases";
import Link from "next/link";
export default function Home() {
  type TestCase = {
    id: number;
    status: "Passed" | "Failed" | "Error";
    input: string;
    output: string;
    expectedOutput: string;
    isHidden: boolean;
  };

  const defaultResults: TestCase[] = [
    {
      id: 1,
      status: "Passed",
      input: "2 3",
      output: "5",
      expectedOutput: "5",
      isHidden: false,
    },
    {
      id: 2,
      status: "Failed",
      input: "10 4",
      output: "15",
      expectedOutput: "14",
      isHidden: false,
    },
    {
      id: 4,
      status: "Passed",
      input: "10 5",
      output: "20",
      expectedOutput: "20",
      isHidden: false,
    },
    {
      id: 3,
      status: "Passed",
      input: "7 8",
      output: "15",
      expectedOutput: "15",
      isHidden: true,
    },
  ];

  const defaultCompilerDetails = {
    isCompileSuccess: true,
    message: "Compilation Successful !!",
  };

  return (
    <div className="min-h-screen">
      Check out the UI page <Link href="/ui">here</Link>.
      <TestCases
        results={defaultResults}
        compilerDetails={defaultCompilerDetails}
      />
    </div>
  );
}
