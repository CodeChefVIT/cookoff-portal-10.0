import React from "react";

interface Props {
  title: string;
  data: string;
  className?: string;
}

export default function InputOutputCard({ title, data, className }: Props) {
  return (
    <div className={`flex flex-col gap-2 ${className ? className : ""}`}>
      <h1>{title}</h1>
      <div className="bg-secondary min-h-[100%] min-w-[100%] rounded-2xl p-4 text-sm">
        <h1>{data ? data : " "}</h1>
      </div>
    </div>
  );
}
