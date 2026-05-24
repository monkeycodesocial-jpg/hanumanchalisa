/** Strip HTML/script chars from user text before upload */
export function sanitizeText(input: string, maxLen: number): string {
  return input
    .replace(/<[^>]*>/g, "")
    .replace(/[<>'"\\`]/g, "")
    .replace(/javascript:/gi, "")
    .trim()
    .slice(0, maxLen);
}

export function sanitizeFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120);
}
