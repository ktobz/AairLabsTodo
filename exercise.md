# AAIR LABS — React Native Developer Exercise

**July, 2026**

## Build a simple To-Do List App in React Native

The app should allow users to:
- Add tasks
- Mark tasks as complete/incomplete
- Delete tasks
- View a list of all tasks
- Persist data locally (e.g., AsyncStorage)

## Requirements

### Core Features

**Task Management**
- Add new tasks (with title and optional description)
- Mark tasks as completed/incomplete
- Delete tasks

**Task Display**
- Show a list of all tasks
- Display completed and incomplete tasks with visual distinction

**Data Persistence**
- Tasks must persist between app launches using AsyncStorage

**Navigation**
- Use React Navigation to switch between two screens:
  - Task List Screen
  - Add Task Screen

**Basic UI/UX**
- Simple, clean layout
- Handle edge cases (e.g., empty task title, no tasks)

### Voice Input via FAB (Floating Action Button)

- Implement a Floating Action Button that activates voice input mode when pressed
- In this mode, the app should listen to the user's speech, transcribe it into text using the OpenAI API or another speech-to-text API, and automatically add the transcribed text as a new task to the to-do list
- The feature should handle multiple dictated tasks in natural language (e.g., "Buy provisions and call mom") by intelligently splitting them into separate tasks

### Bonus (Nice to Have)

- Due dates and sorting by due date
- Search or filter functionality
- Light/Dark theme toggle
- Unit tests for components or functions
- Animations or transitions, TypeScript usage

## Submission Guidelines

- GitHub (or GitLab/Bitbucket) repo with:
  - Complete source code
  - Instructions to run the app (README.md)
  - A `/screenshots` folder containing screenshots of the running app
- Screenshots must cover every screen and key state
- Keep the code modular, readable, and well-commented

## Evaluation Criteria

| Area | Details |
|------|---------|
| Code Quality | Structure, naming, modularity, comments |
| Functionality | App works as expected and handles edge cases |
| UI/UX | Clean layout, good user experience |
| React Native Skills | Components, hooks, state, navigation |
| Persistence | Use of AsyncStorage or other local storage |
| Problem Solving | Logical approach to features and architecture |
| Bonus Features | Extra points for innovation, testing, or design polish |
