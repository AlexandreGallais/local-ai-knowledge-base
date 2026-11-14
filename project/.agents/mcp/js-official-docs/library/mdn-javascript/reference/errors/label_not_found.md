---
title: "SyntaxError: label not found"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/label_not_found/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: label not found

The JavaScript exception "label not found" occurs when a `break` or `continue` statement references a label that does not exist on any statement that contains the `break` or `continue` statement.

## Message

```plain
SyntaxError: Undefined label 'label' (V8-based)
SyntaxError: label not found (Firefox)
SyntaxError: Cannot use the undeclared label 'label'. (Safari)
```

## Error type

`SyntaxError`.

## What went wrong?

In JavaScript, labels are very limited: you can only use them with `break` and `continue` statements, and you can only jump to them from a statement contained within the labeled statement. You cannot jump to this label from anywhere in the program.

## Examples

### Unsyntactic jump

You cannot use labels as if they are `goto`.

```js
start: console.log("Hello, world!");
console.log("Do it again");
break start;
```

Instead, you can only use labels to enhance the normal semantics of `break` and `continue` statements.

```js
start: {
  console.log("Hello, world!");
  if (Math.random() > 0.5) {
    break start;
  }
  console.log("Maybe I'm logged");
}
```

## See also

- Labeled statement
