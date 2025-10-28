const toggle = document.getElementById("themeToggle");
const currentTheme = localStorage.getItem("theme");

if (currentTheme) document.documentElement.setAttribute("data-theme", currentTheme);

toggle.addEventListener("click", () => {
  const theme = document.documentElement.getAttribute("data-theme");
  const newTheme = theme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
});
