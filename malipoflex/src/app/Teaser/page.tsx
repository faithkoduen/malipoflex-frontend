
"use client"
import Image from 'next/image';
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from '../shared-components/Button';

export default function TeaserScreen() {

  const router = useRouter();

  const handleClick = () => {
    router.push("/GetStarted"); 
  };
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <Image src="/images/kitenge.jpg" alt="Market background" fill className="object-cover" />
      <div className="absolute inset-0 bg-[rgba(7,93,116,0.4)]" />
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        <div className="mb-6">
          <Image src="/logo.png" alt="MalipoFlex Logo" width={306} height={263} className="mx-auto" />
        </div>
        <h1 className="text-white text-[75px] font-extrabold">
          Malipo<span className="text-[#F6A704] font-bold">Flex</span>
        </h1>
        <p className="text-white text-[34px] font-semibold ml-20 mb-10 flex flex-col">
          Flex with better savings
          <Button
            buttonText="Next page"
            variant="secondary"
            onClickHandler={handleClick}
          />
        </p>
      </div>
     </div>
  );
}
