import React, { useState } from 'react';

export default function Tabs({ tabs = [], initial = 0, onChange }) {
  const [active, setActive] = useState(initial);

  const handleChange = (idx) => {
    setActive(idx);
    onChange?.(idx);
  };

  const Active = tabs[active]?.content || null;

  return (
    <div className="tabs">
      <div className="tab-list">
        {tabs.map((t, idx) => (
          <button key={t.id || idx} className={`tab ${idx === active ? 'active' : ''}`} onClick={() => handleChange(idx)}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="tab-panel">{typeof Active === 'function' ? <Active /> : Active}</div>
    </div>
  );
}
