---
title: "RegExp.prototype[Symbol.split]()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/regexp/symbol.split/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RegExp.prototype[Symbol.split]()

The **`Symbol.split`** method of `RegExp` instances specifies how `String.prototype.split` should behave when the regular expression is passed in as the separator.

```js
class RegExp1 extends RegExp {
  [Symbol.split](str, limit) {
    const result = RegExp.prototype[Symbol.split].call(this, str, limit);
    return result.map((x) => `(${x})`);
  }
}

console.log("2016-01-02".split(new RegExp1("-")));
// Expected output: Array ["(2016)", "(01)", "(02)"]

console.log("2016-01-02".split(/-/));
// Expected output: Array ["2016", "01", "02"]
```

## Syntax

```js
regexp[Symbol.split](str)
regexp[Symbol.split](str, limit)
```

### Parameters

- `str`
    The target of the split operation.
- `limit` (optional)
    Integer specifying a limit on the number of splits to be found. The `Symbol.split` method still splits on every match of `this` RegExp pattern (or, in the Syntax above, `regexp`), until the number of split items match the `limit` or the string falls short of `this` pattern.

### Return value

An `Array` containing substrings as its elements. Capturing groups are included.

## Description

This method exists for customizing the behavior of `split()` in `RegExp` subclasses. It is called internally in `String.prototype.split()` when a `RegExp` is passed as the separator. For example, the following two examples return the same result.

```js
"a-b-c".split(/-/);

/-/[Symbol.split]("a-b-c");
```

Like `[Symbol.matchAll]()`, `Symbol.split` starts by using `[Symbol.species]` to construct a new regex, thus avoiding mutating the original regexp in any way. The constructor receives `this` and the original flags, plus the `y` ("sticky") flag if it was not originally present. The `g` ("global") flag is irrelevant for the method's behavior. By default, due to the `RegExp()` constructor's behavior, `lastIndex` starts as 0.

If the target string is empty, and the regexp can match empty strings (for example, `/a?/`), an empty array is returned. Otherwise, if the regexp can't match an empty string, `[""]` is returned.

The regex's `exec()` method is repeatedly called, advancing the `lastIndex` each time, until it is at the end of the string. If the current match is an empty string, or if the regexp doesn't match at the current position (since it's sticky), the `lastIndex` would still be advanced — if the regex is Unicode-aware, it would advance by one Unicode code point; otherwise, it advances by one UTF-16 code unit.

```js
console.log("😄".split(/(?:)/g)); // [ '\ud83d', '\ude04' ]
console.log("😄".split(/(?:)/gu)); // [ '😄' ]
```

For each match, the substring between the last matched string's end and the current matched string's beginning is first appended to the result array. Then, the capturing groups' values are appended one-by-one. The returned array's length will never exceed the `limit` parameter, if provided, while trying to be as close as possible. Therefore, the last match and its capturing groups may not all be present in the returned array if the array is already filled.

If there was no successful match anywhere in the string, the target string is returned as-is, wrapped in an array.

## Examples

### Direct call

This method can be used in almost the same way as
`String.prototype.split()`, except the different `this` and the
different order of arguments.

```js
const re = /-/g;
const str = "2016-01-02";
const result = re[Symbol.split](str);
console.log(result); // ["2016", "01", "02"]
```

### Using `Symbol.split` in subclasses

Subclasses of `RegExp` can override the `Symbol.split` method to
modify the default behavior.

```js
class MyRegExp extends RegExp {
  [Symbol.split](str, limit) {
    const result = RegExp.prototype[Symbol.split].call(this, str, limit);
    return result.map((x) => `(${x})`);
  }
}

const re = new MyRegExp("-");
const str = "2016-01-02";
const result = str.split(re); // String.prototype.split calls re[Symbol.split]().
console.log(result); // ["(2016)", "(01)", "(02)"]
```

## See also

- Polyfill of `RegExp.prototype[Symbol.split]` in `core-js`
- `String.prototype.split()`
- `RegExp.prototype[Symbol.match]()`
- `RegExp.prototype[Symbol.matchAll]()`
- `RegExp.prototype[Symbol.replace]()`
- `RegExp.prototype[Symbol.search]()`
- `RegExp.prototype.exec()`
- `RegExp.prototype.test()`
- `Symbol.split`
