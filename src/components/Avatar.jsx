import React from 'react';

function initials(name) {
  if (!name) return '';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function bgColorFromName(name) {
  const colors = ['#fde68a', '#fca5a5', '#bfdbfe', '#c7f9cc', '#fbcfe8', '#fcd34d'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash << 5) - hash + name.charCodeAt(i);
  return colors[Math.abs(hash) % colors.length];
}

export default function Avatar({ name, email, size = 8, useImage = false }) {
  const px = `${size}rem`; // not used for exact tailwind sizing but kept for reference
  const imgUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name || email || '')}&background=0f766e&color=ffffff&rounded=true&size=128`;

  if (useImage && name) {
    return (
      <img src={imgUrl} alt={name} className={`w-8 h-8 rounded-full flex-shrink-0 object-cover`} />
    );
  }

  const bg = bgColorFromName(name || email || 'user');
  return (
    <div style={{ background: bg }} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-slate-900 flex-shrink-0`}>
      {initials(name || email)}
    </div>
  );
}