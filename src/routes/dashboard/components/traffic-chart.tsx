import { Area, CartesianGrid, ComposedChart, Line, XAxis, YAxis } from 'recharts'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import type { TrafficPoint } from '@/lib/api/metrics'
import { formatDate } from '@/lib/format'

/**
 * Series names, labels and colors live in one config object. Colors come from
 * the chart tokens, so the chart re-skins with the rest of the app.
 */
const CHART_CONFIG = {
  requests: { label: 'Requests', color: 'var(--chart-1)' },
  errors: { label: 'Errors', color: 'var(--chart-2)' },
} satisfies ChartConfig

export function TrafficChart({ data }: { data: TrafficPoint[] }) {
  return (
    <ChartContainer config={CHART_CONFIG} className="h-64 w-full">
      {/* Two scales: requests in the thousands, errors in the tens. A shared
          axis would flatten the error line onto zero. */}
      <ComposedChart data={data} margin={{ left: 4, right: 4, top: 4 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={formatDate}
        />
        <YAxis yAxisId="requests" tickLine={false} axisLine={false} tickMargin={8} width={44} />
        <YAxis
          yAxisId="errors"
          orientation="right"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          width={36}
        />
        <ChartTooltip
          content={<ChartTooltipContent labelFormatter={(label) => formatDate(String(label))} />}
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Area
          yAxisId="requests"
          dataKey="requests"
          type="monotone"
          stroke="var(--color-requests)"
          fill="var(--color-requests)"
          fillOpacity={0.15}
          strokeWidth={2}
          isAnimationActive={false}
        />
        <Line
          yAxisId="errors"
          dataKey="errors"
          type="monotone"
          stroke="var(--color-errors)"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </ComposedChart>
    </ChartContainer>
  )
}
