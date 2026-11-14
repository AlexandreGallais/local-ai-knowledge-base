---
title: "UInt64 struct (part 2 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/UInt64.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UInt64 struct (part 2 of 8)

## UInt64.Parse(String) method

```csharp
public static ulong Parse (string s);
```

Converts the string representation of a number to its 64-bit unsigned integer equivalent.

Parameters:

- `s`: A string that represents the number to convert.

Returns: A 64-bit unsigned integer equivalent to the number contained in `s`.

Exceptions:

- `ArgumentNullException`: The `s` parameter is `null`.
- `FormatException`: The `s` parameter is not in the correct format.
- `OverflowException`: The `s` parameter represents a number less than <see cref="F:System.UInt64.MinValue">UInt64.MinValue</see> or greater than <see cref="F:System.UInt64.MaxValue">UInt64.MaxValue</see>.

#### Remarks
The `s` parameter should be the string representation of a number in the following form.

*ws**digits*[*ws*]

Elements in square brackets ([ and ]) are optional. The following table describes each element.

|Element|Description|
|-------------|-----------------|
|*ws*|Optional white space.|
|*sign*|An optional sign. Valid sign characters are determined by the `NumberFormatInfo.NegativeSign` and `NumberFormatInfo.PositiveSign` properties of the current culture. However, the negative sign symbol can be used only with zero; otherwise, the method throws an `OverflowException`.|
|*digits*|A sequence of digits ranging from 0 to 9. Any leading zeros are ignored.|

> **Note:**
>  The string specified by the `s` parameter is interpreted by using the `Integer` style. It cannot contain any group separators or decimal separator, and it cannot have a decimal portion.

The `s` parameter is parsed by using the formatting information in a `NumberFormatInfo` object that is initialized for the current system culture. For more information, see `NumberFormatInfo.CurrentInfo`. To parse a string by using the formatting information of a specific culture, use the `Parse` method.

#### Examples
The following example uses the `UInt64.Parse` method to parse an array of string values.

_Code sample not included: ~/snippets/csharp/System/UInt64/Parse/parse1.cs._

## UInt64.Parse(Byte>, IFormatProvider) method

```csharp
public static ulong Parse (ReadOnlySpan<byte> utf8Text, IFormatProvider? provider);
```

Parses a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.

Returns: The result of parsing `utf8Text`.

To be added.

## UInt64.Parse(Char>, IFormatProvider) method

```csharp
public static ulong Parse (ReadOnlySpan<char> s, IFormatProvider? provider);
```

Parses a span of characters into a value.

Parameters:

- `s`: The span of characters to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.

Returns: The result of parsing `s`.

To be added.

## UInt64.Parse(String, NumberStyles) method

```csharp
public static ulong Parse (string s, System.Globalization.NumberStyles style);
```

Converts the string representation of a number in a specified style to its 64-bit unsigned integer equivalent.

Parameters:

- `s`: A string that represents the number to convert. The string is interpreted by using the style specified by the `style` parameter.
- `style`: A bitwise combination of the enumeration values that specifies the permitted format of `s`. A typical value to specify is `NumberStyles.Integer`.

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
The `style` parameter defines the style elements (such as white space, the positive or negative sign symbol, the group separator symbol, or the decimal point symbol) that are allowed in the `s` parameter for the parse operation to succeed. `style` must be a combination of bit flags from the `NumberStyles` enumeration. The `style` parameter makes this method overload useful when `s` contains the string representation of a hexadecimal value, when the number system (decimal or hexadecimal) represented by `s` is known only at run time, or when you want to disallow white space or a sign symbol in `s`.

Depending on the value of `style`, the `s` parameter may include the following elements:

*ws**sign**digits*.*fractional_digits**exponential_digits*][*ws*]

Elements in square brackets ([ and ]) are optional. If `style` includes `AllowHexSpecifier`, the `s` parameter may contain the following elements:

[*ws*]*hexdigits*[*ws*]

The following table describes each element.

|Element|Description|
|-------------|-----------------|
|*ws*|Optional white space. White space can appear at the start of `s` if `style` includes the `AllowLeadingWhite` flag, and it can appear at the end of `s` if `style` includes the `AllowTrailingWhite` flag.|
|*$*|A culture-specific currency symbol. Its position in the string is defined by the `NumberFormatInfo.CurrencyNegativePattern` and `NumberFormatInfo.CurrencyPositivePattern` properties of the current culture. The current culture's currency symbol can appear in `s` if `style` includes the `AllowCurrencySymbol` flag.|
|*sign*|An optional sign. The sign can appear at the start of `s` if `style` includes the `AllowLeadingSign` flag, and it can appear at the end of `s` if `style` includes the `AllowTrailingSign` flag. Parentheses can be used in `s` to indicate a negative value if `style` includes the `AllowParentheses` flag. However, the negative sign symbol can be used only with zero; otherwise, the method throws an `OverflowException`.|
|*digits* *fractional_digits* *exponential_digits*|A sequence of digits from 0 through 9. For *fractional_digits*, only the digit 0 is valid.|
|*,*|A culture-specific group separator symbol. The current culture's group separator can appear in `s` if `style` includes the `AllowThousands` flag.|
|*.*|A culture-specific decimal point symbol. The current culture's decimal point symbol can appear in `s` if `style` includes the `AllowDecimalPoint` flag. Only the digit 0 can appear as a fractional digit for the parse operation to succeed; if *fractional_digits* includes any other digit, a `FormatException` is thrown.|
|E|The "e" or "E" character, which indicates that the value is represented in exponential (scientific) notation. The `s` parameter can represent a number in exponential notation if `style` includes the `AllowExponent` flag.|
|*hexdigits*|A sequence of hexadecimal digits from 0 through f, or 0 through F.|

> **Note:**
> Any terminating NUL (U+0000) characters in `s` are ignored by the parsing operation, regardless of the value of the `style` argument.

A string with digits only (which corresponds to the `None` style) always parses successfully if it is in the range of the `UInt64` type. Most of the remaining `NumberStyles` members control elements that may be present, but are not required to be present, in the input string. The following table indicates how individual `NumberStyles` members affect the elements that may be present in `s`.

|`NumberStyles` value|Elements permitted in `s` in addition to digits|
|--------------------------|-----------------------------------------------------|
|`None`|The *digits* element only.|
|`AllowDecimalPoint`|The decimal point (.) and *fractional-digits* elements.|
|`AllowExponent`|The "e" or "E" character, which indicates exponential notation, along with *exponential_digits*.|
|`AllowLeadingWhite`|The *ws* element at the start of `s`.|
|`AllowTrailingWhite`|The *ws* element at the end of `s`.|
|`AllowLeadingSign`|The *sign* element at the start of `s`.|
|`AllowTrailingSign`|The *sign* element at the end of `s`.|
|`AllowParentheses`|The *sign* element in the form of parentheses enclosing the numeric value.|
|`AllowThousands`|The group separator (,) element.|
|`AllowCurrencySymbol`|The currency ($) element.|
|`Currency`|All elements. However, `s` cannot represent a hexadecimal number or a number in exponential notation.|
|`Float`|The *ws* element at the start or end of `s`, *sign* at the start of `s`, and the decimal point (*.*) symbol. The `s` parameter can also use exponential notation.|
|`Number`|The `ws`, `sign`, group separator (*,*), and decimal point (*.*) elements.|
|`Any`|All elements. However, `s` cannot represent a hexadecimal number.|

Unlike the other `NumberStyles` values, which allow for, but do not require, the presence of particular style elements in `s`, the `AllowHexSpecifier` style value means that the individual numeric characters in `s` are always interpreted as hexadecimal characters. Valid hexadecimal characters are 0-9, A-F, and a-f. A prefix such as "0x" is not supported and causes the parse operation to fail. The only other flags that can be combined with the `style` parameter are `AllowLeadingWhite` and `AllowTrailingWhite`. (The `NumberStyles` enumeration includes a composite number style, `HexNumber`, that includes both white-space flags.)

> **Note:**
>  If `s` is the string representation of a hexadecimal number, it cannot be preceded by any decoration (such as `0x` or `&h`) that differentiates it as a hexadecimal number. This causes the conversion to fail.

The `s` parameter is parsed by using the formatting information in a `NumberFormatInfo` object that is initialized for the current system culture. To specify the culture whose formatting information is used for the parse operation, call the `Parse` overload.

#### Examples
The following example tries to parse each element in a string array by using a number of `NumberStyles` values.

_Code sample not included: ~/snippets/csharp/System/UInt64/Parse/parseex2.cs._

## UInt64.Parse(String, IFormatProvider) method

```csharp
public static ulong Parse (string s, IFormatProvider? provider);
```

Converts the string representation of a number in a specified culture-specific format to its 64-bit unsigned integer equivalent.

Parameters:

- `s`: A string that represents the number to convert.
- `provider`: An object that supplies culture-specific formatting information about `s`.

Returns: A 64-bit unsigned integer equivalent to the number specified in `s`.

Exceptions:

- `ArgumentNullException`: The `s` parameter is `null`.
- `FormatException`: The `s` parameter is not in the correct style.
- `OverflowException`: The `s` parameter represents a number less than <see cref="F:System.UInt64.MinValue">UInt64.MinValue</see> or greater than <see cref="F:System.UInt64.MaxValue">UInt64.MaxValue</see>.

#### Remarks
This overload of the `Parse` method is typically used to convert text that can be formatted in a variety of ways to a `UInt64` value. For example, it can be used to convert the text entered by a user into an HTML text box to a numeric value.

The `s` parameter contains a number of the form:

wsdigits[ws]

Items in square brackets ([ and ]) are optional. The following table describes each element.

|Element|Description|
|-------------|-----------------|
|*ws*|Optional white space.|
|*sign*|An optional positive sign, or a negative sign if `s` represents the value zero.|
|*digits*|A sequence of digits ranging from 0 to 9.|

The s parameter is interpreted using the `Integer` style. In addition to the unsigned integer value's decimal digits, only leading and trailing spaces along with a leading sign is allowed. (If the negative sign is present, `s` must represent a value of zero, or the method throws an `OverflowException`.) To explicitly define the style elements together with the culture-specific formatting information that can be present in `s`, use the `Parse` method.

The `provider` parameter is an `IFormatProvider` implementation whose `IFormatProvider.GetFormat` method returns a `NumberFormatInfo` object that provides culture-specific information about the format of `s`. There are three ways to use the `provider` parameter to supply custom formatting information to the parse operation:

- You can pass the actual `NumberFormatInfo` object that provides formatting information. (Its implementation of `IFormatProvider.GetFormat` simply returns itself.)

- You can pass a `CultureInfo` object that specifies the culture whose formatting is to be used. Its `NumberFormat` property provides formatting information.

- You can pass a custom `IFormatProvider` implementation. Its `IFormatProvider.GetFormat` method must instantiate and return the `NumberFormatInfo` object that provides formatting information.

If `provider` is `null`, the `NumberFormatInfo` for the current culture is used.

#### Examples
The following example is the button click event handler of a Web form. It uses the array returned by the `UserLanguages` property to determine the user's locale. It then instantiates a `CultureInfo` object that corresponds to that locale. The `NumberFormatInfo` object that belongs to that `CultureInfo` object is then passed to the `Parse` method to convert the user's input to a `UInt64` value.

_Code sample not included: ~/snippets/csharp/System/Decimal/Parse/Default.aspx.cs._

## UInt64.Parse(Byte>, NumberStyles, IFormatProvider) method

```csharp
public static ulong Parse (ReadOnlySpan<byte> utf8Text, System.Globalization.NumberStyles style = System.Globalization.NumberStyles.Integer, IFormatProvider? provider = default);
```

Parses a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `style`: A bitwise combination of number styles that can be present in `utf8Text`.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.

Returns: The result of parsing `utf8Text`.

To be added.
