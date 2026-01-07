import React from 'react';

const COLORS = {
  success: 'green',
  warning: 'orange',
  error: 'red',
  info: 'blue',
  neutral: 'gray'
};

export default function StatusBadge({ status = 'neutral', children }) {
  return (
    <span className={`status-badge status-${status}`} style={{ backgroundColor: COLORS[status] || COLORS.neutral }}>
      {children || status}
    </span>
  );
}
