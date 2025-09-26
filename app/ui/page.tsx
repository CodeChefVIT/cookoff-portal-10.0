"use client";
import Link from "next/link";
import Editor from "@/components/Editor/Editor";
import React, { useState } from "react";
import Button from "@/components/ui/Button";
import TabButton from "@/components/ui/TabButton";
import Modal from "@/components/Modal/Modal";
import QuestionWindow from "@/components/ui/QuestionWindow";
import Header from "@/components/Header/Header";
import Login from "@/components/Login";
import Dashboard from "@/components/Dashboard/Dashboard";
import ProfileCard from "@/components/Dashboard/Profile/profile";
import DetailsCard from "@/components/Dashboard/Details/details";
import Statistics from "@/components/Dashboard/Statistics/statistics";
import LanguageSelector from "@/components/Editor/LanguageSelector/LanguageSelector";
import RoundTimer from "@/components/Editor/RoundTimer/RoundTimer";
import InputOutputCard from "@/components/TestCases/InputOutputCard";
import CompilerMessage from "@/components/TestCases/CompilerMessage";
import { Question } from "@/schemas/api/index";
import { Language, LANGUAGES } from "@/lib/languages";

export default function UIPage() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(LANGUAGES.Cpp);
  const [showModal, setShowModal] = useState<
    "default" | "green" | "red" | "yellow" | null
  >(null);
  const [fullScreen, setFullScreen] = useState<boolean>(false);

  const languages: Language[] = [
    LANGUAGES.Cpp,
    LANGUAGES.C,
    LANGUAGES.CSharp,
    LANGUAGES.Java,
    LANGUAGES.Python,
    LANGUAGES.PHP,
    LANGUAGES.Rust,
    LANGUAGES.Go,
    LANGUAGES.JavaScript,
    LANGUAGES.TypeScript,
  ];

  const questions: Question[] = [
    {
      id: "1",
      title: "PROBLEM 1: TWO SUM",
      points: 10,
      description:
        "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      qType: "EASY",
      isBountyActive: false,
      inputFormat: [
        "Line 1: An array of integers nums.",
        "Line 2: An integer target.",
      ],
      round: 1,
      constraints: [
        "2 <= nums.length <= 10^4",
        "-10^9 <= nums[i] <= 10^9",
        "-10^9 <= target <= 10^9",
        "Only one valid answer exists.",
      ],
      outputFormat: ["An array containing the indices of the two numbers."],
      sampleTestInput: ["[2, 7, 11, 15]", "9"],
      sampleTestOutput: ["[0, 1]"],
      explanation: ["Because nums[0] + nums[1] == 9, we return [0, 1]."],
    },
    {
      id: "2",
      title: "PROBLEM 2: PALINDROME NUMBER",
      points: 15,
      description:
        "Given an integer x, return true if x is a palindrome, and false otherwise.",
      qType: "EASY",
      isBountyActive: true,
      inputFormat: ["Line 1: An integer x."],
      round: 1,
      constraints: ["-2^31 <= x <= 2^31 - 1"],
      outputFormat: ["A boolean value."],
      sampleTestInput: ["121"],
      sampleTestOutput: ["true"],
      explanation: [
        "121 reads as 121 from left to right and from right to left.",
      ],
    },
  ];

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
    isCompileSuccess: false,
    message: "Compilation Successful !!",
  };

  return (
    <div className="bg-[#070E0A] min-h-screen p-4 sm:p-6 text-gray-200">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-[#B7AB98] mb-4 font-nulshock">
          COOK OFF 10.0 - COMPONENT SHOWCASE
        </h1>
        <p className="text-lg text-gray-400 mb-8">
          A comprehensive showcase of all available components in the project
        </p>
        <Link
          href="/"
          className="text-green-400 hover:text-green-300 underline"
        >
          ← Back to Home
        </Link>
      </div>

      {/* Header Component */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-[#B7AB98] mb-6 border-b border-[#B7AB98] pb-2">
          Header Component
        </h2>
        <div className="bg-[#131414] rounded-lg overflow-hidden">
          <Header />
        </div>
      </section>

      {/* UI Components Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-[#B7AB98] mb-6 border-b border-[#B7AB98] pb-2">
          UI Components
        </h2>

        {/* Button Variants */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-white mb-4">
            Button Variants
          </h3>
          <div className="flex flex-wrap gap-4 p-6 bg-[#131414] rounded-lg">
            <Button variant="green">Green Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="destructive">Destructive Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="link">Link Button</Button>
            <Button variant="run">Run Button</Button>
            <Button disabled>Disabled Button</Button>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-white mb-4">
            Tab Buttons
          </h3>
          <div className="flex gap-4 p-6 bg-[#131414] rounded-lg">
            <TabButton id={"1"} active={true} onClick={() => {}} newId={1} />
            <TabButton id={"2"} active={false} onClick={() => {}} newId={2} />
            <TabButton id={"3"} active={false} onClick={() => {}} newId={3} />
          </div>
        </div>
      </section>

      {/* Modal Showcase */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-[#B7AB98] mb-6 border-b border-[#B7AB98] pb-2">
          Modal Components
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {(["default", "green", "destructive", "secondary"] as const).map(
            (variant) => {
              const modalVariant: "default" | "green" | "red" | "yellow" =
                variant === "destructive"
                  ? "red"
                  : variant === "secondary"
                  ? "yellow"
                  : variant;
              const buttonVariant:
                | "green"
                | "secondary"
                | "destructive"
                | "link"
                | "outline"
                | "ghost"
                | "run" = variant === "default" ? "outline" : variant;
              const displayName =
                modalVariant.charAt(0).toUpperCase() + modalVariant.slice(1);
              return (
                <div key={variant} className="p-4 bg-[#131414] rounded-lg">
                  <Button
                    variant={buttonVariant}
                    onClick={() => setShowModal(modalVariant)}
                    className="w-full"
                  >
                    Show {displayName} Modal
                  </Button>
                  {showModal === modalVariant && (
                    <Modal
                      title={`Sample ${displayName} Modal`}
                      message={`This is a demonstration of the ${modalVariant} Modal variant.`}
                      variant={modalVariant}
                      onClose={() => setShowModal(null)}
                    >
                      <Button variant={buttonVariant}>Nested Button</Button>
                    </Modal>
                  )}
                </div>
              );
            }
          )}
        </div>
      </section>

      {/* Editor Components */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-[#B7AB98] mb-6 border-b border-[#B7AB98] pb-2">
          Editor Components
        </h2>

        {/* Language Selector */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-white mb-4">
            Language Selector
          </h3>
          <div className="p-6 bg-[#131414] rounded-lg">
            <LanguageSelector
              languages={languages}
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
            />
          </div>
        </div>

        {/* Round Timer */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-white mb-4">
            Round Timer
          </h3>
          <div className="p-6 bg-[#131414] rounded-lg">
            <RoundTimer />
          </div>
        </div>

        {/* Full Editor */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-white mb-4">
            Code Editor
          </h3>
          <div className="bg-[#131414] rounded-lg">
            <Editor
              languages={languages}
              fullScreen={fullScreen}
              setfullScreen={setFullScreen}
            />
          </div>
        </div>
      </section>

      {/* Question Window */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-[#B7AB98] mb-6 border-b border-[#B7AB98] pb-2">
          Question Window
        </h2>
        <div className="bg-[#131414] rounded-lg">
          <QuestionWindow />
        </div>
      </section>

      {/* Test Cases Components */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-[#B7AB98] mb-6 border-b border-[#B7AB98] pb-2">
          Test Cases Components
        </h2>

        {/* Input Output Cards */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-white mb-4">
            Input/Output Cards
          </h3>
          <div className="flex gap-4 p-6 bg-[#131414] rounded-lg">
            <InputOutputCard title="Input" data="2 3" className="w-1/3" />
            <InputOutputCard
              title="Expected Output"
              data="5"
              className="w-1/3"
            />
            <InputOutputCard title="Your Output" data="5" className="w-1/3" />
          </div>
        </div>

        {/* Compiler Message */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-white mb-4">
            Compiler Messages
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 bg-[#131414] rounded-lg">
              <CompilerMessage
                isCompileSuccess={true}
                message="Compilation Successful!"
              />
            </div>
            <div className="p-6 bg-[#131414] rounded-lg">
              <CompilerMessage
                isCompileSuccess={false}
                message="Error: Missing semicolon at line 5"
              />
            </div>
          </div>
        </div>

        {/* Full Test Cases */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-white mb-4">
            Complete Test Cases
          </h3>
          <div className="bg-[#131414] p-4 sm:p-6 rounded-lg"></div>
        </div>
      </section>

      {/* Dashboard Components */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-[#B7AB98] mb-6 border-b border-[#B7AB98] pb-2">
          Dashboard Components
        </h2>

        {/* Profile Card */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-white mb-4">
            Profile Card
          </h3>
          <div className="flex justify-center p-6 bg-[#131414] rounded-lg">
            <div className="w-80">
              <ProfileCard />
            </div>
          </div>
        </div>

        {/* Details Card */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-white mb-4">
            Details Card
          </h3>
          <div className="flex justify-center p-6 bg-[#131414] rounded-lg">
            <div className="w-80">
              <DetailsCard />
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-white mb-4">
            Statistics Component
          </h3>
          <div className="p-6 bg-[#131414] rounded-lg">
            <div className="max-w-2xl mx-auto">
              <Statistics />
            </div>
          </div>
        </div>

        {/* Full Dashboard */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-white mb-4">
            Complete Dashboard
          </h3>
          <div className="p-4 bg-[#131414] rounded-lg overflow-x-auto">
            <div className="min-w-[1200px]">
              <Dashboard />
            </div>
          </div>
        </div>
      </section>

      {/* Login Component */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-[#B7AB98] mb-6 border-b border-[#B7AB98] pb-2">
          Login Component
        </h2>
        <div className="p-4 bg-[#131414] rounded-lg overflow-hidden">
          <div className="max-h-96 overflow-y-auto">
            <Login />
          </div>
        </div>
      </section>

      {/* Component Integration Example */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-[#B7AB98] mb-6 border-b border-[#B7AB98] pb-2">
          Component Integration Example
        </h2>
        <p className="text-gray-400 mb-6">
          Example of how components work together in the actual application
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          {/* Left - Question window */}
          <div className="bg-[#131414] p-4 sm:p-6 rounded-lg">
            <QuestionWindow />
          </div>

          {/* Right - Editor and Test cases */}
          <div className="flex flex-col space-y-6">
            <div className="bg-[#131414] rounded-lg">
              <Editor
                languages={languages}
                fullScreen={fullScreen}
                setfullScreen={setFullScreen}
              />
            </div>

            <div className="bg-[#131414] p-4 sm:p-6 rounded-lg"></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="text-center py-8 border-t border-[#B7AB98]">
        <p className="text-gray-400">
          CookOff 10.0 Component Showcase - All components displayed above
        </p>
      </div>
    </div>
  );
}
