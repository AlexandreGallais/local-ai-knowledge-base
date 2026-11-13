---
title: "Symbol.split"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/symbol/split/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Symbol.split

The **`Symbol.split`** static data property represents the well-known symbol `Symbol.split`. The `String.prototype.split()` method looks up this symbol on its first argument for the method that splits a string at the indices that match the current object.

For more information, see `RegExp.prototype[Symbol.split]()` and `String.prototype.split()`.

```js
class Split1 {
  constructor(value) {
    this.value = value;
  }
  [Symbol.split](string) {
    const index = string.indexOf(this.value);
    return `${this.value}${string.substring(0, index)}/${string.substring(
      index + this.value.length,
    )}`;
  }
}

console.log("foobar".split(new Split1("foo")));
// Expected output: "foo/bar"
```

## Value

The well-known symbol `Symbol.split`.

## Examples

### Custom reverse split

```js
class ReverseSplit {
  [Symbol.split](string) {
    const array = string.split(" ");
    return array.reverse();
  }
}

console.log("Another one bites the dust".split(new ReverseSplit()));
// [ "dust", "the", "bites", "one", "Another" ]
```

## See also

- Polyfill of `Symbol.split` in `core-js`
- `Symbol.match`
- `Symbol.matchAll`
- `Symbol.replace`
- `Symbol.search`
- `String.prototype.split()`
- `RegExp.prototype[Symbol.split]()`
