export interface Theme {
  background: string;
  surface: string;
  surfaceSecondary: string;
  text: string;
  textSecondary: string;
  textTertiary: string;
  textMuted: string;
  primary: string;
  primaryShadow: string;
  danger: string;
  dangerShadow: string;
  success: string;
  border: string;
  searchBackground: string;
  chipActive: string;
  chipInactive: string;
  chipTextActive: string;
  chipTextInactive: string;
  overdue: string;
  dueDate: string;
  headerBackground: string;
  headerShadow: string;
}

export const lightTheme: Theme = {
  background: "#f5f5f7",
  surface: "#ffffff",
  surfaceSecondary: "#f0f0f0",
  text: "#1a1a1a",
  textSecondary: "#666666",
  textTertiary: "#888888",
  textMuted: "#999999",
  primary: "#6c63ff",
  primaryShadow: "#6c63ff",
  danger: "#ff4444",
  dangerShadow: "#ff6b6b",
  success: "#4CAF50",
  border: "#e0e0e0",
  searchBackground: "#f0f0f5",
  chipActive: "#6c63ff",
  chipInactive: "#e8e8ee",
  chipTextActive: "#ffffff",
  chipTextInactive: "#666666",
  overdue: "#ff4444",
  dueDate: "#888888",
  headerBackground: "#ffffff",
  headerShadow: "#000",
};

export const darkTheme: Theme = {
  background: "#121212",
  surface: "#1e1e1e",
  surfaceSecondary: "#2a2a2a",
  text: "#e0e0e0",
  textSecondary: "#aaaaaa",
  textTertiary: "#888888",
  textMuted: "#777777",
  primary: "#8b83ff",
  primaryShadow: "#8b83ff",
  danger: "#ff6b6b",
  dangerShadow: "#ff6b6b",
  success: "#66bb6a",
  border: "#333333",
  searchBackground: "#2a2a2a",
  chipActive: "#8b83ff",
  chipInactive: "#333333",
  chipTextActive: "#ffffff",
  chipTextInactive: "#aaaaaa",
  overdue: "#ff6b6b",
  dueDate: "#888888",
  headerBackground: "#1e1e1e",
  headerShadow: "#000",
};
