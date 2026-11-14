---
title: "SByte struct (part 2 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/SByte.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SByte struct (part 2 of 7)

## SByte.MaxMagnitude(SByte, SByte) method

```csharp
public static sbyte MaxMagnitude (sbyte x, sbyte y);
```

Compares two values to compute which is greater.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPointIeee754<T>` this method matches the IEEE 754:2019 `maximumMagnitude` function. This requires NaN inputs to not be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## SByte.Min(SByte, SByte) method

```csharp
public static sbyte Min (sbyte x, sbyte y);
```

Compares two values to compute which is lesser.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPoint<T>` this method matches the IEEE 754:2019 `minimum` function. This requires NaN inputs to be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## SByte.MinMagnitude(SByte, SByte) method

```csharp
public static sbyte MinMagnitude (sbyte x, sbyte y);
```

Compares two values to compute which is lesser.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPointIeee754<T>` this method matches the IEEE 754:2019 `minimumMagnitude` function. This requires NaN inputs to not be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## SByte.Parse(String) method

```csharp
public static sbyte Parse (string s);
```

Converts the string representation of a number to its 8-bit signed integer equivalent.

Parameters:

- `s`: A string that represents a number to convert. The string is interpreted using the `NumberStyles.Integer` style.

Returns: An 8-bit signed integer that is equivalent to the number contained in the `s` parameter.

Exceptions:

- `ArgumentException`: `s` is `null`.
- `FormatException`: `s` does not consist of an optional sign followed by a sequence of digits (zero through nine).
- `OverflowException`: `s` represents a number less than <see cref="F:System.SByte.MinValue">SByte.MinValue</see> or greater than <see cref="F:System.SByte.MaxValue">SByte.MaxValue</see>.

#### Remarks
The `s` parameter contains a number of the form:

*ws**digits*[*ws*]

Elements in square brackets ([ and ]) are optional. The following table describes each element.

|Element|Description|
|-------------|-----------------|
|*ws*|Optional white space.|
|*sign*|An optional sign.|
|*digits*|A sequence of digits ranging from 0 to 9.|

The `s` parameter is interpreted using the `Integer` style. In addition to the byte value's decimal digits, only leading and trailing spaces with a leading positive or negative sign are allowed. To explicitly define the style elements that can be present in `s`, use either the `Parse` or the `Parse` method.

The `s` parameter is parsed by using the formatting information in a `NumberFormatInfo` that is initialized for the current system culture. For more information, see `NumberFormatInfo.CurrentInfo`. To parse a string by using the formatting information of some other culture, use the `Parse` method.

#### Examples
The following example demonstrates how to convert a string value into a signed byte value using the `SByte.Parse` method. The resulting signed byte value is then displayed to the console.

_Code sample not included: ~/snippets/csharp/System/SByte/Parse/parseex1.cs._

## SByte.Parse(Byte>, IFormatProvider) method

```csharp
public static sbyte Parse (ReadOnlySpan<byte> utf8Text, IFormatProvider? provider);
```

Parses a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.

Returns: The result of parsing `utf8Text`.

To be added.

## SByte.Parse(Char>, IFormatProvider) method

```csharp
public static sbyte Parse (ReadOnlySpan<char> s, IFormatProvider? provider);
```

Parses a span of characters into a value.

Parameters:

- `s`: The span of characters to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.

Returns: The result of parsing `s`.

To be added.

## SByte.Parse(String, NumberStyles) method

```csharp
public static sbyte Parse (string s, System.Globalization.NumberStyles style);
```

Converts the string representation of a number in a specified style to its 8-bit signed integer equivalent.

Parameters:

- `s`: A string that contains a number to convert. The string is interpreted using the style specified by `style`.
- `style`: A bitwise combination of the enumeration values that indicates the style elements that can be present in `s`. A typical value to specify is `NumberStyles.Integer`.

Returns: An 8-bit signed integer that is equivalent to the number specified in `s`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` is not in a format that is compliant with `style`.
- `OverflowException`: `s` represents a number less than <see cref="F:System.SByte.MinValue">SByte.MinValue</see> or greater than <see cref="F:System.SByte.MaxValue">SByte.MaxValue</see>.

-or-

`s` includes non-zero, fractional digits.
- `ArgumentException`: `style` is not a `NumberStyles` value.

-or-

`style` is not a combination of `NumberStyles.AllowHexSpecifier` and `NumberStyles.HexNumber` values.

#### Remarks
The `style` parameter defines the style elements (such as white space or the positive or negative sign symbol) that are allowed in the `s` parameter for the parse operation to succeed. It must be a combination of bit flags from the `NumberStyles` enumeration.

Depending on the value of `style`, the `s` parameter may include the following elements:

*ws*[*sign*]*digits*.*fractional_digits**exponential_digits*][*ws*]

If `style` includes `AllowHexSpecifier`, the `s` parameter may contain the following elements:

[*ws*]*hexdigits*[*ws*]

Elements in square brackets ([ and ]) are optional. The following table describes each element.

|Element|Description|
|-------------|-----------------|
|*ws*|Optional white space. White space can appear at the beginning of `s` if `style` includes the `AllowLeadingWhite` flag, and it can appear at the end of `s` if style includes the `AllowTrailingWhite` flag.|
|*$*|A culture-specific currency symbol. Its position in the string is defined by the `CurrencyPositivePattern` property of the current culture. The current culture's currency symbol can appear in `s` if `style` includes the `AllowCurrencySymbol` flag.|
|*sign*|An optional sign. The sign can appear at the beginning of `s` if `style` includes the `AllowLeadingSign` flag, and it can appear at the end of `s` if `style` includes the `AllowTrailingSign` flag. Parentheses can be used in `s` to indicate a negative value if `style` includes the `AllowParentheses` flag.|
|*digits*|A sequence of digits from 0 through 9.|
|*.*|A culture-specific decimal point symbol. The current culture's decimal point symbol can appear in `s` if `style` includes the `AllowDecimalPoint` flag.|
|*fractional_digits*|One or more occurrences of the digit 0-9 if `style` includes the `AllowExponent` flag, or one or more occurrences of the digit 0 if it does not. Fractional digits can appear in `s` only if `style` includes the `AllowDecimalPoint` flag.|
|E|The "e" or "E" character, which indicates that the value is represented in exponential (scientific) notation. The `s` parameter can represent a number in exponential notation if `style` includes the `AllowExponent` flag.|
|*exponential_digits*|One or more occurrences of the digit 0-9. The `s` parameter can represent a number in exponential notation if `style` includes the `AllowExponent` flag.|
|*hexdigits*|A sequence of hexadecimal digits from 0 through f, or 0 through F.|

> **Note:**
> Any terminating NUL (U+0000) characters in `s` are ignored by the parsing operation, regardless of the value of the `style` argument.

A string with decimal digits only (which corresponds to the `None` style) always parses successfully. Most of the remaining `NumberStyles` members control elements that may be present, but are not required to be present, in the input string. The following table indicates how individual `NumberStyles` members affect the elements that may be present in `s`.

|Non-composite NumberStyles values|Elements permitted in *s* in addition to digits|
|----------------------------------------|-----------------------------------------------------|
|`None`|Decimal digits only.|
|`AllowDecimalPoint`|The decimal point (*.*) and *fractional_digits* elements. However, if `style` does not include the `AllowExponent` flag, *fractional_digits* must consist of only one or more 0 digits; otherwise, an `OverflowException` is thrown.|
|`AllowExponent`|The "e" or "E" character, which indicates exponential notation, along with *exponential_digits*.|
|`AllowLeadingWhite`|The *ws* element at the beginning of `s`.|
|`AllowTrailingWhite`|The *ws* element at the end of `s`.|
|`AllowLeadingSign`|A positive sign before *digits*.|
|`AllowTrailingSign`|A positive sign after *digits*.|
|`AllowParentheses`|The *sign* element in the form of parentheses enclosing the numeric value.|
|`AllowThousands`|The group separator (,) element. Although the group separator can appear in `s`, it must be preceded by only one or more 0 digits.|
|`AllowCurrencySymbol`|The currency (*$*) element.|

If the `AllowHexSpecifier` flag is used, `s` must be a hexadecimal value. Valid hexadecimal digits are 0-9, a-f, and A-F. A prefix such as "0x" is not supported and causes the parse operation to fail. The only other flags that can be combined included in `style` are `AllowLeadingWhite` and `AllowTrailingWhite`. (The `NumberStyles` enumeration includes a composite number style, `HexNumber`, that includes both white-space flags.)

> **Note:**
>  If the `s` parameter is the string representation of a hexadecimal number, it cannot be preceded by any decoration (such as `0x` or `&h`) that differentiates it as a hexadecimal number. This causes the parse operation to throw an exception.

If `s` represents a hexadecimal number, the `Parse` method interprets the high-order bit of the byte as a sign bit.

The `s` parameter is parsed by using the formatting information in a `NumberFormatInfo` object that is initialized for the current system culture. To use the formatting information of some other culture, call the `Parse` overload.

#### Examples
The following example parses string representations of `SByte` values with the `Parse` method. The current culture for the example is en-US.

_Code sample not included: ~/snippets/csharp/System/SByte/Parse/parseex2.cs._

## SByte.Parse(String, IFormatProvider) method

```csharp
public static sbyte Parse (string s, IFormatProvider? provider);
```

Converts the string representation of a number in a specified culture-specific format to its 8-bit signed integer equivalent.

Parameters:

- `s`: A string that represents a number to convert. The string is interpreted using the `NumberStyles.Integer` style.
- `provider`: An object that supplies culture-specific formatting information about `s`. If `provider` is `null`, the thread current culture is used.

Returns: An 8-bit signed integer that is equivalent to the number specified in `s`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` is not in the correct format.
- `OverflowException`: `s` represents a number less than <see cref="F:System.SByte.MinValue">SByte.MinValue</see> or greater than <see cref="F:System.SByte.MaxValue">SByte.MaxValue</see>.

#### Remarks
The `s` parameter contains a number of the form:

*ws**digits*[*ws*]

Elements in square brackets ([ and ]) are optional. The following table describes each element.

|Element|Description|
|-------------|-----------------|
|*ws*|Optional white space.|
|*sign*|An optional sign.|
|*digits*|A sequence of digits ranging from 0 to 9.|

The `s` parameter is interpreted using the `Integer` style. In addition to the byte value's decimal digits, only leading and trailing spaces with a leading sign are allowed. To explicitly define the style elements with the culture-specific formatting information that can be present in `s`, use the `Parse` method.

The `provider` parameter is an `IFormatProvider` implementation whose `IFormatProvider.GetFormat` method returns a `NumberFormatInfo` object that provides culture-specific information about the format of `s`. There are three ways to use the `provider` parameter to supply custom formatting information to the parse operation:

- You can pass the actual `NumberFormatInfo` object that provides formatting information. (Its implementation of `IFormatProvider.GetFormat` simply returns itself.)

- You can pass a `CultureInfo` object that specifies the culture whose formatting is to be used. Its `NumberFormat` property provides formatting information.

- You can pass a custom `IFormatProvider` implementation. Its `IFormatProvider.GetFormat` method must instantiate and return the `NumberFormatInfo` object that provides formatting information.

If `provider` is `null`, the `NumberFormatInfo` object for the current culture is used.

#### Examples
The following example defines a custom `NumberFormatInfo` object that defines the tilde (~) as the negative sign. It then parses a number of numeric strings using this custom `NumberFormatInfo` object as well as a `CultureInfo` object that represents the invariant culture.

_Code sample not included: ~/snippets/csharp/System/SByte/Parse/parseex3.cs._

## SByte.Parse(Byte>, NumberStyles, IFormatProvider) method

```csharp
public static sbyte Parse (ReadOnlySpan<byte> utf8Text, System.Globalization.NumberStyles style = System.Globalization.NumberStyles.Integer, IFormatProvider? provider = default);
```

Parses a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `style`: A bitwise combination of number styles that can be present in `utf8Text`.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.

Returns: The result of parsing `utf8Text`.

To be added.
