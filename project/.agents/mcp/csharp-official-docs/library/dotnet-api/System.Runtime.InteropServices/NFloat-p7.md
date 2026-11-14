---
title: "NFloat struct (part 7 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/NFloat.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NFloat struct (part 7 of 8)

## NFloat.System.Numerics.ISubtractionOperators<System.Runtime.InteropServices.NFloat,System.Runtime.InteropServices.NFloat,System.Runtime.InteropServices.NFloat>.op_CheckedSubtraction(NFloat, NFloat) method

```csharp
static System.Runtime.InteropServices.NFloat ISubtractionOperators<NFloat,NFloat,NFloat>.op_CheckedSubtraction (System.Runtime.InteropServices.NFloat left, System.Runtime.InteropServices.NFloat right);
```

Subtracts two values to compute their difference.

Parameters:

- `left`: The value from which `right` is subtracted.
- `right`: The value that's subtracted from `left`.

Returns: The value of `right` subtracted from `left`.

To be added.

## NFloat.System.Numerics.IUnaryNegationOperators<System.Runtime.InteropServices.NFloat,System.Runtime.InteropServices.NFloat>.op_CheckedUnaryNegation(NFloat) method

```csharp
static System.Runtime.InteropServices.NFloat IUnaryNegationOperators<NFloat,NFloat>.op_CheckedUnaryNegation (System.Runtime.InteropServices.NFloat value);
```

Computes the checked unary negation of a value.

Parameters:

- `value`: The value for which to compute the unary negation.

Returns: The unary negation of `value`.

To be added.

## NFloat.Tan(NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat Tan (System.Runtime.InteropServices.NFloat x);
```

Computes the tangent of a value.

Parameters:

- `x`: The value, in radians, whose tangent is to be computed.

Returns: The tangent of `x`.

#### Remarks

This computes `tan(x)`.

## NFloat.Tanh(NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat Tanh (System.Runtime.InteropServices.NFloat x);
```

Computes the hyperbolic tangent of a value.

Parameters:

- `x`: The value, in radians, whose hyperbolic tangent is to be computed.

Returns: The hyperbolic tangent of `x`.

To be added.

## NFloat.TanPi(NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat TanPi (System.Runtime.InteropServices.NFloat x);
```

Computes the tangent of a value that has been multipled by `pi`.

Parameters:

- `x`: The value, in half-revolutions, that is multipled by `pi` before computing its tangent.

Returns: The tangent of `x` multiplied-by `pi`.

#### Remarks

This computes `tan(x * π)`.

## NFloat.ToString() method

```csharp
public override string ToString ();
```

Converts the numeric value of this instance to its equivalent string representation.

Returns: The string representation of the value of this instance.

To be added.

## NFloat.ToString(IFormatProvider) method

```csharp
public string ToString (IFormatProvider? provider);
```

Converts the numeric value of this instance to its equivalent string representation using the specified culture-specific format information.

Parameters:

- `provider`: An object that supplies culture-specific formatting information.

Returns: The string representation of the value of this instance as specified by `provider`.

To be added.

## NFloat.ToString(String) method

```csharp
public string ToString (string? format);
```

Converts the numeric value of this instance to its equivalent string representation using the specified format.

Parameters:

- `format`: A numeric format string.

Returns: The string representation of the value of this instance as specified by `format`.

Exceptions:

- `FormatException`: `format` is invalid.

To be added.

## NFloat.ToString(String, IFormatProvider) method

```csharp
public string ToString (string? format, IFormatProvider? provider);
```

Converts the numeric value of this instance to its equivalent string representation using the specified format and culture-specific format information.

Parameters:

- `format`: A numeric format string.
- `provider`: An object that supplies culture-specific formatting information.

Returns: The string representation of the value of this instance as specified by `format` and `provider`.

Exceptions:

- `FormatException`: `format` is invalid.

To be added.

## NFloat.Truncate(NFloat) method

```csharp
public static System.Runtime.InteropServices.NFloat Truncate (System.Runtime.InteropServices.NFloat x);
```

Truncates a value.

Parameters:

- `x`: The value to truncate.

Returns: The truncation of `x`.

To be added.

## NFloat.TryFormat(Byte>, Int32, Char>, IFormatProvider) method

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

## NFloat.TryFormat(Char>, Int32, Char>, IFormatProvider) method

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

## NFloat.TryParse(Byte>, NFloat) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> utf8Text, out System.Runtime.InteropServices.NFloat result);
```

Tries to convert a UTF-8 character span containing the string representation of a number to its floating-point number equivalent.

Parameters:

- `utf8Text`: A read-only UTF-8 character span that contains the number to convert.
- `result`: When this method returns, contains a floating-point number equivalent of the numeric value or symbol contained in `utf8Text` if the conversion succeeded or zero if the conversion failed. The conversion fails if the `utf8Text` is `ReadOnlySpan<T>.Empty` or is not in a valid format. This parameter is passed uninitialized; any value originally supplied in result will be overwritten.

Returns: `true` if `utf8Text` was converted successfully; otherwise, `false`.

To be added.

## NFloat.TryParse(Char>, NFloat) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, out System.Runtime.InteropServices.NFloat result);
```

Tries to convert a character span containing the string representation of a number to its floating-point number equivalent.

Parameters:

- `s`: A read-only character span that contains the number to convert.
- `result`: When this method returns, contains a floating-point number equivalent of the numeric value or symbol contained in `s` if the conversion succeeded or zero if the conversion failed. The conversion fails if the `s` is `String.Empty` or is not in a valid format. This parameter is passed uninitialized; any value originally supplied in result will be overwritten.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

To be added.

## NFloat.TryParse(String, NFloat) method

```csharp
public static bool TryParse (string? s, out System.Runtime.InteropServices.NFloat result);
```

Tries to convert the string representation of a number to its floating-point number equivalent.

Parameters:

- `s`: A read-only character span that contains the number to convert.
- `result`: When this method returns, contains a floating-point number equivalent of the numeric value or symbol contained in `s` if the conversion succeeded or zero if the conversion failed. The conversion fails if the `s` is `null`, `String.Empty`, or is not in a valid format. This parameter is passed uninitialized; any value originally supplied in result will be overwritten.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

To be added.

## NFloat.TryParse(Byte>, IFormatProvider, NFloat) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> utf8Text, IFormatProvider? provider, out System.Runtime.InteropServices.NFloat result);
```

Tries to parse a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.
- `result`: On return, contains the result of successfully parsing `utf8Text` or an undefined value on failure.

Returns: `true` if `utf8Text` was successfully parsed; otherwise, `false`.

To be added.

## NFloat.TryParse(Char>, IFormatProvider, NFloat) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, IFormatProvider? provider, out System.Runtime.InteropServices.NFloat result);
```

Tries to parse a span of characters into a value.

Parameters:

- `s`: The span of characters to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: When this method returns, contains the result of successfully parsing `s`, or an undefined value on failure.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

To be added.

## NFloat.TryParse(String, IFormatProvider, NFloat) method

```csharp
public static bool TryParse (string? s, IFormatProvider? provider, out System.Runtime.InteropServices.NFloat result);
```

Tries to parse a string into a value.

Parameters:

- `s`: The string to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: When this method returns, contains the result of successfully parsing `s` or an undefined value on failure.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

To be added.

## NFloat.TryParse(Byte>, NumberStyles, IFormatProvider, NFloat) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> utf8Text, System.Globalization.NumberStyles style, IFormatProvider? provider, out System.Runtime.InteropServices.NFloat result);
```

Tries to parse a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `style`: A bitwise combination of number styles that can be present in `utf8Text`.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.
- `result`: On return, contains the result of successfully parsing `utf8Text` or an undefined value on failure.

Returns: `true` if `utf8Text` was successfully parsed; otherwise, `false`.

To be added.

## NFloat.TryParse(Char>, NumberStyles, IFormatProvider, NFloat) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, System.Globalization.NumberStyles style, IFormatProvider? provider, out System.Runtime.InteropServices.NFloat result);
```

Tries to convert a character span containing the string representation of a number in a specified style and culture-specific format to its floating-point number equivalent.

Parameters:

- `s`: A read-only character span that contains the number to convert.
- `style`: A bitwise combination of enumeration values that indicate the style elements that can be present in `s`.
- `provider`: An object that supplies culture-specific formatting information about `s`.
- `result`: When this method returns, contains a floating-point number equivalent of the numeric value or symbol contained in `s` if the conversion succeeded or zero if the conversion failed. The conversion fails if the `s` is `String.Empty` or is not in a format compliant with `style`, or if `style` is not a valid combination of `NumberStyles` enumeration constants. This parameter is passed uninitialized; any value originally supplied in result will be overwritten.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

Exceptions:

- `ArgumentException`: `style` is not a `NumberStyles` value.

-or-

`style` includes the `NumberStyles.AllowHexSpecifier` value.

To be added.

## NFloat.TryParse(String, NumberStyles, IFormatProvider, NFloat) method

```csharp
public static bool TryParse (string? s, System.Globalization.NumberStyles style, IFormatProvider? provider, out System.Runtime.InteropServices.NFloat result);
```

Tries to convert the string representation of a number in a specified style and culture-specific format to its floating-point number equivalent.

Parameters:

- `s`: A read-only character span that contains the number to convert.
- `style`: A bitwise combination of enumeration values that indicate the style elements that can be present in `s`.
- `provider`: An object that supplies culture-specific formatting information about `s`.
- `result`: When this method returns, contains a floating-point number equivalent of the numeric value or symbol contained in `s` if the conversion succeeded or zero if the conversion failed. The conversion fails if the `s` is `null`, `String.Empty`, or is not in a format compliant with `style`, or if `style` is not a valid combination of `NumberStyles` enumeration constants. This parameter is passed uninitialized; any value originally supplied in result will be overwritten.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

Exceptions:

- `ArgumentException`: `style` is not a `NumberStyles` value.

-or-

`style` includes the `NumberStyles.AllowHexSpecifier` value.

To be added.

## NFloat.TryParsePartial(Byte>, NumberStyles, IFormatProvider, NFloat, Int32) method

```csharp
public static bool TryParsePartial (ReadOnlySpan<byte> utf8Text, System.Globalization.NumberStyles style, IFormatProvider? provider, out System.Runtime.InteropServices.NFloat result, out int bytesConsumed);
```

To be added.

Parameters:

- `utf8Text`: To be added.
- `style`: To be added.
- `provider`: To be added.
- `result`: To be added.
- `bytesConsumed`: To be added.

Returns: To be added.

To be added.

## NFloat.TryParsePartial(Char>, NumberStyles, IFormatProvider, NFloat, Int32) method

```csharp
public static bool TryParsePartial (ReadOnlySpan<char> s, System.Globalization.NumberStyles style, IFormatProvider? provider, out System.Runtime.InteropServices.NFloat result, out int charsConsumed);
```

To be added.

Parameters:

- `s`: To be added.
- `style`: To be added.
- `provider`: To be added.
- `result`: To be added.
- `charsConsumed`: To be added.

Returns: To be added.

To be added.
