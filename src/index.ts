import { stressTest } from './stressTest';

async function run() {
  const result = await stressTest({
    url: 'http://localhost:3000',
    concurrency: 10,
    durationMs: 5000,
    requestsPerSecond: 50,
  });

  console.log('📊 Stress Test Results:');
  console.log(result);
}

run();
