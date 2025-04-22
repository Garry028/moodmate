import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
} from "date-fns";
import { Entry, ThemeMode } from "../types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface MoodCalendarProps {
  entries: Entry[];
  theme: ThemeMode;
  textColor: string;
  secondaryTextColor: string;
  contentBg: string;
}

export default function MoodCalendar({
  entries,
  theme,
  textColor,
  secondaryTextColor,
  contentBg,
}: MoodCalendarProps) {
  console.log(theme);
  const today = format(new Date(), "MMMM dd, yyyy");
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  // Calendar data
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const monthStart = startOfMonth(new Date(currentYear, currentMonth));
  const monthEnd = endOfMonth(monthStart);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDay = getDay(monthStart);

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const calendarTheme = theme === "dark" ? "text-white" : "text-black";

  return (
    <div className={`mt-4 ${contentBg} rounded-lg p-4`}>
      <div className="flex justify-between items-center mb-2">
        <button onClick={goToPreviousMonth}>
          <ChevronLeft size={20} className={calendarTheme} />
        </button>
        <h3 className={`text-lg font-medium ${calendarTheme}`}>
          {format(monthStart, "MMMM yyyy")}
        </h3>
        <button onClick={goToNextMonth} className={calendarTheme}>
          <ChevronRight size={20} className={calendarTheme} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {days.map((day) => (
          <div
            key={day}
            className={`text-xs font-medium p-1 ${secondaryTextColor}`}
          >
            {day}
          </div>
        ))}

        {Array.from({ length: startDay }).map((_, i) => (
          <div key={`empty-start-${i}`} className="p-1"></div>
        ))}

        {daysInMonth.map((date) => {
          const dateStr = format(date, "MMMM dd, yyyy");
          const entry = entries.find((e) => e.date === dateStr);
          const isToday = format(date, "MMMM dd, yyyy") === today;

          let bgColor = "";
          if (entry) {
            switch (entry.mood) {
              case "happy":
                bgColor = "bg-orange-300";
                break;
              case "neutral":
                bgColor = "bg-yellow-300";
                break;
              case "sad":
                bgColor = "bg-yellow-300";
                break;
              case "angry":
                bgColor = "bg-red-300";
                break;
              case "tired":
                bgColor = "bg-green-200";
                break;
            }
          }

          return (
            <div
              key={dateStr}
              className={`p-1 text-xs ${textColor} ${
                isToday ? "border border-gray-300 rounded-full" : ""
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${bgColor}`}
              >
                {format(date, "d")}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
