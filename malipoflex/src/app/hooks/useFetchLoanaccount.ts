'use client';

import { useState, useEffect } from "react";
import { FetchAllLoans } from "../utils/fetchLoanAccounts";

export interface LoanAccount {
  loan_id: number;
  member: number;
  member_first_name: string;
  member_last_name: string;
  member_phone_number: string;
  requested_amount: string;
  loan_reason: string;
  status: string;
  interest_rate: string;
  timeline_months: number;
  frequency_of_payment: string;
  total_interest: number;
  total_repayment: number;
  total_loan_repaid: string;
  outstanding_balance: number;
  requested_at: string;
  approved_at: string | null;
  disbursed_at: string | null;
  repayment_due_date: string | null;
  transaction_id_b2c: string | number | null;
  guarantors: {
    loan: number;
    guarantor_name: string;
    status: string;
  }[];
  repayments: {
    id: number;
    loan_amount_repaid: string;
    loan_repayment_status: string;
    created_at: string;
    updated_at: string;
    loan: number;
    transaction: number;
  }[];
}

export function  useFetchPendingLoans() {
  const [data, setData] = useState<LoanAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await FetchAllLoans();
        if (Array.isArray(result)) {
          setData(result);
        } else if (result && Array.isArray(result.results)) {
          setData(result.results);
        } else {
          setData([]);
        }
      } catch (err: any) {
        setError(err?.message || "Failed to load loans");
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
}