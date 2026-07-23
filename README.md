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

| Screen | Description |
|--------|-------------|
| ![Empty Task List](./screenshots/tasklist-empty.png) | Task List — empty state |
| ![Task List with Tasks](./screenshots/tasklist-with-tasks.png) | Task List — with completed/incomplete tasks |
| ![Add Task](./screenshots/add-task.png) | Add Task screen |
| ![Voice Input](./screenshots/voice-input.png) | Voice Input FAB active / listening |
| ![Voice Result](./screenshots/voice-result.png) | Tasks produced from voice input |

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
