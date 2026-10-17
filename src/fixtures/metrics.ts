import type { MetricSummary, TrafficPoint } from '@/lib/api/metrics'

export const metricSummary: MetricSummary = {
  activeUsers: { value: 1284, deltaPercent: 12.4 },
  requests: { value: 48219, deltaPercent: 3.1 },
  errorRate: { value: 0.42, deltaPercent: -18.6 },
  p95Latency: { value: 213, deltaPercent: -4.2 },
}

export const traffic: TrafficPoint[] = [
  { date: '2026-10-01', requests: 3820, errors: 22 },
  { date: '2026-10-03', requests: 4120, errors: 31 },
  { date: '2026-10-05', requests: 3990, errors: 18 },
  { date: '2026-10-07', requests: 4610, errors: 27 },
  { date: '2026-10-09', requests: 5020, errors: 19 },
  { date: '2026-10-11', requests: 4870, errors: 24 },
  { date: '2026-10-13', requests: 5340, errors: 16 },
  { date: '2026-10-15', requests: 5810, errors: 21 },
  { date: '2026-10-17', requests: 6240, errors: 14 },
]
