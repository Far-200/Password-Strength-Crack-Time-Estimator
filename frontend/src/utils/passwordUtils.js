export function analyzePassword(password) {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password),
  };

  const commonPatterns = [
    "123456",
    "password",
    "admin",
    "qwerty",
    "abc123",
    "letmein",
    "welcome",
  ];

  const lowerPassword = password.toLowerCase();

  let score = 0;

  if (password.length >= 8) score += 20;
  if (password.length >= 12) score += 10;
  if (password.length >= 16) score += 10;

  if (checks.uppercase) score += 15;
  if (checks.lowercase) score += 15;
  if (checks.number) score += 15;
  if (checks.symbol) score += 15;

  if (commonPatterns.some((pattern) => lowerPassword.includes(pattern))) {
    score -= 25;
  }

  if (/^(.)\1+$/.test(password)) {
    score -= 20;
  }

  if (/123|abc|qwerty/i.test(password)) {
    score -= 15;
  }

  score = Math.max(0, Math.min(score, 100));

  const strength = getStrengthLabel(score);
  const crackTime = estimateCrackTime(password);

  return {
    checks,
    score,
    strength,
    crackTime,
  };
}

export function getStrengthLabel(score) {
  if (score < 30) return "Weak";
  if (score < 60) return "Medium";
  if (score < 80) return "Strong";
  return "Very Strong";
}

export function getStrengthColor(score) {
  if (score < 30) return "bg-red-500";
  if (score < 60) return "bg-yellow-500";
  if (score < 80) return "bg-blue-500";
  return "bg-green-500";
}

export function estimateCrackTime(password) {
  if (!password) {
    return "Instantly";
  }

  let poolSize = 0;

  if (/[a-z]/.test(password)) poolSize += 26;
  if (/[A-Z]/.test(password)) poolSize += 26;
  if (/[0-9]/.test(password)) poolSize += 10;
  if (/[^A-Za-z0-9]/.test(password)) poolSize += 32;

  if (poolSize === 0) {
    return "Instantly";
  }

  const combinations = Math.pow(poolSize, password.length);

  const guessesPerSecond = 1e9;
  const seconds = combinations / guessesPerSecond;

  return formatTime(seconds);
  return getSecurityVerdict(seconds);
}

export function formatTime(seconds) {
  if (seconds < 1) return "Instantly";
  if (seconds < 60) return `${Math.floor(seconds)} seconds`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours`;
  if (seconds < 2592000) return `${Math.floor(seconds / 86400)} days`;
  if (seconds < 31536000) return `${Math.floor(seconds / 2592000)} months`;

  const years = seconds / 31536000;

  if (years < 1000) return `${Math.floor(years)} years`;
  if (years < 1000000) return `${Math.floor(years / 100)} centuries`;
  if (years < 1000000000) return `${Math.floor(years / 1000)} millennia`;
  if (years < 1000000000000) {
    return `${(years / 1000000).toFixed(1)} million years`;
  }
  if (years < 1000000000000000) {
    return `${(years / 1000000000).toFixed(1)} billion years`;
  }
  if (years < 1000000000000000000) {
    return `${(years / 1000000000000).toFixed(1)} trillion years`;
  }

  return "Practically uncrackable";
}

export function getSecurityVerdict(seconds) {
  if (seconds < 60) return "Very weak";
  if (seconds < 86400) return "Weak";
  if (seconds < 2592000) return "Fair";
  if (seconds < 31536000) return "Good";
  if (seconds < 3153600000) return "Strong";
  return "Extreme";
}

export function generateSecurePassword(length = 16) {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

  const allChars = uppercase + lowercase + numbers + symbols;

  let password = "";

  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];

  for (let i = 4; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  const shuffled = password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  return shuffled;
}
