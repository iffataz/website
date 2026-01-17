export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-2.5 py-0.5 text-xs font-medium bg-zinc-100 text-zinc-700 rounded-md">
      {children}
    </span>
  )
}
