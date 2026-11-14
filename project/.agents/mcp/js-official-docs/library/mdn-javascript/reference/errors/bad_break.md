---
title: "SyntaxError: unlabeled break must be inside loop or switch"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/bad_break/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: unlabeled break must be inside loop or switch

The JavaScript exception "unlabeled break must be inside loop or switch" occurs when a `break` statement is not inside a loop or a `switch` statement.

## Message

```plain
SyntaxError: Illegal break statement (V8-based)
SyntaxError: unlabeled break must be inside loop or switch (Firefox)
SyntaxError: 'break' is only valid inside a switch or loop statement. (Safari)
```

## Error type

`SyntaxError`.

## What went wrong?

`break` statements can be used to exit a loop or a `switch` statement, and using them elsewhere is a syntax error. Alternatively, you can provide a label to the `break` statement to break out of any statement with that label — however, if the label does not reference a containing statement, another error SyntaxError: label not found will be thrown.

## Examples

### Unsyntactic break

`break` cannot be used outside `switch` or loops.

```js
let score = 0;

function increment() {
  if (score === 100)
    break; // SyntaxError: unlabeled break must be inside loop or switch
  }
  score++;
}
```

Maybe instead of `break`, you intend to use `return` to early-terminate a function.

```js
let score = 0;

function increment() {
  if (score === 100) {
    return;
  }
  score++;
}
```

### Using break in callbacks

`break` cannot be used in callbacks, even if the callback is called from a loop.

```js
let containingIndex = 0;
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

while (containingIndex < matrix.length) {
  matrix[containingIndex].forEach((value) => {
    if (value === 5) {
      break; // SyntaxError: unlabeled break must be inside loop or switch
    }
  });
  containingIndex++;
}
```

Instead, refactor the code so the `break` is used outside the callback.

```js
let containingIndex = 0;
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

outer: while (containingIndex < matrix.length) {
  for (const value of matrix[containingIndex]) {
    if (value === 5) {
      break outer;
    }
  }
  containingIndex++;
}
```

```js
let containingIndex = 0;
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

while (containingIndex < matrix.length) {
  if (matrix[containingIndex].includes(5)) {
    break;
  }
  containingIndex++;
}
```

There's no way to early-terminate a `forEach()` loop. You can use `some()` instead, or convert it to a `for...of` loop.

```js
array.forEach((value) => {
  if (value === 5) {
    break; // SyntaxError: unlabeled break must be inside loop or switch
  }
  // do something with value
});
```

```js
array.some((value) => {
  if (value === 5) {
    return true;
  }
  // do something with value
  return false;
});
```

```js
for (const value of array) {
  if (value === 5) {
    break;
  }
  // do something with value
}
```

## See also

- `break`
