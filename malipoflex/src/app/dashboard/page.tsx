'use client';

import React from "react";
import Header from '../shared-components/header';
import Sidebar from '../shared-components/sidebar';
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  LineChart,
  Line,
  Tooltip,
} from "recharts";
import { useFetchUsers } from "@/app/hooks/useFetchUsers";
import { useFetchLoans } from "@/app/hooks/useFetchLoans";
import { useFetchSavings } from "@/app/hooks/useFetchSavingContributions";

// --- helpers
const formatDateTime = (dateStr: string | null | undefined): string => {
  if (!dateStr || dateStr === 'null' || dateStr.trim() === '') return 'N/A';
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleString();
};

function sumByMonth(arr: any[], getValue: (item: any) => number, dateField = "created_at") {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
  const grouped = Array(12).fill(0);
  arr.forEach((item: any) => {
    const dateStr = item[dateField] || item.created_at || item.requested_at || item.date_registered;
    if (!dateStr) return;
    const date = new Date(dateStr);
    const month = date.getMonth();
    if (month >= 0 && month < 12) grouped[month] += getValue(item);
  });
  return { months, grouped };
}

// Circular Stat
function CircleStat({ label, percentage, color = "#11575a", backgroundColor = "#f9f5e7" }: { label: string; percentage: number; color?: string; backgroundColor?: string }) {
  const radius = 34;
  const strokeWidth = 7;
  const circumference = 2 * Math.PI * radius;
  const progress = (percentage / 100) * circumference;
  return (
    <div className="flex flex-col items-center w-full max-w-xs p-2 md:p-4 bg-white rounded-lg shadow-sm">
      <svg className="w-32 h-32 md:w-40 md:h-40" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r={radius} fill="none" stroke="#e5e7eb" strokeWidth={strokeWidth} />
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${progress} ${circumference}`}
          strokeDashoffset={0}
          transform="rotate(-90 40 40)"
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 0.6s linear' }}
        />
        <circle cx="40" cy="40" r={radius - strokeWidth - 2} fill={backgroundColor} />
        <text x="40" y="44" textAnchor="middle" fontSize="20" fill={color} fontWeight="700">
          {percentage}%
        </text>
      </svg>
      <p className="mt-2 text-sm text-[#075D74] font-semibold">{label}</p>
    </div>
  );
}

export default function DashboardPage() {
  const { data: users = [] } = useFetchUsers();
  const { data: loans = [] } = useFetchLoans();
  const { contributions = [] } = useFetchSavings();

  // Stats
  const totalSavings = contributions.reduce((sum, s) => sum + Number(s.contributed_amount || 0), 0);
  const outstandingLoan = loans.filter((l) => l.status !== "Paid").reduce((sum, l) => sum + Number(l.requested_amount || 0), 0);
  const totalMembers = users.length;
  const totalPensions = contributions.reduce((amount, p) => amount + Number(p.pension_amount || 0), 0);

  // Cards Data
  const cards = [
    {
      title: "Total savings",
      value: `ksh ${totalSavings.toLocaleString()}`,
      bg: "#F3F0E6",
    },
    {
      title: "Outstanding Loan",
      value: `ksh ${outstandingLoan.toLocaleString()}`,
      bg: "#F3F0E6",
    },
    {
      title: "Active Members",
      value: `+${totalMembers}`,
      bg: "#F3F0E6",
    },
    {
      title: "Total Pension Contribution",
      value: `ksh ${totalPensions.toLocaleString()}`,
      bg: "#F3F0E6",
    },
  ];

  // Recent Applications
  const recentLoans = loans.slice(0, 5);

  // Repayment Tracking
  const totalLoans = loans.length;
  const completedRepayments = loans.filter((r) => r.status === 'Paid').length;
  const onTimePercent = totalLoans > 0 ? Math.round((completedRepayments / totalLoans) * 100) : 0;
  const delayedPercent = 100 - onTimePercent;

  // Graph Data
  const savingsByMonth = sumByMonth(contributions, (s: any) => Number(s.contributed_amount));
  const loansByMonth = sumByMonth(loans, (l: any) => Number(l.requested_amount), "requested_at");
  const usersByMonth = sumByMonth(users, () => 1, "created_at");

  const savingsLoansData = savingsByMonth.months.map((month, i) => ({
    month,
    Loans: loansByMonth.grouped[i],
    Savings: savingsByMonth.grouped[i],
  }));

let registeredUsers = 0;
  const memberGrowthData = usersByMonth.months.map((month, i) => {
    registeredUsers += usersByMonth.grouped[i];
    return {
      month,
      members: registeredUsers,
    };
  });

  // Layout constants:
  const SIDEBAR_WIDTH = 256;
  const HEADER_HEIGHT = 64;

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex">
      <Sidebar />
      <div
        className="flex-1 flex flex-col min-h-screen"
        style={{
          marginLeft: `${SIDEBAR_WIDTH}px`,
          minWidth: 0,
        }}
      >
        <Header />
        <main
          className={`
            flex-1
            flex
            flex-col
            overflow-x-hidden
            relative
            pt-5       // LESS padding top 
            pb-4
            px-2
            md:pt-8    // LESS on larger screens too
            md:px-6
            xl:px-10
            max-w-full
          `}
          style={{
            marginTop: `${HEADER_HEIGHT}px`,
            minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
          }}
        >
          {/* Card Section mapped */}
          <div
            className={`
              w-full
              grid
              gap-3 
              sm:grid-cols-2
              md:grid-cols-2
              xl:grid-cols-4
              max-w-full
              select-none
              mb-2
            `}
          >
            {cards.map((c) => (
              <div
                key={c.title}
                style={{ background: c.bg }}
                className="p-4 rounded-lg text-center shadow transition-transform duration-200 hover:scale-105 hover:shadow-lg cursor-pointer"
              >
                <h3 className="text-sm text-[#075D74] font-medium mb-2">{c.title}</h3>
                <p className="text-2xl font-bold text-[#075D74]">{c.value}</p>
              </div>
            ))}
          </div>

          {/* Table row and repayment tracking */}
          <div
            className={`
              flex flex-col gap-4 w-full
              xl:flex-row
              xl:gap-8
              mb-2
            `}
          >
            <section className="bg-white shadow-lg rounded-lg p-2 md:p-4 w-full max-w-full mb-4 xl:mb-0">
              <h2 className="font-bold text-[#075D74] mb-3">Recent Applications</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border border-gray-300 rounded">
                  <thead className="bg-gray-100 text-[#075D74] border-b-4 border-[#F6A704]">
                    <tr>
                      <th className="py-2 px-3 border-b border-gray-300">Loan Id</th>
                      <th className="py-2 px-3 border-b border-gray-300">Name</th>
                      <th className="py-2 px-3 border-b border-gray-300">Amount</th>
                      <th className="py-2 px-3 border-b border-gray-300">Requested At</th>
                      <th className="py-2 px-3 border-b border-gray-300">Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentLoans.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-4 px-3 border-b border-gray-300 text-center text-gray-500">
                          No loan applications available.
                        </td>
                      </tr>
                    ) : (
                      recentLoans.map((loan) => (
                        <tr key={loan.loan_id} className="hover:bg-gray-50 text-[#075D74]">
                          <td className="py-2 px-3 border-b border-gray-300">{loan.loan_id}</td>
                          <td className="py-2 px-3 border-b border-gray-300">
                            {loan.member_first_name} {loan.member_last_name}
                          </td>
                          <td className="py-2 px-3 border-b border-gray-300">
                            {loan.requested_amount
                              ? `Ksh ${parseFloat(loan.requested_amount).toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })}`
                              : 'N/A'}
                          </td>
                          <td className="py-2 px-3 border-b border-gray-300">
                            {formatDateTime(loan.requested_at)}
                          </td>
                          <td className="py-2 px-3 border-b border-gray-300">
                            {loan.loan_reason || 'N/A'}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>
            <section className="bg-white shadow-lg rounded-lg p-2 md:p-4 flex flex-col w-full max-w-full items-center justify-center">
              <h2 className="font-bold text-[#075D74] mb-3 w-full text-left">Repayment Tracking</h2>
              <div className="w-full flex flex-row flex-wrap justify-center gap-4 md:gap-6">
                <CircleStat label="Delay repayment" percentage={delayedPercent} color="#11575a" backgroundColor="#F6A70422" />
                <CircleStat label="On-Time Repayment" percentage={onTimePercent} color="#F6A704" backgroundColor="#14b8a622" />
              </div>
            </section>
          </div>

          {/* Graphs, with a margin-top pushed down */}
          <div
            className={`
              w-full
              grid
              gap-4
              xl:grid-cols-2
              xl:gap-8
              mt-2    // a little lower than above
            `}
          >
            <section className="bg-white shadow-lg rounded-lg p-2 md:p-4 h-full flex flex-col min-w-0">
              <div className="flex items-center gap-6 mb-2">
                <h2 className="font-bold text-[#075D74]">Savings vs Loans</h2>
                <div className="flex gap-4 items-center">
                  <span className="flex items-center gap-1">
                    <span className="inline-block h-3 w-6 rounded bg-[#fbbf24]" />
                    <span className="text-xs text-[#075D74] font-semibold">Loans</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="inline-block h-3 w-6 rounded bg-[#14b8a6]" />
                    <span className="text-xs text-[#075D74] font-semibold">Savings</span>
                  </span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={savingsLoansData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 8,
                      background: '#fff',
                      color: "#075D74",
                    }}
                    formatter={(value, name) =>
                      [typeof value === "number" ? `Ksh ${value.toLocaleString()}` : value, name]
                    }
                    labelFormatter={label => `Month: ${label}`}
                  />
                  <Bar dataKey="Loans" fill="#fbbf24" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Savings" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </section>

            <section className="bg-white shadow-lg rounded-lg p-2 md:p-4 h-full flex flex-col min-w-0">
              <div className="flex items-center gap-6 mb-2">
                <h2 className="font-bold text-[#075D74]">Member Growth</h2>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-6 h-2 bg-[#14b8a6] rounded" />
                  <span className="text-xs text-[#075D74] font-semibold">Members</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={memberGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 8,
                      background: '#fff',
                      color: "#075D74",
                    }}
                    formatter={(value, name) =>
                      [typeof value === "number" ? `${value}` : value, name]
                    }
                    labelFormatter={label => `Month: ${label}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="members"
                    stroke="#14b8a6"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#fff", stroke: "#14b8a6", strokeWidth: 2 }}
                    activeDot={{ r: 6, stroke: "#14b8a6", strokeWidth: 2, fill: "#fff" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}