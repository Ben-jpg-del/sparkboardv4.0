import { Suspense, lazy } from "react"
import { Route, Routes } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home"
import Projects from "./pages/Projects"
import Founders from "./pages/Founders"
import RooAI from "./pages/RooAI"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ProjectDetail from "./pages/ProjectDetail"
import AuthGuard from "./components/AuthGuard"
import LoadingSpinner from "./components/ui/LoadingSpinner"

// Lazy load the 3D component to improve initial load time
const ThreeDHero = lazy(() => import("./components/ThreeDHero"))

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route
          index
          element={
            <Home
              ThreeDHero={
                <Suspense fallback={<LoadingSpinner />}>
                  <ThreeDHero />
                </Suspense>
              }
            />
          }
        />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:slug" element={<ProjectDetail />} />
        <Route path="founders" element={<Founders />} />
        <Route path="roo-ai" element={<RooAI />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route
          path="new-project"
          element={
            <AuthGuard>
              <div className="container py-8">
                <h1 className="text-2xl font-bold mb-4">Create New Project</h1>
                <p>This is a protected route. You need to be logged in to access it.</p>
              </div>
            </AuthGuard>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
