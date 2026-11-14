---
title: "UnicodeCategory enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/UnicodeCategory.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UnicodeCategory enum

Namespace: `System.Globalization`

```csharp
public enum UnicodeCategory
```

Defines the Unicode category of a character.

#### Remarks
A member of the `UnicodeCategory` enumeration is returned by the `Char.GetUnicodeCategory` and `CharUnicodeInfo.GetUnicodeCategory` methods. The `UnicodeCategory` enumeration is also used to support `Char` methods, such as `IsUpper`. Such methods determine whether a specified character is a member of a particular Unicode general category. A Unicode general category defines the broad classification of a character, that is, designation as a type of letter, decimal digit, separator, mathematical symbol, punctuation, and so on.

This enumeration is based on The Unicode Standard, version 5.0. For more information, see the "UCD File Format" and "General Category Values" subtopics at the Unicode Character Database.

The Unicode Standard defines the following:

A surrogate pair is a coded character representation for a single abstract character that consists of a sequence of two code units, where the first unit of the pair is a high surrogate and the second is a low surrogate. A high surrogate is a Unicode code point in the range U+D800 through U+DBFF and a low surrogate is a Unicode code point in the range U+DC00 through U+DFFF.

A combining character sequence is a combination of a base character and one or more combining characters. A surrogate pair represents a base character or a combining character. A combining character is either spacing or nonspacing. A spacing combining character takes up a spacing position by itself when rendered, while a nonspacing combining character does not. Diacritics are an example of nonspacing combining characters.

A modifier letter is a free-standing spacing character that, like a combining character, indicates modifications of a preceding letter.

An enclosing mark is a nonspacing combining character that surrounds all previous characters up to and including a base character.

A format character is a character that is not normally rendered but that affects the layout of text or the operation of text processes.

The Unicode Standard defines several variations to some punctuation marks. For example, a hyphen can be one of several code values that represent a hyphen, such as U+002D (hyphen-minus) or U+00AD (soft hyphen) or U+2010 (hyphen) or U+2011 (nonbreaking hyphen). The same is true for dashes, space characters, and quotation marks.

The Unicode Standard also assigns codes to representations of decimal digits that are specific to a given script or language, for example, U+0030 (digit zero) and U+0660 (Arabic-Indic digit zero).

#### Examples
The following example displays the characters and their corresponding code points for characters in the UppercaseLetter category. You can modify the example to display the letters in any other category by replacing UppercaseLetter with  the category of interest to you in the assignment to the `category` variable. Note that the output for some categories can be extensive.

_Code sample not included: ~/snippets/csharp/System.Globalization/UnicodeCategory/Overview/Characters1.cs._

## UnicodeCategory.ClosePunctuation field

```csharp
ClosePunctuation
```

Closing character of one of the paired punctuation marks, such as parentheses, square brackets, and braces. Signified by the Unicode designation "Pe" (punctuation, close). The value is 21.

## UnicodeCategory.ConnectorPunctuation field

```csharp
ConnectorPunctuation
```

Connector punctuation character that connects two characters. Signified by the Unicode designation "Pc" (punctuation, connector). The value is 18.

## UnicodeCategory.Control field

```csharp
Control
```

Control code character, with a Unicode value of U+007F or in the range U+0000 through U+001F or U+0080 through U+009F. Signified by the Unicode designation "Cc" (other, control). The value is 14.

## UnicodeCategory.CurrencySymbol field

```csharp
CurrencySymbol
```

Currency symbol character. Signified by the Unicode designation "Sc" (symbol, currency). The value is 26.

## UnicodeCategory.DashPunctuation field

```csharp
DashPunctuation
```

Dash or hyphen character. Signified by the Unicode designation "Pd" (punctuation, dash). The value is 19.

## UnicodeCategory.DecimalDigitNumber field

```csharp
DecimalDigitNumber
```

Decimal digit character, that is, a character representing an integer in the range 0 through 9. Signified by the Unicode designation "Nd" (number, decimal digit). The value is 8.

## UnicodeCategory.EnclosingMark field

```csharp
EnclosingMark
```

Enclosing mark character, which is a nonspacing combining character that surrounds all previous characters up to and including a base character. Signified by the Unicode designation "Me" (mark, enclosing). The value is 7.

## UnicodeCategory.FinalQuotePunctuation field

```csharp
FinalQuotePunctuation
```

Closing or final quotation mark character. Signified by the Unicode designation "Pf" (punctuation, final quote). The value is 23.

## UnicodeCategory.Format field

```csharp
Format
```

Format character that affects the layout of text or the operation of text processes, but is not normally rendered. Signified by the Unicode designation "Cf" (other, format). The value is 15.

## UnicodeCategory.InitialQuotePunctuation field

```csharp
InitialQuotePunctuation
```

Opening or initial quotation mark character. Signified by the Unicode designation "Pi" (punctuation, initial quote). The value is 22.

## UnicodeCategory.LetterNumber field

```csharp
LetterNumber
```

Number represented by a letter, instead of a decimal digit, for example, the Roman numeral for five, which is "V". The indicator is signified by the Unicode designation "Nl" (number, letter). The value is 9.

## UnicodeCategory.LineSeparator field

```csharp
LineSeparator
```

Character that is used to separate lines of text. Signified by the Unicode designation "Zl" (separator, line). The value is 12.

## UnicodeCategory.LowercaseLetter field

```csharp
LowercaseLetter
```

Lowercase letter. Signified by the Unicode designation "Ll" (letter, lowercase). The value is 1.

## UnicodeCategory.MathSymbol field

```csharp
MathSymbol
```

Mathematical symbol character, such as "+" or "= ". Signified by the Unicode designation "Sm" (symbol, math). The value is 25.

## UnicodeCategory.ModifierLetter field

```csharp
ModifierLetter
```

Modifier letter character, which is free-standing spacing character that indicates modifications of a preceding letter. Signified by the Unicode designation "Lm" (letter, modifier). The value is 3.

## UnicodeCategory.ModifierSymbol field

```csharp
ModifierSymbol
```

Modifier symbol character, which indicates modifications of surrounding characters. For example, the fraction slash indicates that the number to the left is the numerator and the number to the right is the denominator. The indicator is signified by the Unicode designation "Sk" (symbol, modifier). The value is 27.

## UnicodeCategory.NonSpacingMark field

```csharp
NonSpacingMark
```

Nonspacing character that indicates modifications of a base character. Signified by the Unicode designation "Mn" (mark, nonspacing). The value is 5.

## UnicodeCategory.OpenPunctuation field

```csharp
OpenPunctuation
```

Opening character of one of the paired punctuation marks, such as parentheses, square brackets, and braces. Signified by the Unicode designation "Ps" (punctuation, open). The value is 20.

## UnicodeCategory.OtherLetter field

```csharp
OtherLetter
```

Letter that is not an uppercase letter, a lowercase letter, a titlecase letter, or a modifier letter. Signified by the Unicode designation "Lo" (letter, other). The value is 4.

## UnicodeCategory.OtherNotAssigned field

```csharp
OtherNotAssigned
```

Character that is not assigned to any Unicode category. Signified by the Unicode designation "Cn" (other, not assigned). The value is 29.

## UnicodeCategory.OtherNumber field

```csharp
OtherNumber
```

Number that is neither a decimal digit nor a letter number, for example, the fraction 1/2. The indicator is signified by the Unicode designation "No" (number, other). The value is 10.

## UnicodeCategory.OtherPunctuation field

```csharp
OtherPunctuation
```

Punctuation character that is not a connector, a dash, open punctuation, close punctuation, an initial quote, or a final quote. Signified by the Unicode designation "Po" (punctuation, other). The value is 24.

## UnicodeCategory.OtherSymbol field

```csharp
OtherSymbol
```

Symbol character that is not a mathematical symbol, a currency symbol or a modifier symbol. Signified by the Unicode designation "So" (symbol, other). The value is 28.

## UnicodeCategory.ParagraphSeparator field

```csharp
ParagraphSeparator
```

Character used to separate paragraphs. Signified by the Unicode designation "Zp" (separator, paragraph). The value is 13.

## UnicodeCategory.PrivateUse field

```csharp
PrivateUse
```

Private-use character, with a Unicode value in the range U+E000 through U+F8FF. Signified by the Unicode designation "Co" (other, private use). The value is 17.

## UnicodeCategory.SpaceSeparator field

```csharp
SpaceSeparator
```

Space character, which has no glyph but is not a control or format character. Signified by the Unicode designation "Zs" (separator, space). The value is 11.

## UnicodeCategory.SpacingCombiningMark field

```csharp
SpacingCombiningMark
```

Spacing character that indicates modifications of a base character and affects the width of the glyph for that base character. Signified by the Unicode designation "Mc" (mark, spacing combining). The value is 6.

## UnicodeCategory.Surrogate field

```csharp
Surrogate
```

High surrogate or a low surrogate character. Surrogate code values are in the range U+D800 through U+DFFF. Signified by the Unicode designation "Cs" (other, surrogate). The value is 16.

## UnicodeCategory.TitlecaseLetter field

```csharp
TitlecaseLetter
```

Titlecase letter. Signified by the Unicode designation "Lt" (letter, titlecase). The value is 2.

## UnicodeCategory.UppercaseLetter field

```csharp
UppercaseLetter
```

Uppercase letter. Signified by the Unicode designation "Lu" (letter, uppercase). The value is 0.
