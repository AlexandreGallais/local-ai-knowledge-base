---
title: "SyntaxError: return not in function"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/bad_return/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: return not in function

The JavaScript exception "return not in function" occurs when a `return` statement is called outside of a function.

## Message

```plain
SyntaxError: Illegal return statement (V8-based)
SyntaxError: return not in function (Firefox)
SyntaxError: Return statements are only valid inside functions. (Safari)
```

## Error type

`SyntaxError`.

## What went wrong?

A `return` statement is called outside of a function. Maybe there are missing curly braces somewhere? The `return` statement must be in a function, because it ends function execution and specifies a value to be returned to the function caller.

## Examples

### Missing curly braces

```js
function cheer(score) {
  if (score === 147)
    return "Maximum!";
  }
  if (score > 100) {
    return "Century!";
  }
}

// SyntaxError: return not in function
```

The curly braces look correct at a first glance, but this code snippet is missing a `{` after the first `if` statement. Correct would be:

```js
function cheer(score) {
  if (score === 147) {
    return "Maximum!";
  }
  if (score > 100) {
    return "Century!";
  }
}
```

## See also

- `return`
