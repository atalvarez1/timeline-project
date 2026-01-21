# Project Timeline Generator

A web-based tool for creating professional project timelines with customizable categories, tasks, and milestones. Export your timelines as PNG images or CSV files.

## Features

- **Customizable Categories**: Create swimlanes for different project phases (Plan, Test, Develop, Launch, etc.)
- **Tasks with Multiple Styles**: Add tasks as bars or arrows with custom colors and durations
- **Milestones**: Mark important dates with flag or diamond markers
- **Auto-scaling Timeline**: Automatically generates monthly columns based on project duration
- **Current Date Indicator**: Red vertical line shows today's date on the timeline
- **Visual Customization**: Adjust row heights, font sizes, and column widths
- **CSV Import/Export**: Save and load projects using CSV files
- **PNG Export**: Export timeline as high-quality PNG images (2x scale) for presentations

## Getting Started

### Installation

The project has already been set up with all dependencies installed.

### Running the App

```bash
cd timeline-generator
npm start
```

The app will open in your browser at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

## How to Use

### 1. Set Project Details
- **Start Date**: When your project begins
- **Number of Weeks**: (Optional) Auto-calculates end date based on start date
- **End Date**: When your project ends

### 2. Manage Categories
- Default categories: Plan, Test, Develop, Launch
- Add new categories with custom names and colors
- Edit or delete existing categories
- Each category appears as a horizontal swimlane

### 3. Add Tasks
- **Name**: Task description
- **Category**: Which swimlane the task appears in
- **Start Date**: When the task begins
- **Duration (Weeks)**: How long the task takes (supports decimals like 0.5)
- **Style**: Bar (rectangle) or Arrow (with pointed end)
- **Color**: Custom color for the task

### 4. Add Milestones
- **Name**: Milestone description
- **Date**: When the milestone occurs
- **Type**: Flag or Diamond marker
- **Color**: Custom color for the marker

### 5. Customize Visuals
- **Row Height**: Height of each category row (40-200px)
- **Font Size**: Text size throughout the timeline (8-24px)
- **Header Height**: Height of the month header row (30-100px)
- **Month Column Width**: Minimum width for month labels (40-150px)

### 6. Import/Export

**Export CSV**: Save your entire project configuration to a CSV file

**Import CSV**: Load a previously saved project from CSV

**Export PNG**: Download the timeline as a PNG image for use in presentations

## CSV Format

The CSV export includes all project data in sections:

```
PROJECT_DATA
startDate,endDate,numberOfWeeks
2024-01-01,2024-12-31,52

CATEGORIES
id,name,color
1,Plan,#ADD8E6
2,Test,#FFE4B5

TASKS
id,name,categoryId,startDate,durationWeeks,color,style
1,Planning Phase,1,2024-01-01,4,#4A90E2,bar

MILESTONES
id,name,date,type,color
1,Project Kickoff,2024-01-01,flag,#E74C3C

VISUAL_SETTINGS
rowHeight,fontSize,headerHeight,monthColumnWidth
80,12,40,60
```

## Tips for Google Slides

The exported PNG is optimized for Google Slides:
- High resolution (2x scale) for crisp images
- Standard aspect ratio
- White background
- Copy and paste directly into slides

## Technologies Used

- **React**: UI framework
- **html2canvas**: PNG export functionality
- **PapaParse**: CSV import/export
- **date-fns**: Date manipulation and formatting

## Browser Support

Works in all modern browsers that support ES6+ and HTML5 Canvas.
