export const getPreferredTheme = (): string => {
  if (typeof window === "undefined") return "light";
  
  const stored = localStorage.getItem("theme");
  if (stored) return stored;
  
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export const applyTheme = (theme: string): void => {
  if (typeof window === "undefined") return;
  
  document.documentElement.classList.remove("dark", "light");
  document.documentElement.classList.add(theme);
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
};

export const initializeTheme = (): void => {
  if (typeof window === "undefined") return;
  
  const theme = getPreferredTheme();
  applyTheme(theme);
};