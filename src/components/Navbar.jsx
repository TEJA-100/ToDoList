import React from 'react';
import { CheckSquare, LayoutDashboard, ListTodo, PlusCircle } from 'lucide-react';

export default function Navbar({ currentPage, setCurrentPage }) {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <div 
              className="flex items-center space-x-2 cursor-pointer" 
              onClick={() => setCurrentPage({ name: 'dashboard' })}
            >
              <CheckSquare className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold tracking-tight text-slate-800">
                Task<span className="text-primary-600">Flow</span>
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden sm:ml-8 sm:flex sm:space-x-4">
              <button
                onClick={() => setCurrentPage({ name: 'dashboard' })}
                className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  currentPage.name === 'dashboard'
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Dashboard
              </button>

              <button
                onClick={() => setCurrentPage({ name: 'all-tasks' })}
                className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  currentPage.name === 'all-tasks'
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <ListTodo className="h-4 w-4 mr-2" />
                All Tasks
              </button>

              <button
                onClick={() => setCurrentPage({ name: 'create-task' })}
                className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  currentPage.name === 'create-task'
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Create Task
              </button>
            </div>
          </div>

          {/* Mobile Navigation Links */}
          <div className="flex items-center sm:hidden space-x-1">
            <button
              onClick={() => setCurrentPage({ name: 'dashboard' })}
              className={`p-2 rounded-md ${
                currentPage.name === 'dashboard' ? 'text-primary-600' : 'text-slate-500'
              }`}
              title="Dashboard"
            >
              <LayoutDashboard className="h-5 w-5" />
            </button>
            <button
              onClick={() => setCurrentPage({ name: 'all-tasks' })}
              className={`p-2 rounded-md ${
                currentPage.name === 'all-tasks' ? 'text-primary-600' : 'text-slate-500'
              }`}
              title="All Tasks"
            >
              <ListTodo className="h-5 w-5" />
            </button>
            <button
              onClick={() => setCurrentPage({ name: 'create-task' })}
              className={`p-2 rounded-md ${
                currentPage.name === 'create-task' ? 'text-primary-600' : 'text-slate-500'
              }`}
              title="Create Task"
            >
              <PlusCircle className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
