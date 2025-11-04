export function SearchInput({ value, onChange, placeholder }) {
  return (
    <input
      type="text"
      placeholder={placeholder || "Search..."}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full sm:w-64 p-2.5 rounded-md border border-gray-300 
                 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 
                 text-gray-900 dark:text-gray-100 focus:ring-2 
                 focus:ring-blue-500 outline-none transition"
    />
  );
}
