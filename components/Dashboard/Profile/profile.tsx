"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import api from "@/services/index";
import { useRouter } from "next/navigation";

interface ProfileCardProps {
  name: string;
  email: string;
  totalScore: number;
  maxScore: number;
}

const ProfileCard: React.FC = () => {
  const [profile, setProfile] = useState<ProfileCardProps | null>(null);
  const [loading, setLoading] = useState(true);

const router = useRouter();

  const handleLogout = async () => {
    try {
      await api.post("/logout"); // call logout endpoint
      router.push("/");           // navigate to home page
    } catch (err) {
      console.error("Logout failed:", err);
      // Optionally show a toast or alert
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        
        const res = await api.get("/dashboard");
        const data = res.data.data;
        const mapped: ProfileCardProps = {
          name: data.user_name,
          email: data.email,
          totalScore:
            data.round_1_score + data.round_2_score + data.round_3_score,
          maxScore: 300, // TODO: max score???
        };

        setProfile(mapped);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);


   if (loading) {
    return (
      <div className="w-75 rounded-lg bg-neutral-900 text-gray-200 shadow-md p-6 text-center">
        Loading...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="w-75 rounded-lg bg-neutral-900 text-gray-200 shadow-md p-6 text-center">
        Failed to load profile
      </div>
    );
  }



  
  const progress = (profile.totalScore / profile.maxScore) * 100;

  return (
    <div className="w-75 rounded-lg bg-neutral-900 text-gray-200 shadow-md overflow-hidden border border-gray-700">
      {/* Header strip */}
      <div className="bg-neutral-800 text-center py-2">
        <h2 className="text-3xl font-bold font-nulshock tracking-wide text-[#c5bba7]">PROFILE</h2>
      </div>

      {/* Body */}
      <div className="p-4">
        {/* Avatar/Icon */}
        <div className="flex justify-center mt-2 mb-4">
          <Image
            src="/profile_picture.svg"
            alt="close"
            width={90}
            height={90}
            draggable={false}
            unselectable="on"
            priority
           />
        </div>

        {/* Info */}
        <div className="mt-4 mb-2">
          <p className="justify-start text-sm font-normal font-inter text-[#c5bba7]">Name</p>
          <p className="justify-start text-white text-lg font-normal font-inter">{profile.name}</p>
        </div>

        <div className="mt-2 mb-4">
          <p className="justify-start text-sm font-normal font-inter text-[#c5bba7]">Email</p>
          <p className="justify-start text-white text-lg font-normal font-inter truncate">{profile.email}</p>
        </div>

        {/* Score */}
  <div className="mt-12 mb-4">
  <p className="text-xl text-[#c5bba7] text-center font-brunoace mb-1">
    Total Score
  </p>

  {/* Progress container */}
  <div className="mt-2 w-full bg-zinc-300 rounded-full h-5 relative overflow-hidden">
    {/* Green progress bar */}
    <div
      className="bg-green-500 h-5 absolute top-0 left-0"
      style={{ width: `${progress}%` }}
    ></div>

    {/* Score text (overlaid, centered across full bar) */}
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="text-neutral-900 text-lg font-bold font-inter">
        {profile.totalScore}/{profile.maxScore}
      </span>
    </div>
  </div>
</div>


        {/* Log Out Button */}
        <div className="flex justify-center mt-16 mb-8">
          <button 
           onClick={handleLogout}
            className="!border-2 !border-red-500 !text-[#c5bba7] font-nulshock !bg-neutral-900 !px-2 !py-2 text-sm rounded-md !hover:bg-red-500 hover:text-white transition flex items-center gap-1">
            <Image
            src="/logout.svg"
            alt="close"
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
