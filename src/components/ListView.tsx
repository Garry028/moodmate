import { Download } from "lucide-react";
import { Entry, Mood, ThemeMode } from "../types";
import MoodEmoji from "./MoodEmoji";
import getWeatherIcon from "../utils/getWheatherIcon";

interface ListViewProps {
  entries: Entry[];
  exportToCSV: () => void;
  theme: ThemeMode;
  contentBg: string;
  textColor: string;
  secondaryTextColor: string;
  navButtonBg: string;
}

export default function ListView({
  entries,
  exportToCSV,
  theme,
  contentBg,
  textColor,
  secondaryTextColor,
  navButtonBg,
}: ListViewProps) {
  return (
    <div className={`${contentBg} rounded-lg p-4`}>
      <div className="flex justify-between mb-4">
        <button
          className={`${navButtonBg} ${textColor} px-6 py-2 rounded-lg font-medium`}
        >
          All Notes
        </button>
        <button
          onClick={exportToCSV}
          className={`${navButtonBg} ${textColor} px-3 py-2 rounded-lg font-medium flex items-center`}
        >
          <Download size={16} className="mr-1" />
          Export
        </button>
      </div>

      {entries.length === 0 ? (
        <p className={`text-center py-8 ${textColor}`}>
          No entries yet. Start tracking your mood!
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className={`${
                theme === "dark"
                  ? "bg-gray-600 border-gray-700"
                  : "bg-orange-50 border-orange-100"
              } border rounded-lg p-4 shadow-sm`}
            >
              <div className="flex items-start">
                <MoodEmoji mood={entry.mood as Mood} />
                <div className="ml-3 flex-1">
                  <p className={`font-medium ${textColor}`}>{entry.note}</p>
                  <p className={`text-sm ${secondaryTextColor} mt-1`}>
                    {entry.date}
                  </p>
                </div>
                <div className="flex items-center">
                  {getWeatherIcon(entry.weather, theme === "dark")}
                  <span className={`ml-1 text-sm ${secondaryTextColor}`}>
                    {entry.temp}°C
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
