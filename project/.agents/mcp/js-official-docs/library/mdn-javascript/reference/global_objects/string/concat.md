---
title: "String.prototype.concat()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/string/concat/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# String.prototype.concat()

The **`concat()`** method of `String` values concatenates
the string arguments to this string and returns a new string.

```js
const str1 = "Hello";
const str2 = "World";

console.log(str1.concat(" ", str2));
// Expected output: "Hello World"

console.log(str2.concat(", ", str1));
// Expected output: "World, Hello"
```

## Syntax

```js
concat(str1)
concat(str1, str2)
concat(str1, str2, /* …, */ strN)
```

### Parameters

- `str1`, …, `strN`
    One or more strings to concatenate to `str`. Though technically permitted, calling `String.prototype.concat()` with no arguments is a useless operation, because it does not result in observable copying (like `Array.prototype.concat()`), since strings are immutable. It should only happen if you are spreading an array of strings as arguments, and that array happens to be empty.

### Return value

A new string containing the combined text of the strings provided.

## Description

The `concat()` function concatenates the string arguments to the calling string and returns a new string.

If the arguments are not of the type string, they are converted to string values before
concatenating.

The `concat()` method is very similar to the addition/string concatenation operators (`+`, `+=`), except that `concat()` coerces its arguments directly to strings, while addition coerces its operands to primitives first. For more information, see the reference page for the `+` operator.

## Examples

### Using concat()

The following example combines strings into a new string.

```js
const hello = "Hello, ";
console.log(hello.concat("Kevin", ". Have a nice day."));
// Hello, Kevin. Have a nice day.

const greetList = ["Hello", " ", "Venkat", "!"];
"".concat(...greetList); // "Hello Venkat!"

"".concat({}); // "[object Object]"
"".concat([]); // ""
"".concat(null); // "null"
"".concat(true); // "true"
"".concat(4, 5); // "45"
```

## See also

- `Array.prototype.concat()`
- Addition (`+`)
