import type { ReactNode } from 'react'
import './SplitView.css'

type SplitViewProps = {
  bad: {
    title?: string
    content: ReactNode
    points: string[]
  }
  good: {
    title?: string
    content: ReactNode
    points: string[]
  }
}

export default function SplitView({ bad, good }: SplitViewProps) {
  return (
    <div className="split-view">
      <div className="split-panel bad-panel">
        <div className="panel-header bad">
          <span className="panel-label">Bad</span>
          {bad.title && <span className="panel-title">{bad.title}</span>}
        </div>
        <div className="panel-content">
          {bad.content}
        </div>
        <ul className="panel-points">
          {bad.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>

      <div className="split-panel good-panel">
        <div className="panel-header good">
          <span className="panel-label">Good</span>
          {good.title && <span className="panel-title">{good.title}</span>}
        </div>
        <div className="panel-content">
          {good.content}
        </div>
        <ul className="panel-points">
          {good.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
