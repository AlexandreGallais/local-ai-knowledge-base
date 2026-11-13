---
title: "RegExp.prototype[Symbol.search]()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/regexp/symbol.search/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RegExp.prototype[Symbol.search]()

The **`Symbol.search`** method of `RegExp` instances specifies how `String.prototype.search` should behave.

```js
class RegExp1 extends RegExp {
  constructor(str) {
    super(str);
    this.pattern = str;
  }
  [Symbol.search](str) {
    return str.indexOf(this.pattern);
  }
}

console.log("table football".search(new RegExp1("foo")));
// Expected output: 6
```

## Syntax

```js
regexp[Symbol.search](str)
```

### Parameters

- `str`
    A `String` that is a target of the search.

### Return value

The index of the first match between the regular expression and the given string, or `-1` if no match was found.

## Description

This method exists for customizing the search behavior in `RegExp` subclasses. It is called internally in `String.prototype.search()`. For example, the following two examples return the same result.

```js
"abc".search(/a/);

/a/[Symbol.search]("abc");
```

`Symbol.search` always calls the regex's `exec()` method exactly once, and returns the `index` property of the result, or `-1` if the result is `null`. The `g` flag has no effect with this method.

This method does not copy the regular expression, unlike `[Symbol.split]()` or `[Symbol.matchAll]()`. However, unlike `[Symbol.match]()` or `[Symbol.replace]()`, it will always set `lastIndex` to 0 when execution starts and restore it to the previous value when it exits, therefore generally avoiding side effects. This means that it always returns the first match in the string even when `lastIndex` is non-zero, and sticky regexes always search strictly at the beginning of the string.

```js
const re = /[abc]/g;
re.lastIndex = 2;
console.log("abc".search(re)); // 0

const re2 = /[bc]/y;
re2.lastIndex = 1;
console.log("abc".search(re2)); // -1
console.log("abc".match(re2)); // [ 'b' ]
```

## Examples

### Direct call

This method can be used in almost the same way as `String.prototype.search()`, except for the different value of `this` and the different arguments order.

```js
const re = /-/g;
const str = "2016-01-02";
const result = re[Symbol.search](str);
console.log(result); // 4
```

### Using `Symbol.search` in subclasses

Subclasses of `RegExp` can override `Symbol.search` method to modify the behavior.

```js
class MyRegExp extends RegExp {
  constructor(str) {
    super(str);
    this.pattern = str;
  }
  [Symbol.search](str) {
    return str.indexOf(this.pattern);
  }
}

const re = new MyRegExp("a+b");
const str = "ab a+b";
const result = str.search(re); // String.prototype.search calls re[Symbol.search]().
console.log(result); // 3
```

## See also

- Polyfill of `RegExp.prototype[Symbol.search]` in `core-js`
- `String.prototype.search()`
- `RegExp.prototype[Symbol.match]()`
- `RegExp.prototype[Symbol.matchAll]()`
- `RegExp.prototype[Symbol.replace]()`
- `RegExp.prototype[Symbol.split]()`
- `RegExp.prototype.exec()`
- `RegExp.prototype.test()`
- `Symbol.search`
