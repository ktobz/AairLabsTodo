export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
  dueDate: number | null;
}

export type RootStackParamList = {
  TaskList: undefined;
  AddTask: undefined;
};

export interface VoiceRecognitionResult {
  transcript: string;
  isFinal: boolean;
}
