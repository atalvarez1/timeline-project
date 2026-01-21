import React, { useState, useRef } from 'react';
import './App.css';
import TimelineCanvas from './components/TimelineCanvas';
import ProjectForm from './components/ProjectForm';
import CategoryManager from './components/CategoryManager';
import TaskManager from './components/TaskManager';
import MilestoneManager from './components/MilestoneManager';
import VisualSettings from './components/VisualSettings';
import CSVHandler from './components/CSVHandler';

function App() {
  const [projectData, setProjectData] = useState({
    startDate: '',
    endDate: '',
    numberOfWeeks: '',
  });

  const [categories, setCategories] = useState([
    { id: 1, name: 'Data Integration', color: '#ADD8E6' },
    { id: 2, name: 'Solution Design', color: '#FFE4B5' },
    { id: 3, name: 'Configuration', color: '#90EE90' },
  ]);

  const [tasks, setTasks] = useState([]);
  const [milestones, setMilestones] = useState([]);

  const [visualSettings, setVisualSettings] = useState({
    rowHeight: 150,
    fontSize: 12,
    headerHeight: 50,
    monthColumnWidth: 60,
  });

  const timelineRef = useRef(null);

  return (
    <div className="App">
      <div className="header">
        <h1>Project Timeline Generator</h1>
      </div>

      <div className="main-container">
        <div className="controls-panel">
          <ProjectForm
            projectData={projectData}
            setProjectData={setProjectData}
          />

          <CategoryManager
            categories={categories}
            setCategories={setCategories}
          />

          <TaskManager
            tasks={tasks}
            setTasks={setTasks}
            categories={categories}
          />

          <MilestoneManager
            milestones={milestones}
            setMilestones={setMilestones}
          />

          <VisualSettings
            visualSettings={visualSettings}
            setVisualSettings={setVisualSettings}
          />

          <CSVHandler
            projectData={projectData}
            categories={categories}
            tasks={tasks}
            milestones={milestones}
            setProjectData={setProjectData}
            setCategories={setCategories}
            setTasks={setTasks}
            setMilestones={setMilestones}
            visualSettings={visualSettings}
            setVisualSettings={setVisualSettings}
          />
        </div>

        <div className="timeline-panel">
          <TimelineCanvas
            ref={timelineRef}
            projectData={projectData}
            categories={categories}
            tasks={tasks}
            milestones={milestones}
            visualSettings={visualSettings}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
