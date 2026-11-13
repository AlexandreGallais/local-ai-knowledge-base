---
title: "maxWorkers | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/maxworkers.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# maxWorkers

- **Type:** `number | string`
- **Default:**
  - if `watch` is disabled, uses all available parallelism
  - if `watch` is enabled, uses half of all available parallelism

Defines the maximum concurrency for test workers. Accepts either a number or a percentage string.

- Number: spawns up to the specified number of workers.
- Percentage string (e.g., "50%"): computes the worker count as the given percentage of the machine’s available parallelism.

## Example

### Number

::: code-group

```js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    maxWorkers: 4,
  },
})
```

```bash
vitest --maxWorkers=4
```

### Percent

::: code-group

```js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    maxWorkers: '50%',
  },
})
```

```bash
vitest --maxWorkers=50%
```

Vitest uses `os.availableParallelism` to know the maximum amount of parallelism available.

## Browser Mode

In Browser Mode, every browser instance (a project with `browser.enabled`, or an entry in `browser.instances`) is a worker, so at most `maxWorkers` instances run at the same time. When another instance needs a slot, an idle headless instance is closed and opens again on its next run. An instance that is not headless stays open for the whole session, so its window is not closed between runs. The same number is the budget of pages shared by the open instances: a single instance runs up to `maxWorkers` test files in parallel in its own pages, and several instances split the budget between them, with at least one page each.

An instance runs a single test file at a time when the browser is not headless, or when the provider does not support parallelism.
