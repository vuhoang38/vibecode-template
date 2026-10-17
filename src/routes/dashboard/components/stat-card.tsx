import { TrendingDown, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardDescription } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { formatPercent } from '@/lib/format'

type StatCardProps = {
  label: string
  value: string
  deltaPercent: number
  /** Set when a falling number is the good outcome, such as error rate. */
  lowerIsBetter?: boolean
}

export function StatCard({ label, value, deltaPercent, lowerIsBetter = false }: StatCardProps) {
  const rising = deltaPercent >= 0
  const good = lowerIsBetter ? !rising : rising
  const Icon = rising ? TrendingUp : TrendingDown

  return (
    // One CardContent rather than CardHeader plus CardContent. Card puts gap-6
    // between those two, and CardHeader reserves a second grid row this card
    // never fills, so the label floated 24px above its own number.
    <Card>
      <CardContent className="grid gap-1">
        <CardDescription className="text-label">{label}</CardDescription>
        <div className="flex items-end justify-between gap-2">
          <span className="text-display tabular-nums">{value}</span>
          <span
            className={cn(
              'text-caption flex items-center gap-1 tabular-nums',
              good ? 'text-success' : 'text-destructive',
            )}
          >
            <Icon className="size-3" />
            {formatPercent(deltaPercent)}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
