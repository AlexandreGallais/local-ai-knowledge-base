---
title: "JS Self-Profiling API"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/js_self-profiling_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# JS Self-Profiling API

The JS Self-Profiling API enables a website to run a sampling profiler, to understand where it is spending JavaScript execution time.

## Concepts and usage

To start a profile, a website creates a `Profiler` instance. As soon as the instance is created, it starts sampling the JavaScript execution context.

To stop collecting samples and retrieve the profile, the website calls `Profiler.stop()`. This returns a `Promise` which resolves to an object containing the profile data.

For example, the following function creates a profiler, then calls a function `genPrimes()`, then stops the profiler and retrieves the profile data:

```js
async function profileGeneratePrimes() {
  const profiler = new Profiler({ sampleInterval: 10, maxBufferSize: 10000 });

  genPrimes();

  const trace = await profiler.stop();
  console.log(trace);
}
```

The profiler is a _sampling profiler_: this means that it periodically records (or _samples_) the current state of the JavaScript call stack. The profile consists of the collection of these samples. This enables you to understand where, statistically, the program is spending most of its time.

To understand exactly what a profile contains and how it is formatted, see Profile anatomy and format.

### Profiling best practices

Collecting and processing profile data incurs a performance overhead of its own, and developers should be careful to manage this. Practices to minimize performance overhead include:

- Use the `maxBufferSize` and `sampleInterval` options to control how many samples to take and how often to sample.
- Sample for short periods in a sampled manner: for example, trace for 5 seconds out of every 60 seconds.
- Process the samples in a web worker to avoid impacting performance on the main thread.
- Aggregate samples on the client before sending them to a telemetry endpoint.

If the JavaScript in your site is minified, you will need to transform the profile data based on a source map, either on the client or on the server, before the data will be usable.

## Interfaces

- `Profiler` (experimental)
    The `Profiler` interface is used to create profiles.

## Security requirements

To use this API, the document must be served with a document policy that includes the `"js-profiling"` configuration point.
