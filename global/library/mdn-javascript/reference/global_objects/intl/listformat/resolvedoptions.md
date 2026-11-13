---
title: "Intl.ListFormat.prototype.resolvedOptions()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/intl/listformat/resolvedoptions/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Intl.ListFormat.prototype.resolvedOptions()

The **`resolvedOptions()`** method of `Intl.ListFormat` instances returns a new object with properties reflecting the options computed during initialization of this `ListFormat` object.

```js
const deListFormatter = new Intl.ListFormat("de-DE", { type: "disjunction" });
const options = deListFormatter.resolvedOptions();

console.log(options.locale);
// Expected output: "de-DE"

console.log(options.style);
// Expected output: "long"

console.log(options.type);
// Expected output: "disjunction"
```

## Syntax

```js
resolvedOptions()
```

### Parameters

None.

### Return value

A new object with properties reflecting the options computed during the initialization of this `ListFormat` object. The object has the following properties, in the order they are listed:

- `locale`
    The BCP 47 language tag for the locale actually used, determined by the locale negotiation process. No Unicode extension key will be included in the output.
- `type`
    The value provided for this property in the `options` argument, with default filled in as needed. It is either `"conjunction"`, `"disjunction"`, or `"unit"`. The default is `"conjunction"`.
- `style`
    The value provided for this property in the `options` argument, with default filled in as needed. It is either `"long"`, `"short"`, or `"narrow"`. The default is `"long"`.

## Examples

### Using resolvedOptions

```js
const deListFormatter = new Intl.ListFormat("de-DE", { style: "short" });

const usedOptions = de.resolvedOptions();
console.log(usedOptions.locale); // "de-DE"
console.log(usedOptions.style); // "short"
console.log(usedOptions.type); // "conjunction" (the default value)
```

## See also

- `Intl.ListFormat`
- `Intl.NumberFormat.prototype.resolvedOptions()`
- `Intl.Collator.prototype.resolvedOptions()`
- `Intl.DateTimeFormat.prototype.resolvedOptions()`
- `Intl.PluralRules.prototype.resolvedOptions()`
