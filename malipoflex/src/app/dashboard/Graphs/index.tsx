'use client';

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  LineChart,
  Line,
} from "recharts";
import { useFetchSavingsContributions } from "@/app/hooks/useFetchSavingContributions";
import { useFetchLoans } from "@/app/hooks/useFetchLoans";
import { useFetchUsers } from "@/app/hooks/useFetchUsers";

function sumByMonth(arr:any, getValue:any, dateField = "created_at") {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug" ,"Sept","Oct","Nov","Dec"];
  const grouped = Array(12).fill(0);
  arr.forEach((item:any) => {
    const dateStr = item[dateField] || item.created_at || item.requested_at || item.date_registered;
    if (!dateStr) return;
    const date = new Date(dateStr);
    const month = date.getMonth();
    if (month >= 0 && month < 12) grouped[month] += getValue(item);
  });
  return { months, grouped };
}

export default function DashboardGraphs() {
  const { data: savingsContributions = [], loading: loadingSavings } = useFetchSavingsContributions();
  const { data: loans = [], loading: loadingLoans } = useFetchLoans();
  const { data: users = [], loading: loadingUsers } = useFetchUsers();

  if (loadingSavings || loadingLoans || loadingUsers) {
    return <div className="text-center py-8 text-gray-500 text-lg">Loading charts...</div>;
  }

  const savingsByMonth = sumByMonth(savingsContributions, (s:any) => Number(s.contributed_amount));
  const loansByMonth = sumByMonth(loans, (l:any) => Number(l.requested_amount), "requested_at");

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

  return (
    <div className="w-full flex justify-end pr-20">
      <div className="w-[87%] pt-15 grid grid-cols-1 lg:grid-cols-2 gap-28">
        <section className="w-fullbg-white  shadow-lg">
          <h2 className="font-bold text-[#075D74] mb-4">Savings vs Loans</h2>
          <ResponsiveContainer width="100%" height={240} className="border-amber-600 rounded">
            <BarChart data={savingsLoansData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Bar dataKey="Loans" fill="#fbbf24" radius={[4,4,0,0]} />
              <Bar dataKey="Savings" fill="#14b8a6" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </section>

        <section className="pl-6 w-fullbg-white  shadow-lg">
          <h2 className="font-bold text-[#075D74] mb-4">Member Growth</h2>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={memberGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Line
                type="monotone"
                dataKey="members"
                stroke="#14b8a6"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6, stroke: "#14b8a6", strokeWidth: 2, fill: "#fff" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </section>
      </div>
    </div>
  );
}
