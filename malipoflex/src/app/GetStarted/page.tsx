
"use client";
import Image from "next/image";
import Button from "../shared-components/Button";
import { useRouter } from "next/navigation";

export default function Getstarted() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/authentication/register"); 
  };
  return (
    <div className="w-full min-h-screen bg-[#075D74] flex items-center justify-center relative">
      <div className="w-full max-w-[2200px] flex flex-row items-center justify-between px-24 py-20">
        <div className="flex flex-col items-start space-y-14 w-1/2 z-20">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="MalipoFlex Logo"
                width={189}
                height={163}
              />
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-white text-[45px] font-semibold leading-tight cursor-pointer">Malipo</span>
            <span className="text-[#F6A704] text-[45px] font-semibold leading-tight cursor-pointer">Flex</span>
          </div>
          <div className="text-white text-[80px] md:text-[80px] font-bold leading-tight">
            Your money<br />
            Your flex
          </div>
          <Button
            buttonText="Get Started"
            variant="secondary"
            onClickHandler={handleClick}
          />
        </div>
        <div className="absolute w-1/2 flex items-center justify-center z-10">
          <Image
            src="/images/man.png"
            alt="MalipoFlex Hero"
            className="max-w-full h-auto ml-250 pointer-events-none"
            width={785}
            height={750}
          />
        </div>
      </div>
    </div>
  );
}