import Image from "next/image";
import Statistics from "./Statistics/statistics";
import Timeline from "./Timeline/timeline";
import ProfileCard from "./Profile/profile";
import DetailsCard from "./Details/details";

export default function Dashboard() {
  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-black">
        <Image
          src="/dashboard/background.svg"
          alt="Background"
          fill
          className="absolute -top-[136px]"
        />
      </div>

      {/* Page container */}
      <div className="flex flex-col lg:flex-row lg:flex-wrap lg:justify-center gap-8 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Timeline section */}
        <section className="h-[120px] w-full rounded-2xl flex items-center justify-center text-white text-lg">
          <Timeline />
        </section>

        {/* Main content */}
        <div className="flex flex-col lg:flex-row lg:justify-center gap-8">
          {/* Profile */}
          <div className="w-full lg:w-auto flex justify-center">
            <ProfileCard />
          </div>

          {/* Statistics */}
          <div className="w-full lg:w-[692px] rounded-2xl flex flex-col items-center justify-center text-white">
            <Statistics />
          </div>

          {/* Details */}
          <div className="w-full lg:w-auto flex justify-center">
            <DetailsCard />
          </div>
        </div>
      </div>
    </div>
  );
}
