import Image from "next/image";
import Statistics from "./Statistics/statistics";
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
        {/*Header Component*/}
        {/* 
        <header className="flex items-center justify-between h-[150px] w-full">

          <Image src="/ccLogo.svg" alt="Logo" width={75} height={75} className="opacity-100" priority />

          <h1 className="text-[90px] font-bold text-center font-[Nulshock] flex items-center justify-center gap-4">
            <span className="text-[#B7AB98] px-2 py-1">COOK OFF</span>
            <span className="bg-[linear-gradient(90deg,#32CA67_83.17%,#0A8A36_92.79%)] bg-clip-text text-transparent px-2 py-1">10.0</span>
          </h1>

          <div className="w-[128px] h-[45px] rounded-[10px] opacity-80 flex items-center justify-center bg-[#070E0A] border border-[#B7AB98] border-[1.5px]">
            <span className="font-brunoace font-normal text-[16px] leading-[33.96px] tracking-[0.1em] text-center align-middle capitalize text-[#1BA94C]">
                Sponsor
            </span>

          </div>
          <div className="absolute left-0 right-0 top-[145px] border-t-2 border-[#B7AB98]"></div>
        </header> */}

        <section className="h-[120px] w-full rounded-2xl flex items-center justify-center text-white border border-gray-500 text-lg">
          Timeline
        </section>

        <div className="flex gap-[56px]">
          <div className="w-[325px] h-[618px] rounded-2xl flex items-center justify-center text-white border border-gray-500">
            Profile
          </div>
          <div className="w-[692px] h-[618px] rounded-2xl flex items-center justify-center text-white">
            <Statistics />
          </div>
          <div className="w-[325px] h-[618px] rounded-2xl flex items-center justify-center text-white border border-gray-500">
            Details
          </div>
        </div>
      </div>
    </div>
  );
}
