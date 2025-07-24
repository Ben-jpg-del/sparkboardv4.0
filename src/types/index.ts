// Project Types
export interface Project {
  id: string
  title: string
  slug: string
  description: string
  longDescription?: string
  founder: string
  founderName?: string
  score: number
  tags: string[]
  createdAt: string
}

// Founder Types
export interface Founder {
  id: string
  name: string
  headline: string
  avatar: string
  ideas: number
  averageScore: number
}
