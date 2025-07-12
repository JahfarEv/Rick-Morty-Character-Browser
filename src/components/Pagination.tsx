import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const getVisiblePages = () => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 2) {
      return [1, 2, 3];
    }

    if (currentPage >= totalPages - 1) {
      return [totalPages - 2, totalPages - 1, totalPages];
    }

    return [currentPage - 1, currentPage, currentPage + 1];
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-between mt-8 px-4">
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={`p-2 rounded-full ${
            currentPage === 1
              ? "opacity-30 cursor-not-allowed"
              : "hover:bg-indigo-100 text-indigo-600 hover:text-indigo-800"
          }`}
          aria-label="First page"
        >
          <ChevronDoubleLeftIcon className="h-4 w-4" />
        </button>

        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`p-2 rounded-full ${
            currentPage === 1
              ? "opacity-30 cursor-not-allowed"
              : "hover:bg-indigo-100 text-indigo-600 hover:text-indigo-800"
          }`}
          aria-label="Previous page"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="flex items-center gap-1">
        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium ${
              page === currentPage
                ? "bg-indigo-600 text-white shadow-md"
                : "hover:bg-indigo-100 text-gray-700"
            }`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        ))}

        {currentPage < totalPages - 1 && totalPages > 3 && (
          <span className="px-2 text-gray-500">...</span>
        )}

        {totalPages > 3 && currentPage < totalPages - 1 && (
          <button
            onClick={() => onPageChange(totalPages)}
            className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium ${
              currentPage === totalPages
                ? "bg-indigo-600 text-white"
                : "hover:bg-indigo-100 text-gray-700"
            }`}
          >
            {totalPages}
          </button>
        )}
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-full ${
            currentPage === totalPages
              ? "opacity-30 cursor-not-allowed"
              : "hover:bg-indigo-100 text-indigo-600 hover:text-indigo-800"
          }`}
          aria-label="Next page"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>

        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-full ${
            currentPage === totalPages
              ? "opacity-30 cursor-not-allowed"
              : "hover:bg-indigo-100 text-indigo-600 hover:text-indigo-800"
          }`}
          aria-label="Last page"
        >
          <ChevronDoubleRightIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
