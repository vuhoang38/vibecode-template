import { queryOptions } from '@tanstack/react-query'
import { metricSummary, traffic } from '@/fixtures/metrics'

export type Metric = { value: number; deltaPercent: number }

export type MetricSummary = {
  activeUsers: Metric
  requests: Metric
  errorRate: Metric
  p95Latency: Metric
}

export type TrafficPoint = {
  date: string
  requests: number
  errors: number
}

export const metricKeys = {
  all: ['metrics'] as const,
  summary: () => [...metricKeys.all, 'summary'] as const,
  traffic: () => [...metricKeys.all, 'traffic'] as const,
}

export function metricSummaryQueryOptions() {
  return queryOptions({
    queryKey: metricKeys.summary(),
    // TEMPLATE: replace with `api.get<MetricSummary>('/metrics/summary')`.
    queryFn: (): Promise<MetricSummary> => Promise.resolve(metricSummary),
  })
}

export function trafficQueryOptions() {
  return queryOptions({
    queryKey: metricKeys.traffic(),
    // TEMPLATE: replace with `api.get<TrafficPoint[]>('/metrics/traffic')`.
    queryFn: (): Promise<TrafficPoint[]> => Promise.resolve(traffic),
  })
}
