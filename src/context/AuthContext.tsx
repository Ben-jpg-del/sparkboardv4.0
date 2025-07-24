"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string) => Promise<void>
  logout: () => void
  user: User | null
}

interface User {
  id: string
  email: string
  name: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, this would verify the token with your backend
        const token = localStorage.getItem("auth_token")
        const userData = localStorage.getItem("user_data")

        if (token && userData) {
          setIsAuthenticated(true)
          setUser(JSON.parse(userData))
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        localStorage.removeItem("auth_token")
        localStorage.removeItem("user_data")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)

    try {
      // Mock API call - in a real app, this would call your authentication API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful login
      const mockUser = {
        id: "user_123",
        email,
        name: email.split("@")[0],
      }

      // Store auth data
      localStorage.setItem("auth_token", "mock_token_12345")
      localStorage.setItem("user_data", JSON.stringify(mockUser))

      setUser(mockUser)
      setIsAuthenticated(true)
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (email: string, password: string) => {
    setIsLoading(true)

    try {
      // Mock API call - in a real app, this would call your registration API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful signup and auto-login
      const mockUser = {
        id: "user_" + Math.floor(Math.random() * 1000),
        email,
        name: email.split("@")[0],
      }

      // Store auth data
      localStorage.setItem("auth_token", "mock_token_" + Math.random())
      localStorage.setItem("user_data", JSON.stringify(mockUser))

      setUser(mockUser)
      setIsAuthenticated(true)
    } catch (error) {
      console.error("Signup failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user_data")
    setUser(null)
    setIsAuthenticated(false)
  }

  const value = {
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
    user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
