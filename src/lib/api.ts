import type { Project, Founder } from "../types"
import { mockProjects, mockFounders } from "./mockData"

// Simulate API latency
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Projects API
export const fetchProjects = async (): Promise<Project[]> => {
  await delay(800) // Simulate network delay
  return mockProjects
}

export const fetchProjectBySlug = async (slug: string): Promise<Project | null> => {
  await delay(600)
  const project = mockProjects.find((p) => p.slug === slug)
  return project || null
}

// Founders API
export const fetchFounders = async (): Promise<Founder[]> => {
  await delay(800)
  return mockFounders
}

// ROO-AI API
export const evaluateIdea = async (idea: string, industry: string, stage: string): Promise<any> => {
  await delay(1500) // Longer delay to simulate AI processing

  // Generate somewhat random but plausible scores
  const baseScore = Math.floor(Math.random() * 30) + 50 // Base score between 50-80

  return {
    exitSimilarity: Math.min(100, Math.max(0, baseScore + Math.floor(Math.random() * 20) - 10)),
    novelty: Math.min(100, Math.max(0, baseScore + Math.floor(Math.random() * 20) - 5)),
    marketMomentum: Math.min(100, Math.max(0, baseScore + Math.floor(Math.random() * 25))),
    demand: Math.min(100, Math.max(0, baseScore + Math.floor(Math.random() * 15))),
    saturation: Math.min(100, Math.max(0, baseScore - Math.floor(Math.random() * 20))),
    overallScore: Math.min(100, Math.max(0, baseScore + Math.floor(Math.random() * 10))),
    industry,
    stage,
    idea,
  }
}
