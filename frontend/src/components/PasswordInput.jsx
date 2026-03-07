export default function PasswordInput({
  password,
  setPassword,
  showPassword,
  setShowPassword,
}) {
  return (
    <div className="w-full">
      <label className="mb-2 block text-sm font-medium text-gray-300">
        Enter Password
      </label>

      <div className="flex items-center overflow-hidden rounded-2xl border border-gray-700 bg-gray-900/70 focus-within:ring-2 focus-within:ring-cyan-400">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Type your password..."
          className="w-full bg-transparent px-4 py-3 text-white outline-none placeholder:text-gray-500"
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="px-4 py-3 text-sm font-medium text-cyan-300 transition hover:text-cyan-200"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
}
