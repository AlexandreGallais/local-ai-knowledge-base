---
title: "Intl.Collator.prototype.resolvedOptions()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/intl/collator/resolvedoptions/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Intl.Collator.prototype.resolvedOptions()

The **`resolvedOptions()`** method of `Intl.Collator` instances returns a new object with properties reflecting the options computed during initialization of this `Collator` object.

```js
const numberDe = new Intl.NumberFormat("de-DE");
const numberAr = new Intl.NumberFormat("ar");

console.log(numberDe.resolvedOptions().numberingSystem);
// Expected output: "latn"

console.log(numberAr.resolvedOptions().numberingSystem);
// Expected output: "arab"
```

## Syntax

```js
resolvedOptions()
```

### Parameters

None.

### Return value

A new object with properties reflecting the options computed during the initialization of this `Collator` object. The object has the following properties, in the order they are listed:

- `locale`
    The BCP 47 language tag for the locale actually used, determined by the locale negotiation process. Only the `co`, `kn`, and `kf` Unicode extension keys, if requested and supported, may be included in the output.
- `usage`
    The value provided for this property in the `options` argument, with default filled in as needed. It is either `"sort"` or `"search"`. The default is `"sort"`.
- `sensitivity`
    The value provided for this property in the `options` argument, with default filled in as needed. It is either `"base"`, `"accent"`, `"case"`, or `"variant"`. The default is `"variant"` for usage `"sort"`; it's locale dependent for usage `"search"`.
- `ignorePunctuation`
    The value provided for this property in the `options` argument, with default filled in as needed. It is a boolean. The default is `true` for Thai (`th`) and `false` for all other languages.
- `collation`
    The value provided for this property in the `options` argument, or using the Unicode extension key `"co"`, with default filled in as needed. It is a supported collation type for this locale. The default is `"default"`.
- `numeric`
    The value provided for this property in the `options` argument, or using the Unicode extension key `"kn"`, with default filled in as needed. It is a boolean. The default is `false`. If the implementation does not support this Unicode extension key, this property is omitted.
- `caseFirst`
    The value provided for this property in the `options` argument, or using the Unicode extension key `"kf"`, with default filled in as needed. It is either `"upper"`, `"lower"`, or `"false"`. The default is `"false"`. If the implementation does not support this Unicode extension key, this property is omitted.

## Examples

### Using the resolvedOptions method

```js
const de = new Intl.Collator("de", { sensitivity: "base" });
const usedOptions = de.resolvedOptions();

usedOptions.locale; // "de"
usedOptions.usage; // "sort"
usedOptions.sensitivity; // "base"
usedOptions.ignorePunctuation; // false
usedOptions.collation; // "default"
usedOptions.numeric; // false
```

## See also

- `Intl.Collator`
