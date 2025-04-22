import React, { useEffect, useState } from "react";
import { Smile, Frown, Meh, Angry, Laugh, Sun, Cloud } from "lucide-react";
import { format } from "date-fns";

const moodOptions = [
  { icon: <Laugh />, label: "Great", color: "bg-yellow-300" },
  { icon: <Smile />, label: "Good", color: "bg-green-300" },
  { icon: <Meh />, label: "Okay", color: "bg-blue-300" },
  { icon: <Frown />, label: "Sad", color: "bg-indigo-300" },
  { icon: <Angry />, label: "Angry", color: "bg-red-300" },
];

interface Entry {
  date: string;
  mood: string;
  note: string;
  weather: string;
  temp: number;
}

const App = () => {
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [temp, setTemp] = useState<number | null>(null);
  const [entries, setEntries] = useState<Entry[]>([]);
  const today = format(new Date(), "MMMM dd, yyyy");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const apiKey = import.meta.env.VITE_APP_OPENWEATHERMAP_API_KEY;
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
      );
      const data = await res.json();
      setWeather(data.weather[0].main);
      setTemp(data.main.temp);
    });
  }, []);

  const handleSave = () => {
    if (!selectedMood || !note)
      return alert("Please select mood and enter a note.");

    const newEntry: Entry = {
      date: today,
      mood: selectedMood,
      note,
      weather,
      temp: temp || 0,
    };

    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);
    localStorage.setItem("moodEntries", JSON.stringify(updatedEntries));
    setSelectedMood("");
    setNote("");
    alert("Mood saved!");
  };

  useEffect(() => {
    const stored = localStorage.getItem("moodEntries");
    if (stored) {
      setEntries(JSON.parse(stored));
    }
  }, []);

  const getWeatherIcon = (weather: string) => {
    return weather === "Clear" ? (
      <Sun className="inline-block" />
    ) : (
      <Cloud className="inline-block" />
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 to-yellow-100 text-gray-800 p-6">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-4">
        <h1 className="text-2xl font-semibold text-center">MoodMate</h1>
        <div className="text-center text-lg font-medium">{today}</div>
        <div className="text-center">How are you feeling today?</div>
        <div className="flex justify-center gap-4">
          {moodOptions.map((mood, i) => (
            <button
              key={i}
              className={`p-3 rounded-full ${
                selectedMood === mood.label ? mood.color : "bg-gray-200"
              }`}
              onClick={() => setSelectedMood(mood.label)}
              title={mood.label}
            >
              {mood.icon}
            </button>
          ))}
        </div>
        <textarea
          className="w-full border border-gray-300 p-2 rounded-md resize-none"
          rows={3}
          placeholder="Add a note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></textarea>
        <button
          className="w-full bg-orange-400 hover:bg-orange-500 text-white p-2 rounded-md font-semibold"
          onClick={handleSave}
        >
          Save
        </button>
        {weather && temp !== null && (
          <div className="text-right text-sm text-gray-500">
            {getWeatherIcon(weather)} {weather}, {temp}°C
          </div>
        )}
      </div>

      <div className="max-w-3xl mx-auto mt-8">
        <h2 className="text-xl font-semibold mb-4">All Notes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {entries.map((entry, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-md">
              <div className="flex items-center gap-2 text-lg font-medium">
                {moodOptions.find((m) => m.label === entry.mood)?.icon}{" "}
                {entry.note}
              </div>
              <div className="text-sm text-gray-500 mt-2">
                {entry.date} | {getWeatherIcon(entry.weather)} {entry.temp}°C
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
