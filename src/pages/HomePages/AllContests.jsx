import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import useAxios from "../../hooks/useAxios";
import Loading from "../../components/Loading";
import ContestCard from "../../components/ContestCard";
import { FaSearch, FaTimes, FaFilter, FaChevronLeft, FaChevronRight, FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

const AllContests = () => {
  const axiosInstance = useAxios();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["allContests"],
    queryFn: async () => {
      const res = await axiosInstance.get("/allcontests");
      return res.data;
    },
  });

  // Get unique categories from contests
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(contests.map(contest => contest.contestType))];
    return uniqueCategories.filter(Boolean);
  }, [contests]);

  // Filter and search contests
  const filteredContests = useMemo(() => {
    let filtered = contests;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(contest =>
        contest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contest.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contest.contestType?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(contest => contest.contestType === selectedCategory);
    }

    // Sort contests
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price":
          return parseFloat(b.price) - parseFloat(a.price);
        case "participants":
          return (b.paymentCount || 0) - (a.paymentCount || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [contests, searchTerm, selectedCategory, sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredContests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentContests = filteredContests.slice(startIndex, endIndex);

  // Reset to first page when filters change
  const handleFilterChange = (filterType, value) => {
    setCurrentPage(1);
    switch (filterType) {
      case "search":
        setSearchTerm(value);
        break;
      case "category":
        setSelectedCategory(value);
        break;
      case "sort":
        setSortBy(value);
        break;
      default:
        break;
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSortBy("name");
    setCurrentPage(1);
  };

  // Pagination handlers
  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToFirstPage = () => goToPage(1);
  const goToLastPage = () => goToPage(totalPages);
  const goToPreviousPage = () => goToPage(currentPage - 1);
  const goToNextPage = () => goToPage(currentPage + 1);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl text-secondary font-bold mb-4">
            All Contests
          </h1>
          <div className="inline-flex items-center bg-primary/10 rounded-full px-4 py-2 sm:px-6 sm:py-3">
            <span className="text-sm sm:text-base text-gray-700 mr-2">Total Contests:</span>
            <span className="text-lg sm:text-xl font-bold text-primary">{contests.length}</span>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="text"
                  placeholder="Search contests by name, description, or category..."
                  value={searchTerm}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
                />
                {searchTerm && (
                  <button
                    onClick={() => handleFilterChange("search", "")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter & Sort */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                <select
                  value={selectedCategory}
                  onChange={(e) => handleFilterChange("category", e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base bg-white min-w-[150px]"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <select
                value={sortBy}
                onChange={(e) => handleFilterChange("sort", e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base bg-white min-w-[130px]"
              >
                <option value="name">Sort by Name</option>
                <option value="price">Sort by Prize</option>
                <option value="participants">Sort by Participants</option>
              </select>
            </div>
          </div>

          {/* Active Filters & Items Per Page */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-wrap items-center gap-2">
              {(searchTerm || selectedCategory !== "all" || sortBy !== "name") && (
                <>
                  <span className="text-sm text-gray-600">Active filters:</span>
                  
                  {searchTerm && (
                    <span className="inline-flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                      Search: "{searchTerm}"
                    </span>
                  )}
                  
                  {selectedCategory !== "all" && (
                    <span className="inline-flex items-center bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm">
                      Category: {selectedCategory}
                    </span>
                  )}
                  
                  {sortBy !== "name" && (
                    <span className="inline-flex items-center bg-accent/10 text-accent px-3 py-1 rounded-full text-sm">
                      Sort: {sortBy}
                    </span>
                  )}
                  
                  <button
                    onClick={clearSearch}
                    className="ml-2 text-sm text-gray-500 hover:text-gray-700 underline transition-colors duration-200"
                  >
                    Clear all
                  </button>
                </>
              )}
            </div>

            {/* Items Per Page */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Show:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-3 py-1 border border-gray-300 rounded text-sm bg-white"
              >
                <option value={8}>8 per page</option>
                <option value={12}>12 per page</option>
                <option value={16}>16 per page</option>
                <option value={24}>24 per page</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
          <p className="text-sm sm:text-base text-gray-600">
            Showing <span className="font-semibold text-primary">{startIndex + 1}</span> to{" "}
            <span className="font-semibold text-primary">{Math.min(endIndex, filteredContests.length)}</span> of{" "}
            <span className="font-semibold">{filteredContests.length}</span> contests
            {filteredContests.length !== contests.length && (
              <span className="text-gray-500"> (filtered from {contests.length} total)</span>
            )}
          </p>
          
          {searchTerm && (
            <p className="text-sm text-gray-500">
              Search results for "<span className="font-medium">{searchTerm}</span>"
            </p>
          )}
        </div>

        {/* Contests Grid */}
        {currentContests.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8">
              {currentContests.map(contest => (
                <ContestCard key={contest._id} contest={contest} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl shadow-lg p-4 sm:p-6">
                {/* Page Info */}
                <div className="text-sm text-gray-600">
                  Page <span className="font-semibold">{currentPage}</span> of{" "}
                  <span className="font-semibold">{totalPages}</span>
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center gap-1 sm:gap-2">
                  {/* First Page */}
                  <button
                    onClick={goToFirstPage}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    title="First page"
                  >
                    <FaAngleDoubleLeft className="text-sm" />
                  </button>

                  {/* Previous Page */}
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    title="Previous page"
                  >
                    <FaChevronLeft className="text-sm" />
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {getPageNumbers().map(pageNum => (
                      <button
                        key={pageNum}
                        onClick={() => goToPage(pageNum)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                          pageNum === currentPage
                            ? "bg-primary text-white"
                            : "border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>

                  {/* Next Page */}
                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    title="Next page"
                  >
                    <FaChevronRight className="text-sm" />
                  </button>

                  {/* Last Page */}
                  <button
                    onClick={goToLastPage}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    title="Last page"
                  >
                    <FaAngleDoubleRight className="text-sm" />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          /* No Results State */
          <div className="text-center py-12 sm:py-16">
            <div className="text-6xl sm:text-8xl mb-4">🔍</div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
              No contests found
            </h3>
            <p className="text-gray-600 text-sm sm:text-base mb-4">
              {searchTerm 
                ? `No contests match your search for "${searchTerm}"`
                : "No contests match your current filters"
              }
            </p>
            <button
              onClick={clearSearch}
              className="btn btn-primary btn-sm sm:btn-md"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllContests;