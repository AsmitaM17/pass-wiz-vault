export interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

export function generatePassword(options: PasswordOptions): string {
  let charset = "";
  
  if (options.uppercase) charset += UPPERCASE;
  if (options.lowercase) charset += LOWERCASE;
  if (options.numbers) charset += NUMBERS;
  if (options.symbols) charset += SYMBOLS;
  
  if (charset === "") {
    charset = LOWERCASE; // fallback
  }
  
  let password = "";
  const array = new Uint32Array(options.length);
  crypto.getRandomValues(array);
  
  for (let i = 0; i < options.length; i++) {
    password += charset[array[i] % charset.length];
  }
  
  return password;
}

export type StrengthLevel = "weak" | "fair" | "good" | "strong";

export interface StrengthResult {
  level: StrengthLevel;
  score: number;
  label: string;
}

export function calculateStrength(password: string, options: PasswordOptions): StrengthResult {
  let score = 0;
  
  // Length scoring
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;
  if (password.length >= 20) score += 1;
  
  // Character variety scoring
  const varietyCount = [options.uppercase, options.lowercase, options.numbers, options.symbols].filter(Boolean).length;
  score += varietyCount;
  
  // Normalize to 0-100
  const normalizedScore = Math.min(100, (score / 8) * 100);
  
  if (normalizedScore < 30) {
    return { level: "weak", score: normalizedScore, label: "Weak" };
  } else if (normalizedScore < 50) {
    return { level: "fair", score: normalizedScore, label: "Fair" };
  } else if (normalizedScore < 75) {
    return { level: "good", score: normalizedScore, label: "Good" };
  } else {
    return { level: "strong", score: normalizedScore, label: "Strong" };
  }
}
