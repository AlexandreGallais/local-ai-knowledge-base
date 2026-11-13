---
title: "Symbol.matchAll"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/symbol/matchall/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Symbol.matchAll

The **`Symbol.matchAll`** static data property represents the well-known symbol `Symbol.matchAll`. The `String.prototype.matchAll()` method looks up this symbol on its first argument for the method that returns an iterator, that yields matches of the current object against a string.

For more information, see `RegExp.prototype[Symbol.matchAll]()` and `String.prototype.matchAll()`.

```js
const re = /\d+/g;
const str = "2016-01-02|2019-03-07";
const result = re[Symbol.matchAll](str);

console.log(Array.from(result, (x) => x[0]));
// Expected output: Array ["2016", "01", "02", "2019", "03", "07"]
```

## Value

The well-known symbol `Symbol.matchAll`.

## Examples

### Using Symbol.matchAll

```js
const str = "2016-01-02|2019-03-07";

const numbers = {
  *[Symbol.matchAll](str) {
    for (const n of str.matchAll(/\d+/g)) yield n[0];
  },
};

console.log(Array.from(str.matchAll(numbers)));
// ["2016", "01", "02", "2019", "03", "07"]
```

## See also

- Polyfill of `Symbol.matchAll` in `core-js`
- es-shims polyfill of `Symbol.matchAll`
- `Symbol.match`
- `Symbol.replace`
- `Symbol.search`
- `Symbol.split`
- `String.prototype.matchAll()`
- `RegExp.prototype[Symbol.matchAll]()`
