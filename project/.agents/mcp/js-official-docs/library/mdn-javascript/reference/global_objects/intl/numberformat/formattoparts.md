---
title: "Intl.NumberFormat.prototype.formatToParts()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/intl/numberformat/formattoparts/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Intl.NumberFormat.prototype.formatToParts()

The **`formatToParts()`** method of `Intl.NumberFormat` instances returns an array of objects representing each part of the formatted string that would be returned by `format()`. It is useful for building custom strings from the locale-specific tokens.

```js
const amount = 654321.987;
const options = { style: "currency", currency: "USD" };
const numberFormat = new Intl.NumberFormat("en-US", options);

const parts = numberFormat.formatToParts(amount);
const partValues = parts.map((p) => p.value);

console.log(partValues);
// Expected output: "["$", "654", ",", "321", ".", "99"]"
```

## Syntax

```js
formatToParts(number)
```

### Parameters

- `number`
    A `Number`, `BigInt`, or string, to format. Strings are parsed in the same way as in number conversion, except that `formatToParts()` will use the exact value that the string represents, avoiding loss of precision during implicitly conversion to a number.

### Return value

An `Array` of objects containing the formatted number in parts. Each object has two properties, `type` and `value`, each containing a string. The string concatenation of `value`, in the order provided, will result in the same string as `format()`. The `type` may be one of the following:

- `literal`
    Any string that's a part of the format pattern; for example `"<example-value>"`. Note that common tokens like the decimal separator or the plus/minus signs have their own token types.
- `integer`
    The integral part of the number, or a segment of it if using grouping (controlled by `options.useGrouping`).
- `group`
    The group separator string, such as `","`. Only present when using grouping (controlled by `options.useGrouping`).
- `decimal`
    The decimal separator string, such as `"."`. Only present when `fraction` is present.
- `fraction`
    The fractional part of the number.
- `compact`
    The compact exponent, such as `"M"` or `"thousands"`. Only present when `options.notation` is `"compact"`. The form (`"short"` or `"long"`) can be controlled via `options.compactDisplay`.
- `exponentSeparator`
    The exponent separator, such as `"E"`. Only present when `options.notation` is `"scientific"` or `"engineering"`.
- `exponentMinusSign`
    The exponent minus sign string, such as `"-"`. Only present when `options.notation` is `"scientific"` or `"engineering"` and the exponent is negative.
- `exponentInteger`
    The exponent's integer value. Only present when `options.notation` is `"scientific"` or `"engineering"`.
- `nan`
    A string representing `NaN`, such as `"<example-value>"`. This is the sole token <example-value> the number itself when the number is `NaN`.
- `infinity`
    A string representing `Infinity` or `-Infinity`, such as `"<example-value>"`. This is the sole token <example-value> the number itself when the number is `Infinity` or `-Infinity`.
- `plusSign`
    The plus sign, such as `"+"`.
- `minusSign`
    The minus sign, such as `"-"`.
- `percentSign`
    The percent sign, such as `"%"`. Only present when `options.style` is `"percent"`.
- `unit`
    The unit string, such as `"l"` or `"litres"`. Only present when `options.style` is `"unit"`. The form (`"short"`, `"narrow"`, or `"long"`) can be controlled via `options.unitDisplay`.
- `currency`
    The currency string, such as `"$"`, `"€"`, `"Dollar"`, or `"Euro"`. Only present when `options.style` is `"currency"`. The form (`"code"`, `"symbol"`, `"narrowSymbol"`, or `"name"`) can be controlled via `options.currencyDisplay`.
- `unknown`
    Reserved for any token that's not recognized as one of the above; should be rarely encountered.

## Examples

### Using formatToParts()

The `format()` method outputs localized, opaque strings that cannot be manipulated directly:

```js
const number = 3500;

const formatter = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
});

formatter.format(number);
// "3.500,00 €"
```

However, in many user interfaces you may want to customize the formatting of this string, or interleave it with other texts. The `formatToParts()` method produces the same information in parts:

```js
formatter.formatToParts(number);

// return value:
[
  { type: "integer", value: "3" },
  { type: "group", value: "." },
  { type: "integer", value: "500" },
  { type: "decimal", value: "," },
  { type: "fraction", value: "00" },
  { type: "literal", value: " " },
  { type: "currency", value: "€" },
];
```

Now the information is available separately and it can be formatted and concatenated again in a customized way. For example by using `Array.prototype.map()`, arrow functions, a switch statement, template literals, and `Array.prototype.join()`, to insert additional markup for certain components.

```js
const numberString = formatter
  .formatToParts(number)
  .map(({ type, value }) => {
    switch (type) {
      case "currency":
        return `<strong>${value}</strong>`;
      default:
        return value;
    }
  })
  .join("");

console.log(numberString);
// "3.500,00 <strong>€</strong>"
```

## See also

- `Intl.NumberFormat`
- `Intl.NumberFormat.prototype.format()`
