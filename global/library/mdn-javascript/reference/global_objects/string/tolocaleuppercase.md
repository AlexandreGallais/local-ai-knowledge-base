---
title: "String.prototype.toLocaleUpperCase()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/string/tolocaleuppercase/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# String.prototype.toLocaleUpperCase()

The **`toLocaleUpperCase()`** method of `String` values returns this string converted to upper case, according to any locale-specific case mappings.

```js
const city = "istanbul";

console.log(city.toLocaleUpperCase("en-US"));
// Expected output: "ISTANBUL"

console.log(city.toLocaleUpperCase("TR"));
// Expected output: "İSTANBUL"
```

## Syntax

```js
toLocaleUpperCase()
toLocaleUpperCase(locales)
```

### Parameters

- `locales` (optional)
    A string with a BCP 47 language tag, or an array of such strings. Indicates the locale to be used to convert to upper case according to any locale-specific case mappings. For the general form and interpretation of the `locales` argument, see the parameter description on the `Intl` main page.

    Unlike other methods that use the `locales` argument, `toLocaleUpperCase()` does not allow locale matching. Therefore, after checking the validity of the `locales` argument, `toLocaleUpperCase()` always uses the first locale in the list (or the default locale if the list is empty), even if this locale is not supported by the implementation.

### Return value

A new string representing the calling string converted to upper case, according to any
locale-specific case mappings.

## Description

The `toLocaleUpperCase()` method returns the value of the string converted
to upper case according to any locale-specific case mappings.
`toLocaleUpperCase()` does not affect the value of the string itself. In most
cases, this will produce the same result as `toUpperCase()`, but for some locales, such as Turkish, whose case mappings do not
follow the default case mappings in Unicode, there may be a different result.

Also notice that conversion is not necessarily a 1:1 character mapping, as some
characters might result in two (or even more) characters when transformed to upper-case.
Therefore the length of the result string can differ from the input length. This also
implies that the conversion is not stable, so for example the following can return
`false`:
`x.toLocaleLowerCase() === x.toLocaleUpperCase().toLocaleLowerCase()`

## Examples

### Using toLocaleUpperCase()

```js
"alphabet".toLocaleUpperCase(); // 'ALPHABET'

"Gesäß".toLocaleUpperCase(); // 'GESÄSS'

"i\u0307".toLocaleUpperCase("lt-LT"); // 'I'

const locales = ["lt", "LT", "lt-LT", "lt-u-co-phonebk", "lt-x-lietuva"];
"i\u0307".toLocaleUpperCase(locales); // 'I'
```

## See also

- `String.prototype.toLocaleLowerCase()`
- `String.prototype.toLowerCase()`
- `String.prototype.toUpperCase()`
