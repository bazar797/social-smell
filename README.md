# El Espejo del Alma

A satirical quiz web application inspired by the Spanish TV show "La Resistencia". Users answer 20 questions (configurable: 10, 20, 30, or 40) and receive a humorous result classifying them as "machista", "racista", both, or neither.

**Disclaimer**: This is satire. It has no scientific validity whatsoever. 

## Features

- 200 questions (mix of serious and humorous)
- Configurable quiz length (10, 20, 30, or 40 questions)
- 50% serious / 50% humorous question distribution
- Random question selection with balanced categories
- Humorous GIF results
- Fully responsive design

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/          # React components
│   ├── Welcome.tsx      # Landing page with quiz configuration
│   ├── QuestionCard.tsx # Question display with Yes/No buttons
│   ├── ProgressBar.tsx  # Quiz progress indicator
│   └── ResultScreen.tsx # Final result with stats and GIF
├── data/
│   ├── questions.json   # 200 questions database
│   └── results.json     # Result texts and GIF URLs
├── hooks/
│   └── useGame.ts       # Main game state management hook
├── types/
│   └── index.ts         # TypeScript type definitions
├── utils/
│   └── scoring.ts       # Question selection and scoring logic
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Tailwind CSS imports
```

## Configuration Files

| File | Description |
|------|-------------|
| `vite.config.ts` | Vite build configuration with React and Tailwind plugins |
| `tsconfig.json` | TypeScript base configuration |
| `tsconfig.app.json` | TypeScript config for application code |
| `tsconfig.node.json` | TypeScript config for Node.js tooling |
| `eslint.config.js` | ESLint configuration for code quality |
| `package.json` | Project dependencies and scripts |
| `index.html` | HTML entry point with SEO meta tags |

## License

MIT
