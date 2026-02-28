import React, { useEffect, useState } from 'react';
import ProgressDashboard from '../components/ProgressDashboard';
import { Clock, Star, TrendingUp, BarChart2 } from 'lucide-react';
import { getProgress } from '../services/api';
import type { ProgressResponse } from '../types/apiTypes';

const iconProps = { size: 20, strokeWidth: 1.5 };

interface DashboardProps {
  userId: string;
}

const Dashboard: React.FC<DashboardProps> = ({ userId }) => {
  // Example session scores and preferred level - replace with real API values
  const [sessionScores, setSessionScores] = useState<number[]>([]);
const [preferredLevel, setPreferredLevel] = useState<string>('—');
const [progress, setProgress] = useState<ProgressResponse | null>(null);
const [loading, setLoading] = useState<boolean>(false);
useEffect(() => {
  const fetchProgress = async () => {
    try {
      setLoading(true);
      const data = await getProgress(userId);
      setProgress(data);
      setPreferredLevel(data.preferred_level ?? '—');

      // simple chart data: show last score as a single point
      // (later we can build real history)
      if (typeof data.last_session_score === 'number') {
        setSessionScores([
  data.average_cognitive_score,
  data.last_session_score,
]);
      }
    } catch (err) {
      console.error('Failed to load progress', err);
    } finally {
      setLoading(false);
    }
  };

  if (userId) fetchProgress();
}, [userId]);
  // Define the 3 metrics to display (excluding preferred level)
const dashboardMetrics = [
  {
    label: 'Total sessions',
    value: progress ? String(progress.total_sessions) : '—',
    icon: <Clock {...iconProps} className="metric-icon" />,
  },
  {
    label: 'Average score',
    value: progress ? String(progress.average_cognitive_score) : '—',
    icon: <Star {...iconProps} className="metric-icon" />,
  },
  {
    label: 'Last session score',
    value: progress ? String(progress.last_session_score) : '—',
    icon: <TrendingUp {...iconProps} className="metric-icon" />,
  },
];

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-subtitle">View your progress and analytics</p>
        {loading && <p className="dashboard-subtitle">Loading progress…</p>}
      </div>
      <div className="preferred-level-box">
        <BarChart2 {...iconProps} className="metric-icon" />
        <div className="metric-text">
          <span className="metric-label">Preferred reading level</span>
          <span className="metric-value">{preferredLevel}</span>
        </div>
      </div>
      <ProgressDashboard userId={userId} metrics={dashboardMetrics} sessionScores={sessionScores} />
    </div>
  );
};

export default Dashboard;