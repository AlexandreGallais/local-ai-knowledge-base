---
title: "String.prototype.toLocaleLowerCase()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/string/tolocalelowercase/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# String.prototype.toLocaleLowerCase()

The **`toLocaleLowerCase()`** method of `String` values returns this string converted to lower case, according to any locale-specific case mappings.

```js
const dotted = "İstanbul";

console.log(`EN-US: ${dotted.toLocaleLowerCase("en-US")}`);
// Expected output: "EN-US: i̇stanbul"

console.log(`TR: ${dotted.toLocaleLowerCase("tr")}`);
// Expected output: "TR: istanbul"
```

## Syntax

```js
toLocaleLowerCase()
toLocaleLowerCase(locales)
```

### Parameters

- `locales` (optional)
    A string with a BCP 47 language tag, or an array of such strings. Indicates the locale to be used to convert to lower case according to any locale-specific case mappings. For the general form and interpretation of the `locales` argument, see the parameter description on the `Intl` main page.

    Unlike other methods that use the `locales` argument, `toLocaleLowerCase()` does not allow locale matching. Therefore, after checking the validity of the `locales` argument, `toLocaleLowerCase()` always uses the first locale in the list (or the default locale if the list is empty), even if this locale is not supported by the implementation.

### Return value

A new string representing the calling string converted to lower case, according to any
locale-specific case mappings.

## Description

The `toLocaleLowerCase()` method returns the value of the string converted
to lower case according to any locale-specific case mappings.
`toLocaleLowerCase()` does not affect the value of the string itself. In most
cases, this will produce the same result as `toLowerCase()`, but for some locales, such as Turkish, whose case mappings do not
follow the default case mappings in Unicode, there may be a different result.

## Examples

### Using toLocaleLowerCase()

```js
"ALPHABET".toLocaleLowerCase(); // 'alphabet'

"\u0130".toLocaleLowerCase("tr") === "i"; // true
"\u0130".toLocaleLowerCase("en-US") === "i"; // false

const locales = ["tr", "TR", "tr-TR", "tr-u-co-search", "tr-x-turkish"];
"\u0130".toLocaleLowerCase(locales) === "i"; // true
```

## See also

- `String.prototype.toLocaleUpperCase()`
- `String.prototype.toLowerCase()`
- `String.prototype.toUpperCase()`
