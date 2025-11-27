type Theme = "light" | "dark";

export const getPreferredTheme = (): Theme => {
  if (typeof window === "undefined") return "light";
  
  try {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored && (stored === "light" || stored === "dark")) return stored;
  } catch {
    // localStorage not available (private browsing, etc.)
  }
  
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export const applyTheme = (theme: Theme): void => {
  if (typeof window === "undefined") return;
  if (theme !== "light" && theme !== "dark") return;
  
  document.documentElement.classList.remove("dark", "light");
  document.documentElement.classList.add(theme);
  document.documentElement.setAttribute("data-theme", theme);
  
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // localStorage not available
  }
};

export const initializeTheme = (): void => {
  if (typeof window === "undefined") return;
  
  const theme = getPreferredTheme();
  applyTheme(theme);
};