// Mock in-memory database for local development
let tasks = [
  {
    _id: '1',
    title: 'Sample Task 1',
    description: 'This is a sample task',
    priority: 'High',
    status: 'Pending',
    category: 'Work',
    startDate: new Date('2026-06-12'),
    endDate: new Date('2026-06-15'),
    startTime: '09:00',
    endTime: '17:00',
    subtasks: [],
    createdAt: new Date()
  },
  {
    _id: '2',
    title: 'Completed Task',
    description: 'This task is completed',
    priority: 'Medium',
    status: 'Completed',
    category: 'Personal',
    startDate: new Date('2026-06-10'),
    endDate: new Date('2026-06-12'),
    startTime: '10:00',
    endTime: '16:00',
    subtasks: [],
    createdAt: new Date('2026-06-10')
  },
  {
    _id: '3',
    title: 'Upcoming Task',
    description: 'This task is upcoming',
    priority: 'Low',
    status: 'Upcoming',
    category: 'Work',
    startDate: new Date('2026-06-20'),
    endDate: new Date('2026-06-25'),
    startTime: '09:00',
    endTime: '17:00',
    subtasks: [],
    createdAt: new Date()
  }
];

let taskIdCounter = 4;

const mockDb = {
  findAll: async () => {
    return JSON.parse(JSON.stringify(tasks));
  },

  findById: async (id) => {
    const task = tasks.find(t => t._id === id);
    return task ? JSON.parse(JSON.stringify(task)) : null;
  },

  findByStatus: async (status) => {
    return JSON.parse(JSON.stringify(tasks.filter(t => t.status === status)));
  },

  create: async (taskData) => {
    const newTask = {
      _id: String(taskIdCounter++),
      ...taskData,
      createdAt: new Date()
    };
    tasks.push(newTask);
    return JSON.parse(JSON.stringify(newTask));
  },

  updateById: async (id, taskData) => {
    const index = tasks.findIndex(t => t._id === id);
    if (index === -1) return null;
    tasks[index] = { ...tasks[index], ...taskData };
    return JSON.parse(JSON.stringify(tasks[index]));
  },

  deleteById: async (id) => {
    const index = tasks.findIndex(t => t._id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
  }
};

module.exports = mockDb;
