import React, { useState } from 'react';

function MilestoneManager({ milestones, setMilestones }) {
  const [newMilestone, setNewMilestone] = useState({
    name: '',
    date: '',
    type: 'flag',
    color: '#E74C3C',
  });

  const addMilestone = () => {
    if (newMilestone.name.trim() && newMilestone.date) {
      const newId = milestones.length > 0 ? Math.max(...milestones.map(m => m.id)) + 1 : 1;
      setMilestones([...milestones, { id: newId, ...newMilestone }]);
      setNewMilestone({
        name: '',
        date: '',
        type: 'flag',
        color: '#E74C3C',
      });
    }
  };

  const deleteMilestone = (id) => {
    setMilestones(milestones.filter(m => m.id !== id));
  };

  const updateMilestone = (id, field, value) => {
    setMilestones(milestones.map(m =>
      m.id === id ? { ...m, [field]: value } : m
    ));
  };

  return (
    <div className="form-section">
      <h2>Milestones</h2>
      <div className="milestone-list">
        {milestones.map(milestone => (
          <div key={milestone.id} className="milestone-item">
            <input
              type="text"
              value={milestone.name}
              onChange={(e) => updateMilestone(milestone.id, 'name', e.target.value)}
              placeholder="Milestone name"
              className="milestone-name-input"
            />
            <input
              type="date"
              value={milestone.date}
              onChange={(e) => updateMilestone(milestone.id, 'date', e.target.value)}
            />
            <select
              value={milestone.type}
              onChange={(e) => updateMilestone(milestone.id, 'type', e.target.value)}
            >
              <option value="flag">Flag</option>
              <option value="diamond">Diamond</option>
            </select>
            <input
              type="color"
              value={milestone.color}
              onChange={(e) => updateMilestone(milestone.id, 'color', e.target.value)}
            />
            <button onClick={() => deleteMilestone(milestone.id)} className="delete-btn">×</button>
          </div>
        ))}
      </div>
      <div className="add-milestone">
        <input
          type="text"
          value={newMilestone.name}
          onChange={(e) => setNewMilestone({ ...newMilestone, name: e.target.value })}
          placeholder="Milestone name"
        />
        <input
          type="date"
          value={newMilestone.date}
          onChange={(e) => setNewMilestone({ ...newMilestone, date: e.target.value })}
        />
        <select
          value={newMilestone.type}
          onChange={(e) => setNewMilestone({ ...newMilestone, type: e.target.value })}
        >
          <option value="flag">Flag</option>
          <option value="diamond">Diamond</option>
        </select>
        <input
          type="color"
          value={newMilestone.color}
          onChange={(e) => setNewMilestone({ ...newMilestone, color: e.target.value })}
        />
        <button onClick={addMilestone}>Add Milestone</button>
      </div>
    </div>
  );
}

export default MilestoneManager;
