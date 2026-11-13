---
title: "SyntaxError: numbers out of order in {} quantifier."
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/regex_numbers_out_of_order_in_quantifier/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: numbers out of order in {} quantifier.

The JavaScript exception "numbers out of order in {} quantifier" occurs when a quantifier in a regular expression uses the `{n,m}` syntax but `m` is less than `n`.

## Message

```plain
SyntaxError: Invalid regular expression: /1{2,1}/: numbers out of order in {} quantifier (V8-based)
SyntaxError: numbers out of order in {} quantifier. (Firefox)
SyntaxError: Invalid regular expression: numbers out of order in {} quantifier (Safari)
```

## Error type

`SyntaxError`

## What went wrong?

The `{n,m}` syntax in a regular expression is used to specify that the preceding item is to be matched at least `n` times, but not more than `m` times. If `m` is less than `n`, the quantifier is nonsensical because, for example, a character cannot appear at least 2 times but not more than 1 time. Therefore, an error is thrown.

## Examples

### Invalid examples

```js
/1{2,1}/;
```

### Valid examples

```js
/1{1,2}/;
```

## See also

- Regular expressions
- Quantifier: `*`, `+`, `?`, `{n}`, `{n,}`, `{n,m}`
