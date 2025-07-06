import { useTheme } from "../theme/ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
    </button>
  );
}
