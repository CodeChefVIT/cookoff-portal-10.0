import Statistics from "@/components/statistics";
import QuestionWindow from "../components/ui/questionWindow";

export default function Page() {
  const questions = [
    {
      id: 1,
      title: "PROBLEM 1: HELLO WORLD",
      points: 10,
      content: [
        "A queue is an abstract data type that maintains order...",
        "A basic queue has the following operations:",
        "Enqueue: add to the end.",
        "Dequeue: remove from the front.",
      ],
    },
    {
      id: 2,
      title: "PROBLEM 2: STACK IMPLEMENTATION",
      points: 15,
      content: [
        "A stack is a Last-In-First-Out (LIFO) data structure...",
        "Operations: Push, Pop, Peek.",
      ],
    },
  ];

  return (
    <main>
      <QuestionWindow questions={questions} />
      <Statistics />;
    </main>
  );
}

