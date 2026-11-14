---
title: "update | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/update.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# update <CRoot /> {#update}

- **Type:** `boolean | 'new' | 'all' | 'none'`
- **Default:** `false`
- **CLI:** `-u`, `--update`, `--update=false`, `--update=new`, `--update=none`

Define snapshot update behavior.

- `true` or `'all'`: updates all changed snapshots and deletes obsolete ones
- `new`: generates new snapshots without changing or deleting obsolete ones
- `none`: does not write snapshots and fails on snapshot mismatches, missing snapshots, and obsolete snapshots

When `update` is `false` (the default), Vitest resolves snapshot update mode by environment:

- Local runs (non-CI): works same as `new`
- CI runs (`process.env.CI` is truthy): works same as `none`
