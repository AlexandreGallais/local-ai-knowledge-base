---
title: "watch | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/watch.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# watch <CRoot /> {#watch}

- **Type:** `boolean`
- **Default:** `!process.env.CI && process.stdin.isTTY`, and `false` when Vitest detects an AI coding agent
- **CLI:** `-w`, `--watch`, `--watch=false`

Enable watch mode

In interactive environments, this is the default, unless `--run` is specified explicitly.

In CI, or when run from a non-interactive shell, "watch" mode is not the default, but can be enabled explicitly with this flag.
