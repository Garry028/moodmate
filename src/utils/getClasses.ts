import { ThemeMode } from "../types";
export const getClasses = (theme: ThemeMode) => {
    return {
        bgColor: theme === "dark" ? "bg-gray-900" : "bg-gradient-to-b from-orange-200 to-orange-100",
        cardBg: theme === "dark" ? "bg-gray-800" : "bg-orange-300",
        contentBg: theme === "dark" ? "bg-gray-700" : "bg-orange-50",
        textColor: theme === "dark" ? "text-gray-100" : "text-gray-800",
        secondaryTextColor: theme === "dark" ? "text-gray-300" : "text-gray-600",
        buttonBg: theme === "dark" ? "bg-blue-600" : "bg-orange-400",
        buttonHoverBg: theme === "dark" ? "hover:bg-blue-700" : "hover:bg-orange-500",
        buttonTextColor: "text-white",
        navButtonBg: theme === "dark" ? "bg-gray-700" : "bg-orange-200",
        navButtonActiveBg: theme === "dark" ? "bg-blue-600" : "bg-orange-400",
        calendarTheme: theme === "dark" ? "text-white" : "text-black",
        calendarButtonTheme: theme === "dark" ? "text-white" : "text-black",
        calendarButtonHoverTheme: theme === "dark" ? "text-white" : "text-black",
        calendarButtonActiveTheme: theme === "dark" ? "text-white" : "text-black",
        calendarButtonDisabledTheme: theme === "dark" ? "text-gray-400" : "text-gray-600",


    };
};
