import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AccessibilityPage from './pages/accessibility/AccessibilityPage'
import UxPolishPage from './pages/ux-polish/UxPolishPage'
import SeparationPage from './pages/separation/SeparationPage'
import TestingPage from './pages/testing/TestingPage'
import './App.css'

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/accessibility" element={<AccessibilityPage />} />
          <Route path="/ux-polish" element={<UxPolishPage theme={theme} />} />
          <Route path="/separation" element={<SeparationPage />} />
          <Route path="/testing" element={<TestingPage />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <p>Based on the presentation by Amedeo Majer for Hive Helsinki students visiting Wolt.</p>
        <a
          href="https://github.com/amedeomajer/frontend-best-practices-demo"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub
        </a>
      </footer>
    </>
  )
}

export default App
