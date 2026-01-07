import React from 'react';

export default function Input({ label, id, ...props }) {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;
  return (
    <div className="form-control">
      {label && <label htmlFor={inputId}>{label}</label>}
      <input id={inputId} {...props} />
    </div>
  );
}
