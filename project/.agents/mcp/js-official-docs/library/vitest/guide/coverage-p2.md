---
title: "Coverage | Guide (part 2 of 2)"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/guide/coverage.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# Coverage | Guide (part 2 of 2)

## Coverage in Agent Environments

When Vitest detects it is running inside an AI coding agent, it automatically adjusts the default `text` reporter to reduce output and minimize token usage:

- `skipFull: true` is set on the `text` reporter, so files with 100% coverage are omitted from the terminal output.
- The `text-summary` reporter is added automatically, so the agent always sees a concise totals table even when `skipFull` hides all individual files.

These adjustments only apply when the `text` reporter is already part of the active reporter list (it is included in the default). Explicitly configured reporters are never removed.
