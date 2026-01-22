import { Link } from 'react-router-dom'
import './Home.css'

const topics = [
  {
    path: '/accessibility',
    title: 'Accessibility & Semantics',
    description: 'Semantic HTML, ARIA attributes, and keyboard navigation',
    icon: '♿',
  },
  {
    path: '/ux-polish',
    title: 'UX, UI & Polish',
    description: 'Loading states, locale formatting, and theme support',
    icon: '✨',
  },
  {
    path: '/separation',
    title: 'Separation of Concerns',
    description: 'Components, pure functions, and services',
    icon: '🧩',
  },
  {
    path: '/testing',
    title: 'Testing',
    description: 'Small testable functions vs big mocked tests',
    icon: '🧪',
  },
]

export default function Home() {
  return (
    <div className="home">
      <header className="home-header">
        <h1>Wolt Frontend Best Practices</h1>
        <p className="subtitle">
          Interactive examples showing good vs bad practices.
          <br />
          Click on a topic to explore.
        </p>
      </header>

      <div className="topic-grid">
        {topics.map((topic) => (
          <Link key={topic.path} to={topic.path} className="topic-card">
            <span className="topic-icon">{topic.icon}</span>
            <h2>{topic.title}</h2>
            <p>{topic.description}</p>
          </Link>
        ))}
      </div>

      <section className="qualities-section">
        <h2>What Makes Good Frontend Code?</h2>
        <ul className="qualities-list">
          <li>
            <strong>Clarity</strong> - Easy to read, easy to explain
          </li>
          <li>
            <strong>Accessible</strong> - Works for everyone, not just mouse + screen users
          </li>
          <li>
            <strong>Predictable</strong> - Behaves the same way every time
          </li>
          <li>
            <strong>Testable</strong> - Important logic can be verified in isolation
          </li>
          <li>
            <strong>Maintainable</strong> - Small changes do not cause surprises
          </li>
        </ul>
      </section>

      <footer className="home-footer">
        <p>
          Based on the presentation by Amedeo Majer for Hive Helsinki students visiting Wolt.
        </p>
      </footer>
    </div>
  )
}
