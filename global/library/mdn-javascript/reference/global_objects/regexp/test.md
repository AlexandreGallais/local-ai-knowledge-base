---
title: "RegExp.prototype.test()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/regexp/test/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RegExp.prototype.test()

The **`test()`** method of `RegExp` instances executes a search with this regular expression for a match between a regular expression and a specified string. Returns `true` if there is a match; `false` otherwise.

JavaScript `RegExp` objects are **stateful** when they have
the `global` or `sticky` flags
set (e.g., `/foo/g` or `/foo/y`). They store a
`lastIndex` from the previous match. Using this
internally, `test()` can be used to iterate over multiple matches in a string
of text (with capture groups).

```js
const str = "table football";

const regex = /fo+/;
const globalRegex = /fo+/g;

console.log(regex.test(str));
// Expected output: true

console.log(globalRegex.lastIndex);
// Expected output: 0

console.log(globalRegex.test(str));
// Expected output: true

console.log(globalRegex.lastIndex);
// Expected output: 9

console.log(globalRegex.test(str));
// Expected output: false
```

## Syntax

```js
test(str)
```

### Parameters

- `str`
    The string against which to match the regular expression. All values are coerced to strings, so omitting it or passing `undefined` causes `test()` to search for the string `"undefined"`, which is rarely what you want.

### Return value

`true` if there is a match between the regular expression and the string
`str`. Otherwise, `false`.

## Description

Use `test()` whenever you want to know whether a pattern is found in a
string. `test()` returns a boolean, unlike the
`String.prototype.search()` method (which returns the index of a match, or
`-1` if not found).

To get more information (but with slower execution), use the
`exec()` method. (This is similar to the
`String.prototype.match()` method.)

As with `exec()` (or in combination with it), `test()` called
multiple times on the same global regular expression instance will advance past the
previous match.

## Examples

### Using test()

This example tests if `"hello"` is contained at the very beginning of
a string, returning a boolean result.

```js
const str = "hello world!";
const result = /^hello/.test(str);

console.log(result); // true
```

The following example logs a message which depends on the success of the test:

```js
function testInput(re, str) {
  const midString = re.test(str) ? "contains" : "does not contain";
  console.log(`${str} ${midString} ${re.source}`);
}
```

### Using test() on a regex with the "global" flag

When a regex has the global flag set,
`test()` will advance the `lastIndex` of the regex.
(`RegExp.prototype.exec()` also advances the `lastIndex` property.)

Further calls to `test(str)` will resume searching
`str` starting from `lastIndex`. The
`lastIndex` property will continue to increase each time `test()`
returns `true`.

> **Note:**
> As long as `test()` returns `true`,
> `lastIndex` will _not_ reset—even when testing a different string!

When `test()` returns `false`, the calling regex's
`lastIndex` property will reset to `0`.

The following example demonstrates this behavior:

```js
const regex = /foo/g; // the "global" flag is set

// regex.lastIndex is at 0
regex.test("foo"); // true

// regex.lastIndex is now at 3
regex.test("foo"); // false

// regex.lastIndex is at 0
regex.test("barfoo"); // true

// regex.lastIndex is at 6
regex.test("foobar"); // false

// regex.lastIndex is at 0
regex.test("foobarfoo"); // true

// regex.lastIndex is at 3
regex.test("foobarfoo"); // true

// regex.lastIndex is at 9
regex.test("foobarfoo"); // false

// regex.lastIndex is at 0
// (...and so on)
```

## See also

- Polyfill of `RegExp.prototype.test` with support for named capturing groups, `dotAll`, and `sticky` in `core-js`
- Regular expressions guide
- `RegExp`
