---
title: "SyntaxError: continue must be inside loop"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/bad_continue/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: continue must be inside loop

The JavaScript exception "continue must be inside loop" occurs when a `continue` statement is not inside a loop statement.

## Message

```plain
SyntaxError: Illegal continue statement: no surrounding iteration statement (V8-based)
SyntaxError: Illegal continue statement: 'label' does not denote an iteration statement (V8-based)
SyntaxError: continue must be inside loop (Firefox)
SyntaxError: 'continue' is only valid inside a loop statement. (Safari)
SyntaxError: Cannot continue to the label 'label' as it is not targeting a loop. (Safari)
```

## Error type

`SyntaxError`.

## What went wrong?

`continue` statements can be used to continue a loop, and using them elsewhere is a syntax error. Alternatively, you can provide a label to the `continue` statement to continue any loop with that label — however, if the label does not reference a containing statement, another error SyntaxError: label not found will be thrown, and if the label references a statement that is not a loop, a syntax error is still thrown.

## Examples

### Using continue in callbacks

If you want to proceed with the next iteration in a `forEach()` loop, use `return` instead, or convert it to a `for...of` loop.

```js
array.forEach((value) => {
  if (value === 5) {
    continue; // SyntaxError: continue must be inside loop
  }
  // do something with value
});
```

```js
array.forEach((value) => {
  if (value === 5) {
    return;
  }
  // do something with value
});
```

```js
for (const value of array) {
  if (value === 5) {
    continue;
  }
  // do something with value
}
```

## See also

- `continue`
