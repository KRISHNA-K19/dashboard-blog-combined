import React from 'react';

export function Skeleton({ className = 'h-4 w-full', rounded = true }) {
  return (
    <div
      role="status"
      aria-busy="true"
      className={`bg-slate-200 dark:bg-slate-700 animate-pulse ${rounded ? 'rounded-md' : ''} ${className}`}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="p-4 card">
      <div className="flex items-center gap-4">
        <Skeleton className="w-28 h-16" rounded={true} />
        <div className="flex-1">
          <Skeleton className="h-5 w-3/4 mb-2" />
          <Skeleton className="h-3 w-full" />
        </div>
      </div>
    </div>
  );
}