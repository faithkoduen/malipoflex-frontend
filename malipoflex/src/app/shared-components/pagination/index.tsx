import React from "react";
import {
  ChevronRight,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages?: number;
  totalEntries?: number;
  startEntry?: number;
  endEntry?: number;
}

export function Pagination({
  currentPage,
  setCurrentPage,
  totalPages = 1,
  totalEntries = 0,
  startEntry = 0,
  endEntry = 0,
}: PaginationProps){
  return (
    <div className="bg-white rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.15)] mt-4 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            className="h-8 w-8 p-0 border border-gray-300 rounded disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
            aria-label="First page"
          >
            <ChevronsLeft className="h-4 w-4" />
          </button>
          <button
            className="h-8 w-8 p-0 border border-gray-300 rounded disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <span className="text-sm text-gray-500 px-2">
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="h-8 w-8 p-0 border border-gray-300 rounded disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <button
            className="h-8 w-8 p-0 border border-gray-300 rounded disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
            aria-label="Last page"
          >
            <ChevronsRight className="h-4 w-4" />
          </button>
        </div>
        <div className="text-sm text-gray-500">
          Showing {startEntry} to {endEntry} of {totalEntries} entries
        </div>
      </div>
    </div>
  );
}