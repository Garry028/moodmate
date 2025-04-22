import { CloudSnow, CloudLightning, CloudRain, Cloud } from "lucide-react";
import { Sun } from "lucide-react";

const getWeatherIcon = (condition: string, isDark: boolean) => {
  const color = isDark ? "text-gray-300" : "text-gray-600";
  const sunColor = isDark ? "text-yellow-300" : "text-yellow-500";
  const rainColor = isDark ? "text-blue-300" : "text-blue-500";

  switch (condition?.toLowerCase()) {
    case "clear":
      return <Sun className={sunColor} />;
    case "clouds":
      return <Cloud className={color} />;
    case "rain":
    case "drizzle":
      return <CloudRain className={rainColor} />;
    case "thunderstorm":
      return <CloudLightning className={rainColor} />;
    case "snow":
      return <CloudSnow className="text-white" />;
    default:
      return <Sun className={sunColor} />;
  }
};

export default getWeatherIcon;
