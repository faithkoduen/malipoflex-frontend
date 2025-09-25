import React, { useState } from "react"
import { Search, ChevronRight } from "lucide-react"
import { useFetchPendingLoans } from "../hooks/useFetchLoanaccount"
import Sidebar from "../shared-components/sidebar"
import { LoansDashboard } from "./LoansDashboard"
import LoansModal from "./LoansModal"
import PinModal from "./PinModal"
import { Pagination } from "../shared-components/pagination"
import { SearchInput } from "../shared-components/search"
import { FilterDropdown } from "../shared-components/filter"


export function LoansManagement() {
  const { data: loans, loading, error } = useFetchPendingLoans()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [selectedLoan, setSelectedLoan] = useState<any>(null)
  const [showPinModal, setShowPinModal] = useState(false)
  const [itemsPerPage, setItemsPerPage] = useState("8")
  const [currentPage, setCurrentPage] = useState(1)

  const statusOptions = [
    { label: "All", value: "" },
    { label: "Draft", value: "DRAFT" },
    { label: "Pending", value: "PENDING_MANAGER" },
    { label: "Approved", value: "APPROVED" },
    { label: "Disbursed", value: "DISBURSED" },
    { label: "Rejected", value: "REJECTED" },
    // Add other statuses if needed
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex">
        <Sidebar />
        <div className="flex-1 p-8">Loading loans...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex">
        <Sidebar />
        <div className="flex-1 p-8 text-red-500">Error: {error}</div>
      </div>
    )
  }

  const filteredLoans = loans.filter((loan: any) => {
    const searchMatch =
      loan.member_first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.member_last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(loan.loan_id).includes(searchTerm) ||
      loan.loan_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.requested_amount?.toString().includes(searchTerm) ||
      loan.timeline_months?.toString().includes(searchTerm) ||
      loan.frequency_of_payment?.toLowerCase().includes(searchTerm.toLowerCase())

    const statusMatch = statusFilter ? loan.status === statusFilter : true

    return searchMatch && statusMatch
  })

  const sortedLoans = [...filteredLoans].sort((a, b) =>
    new Date(b.requested_at).getTime() - new Date(a.requested_at).getTime()
  )

  const totalPages = Math.ceil(sortedLoans.length / parseInt(itemsPerPage))
  const startIndex = (currentPage - 1) * parseInt(itemsPerPage)
  const paginatedLoans = sortedLoans.slice(startIndex, startIndex + parseInt(itemsPerPage))

  const handleReviewClick = (loan: any) => {
    setSelectedLoan(loan)
    setShowModal(true)
  }

  const handleApproveDisburse = () => {
    setShowModal(false)
    setShowPinModal(true)
  }

  const handleSendPin = (pin: string) => {
    setShowPinModal(false)
    // Handle PIN submission logic here, then call backend to disburse loan
  }

  return (
    <section className="min-h-screen bg-white flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <LoansDashboard />
        <div>
          <h2 className="text-xl font-bold text-[#075D74] mb-4">Loan Requests</h2>
          {/* Controls row: filter left, search right */}
          <div className="flex justify-between items-center mb-6">
            <FilterDropdown
              options={statusOptions}
              value={statusFilter}
              onChange={setStatusFilter}
              placeholder="Filter by status"
              className="min-w-[150px] border border-gray-300 rounded px-2 py-1"
            />
            <div className="relative w-60">
              <SearchInput
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="search"
                className="w-full pr-10 border border-gray-300 rounded px-2 py-1"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
          <div
            className="bg-white rounded-lg shadow-[0_0_30px_rgba(0,0,0,0.25)] overflow-hidden flex-1 p-8"
            style={{
              minHeight: "auto",
              maxHeight: "480px",
              height: paginatedLoans.length < 8 ? "auto" : "480px",
              transition: "height 0.3s"
            }}
          >
            <table className="min-w-full border-collapse-separate border-spacing-0">
              <thead>
                <tr className="bg-white sticky top-0 z-20">
                  <th className="text-[#075D74] font-semibold px-4 py-3 text-left">Loan Id</th>
                  <th className="text-[#075D74] font-semibold px-4 py-3 text-left">Name</th>
                  <th className="text-[#075D74] font-semibold px-4 py-3 text-left">Amount</th>
                  <th className="text-[#075D74] font-semibold px-4 py-3 text-left">Type</th>
                  <th className="text-[#075D74] font-semibold px-4 py-3 text-left">Timeline</th>
                  <th className="text-[#075D74] font-semibold px-4 py-3 text-left">Frequency</th>
                  <th className="text-[#075D74] font-semibold px-4 py-3 text-left">Date</th>
                  <th className="text-[#075D74] font-semibold px-4 py-3 text-left">Status</th>
                  <th className="text-[#075D74] font-semibold px-4 py-3 text-left">Outstanding Balance</th>
                  <th className="text-[#075D74] font-semibold px-4 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="sticky top-[40px] z-10 bg-white">
                  <td colSpan={10} className="p-0">
                    <hr className="border-t-4" style={{ borderColor: "#F6A704" }} />
                  </td>
                </tr>
                {paginatedLoans.map((loan: any, idx: number) => (
                  <tr
                    key={loan.loan_id}
                    className="hover:bg-[#E0FFFF] transition"
                    style={{
                      borderBottom: "1px solid rgba(7,93,116,0.2)"
                    }}
                  >
                    <td className="border-r border-gray-200/50 py-3 px-4">
                      LN{String(loan.loan_id).padStart(3, '0')}
                    </td>
                    <td className="border-r border-gray-200/50 py-3 px-4">
                      {loan.member_first_name || "N/A"} {loan.member_last_name || ""}
                    </td>
                    <td className="border-r border-gray-200/50 py-3 px-4">
                      Ksh {parseFloat(loan.requested_amount).toLocaleString()}
                    </td>
                    <td className="border-r border-gray-200/50 py-3 px-4">
                      {loan.loan_type || "N/A"}
                    </td>
                    <td className="border-r border-gray-200/50 py-3 px-4">
                      {loan.timeline_months ? `${loan.timeline_months} months` : "N/A"}
                    </td>
                    <td className="border-r border-gray-200/50 py-3 px-4">
                      {loan.frequency_of_payment || "N/A"}
                    </td>
                    <td className="border-r border-gray-200/50 py-3 px-4">
                      {loan.requested_at
                        ? new Date(loan.requested_at).toLocaleString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })
                        : "N/A"}
                    </td>
                    <td className="border-r border-gray-200/50 py-3 px-4">
                      <span className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-800">
                        {loan.status || "N/A"}
                      </span>
                    </td>
                    <td className="border-r border-gray-200/50 py-3 px-4">
                      {loan.outstanding_balance !== undefined
                        ? `Ksh ${parseFloat(loan.outstanding_balance).toLocaleString()}`
                        : "N/A"}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        className="bg-[#E0FFFF] text-[#075D74] px-3 py-1 rounded-md flex items-center gap-1"
                        onClick={() => handleReviewClick(loan)}
                      >
                        <span>Review</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            totalEntries={sortedLoans.length}
            startEntry={startIndex + 1}
            endEntry={Math.min(startIndex + parseInt(itemsPerPage), sortedLoans.length)}
          />
        </div>
        <LoansModal
          showModal={showModal}
          setShowModal={setShowModal}
          loanDetails={selectedLoan}
          onApprove={handleApproveDisburse}
          onReject={() => setShowModal(false)}
        />
        <PinModal
          show={showPinModal}
          setShow={setShowPinModal}
          amount={selectedLoan?.requested_amount ? String(selectedLoan.requested_amount) : ""}
          memberName={
            selectedLoan?.member_first_name && selectedLoan?.member_last_name
              ? `${selectedLoan.member_first_name} ${selectedLoan.member_last_name}`
              : ""
          }
          onSubmit={handleSendPin}
        />
      </div>
    </section>
  )
}