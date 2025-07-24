"use client"

import { motion } from "framer-motion"

interface ScoreBadgeProps {
  score: number
  size?: "sm" | "md" | "lg"
}

const ScoreBadge = ({ score, size = "md" }: ScoreBadgeProps) => {
  let colorClass = ""
  let sizeClass = ""

  // Determine color based on score
  if (score >= 80) {
    colorClass = "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
  } else if (score >= 50) {
    colorClass = "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
  } else {
    colorClass = "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
  }

  // Determine size
  switch (size) {
    case "sm":
      sizeClass = "text-xs px-2 py-0.5"
      break
    case "lg":
      sizeClass = "text-base px-3 py-1.5"
      break
    default:
      sizeClass = "text-sm px-2.5 py-1"
  }

  return (
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      className={`rounded-full font-medium ${colorClass} ${sizeClass} flex items-center justify-center`}
    >
      {score}
    </motion.div>
  )
}

export default ScoreBadge
