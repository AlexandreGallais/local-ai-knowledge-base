---
title: "SyntaxError: incomplete quantifier in regular expression"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/regex_incomplete_quantifier/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: incomplete quantifier in regular expression

The JavaScript exception "incomplete quantifier in regular expression" occurs when a regular expression pattern contains a `{`, but it does not start a valid quantifier.

## Message

```plain
SyntaxError: Invalid regular expression: /1{/u: Incomplete quantifier (V8-based)
SyntaxError: incomplete quantifier in regular expression (Firefox)
SyntaxError: Invalid regular expression: incomplete {} quantifier for Unicode pattern (Safari)
```

## Error type

`SyntaxError`

## What went wrong?

A `{` character in a regular expression pattern starts a quantifier. A valid quantifier is in the form `{n}`, `{n,}`, or `{n,m}`, where `n` and `m` are non-negative integers and `m` is not less than `n`. If the `{` character does not start a valid quantifier, a `SyntaxError` occurs.

In Unicode-unaware mode, this syntax causes the `{` to become a literal character instead of generating an error, but this is a deprecated syntax and you should not rely on it.

## Examples

### Invalid cases

```js
/1{/u;
/1{a}/u;
/1{}/u;
/1{1,2,3}/u;
/1{1, 2}/u;
```

### Valid cases

```js
/1{1}/u;
/1{1,}/u;
/1{1,2}/u;
```

## See also

- Regular expressions
- Quantifier: `*`, `+`, `?`, `{n}`, `{n,}`, `{n,m}`
