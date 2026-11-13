---
title: "Intl.Locale.prototype.caseFirst"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/intl/locale/casefirst/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Intl.Locale.prototype.caseFirst

The **`caseFirst`** accessor property of `Intl.Locale` instances returns whether case is taken into account for this locale's collation rules.

## Description

A locale's collation rules are used to determine how strings are ordered in that locale. Certain locales use a character's case (UPPERCASE or lowercase) in the collation process. This additional rule can be expressed in an `Intl.Locale` object's `caseFirst` property. There are 3 values that the `caseFirst` property can have, outlined in the table below.

| Value   | Description                                |
| ------- | ------------------------------------------ |
| `upper` | Upper case to be sorted before lower case. |
| `lower` | Lower case to be sorted before upper case. |
| `false` | No special case ordering.                  |

The `caseFirst` property's value is set at construction time, either through the `kf` key of the locale identifier or through the `caseFirst` option of the `Intl.Locale()` constructor. The latter takes priority if they are both present; and if neither is present, the property has value `undefined`.

The set accessor of `caseFirst` is `undefined`. You cannot change this property directly.

## Examples

Like other locale subtags, the `caseFirst` value can be added to the `Intl.Locale` object via the locale string, or a configuration object argument to the constructor.

### Adding a caseFirst value via the locale string

In the Unicode locale string spec, `caseFirst` is an "extension subtag". These subtags add additional data about the locale, and are added to locale identifiers using the `-u` extension key. To add the `caseFirst` value to the initial locale identifier string passed into the `Intl.Locale()` constructor, first add the `-u` extension key if it doesn't exist. Next, add the `-kf` extension to indicate that you are adding a value for `caseFirst`. Finally, add the `caseFirst` value.

```js
const locale = new Intl.Locale("fr-Latn-FR-u-kf-upper");
console.log(locale.caseFirst); // "upper"
```

### Adding a caseFirst value via the configuration object argument

The `Intl.Locale()` constructor has an optional configuration object argument, which can contain any of several extension types, including `caseFirst`. Set the `caseFirst` property of the configuration object to your desired `caseFirst` value, and then pass it into the constructor.

```js
const locale = new Intl.Locale("en-Latn-US", { caseFirst: "lower" });
console.log(locale.caseFirst); // "lower"
```

## See also

- `Intl.Locale`
- Unicode case first collation spec
