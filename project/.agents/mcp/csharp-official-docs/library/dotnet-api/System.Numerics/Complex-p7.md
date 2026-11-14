---
title: "Complex struct (part 7 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/Complex.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Complex struct (part 7 of 8)

## Complex.Tanh(Complex) method

```csharp
public static System.Numerics.Complex Tanh (System.Numerics.Complex value);
```

Returns the hyperbolic tangent of the specified complex number.

Parameters:

- `value`: A complex number.

Returns: The hyperbolic tangent of `value`.

#### Remarks
The `Complex.Tanh` method for complex numbers corresponds to the `Math.Tanh` method for real numbers.

The `Complex.Tanh` method uses the following formula to calculate the hyperbolic tangent of the complex number `value`:

`Sinh(value)/Cosh(value)`

## Complex.ToString() method

```csharp
public override string ToString ();
```

Converts the value of the current complex number to its equivalent string representation in Cartesian form.

Returns: The string representation of the current instance in Cartesian form.

#### Remarks
The default string representation of a complex number displays the number using its Cartesian coordinates in the form `` where *a* is the real part of the complex number, and *b* is its imaginary part. Both *a* and *b* are formatted using the general format specifier ("G") and the conventions of the current system culture.

#### Examples
The following example displays the string representation of several complex numbers. The output uses the formatting conventions of the English - United States ("en-US") culture, which, in this case, is the current system culture.

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/ToString/tostring1.cs._

## Complex.ToString(IFormatProvider) method

```csharp
public string ToString (IFormatProvider? provider);
```

Converts the value of the current complex number to its equivalent string representation in Cartesian form by using the specified culture-specific formatting information.

Parameters:

- `provider`: An object that supplies culture-specific formatting information.

Returns: The string representation of the current instance in Cartesian form, as specified by `provider`.

#### Remarks
The string representation of the complex number returned by this method displays the number using its Cartesian coordinates in the form `` where *a* is the real part of the complex number, and *b* is its imaginary part. Both *a* and *b* are formatted using the general format specifier ("G") and the conventions of the culture defined by `provider`.

The `provider` parameter is an `IFormatProvider` implementation. Its `IFormatProvider.GetFormat` method returns a `NumberFormatInfo` object that provides culture-specific information about the format of the real and imaginary numbers in the returned string. If `provider` is `null`, the returned string is formatted using the `NumberFormatInfo` object of the current culture.

The `provider` parameter can be one of the following:

- A `CultureInfo` object that represents the culture that supplies formatting information
- The `NumberFormatInfo` object that supplies formatting information.
- A custom object that implements the `IFormatProvider` interface. Its `IFormatProvider.GetFormat` method returns the `NumberFormatInfo` object that supplies formatting information.

#### Examples
The following example displays the string representation of several complex numbers. The result uses the formatting conventions of the English - United States ("en-US") and French - France ("fr-FR") cultures.

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/ToString/tostring2.cs._

## Complex.ToString(String) method

```csharp
public string ToString (string? format);
```

Converts the value of the current complex number to its equivalent string representation in Cartesian form by using the specified format for its real and imaginary parts.

Parameters:

- `format`: A standard or custom numeric format string.

Returns: The string representation of the current instance in Cartesian form.

Exceptions:

- `FormatException`: `format` is not a valid format string.

#### Remarks
The string representation of the complex number returned by this method displays the number using its Cartesian coordinates in the form `` where *a* is the real part of the complex number, and *b* is its imaginary part. Both *a* and *b* are formatted using the format string specified by `format`. The `format` parameter can be any valid standard numeric format specifier, or any combination of custom numeric format specifiers. If `format` is equal to `Empty` or is `null`, the real and imaginary parts of the complex number are formatted with the general format specifier ("G"). If `format` is any other value, the method throws a `FormatException`.

.NET provides extensive formatting support, which is described in greater detail in the following articles:

- For more information about numeric format strings, see Standard Numeric Format Strings and Custom Numeric Format Strings.
- For more information about formatting in .NET, see Formatting Types.

The format of the returned string is determined by the `NumberFormatInfo` object for the current culture. Depending on the `format` parameter, this object controls symbols such as the negative sign, the group separator, and the decimal point symbol in the output string. To provide formatting information for cultures other than the current culture, call the `ToString` overload.

#### Examples
The following example initializes a complex number and displays it using several standard format strings.

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/ToString/tostring3.cs._

## Complex.ToString(String, IFormatProvider) method

```csharp
public string ToString (string? format, IFormatProvider? provider);
```

Converts the value of the current complex number to its equivalent string representation in Cartesian form by using the specified format and culture-specific format information for its real and imaginary parts.

Parameters:

- `format`: A standard or custom numeric format string.
- `provider`: An object that supplies culture-specific formatting information.

Returns: The string representation of the current instance in Cartesian form, as specified by `format` and `provider`.

Exceptions:

- `FormatException`: `format` is not a valid format string.

#### Remarks
The string representation of the complex number returned by this method displays the number using its Cartesian coordinates in the form `` where *a* is the real part of the complex number, and *b* is its imaginary part. Both *a* and *b* are formatted using the format string specified by `format`. The `format` parameter can be any valid standard numeric format specifier, or any combination of custom numeric format specifiers. If `format` is equal to `Empty` or is `null`, the real and imaginary parts of the complex number are formatted with the general format specifier ("G"). If `format` is any other value, the method throws a `FormatException`.

.NET provides extensive formatting support, which is described in greater detail in the following articles:

- For more information about numeric format strings, see Standard Numeric Format Strings and Custom Numeric Format Strings.
- For more information about formatting in .NET, see Formatting Types.

The `provider` parameter is an `IFormatProvider` implementation. Its `IFormatProvider.GetFormat` method returns a `NumberFormatInfo` object that provides culture-specific information about the format of the real and imaginary numbers in the returned string. Depending on the `format` parameter, this object controls symbols such as the negative sign, the group separator, and the decimal point symbol in the output string. If `provider` is `null`, the returned string is formatted using the `NumberFormatInfo` object of the current culture.

The `provider` parameter can be one of the following:

- A `CultureInfo` object that represents the culture that supplies formatting information
- The `NumberFormatInfo` object that supplies formatting information.
- A custom object that implements the `IFormatProvider` interface. Its `IFormatProvider.GetFormat` method returns the `NumberFormatInfo` object that supplies formatting information.

#### Examples
The following example creates an array of complex numbers, and displays each using several standard format strings as well as `CultureInfo` objects that represent the English - United States ("en-US") and French - France ("fr-FR") cultures.

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/ToString/tostring4.cs._

## Complex.TryFormat(Byte>, Int32, Char>, IFormatProvider) method

```csharp
public bool TryFormat (Span<byte> utf8Destination, out int bytesWritten, ReadOnlySpan<char> format = default, IFormatProvider? provider = default);
```

To be added.

Parameters:

- `utf8Destination`: To be added.
- `bytesWritten`: To be added.
- `format`: To be added.
- `provider`: To be added.

Returns: To be added.

To be added.

## Complex.TryFormat(Char>, Int32, Char>, IFormatProvider) method

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

#### Remarks

An implementation of this interface should produce the same string of characters as an implementation of `ToString` on the same type. `TryFormat` should return `false` only if there's not enough space in the destination buffer. Any other failures should throw an exception.

## Complex.TryParse(Byte>, IFormatProvider, Complex) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> utf8Text, IFormatProvider? provider, out System.Numerics.Complex result);
```

To be added.

Parameters:

- `utf8Text`: To be added.
- `provider`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## Complex.TryParse(Char>, IFormatProvider, Complex) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, IFormatProvider? provider, out System.Numerics.Complex result);
```

Tries to parse a span of characters into a value.

Parameters:

- `s`: The span of characters to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: When this method returns, contains the result of successfully parsing `s`, or an undefined value on failure.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

To be added.

## Complex.TryParse(String, IFormatProvider, Complex) method

```csharp
public static bool TryParse (string? s, IFormatProvider? provider, out System.Numerics.Complex result);
```

Tries to parse a string into a value.

Parameters:

- `s`: The string to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: When this method returns, contains the result of successfully parsing `s` or an undefined value on failure.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

To be added.

## Complex.TryParse(Byte>, NumberStyles, IFormatProvider, Complex) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> utf8Text, System.Globalization.NumberStyles style, IFormatProvider? provider, out System.Numerics.Complex result);
```

To be added.

Parameters:

- `utf8Text`: To be added.
- `style`: To be added.
- `provider`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## Complex.TryParse(Char>, NumberStyles, IFormatProvider, Complex) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, System.Globalization.NumberStyles style, IFormatProvider? provider, out System.Numerics.Complex result);
```

Tries to parse a span of characters into a value.

Parameters:

- `s`: The span of characters to parse.
- `style`: A bitwise combination of number styles that can be present in `s`.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: On return, contains the result of succesfully parsing `s` or an undefined value on failure.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

To be added.

## Complex.TryParse(String, NumberStyles, IFormatProvider, Complex) method

```csharp
public static bool TryParse (string? s, System.Globalization.NumberStyles style, IFormatProvider? provider, out System.Numerics.Complex result);
```

Tries to parse a string into a value.

Parameters:

- `s`: The string to parse.
- `style`: A bitwise combination of number styles that can be present in `s`.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: On return, contains the result of succesfully parsing `s` or an undefined value on failure.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

To be added.

## Complex.TryParsePartial(Byte>, NumberStyles, IFormatProvider, Complex, Int32) method

```csharp
public static bool TryParsePartial (ReadOnlySpan<byte> utf8Text, System.Globalization.NumberStyles style, IFormatProvider? provider, out System.Numerics.Complex result, out int bytesConsumed);
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

## Complex.TryParsePartial(Char>, NumberStyles, IFormatProvider, Complex, Int32) method

```csharp
public static bool TryParsePartial (ReadOnlySpan<char> s, System.Globalization.NumberStyles style, IFormatProvider? provider, out System.Numerics.Complex result, out int charsConsumed);
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

## Complex.TryParsePartial(String, NumberStyles, IFormatProvider, Complex, Int32) method

```csharp
public static bool TryParsePartial (string? s, System.Globalization.NumberStyles style, IFormatProvider? provider, out System.Numerics.Complex result, out int charsConsumed);
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
