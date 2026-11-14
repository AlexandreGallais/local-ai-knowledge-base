---
title: "chaiConfig | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/chaiconfig.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# chaiConfig

- **Type:** `{ includeStack?, showDiff?, truncateThreshold? }`
- **Default:** `{ includeStack: false, showDiff: true, truncateThreshold: 40 }`

Equivalent to Chai config.

## chaiConfig.includeStack

- **Type:** `boolean`
- **Default:** `false`

Influences whether stack trace is included in Assertion error message. Default of false suppresses stack trace in the error message.

## chaiConfig.showDiff

- **Type:** `boolean`
- **Default:** `true`

Influences whether or not the `showDiff` flag should be included in the thrown AssertionErrors. `false` will always be `false`; `true` will be true when the assertion has requested a diff to be shown.

## chaiConfig.truncateThreshold

- **Type:** `number`
- **Default:** `40`

Sets length threshold for actual and expected values in assertion error messages. If this threshold is exceeded, for example for large data structures, the value is replaced with something like `[ Array(3) ]` or `{ Object (prop1, prop2) }`. Set it to `0` if you want to disable truncating altogether.
