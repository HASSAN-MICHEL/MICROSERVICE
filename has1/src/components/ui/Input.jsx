// src/components/ui/input.jsx
export function Input({ type = "text", className = "", ...props }) {
  return (
    <input
      type={type}
      className={`border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500 ${className}`}
      {...props}
    />
  );
}
