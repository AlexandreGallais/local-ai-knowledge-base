---
title: "UInt64 struct (part 3 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/UInt64.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UInt64 struct (part 3 of 8)

## UInt64.Parse(Char>, NumberStyles, IFormatProvider) method

```csharp
public static ulong Parse (ReadOnlySpan<char> s, System.Globalization.NumberStyles style = System.Globalization.NumberStyles.Integer, IFormatProvider? provider = default);
```

Converts the span representation of a number in a specified style and culture-specific format to its 64-bit unsigned integer equivalent.

Parameters:

- `s`: A span containing the characters that represent the number to convert. The span is interpreted by using the style specified by the `style` parameter.
- `style`: A bitwise combination of enumeration values that indicates the style elements that can be present in `s`. A typical value to specify is `NumberStyles.Integer`.
- `provider`: An object that supplies culture-specific formatting information about `s`.

Returns: A 64-bit unsigned integer equivalent to the number specified in `s`.

To be added.

## UInt64.Parse(String, NumberStyles, IFormatProvider) method

```csharp
public static ulong Parse (string s, System.Globalization.NumberStyles style, IFormatProvider? provider);
```

Converts the string representation of a number in a specified style and culture-specific format to its 64-bit unsigned integer equivalent.

Parameters:

- `s`: A string that represents the number to convert. The string is interpreted by using the style specified by the `style` parameter.
- `style`: A bitwise combination of enumeration values that indicates the style elements that can be present in `s`. A typical value to specify is `NumberStyles.Integer`.
- `provider`: An object that supplies culture-specific formatting information about `s`.

Returns: A 64-bit unsigned integer equivalent to the number specified in `s`.

Exceptions:

- `ArgumentNullException`: The `s` parameter is `null`.
- `ArgumentException`: `style` is not a `NumberStyles` value.

-or-

`style` is not a combination of `NumberStyles.AllowHexSpecifier` and `NumberStyles.HexNumber` values.
- `FormatException`: The `s` parameter is not in a format compliant with `style`.
- `OverflowException`: The `s` parameter represents a number less than <see cref="F:System.UInt64.MinValue">UInt64.MinValue</see> or greater than <see cref="F:System.UInt64.MaxValue">UInt64.MaxValue</see>.

-or-

`s` includes non-zero, fractional digits.

#### Remarks
The `style` parameter defines the style elements (such as white space or the positive or negative sign symbol) that are allowed in the `s` parameter for the parse operation to succeed. It must be a combination of bit flags from the `NumberStyles` enumeration.

Depending on the value of `style`, the `s` parameter may include the following elements:

*ws*[*sign*]*digits*.*fractional_digits**exponential_digits*][*ws*]

Elements in square brackets ([ and ]) are optional. If `style` includes `AllowHexSpecifier`, the `s` parameter may include the following elements:

[*ws*]*hexdigits*[*ws*]

The following table describes each element.

|Element|Description|
|-------------|-----------------|
|*ws*|Optional white space. White space can appear at the beginning of `s` if `style` includes the `AllowLeadingWhite` flag, and it can appear at the end of `s` if `style` includes the `AllowTrailingWhite` flag.|
|*$*|A culture-specific currency symbol. Its position in the string is defined by the `CurrencyPositivePattern` property of the `NumberFormatInfo` object that is returned by the `IFormatProvider.GetFormat` method of the `provider` parameter. The currency symbol can appear in `s` if `style` includes the `AllowCurrencySymbol` flag.|
|*sign*|An optional sign. (The method throws an `OverflowException` if `s` includes a negative sign and represents a non-zero number.) The sign can appear at the beginning of `s` if `style` includes the `AllowLeadingSign` flag, and it can appear the end of `s` if `style` includes the `AllowTrailingSign` flag. Parentheses can be used in `s` to indicate a negative value if `style` includes the `AllowParentheses` flag.|
|*digits*|A sequence of digits from 0 through 9.|
|*.*|A culture-specific decimal point symbol. The current culture's decimal point symbol can appear in `s` if `style` includes the `AllowDecimalPoint` flag.|
|*fractional_digits*|One or more occurrences of the digit 0-9 if `style` includes the `AllowExponent` flag, or one or more occurrences of the digit 0 if it does not. Fractional digits can appear in `s` only if `style` includes the `AllowDecimalPoint` flag.|
|E|The "e" or "E" character, which indicates that the value is represented in exponential (scientific) notation. The `s` parameter can represent a number in exponential notation if `style` includes the `AllowExponent` flag.|
|*exponential_digits*|A sequence of digits from 0 through 9. The `s` parameter can represent a number in exponential notation if `style` includes the `AllowExponent` flag.|
|*hexdigits*|A sequence of hexadecimal digits from 0 through f, or 0 through F.|

> **Note:**
> Any terminating NUL (U+0000) characters in `s` are ignored by the parsing operation, regardless of the value of the `style` argument.

A string with decimal digits only (which corresponds to the `None` style) always parses successfully. Most of the remaining `NumberStyles` members control elements that may be present, but are not required to be present, in this input string. The following table indicates how individual `NumberStyles` members affect the elements that may be present in `s`.

|Non-composite `NumberStyles` values|Elements permitted in `s` in addition to digits|
|------------------------------------------|-----------------------------------------------------|
|`None`|Decimal digits only.|
|`AllowDecimalPoint`|The decimal point (*.*) and *fractional_digits* elements. However, if style does not include the `AllowExponent` flag, *fractional_digits* must consist of only one or more 0 digits; otherwise, an `OverflowException` is thrown.|
|`AllowExponent`|The "e" or "E" character, which indicates exponential notation, along with *exponential_digits*.|
|`AllowLeadingWhite`|The *ws* element at the beginning of `s`.|
|`AllowTrailingWhite`|The *ws* element at the end of `s`.|
|`AllowLeadingSign`|A sign before *digits*.|
|`AllowTrailingSign`|A sign after *digits*.|
|`AllowParentheses`|Parentheses before and after *digits* to indicate a negative value.|
|`AllowThousands`|The group separator (*,*) element.|
|`AllowCurrencySymbol`|The currency (*$*) element.|

If the `AllowHexSpecifier` flag is used, `s` must be a hexadecimal value. Valid hexadecimal characters are 0-9, A-F, and a-f. A prefix such as "0x" is not supported and causes the parse operation to fail. The only other flags that can be combined with it are `AllowLeadingWhite` and `AllowTrailingWhite`. (The `NumberStyles` enumeration includes a composite number style, `HexNumber`, that includes both white-space flags.)

> **Note:**
>  If the `s` parameter is the string representation of a hexadecimal number, it cannot be preceded by any decoration (such as `0x` or `&h`) that differentiates it as a hexadecimal number. This causes the parse operation to throw an exception.

The `provider` parameter is an `IFormatProvider` implementation whose `IFormatProvider.GetFormat` method returns a `NumberFormatInfo` object that provides culture-specific information about the format of `s`. There are three ways to use the `provider` parameter to supply custom formatting information to the parse operation:

- You can pass the actual `NumberFormatInfo` object that provides formatting information. (Its implementation of `IFormatProvider.GetFormat` simply returns itself.)

- You can pass a `CultureInfo` object that specifies the culture whose formatting is to be used. Its `NumberFormat` property provides formatting information.

- You can pass a custom `IFormatProvider` implementation. Its `IFormatProvider.GetFormat` method must instantiate and return the `NumberFormatInfo` object that provides formatting information.

If `provider` is `null`, the `NumberFormatInfo` object for the current culture is used.

#### Examples
The following example uses the `Parse` method to convert various string representations of numbers to 64-bit unsigned integer values.

_Code sample not included: ~/snippets/csharp/System/UInt64/Parse/parseex4.cs._

## UInt64.PopCount(UInt64) method

```csharp
public static ulong PopCount (ulong value);
```

Computes the number of bits that are set in a value.

Parameters:

- `value`: The value whose set bits are to be counted.

Returns: The number of set bits in `value`.

To be added.

## UInt64.RotateLeft(UInt64, Int32) method

```csharp
public static ulong RotateLeft (ulong value, int rotateAmount);
```

Rotates a value left by a given amount.

Parameters:

- `value`: The value that is rotated left by `rotateAmount`.
- `rotateAmount`: The amount by which `value` is rotated left.

Returns: The result of rotating `value` left by `rotateAmount`.

To be added.

## UInt64.RotateRight(UInt64, Int32) method

```csharp
public static ulong RotateRight (ulong value, int rotateAmount);
```

Rotates a value right by a given amount.

Parameters:

- `value`: The value that is rotated right by `rotateAmount`.
- `rotateAmount`: The amount by which `value` is rotated right.

Returns: The result of rotating `value` right by `rotateAmount`.

To be added.

## UInt64.Sign(UInt64) method

```csharp
public static int Sign (ulong value);
```

Computes the sign of a value.

Parameters:

- `value`: The value whose sign is to be computed.

Returns: A positive value if `value` is positive, `INumberBase<T>.Zero` if `value` is zero, and a negative value if `value` is negative.

#### Remarks

It is recommended that a function return `1`, `0`, and `-1`, respectively.

## UInt64.System.IConvertible.ToBoolean(IFormatProvider) method

```csharp
bool IConvertible.ToBoolean (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToBoolean`.

Parameters:

- `provider`: This parameter is ignored.

Returns: `true` if the value of the current instance is not zero; otherwise, `false`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `UInt64` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToBoolean` method.

## UInt64.System.IConvertible.ToByte(IFormatProvider) method

```csharp
byte IConvertible.ToByte (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToByte`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current instance, converted to a `Byte`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `UInt64` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToByte` method.

## UInt64.System.IConvertible.ToChar(IFormatProvider) method

```csharp
char IConvertible.ToChar (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToChar`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current instance, converted to a `Char`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `UInt64` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToChar` method.

## UInt64.System.IConvertible.ToDateTime(IFormatProvider) method

```csharp
DateTime IConvertible.ToDateTime (IFormatProvider provider);
```

This conversion is not supported. Attempting to use this method throws an `InvalidCastException`.

Parameters:

- `provider`: This parameter is ignored.

Returns: This conversion is not supported. No value is returned.

Exceptions:

- `InvalidCastException`: In all cases.

To be added.

## UInt64.System.IConvertible.ToDecimal(IFormatProvider) method

```csharp
decimal IConvertible.ToDecimal (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToDecimal`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current instance, converted to a `Decimal`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `UInt64` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToDecimal` method.

## UInt64.System.IConvertible.ToDouble(IFormatProvider) method

```csharp
double IConvertible.ToDouble (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToDouble`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current instance, converted to a `Double`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `UInt64` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToDouble` method.

## UInt64.System.IConvertible.ToInt16(IFormatProvider) method

```csharp
short IConvertible.ToInt16 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToInt16`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current instance, converted to an `Int16`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `UInt64` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToInt16` method.

## UInt64.System.IConvertible.ToInt32(IFormatProvider) method

```csharp
int IConvertible.ToInt32 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToInt32`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current instance, converted to an `Int32`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `UInt64` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToInt32` method.

## UInt64.System.IConvertible.ToInt64(IFormatProvider) method

```csharp
long IConvertible.ToInt64 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToInt64`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current instance, converted to an `Int64`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `UInt64` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToInt64` method.
