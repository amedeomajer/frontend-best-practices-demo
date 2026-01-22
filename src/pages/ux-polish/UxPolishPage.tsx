import { useState } from 'react'
import SplitView from '../../components/SplitView'
import { formatDate, formatCurrency, formatNumber } from '../../utils/formatters'
import './UxPolishPage.css'

type UxPolishPageProps = {
  theme: 'light' | 'dark'
}

// Demo data for formatting examples
const RAW_DATE = '2026-01-22T14:30:00Z'
const RAW_PRICE = 1234.5
const RAW_NUMBER = 1000000

export default function UxPolishPage({ theme }: UxPolishPageProps) {
  // Note: badLoading state exists but is intentionally not used in UI
  // This demonstrates the "bad" pattern of no loading feedback
  const [, setBadLoading] = useState(false)
  const [badData, setBadData] = useState<string | null>(null)

  const [goodLoading, setGoodLoading] = useState(false)
  const [goodData, setGoodData] = useState<string | null>(null)

  // Simulate API fetch for demo purposes
  const simulateFetch = async (
    setLoading: (v: boolean) => void,
    setData: (v: string) => void
  ) => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setData('Data loaded successfully!')
    setLoading(false)
  }

  const handleBadFetch = () => {
    simulateFetch(setBadLoading, setBadData)
  }

  const handleGoodFetch = () => {
    simulateFetch(setGoodLoading, setGoodData)
  }

  // Formatted versions using utility functions
  const formattedDate = formatDate(RAW_DATE)
  const formattedPrice = formatCurrency(RAW_PRICE)
  const formattedNumber = formatNumber(RAW_NUMBER)

  return (
    <div className="ux-polish-page">
      <header className="page-header">
        <h1>UX, UI & Polish</h1>
        <p className="tagline">
          "Good UX is about removing friction, not adding decoration."
        </p>
      </header>

      {/* Example 1: Loading States */}
      <section className="example-section">
        <h2>1. Loading States</h2>
        <p className="example-instruction">
          Click both buttons to fetch data. Notice the difference.
        </p>

        <SplitView
          bad={{
            title: 'No loading feedback',
            content: (
              <div className="demo-area">
                <button
                  className="fetch-button"
                  onClick={handleBadFetch}
                >
                  Fetch Data
                </button>
                {badData && <p className="fetch-result">{badData}</p>}
              </div>
            ),
            points: [
              'User unsure if click worked',
              'Multiple clicks possible',
              'No visual feedback during load',
              'Confusing experience',
            ],
          }}
          good={{
            title: 'Loading spinner + disabled',
            content: (
              <div className="demo-area">
                <button
                  className="fetch-button"
                  onClick={handleGoodFetch}
                  disabled={goodLoading}
                >
                  {goodLoading ? (
                    <>
                      <span className="spinner" /> Loading...
                    </>
                  ) : (
                    'Fetch Data'
                  )}
                </button>
                {goodData && <p className="fetch-result">{goodData}</p>}
              </div>
            ),
            points: [
              'Clear loading indication',
              'Button disabled during load',
              'Text changes to show state',
              'User knows action is processing',
            ],
          }}
        />
      </section>

      {/* Example 2: Formatting */}
      <section className="example-section">
        <h2>2. Locale-Aware Formatting</h2>
        <p className="example-instruction">
          Raw data vs formatted for user's locale.
        </p>

        <SplitView
          bad={{
            title: 'Raw data display',
            content: (
              <div className="demo-area formatting-demo">
                <div className="format-row">
                  <span className="format-label">Date:</span>
                  <span className="format-value raw">{RAW_DATE}</span>
                </div>
                <div className="format-row">
                  <span className="format-label">Price:</span>
                  <span className="format-value raw">{RAW_PRICE}</span>
                </div>
                <div className="format-row">
                  <span className="format-label">Number:</span>
                  <span className="format-value raw">{RAW_NUMBER}</span>
                </div>
              </div>
            ),
            points: [
              'ISO dates are confusing',
              'No currency symbol',
              'No thousand separators',
              'Looks like debug output',
            ],
          }}
          good={{
            title: 'Formatted with Intl API',
            content: (
              <div className="demo-area formatting-demo">
                <div className="format-row">
                  <span className="format-label">Date:</span>
                  <span className="format-value formatted">{formattedDate}</span>
                </div>
                <div className="format-row">
                  <span className="format-label">Price:</span>
                  <span className="format-value formatted">{formattedPrice}</span>
                </div>
                <div className="format-row">
                  <span className="format-label">Number:</span>
                  <span className="format-value formatted">{formattedNumber}</span>
                </div>
              </div>
            ),
            points: [
              'Human-readable dates',
              'Currency with symbol',
              'Locale-specific separators',
              'Professional appearance',
            ],
          }}
        />

        <div className="code-comparison">
          <pre>
            <code>{`// Bad: Raw display
<span>{date}</span>  // "2026-01-22T14:30:00Z"
<span>{price}</span> // 1234.5

// Good: Use Intl API for formatting
const formattedDate = new Date(date).toLocaleDateString('fi-FI', {
  year: 'numeric', month: 'long', day: 'numeric'
})

const formattedPrice = new Intl.NumberFormat('fi-FI', {
  style: 'currency', currency: 'EUR'
}).format(price)  // "1 234,50 €"`}</code>
          </pre>
        </div>
      </section>

      {/* Example 3: Theme Support */}
      <section className="example-section">
        <h2>3. Theme Support</h2>
        <p className="example-instruction">
          Use the theme toggle in the navbar to switch between light and dark mode.
        </p>

        <div className="theme-demo">
          <div className="theme-indicator">
            Current theme: <strong>{theme}</strong>
          </div>
          <p>
            The entire app respects the theme setting. This is achieved using CSS
            custom properties (variables) that change based on the{' '}
            <code>data-theme</code> attribute.
          </p>
        </div>

        <div className="code-comparison">
          <pre>
            <code>{`:root {
  --bg-primary: #ffffff;
  --text-primary: #1e293b;
}

[data-theme="dark"] {
  --bg-primary: #0f172a;
  --text-primary: #f1f5f9;
}

/* Components use variables */
.card {
  background: var(--bg-primary);
  color: var(--text-primary);
}`}</code>
          </pre>
        </div>
      </section>

      <section className="key-takeaways">
        <h2>Key Takeaways</h2>
        <ul>
          <li>Always show loading states during async operations</li>
          <li>Disable interactive elements while loading</li>
          <li>Use Intl API for locale-aware formatting</li>
          <li>Support light and dark themes with CSS variables</li>
        </ul>
      </section>
    </div>
  )
}
