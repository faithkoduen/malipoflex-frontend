import { FaBell, FaUserCircle } from "react-icons/fa";

export default function Header() {
  return (
    <header
      className="
        fixed 
        top-0
        left-64           // 64 = w-64 sidebar (256px)
        w-[calc(100%-16rem)] 
        h-16 
        bg-[#075D74] 
        text-white 
        flex 
        justify-end 
        items-center 
        space-x-8 
        px-8 
        z-50
        shadow
      "
      style={{
        // If not using Tailwind's arbitrary width, fallback:
        left: '256px',
        width: 'calc(100% - 256px)',
        height: '4rem'
      }}
    >
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