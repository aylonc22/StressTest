import { MetricsSummary, MetricsTracker } from "../types";

export class BasicMetrics implements MetricsTracker {
  private durations: number[] = [];
  private successCount = 0;
  private failureCount = 0;

  record(durationMs: number, success: boolean): void {
    this.durations.push(durationMs);
    if (success) this.successCount++;
    else this.failureCount++;
  }

  getSummary(): MetricsSummary {
    const sorted = [...this.durations].sort((a, b) => a - b);
    const total = sorted.length;
    const sum = sorted.reduce((a, b) => a + b, 0);

    return {
      total,
      success: this.successCount,
      failure: this.failureCount,
      avgMs: total ? sum / total : 0,
      minMs: total ? sorted[0] : 0,
      maxMs: total ? sorted[total - 1] : 0,
      p50: percentile(sorted, 50),
      p95: percentile(sorted, 95),
      p99: percentile(sorted, 99),
      durations: sorted,
    };
  }
}

function percentile(sorted: number[], p: number): number {
  if (sorted.length === 0) return 0;
  const idx = Math.ceil((p / 100) * sorted.length) - 1;
  return sorted[idx];
}
