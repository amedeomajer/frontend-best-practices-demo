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
        <div className="footer-links">
          <a
            href={`${import.meta.env.BASE_URL}cheatsheet.pdf`}
            download
            className="footer-link"
          >
            <span className="footer-link-icon">📄</span>
            Download Cheatsheet
          </a>
          <a
            href="https://github.com/amedeomajer/frontend-best-practices-demo"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <span className="footer-link-icon">💻</span>
            View on GitHub
          </a>
        </div>
        <p className="footer-credit">
          Based on a presentation by Amedeo Majer for Hive Helsinki students visiting Wolt
        </p>
      </footer>
    </>
  )
}

export default App
