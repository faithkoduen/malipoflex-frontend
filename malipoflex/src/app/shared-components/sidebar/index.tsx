'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FiGrid,
  FiUsers,
  FiCreditCard,
  FiDollarSign,
  FiShield,
  FiFileText,
  FiSettings,
  FiLogOut,
  FiBell,
  FiUser,
} from 'react-icons/fi';

const navigationItems = [
  { name: 'Dashboard', href: '/', icon: FiGrid },
  { name: 'Members', href: '/members', icon: FiUsers },
  { name: 'Savings', href: '/savings', icon: FiCreditCard },
  { name: 'Loans', href: '/loans', icon: FiDollarSign },
  { name: 'Pension', href: '/pension', icon: FiShield },
  { name: 'Policy', href: '/policy', icon: FiFileText },
];

const bottomItems = [
  { name: 'Settings', href: '/settings', icon: FiSettings },
  { name: 'Log out', href: '/logout', icon: FiLogOut },
];

export default function ResponsiveLayout() {
  const pathname = usePathname() ?? '/';
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const headerHeight = 56; 

 
  const isActive = (href) => pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      {}
      <header
        className="fixed top-0 left-0 right-0 bg-[#075D74] text-white h-14 flex items-center px-4 md:px-6 shadow z-50"
        style={{ height: headerHeight }}
      >
        {}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden p-2 mr-4 rounded-md hover:bg-teal-600 focus:outline-none"
          aria-label="Toggle Sidebar"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Title */}
        <h1 className="text-xl font-bold flex-1 min-w-0 truncate">MalipoFlex</h1>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <button aria-label="Notifications" className="relative p-2 rounded hover:bg-teal-600">
            <FiBell size={22} />
            <span className="absolute top-1 right-1 bg-orange-400 text-xs rounded-full px-1">3</span>
          </button>
          <button aria-label="User Account" className="p-2 rounded hover:bg-teal-600">
            <FiUser size={22} />
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-14 left-0 pt-25 h-[calc(100vh-56px)] bg-[#075D74] text-white flex flex-col z-40 transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:w-48 w-64`}
      >
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {navigationItems.map(({ name, href, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                href={href}
                key={name}
                className={`flex items-center w-[100%]px-3 py-2 text-[20px] font-medium rounded-md transition-colors cursor-pointer
                  ${active
                    ? 'bg-[#F6A704] w-[100%] text-white border-r-4 border-[#F6A704]'
                    : 'text-white/90 hover:bg-teal-600 hover:text-white'}
                `}
              >
                <Icon size={20} className="mr-3" />
                <span className="truncate hidden lg:inline">{name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom items */}
        <div className="border-t border-teal-700 py-4 px-4 space-y-1">
          {bottomItems.map(({ name, href, icon: Icon }) => (
            <Link
              href={href}
              key={name}
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer text-white/90 hover:bg-teal-600 hover:text-white"
            >
              <Icon size={20} className="mr-3" />
              <span className="truncate hidden lg:inline">{name}</span>
            </Link>
          ))}
        </div>
      </aside>

      {/* Main content */}
      <main
        className="bg-gray-50 min-h-screen p-6 transition-all duration-300 ease-in-out"
        style={{
          marginLeft: pathname === '/' ? '256px' : '192px',
          marginTop: headerHeight,
        }}
      >
        {/* Your page content goes here */}
      </main>
    </>
  );
}
