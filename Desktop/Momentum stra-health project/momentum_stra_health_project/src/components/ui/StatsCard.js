import React from 'react';

export default function StatsCard({ title, value, helper }) {
  return (
    <div className="stats-card">
      <div className="stats-title">{title}</div>
      <div className="stats-value">{value}</div>
      {helper && <div className="stats-helper">{helper}</div>}
    </div>
  );
}
