import React, { useEffect, useState } from "react"

interface StatCard {
  title: string
  value: string
  subtitle?: string
}

export function LoansDashboard() {
  const [stats, setStats] = useState<StatCard[]>([
    { title: "Total Disbursed", value: "..." },
    { title: "Active Loans", value: "..." },
    { title: "Pending Request", value: "...", subtitle: "awaiting review" },
    { title: "Outstanding Repayment", value: "..." },
  ])

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/loanAccounts/")
        const data = await response.json()
        const totalDisbursed = data
          .filter((loan: any) => loan.loan_status === "DISBURSED")
          .reduce((sum: number, loan: any) => sum + Number(loan.requested_amount), 0)
        const activeLoans = data.filter((loan: any) =>
          ["APPROVED", "DISBURSED"].includes(loan.loan_status)
        ).length
        const pendingRequests = data.filter((loan: any) => loan.loan_status === "PENDING_MANAGER").length
        const outstandingRepayment = data
          .filter((loan: any) => loan.loan_status === "DISBURSED")
          .reduce((sum: number, loan: any) => sum + Number(loan.outstanding_balance || 0), 0)

        setStats([
          { title: "Total Disbursed", value: `Ksh ${totalDisbursed.toLocaleString()}` },
          { title: "Active Loans", value: `+${activeLoans}` },
          { title: "Pending Request", value: `${pendingRequests}`, subtitle: "awaiting review" },
          { title: "Outstanding Repayment", value: `Ksh ${outstandingRepayment.toLocaleString()}` },
        ])
      } catch {
        // fallback values
      }
    }
    fetchStats()
  }, [])

  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-[#075D74] mb-6">Loans Management</h1>
      <div className="grid grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-[#F3F0E6] rounded-lg p-6 shadow-md flex flex-col"
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
  )
}