// "use client";

// import React from "react";
// import Image from "next/image";

// interface TimelineStep {
//   label: string;
//   progress: number;
// }

// const steps: TimelineStep[] = [
//   { label: "Start", progress: 100 },
//   { label: "Round 0", progress: 100 },
//   { label: "Round 1", progress: 75 },
//   { label: "Round 2", progress: 0 },
//   { label: "Round 3", progress: 0 },
// ];

// export default function Timeline() {
//   return (
//     <div className="flex items-center w-full mx-auto mt-5 relative">
//       {steps.map((step, idx) => {
//         const isLast = idx === steps.length - 1;
//         const prevStep = steps[idx - 1];

//         const showFlag = step.label === "Start" || (prevStep && prevStep.progress === 100);

//         return (
//           <div key={idx} className="flex-1 flex flex-col items-center relative">
//             <div className="relative z-10">
//               <div className="w-6 h-6 rounded-full bg-white relative"></div>
//               {showFlag && (
//                 <div className="absolute -top-7 left-1 w-[46px] h-[46px] z-20">
//                     <Image src="/flag.svg" alt="Completed" fill />
//                 </div>
//               )}
//             </div>

//             {/* Step Label */}
//             <span className="text-white font-[16px] font-brunoace mt-[9px]">{step.label}</span>

//             {/* Connector to next circle */}
//             {!isLast && (
//               <div className="absolute top-2 left-[50%] w-full h-1 -translate-x-0 z-0">
//                 <div className="h-[10px] bg-[#B7AB98] w-full rounded relative overflow-hidden">
//                   <div
//                     className="absolute top-0 left-0 h-[10px] bg-green-500 transition-all duration-500"
//                     style={{ width: `${step.progress}%` }}
//                   />
//                 </div>
//               </div>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }


// "use client";

// import React from "react";
// import Image from "next/image";

// interface TimelineStep {
//   label: string;
//   progress: number; // 0 to 100
// }

// const steps: TimelineStep[] = [
//   { label: "Start", progress: 100 },
//   { label: "Round 0", progress: 100 },
//   { label: "Round 1", progress: 75 },
//   { label: "Round 2", progress: 0 },
//   { label: "Round 3", progress: 0 },
// ];

// export default function Timeline() {
//   const totalSteps = steps.length;

//   return (
//     <div className="relative w-full mx-auto mt-5 px-[5px]">
//       {/* Base gray connector */}
//       <div className="absolute top-3 left-0 w-full h-[10px] bg-[#B7AB98] rounded z-0" />

//       {/* Stepwise green connectors */}
//       {steps.map((step, idx) => {
//         if (idx === totalSteps - 1) return null; // skip last step

//         const segmentLeft = (idx / (totalSteps - 1)) * 100;
//         const segmentWidth = 100 / (totalSteps - 1);

//         return (
//           <div
//             key={idx}
//             className="absolute top-3 h-[10px] rounded z-0"
//             style={{ left: `${segmentLeft}%`, width: `${segmentWidth}%` }}
//           >
//             <div
//               className="h-[10px] bg-green-500 rounded transition-all duration-500"
//               style={{ width: `${step.progress}%` }}
//             />
//           </div>
//         );
//       })}

//       {/* Steps: circles, flags, labels */}
//       <div className="flex justify-between relative z-10">
//         {steps.map((step, idx) => {
//           const prevStep = steps[idx - 1];
//           const showFlag = step.label === "Start" || (prevStep && prevStep.progress === 100);

//           return (
//             <div key={idx} className="flex flex-col items-center relative">
//               {/* Circle + Flag */}
//               <div className="relative z-10">
//                 <div className="w-6 h-6 rounded-full bg-white border-2 border-gray-400 relative"></div>
//                 {showFlag && (
//                   <div className="absolute -top-7 left-1 w-[46px] h-[46px] z-20">
//                     <Image src="/flag.svg" alt="Completed" fill />
//                   </div>
//                 )}
//               </div>

//               {/* Label */}
//               <span className="text-white font-[16px] font-brunoace mt-[9px]">{step.label}</span>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }


"use client";

import React from "react";
import Image from "next/image";

interface TimelineStep {
  label: string;
  progress: number; // 0 to 100
}

const steps: TimelineStep[] = [
  { label: "Start", progress: 100 },
  { label: "Round 0", progress: 100 },
  { label: "Round 1", progress: 75 },
  { label: "Round 2", progress: 0 },
  { label: "Round 3", progress: 0 },
];

export default function Timeline() {
  const totalSteps = steps.length;
  const totalGreenPercent = steps
    .slice(0, totalSteps - 1)
    .reduce((acc, step) => acc + step.progress / (totalSteps - 1), 0);
  return (
    <div className="relative w-full mx-auto mt-5">
      {/* Connector Bar Wrapper with horizontal padding */}
      <div className="absolute top-2 left-0 right-0 z-0 mx-[37px] h-[10px]">
        {/* Base gray connector */}
        <div className="w-full h-full bg-[#B7AB98] rounded" />
        {/* Stepwise green connectors */}
        <div className="flex h-full absolute top-0 left-0 w-full">
          {steps.slice(0, totalSteps - 1).map((step, idx) => (
            <div key={idx} className="relative flex-1 h-full">
              <div
                className="h-full bg-[#1DDB5E] rounded transition-all duration-500"
                style={{ width: `${step.progress}%` }}
              />
            </div>
          ))}
          <div
            className="absolute top-1/2 -translate-y-9 -translate-x-3 w-[54.46px] h-[50.83px]"
            style={{ left: `${totalGreenPercent}%` }}
          >
            <Image src="/chef-hat.svg" alt="Chef Hat" fill />
          </div>
        </div>
      </div>

      {/* Steps: circles, flags, labels */}
      <div className="flex justify-between relative z-10">
        {steps.map((step, idx) => {
          const prevStep = steps[idx - 1];
          const showFlag = step.label === "Start" || (prevStep && prevStep.progress === 100);

          return (
            <div key={idx} className="flex flex-col items-center relative">
              {/* Circle + Flag */}
              <div className="relative z-10">
                <div className="w-6 h-6 rounded-full bg-white border-2 border-gray-400 relative"></div>
                {showFlag && (
                  <div className="absolute -top-7 left-1 w-[46px] h-[46px] z-20">
                    <Image src="/flag.svg" alt="Completed" fill />
                  </div>
                )}
              </div>

              {/* Label */}
              <span className="text-white font-[16px] font-brunoace mt-[9px]">{step.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
