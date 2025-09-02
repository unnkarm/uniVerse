export function Card({ children }) {
  return <div className="bg-white shadow rounded-xl p-4">{children}</div>;
}
export function CardHeader({ children }) {
  return <div className="mb-2">{children}</div>;
}
export function CardTitle({ children }) {
  return <h2 className="text-lg font-semibold">{children}</h2>;
}
export function CardContent({ children }) {
  return <div>{children}</div>;
}
