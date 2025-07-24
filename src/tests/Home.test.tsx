import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"
import Home from "../pages/Home"
import jest from "jest" // Import jest to fix the undeclared variable error

// Mock the ThreeDHero component since it uses Three.js which isn't available in test environment
jest.mock("../components/ThreeDHero", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-three-d-hero">3D Hero Mock</div>,
}))

describe("Home Component", () => {
  test("renders hero section with headline", () => {
    render(
      <BrowserRouter>
        <HelmetProvider>
          <Home ThreeDHero={<div>Mock 3D Hero</div>} />
        </HelmetProvider>
      </BrowserRouter>,
    )

    // Check if the main headline is rendered
    const headline = screen.getByText("Spark ideas. Validate faster.")
    expect(headline).toBeInTheDocument()

    // Check if the input field is rendered
    const inputField = screen.getByPlaceholderText("Describe your startup idea...")
    expect(inputField).toBeInTheDocument()

    // Check if the validate button is rendered
    const validateButton = screen.getByText("Validate")
    expect(validateButton).toBeInTheDocument()
  })
})
