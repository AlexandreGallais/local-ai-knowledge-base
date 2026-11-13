---
title: "fileParallelism | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/fileparallelism.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# fileParallelism

- **Type:** `boolean`
- **Default:** `true`
- **CLI:** `--no-file-parallelism`, `--fileParallelism=false`

Should all test files run in parallel. Setting this to `false` will override `maxWorkers` option to `1`.

**Tip:**
This option doesn't affect tests running in the same file. If you want to run those in parallel, use `concurrent` option on describe or via a config.
