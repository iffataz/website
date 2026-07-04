import Link from 'next/link'
import { MonoLabel } from './MonoLabel'

interface LedgerRowProps {
  index: number
  href: string
  name: string
  description: string
  stack: string[]
  year: string
}

export function LedgerRow({ index, href, name, description, stack, year }: LedgerRowProps) {
  return (
    <Link
      href={href}
      className="group grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-baseline gap-x-3 border-b border-rule px-2 py-5 transition-colors hover:bg-paper-warm focus-visible:bg-paper-warm sm:grid-cols-[3rem_minmax(0,1fr)_minmax(0,38%)_3.25rem] sm:gap-x-4"
    >
      <MonoLabel className="transition-colors group-hover:text-accent group-focus-visible:text-accent">
        {String(index).padStart(2, '0')}
      </MonoLabel>
      <span className="min-w-0">
        <span className="font-medium">{name}</span>
        <span
          aria-hidden
          className="ml-2 inline-block -translate-x-1 text-accent opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
        >
          →
        </span>
        <span className="mt-1 block text-sm text-ink-muted">{description}</span>
      </span>
      <span className="hidden flex-wrap justify-end gap-x-3 gap-y-1 sm:flex">
        {stack.map((tag) => (
          <MonoLabel key={tag}>{tag}</MonoLabel>
        ))}
      </span>
      <MonoLabel className="justify-self-end">{year}</MonoLabel>
    </Link>
  )
}
