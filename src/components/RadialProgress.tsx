"use client"

import { motion } from "framer-motion"

interface RadialProgressProps {
  value: number
  size?: number
  strokeWidth?: number
  bgColor?: string
  progressColor?: string
}

const RadialProgress = ({
  value,
  size = 40,
  strokeWidth = 4,
  bgColor = "#e5e7eb",
  progressColor = "#1A73E8",
}: RadialProgressProps) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (value / 100) * circumference

  // Determine color based on value
  let dynamicColor = progressColor
  if (value >= 80) {
    dynamicColor = "#34A853" // Green for high scores
  } else if (value >= 50) {
    dynamicColor = "#FBBC05" // Yellow for medium scores
  } else if (value < 50) {
    dynamicColor = "#EA4335" // Red for low scores
  }

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Background circle */}
      <svg width={size} height={size} className="rotate-[-90deg]">
        <circle cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} stroke={bgColor} fill="transparent" />

        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={dynamicColor}
          fill="transparent"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
          strokeDasharray={`${circumference} ${circumference}`}
        />
      </svg>

      {/* Value text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          className="text-xs font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {value}
        </motion.span>
      </div>
    </div>
  )
}

export default RadialProgress
