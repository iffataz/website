import { Badge } from '@/src/components/ui/badge'

export function Tag({ children }: { children: React.ReactNode }) {
  return <Badge variant="secondary">{children}</Badge>
}
