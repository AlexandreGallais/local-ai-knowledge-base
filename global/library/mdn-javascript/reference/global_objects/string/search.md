---
title: "String.prototype.search()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/string/search/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# String.prototype.search()

The **`search()`** method of `String` values executes a search for a match between a regular expression and this string, returning the index of the first match in the string.

```js
const paragraph = "I think Ruth's dog is cuter than your dog!";

// Anything not a word character, whitespace or apostrophe
const regex = /[^\w\s']/g;

console.log(paragraph.search(regex));
// Expected output: 41

console.log(paragraph[paragraph.search(regex)]);
// Expected output: "!"
```

## Syntax

```js
search(regexp)
```

### Parameters

- `regexp`
    A regular expression object, or any object that has a `Symbol.search` method.

    If `regexp` is not a `RegExp` object and does not have a `Symbol.search` method, it is implicitly converted to a `RegExp` by using `new RegExp(regexp)`.

### Return value

The index of the first match between the regular expression and the given string, or `-1` if no match was found.

## Description

The implementation of `String.prototype.search()` doesn't do much other than calling the `Symbol.search` method of the argument with the string as the first parameter. The actual implementation comes from `RegExp.prototype[Symbol.search]()`.

The `g` flag of `regexp` has no effect on the `search()` result, and the search always happens as if the regex's `lastIndex` is 0. For more information on the behavior of `search()`, see `RegExp.prototype[Symbol.search]()`.

When you want to know whether a pattern is found, and _also_ know its index within a string, use `search()`.

- If you only want to know if it exists, use the `RegExp.prototype.test()` method, which returns a boolean.
- If you need the content of the matched text, use `String.prototype.match()` or `RegExp.prototype.exec()`.

## Examples

### Using search()

The following example searches a string with two different regex objects to show a successful search (positive value) vs. an unsuccessful search (`-1`).

```js
const str = "hey JudE";
const re = /[A-Z]/;
const reDot = /[.]/;
console.log(str.search(re)); // returns 4, which is the index of the first capital letter "J"
console.log(str.search(reDot)); // returns -1 cannot find '.' dot punctuation
```

## See also

- Polyfill of `String.prototype.search` in `core-js` with fixes and implementation of modern behavior like `Symbol.search` support
- Regular expressions guide
- `String.prototype.match()`
- `RegExp.prototype.exec()`
- `RegExp.prototype[Symbol.search]()`
