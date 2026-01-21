import React, { useRef } from 'react';
import Papa from 'papaparse';

function CSVHandler({
  projectData,
  categories,
  tasks,
  milestones,
  setProjectData,
  setCategories,
  setTasks,
  setMilestones,
  visualSettings,
  setVisualSettings,
}) {
  const fileInputRef = useRef(null);

  const exportToCSV = () => {
    const csvData = [];

    csvData.push(['PROJECT_DATA']);
    csvData.push(['startDate', 'endDate', 'numberOfWeeks']);
    csvData.push([projectData.startDate, projectData.endDate, projectData.numberOfWeeks]);
    csvData.push([]);

    csvData.push(['CATEGORIES']);
    csvData.push(['id', 'name', 'color']);
    categories.forEach(cat => {
      csvData.push([cat.id, cat.name, cat.color]);
    });
    csvData.push([]);

    csvData.push(['TASKS']);
    csvData.push(['id', 'name', 'categoryId', 'startDate', 'durationWeeks', 'color', 'style']);
    tasks.forEach(task => {
      csvData.push([
        task.id,
        task.name,
        task.categoryId,
        task.startDate,
        task.durationWeeks,
        task.color,
        task.style,
      ]);
    });
    csvData.push([]);

    csvData.push(['MILESTONES']);
    csvData.push(['id', 'name', 'date', 'type', 'color']);
    milestones.forEach(milestone => {
      csvData.push([
        milestone.id,
        milestone.name,
        milestone.date,
        milestone.type,
        milestone.color,
      ]);
    });
    csvData.push([]);

    csvData.push(['VISUAL_SETTINGS']);
    csvData.push(['rowHeight', 'fontSize', 'headerHeight', 'monthColumnWidth']);
    csvData.push([
      visualSettings.rowHeight,
      visualSettings.fontSize,
      visualSettings.headerHeight,
      visualSettings.monthColumnWidth,
    ]);

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'project_timeline.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const importFromCSV = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      complete: (results) => {
        const rows = results.data;
        let section = null;

        const newProjectData = { startDate: '', endDate: '', numberOfWeeks: '' };
        const newCategories = [];
        const newTasks = [];
        const newMilestones = [];
        const newVisualSettings = { rowHeight: 80, fontSize: 12, headerHeight: 40, monthColumnWidth: 60 };

        for (let i = 0; i < rows.length; i++) {
          const row = rows[i];

          if (!row || row.length === 0 || row.every(cell => !cell)) continue;

          if (row[0] === 'PROJECT_DATA') {
            section = 'PROJECT_DATA';
            continue;
          } else if (row[0] === 'CATEGORIES') {
            section = 'CATEGORIES';
            continue;
          } else if (row[0] === 'TASKS') {
            section = 'TASKS';
            continue;
          } else if (row[0] === 'MILESTONES') {
            section = 'MILESTONES';
            continue;
          } else if (row[0] === 'VISUAL_SETTINGS') {
            section = 'VISUAL_SETTINGS';
            continue;
          }

          if (row[0] === 'id' || row[0] === 'startDate' || row[0] === 'rowHeight') {
            continue;
          }

          if (section === 'PROJECT_DATA' && row.length >= 3) {
            newProjectData.startDate = row[0] || '';
            newProjectData.endDate = row[1] || '';
            newProjectData.numberOfWeeks = row[2] || '';
          } else if (section === 'CATEGORIES' && row.length >= 3) {
            newCategories.push({
              id: parseInt(row[0]),
              name: row[1],
              color: row[2],
            });
          } else if (section === 'TASKS' && row.length >= 7) {
            newTasks.push({
              id: parseInt(row[0]),
              name: row[1],
              categoryId: parseInt(row[2]),
              startDate: row[3],
              durationWeeks: parseFloat(row[4]),
              color: row[5],
              style: row[6],
            });
          } else if (section === 'MILESTONES' && row.length >= 5) {
            newMilestones.push({
              id: parseInt(row[0]),
              name: row[1],
              date: row[2],
              type: row[3],
              color: row[4],
            });
          } else if (section === 'VISUAL_SETTINGS' && row.length >= 4) {
            newVisualSettings.rowHeight = parseInt(row[0]);
            newVisualSettings.fontSize = parseInt(row[1]);
            newVisualSettings.headerHeight = parseInt(row[2]);
            newVisualSettings.monthColumnWidth = parseInt(row[3]);
          }
        }

        setProjectData(newProjectData);
        setCategories(newCategories);
        setTasks(newTasks);
        setMilestones(newMilestones);
        setVisualSettings(newVisualSettings);
      },
      error: (error) => {
        alert('Error parsing CSV file: ' + error.message);
      },
    });

    event.target.value = '';
  };

  return (
    <div className="form-section">
      <h2>Import/Export</h2>
      <div className="csv-buttons">
        <button onClick={exportToCSV} className="export-btn">
          Export to CSV
        </button>
        <button onClick={() => fileInputRef.current.click()} className="import-btn">
          Import from CSV
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={importFromCSV}
          accept=".csv"
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
}

export default CSVHandler;
