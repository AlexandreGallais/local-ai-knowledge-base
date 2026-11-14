---
title: "Int64 struct (part 8 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Int64.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Int64 struct (part 8 of 8)

## Int64.TryParse(Char>, NumberStyles, IFormatProvider, Int64) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, System.Globalization.NumberStyles style, IFormatProvider? provider, out long result);
```

Converts the span representation of a number in a specified style and culture-specific format to its 64-bit signed integer equivalent. A return value indicates whether the conversion succeeded or failed.

Parameters:

- `s`: A span containing the characters representing the number to convert. The span is interpreted using the style specified by `style`.
- `style`: A bitwise combination of enumeration values that indicates the style elements that can be present in `s`. A typical value to specify is `NumberStyles.Integer`.
- `provider`: An object that supplies culture-specific formatting information about `s`.
- `result`: When this method returns, contains the 64-bit signed integer value equivalent of the number contained in `s`, if the conversion succeeded, or zero if the conversion failed. The conversion fails if the `s` parameter is `null` or `String.Empty`, is not in a format compliant with `style`, or represents a number less than <see cref="F:System.Int64.MinValue">Int64.MinValue</see> or greater than <see cref="F:System.Int64.MaxValue">Int64.MaxValue</see>. This parameter is passed uninitialized; any value originally supplied in `result` will be overwritten.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

To be added.

## Int64.TryParse(String, NumberStyles, IFormatProvider, Int64) method

```csharp
public static bool TryParse (string? s, System.Globalization.NumberStyles style, IFormatProvider? provider, out long result);
```

Converts the string representation of a number in a specified style and culture-specific format to its 64-bit signed integer equivalent. A return value indicates whether the conversion succeeded or failed.

Parameters:

- `s`: A string containing a number to convert. The string is interpreted using the style specified by `style`.
- `style`: A bitwise combination of enumeration values that indicates the style elements that can be present in `s`. A typical value to specify is `NumberStyles.Integer`.
- `provider`: An object that supplies culture-specific formatting information about `s`.
- `result`: When this method returns, contains the 64-bit signed integer value equivalent of the number contained in `s`, if the conversion succeeded, or zero if the conversion failed. The conversion fails if the `s` parameter is `null` or `String.Empty`, is not in a format compliant with `style`, or represents a number less than <see cref="F:System.Int64.MinValue">Int64.MinValue</see> or greater than <see cref="F:System.Int64.MaxValue">Int64.MaxValue</see>. This parameter is passed uninitialized; any value originally supplied in `result` will be overwritten.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

Exceptions:

- `ArgumentException`: `style` is not a `NumberStyles` value.

-or-

`style` is not a combination of `NumberStyles.AllowHexSpecifier` and `NumberStyles.HexNumber` values.

#### Remarks
The `Int64.TryParse` method is like the `Int64.Parse` method, except the `Int64.TryParse` method does not throw an exception if the conversion fails. It eliminates the need to use exception handling to test for a `FormatException` in the event that `s` is invalid and cannot be parsed successfully.

The `style` parameter defines the style elements (such as white space or a positive or negative sign) that are allowed in the `s` parameter for the parse operation to succeed. It must be a combination of bit flags from the `NumberStyles` enumeration. Depending on the value of `style`,the `s` parameter may include the following elements:

wssigndigits.fractional_digitsexponential_digits][ws]

Or, if the `style` parameter includes `AllowHexSpecifier`:

[ws]hexdigits[ws]

Elements in square brackets ([ and ]) are optional. The following table describes each element.

|Element|Description|
|-------------|-----------------|
|*ws*|Optional white space. White space can appear at the beginning of `s` if `style` includes the `AllowLeadingWhite` flag, or at the end of `s` if `style` includes the `AllowTrailingWhite` flag.|
|*$*|A culture-specific currency symbol. Its position in the string is defined by the `CurrencyPositivePattern` property of the `NumberFormatInfo` object returned by the `IFormatProvider.GetFormat` method of the `provider` parameter. The currency symbol can appear in `s` if `style` includes the `AllowCurrencySymbol` flag.|
|*sign*|An optional sign. A sign symbol can appear in `s` if `style` includes the `AllowLeadingSign` or `AllowTrailingSign` flags.|
|*digits* *fractional_digits* *exponential_digits*|A sequence of digits from 0 through 9. For *fractional_digits*, only the digit 0 is valid.|
|*,*|A culture-specific thousands separator. The thousands separator of the culture specified by `provider` can appear in `s` if `style` includes the `AllowThousands` flag.|
|*.*|A culture-specific decimal point symbol. The decimal point symbol of the culture specified by `provider` can appear in `s` if `style` includes the `AllowDecimalPoint` flag.|
|*e*|The 'e' or 'E' character, which indicates that the value is represented in exponential notation. The `s` parameter can represent a number in exponential notation if `style` includes the `AllowExponent` flag.|
|*hexdigits*|A sequence of hexadecimal digits from 0 through f, or 0 through F.|

> **Note:**
> Any terminating NUL (U+0000) characters in `s` are ignored by the parsing operation, regardless of the value of the `style` argument.

A string with decimal digits only (which corresponds to the `None` flag) always parses successfully. Most of the remaining `NumberStyles` members control elements that may be but are not required to be present in this input string. The following table indicates how individual `NumberStyles` members affect the elements that may be present in `s`.

|Non-composite NumberStyles values|Elements permitted in s in addition to digits|
|----------------------------------------|---------------------------------------------------|
|`None`|Decimal digits only.|
|`AllowDecimalPoint`|The decimal point ( *.* ) and *fractional_digits* elements. However, *fractional_digits* must consist of only one or more 0 digits or the method returns `false`.|
|`AllowExponent`|The `s` parameter can also use exponential notation. The `s` parameter must represent an integer within the range of the `Int64` data type without a non-zero fractional component.|
|`AllowLeadingWhite`|The *ws* element at the beginning of `s`.|
|`AllowTrailingWhite`|The *ws* element at the end of `s`.|
|`AllowLeadingSign`|A sign can appear before *digits*.|
|`AllowTrailingSign`|A sign can appear after *digits*.|
|`AllowParentheses`|The *sign* element in the form of parentheses enclosing the numeric value.|
|`AllowThousands`|The thousands separator ( *,* ) element.|
|`AllowCurrencySymbol`|The *$* element.|
|`Currency`|All elements. The `s` parameter cannot represent a hexadecimal number or a number in exponential notation.|
|`Float`|The *ws* element at the beginning or end of `s`, *sign* at the beginning of `s`, and the decimal point ( *.* ) symbol. The `s` parameter can also use exponential notation.|
|`Number`|The *ws*, *sign*, thousands separator (*,*), and decimal point (*.*) elements.|
|`Any`|All styles, except `s` cannot represent a hexadecimal number.|

If the `AllowHexSpecifier` flag is used, `s` must be a hexadecimal value without a prefix. For example, "C9AF3" parses successfully, but "0xC9AF3" does not. The only other flags that can be present in `style` are `AllowLeadingWhite` and `AllowTrailingWhite`. (The `NumberStyles` enumeration has a composite style, `HexNumber`, that includes both white space flags.)

The `provider` parameter is an `IFormatProvider` implementation, such as a `CultureInfo` object or a `NumberFormatInfo` object, whose `IFormatProvider.GetFormat` method returns a `NumberFormatInfo` object. The `NumberFormatInfo` object provides culture-specific information about the format of `s`. If `provider` is `null`, the `NumberFormatInfo` object for the current culture is used.

#### Examples
The following example calls the `TryParse` method with a number of different string and `NumberStyles` values.

_Code sample not included: ~/snippets/csharp/System/Int64/TryParse/TryParse2.cs._

## Int64.TryParsePartial(Byte>, NumberStyles, IFormatProvider, Int64, Int32) method

```csharp
public static bool TryParsePartial (ReadOnlySpan<byte> utf8Text, System.Globalization.NumberStyles style, IFormatProvider? provider, out long result, out int bytesConsumed);
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

## Int64.TryParsePartial(Char>, NumberStyles, IFormatProvider, Int64, Int32) method

```csharp
public static bool TryParsePartial (ReadOnlySpan<char> s, System.Globalization.NumberStyles style, IFormatProvider? provider, out long result, out int charsConsumed);
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

## Int64.TryParsePartial(String, NumberStyles, IFormatProvider, Int64, Int32) method

```csharp
public static bool TryParsePartial (string? s, System.Globalization.NumberStyles style, IFormatProvider? provider, out long result, out int charsConsumed);
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

## Int64.MaxValue field

```csharp
public const long MaxValue = 9223372036854775807;
```

Represents the largest possible value of an `Int64`. This field is constant.

#### Remarks
The value of this constant is 9,223,372,036,854,775,807; that is, hexadecimal 0x7FFFFFFFFFFFFFFF.

## Int64.MinValue field

```csharp
public const long MinValue = -9223372036854775808;
```

Represents the smallest possible value of an `Int64`. This field is constant.

#### Remarks
The value of this constant is negative 9,223,372,036,854,775,808; that is, hexadecimal 0x8000000000000000.
