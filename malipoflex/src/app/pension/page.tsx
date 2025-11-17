"use client";

import Sidebar from "../shared-components/sidebar";
import { LoansManagement } from "./Pension";

export default function AccountLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar/>
      <main className="flex-1 p-12">
        <LoansManagement/>
      </main>
    </div>
  );
}
