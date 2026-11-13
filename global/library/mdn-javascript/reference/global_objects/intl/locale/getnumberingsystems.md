---
title: "Intl.Locale.prototype.getNumberingSystems()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/intl/locale/getnumberingsystems/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Intl.Locale.prototype.getNumberingSystems()

The **`getNumberingSystems()`** method of `Intl.Locale` instances returns a list of one or more unique numbering system identifiers for this locale.

> **Note:**
> In some versions of some browsers, this method was implemented as an accessor property called `numberingSystems`. However, because it returns a new array on each access, it is now implemented as a method to prevent the situation of `locale.numberingSystems === locale.numberingSystems` returning `false`. Check the browser compatibility table for details.

## Syntax

```js
getNumberingSystems()
```

### Parameters

None.

### Return value

An array of strings representing all numbering systems commonly used for the `Locale`, sorted in descending preference. If the `Locale` already has a `numberingSystem`, then the returned array contains that single value.

For a list of supported numbering system types, see `Intl.supportedValuesOf()`.

## Examples

### Obtaining supported numbering systems

If the `Locale` object doesn't have a `numberingSystem` already, `getNumberingSystems()` lists all commonly-used numbering systems for the given `Locale`. For examples of explicitly setting a `numberingSystem`, see `numberingSystem` examples.

```js
const arEG = new Intl.Locale("ar-EG");
console.log(arEG.getNumberingSystems()); // ["arab"]
```

```js
const ja = new Intl.Locale("ja");
console.log(ja.getNumberingSystems()); // ["latn"]
```

## See also

- `Intl.Locale`
- `Intl.Locale.prototype.numberingSystem`
- Details on the standard Unicode numeral systems
