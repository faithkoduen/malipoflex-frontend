import { FaBell, FaUserCircle } from "react-icons/fa";

export default function Header() {
  return (
    <header className="bg-[#075D74] text-white p-4 flex pr-24 justify-end items-center space-x-8">
      <div className="relative cursor-pointer">
        <FaBell size={24} />
        <span className="absolute top-0 right-0 h-3 w-3 bg-yellow-400 rounded-full animate-pulse"></span>
      </div>
      <div className="cursor-pointer text-2xl">
        <FaUserCircle size={26} />
      </div>
    </header>
  );
}
