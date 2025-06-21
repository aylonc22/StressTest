# StressTest

⚡️ Customizable, lightweight stress testing tool built in TypeScript. Ideal for performance testing of any HTTP server, with built-in metrics and CI integration support.

---

## ✨ Features

- 🔁 Simple `stressTest()` function — plug into your own tests or scripts
- ⚙️ Control concurrency, duration, and request rate
- 📊 Built-in metrics: average, p50/p95/p99 latency, success/failure counts
- 🧪 Easy to use in unit/integration tests (Jest-ready)
- 🚫 No heavy dependencies — lightweight by design

---

## 🚀 Quick Start

### 1. Install

```
npm install 5StressTest
```

### 2. Use in Code
```
import { stressTest } from 'ts-stress-tester';

const result = await stressTest({
  url: 'http://localhost:3000',
  concurrency: 10,
  durationMs: 5000,
  requestsPerSecond: 50
});

console.log(result);
```

### 3. Options
Option	Type	Description
url	string	Target endpoint URL
method	`'GET'	'POST'
headers	Record<string, string>	Optional headers
body	any	Optional request body for POST/PUT
concurrency	number	Number of concurrent workers
durationMs	number	Total test duration in milliseconds
requestsPerSecond	number	Optional throttle rate (per worker)

### 4. Sample Output
```{
  total: 500,
  success: 498,
  failure: 2,
  avgMs: 102.3,
  minMs: 61,
  maxMs: 341,
  p50: 100,
  p95: 180,
  p99: 310
}```