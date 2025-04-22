import { BarChart } from "lucide-react";
import { View } from "../types";

interface NavigationProps {
  view: View;
  setView: (view: View) => void;
  navButtonActiveBg: string;
  navButtonBg: string;
  textColor: string;
}

export default function Navigation({
  view,
  setView,
  navButtonActiveBg,
  navButtonBg,
  textColor,
}: NavigationProps) {
  return (
    <div className="mt-4 flex space-x-4">
      <button
        onClick={() => setView("input")}
        className={`px-4 py-2 rounded-lg ${
          view === "input"
            ? navButtonActiveBg + " text-white"
            : navButtonBg + " " + textColor
        }`}
      >
        New Entry
      </button>
      <button
        onClick={() => setView("list")}
        className={`px-4 py-2 rounded-lg ${
          view === "list"
            ? navButtonActiveBg + " text-white"
            : navButtonBg + " " + textColor
        }`}
      >
        View Entries
      </button>
      <button
        onClick={() => setView("stats")}
        className={`px-4 py-2 rounded-lg flex items-center ${
          view === "stats"
            ? navButtonActiveBg + " text-white"
            : navButtonBg + " " + textColor
        }`}
      >
        <BarChart size={16} className="mr-1" />
        Stats
      </button>
    </div>
  );
}
