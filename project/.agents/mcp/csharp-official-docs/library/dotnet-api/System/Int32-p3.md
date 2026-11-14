---
title: "Int32 struct (part 3 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Int32.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Int32 struct (part 3 of 8)

## Int32.Parse(String, NumberStyles) method

```csharp
public static int Parse (string s, System.Globalization.NumberStyles style);
```

Converts the string representation of a number in a specified style to its 32-bit signed integer equivalent.

Parameters:

- `s`: A string containing a number to convert.
- `style`: A bitwise combination of the enumeration values that indicates the style elements that can be present in `s`. A typical value to specify is `NumberStyles.Integer`.

Returns: A 32-bit signed integer equivalent to the number specified in `s`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `ArgumentException`: `style` is not a `NumberStyles` value.

-or-

`style` is not a combination of `NumberStyles.AllowHexSpecifier` and `NumberStyles.HexNumber` values.
- `FormatException`: `s` is not in a format compliant with `style`.
- `OverflowException`: `s` represents a number less than <see cref="F:System.Int32.MinValue">Int32.MinValue</see> or greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

-or-

`s` includes non-zero, fractional digits.

#### Remarks
The `style` parameter defines the style elements (such as white space, the positive or negative sign symbol, or the thousands separator symbol) that are allowed in the `s` parameter for the parse operation to succeed. It must be a combination of bit flags from the `NumberStyles` enumeration. Depending on the value of `style`, the `s` parameter may include the following elements:

wssigndigits.fractional_digitsexponential_digits][ws]

Or, if `style` includes `AllowHexSpecifier`:

[ws]hexdigits[ws]

Items in square brackets ([ and ]) are optional. The following table describes each element.

|Element|Description|
|-------------|-----------------|
|*ws*|Optional white space. White space can appear at the beginning of `s` if `style` includes the `AllowLeadingWhite` flag, and it can appear at the end of `s` if `style` includes the `AllowTrailingWhite` flag.|
|*$*|A culture-specific currency symbol. Its position in the string is defined by the `NumberFormatInfo.CurrencyNegativePattern` and `NumberFormatInfo.CurrencyPositivePattern` properties of the current culture. The current culture's currency symbol can appear in `s` if `style` includes the `AllowCurrencySymbol` flag.|
|*sign*|An optional sign. The sign can appear at the beginning of `s` if `style` includes the `AllowLeadingSign` flag, and it can appear at the end of `s` if `style` includes the `AllowTrailingSign` flag. Parentheses can be used in `s` to indicate a negative value if `style` includes the `AllowParentheses` flag.|
|*digits* *fractional_digits* *exponential_digits*|A sequence of digits from 0 through 9. For *fractional_digits*, only the digit 0 is valid.|
|*,*|A culture-specific thousands separator symbol. The current culture's thousands separator can appear in `s` if `style` includes the `AllowThousands` flag.|
|*.*|A culture-specific decimal point symbol. The current culture's decimal point symbol can appear in `s` if `style` includes the `AllowDecimalPoint` flag. Only the digit 0 can appear as a fractional digit for the parse operation to succeed; if *fractional_digits* includes any other digit, an `OverflowException` is thrown.|
|*e*|The 'e' or 'E' character, which indicates that the value is represented in exponential notation. The `s` parameter can represent a number in exponential notation if `style` includes the `AllowExponent` flag.|
|*hexdigits*|A sequence of hexadecimal digits from 0 through f, or 0 through F.|

> **Note:**
> Any terminating NUL (U+0000) characters in `s` are ignored by the parsing operation, regardless of the value of the `style` argument.

A string with digits only (which corresponds to the `None` style) always parses successfull if it is in the range of the `Int32` type. Most of the remaining `NumberStyles` members control elements that may be but are not required to be present in the input string. The following table indicates how individual `NumberStyles` members affect the elements that may be present in `s`.

|NumberStyles value|Elements permitted in s in addition to digits|
|------------------------|---------------------------------------------------|
|`None`|The *digits* element only.|
|`AllowDecimalPoint`|The decimal point ( *.* ) and *fractional-digits* elements.|
|`AllowExponent`|The `s` parameter can also use exponential notation.|
|`AllowLeadingWhite`|The *ws* element at the beginning of `s`.|
|`AllowTrailingWhite`|The *ws* element at the end of `s`.|
|`AllowLeadingSign`|The *sign* element at the beginning of `s`.|
|`AllowTrailingSign`|The *sign* element at the end of `s`.|
|`AllowParentheses`|The *sign* element in the form of parentheses enclosing the numeric value.|
|`AllowThousands`|The thousands separator ( *,* ) element.|
|`AllowCurrencySymbol`|The *$* element.|
|`Currency`|All. The `s` parameter cannot represent a hexadecimal number or a number in exponential notation.|
|`Float`|The *ws* element at the beginning or end of `s`, *sign* at the beginning of `s`, and the decimal point ( *.* ) symbol. The `s` parameter can also use exponential notation.|
|`Number`|The `ws`, `sign`, thousands separator ( *,* ), and decimal point ( *.* ) elements.|
|`Any`|All styles, except `s` cannot represent a hexadecimal number.|

If the `AllowHexSpecifier` flag is used, `s` must be a hexadecimal value without a prefix. For example, "C9AF3" parses successfully, but "0xC9AF3" does not. The only other flags that can be combined with the `s` parameter it are `AllowLeadingWhite` and `AllowTrailingWhite`. (The `NumberStyles` enumeration includes a composite number style, `HexNumber`, that includes both white space flags.)

The `s` parameter is parsed using the formatting information in a `NumberFormatInfo` object that is initialized for the current system culture. To specify the culture whose formatting information is used for the parse operation, call the `Parse` overload.

#### Examples
The following example uses the `Parse` method to parse the string representations of several `Int32` values. The current culture for the example is en-US.

_Code sample not included: ~/snippets/csharp/System/Int32/Parse/Parse2.cs._

## Int32.Parse(String, IFormatProvider) method

```csharp
public static int Parse (string s, IFormatProvider? provider);
```

Converts the string representation of a number in a specified culture-specific format to its 32-bit signed integer equivalent.

Parameters:

- `s`: A string containing a number to convert.
- `provider`: An object that supplies culture-specific formatting information about `s`.

Returns: A 32-bit signed integer equivalent to the number specified in `s`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` is not of the correct format.
- `OverflowException`: `s` represents a number less than <see cref="F:System.Int32.MinValue">Int32.MinValue</see> or greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Remarks
This overload of the `Parse` method is typically used to convert text that can be formatted in a variety of ways to an `Int32` value. For example, it can be used to convert the text entered by a user into an HTML text box to a numeric value.

The `s` parameter contains a number of the form:

wsdigits[ws]

Items in square brackets ([ and ]) are optional. The following table describes each element.

|Element|Description|
|-------------|-----------------|
|*ws*|Optional white space.|
|*sign*|An optional sign.|
|*digits*|A sequence of digits ranging from 0 to 9.|

The `s` parameter is interpreted using the `Integer` style. In addition to decimal digits, only leading and trailing spaces together with a leading sign are allowed. To explicitly define the style elements that can be present in `s`, use the `Parse` method.

The `provider` parameter is an `IFormatProvider` implementation, such as a `NumberFormatInfo` or `CultureInfo` object. The `provider` parameter supplies culture-specific information about the format of `s`. If `provider` is `null`, the `NumberFormatInfo` object for the current culture is used.

#### Examples
The following example is the button click event handler of a Web form. It uses the array returned by the `UserLanguages` property to determine the user's locale. It then instantiates a `CultureInfo` object that corresponds to that locale. The `NumberFormatInfo` object that belongs to that `CultureInfo` object is then passed to the `Parse` method to convert the user's input to an `Int32` value.

_Code sample not included: ~/snippets/csharp/System/Decimal/Parse/Default.aspx.cs._

## Int32.Parse(Byte>, NumberStyles, IFormatProvider) method

```csharp
public static int Parse (ReadOnlySpan<byte> utf8Text, System.Globalization.NumberStyles style = System.Globalization.NumberStyles.Integer, IFormatProvider? provider = default);
```

Parses a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `style`: A bitwise combination of number styles that can be present in `utf8Text`.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.

Returns: The result of parsing `utf8Text`.

To be added.

## Int32.Parse(Char>, NumberStyles, IFormatProvider) method

```csharp
public static int Parse (ReadOnlySpan<char> s, System.Globalization.NumberStyles style = System.Globalization.NumberStyles.Integer, IFormatProvider? provider = default);
```

Converts the span representation of a number in a specified style and culture-specific format to its 32-bit signed integer equivalent.

Parameters:

- `s`: A span containing the characters representing the number to convert.
- `style`: A bitwise combination of enumeration values that indicates the style elements that can be present in `s`. A typical value to specify is `NumberStyles.Integer`.
- `provider`: An object that supplies culture-specific information about the format of `s`.

Returns: A 32-bit signed integer equivalent to the number specified in `s`.

To be added.
