export default function CrackTimeDisplay({ crackTime }) {
  return (
    <div className="rounded-2xl border border-gray-700 bg-gray-900/60 p-4">
      <p className="text-sm text-gray-400">Estimated crack time</p>
      <p className="mt-2 text-2xl font-bold text-cyan-300">🕒 {crackTime}</p>
      <p className="mt-2 text-xs leading-relaxed text-gray-500">
        Estimate based on password length and character variety. Actual crack
        time depends on attack method, hashing, and system protections.
      </p>
    </div>
  );
}
