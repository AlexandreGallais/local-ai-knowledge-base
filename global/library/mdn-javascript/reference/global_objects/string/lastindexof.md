---
title: "String.prototype.lastIndexOf()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/string/lastindexof/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# String.prototype.lastIndexOf()

The **`lastIndexOf()`** method of `String` values searches this string and returns the index of the last occurrence of the specified substring. It takes an optional starting position and returns the last occurrence of the specified substring at an index less than or equal to the specified number.

```js
const paragraph = "I think Ruth's dog is cuter than your dog!";

const searchTerm = "dog";

console.log(
  `Index of the last "${searchTerm}" is ${paragraph.lastIndexOf(searchTerm)}`,
);
// Expected output: "Index of the last "dog" is 38"
```

## Syntax

```js
lastIndexOf(searchString)
lastIndexOf(searchString, position)
```

### Parameters

- `searchString`
    Substring to search for. All values are coerced to strings, so omitting it or passing `undefined` causes `lastIndexOf()` to search for the string `"undefined"`, which is rarely what you want.

- `position` (optional)
    The method returns the index of the last occurrence of the specified substring at a position less than or equal to `position`, which defaults to `Infinity`. If `position` is greater than the length of the calling string, the method searches the entire string. If `position` is less than `0`, the behavior is the same as for `0` — that is, the method looks for the specified substring only at index `0`.
    - `'hello world hello'.lastIndexOf('world', 4)` returns `-1` — because, while the substring `world` does occurs at index `6`, that position is not less than or equal to `4`.

    - `'hello world hello'.lastIndexOf('hello', 99)` returns `12` — because the last occurrence of `hello` at a position less than or equal to `99` is at position `12`.

    - `'hello world hello'.lastIndexOf('hello', 0)` and `'hello world hello'.lastIndexOf('hello', -5)` both return `0` — because both cause the method to only look for `hello` at index `0`.

### Return value

The index of the last occurrence of `searchString` found, or `-1` if not found.

## Description

Strings are zero-indexed: The index of a string's first character is `0`, and the index of a string's last character is the length of the string minus 1.

```js
"canal".lastIndexOf("a"); // returns 3
"canal".lastIndexOf("a", 2); // returns 1
"canal".lastIndexOf("a", 0); // returns -1
"canal".lastIndexOf("x"); // returns -1
"canal".lastIndexOf("c", -5); // returns 0
"canal".lastIndexOf("c", 0); // returns 0
"canal".lastIndexOf(""); // returns 5
"canal".lastIndexOf("", 2); // returns 2
```

### Case-sensitivity

The `lastIndexOf()` method is case sensitive. For example, the following
expression returns `-1`:

```js
"Blue Whale, Killer Whale".lastIndexOf("blue"); // returns -1
```

## Examples

### Using indexOf() and lastIndexOf()

The following example uses `indexOf()` and
`lastIndexOf()` to locate values in the string
`"Brave, Brave New World"`.

```js
const anyString = "Brave, Brave New World";

console.log(anyString.indexOf("Brave")); // 0
console.log(anyString.lastIndexOf("Brave")); // 7
```

## See also

- `String.prototype.charAt()`
- `String.prototype.indexOf()`
- `String.prototype.split()`
- `Array.prototype.indexOf()`
- `Array.prototype.lastIndexOf()`
