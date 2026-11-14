---
title: "Nullish coalescing assignment (??=)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/operators/nullish_coalescing_assignment/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Nullish coalescing assignment (??=)

The **nullish coalescing assignment (`??=`)** operator, also known as the **logical nullish assignment** operator, only evaluates the right operand and assigns to the left if the left operand is nullish (`null` or `undefined`).

```js
const a = { duration: 50 };

a.speed ??= 25;
console.log(a.speed);
// Expected output: 25

a.duration ??= 10;
console.log(a.duration);
// Expected output: 50
```

## Syntax

```js
x ??= y
```

## Description

Nullish coalescing assignment _short-circuits_, meaning that `x ??= y` is equivalent to `x ?? (x = y)`, except that the expression `x` is only evaluated once.

No assignment is performed if the left-hand side is not nullish, due to short-circuiting of the nullish coalescing operator. For example, the following does not throw an error, despite `x` being `const`:

```js
const x = 1;
x ??= 2;
```

Neither would the following trigger the setter:

```js
const x = {
  get value() {
    return 1;
  },
  set value(v) {
    console.log("Setter called");
  },
};

x.value ??= 2;
```

In fact, if `x` is not nullish, `y` is not evaluated at all.

```js
const x = 1;
x ??= console.log("y evaluated");
// Logs nothing
```

## Examples

### Using nullish coalescing assignment

You can use the nullish coalescing assignment operator to apply default values to object properties. Compared to using destructuring and default values, `??=` also applies the default value if the property has value `null`.

```js
function config(options) {
  options.duration ??= 100;
  options.speed ??= 25;
  return options;
}

config({ duration: 125 }); // { duration: 125, speed: 25 }
config({}); // { duration: 100, speed: 25 }
```

## See also

- Nullish coalescing operator (`??`)
- Nullish
- Truthy
- Falsy
