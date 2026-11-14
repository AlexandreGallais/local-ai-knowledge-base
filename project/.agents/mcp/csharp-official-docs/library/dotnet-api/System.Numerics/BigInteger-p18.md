---
title: "BigInteger struct (part 18 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/BigInteger.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BigInteger struct (part 18 of 18)

## BigInteger.TryParse(String, NumberStyles, IFormatProvider, BigInteger) method

```csharp
public static bool TryParse (string? value, System.Globalization.NumberStyles style, IFormatProvider? provider, out System.Numerics.BigInteger result);
```

Tries to convert the string representation of a number in a specified style and culture-specific format to its `BigInteger` equivalent, and returns a value that indicates whether the conversion succeeded.

Parameters:

- `value`: The string representation of a number. The string is interpreted using the style specified by `style`.
- `style`: A bitwise combination of enumeration values that indicates the style elements that can be present in `value`. A typical value to specify is `NumberStyles.Integer`.
- `provider`: An object that supplies culture-specific formatting information about `value`.
- `result`: When this method returns, contains the `BigInteger` equivalent to the number that is contained in `value`, or `BigInteger.Zero` if the conversion failed. The conversion fails if the `value` parameter is `null` or is not in a format that is compliant with `style`. This parameter is passed uninitialized.

Returns: `true` if the `value` parameter was converted successfully; otherwise, `false`.

Exceptions:

- `ArgumentException`: `style` is not a `NumberStyles` value.

-or-

`style` includes the `NumberStyles.AllowHexSpecifier` or `NumberStyles.HexNumber` flag along with another value.

#### Remarks
The `TryParse` method is like the `Parse` method, except that it does not throw an exception if the conversion fails. This method eliminates the need to use exception handling to test for a `FormatException` if `value` is invalid and cannot be parsed successfully.

The `style` parameter defines the style elements (such as white space or a positive or negative sign) that are allowed in the `value` parameter for the parse operation to succeed. It must be a combination of bit flags from the `NumberStyles` enumeration. Depending on the value of `style`, the `value` parameter may include the following elements:

*ws**sign**digits*.*fractional_digits**exponential_digits*][*ws*]

If the `style` parameter includes `AllowHexSpecifier`, the `value` parameter may include the following elements:

[*ws*]*hexdigits*[*ws*]

Elements in square brackets ([ and ]) are optional. The following table describes each element.

|Element|Description|
|-------------|-----------------|
|*ws*|Optional white space. White space can appear at the start of `value` if `style` includes the `AllowLeadingWhite` flag, or at the end of `value` if `style` includes the `AllowTrailingWhite` flag.|
|*$*|A culture-specific currency symbol. Its position in the string is defined by the `CurrencyPositivePattern` property of the `NumberFormatInfo` object returned by the `IFormatProvider.GetFormat` method of the `provider` parameter. The currency symbol can appear in `value` if `style` includes the `AllowCurrencySymbol` flag.|
|*sign*|An optional sign. The sign can appear at the start of `value` if `style` includes the `AllowLeadingSign` flag, and it can appear at the end of `value` if `style` includes the `AllowTrailingSign` flag. Parentheses can be used in `value` to indicate a negative value if `style` includes the `AllowParentheses` flag.|
|*digits*|A sequence of digits from 0 through 9.|
|*,*|A culture-specific group separator. The group separator of the culture specified by `provider` can appear in `value` if `style` includes the `AllowThousands` flag.|
|*.*|A culture-specific decimal point symbol. The decimal point symbol of the culture specified by `provider` can appear in `value` if `style` includes the `AllowDecimalPoint` flag.|
|*fractional_digits*|One or more occurrences of the digit 0. Fractional digits can appear in `value` only if `style` includes the `AllowDecimalPoint` flag.|
|E|The "e" or "E" character, which indicates that the value is represented in exponential (scientific) notation. The `value` parameter can represent a number in exponential notation if `style` includes the `AllowExponent` flag.|
|*exponential_digits*|A sequence of digits from 0 through 9. The `value` parameter can represent a number in exponential notation if `style` includes the `AllowExponent` flag.|
|*hexdigits*|A sequence of hexadecimal digits from 0 through f, or 0 through F.|

> **Note:**
> Any terminating NUL (U+0000) characters in `s` are ignored by the parsing operation, regardless of the value of the `style` argument.

A string with decimal digits only (which corresponds to the `None` flag) always parses successfully. Most of the remaining `NumberStyles` members control elements that may be present, but are not required to be present, in this input string. The following table indicates how individual `NumberStyles` members affect the elements that may be present in `value`.

|Non-composite `NumberStyles` values|Elements permitted in value in addition to digits|
|------------------------------------------|-------------------------------------------------------|
|`None`|Decimal digits only.|
|`AllowDecimalPoint`|The decimal point (*.*) and *fractional_digits* elements. However, *fractional_digits* must consist of only one or more 0 digits, or the method returns `false`.|
|`AllowExponent`|The "e" or "E" character, which indicates exponential notation, along with *exponential_digits*. If `value` represents a number in exponential notation, it cannot have a non-zero, fractional component.|
|`AllowLeadingWhite`|The *ws* element at the start of `value`.|
|`AllowTrailingWhite`|The *ws* element at the end of `value`.|
|`AllowLeadingSign`|The *sign* element before *digits*.|
|`AllowTrailingSign`|The *sign* element after *digits*.|
|`AllowParentheses`|The *sign* element in the form of parentheses enclosing the numeric value.|
|`AllowThousands`|The group separator (*,*) element.|
|`AllowCurrencySymbol`|The currency (*$*) element.|
|`Currency`|All elements. However, `value` cannot represent a hexadecimal number or a number in exponential notation.|
|`Float`|The *ws* element at the start or end of `value`, *sign* at the start of `value`, and the decimal point (*.*) symbol. The `value` parameter can also use exponential notation.|
|`Number`|The *ws*, *sign*, group separator (*,*), and decimal point (*.*) elements.|
|`Any`|All elements. However, `value` cannot represent a hexadecimal number.|

> **Important:**
>  If you use the `BigInteger.TryParse` method to round-trip the string representation of a `BigInteger` value that was output by the `BigInteger.ToString` method, you should use the `ToString` method with the "R" format specifier to generate the string representation of the `BigInteger` value. Otherwise, the string representation of the `BigInteger` preserves only the 50 most significant digits of the original value, and data may be lost when you use the `BigInteger.TryParse` method to restore the `BigInteger` value.

If the `AllowHexSpecifier` flag is used, `value` must be a hexadecimal value. The only other flags that can be present in `style` are `AllowLeadingWhite` and `AllowTrailingWhite`. (The `NumberStyles` enumeration has a composite style, `HexNumber`, that includes both white-space flags.)

> **Note:**
>  If `value` is the string representation of a hexadecimal number, it cannot be preceded by any decoration (such as `0x` or `&h`) that differentiates it as a hexadecimal number. This causes the conversion to fail.

If `value` is a hexadecimal string, the `TryParse` method interprets `value` as a negative number stored by using two's complement representation if its first two hexadecimal digits are greater than or equal to `0x80`. In other words, the method interprets the highest-order bit of the first byte in `value` as the sign bit. To make sure that a hexadecimal string is correctly interpreted as a positive number, the first digit in `value` must have a value of zero. For example, the method interprets `0x80` as a negative value, but it interprets either `0x080` or `0x0080` as a positive value. The following example illustrates the difference between hexadecimal strings that represent negative and positive values.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/TryParse/TryParseHex1.cs._

The `provider` parameter is an `IFormatProvider` implementation. Its `IFormatProvider.GetFormat` method returns a `NumberFormatInfo` object that provides culture-specific information about the format of `value`. The `provider` parameter can be any one of the following:

- A `CultureInfo` object that represents the culture that supplies formatting information. Its `CultureInfo.GetFormat` method returns the `NumberFormatInfo` object that provides numeric formatting information for that culture.

- A `NumberFormatInfo` object that provides numeric formatting information. (Its implementation of `NumberFormatInfo.GetFormat` just returns itself.)

- A custom object that implements `IFormatProvider`. Its `IFormatProvider.GetFormat` method instantiates and returns the `NumberFormatInfo` object that provides formatting information.

If `provider` is `null`, the `NumberFormatInfo` object for the current culture is used.

#### Examples
The following example makes some calls to the `TryParse` method using various combinations of values for the `style` and `provider` parameters.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/TryParse/TryParse1.cs._

A number of the individual calls to the `TryParse` method pass an instance of the following `BigIntegerFormatProvider` class, which defines a tilde (~) as the negative sign.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/TryParse/TryParse1.cs._

## BigInteger.TryParsePartial(Byte>, NumberStyles, IFormatProvider, BigInteger, Int32) method

```csharp
public static bool TryParsePartial (ReadOnlySpan<byte> utf8Text, System.Globalization.NumberStyles style, IFormatProvider? provider, out System.Numerics.BigInteger result, out int bytesConsumed);
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

## BigInteger.TryParsePartial(Char>, NumberStyles, IFormatProvider, BigInteger, Int32) method

```csharp
public static bool TryParsePartial (ReadOnlySpan<char> s, System.Globalization.NumberStyles style, IFormatProvider? provider, out System.Numerics.BigInteger result, out int charsConsumed);
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

## BigInteger.TryParsePartial(String, NumberStyles, IFormatProvider, BigInteger, Int32) method

```csharp
public static bool TryParsePartial (string? s, System.Globalization.NumberStyles style, IFormatProvider? provider, out System.Numerics.BigInteger result, out int charsConsumed);
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

## BigInteger.TryWriteBytes(Byte>, Int32, Boolean, Boolean) method

```csharp
public bool TryWriteBytes (Span<byte> destination, out int bytesWritten, bool isUnsigned = false, bool isBigEndian = false);
```

Copies the value of this `BigInteger` as little-endian twos-complement bytes, using the fewest number of bytes possible. If the value is zero, outputs one byte whose element is 0x00.

Parameters:

- `destination`: The destination span to which the resulting bytes should be written.
- `bytesWritten`: The number of bytes written to `destination`.
- `isUnsigned`: `true` to use unsigned encoding; otherwise, `false`.
- `isBigEndian`: `true` to write the bytes in a big-endian byte order; otherwise, `false`.

Returns: `true` if the bytes fit in `destination`; `false` if not all bytes could be written due to lack of space.

Exceptions:

- `OverflowException`: `isUnsigned` is `true` and `BigInteger.Sign` is negative.

To be added.
