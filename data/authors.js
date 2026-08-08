const authors = {
  "mara-vale": {
    name: "Mara Vale",
    role: "Travel Editor",
    initials: "MV",
    href: "/authors/mara-vale",
    bio: "Mara Vale is the editorial pen name used by Path & Roam for destination guides, itineraries and travel research.",
  },
};

export function getAuthor(authorKey) {
  return authors[authorKey] || null;
}
