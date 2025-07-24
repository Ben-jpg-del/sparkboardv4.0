"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { ArrowLeft, Calendar, User, TagIcon, Share2 } from "lucide-react"
import { motion } from "framer-motion"
import type { Project } from "../types"
import { fetchProjectBySlug } from "../lib/api"
import ScoreBadge from "../components/ScoreBadge"
import LoadingSpinner from "../components/ui/LoadingSpinner"

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>()
  const [project, setProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const loadProject = async () => {
      setIsLoading(true)
      try {
        if (slug) {
          const data = await fetchProjectBySlug(slug)
          setProject(data)
        }
      } catch (error) {
        console.error("Failed to fetch project:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProject()
  }, [slug])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <LoadingSpinner />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Project not found</h2>
        <p className="mb-6">The project you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => navigate("/projects")}
          className="text-primary hover:underline flex items-center justify-center gap-2 mx-auto"
        >
          <ArrowLeft size={16} /> Back to Projects
        </button>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{project.title} | Sparkboard</title>
        <meta name="description" content={project.description} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate("/projects")}
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary mb-6"
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Projects
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
        >
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
              <h1 className="text-3xl font-bold">{project.title}</h1>
              <ScoreBadge score={project.score} size="lg" />
            </div>

            <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center">
                <User size={16} className="mr-2" />
                <span>{project.founder}</span>
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                <span>{new Date(project.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="prose dark:prose-invert max-w-none mb-8">
              <p className="text-gray-700 dark:text-gray-200 mb-4">{project.description}</p>

              {project.longDescription && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3">About this project</h3>
                  <p className="text-gray-700 dark:text-gray-200">{project.longDescription}</p>
                </div>
              )}
            </div>

            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <TagIcon size={16} />
                <h3 className="font-semibold">Tags</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate(`/roo-ai?draft=${encodeURIComponent(project.title)}`)}
                className="bg-gradient-to-r from-primary to-blue-600 text-white px-6 py-3 rounded-xl hover:opacity-90 transition-opacity flex-1 flex items-center justify-center gap-2"
              >
                Run ROO-AI Analysis
              </button>
              <button className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2">
                <Share2 size={18} /> Share Project
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default ProjectDetail
