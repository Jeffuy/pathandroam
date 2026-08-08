const editorialImages = {
  "/images/limerick/king-johns-castle.webp": {
    alt: "King John's Castle beside the River Shannon in Limerick",
    credit: {
      author: "William Murphy",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:King_John%27s_Castle_(Limerick)_(14228395557).jpg",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
    },
  },
  "/images/limerick/milk-market.webp": {
    alt: "The Milk Market in central Limerick",
    credit: {
      author: "William Murphy",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:The_Milk_Market_-_Limerick_(5770779119).jpg",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
    },
  },
  "/images/limerick/river-shannon.webp": {
    alt: "The River Shannon and Thomond Bridge in Limerick",
    credit: {
      author: "Northmetpit",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:River_Shannon_at_Limerick.JPG",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
    },
  },
  "/images/limerick/university-of-limerick.webp": {
    alt: "The Living Bridge over the River Shannon at the University of Limerick",
    credit: {
      author: "Luke Curley",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:UniversityOfLimerick_LivingBridge.jpeg",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
    },
  },
};

export function getEditorialImage(src) {
  return editorialImages[src] || null;
}
