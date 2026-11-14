---
title: "Benchmarking | Guide (part 1 of 2)"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/guide/benchmarking.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# Benchmarking

Vitest lets you write benchmarks alongside your tests using the `bench` fixture from the test context. The built-in benchmark provider is powered by Tinybench, and benchmarks are defined inside regular `test()` calls, giving you access to the full power of Vitest's test runner: retries, lifecycle hooks, filtering, and assertions.

## Defining a Benchmark

Use the `bench` fixture to define a benchmark. Call `.run()` to execute it:

```ts
import { test } from 'vitest'

test('parsing performance', async ({ bench }) => {
  await bench('parse', () => {
    JSON.parse('{"key":"value"}')
  }).run()
})
```

The `bench()` function registers a benchmark without executing it. Calling `.run()` runs the benchmark and returns the result. After the test completes, Vitest prints a single-row version of the comparison table (ops/sec, mean time, percentiles, etc.), so you get the same output for a one-off benchmark as you do for `bench.compare()`.

**Warning:**
The `bench` fixture is only available in files matched by `benchmark.include` (default: `**/*.{bench,benchmark}.?(c|m)[jt]s?(x)`). Using `{ bench }` inside a regular test file will throw an error.

Whether a file participates in the benchmark run is decided by the filename, not by whether the test uses the `bench` fixture. Renaming `parser.test.ts` to `parser.bench.ts` (or adjusting `benchmark.include`) is what moves it into the benchmark project.

## Running Benchmarks

Benchmark files are matched by `benchmark.include` (default: `**/*.{bench,benchmark}.?(c|m)[jt]s?(x)`) and run in their own project, separate from your regular tests. There are three ways to run them, depending on whether you want to skip them, run them alongside tests, or run them on their own.

### `vitest` (default)

Without `benchmark.enabled`, the `vitest` command only runs regular tests. Benchmark files are ignored entirely. This is the default and the right choice for day-to-day development, since benchmarks are slow and noisy and shouldn't run on every save.

### `vitest` with `benchmark.enabled`

Set `benchmark.enabled: true` in your config to run benchmarks together with regular tests:

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    benchmark: {
      enabled: true,
    },
  },
})
```

With this config, `vitest` runs your regular tests first, then runs the benchmarks in a separate isolated group (so benchmark execution never overlaps with test execution and adds noise to results). Useful in CI when you want a single command to validate correctness and performance.

### `vitest bench`

The `bench` subcommand runs only benchmarks and skips regular tests:

```bash
vitest bench
```

This implicitly enables `benchmark.enabled` for the run, so you don't need to set it in the config. Like the `vitest` command, it accepts filename filters and `-t`/`--testNamePattern` to narrow the run:

```bash
# only benchmarks in files matching "parser"
vitest bench parser

# only benchmarks whose test name matches "JSON"
vitest bench -t JSON
```

To execute benchmarks with another benchmarking engine or execution strategy, see the Custom Benchmark Provider guide.

## Comparing Benchmarks

Use `bench.compare()` to compare multiple benchmarks against each other:

```ts
import { test } from 'vitest'

test('compare JSON libraries', async ({ bench }) => {
  const input = '{"key":"value","nested":{"a":1}}'

  await bench.compare(
    bench('JSON.parse', () => {
      JSON.parse(input)
    }),
    bench('custom parser', () => {
      customParse(input)
    }),
  )
})
```

When comparing benchmarks, Vitest runs them using interleaved iterations to reduce environmental bias (CPU throttling, GC pressure, etc.) and prints a comparison table after the test completes:

<<< ./snippets/benchmark-table.ansi

### Options

You can pass <example-value> as the last argument to `bench.compare()`:

```ts
test('compare with options', async ({ bench }) => {
  await bench.compare(
    bench('lib1', () => { lib1() }),
    bench('lib2', () => { lib2() }),
    {
      iterations: 100,
      time: 1000,
    },
  )
})
```

You can also pass <example-value> options as the second argument, matching how `test()` accepts options:

```ts
test('benchmarks with setup', async ({ bench }) => {
  await bench.compare(
    bench('with-cache', () => {
      readFromCache()
    }),
    bench(
      'without-cache',
      { beforeEach: () => clearCache() },
      () => { readFromDisk() },
    ),
  )
})
```

## Comparing Across Projects

When your workspace defines multiple projects (e.g., different browsers or runtimes), pass `perProject: true` in the bench options to compare how the same benchmark performs across all of them. Vitest still prints the result inline for the current project, and additionally collects per-project results into a single comparison table at the end of the test run.

```ts
import { test } from 'vitest'

test('simple example', async ({ bench }) => {
  await bench('1 + 1', { perProject: true }, () => {
    1 + 1
  }).run()
})
```

The same test file runs in each project (chromium, firefox, webkit, etc.), and Vitest groups the results:

<<< ./snippets/benchmark-per-project.ansi

You can also mix `perProject` benchmarks with regular ones inside `bench.compare()`:

```ts
test('compare implementations across browsers', async ({ bench }) => {
  await bench.compare(
    bench('JSON.parse', { perProject: true }, () => {
      JSON.parse('{"key":"value"}')
    }),
    bench('custom parser', () => {
      customParse('{"key":"value"}')
    }),
  )
})
```

In this case, `custom parser` appears in the normal inline comparison table per project, while `JSON.parse` is additionally collected into the cross-project comparison table at the end.

## Asserting Performance

Use `toBeFasterThan()` and `toBeSlowerThan()` matchers to assert relative performance between benchmarks:

```ts
import { expect, test } from 'vitest'

test('lib1 is faster than lib2', async ({ bench }) => {
  const result = await bench.compare(
    bench('lib1', () => { lib1() }),
    bench('lib2', () => { lib2() }),
  )

  expect(result.get('lib1')).toBeFasterThan(result.get('lib2'))
})
```

The `delta` option specifies the minimum relative difference required for the assertion to pass. This helps avoid flaky tests caused by benchmark noise:

```ts
// lib1 must be at least 10% faster than lib2
expect(result.get('lib1')).toBeFasterThan(result.get('lib2'), {
  delta: 0.1,
})

// lib2 must be at least 20% slower than lib1
expect(result.get('lib2')).toBeSlowerThan(result.get('lib1'), {
  delta: 0.2,
})
```

You can also assert absolute performance using standard matchers:

```ts
test('parsing is fast enough', async ({ bench }) => {
  const result = await bench('parse', () => {
    parse(largeInput)
  }).run()

  expect(result.throughput.mean).toBeGreaterThan(10_000)
})
```

## Retries

Since benchmarks can be noisy, use the `retry` option to automatically retry failing benchmark tests:

```ts
test('performance comparison', { retry: 3 }, async ({ bench }) => {
  const result = await bench.compare(
    bench('lib1', () => { lib1() }),
    bench('lib2', () => { lib2() }),
  )

  expect(result.get('lib1')).toBeFasterThan(result.get('lib2'))
})
```

## Storing and Replaying Results

Two primitives let you persist benchmark results to disk and compare against them in future runs: the `writeResult` option saves a result, and `bench.from()` reads one back.

### `writeResult`

Pass `writeResult` as a per-bench option to write the result to a JSON file every time the benchmark runs. The path is resolved against the project root:

```ts
test('parse', async ({ bench }) => {
  await bench(
    'parse',
    { writeResult: './benchmarks/parse.json' },
    () => parse(largeInput),
  ).run()
})
```

- The benchmark always runs. There is no skip-when-cached behaviour and no CLI flag, the file is overwritten on every successful run.
- If the function throws, the file is not written.
- Commit these files alongside your code so reviewers and CI share the same reference points.

**Warning:**
If you commit these files, keep in mind that benchmark results vary significantly between environments (developer machines, CI runners, different OSes). Designate a single environment (typically CI) to generate the file, and avoid regenerating it locally.

### `bench.from()`

`bench.from(name, source)` is a registration that doesn't execute a function. It reads a previously stored result and feeds it into `bench.compare()` (or returns it directly when you call `.run()`).

The source can be a path (relative to the project root) or a function that returns the result data, including a Promise:

```ts
test('compare against the stored baseline', async ({ bench }) => {
  const result = await bench.compare(
    bench(
      'current',
      { writeResult: './benchmarks/parse.json' },
      () => parse(largeInput),
    ),
    bench.from('previous', './benchmarks/parse.json'),
    bench.from('remote', () => fetch('https://path/to/external/file.json').then(r => r.json())),
  )

  expect(result.get('current')).toBeFasterThan(result.get('previous'))
})
```

You can keep historical artifacts for older versions and compare them against the current implementation. Because `bench.from()` never invokes the function that produced the file, the original benchmark code can be deleted once the artifact is committed:

```ts
test('compare parser versions', async ({ bench }) => {
  const input = '{"key":"value"}'

  await bench.compare(
    bench.from('v1', './benchmarks/parse.v1.json'),
    bench.from('v2', './benchmarks/parse.v2.json'),
    bench(
      'current',
      { writeResult: './benchmarks/parse.current.json' },
      () => customParser(input),
    ),
  )
})
```

To produce a new historical artifact, point a fresh `bench()` at that version's implementation, set `writeResult` to a versioned path (`./benchmarks/parse.v3.json`), run it once, then replace the call with `bench.from('v3', './benchmarks/parse.v3.json')`.

To regenerate the baseline on demand, gate the write behind an environment variable so the same test either refreshes the artifact or compares against it:

```ts
test('compare parser versions', async ({ bench }) => {
  if (import.meta.env.VITE_WRITE_BENCH) {
    const baseline = bench('baseline', { writeResult: './my-bench.json' }, () => fn())
    await baseline.run()
  }
  else {
    const baseline = bench.from('baseline', './my-bench.json')
    await bench.compare(bench('current', () => fn()), baseline)
  }
})
```

Run `VITE_WRITE_BENCH=1 vitest bench` to refresh the stored result, and `vitest bench` to compare the current implementation against it.

### Per-project artifacts

In a multi-project workspace (different browsers, different runtimes), share one benchmark file across projects by including `${projectName}` in the path. The placeholder is substituted with the current project name at write time:

```ts
test('cross-project baseline', async ({ bench }) => {
  await bench(
    'parse',
    { perProject: true, writeResult: './benchmarks/parse.${projectName}.json' },
    () => parse(largeInput),
  ).run()
})
```

Use the same template in `bench.from()` so each project reads its own artifact.
