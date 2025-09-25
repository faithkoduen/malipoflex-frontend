import React, { useState } from 'react'
import { X } from 'lucide-react'

interface PinModalProps {
  show: boolean
  setShow: (show: boolean) => void
  amount: string
  memberName: string
  onSubmit: (pin: string) => void
}

export default function PinModal({
  show,
  setShow,
  amount,
  memberName,
  onSubmit,
}: PinModalProps) {
  const [pin, setPin] = useState("")

  if (!show) return null

  const handleSend = () => {
    if (pin.length < 4) return // Add simple validation
    onSubmit(pin)
    setPin("")
    setShow(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 flex flex-col items-center">
        <div className="flex justify-between w-full items-center mb-6">
          <h2 className="text-lg font-bold text-[#075D74]">Application Details</h2>
          <button
            onClick={() => setShow(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <p className="mb-6 text-center">
          Enter PIN to authorize loan disbursement of Ksh {amount} to {memberName}
        </p>
        <input
          type="password"
          placeholder="Enter your PIN"
          value={pin}
          onChange={e => setPin(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
        />
        <button
          onClick={handleSend}
          className="w-full px-6 py-2 bg-[#075D74] hover:bg-[#075D74]/90 text-white rounded-md font-medium transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  )
}