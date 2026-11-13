---
title: "Number.isFinite()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/number/isfinite/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Number.isFinite()

The **`Number.isFinite()`** static method determines whether the passed value is a finite number — that is, it checks that a given value is a number, and the number is neither positive `Infinity`, negative `Infinity`, nor `NaN`.

```js
console.log(Number.isFinite(1 / 0));
// Expected output: false

console.log(Number.isFinite(10 / 5));
// Expected output: true

console.log(Number.isFinite(0 / 0));
// Expected output: false
```

## Syntax

```js
Number.isFinite(value)
```

### Parameters

- `value`
    The value to be tested for finiteness.

### Return value

The boolean value `true` if the given value is a finite number. Otherwise `false`.

## Examples

### Using isFinite()

```js
Number.isFinite(Infinity); // false
Number.isFinite(NaN); // false
Number.isFinite(-Infinity); // false

Number.isFinite(0); // true
Number.isFinite(2e64); // true
```

### Difference between Number.isFinite() and global isFinite()

In comparison to the global `isFinite()` function, this method doesn't first convert the parameter to a number. This means only values of the type number _and_ are finite return `true`, and non-numbers always return `false`.

```js
isFinite("0"); // true; coerced to number 0
Number.isFinite("0"); // false
isFinite(null); // true; coerced to number 0
Number.isFinite(null); // false
```

## See also

- Polyfill of `Number.isFinite` in `core-js`
- es-shims polyfill of `Number.isFinite`
- `Number`
- `isFinite()`
