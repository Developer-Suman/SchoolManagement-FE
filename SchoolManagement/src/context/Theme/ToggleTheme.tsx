"use client";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeContext";

export default function ThemeToggle() {
  const { setTheme, isDark } = useTheme();

  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  return (
    <button
      onClick={toggleTheme}
      className="relative flex w-20 h-10 rounded-full border-2 border-black overflow-hidden bg-white dark:bg-[#3a4249] dark:border-white transition-colors duration-300"
    >
      <div
        className={`absolute top-0 left-0 w-1/2 h-full rounded-full transition-transform duration-300 ease-in-out ${
          isDark ? "translate-x-full bg-white" : "translate-x-0 bg-black"
        }`}
      />
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <Sun
          size={20}
          className={`${
            isDark ? "text-white" : "text-white transition-colors duration-300"
          }`}
        />
      </div>
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <Moon
          size={20}
          className={`${
            isDark ? "text-black" : "text-black transition-colors duration-300"
          }`}
        />
      </div>
    </button>
  );
}
