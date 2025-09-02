export function Button({ children, className = '', variant = 'solid', ...props }) {
  const base = "px-3 py-1.5 rounded-lg text-sm font-medium";
  const styles =
    variant === "ghost"
      ? "bg-transparent hover:bg-gray-100"
      : "bg-indigo-600 text-white hover:bg-indigo-700";
  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  );
}
