---
title: "Char struct (part 5 of 9)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Char.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Char struct (part 5 of 9)

## Char.IsSurrogatePair(String, Int32) method

```csharp
public static bool IsSurrogatePair (string s, int index);
```

Indicates whether two adjacent `Char` objects at a specified position in a string form a surrogate pair.

Parameters:

- `s`: A string.
- `index`: The starting position of the pair of characters to evaluate within `s`.

Returns: `true` if the `s` parameter includes adjacent characters at positions `index` and `index` + 1, and the numeric value of the character at position `index` ranges from U+D800 through U+DBFF, and the numeric value of the character at position `index`+1 ranges from U+DC00 through U+DFFF; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `ArgumentOutOfRangeException`: `index` is not a position within `s`.

#### Remarks
Ordinarily, a single character is represented by a single 16-bit Unicode code unit. UTF-16 encoding also supports surrogate pairs, which allow a single abstract character to be represented by two 16-bit code units. The first code unit, whose value can range from U+D800 to U+DBFF, is the high surrogate. The second code unit, whose value can range from U+DC00 to U+DFFF, is the low surrogate. Individual surrogate code points have no interpretation of their own. For more information about surrogates and the Unicode Standard, see the Unicode home page.

## Char.IsSymbol(Char) method

```csharp
public static bool IsSymbol (char c);
```

Indicates whether the specified Unicode character is categorized as a symbol character.

Parameters:

- `c`: The Unicode character to evaluate.

Returns: `true` if `c` is a symbol character; otherwise, `false`.

#### Remarks
Valid symbols are members of the following categories in `UnicodeCategory`: `MathSymbol`, `CurrencySymbol`, `ModifierSymbol`, and `OtherSymbol`.

Symbols in the Unicode standard are a loosely defined set of characters that include the following:

- Currency symbols.

- Letterlike symbols, which include a set of mathematical alphanumeric symbols as well as symbols such as ℅, №, and ™.

- Number forms, such as subscripts and superscripts.

- Mathematical operators and arrows.

- Geometric symbols.

- Technical symbols.

- Braille patterns.

- Dingbats.

## Char.IsSymbol(String, Int32) method

```csharp
public static bool IsSymbol (string s, int index);
```

Indicates whether the character at the specified position in a specified string is categorized as a symbol character.

Parameters:

- `s`: A string.
- `index`: The position of the character to evaluate in `s`.

Returns: `true` if the character at position `index` in `s` is a symbol character; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than zero or greater than the last position in `s`.

#### Remarks
Character positions in a string are indexed starting from zero.

Valid symbols are members of the following categories in `UnicodeCategory`: `MathSymbol`, `CurrencySymbol`, `ModifierSymbol`, and `OtherSymbol`.

Symbols in the Unicode standard are a loosely defined set of characters that include the following:

- Currency symbols.

- Letterlike symbols, which include a set of mathematical alphanumeric symbols as well as symbols such as ℅, №, and ™.

- Number forms, such as subscripts and superscripts.

- Mathematical operators and arrows.

- Geometric symbols.

- Technical symbols.

- Braille patterns.

- Dingbats.

## Char.IsUpper(Char) method

```csharp
public static bool IsUpper (char c);
```

Indicates whether the specified Unicode character is categorized as an uppercase letter.

Parameters:

- `c`: The Unicode character to evaluate.

Returns: `true` if `c` is an uppercase letter; otherwise, `false`.

#### Remarks
Valid uppercase letters are members of the following category in `UnicodeCategory`: `UppercaseLetter`.

## Char.IsUpper(String, Int32) method

```csharp
public static bool IsUpper (string s, int index);
```

Indicates whether the character at the specified position in a specified string is categorized as an uppercase letter.

Parameters:

- `s`: A string.
- `index`: The position of the character to evaluate in `s`.

Returns: `true` if the character at position `index` in `s` is an uppercase letter; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than zero or greater than the last position in `s`.

#### Remarks
Character positions in a string are indexed starting from zero.

Valid uppercase letters are members of the following category in `UnicodeCategory`: `UppercaseLetter`.

## Char.IsWhiteSpace(Char) method

```csharp
public static bool IsWhiteSpace (char c);
```

Indicates whether the specified Unicode character is categorized as white space.

Parameters:

- `c`: The Unicode character to evaluate.

Returns: `true` if `c` is white space; otherwise, `false`.

#### Remarks
White space characters are the following Unicode characters:

- Members of the `SpaceSeparator` category, which includes the characters SPACE (U+0020), NO-BREAK SPACE (U+00A0), OGHAM SPACE MARK (U+1680), EN QUAD (U+2000), EM QUAD (U+2001), EN SPACE (U+2002), EM SPACE (U+2003), THREE-PER-EM SPACE (U+2004), FOUR-PER-EM SPACE (U+2005), SIX-PER-EM SPACE (U+2006), FIGURE SPACE (U+2007), PUNCTUATION SPACE (U+2008), THIN SPACE (U+2009), HAIR SPACE (U+200A), NARROW NO-BREAK SPACE (U+202F), MEDIUM MATHEMATICAL SPACE (U+205F), and IDEOGRAPHIC SPACE (U+3000).

- Members of the `LineSeparator` category, which consists solely of the LINE SEPARATOR character (U+2028).

- Members of the `ParagraphSeparator` category, which consists solely of the PARAGRAPH SEPARATOR character (U+2029).

- The characters CHARACTER TABULATION (U+0009), LINE FEED (U+000A), LINE TABULATION (U+000B), FORM FEED (U+000C), CARRIAGE RETURN (U+000D), and NEXT LINE (U+0085).

## Char.IsWhiteSpace(String, Int32) method

```csharp
public static bool IsWhiteSpace (string s, int index);
```

Indicates whether the character at the specified position in a specified string is categorized as white space.

Parameters:

- `s`: A string.
- `index`: The position of the character to evaluate in `s`.

Returns: `true` if the character at position `index` in `s` is white space; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than zero or greater than the last position in `s`.

#### Remarks
Character positions in a string are indexed starting from zero.

White space characters are the following Unicode characters:

- Members of the `SpaceSeparator` category, which includes the characters SPACE (U+0020), NO-BREAK SPACE (U+00A0), OGHAM SPACE MARK (U+1680), EN QUAD (U+2000), EM QUAD (U+2001), EN SPACE (U+2002), EM SPACE (U+2003), THREE-PER-EM SPACE (U+2004), FOUR-PER-EM SPACE (U+2005), SIX-PER-EM SPACE (U+2006), FIGURE SPACE (U+2007), PUNCTUATION SPACE (U+2008), THIN SPACE (U+2009), HAIR SPACE (U+200A), NARROW NO-BREAK SPACE (U+202F), MEDIUM MATHEMATICAL SPACE (U+205F), and IDEOGRAPHIC SPACE (U+3000).

- Members of the `LineSeparator` category, which consists solely of the LINE SEPARATOR character (U+2028).

- Members of the `ParagraphSeparator` category, which consists solely of the PARAGRAPH SEPARATOR character (U+2029).

- The characters CHARACTER TABULATION (U+0009), LINE FEED (U+000A), LINE TABULATION (U+000B), FORM FEED (U+000C), CARRIAGE RETURN (U+000D), and NEXT LINE (U+0085).

## Char.Parse(String) method

```csharp
public static char Parse (string s);
```

Converts the value of the specified string to its equivalent Unicode character.

Parameters:

- `s`: A string that contains a single character, or `null`.

Returns: A Unicode character equivalent to the sole character in `s`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: The length of `s` is not 1.

#### Examples
The following code example demonstrates `Char.Parse`.

_Code sample not included: ~/snippets/csharp/System/Char/Parse/parse.cs._

## Char.System.IConvertible.ToBoolean(IFormatProvider) method

```csharp
bool IConvertible.ToBoolean (IFormatProvider provider);
```

**Note** This conversion is not supported. Attempting to do so throws an `InvalidCastException`.

Parameters:

- `provider`: This parameter is ignored.

Returns: This conversion is not supported. No value is returned.

Exceptions:

- `InvalidCastException`: This conversion is not supported.

To be added.

## Char.System.IConvertible.ToByte(IFormatProvider) method

```csharp
byte IConvertible.ToByte (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToByte`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The converted value of the current `Char` object.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Char` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToByte` method instead.

## Char.System.IConvertible.ToChar(IFormatProvider) method

```csharp
char IConvertible.ToChar (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToChar`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The value of the current `Char` object unchanged.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Char` instance is cast to an `IConvertible` interface.

## Char.System.IConvertible.ToDateTime(IFormatProvider) method

```csharp
DateTime IConvertible.ToDateTime (IFormatProvider provider);
```

**Note** This conversion is not supported. Attempting to do so throws an `InvalidCastException`.

Parameters:

- `provider`: This parameter is ignored.

Returns: No value is returned.

Exceptions:

- `InvalidCastException`: This conversion is not supported.

To be added.

## Char.System.IConvertible.ToDecimal(IFormatProvider) method

```csharp
decimal IConvertible.ToDecimal (IFormatProvider provider);
```

**Note** This conversion is not supported. Attempting to do so throws an `InvalidCastException`.

Parameters:

- `provider`: This parameter is ignored.

Returns: No value is returned.

Exceptions:

- `InvalidCastException`: This conversion is not supported.

To be added.

## Char.System.IConvertible.ToDouble(IFormatProvider) method

```csharp
double IConvertible.ToDouble (IFormatProvider provider);
```

**Note** This conversion is not supported. Attempting to do so throws an `InvalidCastException`.

Parameters:

- `provider`: This parameter is ignored.

Returns: No value is returned.

Exceptions:

- `InvalidCastException`: This conversion is not supported.

To be added.

## Char.System.IConvertible.ToInt16(IFormatProvider) method

```csharp
short IConvertible.ToInt16 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToInt16`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The converted value of the current `Char` object.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Char` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToInt16` method instead.

## Char.System.IConvertible.ToInt32(IFormatProvider) method

```csharp
int IConvertible.ToInt32 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToInt32`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The converted value of the current `Char` object.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Char` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToInt32` method instead.

## Char.System.IConvertible.ToInt64(IFormatProvider) method

```csharp
long IConvertible.ToInt64 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToInt64`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The converted value of the current `Char` object.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Char` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToInt64` method instead.

## Char.System.IConvertible.ToSByte(IFormatProvider) method

```csharp
sbyte IConvertible.ToSByte (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToSByte`.

Parameters:

- `provider`: This parameter is ignored.

Returns: The converted value of the current `Char` object.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Char` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToSByte` method instead.

## Char.System.IConvertible.ToSingle(IFormatProvider) method

```csharp
float IConvertible.ToSingle (IFormatProvider provider);
```

**Note** This conversion is not supported. Attempting to do so throws an `InvalidCastException`.

Parameters:

- `provider`: This parameter is ignored.

Returns: No value is returned.

Exceptions:

- `InvalidCastException`: This conversion is not supported.

To be added.

## Char.System.IConvertible.ToType(Type, IFormatProvider) method

```csharp
object IConvertible.ToType (Type type, IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToType`.

Parameters:

- `type`: A `Type` object.
- `provider`: An `IFormatProvider` object.

Returns: An object of the specified type.

Exceptions:

- `ArgumentNullException`: `type` is `null`.
- `InvalidCastException`: The value of the current `Char` object cannot be converted to the type specified by the `type` parameter.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Char` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ChangeType` method instead.

## Char.System.IConvertible.ToUInt16(IFormatProvider) method

```csharp
ushort IConvertible.ToUInt16 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToUInt16`.

Parameters:

- `provider`: An `IFormatProvider` object. (Specify `null` because the `provider` parameter is ignored.)

Returns: The converted value of the current `Char` object.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Char` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToUInt16` method instead.
