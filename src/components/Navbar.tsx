"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Menu, X, Moon, Sun } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import SparkboardLogo from "./SparkboardLogo"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const { isAuthenticated, logout } = useAuth()

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    document.documentElement.classList.toggle("dark", newDarkMode)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <SparkboardLogo className="h-8 w-8" />
            <span className="font-bold text-xl">Sparkboard</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-primary">
              Home
            </Link>
            <Link to="/projects" className="text-gray-700 dark:text-gray-200 hover:text-primary">
              Projects
            </Link>
            <Link to="/founders" className="text-gray-700 dark:text-gray-200 hover:text-primary">
              Founders
            </Link>
            <Link to="/roo-ai" className="text-gray-700 dark:text-gray-200 hover:text-primary">
              ROO-AI
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/new-project" className="text-gray-700 dark:text-gray-200 hover:text-primary">
                  New Project
                </Link>
                <button onClick={logout} className="text-gray-700 dark:text-gray-200 hover:text-primary">
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-gradient-to-r from-primary to-blue-600 text-white px-4 py-2 rounded-xl hover:opacity-90 transition-opacity"
              >
                Login
              </Link>
            )}
            <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 mr-2">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden mt-3 pb-3 space-y-3">
            <Link
              to="/"
              className="block py-2 px-4 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/projects"
              className="block py-2 px-4 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Projects
            </Link>
            <Link
              to="/founders"
              className="block py-2 px-4 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Founders
            </Link>
            <Link
              to="/roo-ai"
              className="block py-2 px-4 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              ROO-AI
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/new-project"
                  className="block py-2 px-4 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  New Project
                </Link>
                <button
                  onClick={() => {
                    logout()
                    setIsOpen(false)
                  }}
                  className="block w-full text-left py-2 px-4 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block py-2 px-4 bg-gradient-to-r from-primary to-blue-600 text-white rounded-xl hover:opacity-90 transition-opacity"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
