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
  "/images/limerick/one-day-itinerary/nicholas-street-medieval-quarter.webp": {
    alt: "Nicholas Street in Limerick's Medieval Quarter",
    credit: {
      author: "William Murphy",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Nicholas_Street_-_Limerick_(5794588827).jpg",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
      modification: "Resized and converted to WebP",
    },
  },
  "/images/limerick/one-day-itinerary/st-marys-cathedral.webp": {
    alt: "Saint Mary's Cathedral in Limerick, Ireland",
    credit: {
      author: "NateBergin",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:02_St._Mary%27s_Cathedral_Limerick.png",
      license: "CC BY 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
      modification: "Resized and converted to WebP",
    },
  },
  "/images/limerick/one-day-itinerary/traditional-music-session.webp": {
    alt: "Illustrative traditional Irish music session in a pub",
    illustrative: true,
    label: "Illustrative traditional Irish music session",
  },
};

export function getEditorialImage(src) {
  return editorialImages[src] || null;
}
