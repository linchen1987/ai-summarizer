export default function ErrorComponent({ error }: { error: string }) {
  return <div className="text-red-500 mt-4">{error}</div>
}
