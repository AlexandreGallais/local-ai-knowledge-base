---
title: "Intl.NumberFormat() constructor (part 2 of 4)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/intl/numberformat/numberformat/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Intl.NumberFormat() constructor (part 2 of 4)

## Syntax

```js
new Intl.NumberFormat()
new Intl.NumberFormat(locales)
new Intl.NumberFormat(locales, options)

Intl.NumberFormat()
Intl.NumberFormat(locales)
Intl.NumberFormat(locales, options)
```

> **Note:**
> `Intl.NumberFormat()` can be called with or without `new`. Both create a new `Intl.NumberFormat` instance. However, there's a special behavior when it's called without `new` and the `this` value is another `Intl.NumberFormat` instance; see Return value.

### Parameters

- `locales` (optional)
    A string with a BCP 47 language tag or an `Intl.Locale` instance, or an array of such locale identifiers. The runtime's default locale is used when `undefined` is passed or when none of the specified locale identifiers is supported. For the general form and interpretation of the `locales` argument, see the parameter description on the `Intl` main page.

    The following Unicode extension key is allowed:
    - `nu`
        See `numberingSystem`.

    This key can also be set with `options` (as listed below). When both are set, the `options` property takes precedence.

- `options` (optional)
    An object. For ease of reading, the property list is broken into sections based on their purposes, including locale options, style options, digit options, and other options.

#### Locale options

- `localeMatcher`
    The locale matching algorithm to use. Possible values are `"lookup"` and `"best fit"`; the default is `"best fit"`.
    For information about this option, see Locale identification and negotiation.
- `numberingSystem`
    The numbering system to use for number formatting, such as `"arab"`, `"hans"`, `"mathsans"`, and so on. For a list of supported numbering system types, see `Intl.supportedValuesOf()`; the default is locale dependent. This option can also be set through the `nu` Unicode extension key; if both are provided, this `options` property takes precedence.

#### Style options

Depending on the `style` used, some of them may be ignored, and others may be required:

- `style`
    The formatting style to use.
    - `"decimal"` (default)
        For plain number formatting.
    - `"currency"`
        For currency formatting.
    - `"percent"`
        For percent formatting.
    - `"unit"`
        For unit formatting.
- `currency`
    The currency to use in currency formatting. Possible values are the ISO 4217 currency codes, such as `"USD"` for the US dollar, `"EUR"` for the euro, or `"CNY"` for the Chinese RMB — see `Intl.supportedValuesOf()`. There is no default value; if the `style` is `"currency"`, the `currency` property must be provided. It is normalized to uppercase.
- `currencyDisplay`
    How to display the currency in currency formatting.
    - `"code"`
        Use the ISO currency code.
    - `"symbol"` (default)
        Use a localized currency symbol such as €.
    - `"narrowSymbol"`
        Use a narrow format symbol ("$100" rather than "US$100").
    - `"name"`
        Use a localized currency name such as `"dollar"`.
- `currencySign`
    In many locales, accounting format means to wrap the number with parentheses instead of appending a minus sign. Possible values are `"standard"` and `"accounting"`; the default is `"standard"`.
- `unit`
    The unit to use in `unit` formatting. Possible values are listed in `Intl.supportedValuesOf()`. Pairs of simple units can be concatenated with "-per-" to make a compound unit. There is no default value; if the `style` is `"unit"`, the `unit` property must be provided.
- `unitDisplay`
    The unit formatting style to use in `unit` formatting. Possible values are:
    - `"short"` (default)
        E.g., `16 l`.
    - `"narrow"`
        E.g., `16l`.
    - `"long"`
        E.g., `16 litres`.

#### Digit options

The following properties are also supported by `Intl.PluralRules`.

- `minimumIntegerDigits`
    The minimum number of integer digits to use. A value with a smaller number of integer digits than this number will be left-padded with zeros (to the specified length) when formatted. Possible values are from `1` to `21`; the default is `1`.
- `minimumFractionDigits`
    The minimum number of fraction digits to use. Possible values are from `0` to `100`; the default for plain number and percent formatting is `0`; the default for currency formatting is the number of minor unit digits provided by the ISO 4217 currency code list (2 if the list doesn't provide that information). See SignificantDigits/FractionDigits default values for when this default gets applied.
- `maximumFractionDigits`
    The maximum number of fraction digits to use. Possible values are from `0` to `100`; the default for plain number formatting is the larger of `minimumFractionDigits` and `3`; the default for currency formatting is the larger of `minimumFractionDigits` and the number of minor unit digits provided by the ISO 4217 currency code list (2 if the list doesn't provide that information); the default for percent formatting is the larger of `minimumFractionDigits` and 0. See SignificantDigits/FractionDigits default values for when this default gets applied.
- `minimumSignificantDigits`
    The minimum number of significant digits to use. Possible values are from `1` to `21`; the default is `1`. See SignificantDigits/FractionDigits default values for when this default gets applied.
- `maximumSignificantDigits`
    The maximum number of significant digits to use. Possible values are from `1` to `21`; the default is `21`. See SignificantDigits/FractionDigits default values for when this default gets applied.
- `roundingPriority`
    Specify how rounding conflicts will be resolved if both "FractionDigits" (`minimumFractionDigits`/`maximumFractionDigits`) and "SignificantDigits" (`minimumSignificantDigits`/`maximumSignificantDigits`) are specified.
    Possible values are:
    - `"auto"` (default)
        The result from the significant digits property is used.
    - `"morePrecision"`
        The result from the property that results in more precision is used.
    - `"lessPrecision"`
        The result from the property that results in less precision is used.

    The value `"auto"` is normalized to `"morePrecision"` if `notation` is `"compact"` and none of the four "FractionDigits"/"SignificantDigits" options are set.

    Note that for values other than `auto` the result with more precision is calculated from the `maximumSignificantDigits` and `maximumFractionDigits` (minimum fractional and significant digit settings are ignored).

- `roundingIncrement`
    Indicates the increment at which rounding should take place relative to the calculated rounding magnitude. Possible values are `1`, `2`, `5`, `10`, `20`, `25`, `50`, `100`, `200`, `250`, `500`, `1000`, `2000`, `2500`, and `5000`; the default is `1`. It cannot be mixed with significant-digits rounding or any setting of `roundingPriority` other than `auto`.

- `roundingMode`
    How decimals should be rounded. Possible values are:
    - `"ceil"`
        Round toward +∞. Positive values round up. Negative values round "more positive".
    - `"floor"`
        Round toward -∞. Positive values round down. Negative values round "more negative".
    - `"expand"`
        Round away from 0. The _magnitude_ of the value is always increased by rounding. Positive values round up. Negative values round "more negative".
    - `"trunc"`
        Round toward 0. This _magnitude_ of the value is always reduced by rounding. Positive values round down. Negative values round "less negative".
    - `"halfCeil"`
        Ties toward +∞. Values above the half-increment round like `"ceil"` (towards +∞), and below like `"floor"` (towards -∞). On the half-increment, values round like `"ceil"`.
    - `"halfFloor"`
        Ties toward -∞. Values above the half-increment round like `"ceil"` (towards +∞), and below like `"floor"` (towards -∞). On the half-increment, values round like `"floor"`.
    - `"halfExpand"` (default)
        Ties away from 0. Values above the half-increment round like `"expand"` (away from zero), and below like `"trunc"` (towards 0). On the half-increment, values round like `"expand"`.
    - `"halfTrunc"`
        Ties toward 0. Values above the half-increment round like `"expand"` (away from zero), and below like `"trunc"` (towards 0). On the half-increment, values round like `"trunc"`.
    - `"halfEven"`
        Ties towards the nearest even integer. Values above the half-increment round like `"expand"` (away from zero), and below like `"trunc"` (towards 0). On the half-increment values round towards the nearest even digit.

    These options reflect the ICU user guide, where "expand" and "trunc" map to ICU "UP" and "DOWN", respectively.
    The rounding modes example below demonstrates how each mode works.

- `trailingZeroDisplay`
    The strategy for displaying trailing zeros on whole numbers. Possible values are:
    - `"auto"` (default)
        Keep trailing zeros according to `minimumFractionDigits` and `minimumSignificantDigits`.
    - `"stripIfInteger"`
        Remove the fraction digits _if_ they are all zero. This is the same as `"auto"` if any of the fraction digits is non-zero.

##### SignificantDigits/FractionDigits default values

For the four options above (the `FractionDigits` and `SignificantDigits` options), we mentioned their defaults; however, these defaults are _not unconditionally applied_. They are only applied when the property is actually going to be used, which depends on the `roundingPriority` and `notation` settings. Specifically:

- If `roundingPriority` is not `"auto"`, then all four options apply.
- If `roundingPriority` is `"auto"` and at least one `SignificantDigits` option is set, then the `SignificantDigits` options apply and the `FractionDigits` options are ignored.
- If `roundingPriority` is `"auto"`, and either at least one `FractionDigits` option is set or `notation` is not `"compact"`, then the `FractionDigits` options apply and the `SignificantDigits` options are ignored.
- If `roundingPriority` is `"auto"`, `notation` is `"compact"`, and none of the four options are set, then they are set to `{ minimumFractionDigits: 0, maximumFractionDigits: 0, minimumSignificantDigits: 1, maximumSignificantDigits: 2 }`, regardless of the defaults mentioned above, and `roundingPriority` is set to `"morePrecision"`.

#### Other options

- `notation`
    The formatting that should be displayed for the number. Possible values are:
    - `"standard"` (default)
        Plain number formatting.
    - `"scientific"`
        Return the order-of-magnitude for formatted number.
    - `"engineering"`
        Return the exponent of ten when divisible by three.
    - `"compact"`
        String representing exponent; defaults to using the "short" form.
- `compactDisplay`
    Only used when `notation` is `"compact"`. Possible values are `"short"` and `"long"`; the default is `"short"`.
- `useGrouping`
    Whether to use grouping separators, such as thousands separators or thousand/lakh/crore separators.
    - `"always"`
        Display grouping separators even if the locale prefers otherwise.
    - `"auto"`
        Display grouping separators based on the locale preference, which may also be dependent on the currency.
    - `"min2"`
        Display grouping separators when there are at least 2 digits in a group.
    - `true`
        Same as `"always"`.
    - `false`
        Display no grouping separators.

    The default is `"min2"` if `notation` is `"compact"`, and `"auto"` otherwise. The string values `"true"` and `"false"` are accepted, but are always converted to the default value.

- `signDisplay`
    When to display the sign for the number. Possible values are:
    - `"auto"` (default)
        Sign display for negative numbers only, including negative zero.
    - `"always"`
        Always display sign.
    - `"exceptZero"`
        Sign display for positive and negative numbers, but not zero.
    - `"negative"`
        Sign display for negative numbers only, excluding negative zero.
    - `"never"`
        Never display sign.

### Return value

A new `Intl.NumberFormat` object.

> **Note:**
> The text below describes behavior that is marked by the specification as "optional". It may not work in all environments. Check the browser compatibility table.

Normally, `Intl.NumberFormat()` can be called with or without `new`, and a new `Intl.NumberFormat` instance is returned in both cases. However, if the `this` value is an object that is `instanceof` `Intl.NumberFormat` (doesn't necessarily mean it's created via `new Intl.NumberFormat`; just that it has `Intl.NumberFormat.prototype` in its prototype chain), then the value of `this` is returned instead, with the newly created `Intl.NumberFormat` object hidden in a `[Symbol(IntlLegacyConstructedSymbol)]` property (a unique symbol that's reused between instances).

```js
const formatter = Intl.NumberFormat.call(
  { __proto__: Intl.NumberFormat.prototype },
  "en-US",
  { notation: "scientific" },
);
console.log(Object.getOwnPropertyDescriptors(formatter));
// {
//   [Symbol(IntlLegacyConstructedSymbol)]: {
//     value: NumberFormat [Intl.NumberFormat] {},
//     writable: false,
//     enumerable: false,
//     configurable: false
//   }
// }
```

Note that there's only one actual `Intl.NumberFormat` instance here: the one hidden in `[Symbol(IntlLegacyConstructedSymbol)]`. Calling the `format()` and `resolvedOptions()` methods on `formatter` would correctly use the options stored in that instance, but calling all other methods (e.g., `formatRange()`) would fail with "TypeError: formatRange method called on incompatible Object", because those methods don't consult the hidden instance's options.

This behavior, called `ChainNumberFormat`, does not happen when `Intl.NumberFormat()` is called without `new` but with `this` set to anything else that's not an `instanceof Intl.NumberFormat`. If you call it directly as `Intl.NumberFormat()`, the `this` value is `Intl`, and a new `Intl.NumberFormat` instance is created normally.

### Exceptions

- `RangeError`
    Thrown in one of the following cases:
    - A property that takes enumerated values (such as `style`, `units`, `currency`, and so on) is set to an invalid value.
    - Both `maximumFractionDigits` and `minimumFractionDigits` are set, and they are set to different values.
      Note that depending on various formatting options, these properties can have default values.
      It is therefore possible to get this error even if you only set one of the properties.
- `TypeError`
    Thrown if the `options.style` property is set to "unit" or "currency", and no value has been set for the corresponding property `options.unit` or `options.currency`.
