---
title: "Intl.Locale.prototype.getCollations()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/intl/locale/getcollations/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Intl.Locale.prototype.getCollations()

The **`getCollations()`** method of `Intl.Locale` instances returns a list of one or more collation types for this locale.

> **Note:**
> In some versions of some browsers, this method was implemented as an accessor property called `collations`. However, because it returns a new array on each access, it is now implemented as a method to prevent the situation of `locale.collations === locale.collations` returning `false`. Check the browser compatibility table for details.

## Syntax

```js
getCollations()
```

### Parameters

None.

### Return value

An array of strings representing all collation types commonly used for the `Locale`, sorted in alphabetical order, with the `standard` and `search` values always excluded. If the `Locale` already has a `collation`, then the returned array contains that single value.

For a list of supported collation types, see `Intl.supportedValuesOf()`.

## Examples

### Obtaining supported collation types

If the `Locale` object doesn't have a `collation` already, `getCollations()` lists all commonly-used collation types for the given `Locale`. For examples of explicitly setting a `collation`, see `collation` examples.

```js
const locale = new Intl.Locale("zh");
console.log(locale.getCollations()); // ["pinyin", "stroke", "zhuyin", "emoji", "eor"]
```

## See also

- `Intl.Locale`
- `Intl.Locale.prototype.collation`
