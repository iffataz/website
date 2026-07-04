import { siteConfig } from '@/src/lib/site'

export function Footer() {
  return (
    <footer className="border-t border-rule py-8 font-mono text-xs text-ink-muted">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <div className="flex flex-wrap gap-5">
          {siteConfig.contacts.map((contact) => (
            <a
              key={contact.href}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent"
            >
              {contact.label}
            </a>
          ))}
        </div>
        <p>
          © {new Date().getFullYear()} {siteConfig.name} · ctrl+k to navigate
        </p>
      </div>
    </footer>
  )
}
