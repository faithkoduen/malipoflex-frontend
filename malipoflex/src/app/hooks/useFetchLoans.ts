import { useState, useEffect } from "react";
import { fetchLoans } from "../utils/fetchLoans";

export interface Loan {
  loan_id: number; 
  member_first_name: string;
  member_last_name: string;
  requested_amount: string;
  loan_reason: string;
  requested_at: string; 
  status?: string;
}
export const useFetchLoans = () => {
  const [data, setData] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getLoans = async () => {
      try {
        const result = await fetchLoans();

        if (!Array.isArray(result)) {
          throw new Error("Expected an array of loans");
        }

        const validLoans = result.filter((loan) => {
          return (
            loan &&
            (typeof loan.loan_id === 'number' || typeof loan.id === 'number') &&
            typeof loan.member_first_name === 'string' &&
            typeof loan.requested_at === 'string'
          );
        });

        const normalizedLoans = validLoans.map(loan => ({
          ...loan,
          loan_id: loan.loan_id ?? loan.id,
        }));

        // ✅ SORT: Newest first (most recent at top)
        const sortedLoans = normalizedLoans.sort((a, b) => {
          const timeA = new Date(a.requested_at).getTime();
          const timeB = new Date(b.requested_at).getTime();
          // Handle invalid dates (fallback to 0)
          return (isNaN(timeB) ? 0 : timeB) - (isNaN(timeA) ? 0 : timeA);
        });

        setData(sortedLoans as Loan[]);
      } catch (error: any) {
        console.error("Failed to fetch loans:", error);
        setError(error?.message || "Failed to load loans");
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    getLoans();
  }, []);

  return { data, loading, error };
};