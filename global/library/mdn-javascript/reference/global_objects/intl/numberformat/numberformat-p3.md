---
title: "Intl.NumberFormat() constructor (part 3 of 4)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/intl/numberformat/numberformat/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Intl.NumberFormat() constructor (part 3 of 4)

## Examples

### Basic usage

In basic use without specifying a locale, a formatted string in the default locale and with default options is returned.

```js
const amount = 3500;

console.log(new Intl.NumberFormat().format(amount));
// '3,500' if in US English locale
```

### Decimal and percent formatting

```js
const amount = 3500;

new Intl.NumberFormat("en-US", {
  style: "decimal",
}).format(amount); // '3,500'
new Intl.NumberFormat("en-US", {
  style: "percent",
}).format(amount); // '350,000%'
```

### Unit formatting

If the `style` is `'unit'`, a `unit` property must be provided.
Optionally, `unitDisplay` controls the unit formatting.

```js
const amount = 3500;

new Intl.NumberFormat("en-US", {
  style: "unit",
  unit: "liter",
}).format(amount); // '3,500 L'

new Intl.NumberFormat("en-US", {
  style: "unit",
  unit: "liter",
  unitDisplay: "long",
}).format(amount); // '3,500 liters'
```

### Currency formatting

If the `style` is `'currency'`, a `currency` property
must be provided. Optionally, `currencyDisplay` and
`currencySign` control the unit formatting.

```js
const amount = -3500;
new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
}).format(amount); // '-$3,500.00'

new Intl.NumberFormat("bn", {
  style: "currency",
  currency: "USD",
  currencyDisplay: "name",
}).format(amount); // '-3,500.00 US dollars'

new Intl.NumberFormat("bn", {
  style: "currency",
  currency: "USD",
  currencySign: "accounting",
}).format(amount); // '($3,500.00)'
```

### Scientific, engineering or compact notations

Scientific and compact notation are represented by the `notation` option and can be formatted like this:

```js
new Intl.NumberFormat("en-US", {
  notation: "scientific",
}).format(987654321);
// 9.877E8

new Intl.NumberFormat("pt-PT", {
  notation: "scientific",
}).format(987654321);
// 9,877E8

new Intl.NumberFormat("en-GB", {
  notation: "engineering",
}).format(987654321);
// 987.654E6

new Intl.NumberFormat("de", {
  notation: "engineering",
}).format(987654321);
// 987,654E6

new Intl.NumberFormat("zh-CN", {
  notation: "compact",
}).format(987654321);
// 9.9亿

new Intl.NumberFormat("fr", {
  notation: "compact",
  compactDisplay: "long",
}).format(987654321);
// 988 millions

new Intl.NumberFormat("en-GB", {
  notation: "compact",
  compactDisplay: "short",
}).format(987654321);
// 988M
```

### Displaying signs

Display a sign for positive and negative numbers, but not zero:

```js
new Intl.NumberFormat("en-US", {
  style: "percent",
  signDisplay: "exceptZero",
}).format(0.55);
// '+55%'
```

Note that when the currency sign is "accounting", parentheses might be used instead of a minus sign:

```js
new Intl.NumberFormat("bn", {
  style: "currency",
  currency: "USD",
  currencySign: "accounting",
  signDisplay: "always",
}).format(-3500);
// '($3,500.00)'
```

### FractionDigits, SignificantDigits and IntegerDigits

You can specify the minimum or maximum number of fractional, integer or significant digits to display when formatting a number.

> **Note:**
> If both significant and fractional digit limits are specified, then the actual formatting depends on the `roundingPriority`.

#### Using FractionDigits and IntegerDigits

The integer and fraction digit properties indicate the number of digits to display before and after the decimal point, respectively.
If the value to display has fewer integer digits than specified, it will be left-padded with zeros to the expected number.
If it has fewer fractional digits, it will be right-padded with zeros.
Both cases are shown below:

```js
// Formatting adds zeros to display minimum integers and fractions
console.log(
  new Intl.NumberFormat("en", {
    minimumIntegerDigits: 3,
    minimumFractionDigits: 4,
  }).format(4.33),
);
// "004.3300"
```

If a value has more fractional digits than the specified maximum number, it will be rounded.
The _way_ that it is rounded depends on the `roundingMode` property (more details are provided in the rounding modes section).
Below the value is rounded from five fractional digits (`4.33145`) to two (`4.33`):

```js
// Display value shortened to maximum number of digits
console.log(
  new Intl.NumberFormat("en", {
    maximumFractionDigits: 2,
  }).format(4.33145),
);
// "4.33"
```

The minimum fractional digits have no effect if the value already has more than 2 fractional digits:

```js
// Minimum fractions have no effect if value is higher precision.
console.log(
  new Intl.NumberFormat("en", {
    minimumFractionDigits: 2,
  }).format(4.33145),
);
// "4.331"
```

> **Warning:**
> Watch out for default values as they may affect formatting even if not specified in your code.
> The default maximum digit value is `3` for plain values, `2` for currency, and may have different values for other predefined types.

The formatted value above is rounded to 3 digits, even though we didn't specify the maximum digits!
This is because a default value of `maximumFractionDigits` is set when we specify `minimumFractionDigits`, and visa versa. The default values of `maximumFractionDigits` and `minimumFractionDigits` are `3` and `0`, respectively.

You can use `resolvedOptions()` to inspect the formatter.

```js
console.log(
  new Intl.NumberFormat("en", {
    maximumFractionDigits: 2,
  }).resolvedOptions(),
);
// {
//   …
//   minimumIntegerDigits: 1,
//   minimumFractionDigits: 0,
//   maximumFractionDigits: 2,
//   …
// }

console.log(
  new Intl.NumberFormat("en", {
    minimumFractionDigits: 2,
  }).resolvedOptions(),
);
// {
//   …
//   minimumIntegerDigits: 1,
//   minimumFractionDigits: 2,
//   maximumFractionDigits: 3,
//   …
// }
```

#### Using SignificantDigits

The number of _significant digits_ is the total number of digits including both integer and fractional parts.
The `maximumSignificantDigits` is used to indicate the total number of digits from the original value to display.

The examples below show how this works.
Note in particular the last case: only the first digit is retained and the others are discarded/set to zero.

```js
// Display 5 significant digits
console.log(
  new Intl.NumberFormat("en", {
    maximumSignificantDigits: 5,
  }).format(54.33145),
);
// "54.331"

// Max 2 significant digits
console.log(
  new Intl.NumberFormat("en", {
    maximumSignificantDigits: 2,
  }).format(54.33145),
);
// "54"

// Max 1 significant digits
console.log(
  new Intl.NumberFormat("en", {
    maximumSignificantDigits: 1,
  }).format(54.33145),
);
// "50"
```

The `minimumSignificantDigits` ensures that at least the specified number of digits are displayed, adding zeros to the end of the value if needed.

```js
// Minimum 10 significant digits
console.log(
  new Intl.NumberFormat("en", {
    minimumSignificantDigits: 10,
  }).format(54.33145),
);
// "54.33145000"
```

> **Warning:**
> Watch out for default values as they may affect formatting.
> If only one `SignificantDigits` property is used, then its counterpart will automatically be applied with the default value.
> The default maximum and minimum significant digit values are 21 and 1, respectively.

#### Specifying significant and fractional digits at the same time

The fraction digits (`minimumFractionDigits`/`maximumFractionDigits`) and significant digits (`minimumSignificantDigits`/`maximumSignificantDigits`) are both ways of controlling how many fractional and leading digits should be formatted.
If both are used at the same time, it is possible for them to conflict.

These conflicts are resolved using the `roundingPriority` property.
By default, this has a value of `"auto"`, which means that if either `minimumSignificantDigits` or `maximumSignificantDigits` is specified, the fractional and integer digit properties will be ignored.

For example, the code below formats the value of `4.33145` with `maximumFractionDigits: 3`, and then `maximumSignificantDigits: 2`, and then both.
The value with both is the one set with `maximumSignificantDigits`.

```js
console.log(
  new Intl.NumberFormat("en", {
    maximumFractionDigits: 3,
  }).format(4.33145),
);
// "4.331"
console.log(
  new Intl.NumberFormat("en", {
    maximumSignificantDigits: 2,
  }).format(4.33145),
);
// "4.3"
console.log(
  new Intl.NumberFormat("en", {
    maximumFractionDigits: 3,
    maximumSignificantDigits: 2,
  }).format(4.33145),
);
// "4.3"
```

Using `resolvedOptions()` to inspect the formatter, we can see that the returned object does not include `maximumFractionDigits` when `maximumSignificantDigits` or `minimumSignificantDigits` are specified.

```js
console.log(
  new Intl.NumberFormat("en", {
    maximumFractionDigits: 3,
    maximumSignificantDigits: 2,
  }).resolvedOptions(),
);
// {
//   …
//   minimumIntegerDigits: 1,
//   minimumSignificantDigits: 1,
//   maximumSignificantDigits: 2,
//   …
// }
console.log(
  new Intl.NumberFormat("en", {
    maximumFractionDigits: 3,
    minimumSignificantDigits: 2,
  }).resolvedOptions(),
);
// {
//   …
//   minimumIntegerDigits: 1,
//   minimumSignificantDigits: 2,
//   maximumSignificantDigits: 21,
//   …
// }
```

In addition to `"auto"`, you can resolve conflicts by specifying `roundingPriority` as `"morePrecision"` or `"lessPrecision"`.
The formatter calculates the precision using the values of `maximumSignificantDigits` and `maximumFractionDigits`.

The code below shows the format being selected for the three different rounding priorities:

```js
const maxFracNF = new Intl.NumberFormat("en", {
  maximumFractionDigits: 3,
});
console.log(`maximumFractionDigits:3 - ${maxFracNF.format(1.23456)}`);
// "maximumFractionDigits:2 - 1.235"

const maxSigNS = new Intl.NumberFormat("en", {
  maximumSignificantDigits: 3,
});
console.log(`maximumSignificantDigits:3 - ${maxSigNS.format(1.23456)}`);
// "maximumSignificantDigits:3 - 1.23"

const bothAuto = new Intl.NumberFormat("en", {
  maximumSignificantDigits: 3,
  maximumFractionDigits: 3,
});
console.log(`auto - ${bothAuto.format(1.23456)}`);
// "auto - 1.23"

const bothLess = new Intl.NumberFormat("en", {
  roundingPriority: "lessPrecision",
  maximumSignificantDigits: 3,
  maximumFractionDigits: 3,
});
console.log(`lessPrecision - ${bothLess.format(1.23456)}`);
// "lessPrecision - 1.23"

const bothMore = new Intl.NumberFormat("en", {
  roundingPriority: "morePrecision",
  maximumSignificantDigits: 3,
  maximumFractionDigits: 3,
});
console.log(`morePrecision - ${bothMore.format(1.23456)}`);
// "morePrecision - 1.235"
```

Note that the algorithm can behave in an unintuitive way if a minimum value is specified without a maximum value.
The example below formats the value `1` specifying `minimumFractionDigits: 2` (formatting to `1.00`) and `minimumSignificantDigits: 2` (formatting to `1.0`).
Since `1.00` has more digits than `1.0`, this should be the result when prioritizing `morePrecision`, but in fact the opposite is true:

```js
const bothLess = new Intl.NumberFormat("en", {
  roundingPriority: "lessPrecision",
  minimumFractionDigits: 2,
  minimumSignificantDigits: 2,
});
console.log(`lessPrecision - ${bothLess.format(1)}`);
// "lessPrecision - 1.00"

const bothMore = new Intl.NumberFormat("en", {
  roundingPriority: "morePrecision",
  minimumFractionDigits: 2,
  minimumSignificantDigits: 2,
});
console.log(`morePrecision - ${bothMore.format(1)}`);
// "morePrecision - 1.0"
```

The reason for this is that only the "maximum precision" values are used for the calculation, and the default value of `maximumSignificantDigits` is much higher than `maximumFractionDigits`.

> **Note:**
> The working group have proposed a modification of the algorithm where the formatter should evaluate the result of using the specified fractional and significant digits independently (taking account of both minimum and maximum values).
> It will then select the option that displays more fractional digits if `morePrecision` is set, and fewer if `lessPrecision` is set.
> This will result in more intuitive behavior for this case.
