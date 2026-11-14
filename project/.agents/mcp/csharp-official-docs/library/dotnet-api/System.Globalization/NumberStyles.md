---
title: "NumberStyles enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/NumberStyles.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NumberStyles enum

Namespace: `System.Globalization`

```csharp
public enum NumberStyles
```

Determines the styles permitted in numeric string arguments that are passed to the `Parse` and `TryParse` methods of the integral and floating-point numeric types.

#### Remarks

The `NumberStyles` enumeration consists of two kinds of enumeration values that are used to parse the string representations of numeric values:

- Individual field flags, which define specific style elements (such as white space and group separators) that can be present in the parsed string.
- Composite number styles, which consist of multiple field flags that define the style elements that can be present in the parsed string.

Except for `AllowHexSpecifier`, the individual field flags in the `NumberStyles` enumeration define style elements that are used when parsing the string representation of a decimal number. `None` indicates that only digits can be present in the parsed string. The remaining individual field flags define style elements that may be, but do not have to be, present in the string representation of a decimal number for the parse operation to succeed. In contrast, the `AllowHexSpecifier` flag indicates that the string to be parsed is always interpreted as a hexadecimal value. The only individual field flags that can be used with `AllowHexSpecifier` are `AllowLeadingWhite` and `AllowTrailingWhite`. The `NumberStyles` enumeration includes a composite number style, `HexNumber`, that consists of all three flags.

The symbols (such as the currency symbol, the group separator, the decimal separator, and the positive and negative signs) that can appear in the string to be parsed are defined by the members of the `NumberFormatInfo` object that is passed either implicitly or explicitly to the `Parse` method. The members table in this topic provides a description of each individual flag and indicates its relationship to `NumberFormatInfo` properties.

The following table lists the composite number styles and indicates which individual field flags they include. A "1" in a cell indicates that the composite number style includes the individual number style in that row. A "0" indicates that the composite number style does not include the individual number style.

|                               | Any     | Currency | Float   | Integer | Number  | HexNumber | BinaryNumber |
|-------------------------------|---------|----------|---------|---------|---------|-----------|--------------|
| AllowBinarySpecifier (0x0400) | 0       | 0        | 0       | 0       | 0       | 0         | 1            |
| AllowHexSpecifier (0x0200)    | 0       | 0        | 0       | 0       | 0       | 1         | 0            |
| AllowCurrencySymbol (0x0100)  | 1       | 1        | 0       | 0       | 0       | 0         | 0            |
| AllowExponent (0x0080)        | 1       | 0        | 1       | 0       | 0       | 0         | 0            |
| AllowThousands (0x0040)       | 1       | 1        | 0       | 0       | 1       | 0         | 0            |
| AllowDecimalPoint (0x0020)    | 1       | 1        | 1       | 0       | 1       | 0         | 0            |
| AllowParentheses (0x0010)     | 1       | 1        | 0       | 0       | 0       | 0         | 0            |
| AllowTrailingSign (0x0008)    | 1       | 1        | 0       | 0       | 1       | 0         | 0            |
| AllowLeadingSign (0x0004)     | 1       | 1        | 1       | 1       | 1       | 0         | 0            |
| AllowTrailingWhite (0x0002)   | 1       | 1        | 1       | 1       | 1       | 1         | 1            |
| AllowLeadingWhite (0x0001)    | 1       | 1        | 1       | 1       | 1       | 1         | 1            |
|                               | (0x1ff) | (0x17f)  | (0x0a7) | (0x007) | (0x06f) | (0x203)   | (0x403)      |

#### Examples

This example shows how to parse a string into a 32-bit integer by using various `NumberStyles` flags.

_Code sample not included: ~/snippets/csharp/System.Globalization/NumberStyles/Overview/NumberStyles.cs._

## NumberStyles.AllowBinarySpecifier field

```csharp
AllowBinarySpecifier
```

Indicates that the numeric string represents a binary value. Valid binary values include the numeric digits 0 and 1. Strings that are parsed using this style do not employ a prefix; `0b` cannot be used. A string that is parsed with the `NumberStyles.AllowBinarySpecifier` style will always be interpreted as a binary value. The only flags that can be combined with `NumberStyles.AllowBinarySpecifier` are `NumberStyles.AllowLeadingWhite` and `NumberStyles.AllowTrailingWhite`. The `NumberStyles` enumeration includes a composite style, `NumberStyles.BinaryNumber`, that consists of these three flags.

## NumberStyles.AllowCurrencySymbol field

```csharp
AllowCurrencySymbol
```

Indicates that the numeric string can contain a currency symbol. Valid currency symbols are determined by the `NumberFormatInfo.CurrencySymbol` property.

## NumberStyles.AllowDecimalPoint field

```csharp
AllowDecimalPoint
```

Indicates that the numeric string can have a decimal point. If the `NumberStyles` value includes the `NumberStyles.AllowCurrencySymbol` flag and the parsed string includes a currency symbol, the decimal separator character is determined by the `NumberFormatInfo.CurrencyDecimalSeparator` property. Otherwise, the decimal separator character is determined by the `NumberFormatInfo.NumberDecimalSeparator` property.

## NumberStyles.AllowExponent field

```csharp
AllowExponent
```

Indicates that the numeric string can be in exponential notation. The `NumberStyles.AllowExponent` flag allows the parsed string to contain an exponent that begins with the "E" or "e" character and that is followed by an optional positive or negative sign and an integer. In other words, it successfully parses strings in the form *nnn*E*xx*, *nnn*E+*xx*, and *nnn*E-*xx*. It does not allow a decimal separator or sign in the significand or mantissa; to allow these elements in the string to be parsed, use the `NumberStyles.AllowDecimalPoint` and `NumberStyles.AllowLeadingSign` flags, or use a composite style that includes these individual flags.

## NumberStyles.AllowHexSpecifier field

```csharp
AllowHexSpecifier
```

Indicates that the numeric string represents a hexadecimal value. Valid hexadecimal values include the numeric digits 0-9 and the hexadecimal digits A-F and a-f. Strings that are parsed using this style cannot be prefixed with "0x" or "&h". A string that is parsed with the `NumberStyles.AllowHexSpecifier` style will always be interpreted as a hexadecimal value. The only flags that can be combined with `NumberStyles.AllowHexSpecifier` are `NumberStyles.AllowLeadingWhite` and `NumberStyles.AllowTrailingWhite`. The `NumberStyles` enumeration includes a composite style, `NumberStyles.HexNumber`, that consists of these three flags.

## NumberStyles.AllowLeadingSign field

```csharp
AllowLeadingSign
```

Indicates that the numeric string can have a leading sign. Valid leading sign characters are determined by the `NumberFormatInfo.PositiveSign` and `NumberFormatInfo.NegativeSign` properties.

## NumberStyles.AllowLeadingWhite field

```csharp
AllowLeadingWhite
```

Indicates that leading white-space characters can be present in the parsed string. Valid white-space characters have the Unicode values U+0009, U+000A, U+000B, U+000C, U+000D, and U+0020. Note that this is a subset of the characters for which the `Char.IsWhiteSpace` method returns `true`.

## NumberStyles.AllowParentheses field

```csharp
AllowParentheses
```

Indicates that the numeric string can have one pair of parentheses enclosing the number. The parentheses indicate that the string to be parsed represents a negative number.

## NumberStyles.AllowThousands field

```csharp
AllowThousands
```

Indicates that the numeric string can have group separators, such as symbols that separate hundreds from thousands. If the `NumberStyles` value includes the `NumberStyles.AllowCurrencySymbol` flag and the string to be parsed includes a currency symbol, the valid group separator character is determined by the `NumberFormatInfo.CurrencyGroupSeparator` property,  and the number of digits in each group is determined by the `NumberFormatInfo.CurrencyGroupSizes` property. Otherwise, the valid group separator character is determined by the `NumberFormatInfo.NumberGroupSeparator` property, and the number of digits in each group is determined by the `NumberFormatInfo.NumberGroupSizes` property.

## NumberStyles.AllowTrailingSign field

```csharp
AllowTrailingSign
```

Indicates that the numeric string can have a trailing sign. Valid trailing sign characters are determined by the `NumberFormatInfo.PositiveSign` and `NumberFormatInfo.NegativeSign` properties.

## NumberStyles.AllowTrailingWhite field

```csharp
AllowTrailingWhite
```

Indicates that trailing white-space characters can be present in the parsed string. Valid white-space characters have the Unicode values U+0009, U+000A, U+000B, U+000C, U+000D, and U+0020. Note that this is a subset of the characters for which the `Char.IsWhiteSpace` method returns `true`.

## NumberStyles.Any field

```csharp
Any
```

Indicates that all styles except `NumberStyles.AllowHexSpecifier` and `NumberStyles.AllowBinarySpecifier` are used. This is a composite number style.

## NumberStyles.BinaryNumber field

```csharp
BinaryNumber
```

Indicates that the `NumberStyles.AllowLeadingWhite`, `NumberStyles.AllowTrailingWhite`, and `NumberStyles.AllowBinarySpecifier` styles are used. This is a composite number style.

## NumberStyles.Currency field

```csharp
Currency
```

Indicates that all styles except `NumberStyles.AllowExponent` and `NumberStyles.AllowHexSpecifier` are used. This is a composite number style.

## NumberStyles.Float field

```csharp
Float
```

Indicates that the `NumberStyles.AllowLeadingWhite`, `NumberStyles.AllowTrailingWhite`, `NumberStyles.AllowLeadingSign`, `NumberStyles.AllowDecimalPoint`, and `NumberStyles.AllowExponent` styles are used. This is a composite number style.

## NumberStyles.HexFloat field

```csharp
HexFloat
```

To be added.

## NumberStyles.HexNumber field

```csharp
HexNumber
```

Indicates that the `NumberStyles.AllowLeadingWhite`, `NumberStyles.AllowTrailingWhite`, and `NumberStyles.AllowHexSpecifier` styles are used. This is a composite number style.

## NumberStyles.Integer field

```csharp
Integer
```

Indicates that the `NumberStyles.AllowLeadingWhite`, `NumberStyles.AllowTrailingWhite`, and `NumberStyles.AllowLeadingSign` styles are used. This is a composite number style.

## NumberStyles.None field

```csharp
None
```

Indicates that no style elements, such as leading or trailing white space, thousands separators, or a decimal separator, can be present in the parsed string. The string to be parsed must consist of integral decimal digits only.

## NumberStyles.Number field

```csharp
Number
```

Indicates that the `NumberStyles.AllowLeadingWhite`, `NumberStyles.AllowTrailingWhite`, `NumberStyles.AllowLeadingSign`, `NumberStyles.AllowTrailingSign`, `NumberStyles.AllowDecimalPoint`, and `NumberStyles.AllowThousands` styles are used. This is a composite number style.
