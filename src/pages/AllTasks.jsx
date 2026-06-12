import React, { useEffect, useState } from 'react';
import { taskService } from '../services/api';
import TaskCard from '../components/TaskCard';
import { Search, SlidersHorizontal, AlertCircle, Plus } from 'lucide-react';

export default function AllTasks({ setCurrentPage }) {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter & Search states
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getAllTasks();
      setTasks(data);
      setFilteredTasks(data);
      setError(null);
    } catch (err) {
      console.error(err);
      let msg = err.response?.data?.error || err.response?.data?.message || 'Failed to fetch tasks. Please make sure the server is online.';
      if (typeof msg === 'object') {
        msg = msg.message || JSON.stringify(msg);
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Filter effect
  useEffect(() => {
    let result = tasks;

    // Search filter
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(term) ||
          (t.description && t.description.toLowerCase().includes(term)) ||
          (t.category && t.category.toLowerCase().includes(term))
      );
    }

    // Priority filter
    if (priorityFilter !== 'All') {
      result = result.filter((t) => t.priority === priorityFilter);
    }

    // Status filter
    if (statusFilter !== 'All') {
      result = result.filter((t) => t.status === statusFilter);
    }

    // Category filter
    if (categoryFilter !== 'All') {
      result = result.filter((t) => t.category === categoryFilter);
    }

    setFilteredTasks(result);
  }, [searchTerm, priorityFilter, statusFilter, categoryFilter, tasks]);

  const handleCompleteToggle = async (id) => {
    try {
      const task = tasks.find((t) => t._id === id);
      if (!task) return;
      await taskService.updateTask(id, { ...task, status: 'Completed' });
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert('Failed to update task.');
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

  // Get unique categories for filter options
  const categories = ['All', ...new Set(tasks.map((t) => t.category).filter(Boolean))];

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
          <button onClick={fetchTasks} className="mt-2 text-xs font-semibold underline hover:text-red-900">
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">All Tasks</h2>
          <p className="text-slate-500 text-sm mt-1">Manage, search, and organize all tasks.</p>
        </div>
        <button
          onClick={() => setCurrentPage({ name: 'create-task' })}
          className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 transition-colors shadow-sm"
        >
          <Plus className="h-4 w-4 mr-1.5" />
          Create Task
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center space-x-2 text-slate-700 font-semibold text-sm">
          <SlidersHorizontal className="h-4 w-4 text-slate-500" />
          <span>Filters & Search</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>

          {/* Priority filter */}
          <div>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full py-2 px-3 border border-slate-300 rounded-lg text-sm bg-white focus:border-primary-500 focus:outline-none"
            >
              <option value="All">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>

          {/* Status filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full py-2 px-3 border border-slate-300 rounded-lg text-sm bg-white focus:border-primary-500 focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Upcoming">Upcoming</option>
            </select>
          </div>

          {/* Category filter */}
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full py-2 px-3 border border-slate-300 rounded-lg text-sm bg-white focus:border-primary-500 focus:outline-none"
            >
              <option value="All">All Categories</option>
              {categories.slice(1).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Task Cards Grid */}
      {filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onView={(id) => setCurrentPage({ name: 'task-details', params: { id } })}
              onEdit={(id) => setCurrentPage({ name: 'edit-task', params: { id } })}
              onDelete={handleDelete}
              onCompleteToggle={handleCompleteToggle}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
          <p className="text-slate-500 text-sm">No tasks matched your search or filters.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setPriorityFilter('All');
              setStatusFilter('All');
              setCategoryFilter('All');
            }}
            className="mt-3 text-xs font-semibold text-primary-600 hover:text-primary-800"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
