---
title: "Intl.Locale.prototype.script"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/intl/locale/script/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Intl.Locale.prototype.script

The **`script`** accessor property of `Intl.Locale` instances returns the script used for writing the particular language used in this locale.

## Description

Script, sometimes called writing system, is one of the core attributes of a locale. It indicates the set of symbols, or glyphs, that are used to write a particular language. For instance, the script associated with English is Latin, whereas the script typically associated with Korean is Hangul. In many cases, denoting a script is not strictly necessary, since the language (which is necessary) is only written in a single script. There are exceptions to this rule, however, and it is important to indicate the script when multiple scripts are applicable.

The `script` property's value is set at construction time, either through the part of the locale identifier after `language` or through the `script` option of the `Intl.Locale()` constructor. The latter takes priority if they are both present; and if neither is present, the property has value `undefined`.

The set accessor of `script` is `undefined`. You cannot change this property directly.

## Examples

Like other locale subtags, the script can be added to the `Intl.Locale` object via the locale string, or a configuration object argument to the constructor.

### Adding a script via the locale string

The script, if present, is the second part of a valid Unicode language identifier string, and can be added to the initial locale identifier string that is passed into the `Intl.Locale()` constructor. Note that the script is not a required part of a locale identifier.

```js
const locale = new Intl.Locale("en-Latn-US");
console.log(locale.script); // "Latn"
```

### Adding a script via the configuration object argument

The `Intl.Locale()` constructor has an optional configuration object argument. Set the `script` property of the configuration object to your desired script, and then pass it into the constructor.

```js
const locale = new Intl.Locale("fr-FR", { script: "Latn" });
console.log(locale.script); // "Latn"
```

## See also

- `Intl.Locale`
- Unicode script subtag in the Unicode locale data markup language spec
