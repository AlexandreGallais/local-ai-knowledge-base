---
title: "Intl.Locale.prototype.numberingSystem"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/intl/locale/numberingsystem/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Intl.Locale.prototype.numberingSystem

The **`numberingSystem`** accessor property of `Intl.Locale` instances returns the numeral system for this locale.

## Description

A numeral system is a system for expressing numbers. For a list of supported numbering system types, see `Intl.supportedValuesOf()`.

The `numberingSystem` property's value is set at construction time, either through the `nu` key of the locale identifier or through the `numberingSystem` option of the `Intl.Locale()` constructor. The latter takes priority if they are both present; and if neither is present, the property has value `undefined`.

The set accessor of `numberingSystem` is `undefined`. You cannot change this property directly.

## Examples

Like other locale subtags, the numbering system type can be added to the `Intl.Locale` object via the locale string, or a configuration object argument to the constructor.

### Adding a numbering system via the locale string

In the Unicode locale string spec, `numberingSystem` is an "extension subtag". These subtags add additional data about the locale, and are added to locale identifiers using the `-u` extension key. To add the numbering system type to the initial locale identifier string passed into the `Intl.Locale()` constructor, first add the `-u` extension key if it doesn't exist. Next, add the `-nu` extension to indicate that you are adding a numbering system. Finally, add the numbering system type.

```js
const locale = new Intl.Locale("fr-Latn-FR-u-nu-mong");
console.log(locale.numberingSystem); // "mong"
```

### Adding a numbering system via the configuration object argument

The `Intl.Locale()` constructor has an optional configuration object argument, which can contain any of several extension types, including numbering system types. Set the `numberingSystem` property of the configuration object to your desired numbering system type, and then pass it into the constructor.

```js
const locale = new Intl.Locale("en-Latn-US", { numberingSystem: "latn" });
console.log(locale.numberingSystem); // "latn"
```

## See also

- `Intl.Locale`
- `Intl.Locale.prototype.getNumberingSystems()`
- Details on the standard Unicode numeral systems
