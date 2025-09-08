import React from "react";

type props = {
  isCompileSuccess: boolean;
};

function CompilerMessage({ isCompileSuccess }: props) {
  return (
    <div className="flex flex-col">
      <h1 className="mb-2">Compiler Message</h1>
      <div
        className={`bg-secondary font-bold py-2 px-4 rounded-md ${
          isCompileSuccess ? "text-green-500" : "text-accent"
        }`}
      >
        {isCompileSuccess
          ? "Compilation Successful !!"
          : "Compilation Failed !!"}
      </div>
    </div>
  );
}

export default CompilerMessage;
