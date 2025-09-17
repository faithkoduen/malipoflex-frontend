"use client";
import { useState } from "react";
import Link from 'next/link';
import {
  FaUsers, FaPiggyBank,
  FaMoneyCheck, FaUserShield, FaCog, FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import { RiHome4Line } from "react-icons/ri";
import { MdPolicy } from "react-icons/md";
export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const menuItems = [
    { label: 'Dashboard', icon: <RiHome4Line/>, href: "#" },
    { label: 'Members', icon: <FaUsers />, href: "#" },
    { label: 'Savings', icon: <FaPiggyBank />, href: "#" },
    { label: 'Loans', icon: <FaMoneyCheck />, href: "#" },
    { label: 'Pension', icon: <FaUserShield />, href: "#" },
    { label: 'Policy', icon: <MdPolicy />, href: "#" },
  ];
  return (
    <>
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="sm:hidden fixed top-4 left-4 z-50 p-2 rounded-md text-white bg-[#075D74]"
        aria-label="Toggle sidebar"
      >
        <FaBars size={24} />
      </button>
      <aside className={`
        bg-[#075D74] text-white w-50 h-[95vh] flex flex-col p-6 pt-32 space-y-12
        fixed sm:static top-0 left-0 z-40
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-"}
        sm:translate-x-0
      `}>
        <nav className="flex flex-col space-y-8 text-lg font-medium">
          {menuItems.map(({ label, icon, href }) => (
            <button
              key={label}
              onClick={() => {
                setActive(label);
                setSidebarOpen(false); 
              }}
              className={`
               flex items-center space-x-3 rounded py-2 transition-colors w-[100%] text-left
               ${active === label ? "bg-yellow-600 text-[#FFFFFF] font-bold" : ""}
              `}
            >
              <span className="text-xl">{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="mt-auto pb-12 flex flex-col space-y-5 text-lg font-medium">
          <button className="flex items-center space-x-3 rounded px-3 py-2 w-full text-left">
            <span className="text-xl"><FaCog /></span>
            <span>Settings</span>
          </button>
          <button className="flex items-center space-x-3 rounded px-3 py-2 w-full text-left">
            <span className="text-xl"><FaSignOutAlt /></span>
            <span>Log out</span>
          </button>
        </div>
      </aside>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}