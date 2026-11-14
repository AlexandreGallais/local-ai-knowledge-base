---
title: "Breaking change: Maximum precision for numeric format strings"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/core-libraries/7.0/max-precision-numeric-format-strings.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Maximum precision for numeric format strings

The maximum precision when formatting numbers as strings using `ToString` and `TryFormat` has been changed from `System.Int32.MaxValue` to 999,999,999. (The maximum precision was previously changed to `System.Int32.MaxValue` in .NET 6.)

In addition, the maximum exponent allowed when parsing a `System.Numerics.BigInteger` from a string has been limited to 999,999,999.

## Previous behavior

In .NET 6, the standard numeric format parsing logic was limited to a precision of `System.Int32.MaxValue` or less. The intended behavior was to throw a `System.FormatException` for any precision larger than `System.Int32.MaxValue`. However, due to a bug, .NET 6 didn't throw that exception for some such inputs. The intended behavior was:

```csharp
double d = 123.0;

d.ToString("E" + int.MaxValue.ToString()); // Doesn't throw.

long intMaxPlus1 = (long)int.MaxValue + 1;
string intMaxPlus1String = intMaxPlus1.ToString();
Assert.Throws<FormatException>(() => d.ToString("E" + intMaxPlus1String)); // Throws.
```

In addition, there was no limit on the exponent size when parsing a `System.Numerics.BigInteger` from a string.

## New behavior

Starting in .NET 7, .NET supports precision up to 999,999,999. A `System.FormatException` is thrown if the precision is greater than 999,999,999. This change was implemented in the parsing logic that affects all numeric types.

```csharp
double d = 123.0;
Assert.Throws<FormatException>(() => d.ToString("E" + int.MaxValue.ToString())); // Throws.

long intMaxPlus1 = (long)int.MaxValue + 1;
string intMaxPlus1String = intMaxPlus1.ToString();
Assert.Throws<FormatException>(() => d.ToString("E" + intMaxPlus1String)); // Throws.

d.ToString("E999999999"); // Doesn't throw.

d.ToString("E00000999999999"); // Doesn't throw.
```

In addition, if you attempt to parse a `System.Numerics.BigInteger` with an exponent greater than 999,999,999 from a string, a `System.FormatException` is thrown.

## Version introduced

.NET 7

## Type of breaking change

This change can affect binary compatibility.

## Reason for change

The behavior that was introduced in .NET 6 was intended to throw a `System.FormatException` for any precision larger than `System.Int32.MaxValue`. However, due to a bug, it did not throw that exception for some inputs larger than the maximum. This change fixes the bug by limiting the precision to 999,999,999.

## Recommended action

In most cases, no action is necessary, because it's unlikely that you're already using a precision higher than 999,999,999 in your format strings.

## Affected APIs

This change was implemented in the parsing logic that affects all numeric types.

- `System.Numerics.BigInteger.ToString(System.String)`
- `System.Numerics.BigInteger.ToString(System.String,System.IFormatProvider)`
- `System.Numerics.BigInteger.TryFormat(System.Span{System.Char},System.Int32@,System.ReadOnlySpan{System.Char},System.IFormatProvider)`
- `System.Int32.ToString(System.String)`
- `System.Int32.ToString(System.String,System.IFormatProvider)`
- `System.Int32.TryFormat(System.Span{System.Char},System.Int32@,System.ReadOnlySpan{System.Char},System.IFormatProvider)`
- `System.UInt32.ToString(System.String)`
- `System.UInt32.ToString(System.String,System.IFormatProvider)`
- `System.UInt32.TryFormat(System.Span{System.Char},System.Int32@,System.ReadOnlySpan{System.Char},System.IFormatProvider)`
- `System.Byte.ToString(System.String)`
- `System.Byte.ToString(System.String,System.IFormatProvider)`
- `System.Byte.TryFormat(System.Span{System.Char},System.Int32@,System.ReadOnlySpan{System.Char},System.IFormatProvider)`
- `System.SByte.ToString(System.String)`
- `System.SByte.ToString(System.String,System.IFormatProvider)`
- `System.SByte.TryFormat(System.Span{System.Char},System.Int32@,System.ReadOnlySpan{System.Char},System.IFormatProvider)`
- `System.Int16.ToString(System.String)`
- `System.Int16.ToString(System.String,System.IFormatProvider)`
- `System.Int16.TryFormat(System.Span{System.Char},System.Int32@,System.ReadOnlySpan{System.Char},System.IFormatProvider)`
- `System.UInt16.ToString(System.String)`
- `System.UInt16.ToString(System.String,System.IFormatProvider)`
- `System.UInt16.TryFormat(System.Span{System.Char},System.Int32@,System.ReadOnlySpan{System.Char},System.IFormatProvider)`
- `System.Numerics.BigInteger.Parse*`
- `System.Numerics.BigInteger.TryParse*`
- `System.Int64.ToString(System.String)`
- `System.Int64.ToString(System.String,System.IFormatProvider)`
- `System.Int64.TryFormat(System.Span{System.Char},System.Int32@,System.ReadOnlySpan{System.Char},System.IFormatProvider)`
- `System.UInt64.ToString(System.String)`
- `System.UInt64.ToString(System.String,System.IFormatProvider)`
- `System.UInt64.TryFormat(System.Span{System.Char},System.Int32@,System.ReadOnlySpan{System.Char},System.IFormatProvider)`
- `System.Half.ToString(System.String)`
- `System.Half.ToString(System.String,System.IFormatProvider)`
- `System.Half.TryFormat(System.Span{System.Char},System.Int32@,System.ReadOnlySpan{System.Char},System.IFormatProvider)`
- `System.Single.ToString(System.String)`
- `System.Single.ToString(System.String,System.IFormatProvider)`
- `System.Single.TryFormat(System.Span{System.Char},System.Int32@,System.ReadOnlySpan{System.Char},System.IFormatProvider)`
- `System.Double.ToString(System.String)`
- `System.Double.ToString(System.String,System.IFormatProvider)`
- `System.Double.TryFormat(System.Span{System.Char},System.Int32@,System.ReadOnlySpan{System.Char},System.IFormatProvider)`
- `System.Decimal.ToString(System.String)`
- `System.Decimal.ToString(System.String,System.IFormatProvider)`
- `System.Decimal.TryFormat(System.Span{System.Char},System.Int32@,System.ReadOnlySpan{System.Char},System.IFormatProvider)`

## See also

- Standard numeric format parsing precision breaking change (.NET 6)
- Standard numeric format strings
- Character literals in custom format strings
