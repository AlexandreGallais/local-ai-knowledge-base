---
title: "null"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/operators/null/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# null

The **`null`** keyword refers to the `null` primitive value, which represents the intentional absence of any object value.

```js
function getVowels(str) {
  const m = str.match(/[aeiou]/gi);
  if (m === null) {
    return 0;
  }
  return m.length;
}

console.log(getVowels("sky"));
// Expected output: 0
```

## Syntax

```js
null
```

## Description

The keyword `null` is a literal for the `null` value. Unlike `undefined`, which is a global variable, `null` is not an identifier but a syntax keyword.

`null` has the following behaviors:

- Like `undefined`, accessing any property on `null` throws a `TypeError` instead of returning `undefined` or searching prototype chains.
- Like `undefined`, `null` is treated as falsy for boolean operations, and nullish for nullish coalescing and optional chaining.
- The `typeof null` result is `"object"`. This is a bug in JavaScript that cannot be fixed due to backward compatibility.
- Unlike `undefined`, `JSON.stringify()` can represent `null` faithfully.

JavaScript is unique to have two nullish values: `null` and `undefined`. Semantically, their difference is very minor: `undefined` represents the absence of a value, while `null` represents the absence of an _object_. For example, the end of the prototype chain is `null` because the prototype chain is composed of objects; `document.querySelector()` returns `null` if it doesn't match, because had it matched, the result would be an object. If you are designing an API, you should likely accept `null` and `undefined` as equivalent inputs, because many codebases have stylistic rules about when to use `null` or `undefined` by default.

## Examples

### Difference between `null` and `undefined`

When checking for `null` or `undefined`, beware of the differences between equality (==) and identity (===) operators, as the former performs type-conversion.

```js
typeof null; // "object" (not "null" for legacy reasons)
typeof undefined; // "undefined"
null === undefined; // false
null == undefined; // true
null === null; // true
null == null; // true
!null; // true
Number.isNaN(1 + null); // false
Number.isNaN(1 + undefined); // true
```

## See also

- `undefined`
- `NaN`
- `void`
