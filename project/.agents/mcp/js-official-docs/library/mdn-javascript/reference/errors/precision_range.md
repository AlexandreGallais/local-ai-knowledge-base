---
title: "RangeError: precision is out of range"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/precision_range/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RangeError: precision is out of range

The JavaScript exception "precision is out of range" occurs when a number that's
outside of the allowed range was passed into `toExponential`, `toFixed`, or `toPrecision`.

## Message

```plain
RangeError: toExponential() argument must be between 0 and 100 (V8-based & Safari)
RangeError: toFixed() digits argument must be between 0 and 100 (V8-based & Safari)
RangeError: toPrecision() argument must be between 1 and 100 (V8-based & Safari)
RangeError: precision -1 out of range (Firefox)
```

## Error type

`RangeError`

## What went wrong?

There was an out of range precision argument in one of these methods:

- `Number.prototype.toExponential()`, which requires the arguments to be between 0 and 100, inclusive.
- `Number.prototype.toFixed()`, which requires the arguments to be between 0 and 100, inclusive.
- `Number.prototype.toPrecision()`, which requires the arguments to be between 1 and 100, inclusive.

## Examples

### Invalid cases

```js
(77.1234).toExponential(-1); // RangeError
(77.1234).toExponential(101); // RangeError

(2.34).toFixed(-100); // RangeError
(2.34).toFixed(1001); // RangeError

(1234.5).toPrecision(-1); // RangeError
(1234.5).toPrecision(101); // RangeError
```

### Valid cases

```js
(77.1234).toExponential(4); // 7.7123e+1
(77.1234).toExponential(2); // 7.71e+1

(2.34).toFixed(1); // 2.3
(2.35).toFixed(1); // 2.4 (note that it rounds up in this case)

(5.123456).toPrecision(5); // 5.1235
(5.123456).toPrecision(2); // 5.1
(5.123456).toPrecision(1); // 5
```

## See also

- `Number.prototype.toExponential()`
- `Number.prototype.toFixed()`
- `Number.prototype.toPrecision()`
