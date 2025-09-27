"use client";
import { useEffect, useState } from "react";
import { Monitor, Smartphone } from "lucide-react";

export default function ScreenGuard({ children }: { children: React.ReactNode }) {
  const [isAllowed, setIsAllowed] = useState(true);

  useEffect(() => {
    const checkSize = () => {
      setIsAllowed(window.innerWidth >= 1024);
    };

    checkSize();
    window.addEventListener("resize", checkSize);

    return () => window.removeEventListener("resize", checkSize);
  }, []);

  if (!isAllowed) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#0F0F0F] via-[#1A1A1A] to-[#0F0F0F] text-white z-[9999] p-8">
        <div className="text-center space-y-8 max-w-md mx-auto">
          {/* Icon Section */}
          <div className="relative">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <Smartphone className="w-16 h-16 text-red-400" />
              <div className="text-4xl text-gray-400">→</div>
              <Monitor className="w-16 h-16 text-[#32ca67]" />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-4">
            <h1 className="font-nulshock font-bold text-4xl md:text-5xl text-[#B7AB98]">
              COOK <span 
                className="inline-block bg-clip-text text-transparent"
                style={{
                  background: "linear-gradient(90deg, #32CA67 83%, #0A8A36 93%)",
                  WebkitBackgroundClip: "text",
                }}
              >OFF 10.0</span>
            </h1>
            
            <h2 className="text-2xl font-bold text-white mb-4">
              Desktop Required
            </h2>
          </div>

          {/* Message */}
          <div className="space-y-4 text-center">
            <p className="text-lg text-gray-300 leading-relaxed">
              This coding platform is optimized for desktop use to provide the best development experience.
            </p>
            <p className="text-base text-gray-400">
              Please switch to a desktop or laptop with a screen width of at least 1024px.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="space-y-3 text-sm text-gray-400 border-t border-gray-700 pt-6">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-[#32ca67] rounded-full"></div>
              <span>Full-featured code editor</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-[#32ca67] rounded-full"></div>
              <span>Real-time compilation</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-[#32ca67] rounded-full"></div>
              <span>Multi-pane interface</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
