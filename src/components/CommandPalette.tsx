'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export interface PaletteItem {
  label: string
  hint: string
  href: string
}

export function CommandPalette({ items }: { items: PaletteItem[] }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)

  const filtered = items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((wasOpen) => !wasOpen)
        setQuery('')
        setActive(0)
      } else if (event.key === 'Escape') {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  function select(href: string) {
    setOpen(false)
    router.push(href)
  }

  if (!open) return null

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-50 flex items-start justify-center bg-ink/20 pt-[20vh]"
      onClick={() => setOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Jump to page or project"
        className="mx-4 w-full max-w-md border border-rule bg-paper"
        onClick={(event) => event.stopPropagation()}
      >
        <input
          autoFocus
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setActive(0)
          }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown') {
              event.preventDefault()
              setActive((current) => Math.min(current + 1, filtered.length - 1))
            } else if (event.key === 'ArrowUp') {
              event.preventDefault()
              setActive((current) => Math.max(current - 1, 0))
            } else if (event.key === 'Enter' && filtered[active]) {
              select(filtered[active].href)
            }
          }}
          placeholder="jump to…"
          className="w-full border-b border-rule bg-transparent px-4 py-3 font-mono text-sm outline-none placeholder:text-ink-muted"
        />
        <ul className="max-h-64 overflow-y-auto py-1">
          {filtered.map((item, index) => (
            <li key={item.href}>
              <button
                type="button"
                onClick={() => select(item.href)}
                onMouseEnter={() => setActive(index)}
                className={`flex w-full items-baseline justify-between px-4 py-2 text-left text-sm ${
                  index === active ? 'bg-paper-warm text-accent' : ''
                }`}
              >
                <span>{item.label}</span>
                <span className="font-mono text-xs text-ink-muted">{item.hint}</span>
              </button>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="px-4 py-2 font-mono text-xs text-ink-muted">no matches</li>
          )}
        </ul>
      </div>
    </div>
  )
}
