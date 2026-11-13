---
title: "Number.MIN_VALUE"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/number/min_value/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Number.MIN_VALUE

The **`Number.MIN_VALUE`** static data property represents the smallest positive numeric value representable in JavaScript.

```js
function divide(x, y) {
  if (x / y < Number.MIN_VALUE) {
    return "Process as 0";
  }
  return x / y;
}

console.log(divide(5e-324, 1));
// Expected output: 5e-324

console.log(divide(5e-324, 2));
// Expected output: "Process as 0"
```

## Value

2-1074, or `5E-324`.

## Description

`Number.MIN_VALUE` is the smallest positive number (not the most negative number) that can be represented within float precision — in other words, the number closest to 0. The ECMAScript spec doesn't define a precise value that implementations are required to support — instead the spec says, _"must be the smallest non-zero positive value that can actually be represented by the implementation"_. This is because small IEEE-754 floating point numbers are denormalized, but implementations are not required to support this representation, in which case `Number.MIN_VALUE` may be larger.

In practice, its precise value in mainstream engines like V8 (used by Chrome, Edge, Node.js), SpiderMonkey (used by Firefox), and JavaScriptCore (used by Safari) is 2-1074, or `5E-324`.

Because `MIN_VALUE` is a static property of `Number`, you always use it as `Number.MIN_VALUE`, rather than as a property of a number value.

## Examples

### Using MIN_VALUE

The following code divides two numeric values. If the result is greater than or equal to `MIN_VALUE`, the `func1` function is called; otherwise, the `func2` function is called.

```js
if (num1 / num2 >= Number.MIN_VALUE) {
  func1();
} else {
  func2();
}
```

## See also

- `Number.MAX_VALUE`
