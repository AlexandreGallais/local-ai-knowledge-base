---
title: "Number.parseInt()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/number/parseint/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Number.parseInt()

The **`Number.parseInt()`** static method parses a string argument and
returns an integer of the specified radix or base.

```js
function roughScale(x, base) {
  const parsed = Number.parseInt(x, base);
  if (Number.isNaN(parsed)) {
    return 0;
  }
  return parsed * 100;
}

console.log(roughScale(" 0xF", 16));
// Expected output: 1500

console.log(roughScale("321", 2));
// Expected output: 0
```

## Syntax

```js
Number.parseInt(string)
Number.parseInt(string, radix)
```

### Parameters

- `string`
    The value to parse, coerced to a string. Leading whitespace in this argument is ignored.
- `radix` (optional)
    An integer between `2` and `36` that represents the
    _radix_ (the base in mathematical numeral systems) of the
    `string`.

    If `radix` is undefined or `0`, it is assumed to be `10` except when the number begins with the code unit pairs `0x` or `0X`, in which case a radix of `16` is assumed.

### Return value

An integer parsed from the given `string`.

If the `radix` is smaller than `2` or bigger than
`36`, or the first non-whitespace character cannot be converted to a number,
`NaN` is returned.

## Examples

### Number.parseInt vs. parseInt

This method has the same functionality as the global `parseInt()` function:

```js
Number.parseInt === parseInt; // true
```

Its purpose is modularization of globals. Please see
`parseInt()` for more detail and examples.

## See also

- Polyfill of `Number.parseInt` in `core-js`
- es-shims polyfill of `Number.parseInt`
- `Number`
- `parseInt()`
