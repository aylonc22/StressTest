import axios from 'axios';
import { StressTestOptions, StressTestResult } from './types';

export async function stressTest(options: StressTestOptions): Promise<StressTestResult> {
  const {
    url,
    method = 'GET',
    body,
    headers,
    concurrency,
    durationMs,
    requestsPerSecond = 1000,
  } = options;

  let successCount = 0;
  let failureCount = 0;
  let totalTime = 0;
  let totalRequests = 0;

  const endTime = Date.now() + durationMs;

  const sendRequest = async () => {
    while (Date.now() < endTime) {
      const start = Date.now();
      try {
        await axios({
          method,
          url,
          data: body,
          headers,
          timeout: 10_000,
        });
        successCount++;
      } catch {
        failureCount++;
      }
      const end = Date.now();
      totalTime += end - start;
      totalRequests++;

      const delay = 1000 / requestsPerSecond;
      await new Promise(res => setTimeout(res, delay));
    }
  };

  const threads = Array.from({ length: concurrency }, () => sendRequest());
  await Promise.all(threads);

  return {
    totalRequests,
    successCount,
    failureCount,
    averageResponseTimeMs: totalRequests > 0 ? totalTime / totalRequests : 0,
  };
}
