---
title: "Intl.Locale() constructor"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/intl/locale/locale/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Intl.Locale() constructor

The **`Intl.Locale()`** constructor creates `Intl.Locale` objects.

```js
const korean = new Intl.Locale("ko", {
  script: "Kore",
  region: "KR",
  hourCycle: "h23",
  calendar: "gregory",
});

const japanese = new Intl.Locale("ja-Jpan-JP-u-ca-japanese-hc-h12");

console.log(korean.baseName, japanese.baseName);
// Expected output: "ko-Kore-KR" "ja-Jpan-JP"

console.log(korean.hourCycle, japanese.hourCycle);
// Expected output: "h23" "h12"
```

## Syntax

```js
new Intl.Locale(tag)
new Intl.Locale(tag, options)
```

> **Note:**
> `Intl.Locale()` can only be constructed with `new`. Attempting to call it without `new` throws a `TypeError`.

### Parameters

- `tag`
    The Unicode locale identifier string. For the syntax of locale identifier strings, see the Intl main page. Note that the `Intl.Locale` constructor, unlike most other `Intl` constructors, does not accept an array of locales or `undefined`.
- `options`
    An object that contains configuration for the Locale. Option values here take priority over extension keys in the locale identifier. Possible properties are:
    - `language`
        The language. Any syntactically valid string following the `unicode_language_subtag` grammar (2–3 or 5–8 letters) is accepted, but the implementation only recognizes certain kinds.
    - `script`
        The script. Any syntactically valid string following the `unicode_script_subtag` grammar (4 letters) is accepted, but the implementation only recognizes certain kinds.
    - `region`
        The region. Any syntactically valid string following the `unicode_region_subtag` grammar (either 2 letters or 3 digits) is accepted, but the implementation only recognizes certain kinds.
    - `variants`
        The variants. It should be a dash (`-`) separated list of _unique_ variant tags, where each tag is any syntactically valid string following the `unicode_variant_subtag` grammar (either 5–8 alphanumerals or a digit followed by 3 alphanumerals), but the implementation only recognizes certain kinds.
    - `calendar`
        The calendar. Any syntactically valid string following the `type` grammar (one or more segments of 3–8 alphanumerals, joined by hyphens) is accepted, but the implementation only recognizes certain kinds, which are listed in `Intl.supportedValuesOf()`.
    - `collation`
        The collation. Any syntactically valid string following the `type` grammar is accepted, but the implementation only recognizes certain kinds, which are listed in `Intl.supportedValuesOf()`.
    - `numberingSystem`
        The numbering system. Any syntactically valid string following the `type` grammar is accepted, but the implementation only recognizes certain kinds, which are listed in `Intl.supportedValuesOf()`.
    - `caseFirst`
        The case-first sort option. Possible values are `"upper"`, `"lower"`, or `"false"`.
    - `hourCycle`
        The hour cycle. Possible values are `"h23"`, `"h12"`, `"h11"`, or the practically unused `"h24"`, which are explained in `Intl.Locale.prototype.getHourCycles`
    - `numeric`
        The numeric sort option. A boolean.

## Examples

### Basic usage

At its very simplest, the `Intl.Locale()` constructor takes
a locale identifier string as its argument:

```js
const us = new Intl.Locale("en-US");
```

### Using the Locale constructor with an options object

The constructor also takes an optional configuration object argument, which can contain
any of several extension types. For example, set the
`hourCycle`
property of the configuration object to your desired hour cycle type, and then pass it
into the constructor:

```js
const locale = new Intl.Locale("en-US", { hourCycle: "h12" });
console.log(locale.hourCycle); // "h12"
```

## See also

- `Intl.Collator`
- Canonical Unicode Locale Identifiers in the Unicode locale data markup language spec
