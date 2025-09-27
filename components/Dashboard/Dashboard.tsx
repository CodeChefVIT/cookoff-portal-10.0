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
  const { setRound } = useKitchenStore();
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
    <div className="relative min-h-fit p-8">
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
      <div className="flex flex-col gap-2 w-full max-w-[1440px] mx-auto flex-1">
        {/* Timeline section */}
        <section className="h-[120px] w-full rounded-2xl flex items-center justify-center overflow-hidden">
          <Timeline current_round={data?.current_round} />
        </section> 

        <div className="grid gap-8 flex-1 lg:grid-cols-[20%_1fr_20%] grid-cols-2">
          <div className="col-span-1">
            <ProfileCard data={data} loading={loading} />
          </div>
          <div className="col-span-1 ">
            <div className="hidden lg:block h-full">
              <Statistics data={data} loading={loading} />
            </div>
            <div className="lg:hidden h-full">
              <DetailsCard />
            </div>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <div className="lg:hidden h-full">
              <Statistics data={data} loading={loading} />
            </div>
            <div className="lg:block hidden h-full">
              <DetailsCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
