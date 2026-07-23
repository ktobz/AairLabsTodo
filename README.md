# AairLabs Todo

A React Native (Expo) To-Do List app built for the AAIR LABS developer exercise.

## Features

- **Task Management** — Add, complete, and delete tasks with title and optional description
- **Data Persistence** — Tasks survive app restarts via AsyncStorage
- **Voice Input** — Floating Action Button (FAB) activates speech-to-text to add tasks by voice
- **Smart Task Splitting** — Natural language phrases like "Buy groceries and call mom" are split into separate tasks
- **Two Screens** — Task List and Add Task, with React Navigation
- **Edge Case Handling** — Empty title validation, empty state display, delete confirmation
- **Dark/Light Theme** — Toggle between dark and light mode, persisted locally
- **Due Dates** — Assign due dates (Today, Tomorrow, Next Week) with overdue indicators
- **Search & Filter** — Real-time search and All/Active/Completed filter chips
- **Sort** — Sort tasks by creation date or due date
- **TypeScript** — Fully typed codebase

## Tech Stack

- React Native (Expo SDK 57)
- TypeScript
- React Navigation (native stack)
- AsyncStorage
- expo-speech-recognition (free, device-level STT)

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI
- iOS Simulator / Android Emulator / Physical device with Expo Go

### Installation

```bash
cd AairLabsTodo
npm install
```

### Running the App

```bash
npx expo start
```

Scan the QR code with Expo Go (iOS/Android) or press `a` for Android emulator / `i` for iOS simulator.

## Screenshots

![Task List Screen — Dark and Light theme with search bar](./screenshots/dark%20screen%20and%20light%20screen%20with%20a%20search%20bar.jpg)

![Task Screen — Empty state](./screenshots/task%20screen%20with%20an%20empty%20state.png)

![Task List — with completed and uncompleted tasks](./screenshots/task%20list%20with%20completed%20and%20uncompleted%20task.png)

![Task Screen](./screenshots/task%20screen.jpg)

![Voice Input — FAB active / listening](./screenshots/voice%20input.png)

![Voice Input — with tasks produced](./screenshots/voice%20input%20with%20task.png)

## Project Structure

```
src/
  components/    — Reusable UI components
  context/       — React Context for task state and theme
  hooks/         — Custom hooks (useTasks, useVoiceInput)
  screens/       — Screen-level components
  types/         — TypeScript interfaces
  utils/         — Helpers (storage, theme, task splitting)
```
