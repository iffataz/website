import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

const components = {
  h2: (props: any) => (
    <h2 className="mt-10 mb-4 border-b border-rule pb-2 text-xl font-medium tracking-tight [&>a]:text-inherit [&>a]:no-underline" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="mt-8 mb-3 text-lg font-medium tracking-tight [&>a]:text-inherit [&>a]:no-underline" {...props} />
  ),
  p: (props: any) => <p className="mb-4 leading-relaxed" {...props} />,
  ul: (props: any) => <ul className="mb-4 list-disc space-y-2 pl-5" {...props} />,
  ol: (props: any) => <ol className="mb-4 list-decimal space-y-2 pl-5" {...props} />,
  li: (props: any) => <li className="leading-relaxed" {...props} />,
  a: (props: any) => (
    <a className="text-accent underline underline-offset-4 hover:no-underline" {...props} />
  ),
  code: (props: any) => (
    <code className="bg-paper-warm px-1.5 py-0.5 font-mono text-sm" {...props} />
  ),
  pre: (props: any) => (
    <pre className="mb-4 overflow-x-auto border border-rule bg-paper-warm px-5 py-4 font-mono text-sm" {...props} />
  ),
  blockquote: (props: any) => (
    <blockquote className="my-4 border-l-2 border-rule pl-4 text-ink-muted" {...props} />
  ),
}

export function MdxContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
        },
      }}
    />
  )
}
