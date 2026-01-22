import { useState } from 'react'
import SplitView from '../../components/SplitView'
import './AccessibilityPage.css'

export default function AccessibilityPage() {
  const [badClickCount, setBadClickCount] = useState(0)
  const [goodClickCount, setGoodClickCount] = useState(0)

  return (
    <div className="accessibility-page">
      <header className="page-header">
        <h1>Accessibility & Semantics</h1>
        <p className="tagline">
          "If it only works with a mouse and perfect vision, it is not finished yet."
        </p>
      </header>

      {/* Screen reader preface */}
      <section className="screen-reader-preface">
        <h2>Learn to Use a Screen Reader</h2>
        <p>
          To truly understand accessibility, you should try using your website with a screen reader.
          It will change how you think about building interfaces.
        </p>
        <div className="screen-readers-list">
          <div className="sr-item">
            <strong>macOS</strong>
            <span>VoiceOver</span>
            <code>Cmd + F5</code>
          </div>
          <div className="sr-item">
            <strong>Windows</strong>
            <span>Narrator</span>
            <code>Win + Ctrl + Enter</code>
          </div>
          <div className="sr-item">
            <strong>Windows</strong>
            <span>NVDA (free)</span>
            <a href="https://www.nvaccess.org/" target="_blank" rel="noopener noreferrer">nvaccess.org</a>
          </div>
          <div className="sr-item">
            <strong>Linux</strong>
            <span>Orca</span>
            <code>Super + Alt + S</code>
          </div>
          <div className="sr-item">
            <strong>iOS</strong>
            <span>VoiceOver</span>
            <span className="hint">Settings → Accessibility</span>
          </div>
          <div className="sr-item">
            <strong>Android</strong>
            <span>TalkBack</span>
            <span className="hint">Settings → Accessibility</span>
          </div>
        </div>
      </section>

      {/* Example 1: Button vs Div */}
      <section className="example-section">
        <h2>1. Buttons: div vs button</h2>
        <p className="example-instruction">
          Try pressing <kbd>Tab</kbd> to focus each element, then press <kbd>Enter</kbd> or <kbd>Space</kbd>.
        </p>

        <SplitView
          bad={{
            title: '<div> with onclick',
            content: (
              <div className="demo-area">
                <div
                  className="fake-button"
                  onClick={() => setBadClickCount((c) => c + 1)}
                >
                  Click me
                </div>
                <p className="click-count">Clicked: {badClickCount}</p>
              </div>
            ),
            points: [
              'Not keyboard focusable',
              'Enter/Space does not work',
              'Screen readers see it as plain text',
              'No built-in disabled state',
            ],
          }}
          good={{
            title: '<button> element',
            content: (
              <div className="demo-area">
                <button
                  className="real-button"
                  onClick={() => setGoodClickCount((c) => c + 1)}
                >
                  Click me
                </button>
                <p className="click-count">Clicked: {goodClickCount}</p>
              </div>
            ),
            points: [
              'Keyboard focusable by default',
              'Enter/Space triggers click',
              'Screen readers announce as button',
              'Built-in disabled attribute',
            ],
          }}
        />

        <div className="code-comparison">
          <pre>
            <code>{`<!-- Bad: div pretending to be a button -->
<div onclick="handleClick()">Click me</div>

<!-- Good: semantic button -->
<button type="button" onClick={handleClick}>
  Click me
</button>`}</code>
          </pre>
        </div>
      </section>

      {/* Example 2: Input types */}
      <section className="example-section">
        <h2>2. Numeric Input: type="number" vs type="text" + inputmode</h2>
        <p className="example-instruction">
          Try scrolling on the inputs, or entering non-numeric values.
        </p>

        <SplitView
          bad={{
            title: 'input type="number"',
            content: (
              <div className="demo-area">
                <label className="input-label">
                  Amount:
                  <input type="number" placeholder="Enter amount" />
                </label>
              </div>
            ),
            points: [
              'Scroll wheel changes value accidentally',
              'Awkward spinner buttons',
              'Scientific notation allowed (1e5)',
              'Leading zeros stripped',
            ],
          }}
          good={{
            title: 'input type="text" + inputmode="numeric"',
            content: (
              <div className="demo-area">
                <label className="input-label">
                  Amount:
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Enter amount"
                  />
                </label>
              </div>
            ),
            points: [
              'No scroll wheel issues',
              'No spinner buttons',
              'Mobile: shows numeric keyboard',
              'Pattern attribute for validation',
              'Can limit the chars allowed at typing time with js'
            ],
          }}
        />

        <div className="code-comparison">
          <pre>
            <code>{`<!-- Bad: type="number" has many UX issues -->
<input type="number" />

<!-- Good: text + inputmode gives numeric keyboard -->
<input
  type="text"
  inputMode="numeric"
  pattern="[0-9]*"
/>`}</code>
          </pre>
        </div>
      </section>

      {/* Example 3: Labels and aria */}
      <section className="example-section">
        <h2>3. Input Instructions: placeholder vs aria-describedby</h2>

        <SplitView
          bad={{
            title: 'Placeholder only',
            content: (
              <div className="demo-area">
                <input
                  type="password"
                  placeholder="8+ chars, 1 uppercase, 1 number"
                  className="password-input"
                />
              </div>
            ),
            points: [
              'Instructions disappear when typing',
              'Low contrast placeholder text',
              'Screen readers may not announce it',
              'User must remember the format',
            ],
          }}
          good={{
            title: 'Label + aria-describedby',
            content: (
              <div className="demo-area">
                <div className="labeled-input">
                  <label htmlFor="password-good">Password</label>
                  <input
                    type="password"
                    id="password-good"
                    aria-describedby="password-hint"
                    className="password-input"
                  />
                  <small id="password-hint">
                    8+ characters, 1 uppercase, 1 number
                  </small>
                </div>
              </div>
            ),
            points: [
              'Instructions always visible',
              'Screen readers announce the hint',
              'Label is clickable to focus',
              'Better for all users',
            ],
          }}
        />

        <div className="code-comparison">
          <pre>
            <code>{`<!-- Bad: placeholder disappears when typing -->
<input placeholder="8+ chars, 1 uppercase, 1 number" />

<!-- Good: aria-describedby keeps hint visible -->
<label for="pw">Password</label>
<input id="pw" aria-describedby="pw-hint" />
<small id="pw-hint">8+ chars, 1 uppercase, 1 number</small>`}</code>
          </pre>
        </div>
      </section>

      <section className="key-takeaways">
        <h2>Key Takeaways</h2>
        <ul>
          <li>Use semantic HTML elements ({`<button>`}, {`<label>`}, {`<nav>`}, {`<table>`})</li>
          <li>Prefer text inputs with inputmode for numbers</li>
          <li>Use aria-describedby for input hints</li>
          <li>Test with keyboard navigation (Tab, Enter, Space)</li>
        </ul>
      </section>
    </div>
  )
}
