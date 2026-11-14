---
title: "Int16 struct (part 2 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Int16.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Int16 struct (part 2 of 7)

## Int16.Max(Int16, Int16) method

```csharp
public static short Max (short x, short y);
```

Compares two values to compute which is greater.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPoint<T>` this method matches the IEEE 754:2019 `maximum` function. This requires NaN inputs to be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## Int16.MaxMagnitude(Int16, Int16) method

```csharp
public static short MaxMagnitude (short x, short y);
```

Compares two values to compute which is greater.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPointIeee754<T>` this method matches the IEEE 754:2019 `maximumMagnitude` function. This requires NaN inputs to not be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## Int16.Min(Int16, Int16) method

```csharp
public static short Min (short x, short y);
```

Compares two values to compute which is lesser.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPoint<T>` this method matches the IEEE 754:2019 `minimum` function. This requires NaN inputs to be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## Int16.MinMagnitude(Int16, Int16) method

```csharp
public static short MinMagnitude (short x, short y);
```

Compares two values to compute which is lesser.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPointIeee754<T>` this method matches the IEEE 754:2019 `minimumMagnitude` function. This requires NaN inputs to not be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## Int16.Parse(String) method

```csharp
public static short Parse (string s);
```

Converts the string representation of a number to its 16-bit signed integer equivalent.

Parameters:

- `s`: A string containing a number to convert.

Returns: A 16-bit signed integer equivalent to the number contained in `s`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` is not in the correct format.
- `OverflowException`: `s` represents a number less than <see cref="F:System.Int16.MinValue">Int16.MinValue</see> or greater than <see cref="F:System.Int16.MaxValue">Int16.MaxValue</see>.

#### Remarks
The `s` parameter contains a number of the form:

wsdigits[ws]

Elements in square brackets ([ and ]) are optional. The following table describes each element.

|Element|Description|
|-------------|-----------------|
|*ws*|Optional white space.|
|*sign*|An optional sign.|
|*digits*|A sequence of digits ranging from 0 to 9.|

The `s` parameter is interpreted using the `Integer` style. In addition to the integer value's decimal digits, only leading and trailing spaces together with a leading sign are allowed. To explicitly define the style elements that can be present in `s`, use either the `Parse` or the `Int16.Parse` method.

The `s` parameter is parsed using the formatting information in a `NumberFormatInfo` object that is initialized for the current system culture. For more information, see `NumberFormatInfo.CurrentInfo`. To parse a string using the formatting information of some other culture, use the `Parse` or the `Parse` method.

#### Examples
The following example demonstrates how to convert a string value into a 16-bit signed integer value using the `Parse` method. The resulting integer value is then displayed to the console.

_Code sample not included: ~/snippets/csharp/System/Int16/Parse/Parse.cs._

## Int16.Parse(Byte>, IFormatProvider) method

```csharp
public static short Parse (ReadOnlySpan<byte> utf8Text, IFormatProvider? provider);
```

Parses a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.

Returns: The result of parsing `utf8Text`.

To be added.

## Int16.Parse(Char>, IFormatProvider) method

```csharp
public static short Parse (ReadOnlySpan<char> s, IFormatProvider? provider);
```

Parses a span of characters into a value.

Parameters:

- `s`: The span of characters to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.

Returns: The result of parsing `s`.

To be added.

## Int16.Parse(String, NumberStyles) method

```csharp
public static short Parse (string s, System.Globalization.NumberStyles style);
```

Converts the string representation of a number in a specified style to its 16-bit signed integer equivalent.

Parameters:

- `s`: A string containing a number to convert.
- `style`: A bitwise combination of the enumeration values that indicates the style elements that can be present in `s`. A typical value to specify is `NumberStyles.Integer`.

Returns: A 16-bit signed integer equivalent to the number specified in `s`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `ArgumentException`: `style` is not a `NumberStyles` value.

-or-

`style` is not a combination of `NumberStyles.AllowHexSpecifier` and `NumberStyles.HexNumber` values.
- `FormatException`: `s` is not in a format compliant with `style`.
- `OverflowException`: `s` represents a number less than <see cref="F:System.Int16.MinValue">Int16.MinValue</see> or greater than <see cref="F:System.Int16.MaxValue">Int16.MaxValue</see>.

-or-

`s` includes non-zero fractional digits.

#### Remarks
The `style` parameter defines the style elements (such as white space or a sign symbol) that are allowed in the `s` parameter for the parse operation to succeed. It must be a combination of bit flags from the `NumberStyles` enumeration. Depending on the value of `style`, the `s` parameter may include the following elements:

wssigndigits.fractional_digitsdigits][ws]

Or, if `style` includes `AllowHexSpecifier`:

[ws]hexdigits[ws]

Items in square brackets ([ and ]) are optional. The following table describes each element.

|Element|Description|
|-------------|-----------------|
|*ws*|Optional white space. White space can appear at the beginning of `s` if `style` includes the `AllowLeadingWhite` flag, or at the end of `s` if `style` includes the `AllowTrailingWhite` flag.|
|*$*|A culture-specific currency symbol. Its position in the string is defined by the `CurrencyPositivePattern` and `CurrencyNegativePattern` properties of the current culture. The current culture's currency symbol can appear in `s` if `style` includes the `AllowCurrencySymbol` flag.|
|*sign*|An optional sign. The sign can appear at the beginning of `s` if `style` includes the `AllowLeadingSign` flag, and it can appear at the end of `s` if `style` includes the `AllowTrailingSign` flag. Parentheses can be used in `s` to indicate a negative value if `style` includes the `AllowParentheses` flag.|
|*digits*|A sequence of digits from 0 through 9.|
|*,*|A culture-specific thousands separator symbol. The current culture's thousands separator symbol can appear in `s` if `style` includes the `AllowThousands` flag.|
|*.*|A culture-specific decimal point symbol. The current culture's decimal point symbol can appear in `s` if `style` includes the `AllowDecimalPoint` flag.|
|*fractional_digits*|A sequence of the 0 digit. Fractional digits can appear in `s` if `style` includes the `AllowDecimalPoint` flag. If any digit other than 0 appears in *fractional_digits*, the method throws an `OverflowException`.|
|*e*|The 'e' or 'E' character, which indicates that `s` can be represented in exponential notation. The `s` parameter can represent a number in exponential notation if `style` includes the `AllowExponent` flag. However, the `s` parameter must represent a number in the range of the `Int16` data type and cannot have a non-zero fractional component.|
|*hexdigits*|A sequence of hexadecimal digits from 0 through f, or 0 through F.|

> **Note:**
> Any terminating NUL (U+0000) characters in `s` are ignored by the parsing operation, regardless of the value of the `style` argument.

A string with *digits* only (which corresponds to the `None` style) always parses successfully. Most of the remaining `NumberStyles` members control elements that may be but are not required to be present in this input string. The following table indicates how individual `NumberStyles` members affect the elements that may be present in `s`.

|Non-composite NumberStyles values|Elements permitted in s in addition to digits|
|----------------------------------------|---------------------------------------------------|
|`None`|Decimal digits only.|
|`AllowDecimalPoint`|The *.* and *fractional_digits* elements. However, *fractional_digits* must consist of only one or more 0 digits or an `OverflowException` is thrown.|
|`AllowExponent`|The `s` parameter can also use exponential notation.|
|`AllowLeadingWhite`|The *ws* element at the beginning of `s`.|
|`AllowTrailingWhite`|The *ws* element at the end of `s`.|
|`AllowLeadingSign`|A sign can appear before *digits*.|
|`AllowTrailingSign`|A sign can appear after *digits*.|
|`AllowParentheses`|The *sign* element in the form of parentheses enclosing the numeric value.|
|`AllowThousands`|The *,* element.|
|`AllowCurrencySymbol`|The *$* element.|

If the `AllowHexSpecifier` flag is used, `s` must be the string representation of a hexadecimal value without a prefix. For example, "9AF3" parses successfully, but "0x9AF3" does not. The only other flags that can be present in `style` are `AllowLeadingWhite` and `AllowTrailingWhite`. (The `NumberStyles` enumeration has a composite number style, `HexNumber`, that includes both white space flags.)

The `s` parameter is parsed using the formatting information in a `NumberFormatInfo` object that is initialized for the current system culture. For more information, see `NumberFormatInfo.CurrentInfo`. To parse `s` using the formatting information of a specific culture, call the `Parse` method.

#### Examples
The following example uses the `Parse` method to parse the string representations of `Int16` values using the en-US culture.

_Code sample not included: ~/snippets/csharp/System/Int16/Parse/Parse2.cs._

## Int16.Parse(String, IFormatProvider) method

```csharp
public static short Parse (string s, IFormatProvider? provider);
```

Converts the string representation of a number in a specified culture-specific format to its 16-bit signed integer equivalent.

Parameters:

- `s`: A string containing a number to convert.
- `provider`: An `IFormatProvider` that supplies culture-specific formatting information about `s`.

Returns: A 16-bit signed integer equivalent to the number specified in `s`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` is not in the correct format.
- `OverflowException`: `s` represents a number less than <see cref="F:System.Int16.MinValue">Int16.MinValue</see> or greater than <see cref="F:System.Int16.MaxValue">Int16.MaxValue</see>.

#### Remarks
The `s` parameter contains a number of the form:

wsdigits[ws]

Elements in square brackets ([ and ]) are optional. The following table describes each element.

|Element|Description|
|-------------|-----------------|
|ws|An optional white space.|
|sign|An optional sign.|
|digits|A sequence of digits ranging from 0 to 9.|

The `s` parameter is interpreted using the `Integer` style. In addition to decimal digits, only leading and trailing spaces together with a leading sign are allowed in `s`. To explicitly define the style elements together with the culture-specific formatting information that can be present in `s`, use the `Parse` method.

The `provider` parameter is an `IFormatProvider` implementation that obtains a `NumberFormatInfo` object. The `NumberFormatInfo` provides culture-specific information about the format of `s`. If `provider` is `null`, the `NumberFormatInfo` for the current culture is used.

#### Examples
The following example parses string representations of `Int16` values with the `Parse` method.

_Code sample not included: ~/snippets/csharp/System/Int16/Parse/Parse.cs._

## Int16.Parse(Byte>, NumberStyles, IFormatProvider) method

```csharp
public static short Parse (ReadOnlySpan<byte> utf8Text, System.Globalization.NumberStyles style = System.Globalization.NumberStyles.Integer, IFormatProvider? provider = default);
```

Parses a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `style`: A bitwise combination of number styles that can be present in `utf8Text`.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.

Returns: The result of parsing `utf8Text`.

To be added.

## Int16.Parse(Char>, NumberStyles, IFormatProvider) method

```csharp
public static short Parse (ReadOnlySpan<char> s, System.Globalization.NumberStyles style = System.Globalization.NumberStyles.Integer, IFormatProvider? provider = default);
```

Converts the span representation of a number in a specified style and culture-specific format to its 16-bit signed integer equivalent.

Parameters:

- `s`: A span containing the characters representing the number to convert.
- `style`: A bitwise combination of enumeration values that indicates the style elements that can be present in `s`. A typical value to specify is `NumberStyles.Integer`.
- `provider`: An `IFormatProvider` that supplies culture-specific formatting information about `s`.

Returns: A 16-bit signed integer equivalent to the number specified in `s`.

To be added.
