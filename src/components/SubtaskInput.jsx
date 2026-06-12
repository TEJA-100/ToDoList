import React, { useState } from 'react';
import { Plus, Trash, CheckCircle2, Circle } from 'lucide-react';

export default function SubtaskInput({ subtasks = [], onChange }) {
  const [newSubtask, setNewSubtask] = useState('');

  const handleAddSubtask = (e) => {
    e.preventDefault();
    if (!newSubtask.trim()) return;
    
    const updatedSubtasks = [
      ...subtasks,
      { title: newSubtask.trim(), completed: false }
    ];
    onChange(updatedSubtasks);
    setNewSubtask('');
  };

  const handleDeleteSubtask = (indexToDelete) => {
    const updatedSubtasks = subtasks.filter((_, index) => index !== indexToDelete);
    onChange(updatedSubtasks);
  };

  const handleToggleSubtask = (indexToToggle) => {
    const updatedSubtasks = subtasks.map((subtask, index) => {
      if (index === indexToToggle) {
        return { ...subtask, completed: !subtask.completed };
      }
      return subtask;
    });
    onChange(updatedSubtasks);
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold text-slate-700">Subtasks</label>
      
      {/* Input box */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newSubtask}
          onChange={(e) => setNewSubtask(e.target.value)}
          placeholder="e.g. Design mockups"
          className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddSubtask(e);
            }
          }}
        />
        <button
          type="button"
          onClick={handleAddSubtask}
          className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add
        </button>
      </div>

      {/* Subtask list */}
      {subtasks.length > 0 ? (
        <ul className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
          {subtasks.map((subtask, index) => (
            <li key={index} className="flex items-center justify-between px-4 py-3 hover:bg-white transition-colors">
              <button
                type="button"
                onClick={() => handleToggleSubtask(index)}
                className="flex items-center text-left space-x-3 text-sm flex-1 text-slate-700"
              >
                {subtask.completed ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                ) : (
                  <Circle className="h-4 w-4 text-slate-400 shrink-0" />
                )}
                <span className={subtask.completed ? 'line-through text-slate-400 font-medium' : 'text-slate-700 font-medium'}>
                  {subtask.title}
                </span>
              </button>
              <button
                type="button"
                onClick={() => handleDeleteSubtask(index)}
                className="text-slate-400 hover:text-red-500 p-1.5 rounded-md hover:bg-red-50 transition-all"
                title="Delete subtask"
              >
                <Trash className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm italic text-slate-400">No subtasks added yet.</p>
      )}
    </div>
  );
}
