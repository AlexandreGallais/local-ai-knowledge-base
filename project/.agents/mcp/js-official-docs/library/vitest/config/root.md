---
title: "root | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/root.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# root

- **Type:** `string`
- **CLI:** `-r `, `--root=`

Project root. A relative path is resolved against the current working directory, except in projects: a project config file resolves it against its own directory, and an inline project resolves it against the root of the config that declares it.
