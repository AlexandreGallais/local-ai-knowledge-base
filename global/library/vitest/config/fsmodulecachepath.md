---
title: "fsModuleCachePath | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/fsmodulecachepath.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# fsModuleCachePath <Version>5.0.0</Version>

- **Type:** `string`
- **Default:** `'node_modules/.vitest-cache'` (resolved from the workspace root)
- **CLI:** `--fsModuleCachePath=`

Directory where the `fsModuleCache` is stored.

This can be set per project; projects that don't override it fall back to the root's cache directory. The lockfile metadata used to invalidate the cache is always shared across the whole workspace.

By default Vitest stores the cache inside `node_modules` at the workspace root. The root is based on your package manager's lockfile (for example, `.package-lock.json`, `.yarn-state.yml`, `.pnpm/lock.yaml` and so on). Keeping it inside `node_modules` means the cache is naturally invalidated whenever dependencies are reinstalled.

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    fsModuleCache: true,
    fsModuleCachePath: 'node_modules/.vitest-cache',
  },
})
```
