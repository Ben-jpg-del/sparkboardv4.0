"use client"

import { useState, useEffect } from "react"
import { Helmet } from "react-helmet-async"
import { ArrowUpDown, Search } from "lucide-react"
import { motion } from "framer-motion"
import type { Founder } from "../types"
import { fetchFounders } from "../lib/api"
import { useDebounce } from "../hooks/useDebounce"
import LoadingSpinner from "../components/ui/LoadingSpinner"

const Founders = () => {
  const [founders, setFounders] = useState<Founder[]>([])
  const [filteredFounders, setFilteredFounders] = useState<Founder[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Founder | null
    direction: "ascending" | "descending"
  }>({ key: null, direction: "ascending" })
  const [currentPage, setCurrentPage] = useState(1)
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  const itemsPerPage = 10

  useEffect(() => {
    const loadFounders = async () => {
      setIsLoading(true)
      try {
        const data = await fetchFounders()
        setFounders(data)
        setFilteredFounders(data)
      } catch (error) {
        console.error("Failed to fetch founders:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadFounders()
  }, [])

  useEffect(() => {
    // Filter founders based on search term
    const filtered = founders.filter(
      (founder) =>
        founder.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        founder.headline.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
    )

    setFilteredFounders(filtered)
    setCurrentPage(1) // Reset to first page when filtering
  }, [debouncedSearchTerm, founders])

  const requestSort = (key: keyof Founder) => {
    let direction: "ascending" | "descending" = "ascending"

    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }

    setSortConfig({ key, direction })

    const sortedData = [...filteredFounders].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1
      }
      return 0
    })

    setFilteredFounders(sortedData)
  }

  // Pagination
  const totalPages = Math.ceil(filteredFounders.length / itemsPerPage)
  const paginatedFounders = filteredFounders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <>
      <Helmet>
        <title>Founders | Sparkboard</title>
        <meta name="description" content="Connect with innovative founders on Sparkboard." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Founders</h1>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          {/* Search */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search founders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Table */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700/50 text-left">
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Founder
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        <button onClick={() => requestSort("headline")} className="flex items-center">
                          Headline
                          <ArrowUpDown size={14} className="ml-1" />
                        </button>
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        <button onClick={() => requestSort("ideas")} className="flex items-center">
                          Ideas
                          <ArrowUpDown size={14} className="ml-1" />
                        </button>
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        <button onClick={() => requestSort("averageScore")} className="flex items-center">
                          Avg. Score
                          <ArrowUpDown size={14} className="ml-1" />
                        </button>
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {paginatedFounders.map((founder, index) => (
                      <motion.tr
                        key={founder.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-lg font-medium overflow-hidden">
                              {founder.avatar ? (
                                <img
                                  src={founder.avatar || "/placeholder.svg"}
                                  alt={founder.name}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                founder.name.charAt(0)
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="font-medium">{founder.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600 dark:text-gray-300">{founder.headline}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm">{founder.ideas}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm">{founder.averageScore}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="text-primary hover:text-primary/80 text-sm font-medium">Connect</button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                    {Math.min(currentPage * itemsPerPage, filteredFounders.length)} of {filteredFounders.length}{" "}
                    founders
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {filteredFounders.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400">No founders found matching your search.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Founders
