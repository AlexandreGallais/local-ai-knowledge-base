---
title: "Symbol.search"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/symbol/search/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Symbol.search

The **`Symbol.search`** static data property represents the well-known symbol `Symbol.search`. The `String.prototype.search()` method looks up this symbol on its first argument for the method that returns the index within a string that matches the current object.

For more information, see `RegExp.prototype[Symbol.search]()` and `String.prototype.search()`.

```js
class Search1 {
  constructor(value) {
    this.value = value;
  }
  [Symbol.search](string) {
    return string.indexOf(this.value);
  }
}

console.log("foobar".search(new Search1("bar")));
// Expected output: 3
```

## Value

The well-known symbol `Symbol.search`.

## Examples

### Custom string search

```js
class CaseInsensitiveSearch {
  constructor(value) {
    this.value = value.toLowerCase();
  }
  [Symbol.search](string) {
    return string.toLowerCase().indexOf(this.value);
  }
}

console.log("foobar".search(new CaseInsensitiveSearch("BaR"))); // 3
```

## See also

- Polyfill of `Symbol.search` in `core-js`
- `Symbol.match`
- `Symbol.matchAll`
- `Symbol.replace`
- `Symbol.split`
- `String.prototype.search()`
- `RegExp.prototype[Symbol.search]()`
