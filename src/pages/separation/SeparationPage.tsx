import './SeparationPage.css'

export default function SeparationPage() {
  return (
    <div className="separation-page">
      <header className="page-header">
        <h1>Separation of Concerns</h1>
        <p className="tagline">
          "Structure your code so each responsibility is clear and isolated."
        </p>
      </header>

      {/* Architecture diagram */}
      <section className="architecture-section">
        <h2>Simple Frontend Structure</h2>
        <div className="architecture-diagram">
          <div className="arch-box component-box">
            <h3>Component</h3>
            <p>Handles input and rendering</p>
            <ul>
              <li>Reads user input</li>
              <li>Manages UI state</li>
              <li>Renders UI based on data</li>
              <li>No business rules</li>
            </ul>
          </div>
          <div className="arch-arrow">→</div>
          <div className="arch-box pure-box">
            <h3>Pure Functions</h3>
            <p>Calculations & decisions</p>
            <ul>
              <li>No side effects</li>
              <li>Same input → same output</li>
              <li>Easy to test</li>
              <li>Contains business logic</li>
            </ul>
          </div>
          <div className="arch-arrow">→</div>
          <div className="arch-box service-box">
            <h3>Service</h3>
            <p>External communication</p>
            <ul>
              <li>API calls</li>
              <li>Data fetching</li>
              <li>Error handling</li>
              <li>No UI logic</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Bad example */}
      <section className="example-section">
        <h2>Bad: Everything in One Component</h2>
        <p className="example-description">
          This component fetches data, validates, calculates, and renders all in one place.
          If something breaks, good luck finding where!
        </p>

        <div className="code-block">
          <div className="code-header bad">BigOrderComponent.tsx - 50+ lines, hard to test</div>
          <pre>
            <code>{`function BigOrderComponent({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState(null)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    // Fetching inside component
    fetch(\`/api/orders/\${orderId}\`)
      .then(res => res.json())
      .then(data => {
        setOrder(data)

        // Business logic mixed with UI
        let sum = 0
        for (const item of data.items) {
          sum += item.price * item.quantity
        }

        // Discount logic in component
        if (data.discountCode === "SAVE10") {
          sum = sum * 0.9
        }

        // Tax logic in component
        if (data.country === "IT") {
          sum = sum * 1.22
        }

        // Formatting in component
        setTotal(Math.round(sum * 100) / 100)
      })
  }, [orderId])

  return <div>Total: {total} €</div>
}`}</code>
          </pre>
        </div>

        <ul className="problems-list">
          <li>Business logic mixed with UI code</li>
          <li>Impossible to test calculation without rendering</li>
          <li>Changing tax rules requires touching UI component</li>
          <li>Hard to reuse calculation logic elsewhere</li>
        </ul>
      </section>

      {/* Good example */}
      <section className="example-section">
        <h2>Good: Separated Concerns</h2>
        <p className="example-description">
          Each file has one job. Easy to test, easy to understand, easy to change.
        </p>

        <div className="code-grid">
          <div className="code-block">
            <div className="code-header good">orderUtils.ts - Pure functions</div>
            <pre>
              <code>{`// Pure functions - easy to test!

type OrderItem = { price: number; quantity: number }

export function calculateSubtotal(items: OrderItem[]) {
  return items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
}

export function applyDiscount(total: number, code?: string) {
  return code === "SAVE10" ? total * 0.9 : total
}

export function applyTax(total: number, country: string) {
  const taxRates: Record<string, number> = {
    IT: 1.22,
    FI: 1.24,
    DE: 1.19,
  }
  return total * (taxRates[country] || 1)
}

export function roundMoney(amount: number) {
  return Math.round(amount * 100) / 100
}`}</code>
            </pre>
          </div>

          <div className="code-block">
            <div className="code-header good">orderService.ts - API calls</div>
            <pre>
              <code>{`// Service - handles external communication

export type Order = {
  items: { price: number; quantity: number }[]
  discountCode?: string
  country: string
}

export async function fetchOrder(id: string): Promise<Order> {
  const response = await fetch(\`/api/orders/\${id}\`)

  if (!response.ok) {
    throw new Error('Failed to fetch order')
  }

  return response.json()
}`}</code>
            </pre>
          </div>

          <div className="code-block">
            <div className="code-header good">OrderDisplay.tsx - Component (UI only)</div>
            <pre>
              <code>{`// Component - just UI, delegates logic

import { useState, useEffect } from 'react'
import { fetchOrder } from './orderService'
import {
  calculateSubtotal,
  applyDiscount,
  applyTax,
  roundMoney
} from './orderUtils'

function OrderDisplay({ orderId }: { orderId: string }) {
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrder(orderId).then(order => {
      const subtotal = calculateSubtotal(order.items)
      const discounted = applyDiscount(subtotal, order.discountCode)
      const withTax = applyTax(discounted, order.country)
      setTotal(roundMoney(withTax))
      setLoading(false)
    })
  }, [orderId])

  if (loading) return <div>Loading...</div>
  return <div>Total: {total} €</div>
}`}</code>
            </pre>
          </div>
        </div>

        <ul className="benefits-list">
          <li>Each function has one responsibility</li>
          <li>Pure functions are trivial to test</li>
          <li>Tax rules can change without touching UI</li>
          <li>Logic can be reused in other components</li>
        </ul>
      </section>

      <section className="key-takeaways">
        <h2>Key Takeaways</h2>
        <ul>
          <li>Components should only handle UI rendering and state</li>
          <li>Business logic belongs in pure functions</li>
          <li>API calls belong in services</li>
          <li>This structure makes testing much easier</li>
        </ul>
      </section>
    </div>
  )
}
