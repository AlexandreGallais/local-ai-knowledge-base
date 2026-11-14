---
title: "Functions (part 2 of 2)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/functions/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Functions (part 2 of 2)

## Examples

### Returning a formatted number

The following function returns a string containing the formatted representation of a number padded with leading zeros.

```js
// This function returns a string padded with leading zeros
function padZeros(num, totalLen) {
  let numStr = num.toString(); // Initialize return value as string
  const numZeros = totalLen - numStr.length; // Calculate no. of zeros
  for (let i = 1; i <= numZeros; i++) {
    numStr = `0${numStr}`;
  }
  return numStr;
}
```

The following statements call the `padZeros` function.

```js
let result;
result = padZeros(42, 4); // returns "0042"
result = padZeros(42, 2); // returns "42"
result = padZeros(5, 4); // returns "0005"
```

### Determining whether a function exists

You can determine whether a function exists by using the `typeof` operator. In the following example, a test is performed to determine if the `window` object has a property called `noFunc` that is a function. If so, it is used; otherwise, some other action is taken.

```js
if (typeof window.noFunc === "function") {
  // use noFunc()
} else {
  // do something else
}
```

Note that in the `if` test, a reference to `noFunc` is used — there are no parentheses `()` after the function name so the actual function is not called.

## See also

- Functions guide
- Classes
- `function`
- `function` expression
- `Function`
