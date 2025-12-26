import React from 'react';

export default function StatCard({ title, value, delta }) {
  return (
    <div className="p-4 card">
      <div className="text-sm text-slate-500">{title}</div>
      <div className="text-2xl font-semibold">{value}</div>
      {typeof delta === 'number' && (
        <div className={`text-sm ${delta >= 0 ? 'text-green-600' : 'text-red-600'}`}>{delta >= 0 ? `+${delta}%` : `${delta}%`}</div>
      )}
    </div>
  );
}
