"use client";
import { useState, useEffect } from "react";
import TeaserScreen from "../Teaser/page";
import Getstarted from "../Getstarted/page";

export default function Onboarding() {
  const [page, setPage] = useState(0);

  useEffect(() => {
     if (page === 0) {
      const timeoutId = setTimeout(() => {
        setPage(1);
      }, 4000);

      return () => clearTimeout(timeoutId);
    }
  
  }, [page]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {page === 0 ? <TeaserScreen /> : <Getstarted />}
      <div className="absolute bottom-8 left-0 w-full flex justify-center z-30">
        <button
          className={`w-[25px] h-[25px] rounded-full mx-2 transition ${
            page === 0 ? "bg-[#F6A704]" : "bg-white border border-gray-400 opacity-80"
          }`}
          onClick={() => setPage(0)}
          aria-label="Go to teaser"
        />
        <button
          className={`w-[25px] h-[25px] rounded-full mx-2 transition ${
            page === 1 ? "bg-[#F6A704]" : "bg-white border border-gray-400 opacity-80"
          }`}
          onClick={() => setPage(1)}
          aria-label="Go to get started"
        />
      </div>
    </div>
  );
}





