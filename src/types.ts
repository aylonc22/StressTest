export interface StressTestOptions {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
  concurrency: number;
  durationMs: number;
  requestsPerSecond?: number;
}

export interface MetricsTracker {
  record(durationMs: number, success: boolean): void;
  getSummary(): MetricsSummary;
}

export interface MetricsSummary {
  total: number;
  success: number;
  failure: number;
  avgMs: number;
  minMs: number;
  maxMs: number;
  p50: number;
  p95: number;
  p99: number;
  durations: number[]; // Optional for debugging
}
