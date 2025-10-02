import React, { useState } from "react";
import { Search } from "lucide-react";
import Sidebar from "../shared-components/sidebar";
import { Pagination } from "../shared-components/pagination";
import { SearchInput } from "../shared-components/search";
import { FilterDropdown } from "../shared-components/filter";

export function SavingManagement() {
  const [savings, setSavings] = useState<any[]>([]); 
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState("8");
  const [currentPage, setCurrentPage] = useState(1);

  
  const stats = {
    totalSaving: 0,
    activeSavers: 0,
    averageSaving: 0,
    newSavingsThisMonth: 0,
  };

  const statusOptions = [
    { label: "All", value: "" },
    { label: "Completed", value: "COMPLETED" },
    { label: "Pending", value: "PENDING" },
    { label: "Failed", value: "FAILED" },
  ];

  const filteredSavings = savings.filter((saving) => {
    const searchMatch =
      saving.member_first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      saving.member_last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(saving.saving_id).includes(searchTerm) ||
      String(saving.amount).includes(searchTerm) ||
      String(saving.total_saving).includes(searchTerm) ||
      saving.date?.includes(searchTerm);

    const statusMatch = statusFilter ? saving.status === statusFilter : true;

    return searchMatch && statusMatch;
  });

  const sortedSavings = [...filteredSavings].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const totalPages = Math.ceil(sortedSavings.length / parseInt(itemsPerPage));
  const startIndex = (currentPage - 1) * parseInt(itemsPerPage);
  const paginatedSavings = sortedSavings.slice(
    startIndex,
    startIndex + parseInt(itemsPerPage)
  );

  return (
    <section className="min-h-screen bg-white flex">
      <Sidebar />
      <div className="flex-1 p-8">
      
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#F5F5F5] p-4 rounded-lg">
            <h3 className="text-sm text-[#075D74] font-medium">Total saving</h3>
            <p className="text-xl font-bold text-[#075D74]">
              Ksh{stats.totalSaving.toLocaleString()}
            </p>
          </div>
          <div className="bg-[#F5F5F5] p-4 rounded-lg">
            <h3 className="text-sm text-[#075D74] font-medium">Active savers</h3>
            <p className="text-xl font-bold text-[#075D74]">+{stats.activeSavers}</p>
          </div>
          <div className="bg-[#F5F5F5] p-4 rounded-lg">
            <h3 className="text-sm text-[#075D74] font-medium">Average saving</h3>
            <p className="text-xl font-bold text-[#075D74]">
              ksh{stats.averageSaving} <span className="text-xs">per member</span>
            </p>
          </div>
          <div className="bg-[#F5F5F5] p-4 rounded-lg">
            <h3 className="text-sm text-[#075D74] font-medium">New savings this month</h3>
            <p className="text-xl font-bold text-[#075D74]">
              ksh {stats.newSavingsThisMonth.toLocaleString()}
            </p>
          </div>
        </div>

      
        <h2 className="text-xl font-bold text-[#075D74] mb-4">Saving transactions</h2>

       
        <div className="flex justify-between items-center mb-6">
          <FilterDropdown
            options={statusOptions}
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder="Filter ..."
            className="min-w-[150px] border border-gray-300 rounded px-2 py-1"
          />
          <div className="relative w-60">
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="search"
              className="w-full pr-10 border border-gray-300 rounded px-2 py-1"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

 
        <div
          className="bg-white rounded-lg shadow-[0_0_30px_rgba(0,0,0,0.25)] overflow-hidden flex-1 p-8"
          style={{
            minHeight: "auto",
            maxHeight: "480px",
            height: paginatedSavings.length < 8 ? "auto" : "480px",
            transition: "height 0.3s",
          }}
        >
          <table className="min-w-full border-collapse-separate border-spacing-0">
            <thead>
              <tr className="bg-white sticky top-0 z-20">
                <th className="text-[#075D74] font-semibold px-4 py-3 text-left border-b-2 border-[#F6A704]">Saving Id</th>
                <th className="text-[#075D74] font-semibold px-4 py-3 text-left border-b-2 border-[#F6A704]">Name</th>
                <th className="text-[#075D74] font-semibold px-4 py-3 text-left border-b-2 border-[#F6A704]">Amount</th>
                <th className="text-[#075D74] font-semibold px-4 py-3 text-left border-b-2 border-[#F6A704]">Date</th>
                <th className="text-[#075D74] font-semibold px-4 py-3 text-left border-b-2 border-[#F6A704]">Total Saving</th>
              </tr>
            </thead>
            <tbody>
              <tr className="sticky top-[40px] z-10 bg-white">
                <td colSpan={5} className="p-0">
                  <hr className="border-t-4" style={{ borderColor: "#F6A704" }} />
                </td>
              </tr>
              {paginatedSavings.map((saving, idx) => (
                <tr
                  key={saving.saving_id}
                  className="hover:bg-[#E0FFFF] transition"
                  style={{
                    borderBottom: "1px solid rgba(7,93,116,0.2)",
                  }}
                >
                  <td className="border-r border-gray-200/50 py-3 px-4">
                    SV{String(saving.saving_id).padStart(3, "0")}
                  </td>
                  <td className="border-r border-gray-200/50 py-3 px-4">
                    {saving.member_first_name || "N/A"} {saving.member_last_name || ""}
                  </td>
                  <td className="border-r border-gray-200/50 py-3 px-4">
                    Ksh {saving.amount.toLocaleString()}
                  </td>
                  <td className="border-r border-gray-200/50 py-3 px-4">
                    {saving.date
                      ? new Date(saving.date).toLocaleString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                        })
                      : "N/A"}
                  </td>
                  <td className="border-r border-gray-200/50 py-3 px-4">
                    Ksh {saving.total_saving.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

     
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          totalEntries={sortedSavings.length}
          startEntry={startIndex + 1}
          endEntry={Math.min(startIndex + parseInt(itemsPerPage), sortedSavings.length)}
        />
      </div>
    </section>
  );
}
