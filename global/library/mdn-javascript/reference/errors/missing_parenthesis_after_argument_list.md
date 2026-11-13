---
title: "SyntaxError: missing ) after argument list"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/missing_parenthesis_after_argument_list/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: missing ) after argument list

The JavaScript exception "missing ) after argument list" occurs when there is an error
with how a function is called. This might be a typo, a missing operator, or an unescaped
string.

## Message

```plain
SyntaxError: missing ) after argument list (V8-based & Firefox)
SyntaxError: Unexpected identifier 'x'. Expected ')' to end an argument list. (Safari)
```

## Error type

`SyntaxError`.

## What went wrong?

There is an error with how a function is called. This might be a typo, a missing
operator, or an unescaped string, for example.

## Examples

Because there is no "+" operator to concatenate the string, JavaScript expects the
argument for the `log` function to be just `"PI: "`. In that case,
it should be terminated by a closing parenthesis.

```js
console.log("PI: " Math.PI);
// SyntaxError: missing ) after argument list
```

You can correct the `log` call by adding the `+` operator:

```js
console.log("PI: " + Math.PI);
// "PI: 3.141592653589793"
```

Alternatively, you can consider using a template literal, or take advantage of the fact that `console.log` accepts multiple parameters:

```js
console.log(`PI: ${Math.PI}`);
console.log("PI:", Math.PI);
```

### Unterminated strings

```js
console.log('"Java" + "Script" = \"' + "Java" + 'Script\");
// SyntaxError: missing ) after argument list
```

Here JavaScript thinks that you meant to have `);` inside the string and
ignores it, and it ends up not knowing that you meant the `);` to end the
function `console.log`. To fix this, we could put a `'` after the
"Script" string:

```js
console.log('"Java" + "Script" = "' + "Java" + 'Script"');
// '"Java" + "Script" = "JavaScript"'
```

## See also

- Functions guide
