# Frontend Best Practices Demo

An interactive React app demonstrating good vs bad frontend practices.

**Live Demo:** https://amedeomajer.github.io/frontend-best-practices-demo/

**Cheatsheet:** [Download PDF](https://amedeomajer.github.io/frontend-best-practices-demo/cheatsheet.pdf)

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Vitest** - Unit testing

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

If you have [nvm](https://github.com/nvm-sh/nvm) installed, run this to switch to the correct Node version:

```bash
nvm use
```

### Installation

```bash
npm install
```

### Running the App

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
```

The build output will be in the `dist/` folder.

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Navbar.tsx
│   └── SplitView.tsx
├── pages/            # Route pages
│   ├── Home.tsx
│   ├── accessibility/
│   ├── ux-polish/
│   ├── separation/
│   └── testing/
├── utils/            # Pure utility functions
│   ├── formatters.ts
│   └── formatters.test.ts
├── App.tsx           # Main app with routing
├── main.tsx          # Entry point
└── index.css         # Global styles
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run unit tests |
