---
title: "RegExp.prototype[Symbol.replace]()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/regexp/symbol.replace/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RegExp.prototype[Symbol.replace]()

The **`Symbol.replace`** method of `RegExp` instances specifies how `String.prototype.replace()` and `String.prototype.replaceAll()` should behave when the regular expression is passed in as the pattern.

```js
class RegExp1 extends RegExp {
  [Symbol.replace](str) {
    return RegExp.prototype[Symbol.replace].call(this, str, "#!@?");
  }
}

console.log("football".replace(new RegExp1("foo")));
// Expected output: "#!@?tball"
```

## Syntax

```js
regexp[Symbol.replace](str, replacement)
```

### Parameters

- `str`
    A `String` that is a target of the replacement.
- `replacement`
    Can be a string or a function.
    - If it's a string, it will replace the substring matched by the current regexp. A number of special replacement patterns are supported; see the Specifying a string as the replacement section of `String.prototype.replace`.
    - If it's a function, it will be invoked for every match and the return value is used as the replacement text. The arguments supplied to this function are described in the Specifying a function as the replacement section of `String.prototype.replace`.

### Return value

A new string, with one, some, or all matches of the pattern replaced by the specified replacement.

## Description

This method exists for customizing replace behavior in `RegExp` subclasses. It is called internally in `String.prototype.replace()` and `String.prototype.replaceAll()` if the `pattern` argument is a `RegExp` object. For example, the following two examples return the same result.

```js
"abc".replace(/a/, "A");

/a/[Symbol.replace]("abc", "A");
```

If the regex is global (with the `g` flag), its `lastIndex` is first set to 0, so matching always starts from the beginning of the string, and the regex's `exec()` method is repeatedly called until `exec()` returns `null`. If the current match is an empty string, the `lastIndex` would still be advanced — if the regex is Unicode-aware, it would advance by one Unicode code point; otherwise, it advances by one UTF-16 code unit.

```js
console.log("😄".replace(/(?:)/g, " ")); // " \ud83d \ude04 "
console.log("😄".replace(/(?:)/gu, " ")); // " 😄 "
```

If the regex is not global, `exec()` would only be called once.

Substitution happens after all matching substrings are identified. For each successful `exec()` result, a substitution string is created based on the `replacement` argument, the process of which is described in `String.prototype.replace()`.

The `exec()` method automatically resets `lastIndex` to 0 when the last match fails, so for global regexes with `lastIndex` starting at 0, `Symbol.replace` generally produces no side-effects. However, when the regex is sticky but not global, `exec()` is only called once and therefore does not reset `lastIndex` if the match was successful. In this case, each call to `replace()` may return a different result.

```js
const re = /a/y;

for (let i = 0; i < 5; i++) {
  console.log("aaa".replace(re, "b"), re.lastIndex);
}

// baa 1
// aba 2
// aab 3
// aaa 0
// baa 1
```

When the regex is sticky and global, it would still perform sticky matches — i.e., it would fail to match any occurrences beyond the `lastIndex`.

```js
console.log("aa-a".replace(/a/gy, "b")); // "bb-a"
```

## Examples

### Direct call

This method can be used in almost the same way as `String.prototype.replace()`, except the different `this` and the different arguments order.

```js
const re = /-/g;
const str = "2016-01-01";
const newStr = re[Symbol.replace](str, ".");
console.log(newStr); // 2016.01.01
```

### Using `Symbol.replace` in subclasses

Subclasses of `RegExp` can override the `Symbol.replace` method to modify the default behavior.

```js
class MyRegExp extends RegExp {
  constructor(pattern, flags, count) {
    super(pattern, flags);
    this.count = count;
  }
  [Symbol.replace](str, replacement) {
    // Perform [Symbol.replace]() `count` times.
    let result = str;
    for (let i = 0; i < this.count; i++) {
      result = RegExp.prototype[Symbol.replace].call(this, result, replacement);
    }
    return result;
  }
}

const re = new MyRegExp("\\d", "", 3);
const str = "01234567";
const newStr = str.replace(re, "#"); // String.prototype.replace calls re[Symbol.replace]().
console.log(newStr); // ###34567
```

## See also

- Polyfill of `RegExp.prototype[Symbol.replace]` in `core-js`
- `String.prototype.replace()`
- `String.prototype.replaceAll()`
- `RegExp.prototype[Symbol.match]()`
- `RegExp.prototype[Symbol.matchAll]()`
- `RegExp.prototype[Symbol.search]()`
- `RegExp.prototype[Symbol.split]()`
- `RegExp.prototype.exec()`
- `RegExp.prototype.test()`
- `Symbol.replace`
