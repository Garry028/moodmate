import { Entry, Mood, ThemeMode } from "../types";
import MoodEmoji from "./MoodEmoji";

interface StatsViewProps {
  entries: Entry[];
  theme: ThemeMode;
  contentBg: string;
  textColor: string;
  secondaryTextColor: string;
}

export default function StatsView({
  entries,
  theme,
  contentBg,
  textColor,
  secondaryTextColor,
}: StatsViewProps) {
  const moodCounts = {
    happy: entries.filter((entry) => entry.mood === "happy").length,
    neutral: entries.filter((entry) => entry.mood === "neutral").length,
    sad: entries.filter((entry) => entry.mood === "sad").length,
    angry: entries.filter((entry) => entry.mood === "angry").length,
    tired: entries.filter((entry) => entry.mood === "tired").length,
  };

  const maxCount = Math.max(...Object.values(moodCounts), 1);

  return (
    <div className={`${contentBg} rounded-lg p-4`}>
      <h2 className={`text-xl font-semibold text-center mb-4 ${textColor}`}>
        Mood Trends
      </h2>

      <div className="space-y-4">
        {(["happy", "neutral", "sad", "angry", "tired"] as Mood[])
          .filter((mood): mood is NonNullable<Mood> => mood !== null)
          .map((mood) => (
            <div key={mood} className="flex items-center">
              <MoodEmoji mood={mood} />
              <div className="ml-3 flex-1">
                <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      mood === "happy"
                        ? "bg-orange-300"
                        : mood === "neutral"
                        ? "bg-yellow-300"
                        : mood === "sad"
                        ? "bg-yellow-300"
                        : mood === "angry"
                        ? "bg-red-300"
                        : "bg-green-200"
                    }`}
                    style={{
                      width: `${(moodCounts[mood] / maxCount) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
              <span className={`ml-2 font-medium ${textColor}`}>
                {moodCounts[mood]}
              </span>
            </div>
          ))}
      </div>

      <div className="mt-6">
        <h3 className={`font-medium mb-2 ${textColor}`}>Statistics</h3>
        <p className={`${secondaryTextColor}`}>
          Total entries: {entries.length}
        </p>
        <p className={`${secondaryTextColor}`}>
          Most frequent mood:{" "}
          {Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0][0]}
        </p>
        <p className={`${secondaryTextColor}`}>
          First entry:{" "}
          {entries.length > 0 ? entries[entries.length - 1].date : "None"}
        </p>
      </div>
    </div>
  );
}
