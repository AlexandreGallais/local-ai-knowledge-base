---
title: "UInt16 struct (part 8 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/UInt16.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UInt16 struct (part 8 of 8)

## UInt16.TryParse(String, NumberStyles, IFormatProvider, UInt16) method

```csharp
public static bool TryParse (string? s, System.Globalization.NumberStyles style, IFormatProvider? provider, out ushort result);
```

Tries to convert the string representation of a number in a specified style and culture-specific format to its 16-bit unsigned integer equivalent. A return value indicates whether the conversion succeeded or failed.

Parameters:

- `s`: A string that represents the number to convert. The string is interpreted by using the style specified by the `style` parameter.
- `style`: A bitwise combination of enumeration values that indicates the permitted format of `s`. A typical value to specify is `NumberStyles.Integer`.
- `provider`: An object that supplies culture-specific formatting information about `s`.
- `result`: When this method returns, contains the 16-bit unsigned integer value equivalent to the number contained in `s`, if the conversion succeeded, or zero if the conversion failed. The conversion fails if the `s` parameter is `null` or `String.Empty`, is not in a format compliant with `style`, or represents a number less than <see cref="F:System.UInt16.MinValue">UInt16.MinValue</see> or greater than <see cref="F:System.UInt16.MaxValue">UInt16.MaxValue</see>. This parameter is passed uninitialized; any value originally supplied in `result` will be overwritten.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

Exceptions:

- `ArgumentException`: `style` is not a `NumberStyles` value.

-or-

`style` is not a combination of `NumberStyles.AllowHexSpecifier` and `NumberStyles.HexNumber` values.

#### Remarks
The `TryParse` method is like the `Parse` method, except that it does not throw an exception if the conversion fails. This method eliminates the need to use exception handling to test for a `FormatException` if `s` is invalid and cannot be parsed successfully.

The `style` parameter defines the style elements (such as white space or a positive or negative sign) that are allowed in the `s` parameter for the parse operation to succeed. It must be a combination of bit flags from the `NumberStyles` enumeration. Depending on the value of `style`, the `s` parameter may include the following elements:

*ws**sign**digits*.*fractional_digits**exponential_digits*][*ws*]

Items in square brackets ([ and ]) are optional. Or, if the `style` parameter includes `AllowHexSpecifier`, the `s` parameter may include the following elements:

[*ws*]*hexdigits*[*ws*]

The following table describes each element.

*ws*
Optional white space. White space can appear at the start of `s` if `style` includes the `AllowLeadingWhite` flag, or at the end of `s` if `style` includes the `AllowTrailingWhite` flag.

*$*
A culture-specific currency symbol. Its position in the string is defined by the `CurrencyPositivePattern` property of the `NumberFormatInfo` object returned by the `IFormatProvider.GetFormat` method of the `provider` parameter. The currency symbol can appear in `s` if `style` includes the `AllowCurrencySymbol` flag.

*sign*
An optional sign. The sign can appear at the start of `s` if `style` includes the `AllowLeadingSign` flag, and it can appear at the end of `s` if `style` includes the `AllowTrailingSign` flag. Parentheses can be used in `s` to indicate a negative value if `style` includes the `AllowParentheses` flag. However, if the negative sign is present, `s` can only represent the value zero for the parse operation to succeed.

*digits*
A sequence of digits from 0 through 9.

*,*
A culture-specific group separator. The group separator of the culture specified by `provider` can appear in `s` if `style` includes the `AllowThousands` flag.

*.*
A culture-specific decimal point symbol. The decimal point symbol of the culture specified by `provider` can appear in `s` if `style` includes the `AllowDecimalPoint` flag.

*fractional_digits*
One or more occurrences of the digit 0. Fractional digits can appear in `s` only if `style` includes the `AllowDecimalPoint` flag.

E
The "e" or "E" character, which indicates that the value is represented in exponential (scientific) notation. The `s` parameter can represent a number in exponential notation if `style` includes the `AllowExponent` flag.

*exponential_digits*
A sequence of digits from 0 through 9. The `s` parameter can represent a number in exponential notation if `style` includes the `AllowExponent` flag.

*hexdigits*
A sequence of hexadecimal digits from 0 through f, or 0 through F.

> **Note:**
> Any terminating NUL (U+0000) characters in `s` are ignored by the parsing operation, regardless of the value of the `style` argument.

A string with decimal digits only (which corresponds to the `None` flag) always parses successfully. Most of the remaining `NumberStyles` members control elements that may be present, but are not required to be present, in this input string. The following table indicates how individual `NumberStyles` members affect the elements that may be present in `s`.

|Non-composite `NumberStyles` values|Elements permitted in value in addition to digits|
|------------------------------------------|-------------------------------------------------------|
|`None`|Decimal digits only.|
|`AllowDecimalPoint`|The decimal point (*.*) and *fractional_digits* elements. However, *fractional_digits* must consist of only one or more 0 digits, or the method returns `false`.|
|`AllowExponent`|The "e" or "E" character, which indicates exponential notation, along with *exponential_digits*. If `s` represents a number in exponential notation, it cannot have a non-zero, fractional component.|
|`AllowLeadingWhite`|The *ws* element at the start of `s`.|
|`AllowTrailingWhite`|The *ws* element at the end of `s`.|
|`AllowLeadingSign`|The *sign* element before *digits*.|
|`AllowTrailingSign`|The *sign* element after *digits*.|
|`AllowParentheses`|The *sign* element in the form of parentheses enclosing a zero numeric value.|
|`AllowThousands`|The group separator (*,*) element.|
|`AllowCurrencySymbol`|The currency (*$*) element.|
|`Currency`|All elements. However, `s` cannot represent a hexadecimal number or a number in exponential notation.|
|`Float`|The *ws* element at the start or end of `s`, *sign* at the start of `s`, and the decimal point (*.*) symbol. The `s` parameter can also use exponential notation.|
|`Number`|The *ws*, *sign*, group separator (*,*), and decimal point (*.*) elements.|
|`Any`|All elements. However, `s` cannot represent a hexadecimal number.|

If the `AllowHexSpecifier` flag is used, `s` must be a hexadecimal value. Valid hexadecimal digits are 0 through 9, a through f, and A through F. A prefix such as "0x" is not supported and causes the parse operation to fail. The only other flags that can be present in `style` are `AllowLeadingWhite` and `AllowTrailingWhite`. (The `NumberStyles` enumeration has a composite style, `HexNumber`, that includes both white-space flags.)

> **Note:**
>  If `s` is the string representation of a hexadecimal number, it cannot be preceded by any decoration (such as `0x` or `&h`) that differentiates it as a hexadecimal number. This causes the conversion to fail.

The `provider` parameter is an `IFormatProvider` implementation. Its `IFormatProvider.GetFormat` method returns a `NumberFormatInfo` object that provides culture-specific information about the format of `s`. The `provider` parameter can be any one of the following:

- A `CultureInfo` object that represents the culture that supplies formatting information. Its `CultureInfo.GetFormat` method returns the `NumberFormatInfo` object that provides numeric formatting information for that culture.

- A `NumberFormatInfo` object that provides numeric formatting information. (Its implementation of `NumberFormatInfo.GetFormat` just returns itself.)

- A custom object that implements `IFormatProvider`. Its `IFormatProvider.GetFormat` method instantiates and returns the `NumberFormatInfo` object that provides formatting information.

If `provider` is `null`, the `NumberFormatInfo` object for the current culture is used.

#### Examples
The following example calls the `TryParse` method with a number of different strings and `NumberStyles` values.

_Code sample not included: ~/snippets/csharp/System/UInt16/TryParse/tryparse2.cs._

## UInt16.TryParsePartial(Byte>, NumberStyles, IFormatProvider, UInt16, Int32) method

```csharp
public static bool TryParsePartial (ReadOnlySpan<byte> utf8Text, System.Globalization.NumberStyles style, IFormatProvider? provider, out ushort result, out int bytesConsumed);
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

## UInt16.TryParsePartial(Char>, NumberStyles, IFormatProvider, UInt16, Int32) method

```csharp
public static bool TryParsePartial (ReadOnlySpan<char> s, System.Globalization.NumberStyles style, IFormatProvider? provider, out ushort result, out int charsConsumed);
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

## UInt16.TryParsePartial(String, NumberStyles, IFormatProvider, UInt16, Int32) method

```csharp
public static bool TryParsePartial (string? s, System.Globalization.NumberStyles style, IFormatProvider? provider, out ushort result, out int charsConsumed);
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

## UInt16.MaxValue field

```csharp
public const ushort MaxValue = 65535;
```

Represents the largest possible value of `UInt16`. This field is constant.

#### Remarks
The value of this constant is 65535; that is, hexadecimal 0xFFFF.

#### Examples
The following example uses the `MaxValue` and `MinValue` properties to ensure that an `Int32` value is in the range of the `UInt16` type before converting it to a `UInt16` value. This prevents the conversion operation from throwing an `OverflowException` if the integer value is not in the range of the `UInt16` type.

_Code sample not included: ~/snippets/csharp/System/UInt16/MaxValue/MaxValue.cs._

## UInt16.MinValue field

```csharp
public const ushort MinValue = 0;
```

Represents the smallest possible value of `UInt16`. This field is constant.

#### Remarks
The value of this constant is 0.

#### Examples
The following example uses the `MinValue` and `MaxValue` properties to ensure that an `Int32` value is in the range of the `UInt16` type before converting it to a `UInt16` value. This prevents the conversion operation from throwing an `OverflowException` if the integer value is not in the range of the `UInt16` type.

_Code sample not included: ~/snippets/csharp/System/UInt16/MaxValue/MaxValue.cs._
