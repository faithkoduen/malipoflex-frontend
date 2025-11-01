
import { useState, useEffect } from "react";
import {
  FetchAllSavingsAccounts,
  FetchAllSavingsContributions,
  CreateSavingsAccount,
  CreateSavingsContribution,
  SavingsAccount,
  SavingsContribution,
} from "../utils/fetchSavingsAccounts"

export const useFetchSavings = () => {
  const [accounts, setAccounts] = useState<SavingsAccount[]>([]);
  const [contributions, setContributions] = useState<SavingsContribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const [accountsData, contributionsData] = await Promise.all([
        FetchAllSavingsAccounts(),
        FetchAllSavingsContributions()
      ]);
      setAccounts(accountsData);
      setContributions(contributionsData);
    } catch (err: any) {
      setError(err.message || "Failed to load savings data");
      setAccounts([]);
      setContributions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  const addAccount = async (account: SavingsAccount) => {
    try {
      const newAccount = await CreateSavingsAccount(account);
      setAccounts((prev) => [...prev, newAccount]);
    } catch (err: any) {
      setError(err.message || "Failed to add savings account");
    }
  };

  const addContribution = async (contribution: SavingsContribution) => {
    try {
      const newContribution = await CreateSavingsContribution(contribution);
      setContributions((prev) => [...prev, newContribution]);
    } catch (err: any) {
      setError(err.message || "Failed to add savings contribution");
    }
  };

  return { accounts, contributions, loading, error, refetch, addAccount, addContribution };
};