import React from 'react';

// SimpleTable supports optional column.render(row) for custom cells.
export default function SimpleTable({ columns, rows }) {
  return (
    <div className="overflow-auto card">
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.header} className="px-3 py-2 text-left border-b">{c.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="odd:bg-slate-50 align-top">
              {columns.map((c, idx) => (
                <td key={c.accessor || `${c.header}-${idx}`} className="px-3 py-2 border-b align-top">
                  {c.render ? c.render(r) : r[c.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
