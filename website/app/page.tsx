export default function Home() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <h1 className="text-5xl font-bold tracking-tight">
          Iffat Abdul Azeez
        </h1>

        <p className="mt-6 text-xl text-zinc-600">
          Computer Science student building data-driven products, energy analytics,
          and full-stack software.
        </p>

        <div className="mt-8 flex gap-4">
          <a
            href="/projects"
            className="px-4 py-2 rounded-md bg-zinc-900 text-white text-sm"
          >
            View projects
          </a>

          <a
            href="https://github.com/iffataz"
            className="px-4 py-2 rounded-md border border-zinc-300 text-sm"
          >
            GitHub
          </a>
        </div>
      </div>
    </main>
  )
}
