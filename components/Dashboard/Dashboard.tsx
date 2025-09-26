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
      <div className="flex flex-col gap-8 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Timeline section */}
        <section className="h-[120px] w-full rounded-2xl flex items-center justify-center overflow-hidden">
          <Timeline />
        </section>

        {/* Main content */}
        <div className="flex flex-col lg:flex-row w-full space-x-8 md:space-x-6 lg:space-x-8 justify-center gap-y-6">
          {/* Profile */}
          <div className="flex-1 min-w-[250px] lg:min-w-[200px] flex justify-center">
            <ProfileCard />
          </div>

          {/* Statistics */}
          <div className="flex-1 min-w-[300px] lg:min-w-[650px] flex justify-center">
            <Statistics />
          </div>

          {/* Details */}
          <div className="flex-1 min-w-[250px] lg:min-w-[200px] flex justify-center px-4">
            <DetailsCard />
          </div>
        </div>
      </div>
    </div>
  );
}
