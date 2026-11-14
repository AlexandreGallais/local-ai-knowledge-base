---
title: "SByte struct (part 7 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/SByte.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SByte struct (part 7 of 7)

## SByte.TryParse(Byte>, IFormatProvider, SByte) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> utf8Text, IFormatProvider? provider, out sbyte result);
```

Tries to parse a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.
- `result`: On return, contains the result of successfully parsing `utf8Text` or an undefined value on failure.

Returns: `true` if `utf8Text` was successfully parsed; otherwise, `false`.

To be added.

## SByte.TryParse(Char>, IFormatProvider, SByte) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, IFormatProvider? provider, out sbyte result);
```

Tries to parse a span of characters into a value.

Parameters:

- `s`: The span of characters to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: When this method returns, contains the result of successfully parsing `s`, or an undefined value on failure.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

To be added.

## SByte.TryParse(String, IFormatProvider, SByte) method

```csharp
public static bool TryParse (string? s, IFormatProvider? provider, out sbyte result);
```

Tries to parse a string into a value.

Parameters:

- `s`: The string to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: When this method returns, contains the result of successfully parsing `s` or an undefined value on failure.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

To be added.

## SByte.TryParse(Byte>, NumberStyles, IFormatProvider, SByte) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> utf8Text, System.Globalization.NumberStyles style, IFormatProvider? provider, out sbyte result);
```

Tries to parse a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `style`: A bitwise combination of number styles that can be present in `utf8Text`.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.
- `result`: On return, contains the result of successfully parsing `utf8Text` or an undefined value on failure.

Returns: `true` if `utf8Text` was successfully parsed; otherwise, `false`.

To be added.

## SByte.TryParse(Char>, NumberStyles, IFormatProvider, SByte) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, System.Globalization.NumberStyles style, IFormatProvider? provider, out sbyte result);
```

Tries to convert the span representation of a number in a specified style and culture-specific format to its `SByte` equivalent, and returns a value that indicates whether the conversion succeeded.

Parameters:

- `s`: A span containing the characters that represent the number to convert.
- `style`: A bitwise combination of enumeration values that indicates the permitted format of `s`. A typical value to specify is `NumberStyles.Integer`.
- `provider`: An object that supplies culture-specific formatting information about `s`.
- `result`: When this method returns, contains the 8-bit signed integer value equivalent to the number contained in `s`, if the conversion succeeded, or zero if the conversion failed. The conversion fails if the `s` parameter is `null` or `String.Empty`, is not in a format compliant with `style`, or represents a number less than <see cref="F:System.SByte.MinValue">SByte.MinValue</see> or greater than <see cref="F:System.SByte.MaxValue">SByte.MaxValue</see>. This parameter is passed uninitialized; any value originally supplied in `result` will be overwritten.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

To be added.

## SByte.TryParse(String, NumberStyles, IFormatProvider, SByte) method

```csharp
public static bool TryParse (string? s, System.Globalization.NumberStyles style, IFormatProvider? provider, out sbyte result);
```

Tries to convert the string representation of a number in a specified style and culture-specific format to its `SByte` equivalent, and returns a value that indicates whether the conversion succeeded.

Parameters:

- `s`: A string representing a number to convert.
- `style`: A bitwise combination of enumeration values that indicates the permitted format of `s`. A typical value to specify is `NumberStyles.Integer`.
- `provider`: An object that supplies culture-specific formatting information about `s`.
- `result`: When this method returns, contains the 8-bit signed integer value equivalent to the number contained in `s`, if the conversion succeeded, or zero if the conversion failed. The conversion fails if the `s` parameter is `null` or `String.Empty`, is not in a format compliant with `style`, or represents a number less than <see cref="F:System.SByte.MinValue">SByte.MinValue</see> or greater than <see cref="F:System.SByte.MaxValue">SByte.MaxValue</see>. This parameter is passed uninitialized; any value originally supplied in `result` will be overwritten.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

Exceptions:

- `ArgumentException`: `style` is not a `NumberStyles` value.

-or-

`style` is not a combination of `NumberStyles.AllowHexSpecifier` and `NumberStyles.HexNumber` values.

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

If the `AllowHexSpecifier` flag is used, `value` must be a hexadecimal value. Valid hexadecimal digits are 0-9, a-f, and A-F. The only other flags that can be present in `style` are `AllowLeadingWhite` and `AllowTrailingWhite`. (The `NumberStyles` enumeration has a composite style, `HexNumber`, that includes both white-space flags.)

> **Note:**
>  If `value` is the string representation of a hexadecimal number, it cannot be preceded by any decoration (such as `0x` or `&h`) that differentiates it as a hexadecimal number. This causes the conversion to fail.

The `provider` parameter is an `IFormatProvider` implementation. Its `IFormatProvider.GetFormat` method returns a `NumberFormatInfo` object that provides culture-specific information about the format of `value`. The `provider` parameter can be any one of the following:

- A `CultureInfo` object that represents the culture that supplies formatting information. Its `CultureInfo.GetFormat` method returns the `NumberFormatInfo` object that provides numeric formatting information for that culture.

- A `NumberFormatInfo` object that provides numeric formatting information. (Its implementation of `NumberFormatInfo.GetFormat` just returns itself.)

- A custom object that implements `IFormatProvider`. Its `IFormatProvider.GetFormat` method instantiates and returns the `NumberFormatInfo` object that provides formatting information.

If `provider` is `null`, the `NumberFormatInfo` object for the current culture is used.

#### Examples
The following example calls the `TryParse` method with a number of different string and `NumberStyles` values.

_Code sample not included: ~/snippets/csharp/System/SByte/TryParse/tryparse2.cs._

## SByte.TryParsePartial(Byte>, NumberStyles, IFormatProvider, SByte, Int32) method

```csharp
public static bool TryParsePartial (ReadOnlySpan<byte> utf8Text, System.Globalization.NumberStyles style, IFormatProvider? provider, out sbyte result, out int bytesConsumed);
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

## SByte.TryParsePartial(Char>, NumberStyles, IFormatProvider, SByte, Int32) method

```csharp
public static bool TryParsePartial (ReadOnlySpan<char> s, System.Globalization.NumberStyles style, IFormatProvider? provider, out sbyte result, out int charsConsumed);
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

## SByte.TryParsePartial(String, NumberStyles, IFormatProvider, SByte, Int32) method

```csharp
public static bool TryParsePartial (string? s, System.Globalization.NumberStyles style, IFormatProvider? provider, out sbyte result, out int charsConsumed);
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

## SByte.MaxValue field

```csharp
public const sbyte MaxValue = 127;
```

Represents the largest possible value of `SByte`. This field is constant.

#### Remarks
The value of this constant is 127; that is, hexadecimal 0x7F.

#### Examples
The following example uses the `MinValue` and `MaxValue` fields to verify that an `Int64` value is within the range of the `SByte` type before it performs a type conversion. This verification prevents an `OverflowException` at run time.

_Code sample not included: ~/snippets/csharp/System/SByte/MaxValue/MaxValue1.cs._

## SByte.MinValue field

```csharp
public const sbyte MinValue = -128;
```

Represents the smallest possible value of `SByte`. This field is constant.

#### Remarks
The value of this constant is -128; that is, hexadecimal 0x80.

#### Examples
The following example uses the `MinValue` and `MaxValue` fields to verify that an `Int64` value is within the range of the `SByte` type before it performs a type conversion. This verification prevents an `OverflowException` at run time.

_Code sample not included: ~/snippets/csharp/System/SByte/MaxValue/MaxValue1.cs._
