export function MonoLabel({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span className={`font-mono text-xs tracking-wide text-ink-muted ${className}`}>
      {children}
    </span>
  )
}
