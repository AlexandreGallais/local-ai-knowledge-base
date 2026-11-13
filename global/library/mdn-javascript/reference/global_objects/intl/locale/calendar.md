---
title: "Intl.Locale.prototype.calendar"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/intl/locale/calendar/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Intl.Locale.prototype.calendar

The **`calendar`** accessor property of `Intl.Locale` instances returns the calendar type for this locale.

## Description

While most of the world uses the Gregorian calendar, there are several regional calendar eras used around the world. For a list of supported calendar types, see `Intl.supportedValuesOf()`.

The `calendar` property's value is set at construction time, either through the `ca` key of the locale identifier or through the `calendar` option of the `Intl.Locale()` constructor. The latter takes priority if they are both present; and if neither is present, the property has value `undefined`.

The set accessor of `calendar` is `undefined`. You cannot change this property directly.

## Examples

Like other locale subtags, the calendar type can be added to the `Intl.Locale` object via the locale string, or a configuration object argument to the constructor.

### Adding a calendar type via the locale string

In the Unicode locale string spec, `calendar` is an "extension subtag". These subtags add additional data about the locale, and are added to locale identifiers using the `-u` extension key. To add the calendar type to the initial locale identifier string passed into the `Intl.Locale()` constructor, first add the `-u` extension key if it doesn't exist. Next, add the `-ca` extension to indicate that you are adding a calendar type. Finally, add the calendar era type.

```js
const locale = new Intl.Locale("fr-FR-u-ca-buddhist");
console.log(locale.calendar); // "buddhist"
```

### Adding a calendar type via the configuration object argument

The `Intl.Locale()` constructor has an optional configuration object argument, which can contain any of several extension types, including calendars. Set the `calendar` property of the configuration object to your desired calendar era, and then pass it into the constructor.

```js
const locale = new Intl.Locale("fr-FR", { calendar: "buddhist" });
console.log(locale.calendar); // "buddhist"
```

## See also

- `Intl.Locale`
- `Intl.Locale.prototype.getCalendars()`
- Unicode Calendar Identifier in the Unicode locale data markup language spec
