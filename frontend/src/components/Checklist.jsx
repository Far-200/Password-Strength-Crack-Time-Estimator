function CheckItem({ passed, label }) {
  return (
    <div
      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
        passed ? "bg-green-500/10 text-green-300" : "bg-red-500/10 text-red-300"
      }`}
    >
      <span>{passed ? "✔" : "✖"}</span>
      <span>{label}</span>
    </div>
  );
}

export default function Checklist({ checks }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      <CheckItem passed={checks.length} label="At least 8 characters" />
      <CheckItem passed={checks.uppercase} label="Uppercase letter" />
      <CheckItem passed={checks.lowercase} label="Lowercase letter" />
      <CheckItem passed={checks.number} label="Number" />
      <CheckItem passed={checks.symbol} label="Special character" />
    </div>
  );
}
