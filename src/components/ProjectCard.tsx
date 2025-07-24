import { ArrowRight } from "lucide-react"
import type { Project } from "../types"
import ScoreBadge from "./ScoreBadge"

interface ProjectCardProps {
  project: Project
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold">{project.title}</h3>
          <ScoreBadge score={project.score} />
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <span>By {project.founder}</span>
        </div>
      </div>

      <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(project.createdAt).toLocaleDateString()}
          </span>
          <div className="flex items-center text-primary font-medium">
            View <ArrowRight size={16} className="ml-1" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
