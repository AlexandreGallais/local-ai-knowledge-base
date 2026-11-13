---
title: "Greater than or equal (>=)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/operators/greater_than_or_equal/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Greater than or equal (>=)

The **greater than or equal (`>=`)** operator returns `true` if
the left operand is greater than or equal to the right operand, and `false`
otherwise.

```js
console.log(5 >= 3);
// Expected output: true

console.log(3 >= 3);
// Expected output: true

// Compare bigint to number
console.log(3n >= 5);
// Expected output: false

console.log("ab" >= "aa");
// Expected output: true
```

## Syntax

```js
x >= y
```

## Description

The operands are compared using the same algorithm as the Less than operator, with the result negated. `x >= y` is generally equivalent to `!(x < y)`, except for two cases where `x >= y` and `x < y` are both `false`:

- If one of the operands gets converted to a BigInt, while the other gets converted to a string that cannot be converted to a BigInt value (it throws a syntax error when passed to `BigInt()`).
- If one of the operands gets converted to `NaN`. (For example, strings that cannot be converted to numbers, or `undefined`.)

`x >= y` is generally equivalent to `x > y || x == y`, except for a few cases:

- When one of `x` or `y` is `null`, and the other is something that's not `null` and becomes 0 when coerced to numeric (including `0`, `0n`, `false`, `""`, `"0"`, `new Date(0)`, etc.): `x >= y` is `true`, while `x > y || x == y` is `false`.
- When one of `x` or `y` is `undefined`, and the other is one of `null` or `undefined`: `x >= y` is `false`, while `x == y` is `true`.
- When `x` and `y` are the same object that becomes `NaN` after the first step of Less than (such as `new Date(NaN)`): `x >= y` is `false`, while `x == y` is `true`.
- When `x` and `y` are different objects that become the same value after the first step of Less than: `x >= y` is `true`, while `x > y || x == y` is `false`.

## Examples

### String to string comparison

```js
"a" >= "b"; // false
"a" >= "a"; // true
"a" >= "3"; // true
```

### String to number comparison

```js
"5" >= 3; // true
"3" >= 3; // true
"3" >= 5; // false

"hello" >= 5; // false
5 >= "hello"; // false
```

### Number to Number comparison

```js
5 >= 3; // true
3 >= 3; // true
3 >= 5; // false
```

### Number to BigInt comparison

```js
5n >= 3; // true
3 >= 3n; // true
3 >= 5n; // false
```

### Comparing Boolean, null, undefined, NaN

```js
true >= false; // true
true >= true; // true
false >= true; // false

true >= 0; // true
true >= 1; // true

null >= 0; // true
1 >= null; // true

undefined >= 3; // false
3 >= undefined; // false

3 >= NaN; // false
NaN >= 3; // false
```

## See also

- Greater than (`>`)
- Less than (`<`)
- Less than or equal (`<=`)
