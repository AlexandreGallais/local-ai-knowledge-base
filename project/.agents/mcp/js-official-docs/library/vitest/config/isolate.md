---
title: "isolate | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/isolate.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# isolate

- **Type:** `boolean`
- **Default:** `true`
- **CLI:** `--no-isolate`, `--isolate=false`

Run tests in an isolated environment. This option has no effect on `vmThreads` and `vmForks` pools.

Disabling this option might improve performance if your code doesn't rely on side effects (which is usually true for projects with `node` environment).

**Tip:**
You can disable isolation for specific test files by using Vitest workspaces and disabling isolation per project.
