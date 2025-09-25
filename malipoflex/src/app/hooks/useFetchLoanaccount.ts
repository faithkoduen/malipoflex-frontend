import { useState, useEffect } from "react"
import { FetchAllLoans } from "../utils/fetchLoanAccounts"

export const useFetchPendingLoans = () => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getPendingLoans = async () => {
      try {
        const result = await FetchAllLoans()
        console.log("API result:", result) // For debugging

        // If result is array, use it; if object, try to find the array inside
        if (Array.isArray(result)) {
          setData(result)
        } else if (result && Array.isArray(result.results)) {
          setData(result.results)
        } else {
          setData([])
        }
      } catch (error: any) {
        setError(error?.message || "Failed to load pending loans")
        setData([])
      } finally {
        setLoading(false)
      }
    }

    getPendingLoans()
  }, [])

  return { data, loading, error }
}