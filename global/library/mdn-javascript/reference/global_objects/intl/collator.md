---
title: "Intl.Collator"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/intl/collator/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Intl.Collator

The **`Intl.Collator`** object enables language-sensitive string comparison.

```js
console.log(["Z", "a", "z", "ä"].sort(new Intl.Collator("de").compare));
// Expected output: Array ["a", "ä", "z", "Z"]

console.log(["Z", "a", "z", "ä"].sort(new Intl.Collator("sv").compare));
// Expected output: Array ["a", "z", "Z", "ä"]

console.log(
  ["Z", "a", "z", "ä"].sort(
    new Intl.Collator("de", { caseFirst: "upper" }).compare,
  ),
);
// Expected output: Array ["a", "ä", "Z", "z"]
```

## Constructor

- `Intl.Collator()`
    Creates a new `Collator` object.

## Static methods

- `Intl.Collator.supportedLocalesOf()`
    Returns an array containing those of the provided locales that are supported without having to fall back to the runtime's default locale.

## Instance properties

These properties are defined on `Intl.Collator.prototype` and shared by all `Intl.Collator` instances.

- `Intl.Collator.prototype.constructor`
    The constructor function that created the instance object. For `Intl.Collator` instances, the initial value is the `Intl.Collator` constructor.
- `Intl.Collator.prototype[Symbol.toStringTag]`
    The initial value of the `[Symbol.toStringTag]` property is the string `"Intl.Collator"`. This property is used in `Object.prototype.toString()`.

## Instance methods

- `Intl.Collator.prototype.compare()`
    Getter function that compares two strings according to the sort order of this `Intl.Collator` object.
- `Intl.Collator.prototype.resolvedOptions()`
    Returns a new object with properties reflecting the locale and collation options computed during initialization of the object.

## Examples

### Using Collator

The following example demonstrates the different potential results for a string occurring before, after, or at the same level as another:

```js
console.log(new Intl.Collator().compare("a", "c")); // -1, or some other negative value
console.log(new Intl.Collator().compare("c", "a")); // 1, or some other positive value
console.log(new Intl.Collator().compare("a", "a")); // 0
```

Note that the results shown in the code above can vary between browsers and browser versions. This is because the values are implementation-specific. That is, the specification requires only that the before and after values are negative and positive.

### Using locales

The results provided by `Intl.Collator.prototype.compare()` vary between languages. In order to get the sort order of the language used in the user interface of your application, make sure to specify that language (and possibly some fallback languages) using the `locales` argument:

```js
// in German, ä sorts with a
console.log(new Intl.Collator("de").compare("ä", "z"));
// -1, or some other negative value

// in Swedish, ä sorts after z
console.log(new Intl.Collator("sv").compare("ä", "z"));
// 1, or some other positive value
```

### Using options

The results provided by `Intl.Collator.prototype.compare()` can be customized using the `options` argument:

```js
// in German, ä has a as the base letter
console.log(new Intl.Collator("de", { sensitivity: "base" }).compare("ä", "a"));
// 0

// in Swedish, ä and a are separate base letters
console.log(new Intl.Collator("sv", { sensitivity: "base" }).compare("ä", "a"));
// 1, or some other positive value
```

## See also

- `Intl`
- `String.prototype.localeCompare()`
