"use client";
import React from "react";
import Image from "next/image";
import api from "@/services/index";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardResponse } from "@/schemas/api/index";

const ProfileCard = ({
  data,
  loading,
}: {
  data: DashboardResponse | undefined;
  loading: boolean;
}) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await api.post("/logout");
      router.push("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (loading) {
    return (
      <div className="rounded-lg bg-neutral-900 text-gray-200 shadow-md overflow-hidden border border-gray-700">
        <h2 className="text-3xl font-bold font-nulshock tracking-wide text-[#c5bba7] bg-neutral-800 text-center py-2 leading-14">
          PROFILE
        </h2>

        <div className="p-4">
          <div className="flex justify-center mt-2 mb-4">
            <Skeleton className="h-[90px] w-[90px] rounded-full bg-neutral-700" />
          </div>

          <div className="mt-4 mb-2">
            <Skeleton className="h-4 w-16 mb-2 rounded-md bg-neutral-700" />
            <Skeleton className="h-6 w-40 rounded-md bg-neutral-700" />
          </div>

          <div className="mt-2 mb-4">
            <Skeleton className="h-4 w-16 mb-2 rounded-md bg-neutral-700" />
            <Skeleton className="h-6 w-60 rounded-md bg-neutral-700" />
          </div>

          <div className="mt-12 mb-4">
            <Skeleton className="h-6 w-32 mx-auto mb-4 rounded-md bg-neutral-700" />
            <div className="mt-2 w-full h-5 bg-neutral-800 rounded-full relative overflow-hidden">
              <Skeleton className="h-5 w-full rounded-full bg-neutral-700" />
            </div>
          </div>

          <div className="flex justify-center mt-16 mb-8">
            <Skeleton className="h-10 w-40 rounded-md bg-neutral-700" />
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-75 rounded-lg bg-neutral-900 text-gray-200 shadow-md p-6 text-center">
        Failed to load profile
      </div>
    );
  }

  // ✅ Calculate total completed and total questions using the new DashboardResponse arrays
  const totalCompleted = data.questions_completed.reduce(
    (acc, val) => acc + val,
    0
  );
  const totalNotCompleted = data.questions_not_completed.reduce(
    (acc, val) => acc + val,
    0
  ) - 2 ;
  const totalQuestions = totalCompleted + totalNotCompleted;
  const progress =
    totalQuestions > 0 ? (totalCompleted / totalQuestions) * 100 : 0;

  return (
    <div className="rounded-lg bg-neutral-900 text-gray-200 shadow-md overflow-hidden border border-gray-700 h-full">
      <div className="bg-neutral-800 text-center py-2">
        <h2 className="text-3xl font-bold font-nulshock tracking-wide text-[#c5bba7]">
          PROFILE
        </h2>
      </div>

      <div className="p-4">
        <div className="flex justify-center mt-2 mb-4">
          <Image
            src="/profile_picture.svg"
            alt="Profile"
            width={90}
            height={90}
            draggable={false}
            unselectable="on"
            priority
          />
        </div>

        <div className="mt-4 mb-2">
          <p className="justify-start text-sm font-normal font-inter text-[#c5bba7]">
            Name
          </p>
          <p className="justify-start text-white text-lg font-normal font-inter">
            {data.username}
          </p>
        </div>

        <div className="mt-2 mb-4">
          <p className="justify-start text-sm font-normal font-inter text-[#c5bba7]">
            Email
          </p>
          <p className="justify-start text-white text-lg font-normal font-inter truncate">
            {data.email}
          </p>
        </div>

        {/* ✅ Updated Progress Section */}
        <div className="mt-8 mb-4">
          <p className="text-xl text-[#c5bba7] text-center font-brunoace mb-1">
            Progress
          </p>

          <div className="mt-2 w-full bg-zinc-300 rounded-full h-5 relative overflow-hidden">
            <div
              className="bg-green-500 h-5 absolute top-0 left-0"
              style={{ width: `${progress}%` }}
            ></div>

            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-neutral-900 text-lg font-bold font-inter">
                {totalCompleted}/{totalQuestions}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8 mb-8">
          <button
            onClick={handleLogout}
            className="!border-2 !border-red-500 !text-[#c5bba7] font-nulshock !bg-neutral-900 !px-2 !py-2 text-sm rounded-md !hover:bg-red-500 hover:text-white transition flex items-center gap-1"
          >
            <Image
              src="/logout.svg"
              alt="Logout"
              width={18}
              height={18}
              draggable={false}
              unselectable="on"
              priority
            />
            LOG OUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
