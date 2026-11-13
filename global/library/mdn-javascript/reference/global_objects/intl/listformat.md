---
title: "Intl.ListFormat"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/intl/listformat/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Intl.ListFormat

The **`Intl.ListFormat`** object enables language-sensitive list formatting.

```js
const vehicles = ["Motorcycle", "Bus", "Car"];

const formatter = new Intl.ListFormat("en", {
  style: "long",
  type: "conjunction",
});
console.log(formatter.format(vehicles));
// Expected output: "Motorcycle, Bus, and Car"

const formatter2 = new Intl.ListFormat("de", {
  style: "short",
  type: "disjunction",
});
console.log(formatter2.format(vehicles));
// Expected output: "Motorcycle, Bus oder Car"

const formatter3 = new Intl.ListFormat("en", { style: "narrow", type: "unit" });
console.log(formatter3.format(vehicles));
// Expected output: "Motorcycle Bus Car"
```

## Constructor

- `Intl.ListFormat()`
    Creates a new `Intl.ListFormat` object.

## Static methods

- `Intl.ListFormat.supportedLocalesOf()`
    Returns an array containing those of the provided locales that are supported without having to fall back to the runtime's default locale.

## Instance properties

These properties are defined on `Intl.ListFormat.prototype` and shared by all `Intl.ListFormat` instances.

- `Intl.ListFormat.prototype.constructor`
    The constructor function that created the instance object. For `Intl.ListFormat` instances, the initial value is the `Intl.ListFormat` constructor.
- `Intl.ListFormat.prototype[Symbol.toStringTag]`
    The initial value of the `[Symbol.toStringTag]` property is the string `"Intl.ListFormat"`. This property is used in `Object.prototype.toString()`.

## Instance methods

- `Intl.ListFormat.prototype.format()`
    Returns a language-specific formatted string representing the elements of the list.
- `Intl.ListFormat.prototype.formatToParts()`
    Returns an array of objects representing the different components that can be used to format a list of values in a locale-aware fashion.
- `Intl.ListFormat.prototype.resolvedOptions()`
    Returns a new object with properties reflecting the locale and style formatting options computed during the construction of the current `Intl.ListFormat` object.

## Examples

### Using format

The following example shows how to create a List formatter using the English language.

```js
const list = ["Motorcycle", "Bus", "Car"];

console.log(
  new Intl.ListFormat("en-GB", { style: "long", type: "conjunction" }).format(
    list,
  ),
);
// Motorcycle, Bus and Car

console.log(
  new Intl.ListFormat("en-GB", { style: "short", type: "disjunction" }).format(
    list,
  ),
);
// Motorcycle, Bus or Car

console.log(
  new Intl.ListFormat("en-GB", { style: "narrow", type: "unit" }).format(list),
);
// Motorcycle Bus Car
```

### Using formatToParts

The following example shows how to create a List formatter returning formatted parts

```js
const list = ["Motorcycle", "Bus", "Car"];
console.log(
  new Intl.ListFormat("en-GB", {
    style: "long",
    type: "conjunction",
  }).formatToParts(list),
);

// [ { "type": "element", "value": "Motorcycle" },
//   { "type": "literal", "value": ", " },
//   { "type": "element", "value": "Bus" },
//   { "type": "literal", "value": ", and " },
//   { "type": "element", "value": "Car" } ];
```

## See also

- Polyfill of `Intl.ListFormat` in FormatJS
- `Intl`
