// src/utils/fetchSavings.ts

// 🔥 FIXED: Added /api to baseUrl
const baseUrl = "http://127.0.0.1:8000/api";

export interface SavingsAccount {
  id: number;
  member: number;
  balance: number;
  date_opened: string;
  status: string;
}

export interface SavingsContribution {
  id: number;
  savings_account: number;
  amount: number;
  date: string;
}

export async function FetchAllSavingsAccounts(): Promise<SavingsAccount[]> {
  try {
    const response = await fetch(`${baseUrl}/savingsAccounts/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("FetchAllSavingsAccounts error:", error);
    throw new Error("Failed to fetch savings accounts: " + (error as Error).message);
  }
}

export async function CreateSavingsAccount(account: Omit<SavingsAccount, 'id'>): Promise<SavingsAccount> {
  try {
    const response = await fetch(`${baseUrl}/savingsAccounts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(account),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("CreateSavingsAccount error:", error);
    throw new Error("Failed to create savings account: " + (error as Error).message);
  }
}

export async function FetchAllSavingsContributions(): Promise<SavingsContribution[]> {
  try {
    const response = await fetch(`${baseUrl}/savingsContributions/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("FetchAllSavingsContributions error:", error);
    throw new Error("Failed to fetch savings contributions: " + (error as Error).message);
  }
}

export async function CreateSavingsContribution(contribution: Omit<SavingsContribution, 'id'>): Promise<SavingsContribution> {
  try {
    const response = await fetch(`${baseUrl}/savingsContributions/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contribution),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("CreateSavingsContribution error:", error);
    throw new Error("Failed to create savings contribution: " + (error as Error).message);
  }
}