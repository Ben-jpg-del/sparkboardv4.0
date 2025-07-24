import { Link } from "react-router-dom"
import { Github, Twitter, Linkedin } from "lucide-react"
import SparkboardLogo from "./SparkboardLogo"

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <SparkboardLogo className="h-6 w-6 mr-2" />
            <span className="text-sm text-gray-600 dark:text-gray-400">© Sparkboard {new Date().getFullYear()}</span>
          </div>

          <div className="flex space-x-6">
            <Link to="#" aria-label="GitHub">
              <Github className="h-5 w-5 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors" />
            </Link>
            <Link to="#" aria-label="Twitter">
              <Twitter className="h-5 w-5 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors" />
            </Link>
            <Link to="#" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
