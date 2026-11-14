---
title: "Intl.DurationFormat.prototype.resolvedOptions()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/intl/durationformat/resolvedoptions/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Intl.DurationFormat.prototype.resolvedOptions()

The **`resolvedOptions()`** method of `Intl.DurationFormat` instances returns a new object with properties reflecting the options computed during initialization of this `DurationFormat` object.

## Syntax

```js
resolvedOptions()
```

### Parameters

None.

### Return value

A new object with properties reflecting the options computed during the initialization of this `DurationFormat` object. The object has the following properties, in the order they are listed:

- `locale`
    The BCP 47 language tag for the locale actually used, determined by the locale negotiation process. Only the `nu` Unicode extension key, if requested, may be included in the output.
- `numberingSystem`
    The value provided for this property in the `options` argument, or using the Unicode extension key `"nu"`, with default filled in as needed. It is a supported numbering system for this locale. The default is locale dependent.
- `style`
    The value provided for this property in the `options` argument, with default filled in as needed. It is either `"long"`, `"short"`, `"narrow"`, or `"digital"`. The default is `"short"`.
- `years`, `yearsDisplay`, `months`, `monthsDisplay`, `weeks`, `weeksDisplay`, `days`, `daysDisplay`, `hours`, `hoursDisplay`, `minutes`, `minutesDisplay`, `seconds`, `secondsDisplay`, `milliseconds`, `millisecondsDisplay`, `nanoseconds`, `nanosecondsDisplay`
    The values provided for these properties in the `options` argument, with defaults filled in as needed. For the valid values and defaults for each, see the `options` argument of the constructor.
- `fractionalDigits` (optional)
    The value provided for this property in the `options` argument. It is only present if specified in `options`. It is an integer from 0 to 9, inclusive.

## Examples

### Using the resolvedOptions method

```js
const duration = new Intl.DurationFormat("en");
const usedOptions = duration.resolvedOptions();

usedOptions.locale; // "en"
usedOptions.numberingSystem; // "latn"
usedOptions.years; // "long"
usedOptions.yearsDisplay; // "auto"
usedOptions.style; // "long"
```

## See also

- `Intl.DurationFormat`
- `Intl.supportedValuesOf()`
- `Intl`
