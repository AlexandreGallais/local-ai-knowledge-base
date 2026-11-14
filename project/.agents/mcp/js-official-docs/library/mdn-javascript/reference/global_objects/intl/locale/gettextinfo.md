---
title: "Intl.Locale.prototype.getTextInfo()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/intl/locale/gettextinfo/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Intl.Locale.prototype.getTextInfo()

The **`getTextInfo()`** method of `Intl.Locale` instances returns the ordering of characters indicated by either `ltr` (left-to-right) or by `rtl` (right-to-left) for this locale.

> **Note:**
> In some versions of some browsers, this method was implemented as an accessor property called `textInfo`. However, because it returns a new object on each access, it is now implemented as a method to prevent the situation of `locale.textInfo === locale.textInfo` returning `false`. Check the browser compatibility table for details.

## Syntax

```js
getTextInfo()
```

### Parameters

None.

### Return value

An object representing text typesetting information associated with the Locale data specified in UTS 35's Layouts Elements. It has the following properties:

- `direction`
    A string indicating the direction of text for the locale. Can be either `"ltr"` (left-to-right) or `"rtl"` (right-to-left).

## Examples

### Obtaining text info

Return the supported text directions for a given `Locale`.

```js
const ar = new Intl.Locale("ar");
console.log(ar.getTextInfo()); // { direction: "rtl" }
console.log(ar.getTextInfo().direction); // "rtl"
```

```js
const es = new Intl.Locale("es");
console.log(es.getTextInfo()); // { direction: "ltr" }
console.log(es.getTextInfo().direction); // "ltr"
```

## See also

- `Intl.Locale`
