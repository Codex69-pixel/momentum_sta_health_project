import React from 'react';

export default function Avatar({ src, name = 'User', size = 32 }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
  return src ? (
    <img className="avatar" src={src} alt={name} width={size} height={size} />
  ) : (
    <div className="avatar" style={{ width: size, height: size }} aria-label={name}>
      {initials}
    </div>
  );
}
