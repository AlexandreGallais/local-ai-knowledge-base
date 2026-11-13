---
title: "return"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/statements/return/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# return

The **`return`** statement ends function execution and specifies a value to be returned to the function caller.

```js
function getRectArea(width, height) {
  if (width > 0 && height > 0) {
    return width * height;
  }
  return 0;
}

console.log(getRectArea(3, 4));
// Expected output: 12

console.log(getRectArea(-3, 4));
// Expected output: 0
```

## Syntax

```js
return;
return expression;
```

- `expression` (optional)
    The expression whose value is to be returned. If omitted, `undefined` is returned.

## Description

The `return` statement can only be used within function bodies. When a `return` statement is used in a function body, the execution of the function is stopped. The `return` statement has different effects when placed in different functions:

- In a plain function, the call to that function evaluates to the return value.
- In an async function, the produced promise is resolved with the returned value.
- In a generator function, the produced generator object's `next()` method returns `{ done: true, value: returnedValue }`.
- In an async generator function, the produced async generator object's `next()` method returns a promise fulfilled with `{ done: true, value: returnedValue }`.

If a `return` statement is executed within a `try` block, its `finally` block, if present, is first executed, before the value is actually returned.

### Automatic semicolon insertion

The syntax forbids line terminators between the `return` keyword and the expression to be returned.

```js
return
a + b;
```

The code above is transformed by automatic semicolon insertion (ASI) into:

```js
return;
a + b;
```

This makes the function return `undefined` and the `a + b` expression is never evaluated. This may generate a warning in the console.

To avoid this problem (to prevent ASI), you could use parentheses:

```js
return (
  a + b
);
```

## Examples

### Interrupt a function

A function immediately stops at the point where `return` is called.

```js
function counter() {
  // Infinite loop
  for (let count = 1; ; count++) {
    console.log(`${count}A`); // Until 5
    if (count === 5) {
      return;
    }
    console.log(`${count}B`); // Until 4
  }
  console.log(`${count}C`); // Never appears
}

counter();

// Logs:
// 1A
// 1B
// 2A
// 2B
// 3A
// 3B
// 4A
// 4B
// 5A
```

### Returning a function

See also the article about Closures.

```js
function magic() {
  return function calc(x) {
    return x * 42;
  };
}

const answer = magic();
answer(1337); // 56154
```

## See also

- Functions
- Closures
