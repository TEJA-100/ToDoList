import React from 'react';

export default function StatusCard({ title, count, icon: Icon, colorClass = 'primary' }) {
  const borderStyles = {
    primary: 'border-l-4 border-l-blue-500',
    success: 'border-l-4 border-l-emerald-500',
    warning: 'border-l-4 border-l-amber-500',
    info: 'border-l-4 border-l-indigo-500'
  };

  const bgStyles = {
    primary: 'bg-blue-50 text-blue-600',
    success: 'bg-emerald-50 text-emerald-600',
    warning: 'bg-amber-50 text-amber-600',
    info: 'bg-indigo-50 text-indigo-600'
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center justify-between transition-all hover:shadow-md ${borderStyles[colorClass] || borderStyles.primary}`}>
      <div>
        <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{title}</p>
        <h3 className="text-3xl font-bold text-slate-800 mt-1">{count}</h3>
      </div>
      {Icon && (
        <div className={`p-3 rounded-lg ${bgStyles[colorClass] || bgStyles.primary}`}>
          <Icon className="h-6 w-6" />
        </div>
      )}
    </div>
  );
}
