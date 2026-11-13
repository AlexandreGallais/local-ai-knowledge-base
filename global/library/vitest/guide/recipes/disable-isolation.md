---
title: "Per-File Isolation Settings | Recipes"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/guide/recipes/disable-isolation.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# Per-File Isolation Settings

By default, every test file runs in its own isolated module graph, which protects against one file leaking state into another. That isolation costs setup time on every file, which is fine for integration tests that genuinely need it and wasted on pure unit tests that don't share mutable state.

Use `projects` to apply `isolate: false` to the unit suite while keeping the integration suite isolated.

## Pattern

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          // Non-isolated unit tests
          name: 'Unit tests',
          isolate: false,
          exclude: ['**.integration.test.ts'],
        },
      },
      {
        test: {
          // Isolated integration tests
          name: 'Integration tests',
          include: ['**.integration.test.ts'],
        },
      },
    ],
  },
})
```

## When isolation matters

A test file is safe to deisolate when it does not:

- mutate module-level state (counters, caches, top-level `let` bindings)
- call `vi.stubGlobal` or `vi.stubEnv`
- monkey-patch prototypes (`Date.prototype`, `Array.prototype`, …)
- register listeners on `process` or other long-lived emitters
- depend on a fresh module instance for `vi.mock` factories

If any of those apply, isolation is doing real work and should stay on.

## Verifying it's safe

Run the suite twice with shuffling to surface inter-file pollution:

```sh
vitest --shuffle --run --project='Unit tests'
vitest --shuffle --run --project='Unit tests'
```

If the second run produces different results, you have order-dependent tests. Either fix the offender or leave isolation enabled for that file.

## Per-pool isolation

`isolate` only governs the `threads` and `forks` pools. The `vmThreads` and `vmForks` pools always run isolated regardless of the flag, since they trade startup cost for stronger guarantees.

## See also

- `isolate`
- Test Projects
- Improving Performance
- Parallel and Sequential Test Files
