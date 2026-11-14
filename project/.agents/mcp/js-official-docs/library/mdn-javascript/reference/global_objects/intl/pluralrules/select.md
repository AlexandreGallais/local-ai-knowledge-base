---
title: "Intl.PluralRules.prototype.select()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/intl/pluralrules/select/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Intl.PluralRules.prototype.select()

The **`select()`** method of `Intl.PluralRules` instances returns a string indicating which plural rule to use for locale-aware formatting of a number.

```js
console.log(new Intl.PluralRules("ar-EG").select(0));
// Expected output: "zero"

console.log(new Intl.PluralRules("ar-EG").select(5));
// Expected output: "few"

console.log(new Intl.PluralRules("ar-EG").select(55));
// Expected output: "many"

console.log(new Intl.PluralRules("en").select(0));
// Expected output: "other"
```

## Syntax

```js
select(number)
```

### Parameters

- `number`
    The number to get a plural rule for.

### Return value

A string representing the pluralization category of the `number`.
This can be one of `zero`, `one`, `two`, `few`, `many`, or `other`.

## Description

This function selects a pluralization category according to the locale and formatting options of an `Intl.PluralRules` object.
These options are set in the `Intl.PluralRules()` constructor.

## Examples

### Using select()

First, create an `Intl.PluralRules` object, passing the appropriate `locales` and `options` parameters.
Here we create a plural rules object for Arabic in the Egyptian dialect.
Because the `type` is not specified the rules object will provide formatting for cardinal numbers (the default).

```js
const pr = new Intl.PluralRules("ar-EG");
```

Then call `select()` on the rules object, specifying the number for which the plural form is required.
Note that Arabic has 5 forms for cardinal numbers, as shown.

```js
pr.select(0); // 'zero'
pr.select(1); // 'one'
pr.select(2); // 'two'
pr.select(6); // 'few'
pr.select(18); // 'many'
```

## See also

- `Intl.PluralRules`
