# Sparkboard

Sparkboard is an interactive, SEO-friendly idea-sharing platform that lets founders submit startup ideas for AI-driven market validation ("ROO-AI").

## Tech Stack

- React 18 + TypeScript (Strict TS)
- Tailwind CSS (JIT, dark-mode via class)
- React Router v6 (file-based routes)
- Vite build system

## Features

- Interactive 3D hero section using Three.js
- Responsive design for all screen sizes
- Dark mode support
- SEO optimization with react-helmet-async
- Accessibility features
- Form validation with react-hook-form
- Animations with Framer Motion

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository
\`\`\`bash
git clone https://github.com/yourusername/sparkboard.git
cd sparkboard
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Start the development server
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## Project Structure

\`\`\`
sparkboard/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images and other assets
│   ├── components/      # Reusable UI components
│   ├── context/         # React context providers
│   ├── hooks/           # Custom React hooks
│   ├── layouts/         # Layout components
│   ├── lib/             # Utility functions and API
│   ├── pages/           # Page components
│   ├── tests/           # Test files
│   ├── types/           # TypeScript type definitions
│   ├── App.tsx          # Main App component
│   ├── index.css        # Global styles
│   └── main.tsx         # Entry point
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tailwind.config.ts   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
\`\`\`

## License

This project is licensed under the MIT License.
