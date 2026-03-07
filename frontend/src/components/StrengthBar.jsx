import { getStrengthColor } from "../utils/passwordUtils";

export default function StrengthBar({ score, strength }) {
  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm text-gray-300">Strength</span>
        <span className="text-sm font-semibold text-white">{strength}</span>
      </div>

      <div className="h-3 w-full overflow-hidden rounded-full bg-gray-800">
        <div
          className={`h-full rounded-full transition-all duration-500 ${getStrengthColor(score)}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}
