---
title: "Int64 struct (part 4 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Int64.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Int64 struct (part 4 of 8)

## Int64.Parse(String, NumberStyles, IFormatProvider) method

```csharp
public static long Parse (string s, System.Globalization.NumberStyles style, IFormatProvider? provider);
```

Converts the string representation of a number in a specified style and culture-specific format to its 64-bit signed integer equivalent.

Parameters:

- `s`: A string containing a number to convert.
- `style`: A bitwise combination of enumeration values that indicates the style elements that can be present in `s`. A typical value to specify is `NumberStyles.Integer`.
- `provider`: An `IFormatProvider` that supplies culture-specific formatting information about `s`.

Returns: A 64-bit signed integer equivalent to the number specified in `s`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `ArgumentException`: `style` is not a `NumberStyles` value.

-or-

`style` is not a combination of `NumberStyles.AllowHexSpecifier` and `NumberStyles.HexNumber` values.
- `FormatException`: `s` is not in a format compliant with `style`.
- `OverflowException`: `s` represents a number less than <see cref="F:System.Int64.MinValue">Int64.MinValue</see> or greater than <see cref="F:System.Int64.MaxValue">Int64.MaxValue</see>.

-or-

`style` supports fractional digits, but `s` includes non-zero fractional digits.

#### Remarks
The `style` parameter defines the style elements (such as white space or the positive sign) that are allowed in the `s` parameter for the parse operation to succeed. It must be a combination of bit flags from the `NumberStyles` enumeration. Depending on the value of `style`, the `s` parameter may include the following elements:

wssigndigits.fractional_digitsexponential_digits][ws]

Or, if `style` includes `AllowHexSpecifier`:

[ws]hexdigits[ws]

Elements in square brackets ([ and ]) are optional. The following table describes each element.

|Element|Description|
|-------------|-----------------|
|*ws*|Optional white space. White space can appear at the beginning of `s` if `style` includes the `AllowLeadingWhite` flag, and it can appear at the end of `s` if `style` includes the `AllowTrailingWhite` flag.|
|*$*|A culture-specific currency symbol. Its position in the string is defined by the `CurrencyPositivePattern` property of the `NumberFormatInfo` object returned by the `IFormatProvider.GetFormat` method of the `provider` parameter. The currency symbol can appear in `s` if `style` includes the `AllowCurrencySymbol` flag.|
|*sign*|An optional sign. The sign can appear at the beginning of `s` if `style` includes the `AllowLeadingSign` flag or at the end of `s` if `style` includes the `AllowTrailingSign` flag. Parentheses can be used in `s` to indicate a negative value if `style` includes the `AllowParentheses` flag.|
|*digits* *fractional_digits* *exponential_digits*|A sequence of digits from 0 through 9.|
|*,*|A culture-specific thousands separator symbol. The thousands separator of the culture specified by `provider` can appear in `s` if `style` includes the `AllowThousands` flag.|
|*.*|A culture-specific decimal point symbol. The decimal point symbol of the culture specified by `provider` can appear in `s` if `style` includes the `AllowDecimalPoint` flag. Only the digit 0 can appear as a fractional digit for the parse operation to succeed; if *fractional_digits* includes any other digit, an `OverflowException` is thrown.|
|*e*|The 'e' or 'E' character, which indicates that the value is represented in exponential notation. The `s` parameter can represent a number in exponential notation if `style` includes the `AllowExponent` flag.|
|*hexdigits*|A sequence of hexadecimal digits from 0 through f, or 0 through F.|

> **Note:**
> Any terminating NUL (U+0000) characters in `s` are ignored by the parsing operation, regardless of the value of the `style` argument.

A string with decimal digits only (which corresponds to the `None` style) always parses successfully if it is in the range of the `Int64` type. Most of the remaining `NumberStyles` members control elements that may be but are not required to be present in this input string. The following table indicates how individual `NumberStyles` members affect the elements that may be present in `s`.

|Non-composite NumberStyles values|Elements permitted in s in addition to digits|
|----------------------------------------|---------------------------------------------------|
|`None`|Decimal digits only.|
|`AllowDecimalPoint`|The decimal point ( *.* ) and *fractional-digits* elements. However, *fractional-digits* must consist of only one or more 0 digits or an `OverflowException` is thrown.|
|`AllowExponent`|The `s` parameter can also use exponential notation.|
|`AllowLeadingWhite`|The *ws* element at the beginning of `s`.|
|`AllowTrailingWhite`|The *ws* element at the end of `s`.|
|`AllowLeadingSign`|A sign can appear before *digits*.|
|`AllowTrailingSign`|A sign can appear after *digits*.|
|`AllowParentheses`|The *sign* element in the form of parentheses enclosing the numeric value.|
|`AllowThousands`|The thousands separator ( *,* ) element.|
|`AllowCurrencySymbol`|The *$* element.|

If the `AllowHexSpecifier` flag is used, `s` must be a hexadecimal value without a prefix. For example, "C9AF3" parses successfully, but "0xC9AF3" does not. The only other flags that can be present in `style` are `AllowLeadingWhite` and `AllowTrailingWhite`. (The `NumberStyles` enumeration has a composite number style, `HexNumber`, that includes both white space flags.)

The `provider` parameter is an `IFormatProvider` implementation, such as a `NumberFormatInfo` or `CultureInfo` object. The `provider` parameter supplies culture-specific information used in parsing. If `provider` is `null`, the `NumberFormatInfo` for the current culture is used.

#### Examples
The following example uses a variety of `style` and `provider` parameters to parse the string representations of `Int64` values. It also illustrates some of the different ways the same string can be interpreted depending on the culture whose formatting information is used for the parsing operation.

_Code sample not included: ~/snippets/csharp/System/Int64/Parse/Parse3.cs._

## Int64.PopCount(Int64) method

```csharp
public static long PopCount (long value);
```

Computes the number of bits that are set in a value.

Parameters:

- `value`: The value whose set bits are to be counted.

Returns: The number of set bits in `value`.

To be added.

## Int64.RotateLeft(Int64, Int32) method

```csharp
public static long RotateLeft (long value, int rotateAmount);
```

Rotates a value left by a given amount.

Parameters:

- `value`: The value that is rotated left by `rotateAmount`.
- `rotateAmount`: The amount by which `value` is rotated left.

Returns: The result of rotating `value` left by `rotateAmount`.

To be added.

## Int64.RotateRight(Int64, Int32) method

```csharp
public static long RotateRight (long value, int rotateAmount);
```

Rotates a value right by a given amount.

Parameters:

- `value`: The value that is rotated right by `rotateAmount`.
- `rotateAmount`: The amount by which `value` is rotated right.

Returns: The result of rotating `value` right by `rotateAmount`.

To be added.

## Int64.Sign(Int64) method

```csharp
public static int Sign (long value);
```

Computes the sign of a value.

Parameters:

- `value`: The value whose sign is to be computed.

Returns: A positive value if `value` is positive, `INumberBase<T>.Zero` if `value` is zero, and a negative value if `value` is negative.

#### Remarks

It is recommended that a function return `1`, `0`, and `-1`, respectively.

## Int64.System.IConvertible.ToBoolean(IFormatProvider) method

```csharp
bool IConvertible.ToBoolean (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToBoolean`.

Parameters:

- `provider`: This parameter is ignored.

Returns: `true` if the value of the current instance is not zero; otherwise, `false`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Int64` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToBoolean` method.

## Int64.System.IConvertible.ToByte(IFormatProvider) method

```csharp
byte IConvertible.ToByte (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToByte`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current instance, converted to a `Byte`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Int64` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToByte` method.

## Int64.System.IConvertible.ToChar(IFormatProvider) method

```csharp
char IConvertible.ToChar (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToChar`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current instance, converted to a `Char`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Int64` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToChar` method.

## Int64.System.IConvertible.ToDateTime(IFormatProvider) method

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

## Int64.System.IConvertible.ToDecimal(IFormatProvider) method

```csharp
decimal IConvertible.ToDecimal (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToDecimal`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current instance, converted to a `Decimal`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Int64` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToDecimal` method.

## Int64.System.IConvertible.ToDouble(IFormatProvider) method

```csharp
double IConvertible.ToDouble (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToDouble`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current instance, converted to a `Double`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Int64` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToDouble` method.

## Int64.System.IConvertible.ToInt16(IFormatProvider) method

```csharp
short IConvertible.ToInt16 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToInt16`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current instance, converted to an `Int16`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Int64` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToInt16` method.

## Int64.System.IConvertible.ToInt32(IFormatProvider) method

```csharp
int IConvertible.ToInt32 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToInt32`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current instance, converted to an `Int32`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Int64` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToInt32` method.

## Int64.System.IConvertible.ToInt64(IFormatProvider) method

```csharp
long IConvertible.ToInt64 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToInt64`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current instance, unchanged.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Int64` instance is cast to an `IConvertible` interface.

## Int64.System.IConvertible.ToSByte(IFormatProvider) method

```csharp
sbyte IConvertible.ToSByte (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToSByte`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current instance, converted to an `SByte`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Int64` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToSByte` method.

## Int64.System.IConvertible.ToSingle(IFormatProvider) method

```csharp
float IConvertible.ToSingle (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToSingle`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current instance, converted to a `Single`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Int64` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToSingle` method.

## Int64.System.IConvertible.ToType(Type, IFormatProvider) method

```csharp
object IConvertible.ToType (Type type, IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToType`.

Parameters:

- `type`: The type to which to convert this `Int64` value.
- `provider`: An `IFormatProvider` implementation that provides information about the format of the returned value.

Returns: The value of the current instance, converted to `type`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Int64` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `static` (`Shared` in Visual Basic) `Convert.ChangeType` method.

## Int64.System.IConvertible.ToUInt16(IFormatProvider) method

```csharp
ushort IConvertible.ToUInt16 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToUInt16`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current instance, converted to a `UInt16`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Int64` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToUInt16` method.
