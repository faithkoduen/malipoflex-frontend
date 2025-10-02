"use client"
import Image from 'next/image';

export default function TeaserScreen() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <Image src="/kitenge.jpg" alt="Market background" fill className="object-cover" />
      <div className="absolute inset-0 bg-[rgba(7,93,116,0.4)]" />
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        <div className="mb-6">
          <Image src="/logo.png" alt="MalipoFlex Logo" width={306} height={263} className="mx-auto" />
        </div>
        <h1 className="text-white text-[75px] font-extrabold">
          Malipo<span className="text-[#F6A704] font-bold">Flex</span>
        </h1>
        <p className="text-white text-[64px] font-semibold mt-2">
          Flex with better savings
        </p>
      </div>
     </div>
  );
}




