---
title: "Intl.Locale.prototype.getCalendars()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/intl/locale/getcalendars/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Intl.Locale.prototype.getCalendars()

The **`getCalendars()`** method of `Intl.Locale` instances returns a list of one or more unique calendar identifiers for this locale.

> **Note:**
> In some versions of some browsers, this method was implemented as an accessor property called `calendars`. However, because it returns a new array on each access, it is now implemented as a method to prevent the situation of `locale.calendars === locale.calendars` returning `false`. Check the browser compatibility table for details.

## Syntax

```js
getCalendars()
```

### Parameters

None.

### Return value

An array of strings representing all calendars commonly used for the `Locale`, sorted in descending preference. If the `Locale` already has a `calendar`, then the returned array contains that single value.

For a list of supported calendar types, see `Intl.supportedValuesOf()`.

## Examples

### Obtaining supported calendars

If the `Locale` object doesn't have a `calendar` already, `getCalendars()` lists all commonly-used calendars for the given `Locale`. For examples of explicitly setting a `calendar`, see `calendar` examples.

```js
const arEG = new Intl.Locale("ar-EG");
console.log(arEG.getCalendars()); // ["gregory", "coptic", "islamic", "islamic-civil", "islamic-tbla"]
```

```js
const jaJP = new Intl.Locale("ja-JP");
console.log(jaJP.getCalendars()); // ["gregory", "japanese"]
```

## See also

- `Intl.Locale`
- `Intl.Locale.prototype.calendar`
- Unicode Calendar Identifier in the Unicode locale data markup language spec
