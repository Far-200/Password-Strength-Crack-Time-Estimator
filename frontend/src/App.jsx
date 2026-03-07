import { useMemo, useState } from "react";
import PasswordInput from "./components/PasswordInput";
import StrengthBar from "./components/StrengthBar";
import Checklist from "./components/Checklist";
import CrackTimeDisplay from "./components/CrackTimeDisplay";
import { analyzePassword, generateSecurePassword } from "./utils/passwordUtils";

export default function App() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => analyzePassword(password), [password]);

  const handleGeneratePassword = () => {
    const randomLength = Math.floor(Math.random() * 7) + 12; // 12 to 18
    const newPassword = generateSecurePassword(randomLength);
    setPassword(newPassword);
    setShowPassword(true);
    setCopied(false);
  };

  const handleCopyPassword = async () => {
    if (!password.trim()) return;

    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error("Failed to copy password:", error);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-black px-4 py-10 text-white">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-3xl border border-gray-800 bg-white/5 p-6 shadow-2xl backdrop-blur-md sm:p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Password Strength Checker
            </h1>
            <p className="mt-3 text-sm text-gray-400 sm:text-base">
              Check password strength and estimate how long it might take to
              crack.
            </p>
          </div>

          <div className="space-y-6">
            <PasswordInput
              password={password}
              setPassword={setPassword}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />

            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleGeneratePassword}
                className="rounded-2xl border border-cyan-400/40 bg-cyan-400/10 px-5 py-3 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400/20 hover:text-cyan-200"
              >
                Generate Secure Password
              </button>

              <button
                type="button"
                onClick={handleCopyPassword}
                disabled={!password.trim()}
                className={`rounded-2xl px-5 py-3 text-sm font-semibold transition ${
                  password.trim()
                    ? "border border-green-400/40 bg-green-400/10 text-green-300 hover:bg-green-400/20 hover:text-green-200"
                    : "cursor-not-allowed border border-gray-700 bg-gray-800/40 text-gray-500"
                }`}
              >
                {copied ? "Copied!" : "Copy Password"}
              </button>
            </div>

            <StrengthBar score={result.score} strength={result.strength} />

            <Checklist checks={result.checks} />

            <CrackTimeDisplay crackTime={result.crackTime} />
          </div>
        </div>
      </div>
    </div>
  );
}
