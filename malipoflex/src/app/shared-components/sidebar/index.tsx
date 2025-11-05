'use client';

import Link from 'next/link';
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
  { path: '/members', label: 'Members', icon: Users },
  { path: '/savings', label: 'Savings', icon: PiggyBank },
  { path: '/loans', label: 'Loans', icon: CreditCard },
  { path: '/pension', label: 'Pension', icon: Shield },
  { path: '/policy', label: 'Policy', icon: FileText },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex flex-col w-64 h-screen bg-[#075D74] text-white">
      <div className="flex flex-col flex-1 justify-between mt-4">
        <nav className="flex-1 mt-32">
          <ul>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.path ||
                (pathname === '/' && item.path === '/loans');
              return (
                <li key={item.path} className="border-b border-[#0a6b84]">
                  <Link
                    href={item.path}
                    className={`flex items-center space-x-3 px-6 py-4 transition-colors ${
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
        <div className="border-t border-[#0a6b84]">
          <button className="flex items-center space-x-3 px-6 py-2 w-full text-gray-200 hover:bg-[#0a6b84] hover:text-white transition-colors">
            <LogOut size={20} />
            <span className="font-bold">Log out</span>
          </button>
        </div>
      </div>
    </div>
  );
}