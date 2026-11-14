---
title: "SyntaxError: unparenthesized unary expression can't appear on the left-hand side of '**'"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/unparenthesized_unary_expr_lhs_exponentiation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: unparenthesized unary expression can't appear on the left-hand side of '**'

The JavaScript exception "unparenthesized unary expression can't appear on the left-hand side of '\*\*'" occurs when a unary operator (one of `typeof`, `void`, `delete`, `await`, `!`, `~`, `+`, `-`) is used on the left operand of the exponentiation operator without parentheses.

## Message

```plain
SyntaxError: Unary operator used immediately before exponentiation expression. Parenthesis must be used to disambiguate operator precedence (V8-based)
SyntaxError: unparenthesized unary expression can't appear on the left-hand side of '**' (Firefox)
SyntaxError: Unexpected token '<example-value>'. Ambiguous unary expression in the left hand side of the exponentiation expression; parentheses must be used to disambiguate the expression. (Safari)
```

## Error type

`SyntaxError`

## What went wrong?

You likely wrote something like this:

```js
-a ** b
```

Whether it should be evaluated as `(-a) ** b` or `-(a ** b)` is ambiguous. In mathematics, -x2 means `-(x ** 2)` — and that's how many languages, including Python, Haskell, and PHP, handle it. But making the unary minus operator take precedence over `**` breaks symmetry with `a ** -b`, which is unambiguously `a ** (-b)`. Therefore, the language forbids this syntax and requires you to parenthesize either side to resolve the ambiguity.

```js
(-a) ** b
-(a ** b)
```

Other unary operators cannot be the left-hand side of exponentiation either.

```js
await a ** b
!a ** b
+a ** b
~a ** b
```

## Examples

When writing complex math expressions involving exponentiation, you may write something like this:

```js
function taylorSin(x) {
  return (n) => (-1 ** n * x ** (2 * n + 1)) / factorial(2 * n + 1);
  // SyntaxError: unparenthesized unary expression can't appear on the left-hand side of '**'
}
```

However, the `-1 ** n` part is illegal in JavaScript. Instead, parenthesize the left operand:

```js
function taylorSin(x) {
  return (n) => ((-1) ** n * x ** (2 * n + 1)) / factorial(2 * n + 1);
}
```

This also makes the code's intent much clearer to other readers.

## See also

- Exponentiation (`**`)
- Operator precedence
- Original discussion of exponentiation operator precedence on esdiscuss.org
