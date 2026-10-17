import { useQuery } from '@tanstack/react-query'
import { PageHeader } from '@/components/shared/page-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { metricSummaryQueryOptions, trafficQueryOptions } from '@/lib/api/metrics'
import { formatNumber } from '@/lib/format'
import { StatCard } from '@/routes/dashboard/components/stat-card'
import { TrafficChart } from '@/routes/dashboard/components/traffic-chart'

export default function DashboardPage() {
  const summary = useQuery(metricSummaryQueryOptions())
  const traffic = useQuery(trafficQueryOptions())

  return (
    <>
      <PageHeader title="Dashboard" description="Service health over the last two weeks." />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summary.isPending || !summary.data
          ? Array.from({ length: 4 }, (_, index) => <Skeleton key={index} className="h-24" />)
          : [
              { label: 'Active users', metric: summary.data.activeUsers, value: formatNumber(summary.data.activeUsers.value) },
              { label: 'Requests', metric: summary.data.requests, value: formatNumber(summary.data.requests.value) },
              { label: 'Error rate', metric: summary.data.errorRate, value: `${summary.data.errorRate.value}%`, lowerIsBetter: true },
              { label: 'p95 latency', metric: summary.data.p95Latency, value: `${summary.data.p95Latency.value}ms`, lowerIsBetter: true },
            ].map((stat) => (
              <StatCard
                key={stat.label}
                label={stat.label}
                value={stat.value}
                deltaPercent={stat.metric.deltaPercent}
                lowerIsBetter={stat.lowerIsBetter}
              />
            ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-h3">Traffic</CardTitle>
          <CardDescription>Requests and errors, sampled every other day.</CardDescription>
        </CardHeader>
        <CardContent>
          {traffic.isPending || !traffic.data ? (
            <Skeleton className="h-64 w-full" />
          ) : (
            <TrafficChart data={traffic.data} />
          )}
        </CardContent>
      </Card>
    </>
  )
}
