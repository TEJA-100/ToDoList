import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AllTasks from './pages/AllTasks';
import CreateTask from './pages/CreateTask';
import TaskDetails from './pages/TaskDetails';
import EditTask from './pages/EditTask';

export default function App() {
  const [currentPage, setCurrentPage] = useState({ name: 'dashboard', params: {} });

  const renderPage = () => {
    switch (currentPage.name) {
      case 'dashboard':
        return <Dashboard setCurrentPage={setCurrentPage} />;
      case 'all-tasks':
        return <AllTasks setCurrentPage={setCurrentPage} />;
      case 'create-task':
        return <CreateTask setCurrentPage={setCurrentPage} />;
      case 'task-details':
        return <TaskDetails taskId={currentPage.params?.id} setCurrentPage={setCurrentPage} />;
      case 'edit-task':
        return <EditTask taskId={currentPage.params?.id} setCurrentPage={setCurrentPage} />;
      default:
        return <Dashboard setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-1 pb-16">
        {renderPage()}
      </main>
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4">
          <p>© {new Date().getFullYear()} TaskFlow - To-Do List Application. Built with React, Tailwind, and Node.</p>
        </div>
      </footer>
    </div>
  );
}
