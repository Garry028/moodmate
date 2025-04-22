
import { Mood } from "../types";

const MoodEmoji = ({
    mood,
    selected = false,
    onClick = () => {},
  }: {
    mood: Mood;
    selected?: boolean;
    onClick?: () => void;
  }) => {
    const baseClass =
      "text-2xl rounded-full w-10 h-10 flex items-center justify-center";
    const selectedClass = selected ? "ring-2 ring-blue-500" : "";

    let emoji;
    let bgColor;

    switch (mood) {
      case "happy":
        emoji = "😊";
        bgColor = "bg-orange-300";
        break;
      case "neutral":
        emoji = "😐";
        bgColor = "bg-yellow-300";
        break;
      case "sad":
        emoji = "🙁";
        bgColor = "bg-yellow-300";
        break;
      case "angry":
        emoji = "😠";
        bgColor = "bg-red-300";
        break;
      case "tired":
        emoji = "😴";
        bgColor = "bg-green-200";
        break;
      default:
        return null;
    }

    return (
      <div
        className={`${baseClass} ${bgColor} ${selectedClass} cursor-pointer`}
        onClick={onClick}
      >
        {emoji}
      </div>
    );
  };

export default MoodEmoji;