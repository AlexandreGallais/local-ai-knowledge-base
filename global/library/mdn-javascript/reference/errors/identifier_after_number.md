---
title: "SyntaxError: identifier starts immediately after numeric literal"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/identifier_after_number/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: identifier starts immediately after numeric literal

The JavaScript exception "identifier starts immediately after numeric literal" occurs
when an identifier started with a digit. Identifiers can only start with a letter,
underscore (\_), or dollar sign ($).

## Message

```plain
SyntaxError: Invalid or unexpected token (V8-based)
SyntaxError: identifier starts immediately after numeric literal (Firefox)
SyntaxError: No identifiers allowed directly after numeric literal (Safari)
```

## Error type

`SyntaxError`

## What went wrong?

The names of variables, called identifiers, conform to certain rules,
which your code must adhere to!

A JavaScript identifier must start with a letter, underscore (\_), or dollar sign ($).
They can't start with a digit! Only subsequent characters can be digits (0-9).

## Examples

### Variable names starting with numeric literals

Variable names can't start with numbers in JavaScript. The following fails:

```js
const 1life = "foo";
// SyntaxError: identifier starts immediately after numeric literal

const foo = 1life;
// SyntaxError: identifier starts immediately after numeric literal
```

You will need to rename your variable to avoid the leading number.

```js
const life1 = "foo";
const foo = life1;
```

In JavaScript, there is a syntactic peculiarity when calling properties or methods on numbers. If you want to call a method on an integer, you cannot immediately use a dot after the number because the dot is interpreted as the start of a decimal fraction, causing the parser to see the method's name as an identifier immediately after a number literal. To avoid this, you need to either wrap the number in parentheses or use a double dot, where the first dot is a decimal point for the number literal and the second dot is the property accessor.

```js
alert(typeof 1.toString())
// SyntaxError: identifier starts immediately after numeric literal
```

Correct ways to call methods on numbers:

```js
// Wrap the number in parentheses
alert(typeof (1).toString());

// Add an extra dot for the number literal
alert(typeof 2..toString());

// Use square brackets
alert(typeof 3["toString"]());
```

## See also

- Lexical grammar
- Grammar and types guide
