---
title: "Intl.Collator.prototype.compare()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/intl/collator/compare/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Intl.Collator.prototype.compare()

The **`compare()`** method of `Intl.Collator` instances compares two
strings according to the sort order of this collator object.

```js
const enCollator = new Intl.Collator("en");
const deCollator = new Intl.Collator("de");
const svCollator = new Intl.Collator("sv");

console.log(enCollator.compare("z", "a") > 0);
// Expected output: true

console.log(deCollator.compare("z", "ä") > 0);
// Expected output: true

console.log(svCollator.compare("z", "ä") > 0);
// Expected output: false
```

## Syntax

```js
compare(string1, string2)
```

### Parameters

- `string1`, `string2`
    The strings to compare against each other.

### Return value

A number indicating how `string1` and `string2` compare to each other according to the sort order of this `Intl.Collator` object:

- A negative value if `string1` comes before `string2`;
- A positive value if `string1` comes after `string2`;
- 0 if they are considered equal.

## Examples

### Using compare for array sort

Use the `compare` function for sorting arrays. Note that the function
is bound to the collator from which it was obtained, so it can be passed directly to
`Array.prototype.sort()`.

```js
const a = ["Offenbach", "Österreich", "Odenwald"];
const collator = new Intl.Collator("de-u-co-phonebk");
a.sort(collator.compare);
console.log(a.join(", ")); // "Odenwald, Österreich, Offenbach"
```

### Using compare for array search

Use the `compare` function for finding matching strings in arrays:

```js
const a = ["Congrès", "congres", "Assemblée", "poisson"];
const collator = new Intl.Collator("fr", {
  usage: "search",
  sensitivity: "base",
});
const s = "congres";
const matches = a.filter((v) => collator.compare(v, s) === 0);
console.log(matches.join(", ")); // "Congrès, congres"
```

## See also

- `Intl.Collator`
- `String.prototype.localeCompare()`
