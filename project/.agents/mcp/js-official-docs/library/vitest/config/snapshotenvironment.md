---
title: "snapshotEnvironment | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/snapshotenvironment.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# snapshotEnvironment

- **Type:** `string`

Path to a custom snapshot environment implementation. This is useful if you are running your tests in an environment that doesn't support Node.js APIs. This option doesn't have any effect on a browser runner.

This object should have the shape of `SnapshotEnvironment` and is used to resolve and read/write snapshot files:

```ts
export interface SnapshotEnvironment {
  getVersion: () => string
  getHeader: () => string
  resolvePath: (filepath: string) => Promise<string>
  resolveRawPath: (testPath: string, rawPath: string) => Promise<string>
  saveSnapshotFile: (filepath: string, snapshot: string) => Promise<void>
  readSnapshotFile: (filepath: string) => Promise<string | null>
  removeSnapshotFile: (filepath: string) => Promise<void>
}
```

You can extend default `VitestSnapshotEnvironment` from `vitest/snapshot` entry point if you need to overwrite only a part of the API.

**Warning:**
This is a low-level option and should be used only for advanced cases where you don't have access to default Node.js APIs.

If you just need to configure snapshots feature, use `snapshotFormat` or `resolveSnapshotPath` options.
