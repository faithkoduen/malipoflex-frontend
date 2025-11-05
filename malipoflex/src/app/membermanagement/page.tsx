import MembersManagement from "./memberTable";
import Sidebar from "../shared-components/sidebar";
import Header from "../shared-components/header";

export default function Member() {
  return (
    <div className="flex flex-col h-screen">
      <header className="flex-none">
        <Header />
      </header>
      <div className="flex flex-1 ">
        <aside className="w-64 bg-gray-800 text-white overflow-auto">
          <Sidebar />
        </aside>
        <main className="flex-1 bg-gray-100 p-6">
          <MembersManagement />
        </main>
      </div>
    </div>
  );
}
