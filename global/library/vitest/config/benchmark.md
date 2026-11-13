---
title: "benchmark | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/benchmark.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# benchmark <Experimental /> {#benchmark}

- **Type:** `{ include?, exclude?, ... }`

Options used when running `vitest bench`.

## benchmark.enabled

- **Type:** `boolean`
- **Default:** `false`

Enables the benchmark project. When set, Vitest creates a dedicated benchmark project alongside your regular test project, runs files matching `benchmark.include` in it, and exposes the `bench` fixture to those files. Running `vitest bench` enables this automatically.

## benchmark.include

- **Type:** `string[]`
- **Default:** `['**/*.{bench,benchmark}.?(c|m)[jt]s?(x)']`

Include globs for benchmark test files

## benchmark.exclude

- **Type:** `string[]`
- **Default:** `['**/node_modules/**', '**/.git/**']`

Exclude globs for benchmark test files

## benchmark.includeSource

- **Type:** `string[]`
- **Default:** `[]`

Include globs for in-source benchmark test files. This option is similar to `includeSource`.

When defined, Vitest will run all matched files with `import.meta.vitest` inside.

## benchmark.retainSamples

- **Type:** `boolean`
- **Default:** `false`

Include the `samples` array of per-iteration timings on every benchmark result. Disabled by default to reduce memory usage; enable when a custom reporter or API consumer needs the raw samples.

## benchmark.provider

- **Type:** `string`
- **Default:** `undefined` (uses the built-in provider)

The benchmark provider that executes registered benchmarks and returns their results. Set this to a module path whose default export implements `BenchmarkProvider`. Relative paths are resolved from the project root.

See the Custom Benchmark Provider guide for setup instructions and the provider API.

## benchmark.suppressExportGetterWarnings

- **Type:** `boolean`
- **Default:** `false`

Suppress the warning printed when a benchmark accesses module export getters too many times. Vitest tracks getter access during benchmark runs because Vite's module runner wraps every export in a getter, and excessive access can dominate the measurement (see Module Runner Overhead). Enable this when you've intentionally accepted the overhead, or when the warning is noisy for benchmarks where the getter cost is negligible.
