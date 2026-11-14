---
title: "Performance measurement APIs (part 7 of 7)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/perf_hooks.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Performance measurement APIs (part 7 of 7)

## Histogram analysis examples

The `Histogram` class provides statistical analysis methods useful for
performance monitoring, SLO enforcement, and regression detection.

### Distribution shape analysis

```js
const { createHistogram } = require('node:perf_hooks');

const h = createHistogram();

// Simulate a right-skewed latency distribution
for (let i = 0; i < 1000; i++) {
  h.record(Math.ceil(Math.random() * 100));
}
// Add some outliers
for (let i = 0; i < 10; i++) {
  h.record(500 + Math.ceil(Math.random() * 500));
}

console.log('Skewness:', h.skewness.toFixed(4));  // Positive = right-skewed
console.log('Kurtosis:', h.kurtosis.toFixed(4));  // Positive = heavy tails
```

### SLO monitoring with CDF

```js
const { createHistogram } = require('node:perf_hooks');

const latency = createHistogram();

// Record request latencies (in nanoseconds)...

// "What fraction of requests complete within 100ms?"
const withinSLO = latency.cdf(100_000_000);
console.log(`${(withinSLO * 100).toFixed(1)}% of requests within SLO`);

// "What fraction of requests exceed 500ms?"
const violating = latency.ccdf(500_000_000);
console.log(`${(violating * 100).toFixed(1)}% of requests violating SLO`);
```

### SLO burn rate monitoring

```js
const { createHistogram } = require('node:perf_hooks');

// Track latency with EWMA (half-life 100 samples) and a 200ms SLO threshold
const latency = createHistogram({
  halfLife: 100,
  threshold: 200_000_000,  // 200ms in nanoseconds
});

// Record request latencies...

// Smoothed error rate: probability of exceeding the threshold
console.log(`Error rate: ${(latency.ewmaErrorRate * 100).toFixed(2)}%`);

// Burn rate against a 99.9% SLO
// >1 means the error budget is depleting faster than allowed
const rate = latency.burnRate(0.999);
console.log(`Burn rate: ${rate.toFixed(2)}x`);

// EWMA mean and stddev track the smoothed latency
console.log(`EWMA latency: ${latency.ewmaMean.toFixed(0)}ns`);
console.log(`EWMA stddev:  ${latency.ewmaStddev.toFixed(0)}ns`);
```

### Regression detection with KS test

```js
const { createHistogram } = require('node:perf_hooks');

const baseline = createHistogram();
const current = createHistogram();

// Record baseline and current latencies...

// D-statistic: 0 = identical, 1 = completely different
const d = baseline.ksTest(current);
if (d > 0.1) {
  console.log(`Possible regression detected (D=${d.toFixed(4)})`);
}
```

### Batch percentile queries

```js
const { createHistogram } = require('node:perf_hooks');

const h = createHistogram();
// Record values...

// Efficiently query common monitoring percentiles in one pass
const p = h.percentilesAt([50, 75, 90, 95, 99, 99.9]);
console.log('p50:', p.get(50));
console.log('p99:', p.get(99));
```

### Snapshot diffing with subtract

```js
const { createHistogram } = require('node:perf_hooks');

const total = createHistogram();
const snapshot = createHistogram();

// Record values into total...
// Periodically snapshot for "last interval" analysis:
snapshot.add(total);

// Later, take a new snapshot and diff:
const newSnapshot = createHistogram();
newSnapshot.add(total);
newSnapshot.subtract(snapshot);
// newSnapshot now contains only the values recorded since the last snapshot
console.log('Recent p99:', newSnapshot.percentile(99));
```

### Benchmark comparison with Welch's t-test

```js
const { createHistogram } = require('node:perf_hooks');

const baseline = createHistogram();
const candidate = createHistogram();

// Record operation rates from the old and new builds...

const result = baseline.welchTest(candidate);
const improvement = ((candidate.mean - baseline.mean) / baseline.mean * 100);

console.log(`Improvement: ${improvement.toFixed(2)}%`);
console.log(`p-value: ${result.pValue.toFixed(6)}`);
console.log(`95% CI: [${result.confidenceInterval.lower.toFixed(2)}, ` +
            `${result.confidenceInterval.upper.toFixed(2)}]`);

if (result.pValue < 0.05) {
  const d = baseline.cohensD(candidate);
  console.log(`Statistically significant (Cohen's d = ${d.toFixed(4)})`);
}
```

### Effect size with Cliff's delta

```js
const { createHistogram } = require('node:perf_hooks');

const before = createHistogram();
const after = createHistogram();

// Record latencies before and after a change...

const delta = before.cliffsD(after);
// A delta > 0: before tends to produce larger values (improvement)
// A delta < 0: after tends to produce larger values (regression)
console.log(`Cliff's delta: ${delta.toFixed(4)}`);
```

## Examples

### Measuring the duration of async operations

The following example uses the Async Hooks and Performance APIs to measure
the actual duration of a Timeout operation (including the amount of time it took
to execute the callback).

```mjs
import { createHook } from 'node:async_hooks';
import { performance, PerformanceObserver } from 'node:perf_hooks';

const set = new Set();
const hook = createHook({
  init(id, type) {
    if (type === 'Timeout') {
      performance.mark(`Timeout-${id}-Init`);
      set.add(id);
    }
  },
  destroy(id) {
    if (set.has(id)) {
      set.delete(id);
      performance.mark(`Timeout-${id}-Destroy`);
      performance.measure(`Timeout-${id}`,
                          `Timeout-${id}-Init`,
                          `Timeout-${id}-Destroy`);
    }
  },
});
hook.enable();

const obs = new PerformanceObserver((list, observer) => {
  console.log(list.getEntries()[0]);
  performance.clearMarks();
  performance.clearMeasures();
  observer.disconnect();
});
obs.observe({ entryTypes: ['measure'], buffered: true });

setTimeout(() => {}, 1000);
```

```cjs
const async_hooks = require('node:async_hooks');
const {
  performance,
  PerformanceObserver,
} = require('node:perf_hooks');

const set = new Set();
const hook = async_hooks.createHook({
  init(id, type) {
    if (type === 'Timeout') {
      performance.mark(`Timeout-${id}-Init`);
      set.add(id);
    }
  },
  destroy(id) {
    if (set.has(id)) {
      set.delete(id);
      performance.mark(`Timeout-${id}-Destroy`);
      performance.measure(`Timeout-${id}`,
                          `Timeout-${id}-Init`,
                          `Timeout-${id}-Destroy`);
    }
  },
});
hook.enable();

const obs = new PerformanceObserver((list, observer) => {
  console.log(list.getEntries()[0]);
  performance.clearMarks();
  performance.clearMeasures();
  observer.disconnect();
});
obs.observe({ entryTypes: ['measure'] });

setTimeout(() => {}, 1000);
```

### Measuring how long it takes to load dependencies

The following example measures the duration of `require()` operations to load
dependencies:

```mjs
import { performance, PerformanceObserver } from 'node:perf_hooks';

// Activate the observer
const obs = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  entries.forEach((entry) => {
    console.log(`import('${entry[0]}')`, entry.duration);
  });
  performance.clearMarks();
  performance.clearMeasures();
  obs.disconnect();
});
obs.observe({ entryTypes: ['function'], buffered: true });

const timedImport = performance.timerify(async (module) => {
  return await import(module);
});

await timedImport('some-module');
```

```cjs
const {
  performance,
  PerformanceObserver,
} = require('node:perf_hooks');
const mod = require('node:module');

// Monkey patch the require function
mod.Module.prototype.require =
  performance.timerify(mod.Module.prototype.require);
require = performance.timerify(require);

// Activate the observer
const obs = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  entries.forEach((entry) => {
    console.log(`require('${entry[0]}')`, entry.duration);
  });
  performance.clearMarks();
  performance.clearMeasures();
  obs.disconnect();
});
obs.observe({ entryTypes: ['function'] });

require('some-module');
```

### Measuring how long one HTTP round-trip takes

The following example is used to trace the time spent by HTTP client
(`OutgoingMessage`) and HTTP request (`IncomingMessage`). For HTTP client,
it means the time interval between starting the request and receiving the
response, and for HTTP request, it means the time interval between receiving
the request and sending the response:

```mjs
import { PerformanceObserver } from 'node:perf_hooks';
import { createServer, get } from 'node:http';

const obs = new PerformanceObserver((items) => {
  items.getEntries().forEach((item) => {
    console.log(item);
  });
});

obs.observe({ entryTypes: ['http'] });

const PORT = 8080;

createServer((req, res) => {
  res.end('ok');
}).listen(PORT, () => {
  get(`http://127.0.0.1:${PORT}`);
});
```

```cjs
const { PerformanceObserver } = require('node:perf_hooks');
const http = require('node:http');

const obs = new PerformanceObserver((items) => {
  items.getEntries().forEach((item) => {
    console.log(item);
  });
});

obs.observe({ entryTypes: ['http'] });

const PORT = 8080;

http.createServer((req, res) => {
  res.end('ok');
}).listen(PORT, () => {
  http.get(`http://127.0.0.1:${PORT}`);
});
```

### Measuring how long the `net.connect` (only for TCP) takes when the connection is successful

```mjs
import { PerformanceObserver } from 'node:perf_hooks';
import { connect, createServer } from 'node:net';

const obs = new PerformanceObserver((items) => {
  items.getEntries().forEach((item) => {
    console.log(item);
  });
});
obs.observe({ entryTypes: ['net'] });
const PORT = 8080;
createServer((socket) => {
  socket.destroy();
}).listen(PORT, () => {
  connect(PORT);
});
```

```cjs
const { PerformanceObserver } = require('node:perf_hooks');
const net = require('node:net');
const obs = new PerformanceObserver((items) => {
  items.getEntries().forEach((item) => {
    console.log(item);
  });
});
obs.observe({ entryTypes: ['net'] });
const PORT = 8080;
net.createServer((socket) => {
  socket.destroy();
}).listen(PORT, () => {
  net.connect(PORT);
});
```

### Measuring how long the DNS takes when the request is successful

```mjs
import { PerformanceObserver } from 'node:perf_hooks';
import { lookup, promises } from 'node:dns';

const obs = new PerformanceObserver((items) => {
  items.getEntries().forEach((item) => {
    console.log(item);
  });
});
obs.observe({ entryTypes: ['dns'] });
lookup('localhost', () => {});
promises.resolve('localhost');
```

```cjs
const { PerformanceObserver } = require('node:perf_hooks');
const dns = require('node:dns');
const obs = new PerformanceObserver((items) => {
  items.getEntries().forEach((item) => {
    console.log(item);
  });
});
obs.observe({ entryTypes: ['dns'] });
dns.lookup('localhost', () => {});
dns.promises.resolve('localhost');
```
