---
title: "BigInteger struct (part 12 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/BigInteger.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BigInteger struct (part 12 of 18)

## BigInteger.Parse(String, NumberStyles) method

```csharp
public static System.Numerics.BigInteger Parse (string value, System.Globalization.NumberStyles style);
```

Converts the string representation of a number in a specified style to its `BigInteger` equivalent.

Parameters:

- `value`: A string that contains a number to convert.
- `style`: A bitwise combination of the enumeration values that specify the permitted format of `value`.

Returns: A value that is equivalent to the number specified in the `value` parameter.

Exceptions:

- `ArgumentException`: `style` is not a `NumberStyles` value.

-or-

`style` includes the `NumberStyles.AllowHexSpecifier` or `NumberStyles.HexNumber` flag along with another value.
- `ArgumentNullException`: `value` is `null`.
- `FormatException`: `value` does not comply with the input pattern specified by `NumberStyles`.

#### Remarks
The `style` parameter defines the style elements (such as white space, the positive or negative sign symbol, the group separator symbol, or the decimal point symbol) that are allowed in the `value` parameter for the parse operation to succeed. `styles` must be a combination of bit flags from the `NumberStyles` enumeration. The `style` parameter makes this method overload useful when `value` contains the string representation of a hexadecimal value, when the number system (decimal or hexadecimal) represented by `value` is known only at run time, or when you want to disallow white space or a sign symbol in `value`.

Depending on the value of `style`, the `value` parameter may include the following elements:

*ws**sign**digits*.*fractional_digits**exponential_digits*][*ws*]

If `style` includes `AllowHexSpecifier`, the `value` parameter may contain the following elements:

[*ws*]*hexdigits*[*ws*]

Elements in square brackets ([ and ]) are optional. The following table describes each element.

|Element|Description|
|-------------|-----------------|
|*ws*|Optional white space. White space can appear at the start of `value` if `style` includes the `AllowLeadingWhite` flag, and it can appear at the end of `value` if `style` includes the `AllowTrailingWhite` flag.|
|*$*|A culture-specific currency symbol. Its position in the string is defined by the `NumberFormatInfo.CurrencyNegativePattern` and `NumberFormatInfo.CurrencyPositivePattern` properties of the current culture. The current culture's currency symbol can appear in `value` if `style` includes the `AllowCurrencySymbol` flag.|
|*sign*|An optional sign. The sign can appear at the start of `value` if `style` includes the `AllowLeadingSign` flag, and it can appear at the end of `value` if `style` includes the `AllowTrailingSign` flag. Parentheses can be used in `value` to indicate a negative value if `style` includes the `AllowParentheses` flag.|
|*digits* *fractional_digits* *exponential_digits*|A sequence of digits from 0 through 9. For *fractional_digits*, only the digit 0 is valid.|
|*,*|A culture-specific group separator symbol. The current culture's group separator can appear in `value` if `style` includes the `AllowThousands` flag.|
|*.*|A culture-specific decimal point symbol. The current culture's decimal point symbol can appear in `value` if `style` includes the `AllowDecimalPoint` flag. Only the digit 0 can appear as a fractional digit for the parse operation to succeed; if *fractional_digits* includes any other digit, a `FormatException` is thrown.|
|E|The "e" or "E" character, which indicates that the value is represented in exponential (scientific) notation. The `value` parameter can represent a number in exponential notation if `style` includes the `AllowExponent` flag.|
|*hexdigits*|A sequence of hexadecimal digits from 0 through f, or 0 through F.|

> **Note:**
> Any terminating NUL (U+0000) characters in `s` are ignored by the parsing operation, regardless of the value of the `style` argument.

A string with digits only (which corresponds to the `None` style) always parses successfully. Most of the remaining `NumberStyles` members control elements that may be present, but are not required to be present, in the input string. The following table indicates how individual `NumberStyles` members affect the elements that may be present in `value`.

|`NumberStyles` value|Elements permitted in `value` in addition to digits|
|--------------------------|---------------------------------------------------------|
|`None`|The *digits* element only.|
|`AllowDecimalPoint`|The decimal point (.) and *fractional-digits* elements.|
|`AllowExponent`|The "e" or "E" character, which indicates exponential notation, along with *exponential_digits*.|
|`AllowLeadingWhite`|The *ws* element at the start of `value`.|
|`AllowTrailingWhite`|The *ws* element at the end of `value`.|
|`AllowLeadingSign`|The *sign* element at the start of `value`.|
|`AllowTrailingSign`|The *sign* element at the end of `value`.|
|`AllowParentheses`|The *sign* element in the form of parentheses enclosing the numeric value.|
|`AllowThousands`|The group separator (,) element.|
|`AllowCurrencySymbol`|The currency ($) element.|
|`Currency`|All elements. However, `value` cannot represent a hexadecimal number or a number in exponential notation.|
|`Float`|The *ws* element at the start or end of `value`, *sign* at the start of `value`, and the decimal point (*.*) symbol. The `value` parameter can also use exponential notation.|
|`Number`|The `ws`, `sign`, group separator (*,*), and decimal point (*.*) elements.|
|`Any`|All elements. However, `value` cannot represent a hexadecimal number.|

> **Important:**
>  If you use the `BigInteger.Parse` method to round-trip the string representation of a `BigInteger` value that was output by the `BigInteger.ToString` method, you should use the `ToString` method with the "R" format specifier to generate the string representation of the `BigInteger` value. Otherwise, the string representation of the `BigInteger` preserves only the 50 most significant digits of the original value, and data may be lost when you use the `BigInteger.Parse` method to restore the `BigInteger` value.

Unlike the other `NumberStyles` values, which allow for, but do not require, the presence of particular style elements in `value`, the `AllowHexSpecifier` style value means that the individual numeric characters in `value` are always interpreted as hexadecimal characters. Valid hexadecimal characters are 0-9, A-F, and a-f. The only other flags that can be combined with the `style` parameter are `AllowLeadingWhite` and `AllowTrailingWhite`. (The `NumberStyles` enumeration includes a composite number style, `HexNumber`, that includes both white-space flags.)

> **Note:**
>  If `value` is the string representation of a hexadecimal number, it cannot be preceded by any decoration (such as `0x` or `&h`) that differentiates it as a hexadecimal number. This causes the conversion to fail.

If `value` is a hexadecimal string, the `Parse` method interprets `value` as a negative number stored by using two's complement representation if its first two hexadecimal digits are greater than or equal to `0x80`. In other words, the method interprets the highest-order bit of the first byte in `value` as the sign bit. To make sure that a hexadecimal string is correctly interpreted as a positive number, the first digit in `value` must have a value of zero. For example, the method interprets `0x80` as a negative value, but it interprets either `0x080` or `0x0080` as a positive value. The following example illustrates the difference between hexadecimal strings that represent negative and positive values.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/Parse/ParseHex1.cs._

The `value` parameter is parsed by using the formatting information in a `NumberFormatInfo` object that is initialized for the current system culture. To specify the culture whose formatting information is used for the parse operation, call the `Parse` overload.

#### Examples
The following example illustrates calls to the `Parse` method with several possible values for the `style` parameter. It illustrates how to interpret a string as a hexadecimal value, and how to disallow spaces and sign symbols.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/Parse/System.Numeric.BigInteger.Parse.cs._

## BigInteger.Parse(String, IFormatProvider) method

```csharp
public static System.Numerics.BigInteger Parse (string value, IFormatProvider? provider);
```

Converts the string representation of a number in a specified culture-specific format to its `BigInteger` equivalent.

Parameters:

- `value`: A string that contains a number to convert.
- `provider`: An object that provides culture-specific formatting information about `value`.

Returns: A value that is equivalent to the number specified in the `value` parameter.

Exceptions:

- `ArgumentNullException`: `value` is `null`.
- `FormatException`: `value` is not in the correct format.

#### Remarks
The `value` parameter should be the string representation of a number in the following form:

*ws**digits*[*ws*]

Elements in square brackets ([ and ]) are optional. The following table describes each element.

|Element|Description|
|-------------|-----------------|
|*ws*|Optional white space.|
|*sign*|An optional sign. Valid sign characters are determined by the `NumberFormatInfo.NegativeSign` and `NumberFormatInfo.PositiveSign` properties of the `NumberFormatInfo` object that is returned by the `provider` object's `IFormatProvider.GetFormat` method.|
|*digits*|A sequence of digits ranging from 0 to 9. Any leading zeros are ignored.|

> **Note:**
>  The string specified by the `value` parameter is interpreted using the `Integer` style. It cannot contain any group separators or decimal separator, and it cannot have a decimal portion.

> **Important:**
>  If you use the `BigInteger.Parse` method to round-trip the string representation of a `BigInteger` value that was output by the `BigInteger.ToString` method, you should use the `ToString` method with the "R" format specifier to generate the string representation of the `BigInteger` value. Otherwise, the string representation of the `BigInteger` preserves only the 50 most significant digits of the original value, and data may be lost when you use the `BigInteger.Parse` method to restore the `BigInteger` value.

The `provider` parameter is an `IFormatProvider` implementation whose `IFormatProvider.GetFormat` method returns a `NumberFormatInfo` object that provides culture-specific formatting information. When the `Parse` method is invoked, it calls the `provider` parameter's `IFormatProvider.GetFormat` method and passes it a `Type` object that represents the `NumberFormatInfo` type. The `IFormatProvider.GetFormat` method then returns the `NumberFormatInfo` object that provides information about the format of the `value` parameter. There are three ways to use the `provider` parameter to supply custom formatting information to the parse operation:

- You can pass a `CultureInfo` object that represents the culture that supplies formatting information. Its `CultureInfo.GetFormat` method returns the `NumberFormatInfo` object that provides numeric formatting information for that culture.

- You can pass the actual `NumberFormatInfo` object that provides numeric formatting information. (Its implementation of `NumberFormatInfo.GetFormat` just returns itself.)

- You can pass a custom object that implements `IFormatProvider`. Its `IFormatProvider.GetFormat` method instantiates and returns the `NumberFormatInfo` object that provides formatting information.

If `provider` is `null`, the formatting of `value` is interpreted based on the `NumberFormatInfo` object of the current culture.

#### Examples
The following examples show two ways to define the tilde (~) as a negative sign for formatting `BigInteger` values. Note that to display the `BigInteger` values in the same format as the original strings, your code must call the `ToString` method and pass it the `NumberFormatInfo` object that provides formatting information.

The first example defines a class that implements `IFormatProvider` and uses the `IFormatProvider.GetFormat` method to return the `NumberFormatInfo` object that provides formatting information.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/Parse/System.Numeric.BigInteger.Parse.cs._

A `BigInteger` object can then be instantiated with the following code:

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/Parse/System.Numeric.BigInteger.Parse.cs._

The second example is more straightforward. It passes the `NumberFormatInfo` object that provides formatting information to the `provider` parameter.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/Parse/System.Numeric.BigInteger.Parse.cs._

## BigInteger.Parse(Byte>, NumberStyles, IFormatProvider) method

```csharp
public static System.Numerics.BigInteger Parse (ReadOnlySpan<byte> utf8Text, System.Globalization.NumberStyles style = System.Globalization.NumberStyles.Integer, IFormatProvider? provider = default);
```

To be added.

Parameters:

- `utf8Text`: To be added.
- `style`: To be added.
- `provider`: To be added.

Returns: To be added.

To be added.
