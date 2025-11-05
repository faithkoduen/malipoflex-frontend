import DashboardGraphs from "./Graphs";
import DashboardCards from "./Cards";
import RecentApplicationsAndProgress from "./Application";
import Header from "../shared-components/header";
import Sidebar from "../shared-components/sidebar";
export default function DashboardLayout() {
  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main>
          <DashboardCards />
          <RecentApplicationsAndProgress />
          <DashboardGraphs />
        </main>
      </div>
    </>
  );
}
