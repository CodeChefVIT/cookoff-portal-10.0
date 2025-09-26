"use client";
import Image from "next/image";
import Statistics from "./Statistics/statistics";
import Timeline from "./Timeline/timeline";
import ProfileCard from "./Profile/profile";
import DetailsCard from "./Details/details";
import api from "@/services";
import { useState, useEffect } from "react";
import { DashboardResponse } from "@/schemas/api/index";
import useKitchenStore from "store/zustant";

export default function Dashboard() {
  const [data, setData] = useState<DashboardResponse>();
  const [loading, setLoading] = useState<boolean>(true);
  const {setRound} = useKitchenStore();
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await api.get("/dashboard");
        setData(res.data.data);
        setRound(res.data.data.current_round);
      } catch (err) {
        console.error("Failed to fetch details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, []);
  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-black">
        <Image
          src="/dashboard/background.svg"
          alt="Background"
          fill
          className="object-cover"
        />
      </div>

      {/* Page container */}
      <div className=" flex flex-col gap-8 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Timeline section */}
        <section className="h-[120px] w-full rounded-2xl flex items-center justify-center overflow-hidden">
          <Timeline current_round={data?.current_round} />
        </section>

        {/* when on > md */}
        <div className="hidden lg:flex flex-col lg:flex-row w-full space-x-8 md:space-x-6 lg:space-x-8 justify-center gap-y-6">
          {/* Profile */}
          <div className="flex-1 min-w-[250px] lg:min-w-[200px] flex justify-center">
            <ProfileCard data={data} loading={loading} />
          </div>

          {/* Statistics */}
          <div className="flex-1 min-w-[300px] lg:min-w-[650px] flex justify-center">
            <Statistics data={data} loading={loading} />
          </div>

          {/* Details */}
          <div className="flex-1 min-w-[250px] lg:min-w-[200px] flex justify-center px-4">
            <DetailsCard
              current_round={data?.current_round}
              loading={loading}
            />
          </div>
        </div>
        {/* when on < md screens */}
        <div className="lg:hidden flex  flex-col lg:flex-row w-full space-x-8 md:space-x-6 lg:space-x-8 justify-center gap-y-6">
          {/* Profile */}
          <div className="flex justify-between">
            <div className="flex-1 min-w-[250px] lg:min-w-[200px] flex justify-center">
              <ProfileCard data={data} loading={loading} />
            </div>
            <div className="flex-1 min-w-[250px] lg:min-w-[200px] flex justify-center px-4">
              <DetailsCard
                current_round={data?.current_round}
                loading={loading}
              />
            </div>
          </div>

          {/* Statistics */}
          <div className="flex-1 min-w-[300px] lg:min-w-[650px] flex justify-center">
            <Statistics loading={loading} data={data} />
          </div>

          {/* Details */}
        </div>
      </div>
    </div>
  );
}
