---
title: "Addition (+)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/operators/addition/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Addition (+)

The **addition (`+`)** operator produces the sum of numeric operands or string concatenation.

```js
console.log(2 + 2);
// Expected output: 4

console.log(2 + true);
// Expected output: 3

console.log("hello " + "everyone");
// Expected output: "hello everyone"

console.log(2001 + ": A Space Odyssey");
// Expected output: "2001: A Space Odyssey"
```

## Syntax

```js
x + y
```

## Description

The `+` operator is overloaded for two distinct operations: numeric addition and string concatenation. When evaluating, it first coerces both operands to primitives. Then, the two operands' types are tested:

- If one side is a string, the other operand is also converted to a string and they are concatenated.
- If they are both BigInts, BigInt addition is performed. If one side is a BigInt but the other is not, a `TypeError` is thrown.
- Otherwise, both sides are converted to numbers, and numeric addition is performed.

String concatenation is often thought to be equivalent with template literals or `String.prototype.concat()`, but they are not. Addition coerces the expression to a _primitive_, which calls `valueOf()` in priority; on the other hand, template literals and `concat()` coerce the expression to a _string_, which calls `toString()` in priority. If the expression has a `[Symbol.toPrimitive]()` method, string concatenation calls it with `"default"` as hint, while template literals use `"string"`. This is important for objects that have different string and primitive representations — such as `Temporal`, whose objects' `valueOf()` methods all throw.

```js
const t = Temporal.Now.instant();
"" + t; // Throws TypeError
`${t}`; // '2022-07-31T04:48:56.113918308Z'
"".concat(t); // '2022-07-31T04:48:56.113918308Z'
```

You are advised to not use `"" + x` to perform string coercion.

## Examples

### Addition using numbers

```js
1 + 2; // 3
```

Other non-string, non-BigInt values are coerced to numbers:

```js
true + 1; // 2
false + false; // 0
```

### Addition using BigInts

```js
1n + 2n; // 3n
```

You cannot mix BigInt and number operands in addition. `null`, `undefined`, and boolean values are coerced to numbers and are forbidden as well.

```js
1n + 2; // TypeError: Cannot mix BigInt and other types, use explicit conversions
2 + 1n; // TypeError: Cannot mix BigInt and other types, use explicit conversions
```

Strings have priority over other types, so adding a string to a BigInt produces string concatenation rather than a `TypeError`.

```js
"1" + 2n; // "12"
```

To do addition with a BigInt and a non-BigInt, convert either operand:

```js
1n + BigInt(2); // 3n
Number(1n) + 2; // 3
```

### Addition using strings

If one of the operands is a string, the other is converted to a string and they are concatenated:

```js
"foo" + "bar"; // "foobar"
5 + "foo"; // "5foo"
"foo" + false; // "foofalse"
"2" + 2; // "22"
```

## See also

- Subtraction (`-`)
- Division (`/`)
- Multiplication (`*`)
- Remainder (`%`)
- Exponentiation (`**`)
- Increment (`++`)
- Decrement (`--`)
- Unary negation (`-`)
- Unary plus (`+`)
