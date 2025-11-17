'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  PiggyBank,
  CreditCard,
  Shield,
  FileText,
  Settings,
  LogOut,
} from 'lucide-react';

type MenuItem = {
  path: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
};

const menuItems: MenuItem[] = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/membermanagement', label: 'Members', icon: Users },
  { path: '/savingsmanagement', label: 'Savings', icon: PiggyBank },
  { path: '/loanmanagement', label: 'Loans', icon: CreditCard },
  { path: '/pension', label: 'Pension', icon: Shield },
  { path: '/policy', label: 'Policy', icon: FileText },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col h-screen w-64 bg-[#075D74] text-white fixed left-0 top-0 z-40">
      {/* Logo/Header section */}
      <div className="flex flex-col items-center justify-center py-6 px-4">
        {/* Replace logo.png with your static image path or update the URL */}
        <Image
          src="/malipologo.png"
          width={196}
          height={196}
          alt="App Logo"
          className=""
          priority
        />
      </div>

      {/* Navigation Menu (scrollable if overflow) */}
      <nav className="flex-1 overflow-y-auto px-2 pt-2 pb-1">
        <ul className="flex flex-col gap-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.path ||
              (pathname === '/' && item.path === '/loans');
            return (
              <li key={item.path} className="border-b border-[#0a6b84] last:border-b-0">
                <Link
                  href={item.path}
                  className={`flex items-center space-x-3 px-3 py-2 w-full rounded transition-colors ${
                    isActive
                      ? 'bg-[#F6A704] text-white font-bold'
                      : 'text-gray-200 hover:bg-[#0a6b84] hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout button with less space from menu, not hugging absolute bottom */}
      <div className="px-4 pb-6 pt-2">
        <button className="flex items-center space-x-3 w-full py-2 text-gray-200 hover:bg-[#0a6b84] hover:text-white transition-colors font-bold rounded">
          <LogOut size={20} />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}