"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import { Github, Mail, Lock, User, ArrowRight } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import LoadingSpinner from "../components/ui/LoadingSpinner"

type FormData = {
  email: string
  password: string
}

const Login = () => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login")
  const [isLoading, setIsLoading] = useState(false)
  const { login, signup } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)

    try {
      if (activeTab === "login") {
        await login(data.email, data.password)
      } else {
        await signup(data.email, data.password)
      }
      navigate("/projects")
    } catch (error) {
      console.error("Authentication error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>{activeTab === "login" ? "Login" : "Sign Up"} | Sparkboard</title>
        <meta name="description" content="Login or create an account on Sparkboard to validate your startup ideas." />
      </Helmet>

      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setActiveTab("login")}
                className={`flex-1 py-4 text-center font-medium transition-colors ${
                  activeTab === "login"
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setActiveTab("signup")}
                className={`flex-1 py-4 text-center font-medium transition-colors ${
                  activeTab === "signup"
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                Sign Up
              </button>
            </div>

            <div className="p-6">
              <h1 className="text-2xl font-bold mb-6">
                {activeTab === "login" ? "Welcome back" : "Create an account"}
              </h1>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      id="email"
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                        errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-700"
                      } focus:outline-none focus:ring-2 focus:ring-primary`}
                      placeholder="you@example.com"
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      id="password"
                      type="password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                        errors.password ? "border-red-500" : "border-gray-300 dark:border-gray-700"
                      } focus:outline-none focus:ring-2 focus:ring-primary`}
                      placeholder="••••••••"
                    />
                  </div>
                  {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
                </div>

                {activeTab === "login" && (
                  <div className="flex justify-end">
                    <Link to="#" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-primary to-blue-600 text-white px-6 py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-70 flex items-center justify-center"
                >
                  {isLoading ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <>
                      {activeTab === "login" ? "Login" : "Sign Up"}
                      <ArrowRight size={18} className="ml-2" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <Github size={18} className="mr-2" />
                    GitHub
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <User size={18} className="mr-2" />
                    Google
                  </button>
                </div>
              </div>

              <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                {activeTab === "login" ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => setActiveTab(activeTab === "login" ? "signup" : "login")}
                  className="text-primary hover:underline font-medium"
                >
                  {activeTab === "login" ? "Sign up" : "Login"}
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default Login
