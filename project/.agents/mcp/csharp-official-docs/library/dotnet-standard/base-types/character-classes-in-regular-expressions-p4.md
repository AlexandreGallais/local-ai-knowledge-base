---
title: "Character Classes in .NET Regular Expressions (part 4 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/character-classes-in-regular-expressions.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Character Classes in .NET Regular Expressions (part 4 of 4)

## Supported Unicode general categories

Unicode defines the general categories listed in the following table. For more information, see the "UCD File Format" and "General Category Values" subtopics at the Unicode Character Database, Sec. 5.7.1, Table 12.

|Category|Description|
|--------------|-----------------|
|`Lu`|Letter, Uppercase|
|`Ll`|Letter, Lowercase|
|`Lt`|Letter, Titlecase|
|`Lm`|Letter, Modifier|
|`Lo`|Letter, Other|
|`L`|All letter characters. This includes the `Lu`, `Ll`, `Lt`, `Lm`, and `Lo` characters.|
|`Mn`|Mark, Nonspacing|
|`Mc`|Mark, Spacing Combining|
|`Me`|Mark, Enclosing|
|`M`|All combining marks. This includes the `Mn`, `Mc`, and `Me` categories.|
|`Nd`|Number, Decimal Digit|
|`Nl`|Number, Letter|
|`No`|Number, Other|
|`N`|All numbers. This includes the `Nd`, `Nl`, and `No` categories.|
|`Pc`|Punctuation, Connector|
|`Pd`|Punctuation, Dash|
|`Ps`|Punctuation, Open|
|`Pe`|Punctuation, Close|
|`Pi`|Punctuation, Initial quote (might behave like Ps or Pe depending on usage)|
|`Pf`|Punctuation, Final quote (might behave like Ps or Pe depending on usage)|
|`Po`|Punctuation, Other|
|`P`|All punctuation characters. This includes the `Pc`, `Pd`, `Ps`, `Pe`, `Pi`, `Pf`, and `Po` categories.|
|`Sm`|Symbol, Math|
|`Sc`|Symbol, Currency|
|`Sk`|Symbol, Modifier|
|`So`|Symbol, Other|
|`S`|All symbols. This includes the `Sm`, `Sc`, `Sk`, and `So` categories.|
|`Zs`|Separator, Space|
|`Zl`|Separator, Line|
|`Zp`|Separator, Paragraph|
|`Z`|All separator characters. This includes the `Zs`, `Zl`, and `Zp` categories.|
|`Cc`|Other, Control|
|`Cf`|Other, Format|
|`Cs`|Other, Surrogate|
|`Co`|Other, Private Use|
|`Cn`|Other, Not Assigned or Noncharacter|
|`C`|All other characters. This includes the `Cc`, `Cf`, `Cs`, `Co`, and `Cn` categories.|

You can determine the Unicode category of any particular character by passing that character to the `System.Char.GetUnicodeCategory*` method. The following example uses the `System.Char.GetUnicodeCategory*` method to determine the category of each element in an array that contains selected Latin characters.

```csharp
static void GetUnicodeCategory()
{
    char[] chars = { 'a', 'X', '8', ',', ' ', '\u0009', '!' };

    foreach (char ch in chars)
        Console.WriteLine($"'{Regex.Escape(ch.ToString())}': {Char.GetUnicodeCategory(ch)}");
}
// The example displays the following output:
//       'a': LowercaseLetter
//       'X': UppercaseLetter
//       '8': DecimalDigitNumber
//       ',': OtherPunctuation
//       '\ ': SpaceSeparator
//       '\t': Control
//       '!': OtherPunctuation
```
```vb
Sub GetUnicodeCategory()
    Dim chars() As Char = {"a"c, "X"c, "8"c, ","c, " "c, ChrW(9), "!"c}

    For Each ch As Char In chars
        Console.WriteLine("'{0}': {1}", Regex.Escape(ch.ToString()),
                          Char.GetUnicodeCategory(ch))
    Next
End Sub
' The example displays the following output:
'       'a': LowercaseLetter
'       'X': UppercaseLetter
'       '8': DecimalDigitNumber
'       ',': OtherPunctuation
'       '\ ': SpaceSeparator
'       '\t': Control
'       '!': OtherPunctuation
```

## Supported named blocks

.NET provides the named blocks listed in the following table. The set of supported named blocks is based on Unicode 4.0 and Perl 5.6. For a regular expression that uses named blocks, see the Unicode category or Unicode block: \\p{} section.

|Code point range|Block name|
|----------------------|----------------|
|0000 - 007F|`IsBasicLatin`|
|0080 - 00FF|`IsLatin-1Supplement`|
|0100 - 017F|`IsLatinExtended-A`|
|0180 - 024F|`IsLatinExtended-B`|
|0250 - 02AF|`IsIPAExtensions`|
|02B0 - 02FF|`IsSpacingModifierLetters`|
|0300 - 036F|`IsCombiningDiacriticalMarks`|
|0370 - 03FF|`IsGreek` -or- `IsGreekandCoptic`|
|0400 - 04FF|`IsCyrillic`|
|0500 - 052F|`IsCyrillicSupplement`|
|0530 - 058F|`IsArmenian`|
|0590 - 05FF|`IsHebrew`|
|0600 - 06FF|`IsArabic`|
|0700 - 074F|`IsSyriac`|
|0780 - 07BF|`IsThaana`|
|0900 - 097F|`IsDevanagari`|
|0980 - 09FF|`IsBengali`|
|0A00 - 0A7F|`IsGurmukhi`|
|0A80 - 0AFF|`IsGujarati`|
|0B00 - 0B7F|`IsOriya`|
|0B80 - 0BFF|`IsTamil`|
|0C00 - 0C7F|`IsTelugu`|
|0C80 - 0CFF|`IsKannada`|
|0D00 - 0D7F|`IsMalayalam`|
|0D80 - 0DFF|`IsSinhala`|
|0E00 - 0E7F|`IsThai`|
|0E80 - 0EFF|`IsLao`|
|0F00 - 0FFF|`IsTibetan`|
|1000 - 109F|`IsMyanmar`|
|10A0 - 10FF|`IsGeorgian`|
|1100 - 11FF|`IsHangulJamo`|
|1200 - 137F|`IsEthiopic`|
|13A0 - 13FF|`IsCherokee`|
|1400 - 167F|`IsUnifiedCanadianAboriginalSyllabics`|
|1680 - 169F|`IsOgham`|
|16A0 - 16FF|`IsRunic`|
|1700 - 171F|`IsTagalog`|
|1720 - 173F|`IsHanunoo`|
|1740 - 175F|`IsBuhid`|
|1760 - 177F|`IsTagbanwa`|
|1780 - 17FF|`IsKhmer`|
|1800 - 18AF|`IsMongolian`|
|1900 - 194F|`IsLimbu`|
|1950 - 197F|`IsTaiLe`|
|19E0 - 19FF|`IsKhmerSymbols`|
|1D00 - 1D7F|`IsPhoneticExtensions`|
|1E00 - 1EFF|`IsLatinExtendedAdditional`|
|1F00 - 1FFF|`IsGreekExtended`|
|2000 - 206F|`IsGeneralPunctuation`|
|2070 - 209F|`IsSuperscriptsandSubscripts`|
|20A0 - 20CF|`IsCurrencySymbols`|
|20D0 - 20FF|`IsCombiningDiacriticalMarksforSymbols` -or- `IsCombiningMarksforSymbols`|
|2100 - 214F|`IsLetterlikeSymbols`|
|2150 - 218F|`IsNumberForms`|
|2190 - 21FF|`IsArrows`|
|2200 - 22FF|`IsMathematicalOperators`|
|2300 - 23FF|`IsMiscellaneousTechnical`|
|2400 - 243F|`IsControlPictures`|
|2440 - 245F|`IsOpticalCharacterRecognition`|
|2460 - 24FF|`IsEnclosedAlphanumerics`|
|2500 - 257F|`IsBoxDrawing`|
|2580 - 259F|`IsBlockElements`|
|25A0 - 25FF|`IsGeometricShapes`|
|2600 - 26FF|`IsMiscellaneousSymbols`|
|2700 - 27BF|`IsDingbats`|
|27C0 - 27EF|`IsMiscellaneousMathematicalSymbols-A`|
|27F0 - 27FF|`IsSupplementalArrows-A`|
|2800 - 28FF|`IsBraillePatterns`|
|2900 - 297F|`IsSupplementalArrows-B`|
|2980 - 29FF|`IsMiscellaneousMathematicalSymbols-B`|
|2A00 - 2AFF|`IsSupplementalMathematicalOperators`|
|2B00 - 2BFF|`IsMiscellaneousSymbolsandArrows`|
|2E80 - 2EFF|`IsCJKRadicalsSupplement`|
|2F00 - 2FDF|`IsKangxiRadicals`|
|2FF0 - 2FFF|`IsIdeographicDescriptionCharacters`|
|3000 - 303F|`IsCJKSymbolsandPunctuation`|
|3040 - 309F|`IsHiragana`|
|30A0 - 30FF|`IsKatakana`|
|3100 - 312F|`IsBopomofo`|
|3130 - 318F|`IsHangulCompatibilityJamo`|
|3190 - 319F|`IsKanbun`|
|31A0 - 31BF|`IsBopomofoExtended`|
|31F0 - 31FF|`IsKatakanaPhoneticExtensions`|
|3200 - 32FF|`IsEnclosedCJKLettersandMonths`|
|3300 - 33FF|`IsCJKCompatibility`|
|3400 - 4DBF|`IsCJKUnifiedIdeographsExtensionA`|
|4DC0 - 4DFF|`IsYijingHexagramSymbols`|
|4E00 - 9FFF|`IsCJKUnifiedIdeographs`|
|A000 - A48F|`IsYiSyllables`|
|A490 - A4CF|`IsYiRadicals`|
|AC00 - D7AF|`IsHangulSyllables`|
|D800 - DB7F|`IsHighSurrogates`|
|DB80 - DBFF|`IsHighPrivateUseSurrogates`|
|DC00 - DFFF|`IsLowSurrogates`|
|E000 - F8FF|`IsPrivateUse` or `IsPrivateUseArea`|
|F900 - FAFF|`IsCJKCompatibilityIdeographs`|
|FB00 - FB4F|`IsAlphabeticPresentationForms`|
|FB50 - FDFF|`IsArabicPresentationForms-A`|
|FE00 - FE0F|`IsVariationSelectors`|
|FE20 - FE2F|`IsCombiningHalfMarks`|
|FE30 - FE4F|`IsCJKCompatibilityForms`|
|FE50 - FE6F|`IsSmallFormVariants`|
|FE70 - FEFF|`IsArabicPresentationForms-B`|
|FF00 - FFEF|`IsHalfwidthandFullwidthForms`|
|FFF0 - FFFF|`IsSpecials`|

## Character class subtraction: [base_group - [excluded_group]]

A character class defines a set of characters. Character class subtraction yields a set of characters that is the result of excluding the characters in one character class from another character class.

A character class subtraction expression has the following form:

`[` *base_group* `-[` *excluded_group* `]]`

The square brackets (`[]`) and hyphen (`-`) are mandatory. The *base_group* is a positive character group or a negative character group. The *excluded_group* component is another positive or negative character group, or another character class subtraction expression (that is, you can nest character class subtraction expressions).

For example, suppose you have a base group that consists of the character range from "a" through "z". To define the set of characters that consists of the base group except for the character "m", use `[a-z-[m]]`. To define the set of characters that consists of the base group except for the set of characters "d", "j", and "p", use `[a-z-[djp]]`. To define the set of characters that consists of the base group except for the character range from "m" through "p", use `[a-z-[m-p]]`.

Consider the nested character class subtraction expression, `[a-z-[d-w-[m-o]]]`. The expression is evaluated from the innermost character range outward. First, the character range from "m" through "o" is subtracted from the character range "d" through "w", which yields the set of characters from "d" through "l" and "p" through "w". That set is then subtracted from the character range from "a" through "z", which yields the set of characters `[abcmnoxyz]`.

You can use any character class with character class subtraction. To define the set of characters that consists of all Unicode characters from \u0000 through \uFFFF except white-space characters (`\s`), the characters in the punctuation general category (`\p{P}`), the characters in the `IsGreek` named block (`\p{IsGreek}`), and the Unicode NEXT LINE control character (\x85), use `[\u0000-\uFFFF-[\s\p{P}\p{IsGreek}\x85]]`.

Choose character classes for a character class subtraction expression that yield useful results. Avoid an expression that yields an empty set of characters, which can't match anything, or an expression that is equivalent to the original base group. For example, the empty set is the result of the expression `[\p{IsBasicLatin}-[\x00-\x7F]]`, which subtracts all characters in the `IsBasicLatin` character range from the `IsBasicLatin` general category. Similarly, the original base group is the result of the expression `[a-z-[0-9]]`.  This is because the base group, which is the character range of letters from "a" through "z", doesn't contain any characters in the excluded group, which is the character range of decimal digits from "0" through "9".

The following example defines a regular expression, `^[0-9-[2468]]+$`, that matches zero and odd digits in an input string.  The regular expression is interpreted as shown in the following table.

|Element|Description|
|-------------|-----------------|
|^|Begin the match at the start of the input string.|
|`[0-9-[2468]]+`|Match one or more occurrences of any character from 0 to 9 except for 2, 4, 6, and 8. In other words, match one or more occurrences of zero or an odd digit.|
|$|End the match at the end of the input string.|

```csharp
static void CharacterClassSubtraction()
{
    string[] inputs = { "123", "13579753", "3557798", "335599901" };
    string pattern = @"^[0-9-[2468]]+$";

    foreach (string input in inputs)
    {
        Match match = Regex.Match(input, pattern);
        if (match.Success)
            Console.WriteLine(match.Value);
    }
}
// The example displays the following output:
//       13579753
//       335599901
```
```vb
Sub CharacterClassSubtraction()
    Dim inputs() As String = {"123", "13579753", "3557798", "335599901"}
    Dim pattern As String = "^[0-9-[2468]]+$"

    For Each input As String In inputs
        Dim match As Match = Regex.Match(input, pattern)
        If match.Success Then Console.WriteLine(match.Value)
    Next
End Sub
' The example displays the following output:
'       13579753
'       335599901
```
## See also

- `System.Char.GetUnicodeCategory*`
- Regular Expression Language - Quick Reference
- Regular Expression Options
