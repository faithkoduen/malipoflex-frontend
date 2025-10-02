'use client';

import React from "react";
import { useFetchUsers } from "@/app/hooks/useFetchUsers";
import { useFetchLoans } from "@/app/hooks/useFetchLoans";
import { useFetchSavingsContributions } from "@/app/hooks/useFetchSavingContributions";

export default function DashboardCards() {
  const { data: users = [], loading: loadingUsers } = useFetchUsers();
  const { data: loans = [], loading: loadingLoans } = useFetchLoans();
  const { data: savingsContributions = [], loading: loadingSavings } = useFetchSavingsContributions();

  const totalSavings = savingsContributions.reduce((sum, s) => sum + Number(s.contributed_amount || 0), 0);
  const outstandingLoan = loans.filter((l) => l.status !== "Paid").reduce((sum, l) => sum + Number(l.requested_amount || 0), 0);
  const totalMembers = users.length;
  const totalPensions = savingsContributions.reduce((amount, p) => amount + Number(p.pension_amount || 0), 0);

  const cards = [
    { title: "Total savings", value: `Ksh ${totalSavings}` },
    { title: "Outstanding Loan", value: `Ksh ${outstandingLoan}` },
    { title: "Active Members", value: `+${totalMembers}` },
    { title: "Total Pension Contribution", value: `Ksh ${totalPensions}` },
  ];

  return (
    <div className="w-full flex justify-end pr-20"> 
      <div className="w-[87%] grid grid-cols-1 md:grid-cols-4 gap-6"> 
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-[#F3F0E6] p-2 rounded shadow flex flex-col items-center justify-center min-h-[75px] max-h-[105px] w-full"
          >
            <p className="text-[13px] text-[#075D74] mb-1">{card.title}</p>
            <p className="font-bold text-[22px] text-[#075D74]">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
