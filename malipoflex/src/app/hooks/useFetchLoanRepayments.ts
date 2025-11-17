import { useState, useEffect } from "react";
import { FetchRepayments } from "../utils/fetchLoanRepayment";
export interface LoanRepayment {
 id: number;
  member: number;
  member_first_name: string;
  member_last_name: string;
  contributed_amount: string;
  time_of_contribution: string; 
}

export const useFetchLoanRepayments = () => {
  const [data, setData] = useState<LoanRepayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getLoanRepayments = async () => {
      try {
        const res = await FetchRepayments();
        if (!res.ok) throw new Error("Failed to fetch loan repayments");
        const result = await res.json();
        setData(Array.isArray(result) ? result : []);
      } catch (error: any) {
        setError(error?.message || "Failed to load loan repayments");
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    getLoanRepayments();
  }, []);

  return { data, loading, error };
};