import React from 'react'
import { X } from 'lucide-react'

interface Guarantor {
  guarantor_name: string
  guarantor_phone_number: string
  status: string
}

interface Member {
  first_name: string
  last_name: string
  phone_number: string
}

interface LoanDetails {
  member: Member
  requested_amount: string | number
  loan_type: string
  loan_reason: string
  requested_at: string
  guarantors: Guarantor[]
}

interface LoansModalProps {
  showModal: boolean
  setShowModal: (show: boolean) => void
  loanDetails: LoanDetails | null
  onApprove: () => void
  onReject: () => void
}

export default function LoansModal({
  showModal,
  setShowModal,
  loanDetails,
  onApprove,
  onReject,
}: LoansModalProps) {
  if (!showModal || !loanDetails) return null

  const member = loanDetails.member
  const guarantors = loanDetails.guarantors || []

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#075D74]">Application Details</h2>
          <button
            onClick={() => setShowModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-700">Name</p>
              <p className="mt-1 text-sm text-gray-900">{member.first_name} {member.last_name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Phone Number</p>
              <p className="mt-1 text-sm text-gray-900">{member.phone_number}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Loan Amount</p>
              <p className="mt-1 text-sm text-gray-900">
                Ksh {parseFloat(String(loanDetails.requested_amount)).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Loan Type</p>
              <p className="mt-1 text-sm text-gray-900">{loanDetails.loan_type}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Application Date</p>
              <p className="mt-1 text-sm text-gray-900">{new Date(loanDetails.requested_at).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Reason for Loan</p>
              <p className="mt-1 text-sm text-gray-900">{loanDetails.loan_reason}</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#075D74] mb-3">Guarantors</h3>
            <div className="grid grid-cols-2 gap-6 w-full">
              {guarantors.map((g, idx) => (
                <div key={idx} className="border rounded p-3">
                  <p className="font-medium text-gray-700">{g.guarantor_name}</p>
                  <p className="text-sm text-gray-600">{g.guarantor_phone_number}</p>
                  <span className={`inline-block mt-2 px-2 py-1 rounded text-xs
                      ${g.status === 'Approved' ? 'bg-yellow-500 text-white'
                        : g.status === 'Rejected' ? 'bg-red-500 text-white'
                        : g.status === 'Expired' ? 'bg-gray-300 text-gray-700'
                        : 'bg-gray-100 text-gray-700'}`}>
                    {g.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onApprove}
            className="px-6 py-2 bg-[#075D74] hover:bg-[#075D74]/90 text-white rounded-md font-medium transition-colors"
          >
            Approve & Disburse
          </button>
          <button
            onClick={onReject}
            className="px-6 py-2 border border-red-500 text-red-500 hover:bg-red-50 rounded-md font-medium transition-colors"
          >
            Reject Application
          </button>
        </div>
      </div>
    </div>
  )
}