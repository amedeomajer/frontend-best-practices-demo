import { NavLink } from 'react-router-dom'
import './Navbar.css'

type NavbarProps = {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export default function Navbar({ theme, onToggleTheme }: NavbarProps) {
  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="navbar-brand">
        <NavLink to="/">Frontend {`<3`}</NavLink>
      </div>

      <ul className="navbar-links">
        <li>
          <NavLink to="/accessibility">Accessibility</NavLink>
        </li>
        <li>
          <NavLink to="/ux-polish">UX & Polish</NavLink>
        </li>
        <li>
          <NavLink to="/separation">Separation</NavLink>
        </li>
        <li>
          <NavLink to="/testing">Testing</NavLink>
        </li>
      </ul>

      <button
        className="theme-toggle"
        onClick={onToggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </nav>
  )
}
