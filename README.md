# AairLabs Todo

A React Native (Expo) To-Do List app built for the AAIR LABS developer exercise.

## Features

- **Task Management** — Add, complete, and delete tasks with title and optional description
- **Data Persistence** — Tasks survive app restarts via AsyncStorage
- **Voice Input** — Floating Action Button (FAB) activates speech-to-text to add tasks by voice
- **Smart Task Splitting** — Natural language phrases like "Buy groceries and call mom" are split into separate tasks
- **Two Screens** — Task List and Add Task, with React Navigation
- **Edge Case Handling** — Empty title validation, empty state display, delete confirmation

## Tech Stack

- React Native (Expo SDK 57)
- TypeScript
- React Navigation (native stack)
- AsyncStorage
- Web Speech Recognition API (free, device-level STT)

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

![Screenshot 1](./screenshots/Screenshot%202026-07-23%20062436.png)

![Screenshot 2](./screenshots/Screenshot%202026-07-23%20062447.png)

![Screenshot 3](./screenshots/Screenshot%202026-07-23%20062506.png)

![Screenshot 4](./screenshots/Screenshot%202026-07-23%20062518.png)

![Screenshot 5](./screenshots/Screenshot%202026-07-23%20062826.png)

![Screenshot 6](./screenshots/Screenshot%202026-07-23%20062837.png)

![Screenshot 7](./screenshots/Screenshot%202026-07-23%20062912.png)

![Screenshot 8](./screenshots/Screenshot%202026-07-23%20063130.png)

![Screenshot 9](./screenshots/Screenshot%202026-07-23%20063218.png)

## Project Structure

```
src/
  components/    — Reusable UI components
  context/       — React Context for task state
  hooks/         — Custom hooks (useTasks, useVoiceInput)
  screens/       — Screen-level components
  types/         — TypeScript interfaces
  utils/         — Helpers (storage, task splitting)
```
