---
title: "BigInteger struct (part 17 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/BigInteger.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BigInteger struct (part 17 of 18)

## BigInteger.TryFormat(Char>, Int32, Char>, IFormatProvider) method

```csharp
public bool TryFormat (Span<char> destination, out int charsWritten, ReadOnlySpan<char> format = default, IFormatProvider? provider = default);
```

Formats this big integer instance into a span of characters.

Parameters:

- `destination`: The span of characters into which this instance will be written.
- `charsWritten`: When the method returns, contains the length of the span in number of characters.
- `format`: A read-only span of characters that specifies the format for the formatting operation.
- `provider`: An object that supplies culture-specific formatting information.

Returns: `true` if the formatting operation succeeds; `false` otherwise.

To be added.

## BigInteger.TryParse(Byte>, BigInteger) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> utf8Text, out System.Numerics.BigInteger result);
```

To be added.

Parameters:

- `utf8Text`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## BigInteger.TryParse(Char>, BigInteger) method

```csharp
public static bool TryParse (ReadOnlySpan<char> value, out System.Numerics.BigInteger result);
```

Tries to convert the representation of a number contained in the specified read-only character span, to its `BigInteger` equivalent, and returns a value that indicates whether the conversion succeeded.

Parameters:

- `value`: The representation of a number as a read-only span of characters.
- `result`: When this method returns, contains the `BigInteger` equivalent to the number that is contained in `value`, or zero (0) if the conversion fails. The conversion fails if the `value` parameter is an empty character span or is not of the correct format. This parameter is passed uninitialized.

Returns: `true` if `value` was converted successfully; otherwise, `false`.

To be added.

## BigInteger.TryParse(String, BigInteger) method

```csharp
public static bool TryParse (string? value, out System.Numerics.BigInteger result);
```

Tries to convert the string representation of a number to its `BigInteger` equivalent, and returns a value that indicates whether the conversion succeeded.

Parameters:

- `value`: The string representation of a number.
- `result`: When this method returns, contains the `BigInteger` equivalent to the number that is contained in `value`, or zero (0) if the conversion fails. The conversion fails if the `value` parameter is `null` or is not of the correct format. This parameter is passed uninitialized.

Returns: `true` if `value` was converted successfully; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `value` is `null`.

#### Remarks
The `TryParse` method is like the `Parse` method, except that it does not throw an exception if the conversion fails. This method eliminates the need to use exception handling to test for a `FormatException` if `value` is invalid and cannot be successfully parsed.

The `value` parameter should be the string representation of a decimal number in the following form:

*ws**digits*[*ws*]

Elements in square brackets ([ and ]) are optional. The following table describes each element.

|Element|Description|
|-------------|-----------------|
|*ws*|Optional white space.|
|*sign*|An optional sign. Valid sign characters are determined by the `NumberFormatInfo.NegativeSign` and `NumberFormatInfo.PositiveSign` properties of the current culture.|
|*digits*|A sequence of decimal digits ranging from 0 to 9.|

> **Note:**
>  The string specified by the `value` parameter cannot contain any group separators or decimal separator, and it cannot have a decimal portion.

The `value` parameter is interpreted by using the `Integer` style. In addition to the decimal digits, only leading and trailing spaces with a leading sign are allowed. To explicitly define the style elements with the culture-specific formatting information that can be present in `value`, call the `TryParse` method.

The `value` parameter is parsed by using the formatting information in a `NumberFormatInfo` object for the current culture. For more information, see `NumberFormatInfo.CurrentInfo`.

This overload interprets all digits in the `value` parameter as decimal digits. To parse the string representation of a hexadecimal number, call the `TryParse` overload instead.

#### Examples
The following example uses the `TryParse` method to instantiate two `BigInteger` objects. If the conversions succeed, it multiplies each object by another number and then calls the `BigInteger.Compare` method to determine the relationship between the two objects.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/TryParse/System.Numeric.BigInteger.TryParse.cs._

## BigInteger.TryParse(Byte>, IFormatProvider, BigInteger) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> utf8Text, IFormatProvider? provider, out System.Numerics.BigInteger result);
```

To be added.

Parameters:

- `utf8Text`: To be added.
- `provider`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## BigInteger.TryParse(Char>, IFormatProvider, BigInteger) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, IFormatProvider? provider, out System.Numerics.BigInteger result);
```

Tries to parse a span of characters into a value.

Parameters:

- `s`: The span of characters to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: When this method returns, contains the result of successfully parsing `s`, or an undefined value on failure.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

To be added.

## BigInteger.TryParse(String, IFormatProvider, BigInteger) method

```csharp
public static bool TryParse (string? s, IFormatProvider? provider, out System.Numerics.BigInteger result);
```

Tries to parse a string into a value.

Parameters:

- `s`: The string to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: When this method returns, contains the result of successfully parsing `s` or an undefined value on failure.

Returns: `true` if  `s` was successfully parsed; otherwise, `false`.

To be added.

## BigInteger.TryParse(Byte>, NumberStyles, IFormatProvider, BigInteger) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> utf8Text, System.Globalization.NumberStyles style, IFormatProvider? provider, out System.Numerics.BigInteger result);
```

To be added.

Parameters:

- `utf8Text`: To be added.
- `style`: To be added.
- `provider`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## BigInteger.TryParse(Char>, NumberStyles, IFormatProvider, BigInteger) method

```csharp
public static bool TryParse (ReadOnlySpan<char> value, System.Globalization.NumberStyles style, IFormatProvider? provider, out System.Numerics.BigInteger result);
```

Tries to convert the string representation of a number to its `BigInteger` equivalent, and returns a value that indicates whether the conversion succeeded.

Parameters:

- `value`: The representation of a number as a read-only span of characters.
- `style`: A bitwise combination of enumeration values that indicates the style elements that can be present in `value`. A typical value to specify is `NumberStyles.Integer`.
- `provider`: An object that supplies culture-specific formatting information about `value`.
- `result`: When this method returns, contains the `BigInteger` equivalent to the number that is contained in `value`, or `BigInteger.Zero` if the conversion failed. The conversion fails if the `value` parameter is an empty character span or is not in a format that is compliant with `style`. This parameter is passed uninitialized.

Returns: `true` if `value` was converted successfully; otherwise, `false`.

Exceptions:

- `ArgumentException`: `style` is not a `NumberStyles` value.

-or-

`style` includes the `NumberStyles.AllowHexSpecifier` or `NumberStyles.HexNumber` flag along with another value.

#### Remarks

This overload is like the `Parse` method, except that it does not throw an exception if the conversion fails. This method eliminates the need to use exception handling to test for a `FormatException` if `value` is invalid and cannot be parsed successfully.

The `style` parameter defines the style elements (such as white space or a positive or negative sign) that are allowed in the `value` parameter for the parse operation to succeed. It must be a combination of bit flags from the `NumberStyles` enumeration. Depending on the value of `style`, the `value` parameter may include the following elements:

*ws**sign**digits*.*fractional_digits**exponential_digits*][*ws*]

If the `style` parameter includes `AllowHexSpecifier`, the `value` parameter may include the following elements:

[*ws*]*hexdigits*[*ws*]

Elements in square brackets ([ and ]) are optional. The following table describes each element.

|Element|Description|
|-------------|-----------------|
|*ws*|Optional white space. White space can appear at the start of `value` if `style` includes the `AllowLeadingWhite` flag, or at the end of `value` if `style` includes the `AllowTrailingWhite` flag.|
|*$*|A culture-specific currency symbol. Its position in `value` is defined by the `CurrencyPositivePattern` property of the `NumberFormatInfo` object returned by the `IFormatProvider.GetFormat` method of the `provider` parameter. The currency symbol can appear in `value` if `style` includes the `AllowCurrencySymbol` flag.|
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

If the `AllowHexSpecifier` flag is used, `value` must be a hexadecimal value. The only other flags that can be present in `style` are `AllowLeadingWhite` and `AllowTrailingWhite`. (The `NumberStyles` enumeration has a composite style, `HexNumber`, that includes both white-space flags.)

The `provider` parameter is an `IFormatProvider` implementation. Its `IFormatProvider.GetFormat` method returns a `NumberFormatInfo` object that provides culture-specific information about the format of `value`. The `provider` parameter can be any one of the following:

- A `CultureInfo` object that represents the culture that supplies formatting information. Its `CultureInfo.GetFormat` method returns the `NumberFormatInfo` object that provides numeric formatting information for that culture.

- A `NumberFormatInfo` object that provides numeric formatting information. (Its implementation of `NumberFormatInfo.GetFormat` just returns itself.)

- A custom object that implements `IFormatProvider`. Its `IFormatProvider.GetFormat` method instantiates and returns the `NumberFormatInfo` object that provides formatting information.

If `provider` is `null`, the `NumberFormatInfo` object for the current culture is used.
