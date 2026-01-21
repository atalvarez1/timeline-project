import React from 'react';

function VisualSettings({ visualSettings, setVisualSettings }) {
  const handleChange = (field, value) => {
    setVisualSettings({ ...visualSettings, [field]: value });
  };

  return (
    <div className="form-section">
      <h2>Visual Settings</h2>
      <div className="form-group">
        <label>Row Height (px):</label>
        <input
          type="number"
          value={visualSettings.rowHeight}
          onChange={(e) => handleChange('rowHeight', parseInt(e.target.value))}
          min="40"
          max="200"
        />
      </div>
      <div className="form-group">
        <label>Font Size (px):</label>
        <input
          type="number"
          value={visualSettings.fontSize}
          onChange={(e) => handleChange('fontSize', parseInt(e.target.value))}
          min="8"
          max="24"
        />
      </div>
      <div className="form-group">
        <label>Header Height (px):</label>
        <input
          type="number"
          value={visualSettings.headerHeight}
          onChange={(e) => handleChange('headerHeight', parseInt(e.target.value))}
          min="30"
          max="100"
        />
      </div>
      <div className="form-group">
        <label>Month Column Width (px):</label>
        <input
          type="number"
          value={visualSettings.monthColumnWidth}
          onChange={(e) => handleChange('monthColumnWidth', parseInt(e.target.value))}
          min="40"
          max="150"
        />
      </div>
    </div>
  );
}

export default VisualSettings;
