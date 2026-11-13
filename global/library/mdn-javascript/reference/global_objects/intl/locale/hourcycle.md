---
title: "Intl.Locale.prototype.hourCycle"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/intl/locale/hourcycle/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Intl.Locale.prototype.hourCycle

The **`hourCycle`** accessor property of `Intl.Locale` instances returns the hour cycle type for this locale.

## Description

There are 2 main types of time keeping conventions (clocks) used around the world: the 12 hour clock and the 24 hour clock. For a list of supported hour cycle types, see `Intl.Locale.prototype.getHourCycles()`.

The `hourCycle` property's value is set at construction time, either through the `hc` key of the locale identifier or through the `hourCycle` option of the `Intl.Locale()` constructor. The latter takes priority if they are both present; and if neither is present, the property has value `undefined`.

The set accessor of `hourCycle` is `undefined`. You cannot change this property directly.

## Examples

Like other locale subtags, the hour cycle type can be added to the `Intl.Locale` object via the locale string, or a configuration object argument to the constructor.

### Adding an hour cycle via the locale string

In the Unicode locale string spec, `hourCycle` is an "extension subtag". These subtags add additional data about the locale, and are added to locale identifiers using the `-u` extension key. To add the hour cycle type to the initial locale identifier string passed into the `Intl.Locale()` constructor, first add the `-u` extension key if it doesn't exist. Next, add the `-hc` extension to indicate that you are adding an hour cycle. Finally, add the hour cycle type.

```js
const locale = new Intl.Locale("fr-FR-u-hc-h23");
console.log(locale.hourCycle); // "h23"
```

### Adding an hour cycle via the configuration object argument

The `Intl.Locale()` constructor has an optional configuration object argument, which can contain any of several extension types, including hour cycle types. Set the `hourCycle` property of the configuration object to your desired hour cycle type, and then pass it into the constructor.

```js
const locale = new Intl.Locale("en-US", { hourCycle: "h12" });
console.log(locale.hourCycle); // "h12"
```

## See also

- `Intl.Locale`
- `Intl.Locale.prototype.getHourCycles()`
- Unicode Hour Cycle Identifier in the Unicode locale data markup language spec
