import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Volume2 } from 'lucide-react';

interface Session {
  id: number;
  date: string;
  scoreBefore: number;
  scoreAfter: number;
  difficultyBefore: string;
  difficultyAfter: string;
  original: string;
  simplified: string;
  audioUrl?: string;
}

const sampleData: Session[] = [
  {
    id: 1,
    date: 'Feb 27',
    scoreBefore: 78,
    scoreAfter: 42,
    difficultyBefore: 'High',
    difficultyAfter: 'Moderate',
    original: 'The complex paragraph contained multiple clauses and advanced vocabulary that made comprehension difficult.',
    simplified: 'The paragraph had many clauses and hard words that were hard to understand.',
    audioUrl: undefined,
  },
  {
    id: 2,
    date: 'Feb 26',
    scoreBefore: 65,
    scoreAfter: 35,
    difficultyBefore: 'Moderate',
    difficultyAfter: 'Low',
    original: 'This is another example of a somewhat challenging sentence structure.',
    simplified: 'This is a simpler sentence structure example.',
    audioUrl: undefined,
  },
];

const History: React.FC = () => {
  const [sessions] = useState<Session[]>(sampleData);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const toggle = (id: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="history-root">
      <h2 className="panel-title">History</h2>
      <p className="panel-subtitle">Past simplification sessions.</p>
      <div className="history-list">
        {sessions.map((s) => (
          <div key={s.id} className="history-item">
            <div className="history-summary" onClick={() => toggle(s.id)}>
              <div>
                <strong>Session {s.id}</strong>
                <span className="history-date">{s.date}</span>
              </div>
              <div className="history-metrics">
                <span>Score: {s.scoreBefore} → {s.scoreAfter}</span>
                <span>Difficulty: {s.difficultyBefore} → {s.difficultyAfter}</span>
              </div>
              <div className="history-expand-icon">
                {expanded.has(s.id) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </div>
            {expanded.has(s.id) && (
              <div className="history-details">
                <div className="history-section">
                  <p className="history-label">Original text</p>
                  <p className="history-text">{s.original}</p>
                </div>

                <div className="history-section">
                  <p className="history-label">Simplified version</p>
                  <p className="history-text">{s.simplified}</p>
                </div>

                <div className="history-section">
                  <p className="history-label">Cognitive improvement</p>
                  <p className="history-text">{s.scoreBefore - s.scoreAfter} points</p>
                </div>

                {s.audioUrl && (
                  <button className="history-audio-button">
                    <Volume2 size={18} /> Play audio
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
