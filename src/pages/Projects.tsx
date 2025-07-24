"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { Search, Filter, TagIcon } from "lucide-react"
import { motion } from "framer-motion"
import { useDebounce } from "../hooks/useDebounce"
import type { Project } from "../types"
import { fetchProjects } from "../lib/api"
import ProjectCard from "../components/ProjectCard"
import LoadingSpinner from "../components/ui/LoadingSpinner"

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [scoreFilter, setScoreFilter] = useState<string>("all")
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const navigate = useNavigate()

  // Get all unique tags from projects
  const allTags = [...new Set(projects.flatMap((project) => project.tags))].sort()

  useEffect(() => {
    const loadProjects = async () => {
      setIsLoading(true)
      try {
        const data = await fetchProjects()
        setProjects(data)
        setFilteredProjects(data)
      } catch (error) {
        console.error("Failed to fetch projects:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProjects()
  }, [])

  useEffect(() => {
    // Filter projects based on search term, tags, and score
    const filtered = projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase())

      const matchesTags = selectedTags.length === 0 || selectedTags.every((tag) => project.tags.includes(tag))

      let matchesScore = true
      if (scoreFilter === "high") {
        matchesScore = project.score >= 80
      } else if (scoreFilter === "medium") {
        matchesScore = project.score >= 50 && project.score < 80
      } else if (scoreFilter === "low") {
        matchesScore = project.score < 50
      }

      return matchesSearch && matchesTags && matchesScore
    })

    setFilteredProjects(filtered)
  }, [debouncedSearchTerm, selectedTags, scoreFilter, projects])

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const handleProjectClick = (slug: string) => {
    navigate(`/projects/${slug}`)
  }

  return (
    <>
      <Helmet>
        <title>Projects | Sparkboard</title>
        <meta name="description" content="Browse and discover innovative startup ideas on Sparkboard." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Explore Projects</h1>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Score Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <select
                value={scoreFilter}
                onChange={(e) => setScoreFilter(e.target.value)}
                className="pl-10 pr-8 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary appearance-none bg-transparent"
              >
                <option value="all">All Scores</option>
                <option value="high">High (80+)</option>
                <option value="medium">Medium (50-79)</option>
                <option value="low">Low (0-49)</option>
              </select>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <TagIcon size={16} className="text-gray-500" />
              <span className="text-sm font-medium">Filter by tags:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    selectedTags.includes(tag)
                      ? "bg-primary text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => handleProjectClick(project.slug)}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No projects found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm("")
                setSelectedTags([])
                setScoreFilter("all")
              }}
              className="mt-4 text-primary hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default Projects
