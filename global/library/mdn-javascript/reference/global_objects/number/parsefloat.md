---
title: "Number.parseFloat()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/number/parsefloat/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Number.parseFloat()

The **`Number.parseFloat()`** static method parses an argument and returns a floating point number. If a number cannot be parsed from the argument, it returns `NaN`.

```js
function circumference(r) {
  if (Number.isNaN(Number.parseFloat(r))) {
    return 0;
  }
  return parseFloat(r) * 2.0 * Math.PI;
}

console.log(circumference("4.567abcdefgh"));
// Expected output: 28.695307297889173

console.log(circumference("abcdefgh"));
// Expected output: 0
```

## Syntax

```js
Number.parseFloat(string)
```

### Parameters

- `string`
    The value to parse, coerced to a string. Leading whitespace in this argument is ignored.

### Return value

A floating point number parsed from the given `string`.

Or `NaN` when the first non-whitespace character cannot be converted to a number.

## Examples

### Number.parseFloat vs. parseFloat

This method has the same functionality as the global `parseFloat()` function:

```js
Number.parseFloat === parseFloat; // true
```

Its purpose is modularization of globals.

See `parseFloat()` for more detail and examples.

## See also

- Polyfill of `Number.parseFloat` in `core-js`
- es-shims polyfill of `Number.parseFloat`
- `Number`
- `parseFloat()`
