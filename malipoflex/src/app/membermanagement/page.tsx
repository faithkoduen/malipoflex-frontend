"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import Sidebar from "../shared-components/sidebar";
import Header from "../shared-components/header";
import { Pagination } from "../shared-components/pagination";
import { SearchInput } from "../shared-components/search";
import { FilterDropdown } from "../shared-components/filter";
import MembersModal from "./MembersModal";
import useFetchMembers from "../hooks/useFetchUsers";

export interface Member {
  member_id?: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  password?: string;
  user_type: string;
  national_id?: string;
  kra_pin?: string;
  email?: string;
  next_of_kin_name?: string;
  next_of_kin_id?: string;
  date?: string;
  status?: string;
}

export default function MemberManagementPage() {
  const { members, loading, error, refetch, addMember } = useFetchMembers();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState("8");
  const [currentPage, setCurrentPage] = useState(1);

  const statusOptions = [
    { label: "All", value: "" },
    { label: "Active", value: "ACTIVE" },
    { label: "Inactive", value: "INACTIVE" },
    { label: "Pending", value: "PENDING" },
  ];

  const SIDEBAR_WIDTH = 256;
  const HEADER_HEIGHT = 64;

  if (loading) {
    return (
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1 flex flex-col" style={{ marginLeft: SIDEBAR_WIDTH }}>
          <Header />
          <div className="flex-1 flex items-center justify-center pt-20">Loading members...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1 flex flex-col" style={{ marginLeft: SIDEBAR_WIDTH }}>
          <Header />
          <div className="flex-1 flex items-center justify-center pt-20 text-red-500">
            Error: {error}
          </div>
        </div>
      </div>
    );
  }

  // Filter and paginate
  const filteredMembers = members.filter((member: Member) => {
    const fullName = `${member.first_name} ${member.last_name}`.toLowerCase();
    const searchMatch =
      fullName.includes(searchTerm.toLowerCase()) ||
      String(member.member_id)?.includes(searchTerm) ||
      member.phone_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.national_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.kra_pin?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.next_of_kin_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.next_of_kin_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.date?.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = statusFilter ? member.status === statusFilter : true;

    return searchMatch && statusMatch;
  });

  const sortedMembers = [...filteredMembers].sort((a, b) => {
    const dateA = a.date ? new Date(a.date) : new Date(0);
    const dateB = b.date ? new Date(b.date) : new Date(0);
    return dateB.getTime() - dateA.getTime();
  });

  const totalPages = Math.ceil(sortedMembers.length / parseInt(itemsPerPage, 10));
  const startIndex = (currentPage - 1) * parseInt(itemsPerPage, 10);
  const paginatedMembers = sortedMembers.slice(startIndex, startIndex + parseInt(itemsPerPage, 10));

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div
        className="flex-1 flex flex-col min-h-screen"
        style={{
          marginLeft: `${SIDEBAR_WIDTH}px`,
          minWidth: 0,
        }}
      >
        {/* Fixed Header */}
        <Header />
        {/* Main Page Content */}
        <main
          className={`
            flex-1
            p-2
            pt-20
            md:p-6
            md:pt-24
            w-full
            max-w-full
            relative
          `}
          style={{
            marginTop: `${HEADER_HEIGHT}px`,
            minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
          }}
        >
          <section className="bg-white shadow-lg rounded-lg px-2 pt-2 pb-4 md:p-6 min-h-[300px]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-2 md:mb-4">
              <h2 className="text-xl font-bold text-[#075D74] mb-2 md:mb-0">
                Member Management
              </h2>
              <div className="flex flex-col-reverse gap-2 md:flex-row md:gap-2 items-start md:items-center w-full md:w-auto">
                <FilterDropdown
                  options={statusOptions}
                  value={statusFilter}
                  onChange={setStatusFilter}
                  placeholder="Filter by status"
                  className="min-w-[120px] w-full md:w-auto border border-gray-300 rounded px-2 py-1"
                />
                <div className="relative w-full md:w-60">
                  <SearchInput
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="search"
                    className="w-full pr-10 border border-gray-300 rounded px-2 py-1"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
                <button
                  className="bg-[#075D74] text-white px-4 py-2 rounded-md w-full md:w-auto"
                  onClick={() => setShowModal(true)}
                >
                  + Add a member
                </button>
              </div>
            </div>
            <div
              className="rounded-lg shadow-[0_0_30px_rgba(0,0,0,0.08)] overflow-x-auto mt-2"
              style={{
                minHeight: "auto",
                maxHeight: "480px",
                height: paginatedMembers.length < 8 ? "auto" : "480px",
                transition: "height 0.3s",
              }}
            >
              <table className="min-w-[600px] w-full border-collapse-separate border-spacing-0 text-sm">
                <thead>
                  <tr className="bg-white sticky top-0 z-10">
                    <th className="text-[#075D74] font-semibold px-4 py-2 text-left">Member Id</th>
                    <th className="text-[#075D74] font-semibold px-4 py-2 text-left">First Name</th>
                    <th className="text-[#075D74] font-semibold px-4 py-2 text-left">Last Name</th>
                    <th className="text-[#075D74] font-semibold px-4 py-2 text-left">Phone Number</th>
                    <th className="text-[#075D74] font-semibold px-4 py-2 text-left">National Id</th>
                    <th className="text-[#075D74] font-semibold px-4 py-2 text-left">KRA PIN</th>
                    <th className="text-[#075D74] font-semibold px-4 py-2 text-left">Email</th>
                    <th className="text-[#075D74] font-semibold px-4 py-2 text-left">Next of Kin</th>
                    <th className="text-[#075D74] font-semibold px-4 py-2 text-left">Next of Kin ID</th>
                    <th className="text-[#075D74] font-semibold px-4 py-2 text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="sticky top-[40px] z-10 bg-white">
                    <td colSpan={10} className="p-0">
                      <hr className="border-t-4" style={{ borderColor: "#F6A704" }} />
                    </td>
                  </tr>
                  {paginatedMembers.map((member: Member) => (
                    <tr
                      key={member.member_id || Math.random()}
                      className="hover:bg-[#E0FFFF] transition"
                      style={{ borderBottom: "1px solid rgba(7,93,116,0.2)" }}
                    >
                      <td className="border-r border-gray-200/50 py-2 px-4">
                        {member.member_id ? `M${String(member.member_id).padStart(3, "0")}` : "N/A"}
                      </td>
                      <td className="border-r border-gray-200/50 py-2 px-4">{member.first_name || "N/A"}</td>
                      <td className="border-r border-gray-200/50 py-2 px-4">{member.last_name || "N/A"}</td>
                      <td className="border-r border-gray-200/50 py-2 px-4">{member.phone_number || "N/A"}</td>
                      <td className="border-r border-gray-200/50 py-2 px-4">{member.national_id || "N/A"}</td>
                      <td className="border-r border-gray-200/50 py-2 px-4">{member.kra_pin || "N/A"}</td>
                      <td className="border-r border-gray-200/50 py-2 px-4">{member.email || "N/A"}</td>
                      <td className="border-r border-gray-200/50 py-2 px-4">{member.next_of_kin_name || "N/A"}</td>
                      <td className="border-r border-gray-200/50 py-2 px-4">{member.next_of_kin_id || "N/A"}</td>
                      <td className="border-r border-gray-200/50 py-2 px-4">
                        {member.date ? new Date(member.date).toLocaleDateString() : "N/A"}
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
              totalEntries={sortedMembers.length}
              startEntry={startIndex + 1}
              endEntry={Math.min(startIndex + parseInt(itemsPerPage, 10), sortedMembers.length)}
            />
            <MembersModal showModal={showModal} setShowModal={setShowModal} onAddMember={addMember} />
          </section>
        </main>
      </div>
    </div>
  );
}