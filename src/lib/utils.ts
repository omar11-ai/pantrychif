import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRecipeMeta(id: string) {
  const num = parseInt(id) || 0;
  
  let difficulty = "Medium";
  if (num % 3 === 0) difficulty = "Easy";
  else if (num % 3 === 1) difficulty = "Hard";
  
  const time = 15 + (num % 5) * 10;
  
  return { difficulty, time };
}
