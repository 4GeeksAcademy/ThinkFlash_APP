export default function getPreferentColor(opposite){
const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

if ((prefersDarkMode && opposite == "false") || (!prefersDarkMode && opposite == "true")) {
  const color = "dark-mode";
  return color
}
const color = "light-mode";
return color
}