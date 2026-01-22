import SplitView from '../../components/SplitView'
import './TestingPage.css'

export default function TestingPage() {
  return (
    <div className="testing-page">
      <header className="page-header">
        <h1>Testing</h1>
        <p className="tagline">
          "Testing is easier when your code is structured well."
        </p>
      </header>

      {/* Principles */}
      <section className="principles-section">
        <h2>Testing Principles</h2>
        <div className="principles-grid">
          <div className="principle good-practice">
            <h3>Good Practices</h3>
            <ul>
              <li>Prefer testing small, pure functions</li>
              <li>Focus tests on business logic and data parsing</li>
              <li>Test edge cases and invalid inputs</li>
              <li>Keep tests fast and deterministic</li>
            </ul>
          </div>
          <div className="principle bad-practice">
            <h3>Avoid</h3>
            <ul>
              <li>Large tests that require rendering everything</li>
              <li>Heavy mocking of UI and network layers</li>
              <li>Testing implementation details instead of behavior</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Example comparison */}
      <section className="example-section">
        <h2>Example: Testing Order Calculation</h2>
        <p className="example-description">
          Same functionality, two different approaches. Which test would you rather debug?
        </p>

        <SplitView
          bad={{
            title: 'Big function with heavy mocking',
            content: (
              <div className="code-preview">
                <p className="preview-label">If this test fails...</p>
                <p className="preview-question">Where is the bug?</p>
              </div>
            ),
            points: [
              'Mocking global.fetch is brittle',
              'Test covers too many responsibilities',
              'Failure could be anywhere in the chain',
              'Hard to understand what went wrong',
            ],
          }}
          good={{
            title: 'Small functions with focused tests',
            content: (
              <div className="code-preview">
                <p className="preview-label">If this test fails...</p>
                <p className="preview-question good">You know exactly where!</p>
              </div>
            ),
            points: [
              'No mocking required',
              'Each test covers one thing',
              'Failure points to exact function',
              'Easy to fix and maintain',
            ],
          }}
        />
      </section>

      {/* Bad example code */}
      <section className="code-section">
        <h2>Bad: Big Function + Heavy Mocking</h2>

        <div className="code-block">
          <div className="code-header bad">processOrder.ts</div>
          <pre>
            <code>{`// One function that does everything
async function processOrder(orderId: string) {
  const response = await fetch(\`/api/orders/\${orderId}\`)
  const order = await response.json()

  let total = 0
  for (const item of order.items) {
    total += item.price * item.quantity
  }

  if (order.discountCode === "SAVE10") {
    total = total * 0.9
  }

  if (order.country === "IT") {
    total = total * 1.22
  }

  return Math.round(total * 100) / 100
}`}</code>
          </pre>
        </div>

        <div className="code-block">
          <div className="code-header bad">processOrder.test.ts</div>
          <pre>
            <code>{`// Heavy mocking required
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        items: [{ price: 10, quantity: 2 }],
        discountCode: "SAVE10",
        country: "IT",
      }),
  } as any)
)

it("calculates total price", async () => {
  const total = await processOrder("123")
  expect(total).toBe(21.96)  // If this fails, where's the bug?
})`}</code>
          </pre>
        </div>
      </section>

      {/* Good example code */}
      <section className="code-section">
        <h2>Good: Small Functions + Simple Tests</h2>

        <div className="code-block">
          <div className="code-header good">orderFunctions.ts</div>
          <pre>
            <code>{`// Small, focused, pure functions
type Order = {
  items: { price: number; quantity: number }[]
  discountCode?: string
  country: string
}

export function calculateSubtotal(items: Order["items"]) {
  return items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
}

export function applyDiscount(total: number, code?: string) {
  return code === "SAVE10" ? total * 0.9 : total
}

export function applyTax(total: number, country: string) {
  if (country === "IT") return total * 1.22
  return total
}

export function roundMoney(amount: number) {
  return Math.round(amount * 100) / 100
}`}</code>
          </pre>
        </div>

        <div className="code-block">
          <div className="code-header good">orderFunctions.test.ts</div>
          <pre>
            <code>{`// Clean, focused tests - no mocking needed!

it("applies Italian tax", () => {
  expect(applyTax(10, "IT")).toBe(12.2)
})

it("applies discount", () => {
  expect(applyDiscount(100, "SAVE10")).toBe(90)
})

it("calculates subtotal", () => {
  expect(
    calculateSubtotal([{ price: 5, quantity: 2 }])
  ).toBe(10)
})

it("rounds money correctly", () => {
  expect(roundMoney(12.345)).toBe(12.35)
})`}</code>
          </pre>
        </div>
      </section>

      {/* Why it matters */}
      <section className="why-section">
        <h2>Why This Matters</h2>
        <div className="why-grid">
          <div className="why-card">
            <h3>Confidence to Refactor</h3>
            <p>
              When tests are clear and focused, you can change code without fear.
              If something breaks, you'll know immediately.
            </p>
          </div>
          <div className="why-card">
            <h3>Easier Debugging</h3>
            <p>
              A failing test for <code>applyTax</code> tells you exactly where the problem is.
              No digging through mocked data.
            </p>
          </div>
          <div className="why-card">
            <h3>Interview Signal</h3>
            <p>
              Interviewers care more about <em>what</em> you test than the testing library.
              Testing business logic shows good judgment.
            </p>
          </div>
        </div>
      </section>

      <section className="key-takeaways">
        <h2>Key Takeaways</h2>
        <ul>
          <li>Structure code so the important parts are easy to test</li>
          <li>Pure functions are trivial to test - no mocking needed</li>
          <li>When a test fails, it should point to the exact problem</li>
          <li>Focus testing effort on business logic, not UI</li>
        </ul>
      </section>
    </div>
  )
}
