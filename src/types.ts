export interface StressTestOptions {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
  concurrency: number;
  durationMs: number;
  requestsPerSecond?: number;
}

export interface StressTestResult {
  totalRequests: number;
  successCount: number;
  failureCount: number;
  averageResponseTimeMs: number;
}
