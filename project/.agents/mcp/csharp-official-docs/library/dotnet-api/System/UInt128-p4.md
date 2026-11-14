---
title: "UInt128 struct (part 4 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/UInt128.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UInt128 struct (part 4 of 5)

## UInt128.System.Numerics.INumberBase<System.UInt128>.IsNormal(UInt128) method

```csharp
static bool INumberBase<UInt128>.IsNormal (UInt128 value);
```

Determines if a value is normal.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is normal; otherwise, `false`.

To be added.

## UInt128.System.Numerics.INumberBase<System.UInt128>.IsPositive(UInt128) method

```csharp
static bool INumberBase<UInt128>.IsPositive (UInt128 value);
```

Determines if a value is positive.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is positive; otherwise, `false`.

To be added.

## UInt128.System.Numerics.INumberBase<System.UInt128>.IsPositiveInfinity(UInt128) method

```csharp
static bool INumberBase<UInt128>.IsPositiveInfinity (UInt128 value);
```

Determines if a value is positive infinity.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is positive infinity; otherwise, `false`.

To be added.

## UInt128.System.Numerics.INumberBase<System.UInt128>.IsRealNumber(UInt128) method

```csharp
static bool INumberBase<UInt128>.IsRealNumber (UInt128 value);
```

Determines if a value represents a real number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a real number; otherwise, `false`.

To be added.

## UInt128.System.Numerics.INumberBase<System.UInt128>.IsSubnormal(UInt128) method

```csharp
static bool INumberBase<UInt128>.IsSubnormal (UInt128 value);
```

Determines if a value is subnormal.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is subnormal; otherwise, `false`.

To be added.

## UInt128.System.Numerics.INumberBase<System.UInt128>.IsZero(UInt128) method

```csharp
static bool INumberBase<UInt128>.IsZero (UInt128 value);
```

Determines if a value is zero.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is zero; otherwise, `false`.

To be added.

## UInt128.System.Numerics.INumberBase<System.UInt128>.MaxMagnitude(UInt128, UInt128) method

```csharp
static UInt128 INumberBase<UInt128>.MaxMagnitude (UInt128 x, UInt128 y);
```

Compares two values to compute which is greater.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

To be added.

## UInt128.System.Numerics.INumberBase<System.UInt128>.MaxMagnitudeNumber(UInt128, UInt128) method

```csharp
static UInt128 INumberBase<UInt128>.MaxMagnitudeNumber (UInt128 x, UInt128 y);
```

Compares two values to compute which has the greater magnitude and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

To be added.

## UInt128.System.Numerics.INumberBase<System.UInt128>.MinMagnitude(UInt128, UInt128) method

```csharp
static UInt128 INumberBase<UInt128>.MinMagnitude (UInt128 x, UInt128 y);
```

Compares two values to compute which is lesser.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

To be added.

## UInt128.System.Numerics.INumberBase<System.UInt128>.MinMagnitudeNumber(UInt128, UInt128) method

```csharp
static UInt128 INumberBase<UInt128>.MinMagnitudeNumber (UInt128 x, UInt128 y);
```

Compares two values to compute which has the lesser magnitude and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

To be added.

## UInt128.System.Numerics.INumberBase<System.UInt128>.MultiplyAddEstimate(UInt128, UInt128, UInt128) method

```csharp
static UInt128 INumberBase<UInt128>.MultiplyAddEstimate (UInt128 left, UInt128 right, UInt128 addend);
```

Computes an estimate of (`left` * `right`) + `addend`.

Parameters:

- `left`: The value to be multiplied with `right`.
- `right`: The value to be multiplied with `left`.
- `addend`: The value to be added to the result of `left` multiplied by `right`.

Returns: An estimate of (`left` * `right`) + `addend`.

To be added.

## UInt128.System.Numerics.INumberBase<System.UInt128>.TryConvertToChecked<TOther>(UInt128, TOther) method

```csharp
static bool INumberBase<UInt128>.TryConvertToChecked<TOther> (UInt128 value, out TOther result) where TOther : System.Numerics.INumberBase<TOther>;
```

Tries to convert an instance of the the current type to another type, throwing an overflow exception for any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type to which `value` should be converted.
- `value`: The value that's used to create the instance of `TOther`.
- `result`: When this method returns, contains an instance of `TOther` converted from `value`.

Returns: `false` if `TOther` is not supported; otherwise, `true`.

To be added.

## UInt128.System.Numerics.INumberBase<System.UInt128>.TryConvertToSaturating<TOther>(UInt128, TOther) method

```csharp
static bool INumberBase<UInt128>.TryConvertToSaturating<TOther> (UInt128 value, out TOther result) where TOther : System.Numerics.INumberBase<TOther>;
```

Tries to convert an instance of the the current type to another type, saturating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type to which `value` should be converted.
- `value`: The value that's used to create the instance of `TOther`.
- `result`: When this method returns, contains an instance of `TOther` converted from `value`.

Returns: `false` if `TOther` is not supported; otherwise, `true`.

To be added.

## UInt128.System.Numerics.INumberBase<System.UInt128>.TryConvertToTruncating<TOther>(UInt128, TOther) method

```csharp
static bool INumberBase<UInt128>.TryConvertToTruncating<TOther> (UInt128 value, out TOther result) where TOther : System.Numerics.INumberBase<TOther>;
```

Tries to convert an instance of the the current type to another type, truncating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type to which `value` should be converted.
- `value`: The value that's used to create the instance of `TOther`.
- `result`: When this method returns, contains an instance of `TOther` converted from `value`.

Returns: `false` if `TOther` is not supported; otherwise, `true`.

To be added.

## UInt128.System.Numerics.INumberBase<System.UInt128>.TryConvertFromChecked<TOther>(TOther, UInt128) method

```csharp
static bool INumberBase<UInt128>.TryConvertFromChecked<TOther> (TOther value, out UInt128 result) where TOther : System.Numerics.INumberBase<TOther>;
```

To be added.

Parameters:

- `TOther`: To be added.
- `value`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## UInt128.System.Numerics.INumberBase<System.UInt128>.TryConvertFromSaturating<TOther>(TOther, UInt128) method

```csharp
static bool INumberBase<UInt128>.TryConvertFromSaturating<TOther> (TOther value, out UInt128 result) where TOther : System.Numerics.INumberBase<TOther>;
```

To be added.

Parameters:

- `TOther`: To be added.
- `value`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## UInt128.System.Numerics.INumberBase<System.UInt128>.TryConvertFromTruncating<TOther>(TOther, UInt128) method

```csharp
static bool INumberBase<UInt128>.TryConvertFromTruncating<TOther> (TOther value, out UInt128 result) where TOther : System.Numerics.INumberBase<TOther>;
```

To be added.

Parameters:

- `TOther`: To be added.
- `value`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## UInt128.ToString() method

```csharp
public override string ToString ();
```

Returns a string that represents the current object.

Returns: A string that represents the current object.

To be added.

## UInt128.ToString(IFormatProvider) method

```csharp
public string ToString (IFormatProvider? provider);
```

Converts the numeric value of this instance to its equivalent string representation using the specified culture-specific format information.

Parameters:

- `provider`: An object that supplies culture-specific formatting information.

Returns: The string representation of the value of this instance as specified by `provider`.

To be added.

## UInt128.ToString(String) method

```csharp
public string ToString (string? format);
```

Converts the numeric value of this instance to its equivalent string representation, using the specified format.

Parameters:

- `format`: The format to use, or a `null` reference to use the default format defined for the type of the `IFormattable` implementation.

Returns: The string representation of the value of this instance as specified by `format`.

To be added.

## UInt128.ToString(String, IFormatProvider) method

```csharp
public string ToString (string? format, IFormatProvider? provider);
```

Formats the value of the current instance using the specified format.

Parameters:

- `format`: The format to use, or a `null` reference to use the default format defined for the type of the `IFormattable` implementation.
- `provider`: An object that supplies culture-specific formatting information.

Returns: The value of the current instance in the specified format.

To be added.

## UInt128.TrailingZeroCount(UInt128) method

```csharp
public static UInt128 TrailingZeroCount (UInt128 value);
```

Computes the number of trailing zeros in a value.

Parameters:

- `value`: The value whose trailing zeroes are to be counted.

Returns: The number of trailing zeros in `value`.

To be added.

## UInt128.TryFormat(Byte>, Int32, Char>, IFormatProvider) method

```csharp
public bool TryFormat (Span<byte> utf8Destination, out int bytesWritten, ReadOnlySpan<char> format = default, IFormatProvider? provider = default);
```

Tries to format the value of the current instance as UTF-8 into the provided span of bytes.

Parameters:

- `utf8Destination`: The span in which to write this instance's value formatted as a span of bytes.
- `bytesWritten`: When this method returns, contains the number of bytes that were written in `utf8Destination`.
- `format`: A span containing the characters that represent a standard or custom format string that defines the acceptable format for `utf8Destination`.
- `provider`: An optional object that supplies culture-specific formatting information for `utf8Destination`.

Returns: `true` if the formatting was successful; otherwise, `false`.

To be added.

## UInt128.TryFormat(Char>, Int32, Char>, IFormatProvider) method

```csharp
public bool TryFormat (Span<char> destination, out int charsWritten, ReadOnlySpan<char> format = default, IFormatProvider? provider = default);
```

Tries to format the value of the current instance into the provided span of characters.

Parameters:

- `destination`: The span in which to write this instance's value formatted as a span of characters.
- `charsWritten`: When this method returns, contains the number of characters that were written in `destination`.
- `format`: A span containing the characters that represent a standard or custom format string that defines the acceptable format for `destination`.
- `provider`: An optional object that supplies culture-specific formatting information for `destination`.

Returns: `true` if the formatting was successful; otherwise, `false`.

To be added.

## UInt128.TryParse(Byte>, UInt128) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> utf8Text, out UInt128 result);
```

Tries to convert a UTF-8 character span containing the string representation of a number to its 128-bit unsigned integer equivalent.

Parameters:

- `utf8Text`: A span containing the UTF-8 characters representing the number to convert.
- `result`: When this method returns, contains the 128-bit unsigned integer value equivalent to the number contained in `utf8Text` if the conversion succeeded, or zero if the conversion failed. This parameter is passed uninitialized; any value originally supplied in result will be overwritten.

Returns: `true` if `utf8Text` was converted successfully; otherwise, `false`.

To be added.

## UInt128.TryParse(Char>, UInt128) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, out UInt128 result);
```

Tries to parse a span of characters into a value.

Parameters:

- `s`: The span of characters to parse.
- `result`: When this method returns, contains the result of successfully parsing `s` or an undefined value on failure.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

To be added.

## UInt128.TryParse(String, UInt128) method

```csharp
public static bool TryParse (string? s, out UInt128 result);
```

Tries to parse a string into a value.

Parameters:

- `s`: The string to parse.
- `result`: When this method returns, contains the result of successfully parsing `s` or an undefined value on failure.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

To be added.

## UInt128.TryParse(Byte>, IFormatProvider, UInt128) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> utf8Text, IFormatProvider? provider, out UInt128 result);
```

Tries to parse a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.
- `result`: On return, contains the result of successfully parsing `utf8Text` or an undefined value on failure.

Returns: `true` if `utf8Text` was successfully parsed; otherwise, `false`.

To be added.

## UInt128.TryParse(Char>, IFormatProvider, UInt128) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, IFormatProvider? provider, out UInt128 result);
```

Tries to parse a string into a value.

Parameters:

- `s`: The string to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: When this method returns, contains the result of successfully parsing `s` or an undefined value on failure.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

To be added.

## UInt128.TryParse(String, IFormatProvider, UInt128) method

```csharp
public static bool TryParse (string? s, IFormatProvider? provider, out UInt128 result);
```

Tries to parse a string into a value.

Parameters:

- `s`: The string to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: When this method returns, contains the result of successfully parsing `s` or an undefined value on failure.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

To be added.
