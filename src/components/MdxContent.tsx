'use client'

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

const components = {
  h1: (props: any) => (
    <h1 className="font-serif text-3xl sm:text-4xl font-semibold mt-8 mb-4" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="font-serif text-2xl sm:text-3xl font-semibold mt-6 mb-3" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="font-serif text-xl font-semibold mt-4 mb-2" {...props} />
  ),
  p: (props: any) => <p className="mb-4 leading-relaxed text-muted-foreground" {...props} />,
  ul: (props: any) => (
    <ul className="list-disc list-inside mb-4 space-y-2 text-muted-foreground" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-decimal list-inside mb-4 space-y-2 text-muted-foreground" {...props} />
  ),
  li: (props: any) => <li className="ml-4" {...props} />,
  a: (props: any) => (
    <a className="text-primary underline underline-offset-4 hover:text-primary/80" {...props} />
  ),
  code: (props: any) => (
    <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground" {...props} />
  ),
  pre: (props: any) => (
    <pre className="mb-4 overflow-x-auto rounded-2xl bg-foreground px-5 py-4 text-sm text-background" {...props} />
  ),
  blockquote: (props: any) => (
    <blockquote className="my-4 border-l-4 border-primary/30 pl-4 italic text-muted-foreground" {...props} />
  ),
}

export function MdxContent({ source }: { source: MDXRemoteSerializeResult }) {
  return <MDXRemote {...source} components={components} />
}
