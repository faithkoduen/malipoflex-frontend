import { useState, useEffect } from "react";
import { FetchTransactions } from "../utils/fetchTransactions";

export interface Transaction {
  id: number;
  transaction_type: string;
  checkout_request_id: string;
  account_reference: string;
  amount_transacted: string;
  paybill_number: string;
  recipient_phone_number: string;
  account_type: string;
  payment_transaction_status: string;
  callback_url: string;
  description: string;
  updated_at: string;
  completed_at: string | null;
  created_at: string;
  member: number | null;
  manager: number | null;
  provider: number | null;
}

export const useFetchTransactions = () => {
  const [data, setData] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const res = await FetchTransactions();
        if (!res.ok) throw new Error("Failed to fetch transactions");
        const result = await res.json();
        setData(Array.isArray(result) ? result : []);
      } catch (error: any) {
        setError(error?.message || "Failed to load transactions");
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    getTransactions();
  }, []);

  return { data, loading, error };
};