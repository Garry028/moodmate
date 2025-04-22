// Types
type View = "input" | "list" | "stats";
type ThemeMode = "light" | "dark";
type Mood = "happy" | "neutral" | "sad" | "angry" | "tired" | null;

interface Entry {
    id: string;
    date: string;
    mood: Mood;
    note: string;
    weather: string;
    temp: number;
  }

export type { View, ThemeMode, Mood ,Entry};