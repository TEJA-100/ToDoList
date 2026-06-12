import React from 'react';
import PriorityBadge from './PriorityBadge';
import { Calendar, Clock, Eye, Edit2, Trash2, CheckCircle } from 'lucide-react';

export default function TaskCard({ task, onView, onEdit, onDelete, onCompleteToggle }) {
  const { _id, title, description, priority, status, startDate, endDate, startTime, endTime, category, subtasks = [] } = task;

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const totalSubtasks = subtasks.length;
  const completedSubtasks = subtasks.filter((s) => s.completed).length;
  const progressPercent = totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0;

  const getStatusStyle = () => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Upcoming':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col justify-between hover:shadow-md transition-all">
      <div>
        {/* Header: Category and Priority */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
            {category || 'General'}
          </span>
          <div className="flex items-center space-x-2">
            <PriorityBadge priority={priority} />
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getStatusStyle()}`}>
              {status}
            </span>
          </div>
        </div>

        {/* Title and Description */}
        <h4 className="text-lg font-bold text-slate-800 line-clamp-1 mb-1" title={title}>
          {title}
        </h4>
        <p className="text-sm text-slate-500 line-clamp-2 mb-4 h-10">
          {description || 'No description provided.'}
        </p>

        {/* Dates and Timing */}
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 mb-4 border-t border-b border-slate-100 py-3">
          <div className="flex items-center">
            <Calendar className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
            <span className="truncate">{formatDate(startDate)}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
            <span className="truncate">{formatDate(endDate)}</span>
          </div>
          <div className="flex items-center col-span-2 mt-1">
            <Clock className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
            <span>{startTime} - {endTime}</span>
          </div>
        </div>

        {/* Subtask Progress */}
        {totalSubtasks > 0 ? (
          <div className="mb-5">
            <div className="flex justify-between items-center text-xs font-medium text-slate-500 mb-1">
              <span>Subtasks Progress</span>
              <span>{completedSubtasks}/{totalSubtasks} ({progressPercent}%)</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div
                className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        ) : (
          <div className="mb-5 text-xs text-slate-400 italic">No subtasks</div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
        <div className="flex space-x-1">
          <button
            onClick={() => onView(_id)}
            className="p-1.5 text-slate-500 hover:text-primary-600 rounded-md hover:bg-slate-50 transition-colors"
            title="View Details"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={() => onEdit(_id)}
            className="p-1.5 text-slate-500 hover:text-amber-600 rounded-md hover:bg-slate-50 transition-colors"
            title="Edit Task"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(_id)}
            className="p-1.5 text-slate-500 hover:text-red-600 rounded-md hover:bg-slate-50 transition-colors"
            title="Delete Task"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        {status !== 'Completed' && (
          <button
            onClick={() => onCompleteToggle(_id)}
            className="inline-flex items-center px-2.5 py-1.5 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold hover:bg-emerald-100 transition-colors border border-emerald-200"
          >
            <CheckCircle className="h-3.5 w-3.5 mr-1" />
            Complete
          </button>
        )}
      </div>
    </div>
  );
}
