---
title: "RangeError: BigInt division by zero"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/bigint_division_by_zero/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RangeError: BigInt division by zero

The JavaScript exception "BigInt division by zero" occurs when a `BigInt` is divided by `0n`.

## Message

```plain
RangeError: Division by zero (V8-based)
RangeError: BigInt division by zero (Firefox)
RangeError: 0 is an invalid divisor value. (Safari)
```

## Error type

`RangeError`.

## What went wrong?

The divisor of a division or remainder operator is `0n`. In `Number` arithmetic, this produces `Infinity`, but there's no "infinity value" in BigInts, so an error is issued. Check if the divisor is `0n` before doing the division.

## Examples

### Division by 0n

```js
const a = 1n;
const b = 0n;
const quotient = a / b;
// RangeError: BigInt division by zero
```

Instead, check if the divisor is `0n` first, and either issue an error with a better message, or fall back to a different value, like `Infinity` or `undefined`.

```js
const a = 1n;
const b = 0n;
const quotient = b === 0n ? undefined : a / b;
```

## See also

- `BigInt`
- Division (`/`)
- Remainder (`%`)
