import React from 'react';
import Image from "next/image";
import { Inter, Quicksand } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const quicksand = Quicksand({ subsets: ["latin"] }); 

<Image
  src="/trap.svg"
  alt=""
/>


const QuestionWindow: React.FC = () => {
  const tabs = [1, 2, 3, 4, 5, 6, 7,8];
  const activeTab = 1;

  return (
    <div className={`bg-[#070E0A] text-gray-300 min-h-screen p-4 sm:p-8 flex items-center justify-center ${inter.className}`}>
      <div className="w-full max-w-4xl">
        <div className="flex items-center space-x-1 sm:space-x-2 mb-[-1px] pl-4">
          {tabs.map((tab) => (
       <button
  key={tab}
  className={`
    relative w-[100px] h-[35px] flex items-center justify-center p-0 group
    transition-transform duration-200 ease-out
  `}
  style={{ background: "transparent", border: "none", boxShadow: "none" }}
>
  <img
    src="/trap.svg"
    draggable="false"
    className="
      absolute inset-0 w-full h-full pointer-events-none
      transform transition duration-200 ease-out
      group-hover:scale-110 group-active:scale-280"
  />

  <span
    className={`relative z-10 font-bold text-xl ${quicksand.className}`}
    style={{ color: "#000000ff", userSelect: "none" }}
  >
    {tab}
  </span>
</button>




        ))}
        </div>
        
      
        <div className="bg-[#131414]  p-6 sm:p-8 max-w-4xl mx-auto relative w-full ">
          <header className="mb-6">
          </header>
          <main>
            <h1 className="text-2xl sm:text-3xl font-bold text-green-400 mb-2 font-nulshock">
              PROBLEM 1: HELLO WORLD
            </h1>
            <span className="inline-block bg-[#484848] text-gray-200 text-xs font-semibold px-3 py-1 mt-12 mb-8">
              10 Points
            </span>
            <div className="prose prose-invert prose-sm sm:prose-base max-w-none text-gray-400 space-y-4">
              <p>
                A <strong className=" font-medium">queue</strong> is an abstract data type that maintains the order in which elements were added to it, allowing the oldest elements to be removed from the front and new elements to be added to the rear. This is called a First-In-First-Out (FIFO) data structure because the first element added to the queue (i.e., the one that has been waiting the longest) is always the first one to be removed.
              </p>
              <p>
                A basic queue has the following operations:
              </p>
              <p>
             Enqueue: add a new element to the end of the queue.
             </p>
             <p>
Dequeue: remove the element from the front of the queue and return it.
</p>
<p>
In this challenge, you must first implement a queue using two stacks. Then process queries, where each query is one of the following types:
1 x: Enqueue element into the end of the queue.
2: Dequeue the element at the front of the queue.
3: Print the element at the front of the queue.
Input Format
The first line contains a single integer, denoting the number of queries. Each line of the subsequent lines contains a single query in the form described in the problem statement above. All three queries start with an integer denoting the query , but only query is followed by an additional space-separated value, , denoting the value to be enqueued.
              </p>
            </div>
          </main>
          
          

        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <main>
      <QuestionWindow />
    </main>
  );
}