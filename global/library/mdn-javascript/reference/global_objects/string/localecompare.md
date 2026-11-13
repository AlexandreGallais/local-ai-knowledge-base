---
title: "String.prototype.localeCompare()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/string/localecompare/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# String.prototype.localeCompare()

The **`localeCompare()`** method of `String` values returns a number indicating whether this string comes before, or after, or is the same as the given string in sort order. In implementations with `Intl.Collator` API support, this method delegates to `Intl.Collator`.

When comparing large numbers of strings, such as in sorting large arrays, it is better to create an `Intl.Collator` object and use the function provided by its `compare()` method.

```js
const a = "réservé"; // With accents, lowercase
const b = "RESERVE"; // No accents, uppercase

console.log(a.localeCompare(b));
// Expected output: 1
console.log(a.localeCompare(b, "en", { sensitivity: "base" }));
// Expected output: 0
```

## Syntax

```js
localeCompare(compareString)
localeCompare(compareString, locales)
localeCompare(compareString, locales, options)
```

### Parameters

The `locales` and `options` parameters customize the behavior of the function and let applications specify the language whose formatting conventions should be used.

In implementations that support the `Intl.Collator` API, these parameters correspond exactly to the `Intl.Collator()` constructor's parameters. Implementations without `Intl.Collator` support are asked to ignore both parameters, making the comparison result returned entirely implementation-dependent — it's only required to be _consistent_.

- `compareString`
    The string against which the `referenceStr` is compared. All values are coerced to strings, so omitting it or passing `undefined` causes `localeCompare()` to compare against the string `"undefined"`, which is rarely what you want.
- `locales` (optional)
    A string with a BCP 47 language tag, or an array of such strings. Corresponds to the `locales` parameter of the `Intl.Collator()` constructor.

    In implementations without `Intl.Collator` support, this parameter is ignored and the host's locale is usually used.

- `options` (optional)
    An object adjusting the output format. Corresponds to the `options` parameter of the `Intl.Collator()` constructor.

    In implementations without `Intl.Collator` support, this parameter is ignored.

See the `Intl.Collator()` constructor for details on the `locales` and `options` parameters and how to use them.

### Return value

A **negative** number if `referenceStr` occurs before `compareString`; **positive** if the `referenceStr` occurs after `compareString`; `0` if they are equivalent.

In implementations with `Intl.Collator`, this is equivalent to `new Intl.Collator(locales, options).compare(referenceStr, compareString)`.

## Description

Returns an integer indicating whether the `referenceStr` comes
before, after or is equivalent to the `compareString`.

- Negative when the `referenceStr` occurs before
  `compareString`
- Positive when the `referenceStr` occurs after
  `compareString`
- Returns `0` if they are equivalent

> **Warning:**
> Do not rely on exact return values of `-1` or `1`!
>
> Negative and positive integer results vary between browsers (as well as between
> browser versions) because the ECMAScript specification only mandates negative and positive
> values. Some browsers may return `-2` or `2`, or even some other
> negative or positive value.

## Examples

### Using localeCompare()

```js
// The letter "a" is before "c" yielding a negative value
"a".localeCompare("c"); // -2 or -1 (or some other negative value)

// Alphabetically the word "check" comes after "against" yielding a positive value
"check".localeCompare("against"); // 2 or 1 (or some other positive value)

// "a" and "a" are equivalent yielding a neutral value of zero
"a".localeCompare("a"); // 0
```

### Sort an array

`localeCompare()` enables case-insensitive sorting for an array.

```js
const items = ["réservé", "Premier", "Cliché", "communiqué", "café", "Adieu"];
items.sort((a, b) => a.localeCompare(b, "fr", { ignorePunctuation: true }));
// ['Adieu', 'café', 'Cliché', 'communiqué', 'Premier', 'réservé']
```

### Check browser support for extended arguments

The `locales` and `options` arguments are
not supported in all browsers yet.

To check whether an implementation supports them, use the `"i"` argument (a
requirement that illegal language tags are rejected) and look for a
`RangeError` exception:

```js
function localeCompareSupportsLocales() {
  try {
    "foo".localeCompare("bar", "i");
  } catch (e) {
    return e.name === "RangeError";
  }
  return false;
}
```

### Using locales

The results provided by `localeCompare()` vary between languages. In order
to get the sort order of the language used in the user interface of your application,
make sure to specify that language (and possibly some fallback languages) using the
`locales` argument:

```js
console.log("ä".localeCompare("z", "de")); // a negative value: in German, ä sorts before z
console.log("ä".localeCompare("z", "sv")); // a positive value: in Swedish, ä sorts after z
```

### Using options

The results provided by `localeCompare()` can be customized using the
`options` argument:

```js
// in German, ä has a as the base letter
console.log("ä".localeCompare("a", "de", { sensitivity: "base" })); // 0

// in Swedish, ä and a are separate base letters
console.log("ä".localeCompare("a", "sv", { sensitivity: "base" })); // a positive value
```

### Numeric sorting

```js
// by default, "2" > "10"
console.log("2".localeCompare("10")); // 1

// numeric using options:
console.log("2".localeCompare("10", undefined, { numeric: true })); // -1

// numeric using locales tag:
console.log("2".localeCompare("10", "en-u-kn-true")); // -1
```

## See also

- `Intl.Collator`
