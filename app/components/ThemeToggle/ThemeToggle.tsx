"use client";
import { useTheme } from "~/context/theme";
import "./ThemeToggle.css";
import { useFetcher } from "@remix-run/react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const fetcher = useFetcher();

  const _handleToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    console.log("newTheme", newTheme);

    toggleTheme();
    // Send a request to update the cookie
    fetcher.submit(
      { theme: newTheme },
      { method: "post", action: "/set-theme" }
    );
  };

  return (
    <button key={theme} onClick={_handleToggle} className={`tt-container ${theme} `}>
      {/* <span className={theme === "dark" ? "active" : ""} >🌙</span>
      <span className={theme === "light" ? "active" : ""} >☀️</span> */}
      {/* <div className={theme}> */}
      {theme === "dark" ? "☀️" : "🌙"}

      {/* </div> */}
    </button>
  );
}
