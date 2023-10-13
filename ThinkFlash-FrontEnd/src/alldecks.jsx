const generateRandomData = (count) => {
    const areas = ["Area-1", "Area-2", "Area-3", "Area-4", "Area-5"];
    const themes = ["Theme-1", "Theme-2", "Theme-3", "Theme-4", "Theme-5"];
    const specializations = [
      "Specialize-1",
      "Specialize-2",
      "Specialize-3",
      "Specialize-4",
      "Specialize-5",
    ];
  
    const decks = [];
  
    for (let i = 1; i <= count; i++) {
      const randomArea = areas[Math.floor(Math.random() * areas.length)];
      const randomTheme = themes[Math.floor(Math.random() * themes.length)];
      const randomSpecialization =
        specializations[Math.floor(Math.random() * specializations.length)];
  
      decks.push({
        id: i,
        area: randomArea,
        theme: randomTheme,
        specialize: randomSpecialization,
      });
    }
  
    return decks;
  };
  
  export const allDecksData = generateRandomData(30);