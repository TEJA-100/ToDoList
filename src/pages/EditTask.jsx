import React, { useEffect, useState } from 'react';
import { taskService } from '../services/api';
import TaskForm from '../components/TaskForm';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export default function EditTask({ taskId, setCurrentPage }) {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        const data = await taskService.getTaskById(taskId);
        setTask(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch task details for editing.');
      } finally {
        setLoading(false);
      }
    };

    if (taskId) {
      fetchTask();
    }
  }, [taskId]);

  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await taskService.updateTask(taskId, formData);
      setCurrentPage({ name: 'task-details', params: { id: taskId } });
    } catch (err) {
      console.error(err);
      setError('Failed to update task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Back button */}
      <div>
        <button
          onClick={() => setCurrentPage({ name: 'task-details', params: { id: taskId } })}
          className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          Back to Details
        </button>
      </div>

      {error && (
        <div className="max-w-2xl mx-auto p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Embedded Form with initial data */}
      {task && (
        <TaskForm
          initialData={task}
          onSubmit={handleSubmit}
          onCancel={() => setCurrentPage({ name: 'task-details', params: { id: taskId } })}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}
