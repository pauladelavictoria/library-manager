import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const SMALL_WORDS = new Set([
  // Spanish
  "a", "al", "ante", "con", "contra", "de", "del", "desde", "durante",
  "e", "el", "en", "entre", "hacia", "hasta", "la", "las", "lo", "los",
  "mediante", "ni", "o", "para", "pero", "por", "que", "según", "sin",
  "sobre", "tras", "u", "un", "una", "unas", "unos", "y",
  // English
  "a", "an", "the",
  "and", "but", "or", "nor", "so", "yet",
  "as", "at", "by", "for", "in", "of", "off", "on", "out", "per",
  "to", "up", "via", "vs",
])

export function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map((word, i) =>
      i === 0 || !SMALL_WORDS.has(word)
        ? word.charAt(0).toUpperCase() + word.slice(1)
        : word
    )
    .join(" ")
}
