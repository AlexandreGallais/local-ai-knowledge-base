---
title: "expect | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/expect.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# expect

- **Type:** `ExpectOptions`

## expect.requireAssertions

- **Type:** `boolean`
- **Default:** `false`

The same as calling `expect.hasAssertions()` at the start of every test. This makes sure that no test will pass accidentally.

**Tip:**
This only works with Vitest's `expect`. If you use `assert` or `.should` assertions, they will not count, and your test will fail due to the lack of expect assertions.

You can change the value of this by calling `vi.setConfig({ expect: { requireAssertions: false } })`. The config will be applied to every subsequent `expect` call until the `vi.resetConfig` is called manually.

**Warning:**
When you run tests with `sequence.concurrent` and `expect.requireAssertions` set to `true`, you should use local expect instead of the global one. Otherwise, this may cause false negatives in some situations (#8469).

## expect.poll

Global configuration options for `expect.poll`. These are the same options you can pass down to `expect.poll(condition, options)`.

### expect.poll.interval

- **Type:** `number`
- **Default:** `50`

Polling interval in milliseconds

### expect.poll.timeout

- **Type:** `number`
- **Default:** `1000`

Polling timeout in milliseconds
