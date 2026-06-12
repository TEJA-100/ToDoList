import React, { useState, useEffect } from 'react';
import SubtaskInput from './SubtaskInput';

export default function TaskForm({ initialData, onSubmit, onCancel, isSubmitting = false }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'Pending',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    category: 'General',
    subtasks: []
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        priority: initialData.priority || 'Medium',
        status: initialData.status || 'Pending',
        startDate: initialData.startDate ? new Date(initialData.startDate).toISOString().split('T')[0] : '',
        endDate: initialData.endDate ? new Date(initialData.endDate).toISOString().split('T')[0] : '',
        startTime: initialData.startTime || '',
        endTime: initialData.endTime || '',
        category: initialData.category || 'General',
        subtasks: initialData.subtasks || []
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubtasksChange = (newSubtasks) => {
    setFormData((prev) => ({ ...prev, subtasks: newSubtasks }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    if (!formData.startTime) newErrors.startTime = 'Start time is required';
    if (!formData.endTime) newErrors.endTime = 'End time is required';

    if (formData.startDate && formData.endDate) {
      if (new Date(formData.startDate) > new Date(formData.endDate)) {
        newErrors.endDate = 'End date cannot be before start date';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
      <h3 className="text-xl font-bold text-slate-800">
        {initialData ? 'Update Task' : 'Create New Task'}
      </h3>
      
      {/* Title */}
      <div className="space-y-1">
        <label className="block text-sm font-semibold text-slate-700">Task Title *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g. Design Landing Page"
          className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${
            errors.title 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
              : 'border-slate-300 focus:border-primary-500 focus:ring-primary-500'
          }`}
        />
        {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
      </div>

      {/* Description */}
      <div className="space-y-1">
        <label className="block text-sm font-semibold text-slate-700">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          placeholder="Enter task description here..."
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
      </div>

      {/* Row 1: Priority, Status, Category */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-1">
          <label className="block text-sm font-semibold text-slate-700">Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-semibold text-slate-700">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Upcoming">Upcoming</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-semibold text-slate-700">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g. Work, Personal"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>
      </div>

      {/* Row 2: Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="block text-sm font-semibold text-slate-700">Start Date *</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${
              errors.startDate 
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                : 'border-slate-300 focus:border-primary-500 focus:ring-primary-500'
            }`}
          />
          {errors.startDate && <p className="text-xs text-red-500">{errors.startDate}</p>}
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-semibold text-slate-700">End Date *</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${
              errors.endDate 
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                : 'border-slate-300 focus:border-primary-500 focus:ring-primary-500'
            }`}
          />
          {errors.endDate && <p className="text-xs text-red-500">{errors.endDate}</p>}
        </div>
      </div>

      {/* Row 3: Timings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="block text-sm font-semibold text-slate-700">Start Time *</label>
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${
              errors.startTime 
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                : 'border-slate-300 focus:border-primary-500 focus:ring-primary-500'
            }`}
          />
          {errors.startTime && <p className="text-xs text-red-500">{errors.startTime}</p>}
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-semibold text-slate-700">End Time *</label>
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${
              errors.endTime 
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                : 'border-slate-300 focus:border-primary-500 focus:ring-primary-500'
            }`}
          />
          {errors.endTime && <p className="text-xs text-red-500">{errors.endTime}</p>}
        </div>
      </div>

      {/* Subtasks Component */}
      <SubtaskInput subtasks={formData.subtasks} onChange={handleSubtasksChange} />

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 transition-colors disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Saving...
            </>
          ) : (
            'Save Task'
          )}
        </button>
      </div>
    </form>
  );
}
