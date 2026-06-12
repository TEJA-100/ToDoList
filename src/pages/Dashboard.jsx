import React, { useEffect, useState } from 'react';
import { taskService } from '../services/api';
import StatusCard from '../components/StatusCard';
import TaskCard from '../components/TaskCard';
import { ListTodo, CheckCircle2, Clock, Calendar, AlertCircle } from 'lucide-react';

export default function Dashboard({ setCurrentPage }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getAllTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.error || err.response?.data?.message || 'Failed to fetch tasks. Please ensure the backend and database are running.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCompleteToggle = async (id) => {
    try {
      const task = tasks.find((t) => t._id === id);
      if (!task) return;
      await taskService.updateTask(id, { ...task, status: 'Completed' });
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert('Failed to update task status.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.deleteTask(id);
        fetchTasks();
      } catch (err) {
        console.error(err);
        alert('Failed to delete task.');
      }
    }
  };

  const completedTasks = tasks.filter((t) => t.status === 'Completed');
  const pendingTasks = tasks.filter((t) => t.status === 'Pending');
  const upcomingTasks = tasks.filter((t) => t.status === 'Upcoming');

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3 text-red-700">
        <AlertCircle className="h-6 w-6 shrink-0" />
        <div>
          <p className="font-bold">Error</p>
          <p className="text-sm">{error}</p>
          <button 
            onClick={fetchTasks} 
            className="mt-2 text-xs font-semibold underline hover:text-red-900"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome & Stats */}
      <div>
        <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Dashboard Overview</h2>
        <p className="text-slate-500 text-sm mt-1">Track your tasks, goals, and daily progress.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCard title="Total Tasks" count={tasks.length} icon={ListTodo} colorClass="primary" />
        <StatusCard title="Completed" count={completedTasks.length} icon={CheckCircle2} colorClass="success" />
        <StatusCard title="Pending" count={pendingTasks.length} icon={Clock} colorClass="warning" />
        <StatusCard title="Upcoming" count={upcomingTasks.length} icon={Calendar} colorClass="info" />
      </div>

      {/* Columns: Completed, Pending, Upcoming */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Pending Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-amber-500" />
              <h3 className="font-bold text-slate-800">Pending Tasks</h3>
            </div>
            <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-0.5 rounded-full">
              {pendingTasks.length}
            </span>
          </div>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            {pendingTasks.length > 0 ? (
              pendingTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onView={(id) => setCurrentPage({ name: 'task-details', params: { id } })}
                  onEdit={(id) => setCurrentPage({ name: 'edit-task', params: { id } })}
                  onDelete={handleDelete}
                  onCompleteToggle={handleCompleteToggle}
                />
              ))
            ) : (
              <p className="text-sm italic text-slate-400 py-4 text-center">No pending tasks.</p>
            )}
          </div>
        </div>

        {/* Upcoming Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-indigo-500" />
              <h3 className="font-bold text-slate-800">Upcoming Tasks</h3>
            </div>
            <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-2 py-0.5 rounded-full">
              {upcomingTasks.length}
            </span>
          </div>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            {upcomingTasks.length > 0 ? (
              upcomingTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onView={(id) => setCurrentPage({ name: 'task-details', params: { id } })}
                  onEdit={(id) => setCurrentPage({ name: 'edit-task', params: { id } })}
                  onDelete={handleDelete}
                  onCompleteToggle={handleCompleteToggle}
                />
              ))
            ) : (
              <p className="text-sm italic text-slate-400 py-4 text-center">No upcoming tasks.</p>
            )}
          </div>
        </div>

        {/* Completed Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              <h3 className="font-bold text-slate-800">Completed Tasks</h3>
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded-full">
              {completedTasks.length}
            </span>
          </div>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            {completedTasks.length > 0 ? (
              completedTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onView={(id) => setCurrentPage({ name: 'task-details', params: { id } })}
                  onEdit={(id) => setCurrentPage({ name: 'edit-task', params: { id } })}
                  onDelete={handleDelete}
                  onCompleteToggle={handleCompleteToggle}
                />
              ))
            ) : (
              <p className="text-sm italic text-slate-400 py-4 text-center">No completed tasks.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
