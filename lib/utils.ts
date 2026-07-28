import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isValidEmailAddressFormat = (input: string) => {
  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(input);
};