---
title: "Breaking change: Decimal and BigInteger floating-point conversions are correctly rounded"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/11/decimal-biginteger-floating-point-conversions.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Decimal and BigInteger floating-point conversions are correctly rounded

Conversions between `System.Decimal` and binary floating-point types, and conversions from `System.Numerics.BigInteger` to binary floating-point types, now produce correctly rounded results. Previously, these conversions could truncate, round through intermediate values, or discard significant digits.

## Version introduced

.NET 11

## Previous behavior

Conversions from `float` and `double` to `decimal` retained only 7 and 15 significant decimal digits, respectively. This could hide the difference between a binary floating-point literal and a decimal literal:

```csharp
using System.Globalization;

double value = 1.23;
decimal converted = (decimal)value;

Console.WriteLine(converted.ToString("G29", CultureInfo.InvariantCulture));
```

The output was:

```text
1.23
```

Conversions from `decimal` to `float` or `double` could round more than once. For example:

```csharp
using System.Globalization;

decimal value = 10000000000000.099609375m;
double converted = (double)value;

Console.WriteLine(converted.ToString("G99", CultureInfo.InvariantCulture));
```

The output was:

```text
10000000000000.09765625
```

Conversions from `decimal` to `Half` or `BFloat16` first converted the value to `float`, which could also produce an incorrectly rounded result.

Conversions from `BigInteger` to `double` truncated discarded bits instead of rounding to the nearest representable value. For example:

```csharp
using System.Globalization;
using System.Numerics;

BigInteger value = long.MaxValue / 2;
double converted = (double)value;

Console.WriteLine(converted.ToString("G17", CultureInfo.InvariantCulture));
```

The output was:

```text
4.6116860184273874E+18
```

Conversions from `BigInteger` to `float`, `Half`, or `BFloat16` first converted the value to `double`, which could round twice and produce a result one unit in the last place away from the nearest representable value.

## New behavior

Starting in .NET 11, conversions round the exact source value once to the nearest representable destination value.

For the first example, the `double` value isn't exactly `1.23`. Its exact value is approximately `1.229999999999999982236431605997...`, so the converted `decimal` value is now:

```text
1.229999999999999982236431606
```

For the second example, the converted `double` value is now:

```text
10000000000000.099609375
```

Conversions from `decimal` to `Half` or `BFloat16` are also correctly rounded and can produce a different destination bit pattern than in previous versions.

For the `BigInteger` example, the converted `double` value is now:

```text
4.6116860184273879E+18
```

Conversions from `BigInteger` to `float`, `Half`, or `BFloat16` are also correctly rounded.

If a conversion is evaluated as a compile-time constant, a compiler hosted by the .NET 11 SDK or a later SDK can embed the new result in the output assembly when the project is rebuilt, regardless of the project's target framework.

## Type of breaking change

This change is a behavioral change.

## Reason for change

The previous conversion algorithms lost information that the destination type could represent and sometimes selected a value other than the nearest representable result. This caused precision errors in both directions of `decimal` conversion and in conversions from `BigInteger`. The new algorithms follow the expected floating-point rule of computation of the conversion as if with exact intermediate precision, followed by a single rounding to the destination type.

For more information, see dotnet/runtime#130565 and dotnet/runtime#130566.

## Recommended action

Don't assume that a binary floating-point literal and a decimal literal with the same source text represent the same value. If a value is intended to be decimal, use a decimal literal:

```csharp
decimal value = 123.4567m;
```

instead of a conversion from a `double` literal:

```csharp
decimal value = (decimal)123.4567;
```

To restore the previous result in general when you convert to `decimal`, round the converted value to 7 significant decimal digits for a `float` source or 15 significant decimal digits for a `double` source. The previous conversion rounded to nearest with ties to even; it didn't truncate. Positive and negative values were handled symmetrically.

For example, formatting the source value with the `G7` or `G15` standard numeric format string and parsing the result performs the corresponding significant-digit rounding for arbitrary finite values:

```csharp
using System.Globalization;

static decimal ConvertToDecimalLikePrevious(float value)
{
    Span<char> text = stackalloc char[32];
    value.TryFormat(text, out int length, "G7", CultureInfo.InvariantCulture);
    return decimal.Parse(text[..length], NumberStyles.Float, CultureInfo.InvariantCulture);
}

static decimal ConvertToDecimalLikePrevious(double value)
{
    Span<char> text = stackalloc char[32];
    value.TryFormat(text, out int length, "G15", CultureInfo.InvariantCulture);
    return decimal.Parse(text[..length], NumberStyles.Float, CultureInfo.InvariantCulture);
}

decimal fromFloat = ConvertToDecimalLikePrevious(14.1f);          // 14.1
decimal fromDouble = ConvertToDecimalLikePrevious(-123.4567);     // -123.4567
```

The span-based implementation doesn't allocate. Values outside the range of `decimal` continue to throw an exception during parsing, as they did during conversion.

Update tests and serialized expected values that encoded the previous, incorrectly rounded result. This includes code that depended on `BigInteger` conversion truncation toward zero. If an application requires a specific legacy `float`, `double`, `Half`, or `BFloat16` bit pattern for a protocol or file format, encode that bit pattern explicitly rather than reproduce it through a numeric conversion.

There's no compatibility switch to restore the previous conversion algorithms.

## Affected APIs

- `System.Decimal.#ctor(System.Single)`
- `System.Decimal.#ctor(System.Double)`
- Explicit conversions from `System.Single` and `System.Double` to `System.Decimal`
- Explicit conversions from `System.Decimal` to `System.Single` and `System.Double`
- `System.Decimal.ToSingle(System.Decimal)`
- `System.Decimal.ToDouble(System.Decimal)`
- `System.Convert.ToDecimal(System.Single)`
- `System.Convert.ToDecimal(System.Double)`
- `System.Convert.ToSingle(System.Decimal)`
- `System.Convert.ToDouble(System.Decimal)`
- `System.Decimal.CreateChecked``1(``0)`, `System.Decimal.CreateSaturating``1(``0)`, and `System.Decimal.CreateTruncating``1(``0)` when they convert to or from `System.Single` or `System.Double`
- Explicit conversion from `System.Decimal` to `System.Half`
- Explicit conversion from `System.Decimal` to `System.Numerics.BFloat16`
- Explicit conversions from `System.Numerics.BigInteger` to `System.Double`, `System.Single`, `System.Half`, and `System.Numerics.BFloat16`
- Equivalent conversions performed through `System.IConvertible` or the generic math interfaces
