export default function getPreferentColor(){


const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
if (prefersDarkMode) {
  const color = "dark-mode";
  return color
}
const color = "light-mode";
return color
}