import ThemeToggle from "./ThemeToggle";
import WeatherDisplay from "./WeatherDisplay";
import { ThemeMode } from "../types";

interface HeaderProps {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  isLoading: boolean;
  weather: string;
  temp: number | null;
}

export default function Header({
  theme,
  setTheme,
  isLoading,
  weather,
  temp,
}: HeaderProps) {
  return (
    <div className="flex justify-between items-center mb-2">
      <h1 className="text-2xl font-bold text-white">MoodMate</h1>
      <div className="flex items-center space-x-4">
        <ThemeToggle theme={theme} setTheme={setTheme} />
        <WeatherDisplay
          isLoading={isLoading}
          weather={weather}
          temp={temp}
          theme={theme}
        />
      </div>
    </div>
  );
}
