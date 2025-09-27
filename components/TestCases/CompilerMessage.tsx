import React from "react";

interface CompilerMessageProps {
  isCompileSuccess: boolean;
  message?: string;
}

function CompilerMessage({ isCompileSuccess, message }: CompilerMessageProps) {
  return (
    <div className="flex flex-col mb-4">
      <h1 className="mb-2">Result:</h1>
      <div
        className={`min-h-[5vh] bg-secondary font-bold py-2 px-4 rounded-md ${
          isCompileSuccess ? "text-green-500" : "text-accent"
        }`}
      >
        {message ??
          (isCompileSuccess
            ? "Compilation Successful !!"
            : "Compilation Failed !!")}
      </div>
    </div>
  );
}

export default CompilerMessage;
