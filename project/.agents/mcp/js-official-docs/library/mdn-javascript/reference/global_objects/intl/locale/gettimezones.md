---
title: "Intl.Locale.prototype.getTimeZones()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/intl/locale/gettimezones/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Intl.Locale.prototype.getTimeZones()

The **`getTimeZones()`** method of `Intl.Locale` instances returns a list of supported time zones for this locale.

> **Note:**
> In some versions of some browsers, this method was implemented as an accessor property called `timeZones`. However, because it returns a new array on each access, it is now implemented as a method to prevent the situation of `locale.timeZones === locale.timeZones` returning `false`. Check the browser compatibility table for details.

## Syntax

```js
getTimeZones()
```

### Parameters

None.

### Return value

An array of strings representing supported time zones for the associated `Locale`, where each value is an IANA time zone canonical name, sorted in alphabetical order. If the locale identifier does not contain a region subtag, the returned value is `undefined`.

> **Note:**
> The standardization of `Temporal` requires browsers to always return the primary identifier in the IANA database, which may change over time. See time zones and offsets for more information.

## Examples

### Obtaining supported time zones

List supported time zones for a given `Locale`.

```js
const arEG = new Intl.Locale("ar-EG");
console.log(arEG.getTimeZones()); // ["Africa/Cairo"]
```

```js
const jaJP = new Intl.Locale("ja-JP");
console.log(jaJP.getTimeZones()); // ["Asia/Tokyo"]
```

```js
const ar = new Intl.Locale("ar");
console.log(ar.getTimeZones()); // undefined
```

## See also

- `Intl.Locale`
- IANA time zone database on Wikipedia
