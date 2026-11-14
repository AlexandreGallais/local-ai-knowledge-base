---
title: "BigInteger struct (part 13 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/BigInteger.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BigInteger struct (part 13 of 18)

## BigInteger.Parse(Char>, NumberStyles, IFormatProvider) method

```csharp
public static System.Numerics.BigInteger Parse (ReadOnlySpan<char> value, System.Globalization.NumberStyles style = System.Globalization.NumberStyles.Integer, IFormatProvider? provider = default);
```

Converts the representation of a number, contained in the specified read-only span of characters, in a specified style to its `BigInteger` equivalent.

Parameters:

- `value`: A read-only span of characters that contains the number to convert.
- `style`: A bitwise combination of the enumeration values that specify the permitted format of `value`.
- `provider`: An object that provides culture-specific formatting information about `value`.

Returns: A value that is equivalent to the number specified in the `value` parameter.

Exceptions:

- `ArgumentException`: `style` is not a `NumberStyles` value.

-or-

`style` includes the `NumberStyles.AllowHexSpecifier` or `NumberStyles.HexNumber` flag along with another value.
- `ArgumentNullException`: `value` is `null`.
- `FormatException`: `value` does not comply with the input pattern specified by `style`.

#### Remarks

The `style` parameter defines the style elements (such as white space, the positive or negative sign symbol, the group separator symbol, or the decimal point symbol) that are allowed in the `value` parameter for the parse operation to succeed. `styles` must be a combination of bit flags from the `NumberStyles` enumeration. The `style` parameter makes this method overload useful when `value` contains the representation of a hexadecimal value, when the number system (decimal or hexadecimal) represented by `value` is known only at run time, or when you want to disallow white space or a sign symbol in `value`.

Depending on the value of `style`, the `value` parameter may include the following elements:

*ws**sign**digits**.fractional_digits**exponential_digits*][*ws*]

If `style` includes `AllowHexSpecifier`, the `value` parameter may include the following elements:

[*ws*]*hexdigits*[*ws*]

Elements in square brackets ([ and ]) are optional. The following table describes each element.

|Element|Description|
|-------------|-----------------|
|*ws*|Optional white space. White space can appear at the start of `value` if `style` includes the `AllowLeadingWhite` flag, and it can appear at the end of `value` if `style` includes the `AllowTrailingWhite` flag.|
|*$*|A culture-specific currency symbol. Its position in `value` is defined by the `NumberFormatInfo.CurrencyNegativePattern` and `NumberFormatInfo.CurrencyPositivePattern` properties of the culture indicated by the `provider` parameter. The current culture's currency symbol can appear in `value` if `style` includes the `AllowCurrencySymbol` flag.|
|*sign*|An optional sign. The sign can appear at the start of `value` if `style` includes the `AllowLeadingSign` flag, and it can appear at the end of `value` if `style` includes the `AllowTrailingSign` flag. Parentheses can be used in `value` to indicate a negative value if `style` includes the `AllowParentheses` flag.|
|*digits* *fractional_digits* *exponential_digits*|A sequence of digits from 0 through 9. For *fractional_digits*, only the digit 0 is valid.|
|*,*|A culture-specific group separator symbol. The group separator symbol of the culture specified by `provider` can appear in `value` if `style` includes the `AllowThousands` flag.|
|*.*|A culture-specific decimal point symbol. The decimal point symbol of the culture designated by `provider` can appear in `value` if `style` includes the `AllowDecimalPoint` flag. Only the digit 0 can appear as a fractional digit for the parse operation to succeed; if *fractional_digits* includes any other digit, a `FormatException` is thrown.|
|E|The "e" or "E" character, which indicates that the value is represented in exponential (scientific) notation. The `value` parameter can represent a number in exponential notation if `style` includes the `AllowExponent` flag.|
|*hexdigits*|A sequence of hexadecimal digits from 0 through f, or 0 through F.|

> **Note:**
> Any terminating NUL (U+0000) characters in `s` are ignored by the parsing operation, regardless of the value of the `style` argument.

A `value` with digits only (which corresponds to the `None` style) always parses successfully. Most of the remaining `NumberStyles` members control elements that may be present, but are not required to be present, in `value`. The following table indicates how individual `NumberStyles` members affect the elements that may be present in `value`.

|NumberStyles value|Elements permitted in value in addition to digits|
|------------------------|-------------------------------------------------------|
|`None`|The *digits* element only.|
|`AllowDecimalPoint`|The decimal point (.) and *fractional-digits* elements.|
|`AllowExponent`|The "e" or "E" character, which indicates exponential notation. along with *exponential_digits*.|
|`AllowLeadingWhite`|The *ws* element at the start of `value`.|
|`AllowTrailingWhite`|The *ws* element at the end of `value`.|
|`AllowLeadingSign`|The *sign* element at the start of `value`.|
|`AllowTrailingSign`|The *sign* element at the end of `value`.|
|`AllowParentheses`|The *sign* element in the form of parentheses enclosing the numeric value.|
|`AllowThousands`|The group separator (,) element.|
|`AllowCurrencySymbol`|The currency ($) element.|
|`Currency`|All elements. However, `value` cannot represent a hexadecimal number or a number in exponential notation.|
|`Float`|The *ws* element at the start or end of `value`, *sign* at the start of `value`, and the decimal point (.) symbol. The `value` parameter can also use exponential notation.|
|`Number`|The `ws`, `sign`, group separator (,), and decimal point (.) elements.|
|`Any`|All elements. However, `value` cannot represent a hexadecimal number.|

Unlike the other `NumberStyles` values, which allow for but do not require the presence of particular style elements in `value`, the `AllowHexSpecifier` style value means that the individual numeric characters in `value` are always interpreted as hexadecimal characters. Valid hexadecimal characters are 0-9, A-F, and a-f. The only other flags that can be combined with the `style` parameter are `AllowLeadingWhite` and `AllowTrailingWhite`. (The `NumberStyles` enumeration includes a composite number style, `HexNumber`, that includes both white-space flags.)

The `provider` parameter is an `IFormatProvider` implementation. Its `IFormatProvider.GetFormat` method returns a `NumberFormatInfo` object that provides culture-specific information about the format of `value`. Typically, `provider` can be any one of the following:

- A `CultureInfo` object that represents the culture that provides numeric formatting information. Its `CultureInfo.GetFormat` method returns the `NumberFormatInfo` object that provides numeric formatting information.

- A `NumberFormatInfo` object that provides formatting information. (Its implementation of `NumberFormatInfo.GetFormat` just returns itself.)

- A custom object that implements `IFormatProvider` and uses the `NumberFormatInfo.GetFormat` method to instantiate and return the `NumberFormatInfo` object that provides formatting information.

If `provider` is `null`, the `NumberFormatInfo` object for the current culture is used.
