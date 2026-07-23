const SPLIT_PATTERNS = [
  /\s+and\s+/i,
  /\s+then\s+/i,
  /\s+also\s+/i,
  /,\s*/,
  /\.\s*/,
  /;\s*/,
];

export const splitTranscribedText = (text: string): string[] => {
  if (!text.trim()) return [];

  let parts: string[] = [text.trim()];

  for (const pattern of SPLIT_PATTERNS) {
    parts = parts.flatMap((part) =>
      part
        .split(pattern)
        .map((s) => s.trim())
        .filter(Boolean)
    );
  }

  return parts.length > 5 ? [text.trim()] : parts.filter(Boolean);
};
