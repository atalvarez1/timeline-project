import React from 'react';
import { addWeeks, format } from 'date-fns';

function ProjectForm({ projectData, setProjectData }) {
  const handleStartDateChange = (e) => {
    const startDate = e.target.value;
    const updates = { startDate };

    if (projectData.numberOfWeeks && startDate) {
      const weeks = parseInt(projectData.numberOfWeeks);
      const endDate = addWeeks(new Date(startDate), weeks);
      updates.endDate = format(endDate, 'yyyy-MM-dd');
    }

    setProjectData({ ...projectData, ...updates });
  };

  const handleNumberOfWeeksChange = (e) => {
    const numberOfWeeks = e.target.value;
    const updates = { numberOfWeeks };

    if (projectData.startDate && numberOfWeeks) {
      const weeks = parseInt(numberOfWeeks);
      const endDate = addWeeks(new Date(projectData.startDate), weeks);
      updates.endDate = format(endDate, 'yyyy-MM-dd');
    }

    setProjectData({ ...projectData, ...updates });
  };

  const handleEndDateChange = (e) => {
    setProjectData({ ...projectData, endDate: e.target.value });
  };

  return (
    <div className="form-section">
      <h2>Project Details</h2>
      <div className="form-group">
        <label>Start Date:</label>
        <input
          type="date"
          value={projectData.startDate}
          onChange={handleStartDateChange}
        />
      </div>
      <div className="form-group">
        <label>Number of Weeks:</label>
        <input
          type="number"
          value={projectData.numberOfWeeks}
          onChange={handleNumberOfWeeksChange}
          placeholder="Optional"
        />
      </div>
      <div className="form-group">
        <label>End Date:</label>
        <input
          type="date"
          value={projectData.endDate}
          onChange={handleEndDateChange}
        />
      </div>
    </div>
  );
}

export default ProjectForm;
