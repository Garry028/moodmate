import { useState, useEffect } from "react";
import { format } from "date-fns";

import { Entry, Mood, ThemeMode, View } from "../types";
import { endpoints } from "../apis/endpoints";

import Header from "./Header";
import InputView from "./InputView";
import ListView from "./ListView";
import StatsView from "./StatsView";
import Navigation from "./Navigation";
import { getClasses } from "../utils/getClasses";

export default function Moodmate() {
  const [selectedMood, setSelectedMood] = useState<Mood>(null);
  const [note, setNote] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [temp, setTemp] = useState<number | null>(null);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [view, setView] = useState<View>("input");
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const today = format(new Date(), "MMMM dd, yyyy");

  const handleSave = () => {
    if (!selectedMood || !note) {
      alert("Please select a mood and enter a note.");
      return;
    }

    const newEntry: Entry = {
      id: Date.now().toString(),
      date: today,
      mood: selectedMood,
      note: note,
      weather: weather,
      temp: temp || 0,
    };

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem("moodEntries", JSON.stringify(updatedEntries));

    setSelectedMood(null);
    setNote("");

    alert("Mood saved successfully!");
  };

  const exportToCSV = () => {
    const headers = ["Date", "Mood", "Note", "Weather", "Temperature"];
    const csvRows = [headers.join(",")];

    entries.forEach((entry) => {
      const row = [
        entry.date,
        entry.mood,
        `"${entry.note.replace(/"/g, '""')}"`, // Handle quotes in notes
        entry.weather,
        entry.temp,
      ];
      csvRows.push(row.join(","));
    });

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `mood_journal_${format(new Date(), "yyyy-MM-dd")}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const {
    bgColor,
    cardBg,
    contentBg,
    textColor,
    secondaryTextColor,
    buttonBg,
    buttonHoverBg,
    buttonTextColor,
    navButtonBg,
    navButtonActiveBg,
  } = getClasses(theme);

  const fetchWeather = async () => {
    try {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const res = await fetch(endpoints.getWeather(latitude, longitude));
          if (res.ok) {
            const data = await res.json();
            setWeather(data.weather[0].main);
            setTemp(Math.round(data.main.temp));
          } else {
            setWeather("Clear");
            setTemp(25);
          }
          setIsLoading(false);
        },
        () => {
          setWeather("Clear");
          setTemp(25);
          setIsLoading(false);
        }
      );
    } catch (error) {
      console.error("Error fetching weather:", error);
      setWeather("Clear");
      setTemp(25);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("moodEntries");
    if (stored) {
      setEntries(JSON.parse(stored));
    }

    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setTheme("dark");
    }
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen ${bgColor} p-4 transition-colors duration-300`}
    >
      <div
        className={`w-full max-w-md ${cardBg} rounded-xl p-4 shadow-lg transition-colors duration-300`}
      >
        <Header
          theme={theme}
          setTheme={setTheme}
          isLoading={isLoading}
          weather={weather}
          temp={temp}
        />

        {view === "input" && (
          <InputView
            entries={entries}
            today={today}
            selectedMood={selectedMood}
            setSelectedMood={setSelectedMood}
            note={note}
            setNote={setNote}
            handleSave={handleSave}
            theme={theme}
            contentBg={contentBg}
            textColor={textColor}
            secondaryTextColor={secondaryTextColor}
            buttonBg={buttonBg}
            buttonHoverBg={buttonHoverBg}
            buttonTextColor={buttonTextColor}
          />
        )}

        {view === "list" && (
          <ListView
            entries={entries}
            exportToCSV={exportToCSV}
            theme={theme}
            contentBg={contentBg}
            textColor={textColor}
            secondaryTextColor={secondaryTextColor}
            navButtonBg={navButtonBg}
          />
        )}

        {view === "stats" && (
          <StatsView
            entries={entries}
            theme={theme}
            contentBg={contentBg}
            textColor={textColor}
            secondaryTextColor={secondaryTextColor}
          />
        )}
      </div>

      <Navigation
        view={view}
        setView={setView}
        navButtonActiveBg={navButtonActiveBg}
        navButtonBg={navButtonBg}
        textColor={textColor}
      />
    </div>
  );
}
