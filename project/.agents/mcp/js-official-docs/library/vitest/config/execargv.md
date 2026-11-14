---
title: "execArgv | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/execargv.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# execArgv

- **Type:** `string[]`
- **Default:** `[]`

Pass <example-value> arguments to `node` in the runner worker. See Command-line API | Node.js for more information.

**Warning:**
Be careful when using, it as some options may crash worker, e.g. `--prof`, `--title`. See https://github.com/nodejs/node/issues/41103.
