import { useState, useEffect } from 'react';
import { FetchAllSavingsContributions,CreateSavingsContribution } from '../utils/fetchSavingContributions';
export interface SavingsContribution {
  id: number;
  member: number;
  member_first_name: string;
  member_last_name: string;
  member_phone: string;
  member_national_id: string;
  saving: number;
  vsla_account_balance: number;
  savings_account_balance: number;
  contributed_amount: string;
  pension_amount: string;
  vsla_amount: string;
  pension_percentage: number | null;
  pension_provider_name: string | null;
  time_of_contribution: string;
  transaction_id_c2b: string | null;
  transaction_id_b2b: string | null;
  created_at: string;
  completed_at: string | null;
}

export const useFetchSavings = () => {
  const [contributions, setContributions] = useState<SavingsContribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const data: SavingsContribution[] = await FetchAllSavingsContributions();
      setContributions(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load savings contributions');
      setContributions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  const addContribution = async (contribution: Partial<SavingsContribution>) => {
    try {
      const newContribution: SavingsContribution = await CreateSavingsContribution(contribution);
      setContributions(prev => [...prev, newContribution]);
    } catch (err: any) {
      setError(err.message || 'Failed to add savings contribution');
    }
  };

  return { contributions, loading, error, refetch, addContribution };
};