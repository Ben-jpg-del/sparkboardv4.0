"use client"

import type React from "react"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { Lightbulb, ArrowRight, Sparkles, BarChart3, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

interface HomeProps {
  ThreeDHero: React.ReactNode
}

const Home = ({ ThreeDHero }: HomeProps) => {
  const [ideaInput, setIdeaInput] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (ideaInput.trim()) {
      const encodedIdea = encodeURIComponent(ideaInput)
      navigate(`/roo-ai?draft=${encodedIdea}`)
    }
  }

  return (
    <>
      <Helmet>
        <title>Sparkboard - Spark ideas. Validate faster.</title>
        <meta
          name="description"
          content="Sparkboard is an interactive idea-sharing platform that lets founders submit startup ideas for AI-driven market validation."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="absolute inset-0 -z-10">{ThreeDHero}</div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto z-10"
        >
          <div className="mb-6">
            <SparkboardLogo />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">Spark ideas. Validate faster.</h1>

          <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={ideaInput}
                onChange={(e) => setIdeaInput(e.target.value)}
                placeholder="Describe your startup idea..."
                className="flex-grow px-6 py-3 rounded-full border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                aria-label="Startup idea description"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-primary to-blue-600 text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-md"
              >
                Validate <ArrowRight size={18} />
              </button>
            </div>
          </form>
        </motion.div>
      </section>

      {/* Info Cards Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <InfoCard
              icon={<Sparkles className="h-8 w-8 text-primary" />}
              title="Submit"
              description="Share your startup ideas and get instant feedback from our AI-powered validation system."
              delay={0.1}
            />
            <InfoCard
              icon={<BarChart3 className="h-8 w-8 text-primary" />}
              title="Compare"
              description="See how your idea stacks up against market trends, competition, and investor preferences."
              delay={0.3}
            />
            <InfoCard
              icon={<CheckCircle className="h-8 w-8 text-primary" />}
              title="Decide"
              description="Make data-driven decisions about which ideas to pursue based on comprehensive analysis."
              delay={0.5}
            />
          </div>
        </div>
      </section>
    </>
  )
}

const SparkboardLogo = () => (
  <div className="inline-flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-full shadow-lg mb-4">
    <Lightbulb size={48} className="text-primary" />
  </div>
)

interface InfoCardProps {
  icon: React.ReactNode
  title: string
  description: string
  delay: number
}

const InfoCard = ({ icon, title, description, delay }: InfoCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
  >
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </motion.div>
)

export default Home
