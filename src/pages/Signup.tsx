"use client"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet-async"

const Signup = () => {
  const navigate = useNavigate()

  // Redirect to login page with signup tab active
  useEffect(() => {
    navigate("/login", { replace: true })
  }, [navigate])

  return (
    <>
      <Helmet>
        <title>Sign Up | Sparkboard</title>
        <meta name="description" content="Create an account on Sparkboard to validate your startup ideas." />
      </Helmet>

      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <p>Redirecting to signup...</p>
      </div>
    </>
  )
}

export default Signup
