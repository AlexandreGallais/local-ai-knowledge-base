---
title: "Breaking change: Standard numeric format parsing precision"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/core-libraries/6.0/numeric-format-parsing-handles-higher-precision.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Standard numeric format parsing precision

.NET now supports greater precision values when formatting numbers as strings using `ToString` and `TryFormat`.

> **Note:**
> The maximum precision was changed again in .NET 7. For more information, see Maximum precision for numeric format strings.

## Change description

When formatting numbers as strings, the *precision specifier* in the format string represents the number of digits in the resulting string. Depending on the *format specifier*, which is the character at the beginning of the string, the precision can represent the total number of digits, the number of significant digits, or the number of decimal digits.

In previous .NET versions, the standard numeric format parsing logic is limited to a precision of 99 or less. Some numeric types have more precision, but `ToString(string format)` does not expose it correctly. If you specify a precision greater than 99, for example, `32.ToString("C100")`, the format string is interpreted as a custom numeric format string instead of "currency with precision 100". In custom numeric format strings, characters are interpreted as character literals. In addition, a format string that contains an invalid format specifier is interpreted differently depending on the precision value. `H99` throws a `System.FormatException` for the invalid format specifier, while `H100` is interpreted as a custom numeric format string.

Starting in .NET 6, .NET supports precision up to `System.Int32.MaxValue`. A format string that consists of a format specifier with any number of digits is interpreted as a standard numeric format string with precision. A `System.FormatException` is thrown for either or both of the following conditions:

- The format specifier character is not a standard format specifier.
- The precision is greater than `System.Int32.MaxValue`.

This change was implemented in the parsing logic that affects all numeric types.

The following table shows the behavior changes for various format strings.

| Format string | Previous behavior | .NET 6+ behavior |
| - | - | - |
| `C2` | Denotes currency with two decimal digits | Denotes currency with two decimal digits (*no change*) |
| `C100` | Denotes custom numeric format string that prints "C100" | Denotes currency with 100 decimal digits |
| `H99` | Throws `System.FormatException` due to invalid standard format specifier "H" | Throws `System.FormatException` due to invalid standard format specifier "H" (*no change*) |
| `H100` | Denotes custom numeric format string | Throws `System.FormatException` due to invalid standard format specifier "H" |

## Version introduced

.NET 6

## Reason for change

This change corrects unexpected behavior when using higher precision for numeric format parsing.

## Recommended action

In most cases, no action is necessary and the correct precision will be shown in the resulting strings.

However, if you want to revert to the previous behavior where the format specifier is interpreted as a literal character when the precision is greater than 99, you can wrap that character in single quotes or escape it with a backslash. For example, in previous .NET versions, `42.ToString("G999")` returns `G999`. To maintain that behavior, change the format string to `"'G'999"` or `"\\G999"`. This will work on .NET Framework, .NET Core, and .NET 5+.

The following format strings will continue to be interpreted as custom numeric format strings:

- Start with any character that is not an ASCII alphabetical character, for example, `$` or `è`.
- Start with an ASCII alphabetical character that's not followed by an ASCII digit, for example, `A$`.
- Start with an ASCII alphabetical character, followed by an ASCII digit sequence, and then any character that is not an ASCII digit character, for example, `A12A`.

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

- Standard numeric format strings
- Character literals in custom format strings
- Maximum precision for numeric format strings (.NET 7)
