---
title: "SyntaxError: cannot use ?? unparenthesized within || and && expressions"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/cant_use_nullish_coalescing_unparenthesized/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: cannot use ?? unparenthesized within || and && expressions

The JavaScript exception "cannot use `??` unparenthesized within `||` and `&&` expressions" occurs when a nullish coalescing operator is used with a logical OR or logical AND in the same expression without parentheses.

## Message

```plain
SyntaxError: Unexpected token '<example-value>' (V8-based)
SyntaxError: cannot use `??` unparenthesized within `||` and `&&` expressions (Firefox)
SyntaxError: Unexpected token '<example-value>'. Coalescing and logical operators used together in the same expression; parentheses must be used to disambiguate. (Safari)
```

## Error type

`SyntaxError`

## What went wrong?

The operator precedence chain looks like this:

```plain
|   >   &&   >   ||   >   =
|   >   ??   >   =
```

However, the precedence _between_ `??` and `&&`/`||` is intentionally undefined, because the short circuiting behavior of logical operators can make the expression's evaluation counter-intuitive. Therefore, the following combinations are all syntax errors, because the language doesn't know how to parenthesize the operands:

```js
a ?? b || c;
a || b ?? c;
a ?? b && c;
a && b ?? c;
```

Instead, make your intent clear by parenthesizing either side explicitly:

```js
(a ?? b) || c;
a ?? (b && c);
```

## Examples

When migrating legacy code that uses `||` and `&&` for guarding against `null` or `undefined`, you may often convert it partially:

```js
function getId(user, fallback) {
  // Previously: user && user.id || fallback
  return user && user.id ?? fallback; // SyntaxError: cannot use `??` unparenthesized within `||` and `&&` expressions
}
```

Instead, consider parenthesizing the `&&`:

```js
function getId(user, fallback) {
  return (user && user.id) ?? fallback;
}
```

Even better, consider using optional chaining instead of `&&`:

```js
function getId(user, fallback) {
  return user?.id ?? fallback;
}
```

## See also

- Issue about nullish coalescing precedence in the TC39 nullish-coalescing proposal
- Nullish coalescing operator (`??`)
- Operator precedence
