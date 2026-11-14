---
title: "Greater than (>)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/operators/greater_than/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Greater than (>)

The **greater than (`>`)** operator returns `true` if the left
operand is greater than the right operand, and `false` otherwise.

```js
console.log(5 > 3);
// Expected output: true

console.log(3 > 3);
// Expected output: false

// Compare bigint to number
console.log(3n > 5);
// Expected output: false

console.log("ab" > "aa");
// Expected output: true
```

## Syntax

```js
x > y
```

## Description

The operands are compared using the same algorithm as the Less than operator, except the two operands are swapped. `x > y` is generally equivalent to `y < x`, except that `x > y` coerces `x` to a primitive before `y`, while `y < x` coerces `y` to a primitive before `x`. Because coercion may have side effects, the order of the operands may matter.

## Examples

### String to string comparison

```js
"a" > "b"; // false
"a" > "a"; // false
"a" > "3"; // true
```

### String to number comparison

```js
"5" > 3; // true
"3" > 3; // false
"3" > 5; // false

"hello" > 5; // false
5 > "hello"; // false

"5" > 3n; // true
"3" > 5n; // false
```

### Number to Number comparison

```js
5 > 3; // true
3 > 3; // false
3 > 5; // false
```

### Number to BigInt comparison

```js
5n > 3; // true
3 > 5n; // false
```

### Comparing Boolean, null, undefined, NaN

```js
true > false; // true
false > true; // false

true > 0; // true
true > 1; // false

null > 0; // false
1 > null; // true

undefined > 3; // false
3 > undefined; // false

3 > NaN; // false
NaN > 3; // false
```

## See also

- Greater than or equal (`>=`)
- Less than (`<`)
- Less than or equal (`<=`)
