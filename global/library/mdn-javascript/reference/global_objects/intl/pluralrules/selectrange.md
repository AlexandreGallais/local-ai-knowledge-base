---
title: "Intl.PluralRules.prototype.selectRange()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/intl/pluralrules/selectrange/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Intl.PluralRules.prototype.selectRange()

The **`selectRange()`** method of `Intl.PluralRules` instances receives two values and returns a string indicating which plural rule to use for locale-aware formatting of the indicated range.

## Syntax

```js
selectRange(startRange, endRange)
```

### Parameters

- `startRange`
    A number representing the start of the range.
- `endRange`
    A number representing the end of the range.

### Return value

A string representing the pluralization category of the specified range.
This can be one of `zero`, `one`, `two`, `few`, `many` or `other`, that are relevant for the locale whose localization is specified in LDML Language Plural Rules.

## Description

This function selects a pluralization category according to the locale and formatting options of an `Intl.PluralRules` object.

Conceptually the behavior is the same as getting plural rules for a single cardinal or ordinal number.
Languages have one or more forms for describing ranges, and this method returns the appropriate form given the supplied locale and formatting options.
In English there is only one plural form, such as "1–10 apples", and the method will return `other`.
Other languages can have many forms.

## Examples

### Using selectRange()

```js
new Intl.PluralRules("sl").selectRange(102, 201); // 'few'

new Intl.PluralRules("pt").selectRange(102, 102); // 'other'
```

## See also

- `Intl.PluralRules`
