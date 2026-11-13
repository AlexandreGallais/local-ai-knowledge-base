---
title: "Symbol.replace"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/symbol/replace/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Symbol.replace

The **`Symbol.replace`** static data property represents the well-known symbol `Symbol.replace`. The `String.prototype.replace()` and `String.prototype.replaceAll()` methods look up this symbol on their first argument for the method that replaces substrings matched by the current object.

For more information, see `RegExp.prototype[Symbol.replace]()`, `String.prototype.replace()`, and `String.prototype.replaceAll()`.

```js
class Replace1 {
  constructor(value) {
    this.value = value;
  }
  [Symbol.replace](string) {
    return `s/${string}/${this.value}/g`;
  }
}

console.log("foo".replace(new Replace1("bar")));
// Expected output: "s/foo/bar/g"
```

## Value

The well-known symbol `Symbol.replace`.

## Examples

### Using Symbol.replace

```js
class CustomReplacer {
  constructor(value) {
    this.value = value;
  }
  [Symbol.replace](string) {
    return string.replace(this.value, "#!@?");
  }
}

console.log("football".replace(new CustomReplacer("foo"))); // "#!@?tball"
```

## See also

- Polyfill of `Symbol.replace` in `core-js`
- `Symbol.match`
- `Symbol.matchAll`
- `Symbol.search`
- `Symbol.split`
- `String.prototype.replace()`
- `String.prototype.replaceAll()`
- `RegExp.prototype[Symbol.replace]()`
