---
title: "Byte struct (part 2 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Byte.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Byte struct (part 2 of 7)

## Byte.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value indicating whether this instance is equal to a specified object.

Parameters:

- `obj`: An object to compare with this instance, or `null`.

Returns: `true` if `obj` is an instance of `Byte` and equals the value of this instance; otherwise, `false`.

## Byte.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A hash code for the current `Byte`.

To be added.

## Byte.GetTypeCode() method

```csharp
public TypeCode GetTypeCode ();
```

Returns the `TypeCode` for value type `Byte`.

Returns: The enumerated constant, `TypeCode.Byte`.

To be added.

## Byte.IsEvenInteger(Byte) method

```csharp
public static bool IsEvenInteger (byte value);
```

Determines if a value represents an even integral number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an even integer; otherwise, `false`.

#### Remarks

This method correctly handles floating-point values and so `2.0` will return `true` while `2.2` will return `false`.

A return value of `false` does not imply that `IsOddInteger` will return `true`. A number with a fractional portion, for example, `3.3`, is not even or odd.

## Byte.IsOddInteger(Byte) method

```csharp
public static bool IsOddInteger (byte value);
```

Determines if a value represents an odd integral number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an odd integer; otherwise, `false`.

#### Remarks

This method correctly handles floating-point values and so `3.0` will return `true` while `3.3` will return `false`.

A return value of `false` does not imply that `IsEvenInteger` will return `true`. A number with a fractional portion, for example, `3.3`, is not even or odd.

## Byte.IsPow2(Byte) method

```csharp
public static bool IsPow2 (byte value);
```

Determines if a value is a power of two.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a power of two; otherwise, `false`.

To be added.

## Byte.LeadingZeroCount(Byte) method

```csharp
public static byte LeadingZeroCount (byte value);
```

Computes the number of leading zeros in a value.

Parameters:

- `value`: The value whose leading zeroes are to be counted.

Returns: The number of leading zeros in `value`.

To be added.

## Byte.Log10(Byte) method

```csharp
public static byte Log10 (byte value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## Byte.Log2(Byte) method

```csharp
public static byte Log2 (byte value);
```

Computes the log2 of a value.

Parameters:

- `value`: The value whose log2 is to be computed.

Returns: The log2 of `value`.

To be added.

## Byte.Max(Byte, Byte) method

```csharp
public static byte Max (byte x, byte y);
```

Compares two values to compute which is greater.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPoint<T>`, this method matches the IEEE 754:2019 `maximum` function. This requires NaN inputs to be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## Byte.Min(Byte, Byte) method

```csharp
public static byte Min (byte x, byte y);
```

Compares two values to compute which is lesser.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPoint<T>`, this method matches the IEEE 754:2019 `minimum` function. This requires NaN inputs to be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## Byte.Parse(String) method

```csharp
public static byte Parse (string s);
```

Converts the string representation of a number to its `Byte` equivalent.

Parameters:

- `s`: A string that contains a number to convert. The string is interpreted using the `NumberStyles.Integer` style.

Returns: A byte value that is equivalent to the number contained in `s`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` is not of the correct format.
- `OverflowException`: `s` represents a number less than <see cref="F:System.Byte.MinValue">Byte.MinValue</see> or greater than <see cref="F:System.Byte.MaxValue">Byte.MaxValue</see>.

#### Remarks
The `s` parameter contains a number of the form:

wsdigits[ws]

Elements in square brackets ([ and ]) are optional. The following table describes each element.

|Element|Description|
|-------------|-----------------|
|*ws*|Optional white space.|
|*sign*|An optional positive or negative sign.|
|*digits*|A sequence of digits ranging from 0 to 9.|

The `s` parameter is interpreted using the `Integer` style. In addition to the byte value's decimal digits, only leading and trailing spaces together with a leading sign are allowed. (If the sign is present, it must be a positive sign or the method throws an `OverflowException`.) To explicitly define the style elements that can be present in `s`, use either the `Parse` or the `Parse` method.

The `s` parameter is parsed using the formatting information in a `NumberFormatInfo` object that is initialized for the current system culture. For more information, see `NumberFormatInfo.CurrentInfo`. To parse a string using the formatting information of some other culture, use the `Parse` method.

#### Examples
The following example demonstrates how to convert a string value into a byte value using the `Parse` method. The resulting byte value is then displayed to the console.

_Code sample not included: ~/snippets/csharp/System/Byte/Parse/parse.cs._

## Byte.Parse(Byte>, IFormatProvider) method

```csharp
public static byte Parse (ReadOnlySpan<byte> utf8Text, IFormatProvider? provider);
```

Parses a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.

Returns: The result of parsing `utf8Text`.

To be added.

## Byte.Parse(Char>, IFormatProvider) method

```csharp
public static byte Parse (ReadOnlySpan<char> s, IFormatProvider? provider);
```

Parses a span of characters into a value.

Parameters:

- `s`: The span of characters to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.

Returns: The result of parsing `s`.

To be added.

## Byte.Parse(String, NumberStyles) method

```csharp
public static byte Parse (string s, System.Globalization.NumberStyles style);
```

Converts the string representation of a number in a specified style to its `Byte` equivalent.

Parameters:

- `s`: A string that contains a number to convert. The string is interpreted using the style specified by `style`.
- `style`: A bitwise combination of enumeration values that indicates the style elements that can be present in `s`. A typical value to specify is `NumberStyles.Integer`.

Returns: A byte value that's equivalent to the number contained in `s`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` is not of the correct format.
- `OverflowException`: `s` represents a number less than <see cref="F:System.Byte.MinValue">Byte.MinValue</see> or greater than <see cref="F:System.Byte.MaxValue">Byte.MaxValue</see>.

-or-

`s` includes non-zero, fractional digits.
- `ArgumentException`: `style` is not a `NumberStyles` value.

-or-

`style` is not a combination of `NumberStyles.AllowHexSpecifier` and `NumberStyles.HexNumber` values.

#### Remarks
The `style` parameter defines the style elements (such as white space or the positive sign) that are allowed in the `s` parameter for the parse operation to succeed. It must be a combination of bit flags from the `NumberStyles` enumeration. Depending on the value of `style`, the `s` parameter can include the following elements:

ws[sign]digits.fractional_digitsdigits][ws]

Or, if `style` includes `AllowHexSpecifier`:

[ws]hexdigits[ws]

Elements in square brackets ([ and ]) are optional. The following table describes each element.

|Element|Description|
|-------------|-----------------|
|*ws*|Optional white space. White space can appear at the beginning of `s` if `style` includes the `AllowLeadingWhite` flag, or at the end of s if style includes the `AllowTrailingWhite` flag.|
|*$*|A culture-specific currency symbol. Its position in the string is defined by the `CurrencyPositivePattern` property of the current culture. The current culture's currency symbol can appear in `s` if `style` includes the `AllowCurrencySymbol` flag.|
|*sign*|An optional positive sign. (The method throws an `OverflowException` if a negative sign is present in `s`.) The sign can appear at the beginning of `s` if `style` includes the `AllowLeadingSign` flag, or at the end of `s` if `style` includes the `AllowTrailingSign` flag.|
|*digits*|A sequence of digits from 0 through 9.|
|*.*|A culture-specific decimal point symbol. The current culture's decimal point symbol can appear in `s` if `style` includes the `AllowDecimalPoint` flag.|
|*fractional_digits*|One or more occurrences of the digit 0. Fractional digits can appear in `s` only if `style` includes the `AllowDecimalPoint` flag.|
|*e*|The e or E character, which indicates that the value is represented in exponential notation. The `s` parameter can represent a number in exponential notation if `style` includes the `AllowExponent` flag.|
|*hexdigits*|A sequence of hexadecimal digits from 0 through f, or 0 through F.|

> **Note:**
> Any terminating NUL (U+0000) characters in `s` are ignored by the parsing operation, regardless of the value of the `style` argument.

A string with decimal digits only (which corresponds to the `None` style) always parses successfully. Most of the remaining `NumberStyles` members control elements that may be but are not required to be present in this input string. The following table indicates how individual `NumberStyles` members affect the elements that may be present in `s`.

|Non-composite NumberStyles values|Elements permitted in s in addition to digits|
|----------------------------------------|---------------------------------------------------|
|`None`|Decimal digits only.|
|`AllowDecimalPoint`|The *.* and *fractional_digits* elements. However, *fractional_digits* must consist of only one or more 0 digits or an `OverflowException` is thrown.|
|`AllowExponent`|The `s` parameter can also use exponential notation.|
|`AllowLeadingWhite`|The *ws* element at the beginning of `s`.|
|`AllowTrailingWhite`|The *ws* element at the end of `s`.|
|`AllowLeadingSign`|A positive sign can appear before *digits*.|
|`AllowTrailingSign`|A positive sign can appear after *digits*.|
|`AllowParentheses`|Although this flag is supported, the use of parentheses in `s` results in an `OverflowException`.|
|`AllowThousands`|Although the group separator symbol can appear in `s`, it can be preceded by only one or more 0 digits.|
|`AllowCurrencySymbol`|The *$* element.|

If the `AllowHexSpecifier` flag is used, `s` must be a hexadecimal value without a prefix. For example, "F3" parses successfully, but "0xF3" does not. The only other flags that can be combined with it are `AllowLeadingWhite` and `AllowTrailingWhite`. (The `NumberStyles` enumeration includes a composite number style, `HexNumber`, that includes both white space flags.)

The `s` parameter is parsed using the formatting information in a `NumberFormatInfo` object that is initialized for the current system culture. To use the formatting information of some other culture, call the `Parse` overload.

#### Examples
The following example parses string representations of `Byte` values with the `Parse` method. The current culture for the example is en-US.

_Code sample not included: ~/snippets/csharp/System/Byte/Parse/parse.cs._

## Byte.Parse(String, IFormatProvider) method

```csharp
public static byte Parse (string s, IFormatProvider? provider);
```

Converts the string representation of a number in a specified culture-specific format to its `Byte` equivalent.

Parameters:

- `s`: A string that contains a number to convert. The string is interpreted using the `NumberStyles.Integer` style.
- `provider`: An object that supplies culture-specific parsing information about `s`. If `provider` is `null`, the thread current culture is used.

Returns: A byte value that is equivalent to the number contained in `s`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` is not of the correct format.
- `OverflowException`: `s` represents a number less than <see cref="F:System.Byte.MinValue">Byte.MinValue</see> or greater than <see cref="F:System.Byte.MaxValue">Byte.MaxValue</see>.

#### Remarks
The `s` parameter contains a number of the form:

wsdigits[ws]

Elements in square brackets ([ and ]) are optional. The following table describes each element.

|Element|Description|
|-------------|-----------------|
|*ws*|Optional white space.|
|*sign*|An optional positive sign.|
|*digits*|A sequence of digits ranging from 0 to 9.|

The `s` parameter is interpreted using the `Integer` style. In addition to the byte value's decimal digits, only leading and trailing spaces together with a leading sign are allowed. (If the sign is present, it must be a positive sign or the method throws an `OverflowException`.) To explicitly define the style elements together with the culture-specific formatting information that can be present in `s`, use the `Parse` method.

The `s` parameter is parsed using the formatting information in a `NumberFormatInfo` object supplied by `provider`. The `provider` parameter is an `IFormatProvider` implementation such as a `NumberFormatInfo` or `CultureInfo` object. The `provider` parameter supplies culture-specific information used in parsing. If `provider` is `null`, the thread current culture is used.

#### Examples
The following example parses string representations of `Byte` values with the `Byte.Parse` method.

_Code sample not included: ~/snippets/csharp/System/Byte/Parse/parse.cs._

## Byte.Parse(Byte>, NumberStyles, IFormatProvider) method

```csharp
public static byte Parse (ReadOnlySpan<byte> utf8Text, System.Globalization.NumberStyles style = System.Globalization.NumberStyles.Integer, IFormatProvider? provider = default);
```

Parses a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `style`: A bitwise combination of number styles that can be present in `utf8Text`.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.

Returns: The result of parsing `utf8Text`.

To be added.
