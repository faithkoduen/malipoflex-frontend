import { useState, useEffect } from "react";

export interface PensionAccount {
  id: number;
  is_opted_in: boolean;
  contribution_percentage: string;
  provider: string;
  member: string; // Example: "Maggie" (name or identifier)
}

export const useFetchPensionAccounts = () => {
  const [data, setData] = useState<PensionAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPensionAccounts = async () => {
      try {
        const res = await fetch("/api/api/pension-accounts/");
        if (!res.ok) throw new Error("Failed to fetch pension accounts");
        const result = await res.json();
        setData(Array.isArray(result) ? result : []);
      } catch (error: any) {
        setError(error?.message || "Failed to load pension accounts");
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    getPensionAccounts();
  }, []);

  return { data, loading, error };
};