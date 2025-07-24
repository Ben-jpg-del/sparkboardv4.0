"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp, Lightbulb, BarChart3, Target, TrendingUp, PieChart } from "lucide-react"
import { evaluateIdea } from "../lib/api"
import LoadingSpinner from "../components/ui/LoadingSpinner"
import RadialProgress from "../components/RadialProgress"

const RooAI = () => {
  const location = useLocation()
  const [idea, setIdea] = useState("")
  const [industry, setIndustry] = useState("tech")
  const [stage, setStage] = useState("early")
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [openSection, setOpenSection] = useState<string | null>(null)

  // Parse query params for draft idea
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const draftIdea = params.get("draft")
    if (draftIdea) {
      setIdea(decodeURIComponent(draftIdea))
    }
  }, [location.search])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const data = await evaluateIdea(idea, industry, stage)
      setResults(data)
      setOpenSection("exitSimilarity") // Open first section by default
    } catch (error) {
      console.error("Error evaluating idea:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section)
  }

  return (
    <>
      <Helmet>
        <title>ROO-AI Analysis | Sparkboard</title>
        <meta name="description" content="Get AI-driven market validation for your startup ideas with ROO-AI." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">ROO-AI Analysis</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Explainer */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">How ROO-AI Works</h2>

              <div className="prose dark:prose-invert max-w-none">
                <p className="mb-4">
                  ROO-AI (Return On Opportunity AI) helps founders validate their startup ideas before investing
                  significant time and resources.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">Our analysis includes:</h3>

                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 bg-blue-100 dark:bg-blue-900/30 p-1 rounded-full">
                      <TrendingUp size={16} className="text-primary" />
                    </div>
                    <div>
                      <strong>Exit Similarity</strong> - Compares your idea to successful exits in the same space
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 bg-blue-100 dark:bg-blue-900/30 p-1 rounded-full">
                      <Lightbulb size={16} className="text-primary" />
                    </div>
                    <div>
                      <strong>Novelty</strong> - Evaluates how innovative your idea is compared to existing solutions
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 bg-blue-100 dark:bg-blue-900/30 p-1 rounded-full">
                      <BarChart3 size={16} className="text-primary" />
                    </div>
                    <div>
                      <strong>Market Momentum</strong> - Analyzes current market trends and growth potential
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 bg-blue-100 dark:bg-blue-900/30 p-1 rounded-full">
                      <Target size={16} className="text-primary" />
                    </div>
                    <div>
                      <strong>Demand</strong> - Measures potential customer interest and market need
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 bg-blue-100 dark:bg-blue-900/30 p-1 rounded-full">
                      <PieChart size={16} className="text-primary" />
                    </div>
                    <div>
                      <strong>Saturation</strong> - Evaluates competitive landscape and market saturation
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Evaluation Panel */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-xl font-bold mb-6">Evaluate Your Idea</h2>

                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="idea" className="block text-sm font-medium mb-1">
                        Describe your startup idea
                      </label>
                      <textarea
                        id="idea"
                        value={idea}
                        onChange={(e) => setIdea(e.target.value)}
                        rows={5}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary resize-y"
                        placeholder="E.g., A platform that connects local farmers with restaurants to reduce food waste and support sustainable agriculture..."
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="industry" className="block text-sm font-medium mb-1">
                          Industry
                        </label>
                        <select
                          id="industry"
                          value={industry}
                          onChange={(e) => setIndustry(e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="tech">Technology</option>
                          <option value="health">Healthcare</option>
                          <option value="finance">Finance</option>
                          <option value="education">Education</option>
                          <option value="ecommerce">E-commerce</option>
                          <option value="sustainability">Sustainability</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="stage" className="block text-sm font-medium mb-1">
                          Stage
                        </label>
                        <select
                          id="stage"
                          value={stage}
                          onChange={(e) => setStage(e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="early">Early Concept</option>
                          <option value="mvp">MVP Ready</option>
                          <option value="launched">Already Launched</option>
                          <option value="scaling">Scaling</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading || !idea.trim()}
                      className="w-full bg-gradient-to-r from-primary to-blue-600 text-white px-6 py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center"
                    >
                      {isLoading ? <LoadingSpinner size="sm" /> : "Run Evaluation"}
                    </button>
                  </div>
                </form>

                {/* Results Accordion */}
                {results && (
                  <div className="mt-8 space-y-4">
                    <h3 className="text-lg font-bold">Analysis Results</h3>

                    <ResultAccordion
                      title="Exit Similarity"
                      icon={<TrendingUp size={18} className="text-primary" />}
                      score={results.exitSimilarity}
                      isOpen={openSection === "exitSimilarity"}
                      toggleOpen={() => toggleSection("exitSimilarity")}
                      description="Your idea shows similarities to successful exits in this space, suggesting potential for acquisition interest."
                    />

                    <ResultAccordion
                      title="Novelty"
                      icon={<Lightbulb size={18} className="text-primary" />}
                      score={results.novelty}
                      isOpen={openSection === "novelty"}
                      toggleOpen={() => toggleSection("novelty")}
                      description="Your approach has some unique elements that differentiate it from existing solutions in the market."
                    />

                    <ResultAccordion
                      title="Market Momentum"
                      icon={<BarChart3 size={18} className="text-primary" />}
                      score={results.marketMomentum}
                      isOpen={openSection === "marketMomentum"}
                      toggleOpen={() => toggleSection("marketMomentum")}
                      description="This market is showing strong growth signals with increasing investor interest and user adoption."
                    />

                    <ResultAccordion
                      title="Demand"
                      icon={<Target size={18} className="text-primary" />}
                      score={results.demand}
                      isOpen={openSection === "demand"}
                      toggleOpen={() => toggleSection("demand")}
                      description="There appears to be significant unmet need in this space, suggesting good product-market fit potential."
                    />

                    <ResultAccordion
                      title="Saturation"
                      icon={<PieChart size={18} className="text-primary" />}
                      score={results.saturation}
                      isOpen={openSection === "saturation"}
                      toggleOpen={() => toggleSection("saturation")}
                      description="The competitive landscape is moderately crowded, but there's still room for differentiated offerings."
                    />
                  </div>
                )}
              </div>

              {/* CTA Footer */}
              {results && (
                <div className="p-6 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Want a comprehensive analysis with actionable insights and investor-ready metrics?
                  </p>
                  <button className="w-full bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors">
                    Sign up for full report
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}

interface ResultAccordionProps {
  title: string
  icon: React.ReactNode
  score: number
  isOpen: boolean
  toggleOpen: () => void
  description: string
}

const ResultAccordion = ({ title, icon, score, isOpen, toggleOpen, description }: ResultAccordionProps) => {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <button
        onClick={toggleOpen}
        className="w-full flex items-center justify-between p-4 text-left bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <div className="flex items-center">
          <div className="mr-3">{icon}</div>
          <span className="font-medium">{title}</span>
        </div>
        <div className="flex items-center">
          <div className="mr-3">
            <RadialProgress value={score} size={36} />
          </div>
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>

      {isOpen && (
        <div className="p-4 bg-white dark:bg-gray-800">
          <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
        </div>
      )}
    </div>
  )
}

export default RooAI
