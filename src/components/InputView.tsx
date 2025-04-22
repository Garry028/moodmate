import { Entry, Mood, ThemeMode } from "../types";
import MoodEmoji from "./MoodEmoji";
import MoodCalendar from "./MoodCalendar";

interface InputViewProps {
  entries: Entry[];
  today: string;
  selectedMood: Mood;
  setSelectedMood: (mood: Mood) => void;
  note: string;
  setNote: (note: string) => void;
  handleSave: () => void;
  theme: ThemeMode;
  contentBg: string;
  textColor: string;
  secondaryTextColor: string;
  buttonBg: string;
  buttonHoverBg: string;
  buttonTextColor: string;
}

export default function InputView({
  entries,
  today,
  selectedMood,
  setSelectedMood,
  note,
  setNote,
  handleSave,
  theme,
  contentBg,
  textColor,
  secondaryTextColor,
  buttonBg,
  buttonHoverBg,
  buttonTextColor
}: InputViewProps) {
  return (
    <div
      className={`${contentBg} rounded-lg p-4 transition-colors duration-300`}
    >
      <h2 className={`text-xl font-semibold text-center mb-4 ${textColor}`}>
        {today}
      </h2>
      <p className={`text-lg text-center mb-4 ${textColor}`}>
        How are you feeling today?
      </p>

      <div className="flex justify-between mb-6">
        {(["happy", "neutral", "sad", "angry", "tired"] as Mood[]).map(
          (mood) => (
            <button
              key={mood}
              onClick={() => setSelectedMood(mood)}
              className="p-2 rounded-full focus:outline-none"
            >
              <MoodEmoji
                mood={mood}
                selected={selectedMood === mood}
                onClick={() => setSelectedMood(mood)}
              />
            </button>
          )
        )}
      </div>

      <div className="mb-4">
        <textarea
          className={`w-full p-3 border border-gray-200 rounded-lg ${
            theme === "dark"
              ? "bg-gray-600 text-white border-gray-700"
              : ""
          }`}
          placeholder="Add a note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
        />
      </div>

      <button
        onClick={handleSave}
        className={`w-full ${buttonBg} ${buttonTextColor} py-3 rounded-lg font-medium ${buttonHoverBg} transition-colors`}
      >
        Save
      </button>

      <MoodCalendar
        entries={entries}
        theme={theme}
        textColor={textColor}
        secondaryTextColor={secondaryTextColor}
        contentBg={contentBg}
      />
    </div>
  );
}