import React from 'react';

export default function ProgressBar({ value = 0 }) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className="progress">
      <div className="progress-bar" style={{ width: `${clamped}%` }} />
      <span className="progress-label">{clamped}%</span>
    </div>
  );
}
