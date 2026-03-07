# 🔐 Password Strength Checker

A React-based tool that analyzes password strength and estimates brute-force crack time.

## Features

- Password strength analysis
- Crack-time estimation
- Secure password generator
- Copy to clipboard
- Clean responsive UI (TailwindCSS)

## Tech Stack

- React
- Vite
- TailwindCSS

## Demo

Enter a password to see:

- strength rating
- character validation
- estimated crack time

Generate secure passwords instantly and copy them.

## Installation

```bash
npm install
npm run dev
```

Built as part of a small daily projects challenge.

---

# 8️⃣ Repo structure should look like

password-strength-checker
│
├─ src
│ ├─ components
│ │ ├─ PasswordInput.jsx
│ │ ├─ StrengthBar.jsx
│ │ ├─ Checklist.jsx
│ │ └─ CrackTimeDisplay.jsx
│ │
│ ├─ utils
│ │ └─ passwordUtils.js
│ │
│ ├─ App.jsx
│ └─ main.jsx
│
├─ package.json
├─ index.html
└─ README.md
