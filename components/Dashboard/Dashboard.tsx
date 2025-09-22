import Image from "next/image";
import Statistics from "./Statistics/statistics";
import Timeline from "./Timeline/timeline";
import ProfileCard from "./Profile/profile";
import DetailsCard from "./Details/details";
export default function Dashboard() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 -z-10 bg-black">
        <Image
          src="/dashboard/background.svg"
          alt="Background"
          fill
          className="absolute -top-[136px]"
        />
      </div>
      {/* Page container */}
      <div className="flex flex-col gap-[34px] w-[1440px] mx-auto">
        <section className="h-[120px] w-full rounded-2xl flex items-center justify-center text-white text-lg">
          <Timeline />
        </section>

        <div className="flex gap-[56px]">
            <ProfileCard name={"soham sexy"} email={"ganeshan@xyz.com"} totalScore={0} maxScore={0}/>
          <div className="w-[692px] h-[618px] rounded-2xl flex items-center justify-center text-white">
            <Statistics />
          </div>

            <DetailsCard currentRound={"3"} timeRemaining={"333"}></DetailsCard>
        </div>
      </div>
    </div>
  );
}
