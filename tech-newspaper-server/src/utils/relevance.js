const INTERESTS = [
  "ai",
  "machine learning",
  "startup",
  "web",
  "cloud",
  "open source",
  "programming",
  "javascript",
  "python"
];

export function isRelevant(story) {
  const text = `${story.title} ${story.url || ""}`.toLowerCase();

  return INTERESTS.some(word => text.includes(word));
}
