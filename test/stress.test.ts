import { createServer, IncomingMessage, ServerResponse } from 'http';
import { stressTest } from '../src/core/stressTest';

let server: ReturnType<typeof createServer>;
let port: number;

beforeAll((done) => {
  server = createServer((req: IncomingMessage, res: ServerResponse) => {
    // Simulate small delay for realism
    setTimeout(() => {
      if (req.url === '/fail') {
        res.statusCode = 500;
        res.end('Internal error');
      } else {
        res.statusCode = 200;
        res.end('OK');
      }
    }, 10);
  });

  server.listen(0, () => {
    const addr = server.address();
    if (typeof addr === 'object' && addr?.port) {
      port = addr.port;
      done();
    }
  });
});

afterAll((done) => {
  server.close(done);
});


it('should successfully stress test a simple GET route', async () => {
  const result = await stressTest({
    url: `http://localhost:${port}`,
    concurrency: 5,
    durationMs: 500,
    requestsPerSecond: 50,
  });

  expect(result.total).toBeGreaterThan(0);
  expect(result.success).toBe(result.total);
  expect(result.failure).toBe(0);
  expect(result.avgMs).toBeGreaterThan(0);
});

it('should count failures if endpoint returns 500', async () => {
  const result = await stressTest({
    url: `http://localhost:${port}/fail`,
    concurrency: 3,
    durationMs: 300,
    requestsPerSecond: 30,
  });

  expect(result.failure).toBe(result.total);
  expect(result.success).toBe(0);
});

