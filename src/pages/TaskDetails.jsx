import React, { useEffect, useState } from 'react';
import { taskService } from '../services/api';
import PriorityBadge from '../components/PriorityBadge';
import { ArrowLeft, Calendar, Clock, Edit, Trash2, CheckCircle2, Circle, CheckSquare, AlertCircle } from 'lucide-react';

export default function TaskDetails({ taskId, setCurrentPage }) {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  const fetchTask = async () => {
    try {
      setLoading(true);
      const data = await taskService.getTaskById(taskId);
      setTask(data);
      setError(null);
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.error || err.response?.data?.message || 'Failed to retrieve task details.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (taskId) {
      fetchTask();
    }
  }, [taskId]);

  const handleStatusChange = async (newStatus) => {
    try {
      setUpdating(true);
      const updated = await taskService.updateTask(taskId, { ...task, status: newStatus });
      setTask(updated);
    } catch (err) {
      console.error(err);
      alert('Failed to update status.');
    } finally {
      setUpdating(false);
    }
  };

  const handleSubtaskToggle = async (indexToToggle) => {
    try {
      const updatedSubtasks = task.subtasks.map((sub, idx) => {
        if (idx === indexToToggle) {
          return { ...sub, completed: !sub.completed };
        }
        return sub;
      });

      const updated = await taskService.updateTask(taskId, { ...task, subtasks: updatedSubtasks });
      setTask(updated);
    } catch (err) {
      console.error(err);
      alert('Failed to update subtask.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.deleteTask(taskId);
        setCurrentPage({ name: 'dashboard' });
      } catch (err) {
        console.error(err);
        alert('Failed to delete task.');
      }
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3 text-red-700">
        <AlertCircle className="h-6 w-6 shrink-0" />
        <div>
          <p className="font-bold">Error</p>
          <p className="text-sm">{error || 'Task not found.'}</p>
          <button onClick={() => setCurrentPage({ name: 'dashboard' })} className="mt-2 text-xs font-semibold underline hover:text-red-900">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const completedSubtasks = task.subtasks.filter((s) => s.completed).length;
  const totalSubtasks = task.subtasks.length;
  const progressPercent = totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Back Button */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrentPage({ name: 'dashboard' })}
          className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          Back to Dashboard
        </button>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage({ name: 'edit-task', params: { id: taskId } })}
            className="inline-flex items-center px-3 py-1.5 border border-slate-300 rounded-lg text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors"
          >
            <Edit className="h-4 w-4 mr-1.5 text-slate-500" />
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="inline-flex items-center px-3 py-1.5 border border-red-200 rounded-lg text-sm font-semibold text-red-700 bg-red-50 hover:bg-red-100 transition-colors"
          >
            <Trash2 className="h-4 w-4 mr-1.5" />
            Delete
          </button>
        </div>
      </div>

      {/* Main Details Panel */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Status Header */}
        <div className="bg-slate-50 border-b border-slate-100 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider bg-slate-200 px-2 py-0.5 rounded">
              {task.category || 'General'}
            </span>
            <PriorityBadge priority={task.priority} />
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-slate-500">Status:</span>
            <select
              value={task.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              disabled={updating}
              className="rounded-lg border border-slate-300 px-2.5 py-1 text-sm bg-white focus:border-primary-500 focus:outline-none disabled:opacity-50 font-semibold text-slate-700"
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Upcoming">Upcoming</option>
            </select>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
              {task.title}
            </h1>
            <p className="mt-4 text-slate-600 leading-relaxed whitespace-pre-wrap">
              {task.description || 'No description provided.'}
            </p>
          </div>

          {/* Date & Time Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-b border-slate-100 py-6">
            <div className="flex items-start space-x-3">
              <Calendar className="h-5 w-5 text-slate-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Date Duration</p>
                <p className="text-sm font-semibold text-slate-700 mt-1">
                  Start: {formatDate(task.startDate)}
                </p>
                <p className="text-sm font-semibold text-slate-700 mt-0.5">
                  End: {formatDate(task.endDate)}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-slate-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Time Duration</p>
                <p className="text-sm font-semibold text-slate-700 mt-1">
                  {task.startTime} - {task.endTime}
                </p>
              </div>
            </div>
          </div>

          {/* Subtasks checklist */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center">
              <CheckSquare className="h-5 w-5 text-primary-600 mr-2" />
              Subtasks Checklist
            </h3>

            {totalSubtasks > 0 ? (
              <div className="space-y-4">
                {/* Progress bar */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="flex justify-between items-center text-sm font-medium text-slate-600 mb-2">
                    <span>Overall Progress</span>
                    <span>{completedSubtasks} of {totalSubtasks} completed ({progressPercent}%)</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5">
                    <div
                      className="bg-primary-500 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                </div>

                {/* Subtask list */}
                <ul className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                  {task.subtasks.map((sub, index) => (
                    <li key={sub._id || index} className="flex items-center px-4 py-3.5 hover:bg-white transition-colors">
                      <button
                        onClick={() => handleSubtaskToggle(index)}
                        className="flex items-center text-left space-x-3 text-sm flex-1 text-slate-700"
                      >
                        {sub.completed ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                        ) : (
                          <Circle className="h-5 w-5 text-slate-400 shrink-0" />
                        )}
                        <span className={sub.completed ? 'line-through text-slate-400 font-medium' : 'text-slate-700 font-semibold'}>
                          {sub.title}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-sm italic text-slate-400 pl-7">No subtasks defined for this task.</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
