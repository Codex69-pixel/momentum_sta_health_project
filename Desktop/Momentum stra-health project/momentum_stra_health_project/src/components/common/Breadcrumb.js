import React from 'react';

export default function Breadcrumb({ items = [] }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      {items.map((item, idx) => (
        <span key={idx} className="breadcrumb-item">
          {item.href ? <a href={item.href}>{item.label}</a> : item.label}
          {idx < items.length - 1 && <span className="breadcrumb-sep">/</span>}
        </span>
      ))}
    </nav>
  );
}
