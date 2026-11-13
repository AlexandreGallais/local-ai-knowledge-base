---
title: "RegExp.prototype.toString()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/regexp/tostring/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RegExp.prototype.toString()

The **`toString()`** method of `RegExp` instances returns a string representing this regular expression.

```js
console.log(new RegExp("a+b+c"));
// Expected output: /a+b+c/

console.log(new RegExp("a+b+c").toString());
// Expected output: "/a+b+c/"

console.log(new RegExp("bar", "g").toString());
// Expected output: "/bar/g"

console.log(new RegExp("\n", "g").toString());
// Expected output: "/\n/g"

console.log(new RegExp("\\n", "g").toString());
// Expected output: "/\n/g"
```

## Syntax

```js
toString()
```

### Parameters

None.

### Return value

A string representing the given object.

## Description

The `RegExp` object overrides the `toString()` method of the `Object` object; it does not inherit `Object.prototype.toString()`. For `RegExp` objects, the `toString()` method returns a string representation of the regular expression.

In practice, it reads the regex's `source` and `flags` properties and returns a string in the form `/source/flags`. The `toString()` return value is guaranteed to be a parsable regex literal, although it may not be the exact same text as what was originally specified for the regex (for example, the flags may be reordered).

## Examples

### Using toString()

The following example displays the string value of a `RegExp` object:

```js
const myExp = new RegExp("a+b+c");
console.log(myExp.toString()); // '/a+b+c/'

const foo = new RegExp("bar", "g");
console.log(foo.toString()); // '/bar/g'
```

### Empty regular expressions and escaping

Since `toString()` accesses the `source` property, an empty regular expression returns the string `"/(?:)/"`, and line terminators such as `\n` are escaped. This makes the returned value always a valid regex literal.

```js
new RegExp().toString(); // "/(?:)/"

new RegExp("\n").toString() === "/\\n/"; // true
```

## See also

- Polyfill of modern `RegExp.prototype.toString` behavior in `core-js`
- `Object.prototype.toString()`
