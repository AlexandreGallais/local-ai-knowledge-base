---
title: "Intl.Locale.prototype.region"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/intl/locale/region/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Intl.Locale.prototype.region

The **`region`** accessor property of `Intl.Locale` instances returns the region of the world (usually a country) associated with this locale.

## Description

Region is one of the core attributes of a locale. It allows selection for differences between the same language in, say, different countries. For example, English is spoken in the United Kingdom and the United States of America, but there are differences in spelling and other language conventions between those two countries. Knowing the locale's region helps JavaScript programmers make sure that the content from their sites and applications is correctly displayed when viewed from different areas of the world.

The `region` property's value is set at construction time, either through the part of the locale identifier after `script` or through the `region` option of the `Intl.Locale()` constructor. The latter takes priority if they are both present; and if neither is present, the property has value `undefined`.

The set accessor of `region` is `undefined`. You cannot change this property directly.

## Examples

Like other locale subtags, the region can be added to the `Intl.Locale` object via the locale string, or a configuration object argument to the constructor.

### Adding a region via the locale string

The region, if present, is the third part (if `script` is present, second part otherwise) of a valid Unicode language identifier string, and can be added to the initial locale identifier string that is passed into the `Intl.Locale()` constructor. Note that the region is not a required part of a locale identifier.

```js
const locale = new Intl.Locale("en-Latn-US");
console.log(locale.region); // "US"
```

### Adding a region via the configuration object argument

The `Intl.Locale()` constructor has an optional configuration object argument. Set the `region` property of the configuration object to your desired region, and then pass it into the constructor.

```js
const locale = new Intl.Locale("fr-Latn", { region: "FR" });
console.log(locale.region); // "FR"
```

## See also

- `Intl.Locale`
- Unicode region chart
