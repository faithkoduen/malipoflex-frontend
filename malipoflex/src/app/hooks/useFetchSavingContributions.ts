import { useState, useEffect } from "react";
import { FetchSavings } from "../utils/fetchSavingContributions";

export interface SavingsContribution {
  id: number;
  member: number; // should be number, not string
  saving: number; // same
  contributed_amount: string;
  pension_amount: string;
  vsla_amount: string;
  transaction_id_c2b: string | null;
  transaction_id_b2b: string | null;
  completed_at: string | null;
  // Add other fields you use
}

export const useFetchSavingsContributions = () => {
  const [data, setData] = useState<SavingsContribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getSavingsContributions = async () => {
      try {
        // ✅ FetchSavings() returns DATA, not Response
        const result = await FetchSavings();
        
        // ✅ No need for .json() or .ok check
        setData(Array.isArray(result) ? result : []);
      } catch (error: any) {
        setError(error?.message || "Failed to load savings contributions");
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    getSavingsContributions();
  }, []);

  return { data, loading, error };
};