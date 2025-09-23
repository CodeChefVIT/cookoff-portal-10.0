
import Image from "next/image";
export default function Header() {
    return(<header className="flex items-center justify-between h-[150px] w-full px-8">
        <a
        href="https://www.codechefvit.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image src="/ccLogo.svg" alt="Logo" width={75} height={75} className="opacity-100" priority />
</a>
        <h1 className="text-[90px] font-bold text-center font-[Nulshock] flex items-center justify-center gap-4">
          <span className="text-[#B7AB98] px-2 py-1">
    COOK{""}
    <span className="bg-[linear-gradient(90deg,#32CA67_83.17%,#0A8A36_92.79%)] bg-clip-text text-transparent">
      OFF
    </span>
  </span>
        <span className="bg-[linear-gradient(90deg,#32CA67_83.17%,#0A8A36_92.79%)] bg-clip-text text-transparent px-2 py-1">10.0</span>
        </h1>

        <div className="w-[128px] h-[45px]  ">
        <a
        href="https://papers.codechefvit.com"
  target="_blank"
  rel="noopener noreferrer"
>
  <Image 
    src="/paper.png" 
    alt="Papers" 
    width={75} 
    height={75} 
    className="opacity-100" 
    priority 
  />
</a>

        </div>
    
    </header>)
}