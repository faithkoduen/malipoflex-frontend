"use client";

import ResponsiveLayout from "../shared-components/sidebar/sidebar";
// import Profile from "./Pension";
import { LoansManagement } from "./Pension";

export default function AccountLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <ResponsiveLayout/>
      <main className="flex-1 p-12">
        <LoansManagement/>
      </main>
    </div>
  );
}
