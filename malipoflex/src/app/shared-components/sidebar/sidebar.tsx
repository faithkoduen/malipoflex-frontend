"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  PiggyBank,
  CreditCard,
  Shield,
  FileText,
  LogOut,
} from 'lucide-react';

export default function Sidebar() {
  const [active, setActive] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/" },
    { id: "member", label: "Member", icon: Users, href: "/member" },
    { id: "saving", label: "Savings", icon: PiggyBank, href: "/savings" },
    { id: "loan", label: "Loans", icon: CreditCard, href: "/loans" },
    { id: "pension", label: "Pensions", icon: Shield, href: "/pensions" },
    { id: "policy", label: "Policy", icon: FileText, href: "/policy" },
  ];

  return (
    <aside className="fixed left-0 top-0 flex flex-col bg-[#075D74] w-16 md:w-60 p-2 md:p-6 min-h-screen text-white text-[20px] transition-all duration-200 z-30">
      <div className="flex flex-col items-center mb-10">
        <div className="w-12 h-12 md:w-40 md:h-20 flex items-center justify-center mb-3">
          <Image
            src="/malipoflexlogo.png"
            alt="malipoflex's logo"
            width={160}
            height={80}
            className="hidden md:block"
          />
          <Image
            src="/malipoflexlogo.png"
            alt="malipoflex's logo"
            width={48}
            height={48}
            className="md:hidden"
          />
        </div>
      </div>

      <nav className="flex flex-col space-y-2 w-full">
        {menuItems.map((item) => {
          const isActive = active === item.id;
          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setActive(item.id)}
              className={`flex items-center gap-4 font-semibold pb-2 w-full px-2 md:px-4 py-3 cursor-pointer rounded-none
                ${isActive
                  ? "bg-[#F6A704] text-white font-bold"
                  : "text-gray-200 hover:bg-[#F6A704] hover:text-white"
                }
              `}
              style={{ borderRadius: 0, width: "100%" }}
            >
              <item.icon className="w-6 h-6" />
              <span className="hidden md:inline">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pb-6 w-full">
        <button
          className="flex items-center gap-3 font-bold text-white hover:text-[#F6A704] transition-colors duration-200 w-full px-2 md:px-4 py-3"
          onClick={() => {}}
        >
          <LogOut className="w-6 h-6" />
          <span className="hidden md:inline">Log out</span>
        </button>
      </div>
    </aside>
  );
}