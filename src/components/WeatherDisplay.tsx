import { ThemeMode } from "../types";
import getWeatherIcon from "../utils/getWheatherIcon";

interface WeatherDisplayProps {
  isLoading: boolean;
  weather: string;
  temp: number | null;
  theme: ThemeMode;
}

export default function WeatherDisplay({
  isLoading,
  weather,
  temp,
  theme,
}: WeatherDisplayProps) {
  return (
    <div className="flex items-center text-white">
      {isLoading ? (
        <div className="animate-pulse">Loading...</div>
      ) : (
        <>
          {getWeatherIcon(weather, theme === "dark")}
          <span className="ml-1">{temp}°C</span>
        </>
      )}
    </div>
  );
}
