'use client';

import React from 'react';
import { useFetchLoans } from '@/app/hooks/useFetchLoans';

const formatDateTime = (dateStr: string | null | undefined): string => {
  if (!dateStr || dateStr === 'null' || dateStr.trim() === '') {
    return 'N/A';
  }
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }
  return date.toLocaleString(); 
};

function CircleStat({ label, percentage }: { label: string; percentage: number }) {
  return (
    <div className="flex flex-col items-center w-full max-w-xs p-4 bg-white rounded-lg shadow-sm">
      <svg className="w-42 h-42" viewBox="0 0 36 36">
        <circle cx="18" cy="18" r="15" fill="#f9f5e7" />
        <circle
          cx="18"
          cy="18"
          r="15"
          fill="#F5E6B3"
          stroke="#11575a"
          strokeWidth="3"
          strokeDasharray={`${percentage}, 100`}
        />
        <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="8" fill="#11575a">
          {percentage}%
        </text>
      </svg>
      <p className="mt-2 text-sm text-[#075D74]">{label}</p>
    </div>
  );
}

export default function RecentApplicationsAndProgress() {
  const { data: loans = [], loading: loadingLoans } = useFetchLoans();

  if (loadingLoans) {
    return (
      <div className="text-center py-8 text-gray-500 text-lg">
        Loading recent applications...
      </div>
    );
  }

  const recentLoans = loans.slice(0, 5);

  const totalLoans = loans.length;
  const completedRepayments = loans.filter((r) => r.status === 'Paid').length;
  const onTimePercent = totalLoans > 0 ? Math.round((completedRepayments / totalLoans) * 100) : 0;
  const delayedPercent = 100 - onTimePercent;

  return (
    <div className="w-full flex justify-end pr-20">
      <div className="w-[87%]">
        <div className="pt-15 grid grid-cols-1 lg:grid-cols-2 gap-28">

          <section className="w-full bg-white shadow-lg">
            <h2 className="font-bold text-[#075D74] mb-4">Recent Applications</h2>
            <table className="w-full text-left border border-gray-300">
              <thead className="bg-gray-200 text-[#075D74] border-b-4 border-[#F6A704]">
                <tr>
                  <th className="py-2 px-4 border-b border-gray-300">Loan Id</th>
                  <th className="py-2 px-4 border-b border-gray-300">Name</th>
                  <th className="py-2 px-4 border-b border-gray-300">Amount</th>
                  <th className="py-2 px-4 border-b border-gray-300">Requested At</th>
                  <th className="py-2 px-4 border-b border-gray-300">Reason</th>
                </tr>
              </thead>
              <tbody>
                {recentLoans.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-2 px-4 border-b border-gray-300 text-center text-gray-500"
                    >
                      No loan applications available.
                    </td>
                  </tr>
                ) : (
                  recentLoans.map((loan) => (
                    <tr key={loan.loan_id} className="hover:bg-gray-50 text-[#075D74]">
                      <td className="py-2 px-4 border-b border-gray-300">{loan.loan_id}</td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {loan.member_first_name} {loan.member_last_name}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {loan.requested_amount
                          ? `Ksh ${parseFloat(loan.requested_amount).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}`
                          : 'N/A'}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {formatDateTime(loan.requested_at)}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {loan.loan_reason || 'N/A'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </section>

          <section className="pl-6 w-full bg-white shadow-lg">
            <h2 className="font-bold text-[16px] text-[#075D74] mb-4">Repayment Tracking</h2>
            <div className="flex justify-around">
              <CircleStat label="Delay repayment" percentage={delayedPercent} />
              <CircleStat label="On-Time Repayment" percentage={onTimePercent} />
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
