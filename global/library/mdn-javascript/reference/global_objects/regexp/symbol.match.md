---
title: "RegExp.prototype[Symbol.match]()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/regexp/symbol.match/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RegExp.prototype[Symbol.match]()

The **`Symbol.match`** method of `RegExp` instances specifies how `String.prototype.match()` should behave. In addition, its presence (or absence) can influence whether an object is regarded as a regular expression.

```js
class RegExp1 extends RegExp {
  [Symbol.match](str) {
    const result = RegExp.prototype[Symbol.match].call(this, str);
    if (result) {
      return "VALID";
    }
    return "INVALID";
  }
}

console.log("2012-07-02".match(new RegExp1("(\\d+)-(\\d+)-(\\d+)")));
// Expected output: "VALID"
```

## Syntax

```js
regexp[Symbol.match](str)
```

### Parameters

- `str`
    A `String` that is a target of the match.

### Return value

An `Array` whose contents depend on the presence or absence of the global (`g`) flag, or `null` if no matches are found.

- If the `g` flag is used, all results matching the complete regular expression will be returned, but capturing groups are not included.
- If the `g` flag is not used, only the first complete match and its related capturing groups are returned. In this case, `match()` will return the same result as `RegExp.prototype.exec()` (an array with some extra properties).

## Description

This method exists for customizing match behavior within `RegExp` subclasses. It is called internally in `String.prototype.match()`. For example, the following two examples return the same result.

```js
"abc".match(/a/);

/a/[Symbol.match]("abc");
```

If the regex is global (with the `g` flag), its `lastIndex` is first set to 0, so matching always starts from the beginning of the string, and the regex's `exec()` method is repeatedly called until `exec()` returns `null`. If the current match is an empty string, the `lastIndex` would still be advanced — if the regex is Unicode-aware, it would advance by one Unicode code point; otherwise, it advances by one UTF-16 code unit.

```js
console.log("😄".match(/(?:)/g)); // [ '', '', '' ]
console.log("😄".match(/(?:)/gu)); // [ '', '' ]
```

If the regex is not global, `exec()` would only be called once and its result becomes the return value of `Symbol.match`.

The `exec()` method automatically resets `lastIndex` to 0 when the last match fails, so for global regexes with `lastIndex` starting at 0, `Symbol.match` generally produces no side-effects. However, when the regex is sticky but not global, `exec()` is only called once and therefore does not reset `lastIndex` if the match was successful. In this case, each call to `match()` may return a different result.

```js
const re = /[abc]/y;
for (let i = 0; i < 5; i++) {
  console.log("abc".match(re), re.lastIndex);
}
// [ 'a' ] 1
// [ 'b' ] 2
// [ 'c' ] 3
// null 0
// [ 'a' ] 1
```

When the regex is sticky and global, it would still perform sticky matches — i.e., it would fail to match any occurrences beyond the `lastIndex`.

```js
console.log("ab-c".match(/[abc]/gy)); // [ 'a', 'b' ]
```

In addition, the `[Symbol.match]` property is used to check whether an object is a regular expression.

## Examples

### Direct call

This method can be used in _almost_ the same way as `String.prototype.match()`, except the different `this` and the different arguments order.

```js
const re = /\d+/g;
const str = "2016-01-02";
const result = re[Symbol.match](str);
console.log(result); // ["2016", "01", "02"]
```

### Using `Symbol.match` in subclasses

Subclasses of `RegExp` can override the `Symbol.match` method to modify the default behavior.

```js
class MyRegExp extends RegExp {
  [Symbol.match](str) {
    const result = RegExp.prototype[Symbol.match].call(this, str);
    if (!result) return null;
    return {
      group(n) {
        return result[n];
      },
    };
  }
}

const re = new MyRegExp("(\\d+)-(\\d+)-(\\d+)");
const str = "2016-01-02";
const result = str.match(re); // String.prototype.match calls re[Symbol.match]().
console.log(result.group(1)); // 2016
console.log(result.group(2)); // 01
console.log(result.group(3)); // 02
```

## See also

- Polyfill of `RegExp.prototype[Symbol.match]` in `core-js`
- `String.prototype.match()`
- `RegExp.prototype[Symbol.matchAll]()`
- `RegExp.prototype[Symbol.replace]()`
- `RegExp.prototype[Symbol.search]()`
- `RegExp.prototype[Symbol.split]()`
- `RegExp.prototype.exec()`
- `RegExp.prototype.test()`
- `Symbol.match`
