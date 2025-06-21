import axios from 'axios';
import { StressTestOptions, MetricsSummary } from '../types';
import { BasicMetrics } from './metrics';

export async function stressTest(options: StressTestOptions): Promise<MetricsSummary> {
  const {
    url,
    method = 'GET',
    body,
    headers,
    concurrency,
    durationMs,
    requestsPerSecond = 1000,
  } = options;

  const endTime = Date.now() + durationMs;
  const metrics = new BasicMetrics();

  const sendRequest = async () => {
    while (Date.now() < endTime) {
      const start = Date.now();
      let success = false;
      try {
        await axios({
          method,
          url,
          data: body,
          headers,
          timeout: 10_000,
        });
        success = true;
      } catch {}

      const duration = Date.now() - start;
      metrics.record(duration, success);

      const delay = 1000 / requestsPerSecond;
      await new Promise(res => setTimeout(res, delay));
    }
  };

  const threads = Array.from({ length: concurrency }, () => sendRequest());
  await Promise.all(threads);

  return metrics.getSummary();
}
