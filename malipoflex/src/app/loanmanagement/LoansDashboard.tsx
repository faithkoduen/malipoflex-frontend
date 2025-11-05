'use client';

import React from "react";
import { useFetchPendingLoans } from "../hooks/useFetchLoanaccount";

// you should use a LoanAccount interface in the hook for type safety!

interface StatCard {
  title: string;
  value: string;
  subtitle?: string;
}

export function LoansDashboard() {
  const { data, loading, error } = useFetchPendingLoans();

  // Compute stats, using real math and correct statuses!
  const stats: StatCard[] = React.useMemo(() => {
    if (loading || !Array.isArray(data)) {
      return [
        { title: "Total Disbursed", value: "..." },
        { title: "Active Loans", value: "..." },
        { title: "Pending Request", value: "...", subtitle: "awaiting review" },
        { title: "Outstanding Repayment", value: "..." },
      ];
    }

    // 1. Disbursed loans
    const disbursedLoans = data.filter(l => l.status === "DISBURSED");
    const totalDisbursed = disbursedLoans.reduce(
      (sum, l) => sum + Number(l.requested_amount ?? 0),
      0
    );

    // 2. Active loans: All with "APPROVED" or "DISBURSED"
    const activeLoans = data.filter(l =>
      ["APPROVED", "DISBURSED"].includes(l.status)
    ).length;

    // 3. Pending requests: with status "PENDING_MANAGER"
    const pendingRequests = data.filter(l => l.status === "PENDING_MANAGER").length;

    // 4. Outstanding repayment: sum of (requested_amount - total_loan_repaid) for disbursed
    const outstandingRepayment = disbursedLoans.reduce(
      (sum, l) => {
        const requested = Number(l.requested_amount ?? 0);
        const repaid = Number(l.total_loan_repaid ?? 0);
        return sum + (requested - repaid);
      },
      0
    );

    return [
      { title: "Total Disbursed", value: `Ksh ${totalDisbursed.toLocaleString()}` },
      { title: "Active Loans", value: `+${activeLoans}` },
      { title: "Pending Request", value: `${pendingRequests}`, subtitle: "awaiting review" },
      { title: "Outstanding Repayment", value: `Ksh ${outstandingRepayment.toLocaleString()}` },
    ];
  }, [data, loading]);

  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-[#075D74] mb-6">Loans Management</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-[#F3F0E6] rounded-lg p-6 shadow-md flex flex-col min-h-[120px]"
          >
            <div className="text-sm text-gray-600 mb-2">{stat.title}</div>
            <div className="text-2xl font-bold text-[#075D74]">
              {stat.value}
              {stat.subtitle && (
                <span className="text-sm font-normal ml-2">{stat.subtitle}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}