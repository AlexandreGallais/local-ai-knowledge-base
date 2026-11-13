---
title: "Benchmarking | Guide (part 2 of 2)"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/guide/benchmarking.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# Benchmarking | Guide (part 2 of 2)

## Stability

Benchmarks are inherently flaky: CPU load, thermal throttling, GC pressure, and background processes all affect results. Vitest takes several steps to minimize this noise:

- **Separate project**: Benchmark files are grouped into their own project based on the `benchmark.include` pattern. The `bench` fixture is only exposed in files matched by that pattern. Using it inside a regular test file will throw an error.
- **No concurrency**: Tests within a benchmark file always run sequentially. Benchmark files themselves also run one at a time, never in parallel. This prevents benchmarks from interfering with each other.

To further improve stability:

- Use the `retry` option to automatically rerun flaky benchmark assertions.
- Use the `delta` option in `toBeFasterThan` / `toBeSlowerThan` to allow for acceptable variance.
- Avoid running benchmarks alongside CPU-intensive processes.
- Close browsers, IDEs, and other applications that compete for CPU time.

### Dead Code Elimination

JavaScript engines can optimize away code that has no observable side effects. If your benchmark function doesn't use its result, the engine may skip the computation entirely, producing misleadingly fast numbers:

```ts
test('parsing', async ({ bench }) => {
  // BAD: the engine may eliminate the work
  await bench('parse', () => {
    JSON.parse(input)
  }).run()

  // GOOD: the result is consumed
  await bench('parse', () => {
    const result = JSON.parse(input)
    doSomething(result)
  }).run()
})
```

This applies to all engines (V8, JavaScriptCore, SpiderMonkey) but is especially aggressive in V8's TurboFan and JavaScriptCore's FTL compiler tiers.

### Module Runner Overhead

By default, Vitest runs tests in Node.js using Vite's module runner (configured by `experimental.viteModuleRunner`). This transforms all module exports into getters, so every access to an imported binding goes through something like `__vite_ssr_module__.value`. In regular tests this overhead is negligible, but in benchmarks where a function is called millions of times, the getter call itself can dominate the measurement.

Vitest will print a warning if it detects excessive getter calls (which you can silence via `benchmark.suppressExportGetterWarnings`), but you should be aware of this when benchmarking imported functions:

```ts
import { parse } from './parser.js'

const _parse = parse

test('parsing', async ({ bench }) => {
  // BAD: every call to `parse` goes through a getter
  await bench('parse', () => {
    parse(input)
  }).run()

  // GOOD: store the reference locally to bypass the getter
  await bench('parse', () => {
    _parse(input)
  }).run()
})
```

If you are the library author, the same overhead applies inside the library you are benchmarking: every cross-module call within its source goes through the same getter wrapper. If you are benchmarking your own library, you have two ways to remove this:

**Benchmark the pre-built artifact.** Import the library through its package name (which resolves to its built output) instead of reaching into its source. The built file has already collapsed internal imports into direct references, so Vite's module runner sees a single module with no internal getters:

```ts
// BAD: every internal call inside the library goes through a getter
import { parse } from '../src/index.ts'

// GOOD: the published entry has no internal getters
import { parse } from 'my-library'
```

If you compare your library against other packages, benchmark the same kind of artifact for every implementation. For workspace packages, make sure the package name resolves to the built output instead of source, for example by externalizing the package in Vite or by importing from `dist`.

**Disable the module runner for the benchmark.** If the benchmark does not need Vite transforms, mocks, or Vitest module interception, disable `experimental.viteModuleRunner` for the benchmark project so Node runs native ESM directly.

This only affects Node.js mode. Browser mode uses native ESM imports and does not have this overhead.

### Engine-Specific Considerations

#### V8 (Node.js, Chrome)

- **JIT tiering**: V8 compiles functions through multiple optimization tiers (Sparkplug → Maglev → TurboFan). A function may run at different speeds during warmup vs. steady-state. Tinybench handles warmup automatically, but very short benchmark runs may not reach the highest optimization tier.
- **Deoptimization**: V8 can "bail out" of optimized code mid-benchmark if it encounters unexpected types or shapes. Keep the types consistent in your benchmark function:

  ```ts
  test('process items', async ({ bench }) => {
    // BAD: mixed shapes cause deoptimization
    await bench('process', () => {
      for (const item of items) {
        // some items have { name: string }, others have { name: string, id: number }
        process(item)
      }
    }).run()

    // GOOD: consistent object shapes
    await bench('process', () => {
      for (const item of items) {
        // all items have the same shape { name: string, id: number }
        process(item)
      }
    }).run()
  })
  ```

- **Garbage collection**: Large allocations inside the benchmark loop add GC noise. If you're measuring computation, pre-allocate data in a `setup` hook rather than inside the benchmarked function:

  ```ts
  test('sorting', async ({ bench }) => {
    const original = Array.from({ length: 10000 }, () => Math.random())
    let data: number[]

    // BAD: allocates a new array every iteration, GC adds noise
    await bench('sort', () => {
      const data = Array.from({ length: 10000 }, () => Math.random())
      data.sort()
    }).run()

    // GOOD: pre-allocate, copy in beforeEach
    await bench(
      'sort',
      () => { data.sort() },
      {
        beforeEach() {
          data = [...original]
        },
      },
    ).run()
  })
  ```

#### JavaScriptCore (Bun, Safari)

- **Different optimization thresholds**: JSC uses its own JIT tiers (LLInt → Baseline → DFG → FTL) with different inlining and optimization heuristics. A benchmark that is fast on V8 may behave very differently on JSC.
- **Async benchmarks**: Bun's event loop implementation differs from Node.js. If your benchmark involves async operations or timers, results may not be directly comparable across runtimes.

#### Browser

- **Timer resolution**: Browsers may reduce `performance.now()` precision (e.g., to 100μs or even 1ms) as a security mechanism. This makes very fast operations difficult to measure accurately, so increase iterations to compensate:

  ```ts
  test('fast operations', async ({ bench }) => {
    await bench.compare(
      bench('fast-op', () => { fastOp() }),
      bench('other-op', () => { otherOp() }),
      {
        // more iterations help overcome low timer resolution
        iterations: 1000,
      },
    )
  })
  ```

- **Cross-browser differences**: V8 (Chrome), SpiderMonkey (Firefox), and JSC (Safari) optimize different patterns differently. A benchmark that shows one library winning in Chrome may show the opposite in Firefox.
