import React, { useState } from 'react';

function TaskManager({ tasks, setTasks, categories }) {
  const [newTask, setNewTask] = useState({
    name: '',
    categoryId: categories.length > 0 ? categories[0].id : '',
    startDate: '',
    durationWeeks: 1,
    color: '#4A90E2',
    style: 'bar',
  });

  const addTask = () => {
    if (newTask.name.trim() && newTask.startDate && newTask.categoryId) {
      const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
      setTasks([...tasks, { id: newId, ...newTask }]);
      setNewTask({
        name: '',
        categoryId: categories.length > 0 ? categories[0].id : '',
        startDate: '',
        durationWeeks: 1,
        color: '#4A90E2',
        style: 'bar',
      });
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const updateTask = (id, field, value) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, [field]: value } : t
    ));
  };

  return (
    <div className="form-section">
      <h2>Tasks</h2>
      <div className="task-list">
        {tasks.map(task => (
          <div key={task.id} className="task-item">
            <input
              type="text"
              value={task.name}
              onChange={(e) => updateTask(task.id, 'name', e.target.value)}
              placeholder="Task name"
              className="task-name-input"
            />
            <select
              value={task.categoryId}
              onChange={(e) => updateTask(task.id, 'categoryId', parseInt(e.target.value))}
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <input
              type="date"
              value={task.startDate}
              onChange={(e) => updateTask(task.id, 'startDate', e.target.value)}
            />
            <input
              type="number"
              value={task.durationWeeks}
              onChange={(e) => updateTask(task.id, 'durationWeeks', parseFloat(e.target.value))}
              placeholder="Weeks"
              min="0.1"
              step="0.1"
              className="duration-input"
            />
            <select
              value={task.style}
              onChange={(e) => updateTask(task.id, 'style', e.target.value)}
              className="style-select"
            >
              <option value="bar">Bar</option>
              <option value="arrow">Arrow</option>
            </select>
            <input
              type="color"
              value={task.color}
              onChange={(e) => updateTask(task.id, 'color', e.target.value)}
            />
            <button onClick={() => deleteTask(task.id)} className="delete-btn">×</button>
          </div>
        ))}
      </div>
      <div className="add-task">
        <input
          type="text"
          value={newTask.name}
          onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
          placeholder="Task name"
        />
        <select
          value={newTask.categoryId}
          onChange={(e) => setNewTask({ ...newTask, categoryId: parseInt(e.target.value) })}
        >
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        <input
          type="date"
          value={newTask.startDate}
          onChange={(e) => setNewTask({ ...newTask, startDate: e.target.value })}
        />
        <input
          type="number"
          value={newTask.durationWeeks}
          onChange={(e) => setNewTask({ ...newTask, durationWeeks: parseFloat(e.target.value) })}
          placeholder="Weeks"
          min="0.1"
          step="0.1"
        />
        <select
          value={newTask.style}
          onChange={(e) => setNewTask({ ...newTask, style: e.target.value })}
        >
          <option value="bar">Bar</option>
          <option value="arrow">Arrow</option>
        </select>
        <input
          type="color"
          value={newTask.color}
          onChange={(e) => setNewTask({ ...newTask, color: e.target.value })}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
    </div>
  );
}

export default TaskManager;
