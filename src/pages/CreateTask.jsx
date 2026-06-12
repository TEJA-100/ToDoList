import React, { useState } from 'react';
import { taskService } from '../services/api';
import TaskForm from '../components/TaskForm';
import { ArrowLeft } from 'lucide-react';

export default function CreateTask({ setCurrentPage }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await taskService.createTask(formData);
      setCurrentPage({ name: 'dashboard' });
    } catch (err) {
      console.error(err);
      setError('Failed to create task. Please verify your inputs or check connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Back button */}
      <div>
        <button
          onClick={() => setCurrentPage({ name: 'dashboard' })}
          className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          Back to Dashboard
        </button>
      </div>

      {error && (
        <div className="max-w-2xl mx-auto p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Embedded Form */}
      <TaskForm
        onSubmit={handleSubmit}
        onCancel={() => setCurrentPage({ name: 'dashboard' })}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
