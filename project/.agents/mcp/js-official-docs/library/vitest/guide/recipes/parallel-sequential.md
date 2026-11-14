---
title: "Parallel and Sequential Test Files | Recipes"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/guide/recipes/parallel-sequential.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# Parallel and Sequential Test Files

Most test files are independent and run faster in parallel. The exception is the handful that share an exclusive resource, like a fixed port, a writable temp directory, or a database without per-test isolation. Those files flake when other tests run concurrently with them.

Disabling parallelism globally would slow down every test in the suite. Splitting the suite into two `projects`, one parallel and one sequential, lets only the affected files pay the cost.

## Pattern

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'Parallel',
          exclude: ['**.sequential.test.ts'],
        },
      },
      {
        test: {
          name: 'Sequential',
          include: ['**.sequential.test.ts'],
          fileParallelism: false,
        },
      },
    ],
  },
})
```

`fileParallelism: false` at the project level keeps the rest of your suite running concurrently while the matched files run one at a time. It's a shorthand for `maxWorkers: 1`; the two settings are equivalent.

## Run sequential after parallel

By default, projects run in parallel with each other, so the sequential project's first file may overlap with parallel files that still hold the same resource. Use `sequence.groupOrder` <Version>3.2.0</Version> to force the parallel batch to finish first:

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'Parallel',
          exclude: ['**.sequential.test.ts'],
          sequence: { groupOrder: 0 },
        },
      },
      {
        test: {
          name: 'Sequential',
          include: ['**.sequential.test.ts'],
          fileParallelism: false,
          sequence: { groupOrder: 1 },
        },
      },
    ],
  },
})
```

The parallel batch finishes, _then_ the sequential batch starts. Total wall clock stays close to the parallel time plus sum of the sequential test run time.

## File scope vs. test scope

There are two different "parallel" knobs in Vitest. Don't confuse them:

| Scope         | Knob                                         | Controls                                         |
| ------------- | -------------------------------------------- | ------------------------------------------------ |
| Across files  | `fileParallelism` | Whether two test _files_ run in parallel workers |
| Within a file | `describe.concurrent` / `test.concurrent`    | Whether tests _inside one file_ run concurrently |

`fileParallelism: false` doesn't make tests inside a file concurrent; tests inside a file are sequential by default. And `concurrent` on a `describe` or `test` doesn't affect how files are scheduled.

## See also

- `fileParallelism`
- `maxWorkers`
- `sequence.groupOrder`
- Parallelism
- Test Projects
- Per-File Isolation Settings
