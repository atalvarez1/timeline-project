import React, { forwardRef, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { format, eachMonthOfInterval, differenceInDays, startOfMonth } from 'date-fns';

const TimelineCanvas = forwardRef(({
  projectData,
  categories,
  tasks,
  milestones,
  visualSettings,
}, ref) => {
  const timelineRef = useRef(null);

  const exportToPNG = async () => {
    if (!timelineRef.current) return;

    const canvas = await html2canvas(timelineRef.current, {
      backgroundColor: '#ffffff',
      scale: 2,
      logging: false,
    });

    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = 'project-timeline.png';
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    });
  };

  useEffect(() => {
    if (ref) {
      ref.current = { exportToPNG };
    }
  }, [ref]);

  if (!projectData.startDate || !projectData.endDate) {
    return (
      <div className="timeline-placeholder">
        <p>Please set project start and end dates to view the timeline.</p>
      </div>
    );
  }

  const startDate = new Date(projectData.startDate);
  const endDate = new Date(projectData.endDate);
  const today = new Date();

  const months = eachMonthOfInterval({ start: startDate, end: endDate });

  const getPositionForDate = (date) => {
    const totalDays = differenceInDays(endDate, startDate);
    const daysFromStart = differenceInDays(new Date(date), startDate);
    return (daysFromStart / totalDays) * 100;
  };

  const getWidthForDuration = (durationWeeks) => {
    const totalDays = differenceInDays(endDate, startDate);
    const durationDays = durationWeeks * 7;
    return (durationDays / totalDays) * 100;
  };

  const todayPosition = today >= startDate && today <= endDate ? getPositionForDate(today) : null;

  return (
    <div className="timeline-container">
      <div className="export-button-container">
        <button onClick={exportToPNG} className="export-png-btn">
          Export as PNG
        </button>
      </div>

      <div
        ref={timelineRef}
        className="timeline"
        style={{
          fontSize: `${visualSettings.fontSize}px`,
          width: '1280px',
          minHeight: 'auto',
        }}
      >
        <div className="timeline-header" style={{ height: `${visualSettings.headerHeight}px` }}>
          <div className="category-label-column" style={{ width: '150px' }}></div>
          <div className="months-header">
            {months.map((month, index) => {
              const monthStart = startOfMonth(month);
              const monthPosition = getPositionForDate(monthStart);

              return (
                <div
                  key={index}
                  className="month-label"
                  style={{
                    left: `${monthPosition}%`,
                    minWidth: `${visualSettings.monthColumnWidth}px`,
                  }}
                >
                  {format(month, 'MMM yy')}
                </div>
              );
            })}
          </div>
        </div>

        {categories.map((category) => {
          const categoryTasks = tasks.filter((task) => task.categoryId === category.id);

          // Calculate vertical lanes for overlapping tasks
          const tasksWithLanes = categoryTasks.map((task) => {
            const taskStart = getPositionForDate(task.startDate);
            const taskWidth = getWidthForDuration(task.durationWeeks);
            return { ...task, start: taskStart, width: taskWidth, lane: 0 };
          });

          // Sort by start position
          tasksWithLanes.sort((a, b) => a.start - b.start);

          // Assign lanes to avoid overlap
          tasksWithLanes.forEach((task, index) => {
            const taskEnd = task.start + task.width;
            let lane = 0;

            // Check all previous tasks to find the first available lane
            while (true) {
              const hasOverlap = tasksWithLanes.slice(0, index).some((prevTask) => {
                if (prevTask.lane !== lane) return false;
                const prevEnd = prevTask.start + prevTask.width;
                return task.start < prevEnd && taskEnd > prevTask.start;
              });

              if (!hasOverlap) {
                task.lane = lane;
                break;
              }
              lane++;
            }
          });

          const maxLanes = Math.max(1, ...tasksWithLanes.map(t => t.lane + 1));
          const taskHeight = (visualSettings.rowHeight * 0.7) / maxLanes;

          return (
            <div
              key={category.id}
              className="timeline-row"
              style={{
                height: `${visualSettings.rowHeight}px`,
                backgroundColor: category.color,
              }}
            >
              <div className="category-label" style={{ width: '150px' }}>
                {category.name}
              </div>
              <div className="timeline-content">
                {tasksWithLanes.map((task) => {
                  const topPosition = 15 + (task.lane * (taskHeight + 5));

                  if (task.style === 'arrow') {
                    return (
                      <div
                        key={task.id}
                        className="task-arrow"
                        style={{
                          left: `${task.start}%`,
                          width: `${task.width}%`,
                          top: `${topPosition}px`,
                          height: `${taskHeight}px`,
                          backgroundColor: task.color,
                        }}
                      >
                        <div className="arrow-point"></div>
                        <span className="task-label">{task.name}</span>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={task.id}
                        className="task-bar"
                        style={{
                          left: `${task.start}%`,
                          width: `${task.width}%`,
                          top: `${topPosition}px`,
                          height: `${taskHeight}px`,
                          backgroundColor: task.color,
                        }}
                      >
                        <span className="task-label">{task.name}</span>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          );
        })}

        <div className="milestones-layer">
          {milestones.map((milestone) => {
            const milestonePosition = getPositionForDate(milestone.date);

            return (
              <div
                key={milestone.id}
                className={`milestone milestone-${milestone.type}`}
                style={{
                  left: `calc(150px + ${milestonePosition}%)`,
                  color: milestone.color,
                }}
              >
                {milestone.type === 'flag' ? (
                  <svg width="20" height="24" viewBox="0 0 20 24" className="milestone-icon">
                    <line x1="2" y1="0" x2="2" y2="24" stroke={milestone.color} strokeWidth="2" />
                    <path
                      d="M 2 2 L 18 2 L 18 12 L 10 8 L 2 12 Z"
                      fill={milestone.color}
                    />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 20 20" className="milestone-icon">
                    <path
                      d="M 10 0 L 20 10 L 10 20 L 0 10 Z"
                      fill={milestone.color}
                      stroke="#333"
                      strokeWidth="1"
                    />
                  </svg>
                )}
                <div className="milestone-label">{milestone.name}</div>
                <div className="milestone-date">{format(new Date(milestone.date), 'MMM d, yyyy')}</div>
              </div>
            );
          })}
        </div>

        {todayPosition !== null && (
          <div
            className="today-line"
            style={{
              left: `calc(150px + ${todayPosition}%)`,
            }}
          >
            <div className="today-label">Today</div>
          </div>
        )}
      </div>
    </div>
  );
});

TimelineCanvas.displayName = 'TimelineCanvas';

export default TimelineCanvas;
