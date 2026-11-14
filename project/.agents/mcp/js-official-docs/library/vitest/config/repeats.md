---
title: "repeats | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/repeats.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# repeats

- **Type:** `number`
- **Default:** `0`
- **CLI:** `--repeats=<number>`

Repeat every test a specific number of times regardless of the result. A test that uses the `repeats` test option takes precedence over this value.

This is useful for verifying that tests are stable across multiple runs. If a test fails on any repetition, the whole test is reported as failed.
