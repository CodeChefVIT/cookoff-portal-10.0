
import Image from "next/image";
export default function Header() {
    return(<header className="flex items-center justify-between h-[150px] w-full px-8">
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
    </header>)
}