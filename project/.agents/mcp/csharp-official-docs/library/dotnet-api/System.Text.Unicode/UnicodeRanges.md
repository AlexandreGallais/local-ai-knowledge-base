---
title: "UnicodeRanges class (part 1 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Unicode/UnicodeRanges.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UnicodeRanges class

Namespace: `System.Text.Unicode`

```csharp
public static class UnicodeRanges
```

Provides static properties that return predefined `UnicodeRange` instances that correspond to blocks from the Unicode specification.

#### Remarks

You use `UnicodeRanges` properties to retrieve Unicode named ranges, each of which consists of a contiguous block of Unicode code points. Some ranges include undefined code points. For example, in the **Armenian** Unicode block (U+0530-U+058F), U+0530, U+0557-U+0558, U+0560, U+0588, and U+058B-058C are undefined. One or more undefined code points can occur at the beginning of a range, at the end of a range, or anywhere in between.

Currently, the `UnicodeRange` class supports only named ranges in the Basic <example-value> Plane (BMP), which extends from U+0000 to U+FFFF.

## UnicodeRanges.All property

```csharp
public static System.Text.Unicode.UnicodeRange All { get; }
```

Gets a range that consists of the entire Basic <example-value> Plane (BMP), from U+0000 to U+FFFF).

Returns: A range that consists of the entire BMP.

To be added.

## UnicodeRanges.AlphabeticPresentationForms property

```csharp
public static System.Text.Unicode.UnicodeRange AlphabeticPresentationForms { get; }
```

Gets the Alphabetic Presentation Forms Unicode block (U+FB00-U+FB4F).

Returns: The Alphabetic Presentation Forms Unicode block (U+FB00-U+FB4F).

#### Remarks

For the full set of characters in this block, see The Unicode Standard, Version 12.1 - Alphabetic Presentation Forms.

## UnicodeRanges.Arabic property

```csharp
public static System.Text.Unicode.UnicodeRange Arabic { get; }
```

Gets the Arabic Unicode block (U+0600-U+06FF).

Returns: The Arabic Unicode block (U+0600-U+06FF).

#### Remarks

For the full set of characters in this block, see The Unicode Standard, Version 12.1 - Arabic.

## UnicodeRanges.ArabicExtendedA property

```csharp
public static System.Text.Unicode.UnicodeRange ArabicExtendedA { get; }
```

Gets the Arabic Extended-A Unicode block (U+08A0-U+08FF).

Returns: The Arabic Extended-A Unicode block (U+08A0-U+08FF).

#### Remarks

For the full set of characters in this block, see The Unicode Standard, Version 12.1 - Arabic Extended-A.

## UnicodeRanges.ArabicExtendedB property

```csharp
public static System.Text.Unicode.UnicodeRange ArabicExtendedB { get; }
```

A `UnicodeRange` corresponding to the 'Arabic Extended-B' Unicode block (U+0870..U+089F).

Returns: To be added.

#### Remarks

See https://www.unicode.org/charts/PDF/U0870.pdf for the full set of characters in this block.

## UnicodeRanges.ArabicPresentationFormsA property

```csharp
public static System.Text.Unicode.UnicodeRange ArabicPresentationFormsA { get; }
```

Gets the Arabic Presentation Forms-A Unicode block (U+FB50-U+FDFF).

Returns: The Arabic Presentation Forms-A Unicode block (U+FB50-U+FDFF).

#### Remarks

For the full set of characters in this block, see The Unicode Standard, Version 12.1 - Arabic Presentation Forms-A.

## UnicodeRanges.ArabicPresentationFormsB property

```csharp
public static System.Text.Unicode.UnicodeRange ArabicPresentationFormsB { get; }
```

Gets the Arabic Presentation Forms-B Unicode block (U+FE70-U+FEFF).

Returns: The Arabic Presentation Forms-B Unicode block (U+FE70-U+FEFF).

#### Remarks

For the full set of characters in this block, see The Unicode Standard, Version 12.1 - Arabic Presentation Forms-B.

## UnicodeRanges.ArabicSupplement property

```csharp
public static System.Text.Unicode.UnicodeRange ArabicSupplement { get; }
```

Gets the Arabic Supplement Unicode block (U+0750-U+077F).

Returns: The Arabic Supplement Unicode block (U+0750-U+077F).

#### Remarks

For the full set of characters in this block, see The Unicode Standard, Version 12.1 - Arabic Supplement.

## UnicodeRanges.Armenian property

```csharp
public static System.Text.Unicode.UnicodeRange Armenian { get; }
```

Gets the Armenian Unicode block (U+0530-U+058F).

Returns: The Armenian Unicode block (U+0530-U+058F).

#### Remarks

For the full set of characters in this block, see The Unicode Standard, Version 12.1 - Armenian.

## UnicodeRanges.Arrows property

```csharp
public static System.Text.Unicode.UnicodeRange Arrows { get; }
```

Gets the Arrows Unicode block (U+2190-U+21FF).

Returns: The Arrows Unicode block (U+2190-U+21FF).

#### Remarks

For the full set of characters in this block, see The Unicode Standard, Version 12.1 - Arrows.

## UnicodeRanges.Balinese property

```csharp
public static System.Text.Unicode.UnicodeRange Balinese { get; }
```

Gets the Balinese Unicode block (U+1B00-U+1B7F).

Returns: The Balinese Unicode block (U+1B00-U+1B7F).

#### Remarks

For the full set of characters in this block, see The Unicode Standard, Version 12.1 - Balinese.

## UnicodeRanges.Bamum property

```csharp
public static System.Text.Unicode.UnicodeRange Bamum { get; }
```

Gets the Bamum Unicode block (U+A6A0-U+A6FF).

Returns: The Bamum Unicode block (U+A6A0-U+A6FF).

#### Remarks

For the full set of characters in this block, see The Unicode Standard, Version 12.1 - Bamum.

## UnicodeRanges.BasicLatin property

```csharp
public static System.Text.Unicode.UnicodeRange BasicLatin { get; }
```

Gets the Basic Latin Unicode block (U+0000-U+007F).

Returns: The Basic Latin Unicode block (U+0000-U+007F).

#### Remarks

For the full set of characters in this block, see The Unicode Standard, Version 12.1 - C0 Controls and Basic Latin.

## UnicodeRanges.Batak property

```csharp
public static System.Text.Unicode.UnicodeRange Batak { get; }
```

Gets the Batak Unicode block (U+1BC0-U+1BFF).

Returns: The Batak Unicode block (U+1BC0-U+1BFF).

#### Remarks

For the full set of characters in this block, see The Unicode Standard, Version 12.1 - Batak.

## UnicodeRanges.Bengali property

```csharp
public static System.Text.Unicode.UnicodeRange Bengali { get; }
```

Gets the Bengali Unicode block (U+0980-U+09FF).

Returns: The Bengali Unicode block (U+0980-U+09FF).

#### Remarks

For the full set of characters in this block, see The Unicode Standard, Version 12.1 - Bengali.

## UnicodeRanges.BlockElements property

```csharp
public static System.Text.Unicode.UnicodeRange BlockElements { get; }
```

Gets the Block Elements Unicode block (U+2580-U+259F).

Returns: The Block Elements Unicode block (U+2580-U+259F).

#### Remarks

For the full set of characters in this block, see The Unicode Standard, Version 12.1 - Block Elements.

## UnicodeRanges.Bopomofo property

```csharp
public static System.Text.Unicode.UnicodeRange Bopomofo { get; }
```

Gets the Bopomofo Unicode block (U+3100-U+312F).

Returns: The Bopomofo Unicode block (U+3105-U+312F).

#### Remarks

For the full set of characters in this block, see The Unicode Standard, Version 12.1 - Bopomofo.

## UnicodeRanges.BopomofoExtended property

```csharp
public static System.Text.Unicode.UnicodeRange BopomofoExtended { get; }
```

Gets the Bopomofo Extended Unicode block (U+31A0-U+31BF).

Returns: The Bopomofo Extended Unicode block (U+31A0-U+31BF).

#### Remarks

For the full set of characters in this block, see The Unicode Standard, Version 12.1 - Bopomofo Extended.

## UnicodeRanges.BoxDrawing property

```csharp
public static System.Text.Unicode.UnicodeRange BoxDrawing { get; }
```

Gets the Box Drawing Unicode block (U+2500-U+257F).

Returns: The Box Drawing Unicode block (U+2500-U+257F).

#### Remarks

For the full set of characters in this block, see The Unicode Standard, Version 12.1 - Box Drawing.

## UnicodeRanges.BraillePatterns property

```csharp
public static System.Text.Unicode.UnicodeRange BraillePatterns { get; }
```

Gets the Braille Patterns Unicode block (U+2800-U+28FF).

Returns: The Braille Patterns Unicode block (U+2800-U+28FF).

#### Remarks

For the full set of characters in this block, see The Unicode Standard, Version 12.1 - Braille Patterns.

## UnicodeRanges.Buginese property

```csharp
public static System.Text.Unicode.UnicodeRange Buginese { get; }
```

Gets the Buginese Unicode block (U+1A00-U+1A1F).

Returns: The Buginese Unicode block (U+1A00-U+1A1F).

#### Remarks

For the full set of characters in this block, see The Unicode Standard, Version 12.1 - Buginese.

## UnicodeRanges.Buhid property

```csharp
public static System.Text.Unicode.UnicodeRange Buhid { get; }
```

Gets the Buhid Unicode block (U+1740-U+175F).

Returns: The Buhid Unicode block (U+1740-U+175F).

#### Remarks

For the full set of characters in this block, see The Unicode Standard, Version 12.1 - Buhid.

## UnicodeRanges.Cham property

```csharp
public static System.Text.Unicode.UnicodeRange Cham { get; }
```

Gets the Cham Unicode block (U+AA00-U+AA5F).

Returns: The Cham Unicode block (U+AA00-U+AA5F).

#### Remarks

For the full set of characters in this block, see The Unicode Standard, Version 12.1 - Cham.

## UnicodeRanges.Cherokee property

```csharp
public static System.Text.Unicode.UnicodeRange Cherokee { get; }
```

Gets the Cherokee Unicode block (U+13A0-U+13FF).

Returns: The Cherokee Unicode block (U+13A0-U+13FF).

#### Remarks

For the full set of characters in this block, see The Unicode Standard, Version 12.1 - Cherokee.

## UnicodeRanges.CherokeeSupplement property

```csharp
public static System.Text.Unicode.UnicodeRange CherokeeSupplement { get; }
```

Gets the Cherokee Supplement Unicode block (U+AB70-U+ABBF).

Returns: The Cherokee Supplement Unicode block (U+AB70-U+ABBF).

#### Remarks

For the full set of characters in this block, see The Unicode Standard, Version 12.1 - Cherokee Supplement.

## UnicodeRanges.CjkCompatibility property

```csharp
public static System.Text.Unicode.UnicodeRange CjkCompatibility { get; }
```

Gets the CJK Compatibility Unicode block (U+3300-U+33FF).

Returns: The CJK Compatibility Unicode block (U+3300-U+33FF).

#### Remarks

For the full set of characters in this block, see The Unicode Standard, Version 12.1 - CJK Compatibility.

## UnicodeRanges.CjkCompatibilityForms property

```csharp
public static System.Text.Unicode.UnicodeRange CjkCompatibilityForms { get; }
```

Gets the CJK Compatibility Forms Unicode block (U+FE30-U+FE4F).

Returns: The CJK Compatibility Forms Unicode block (U+FE30-U+FE4F).

#### Remarks

For the full set of characters in this block, see The Unicode Standard, Version 12.1 - CJK Compatibility Forms.

## UnicodeRanges.CjkCompatibilityIdeographs property

```csharp
public static System.Text.Unicode.UnicodeRange CjkCompatibilityIdeographs { get; }
```

Gets the CJK Compatibility Ideographs Unicode block (U+F900-U+FAD9).

Returns: The CJK Compatibility Ideographs Unicode block (U+F900-U+FAD9).

#### Remarks

For the full set of characters in this block, see The Unicode Standard, Version 12.1 - CJK Compatibility Ideographs.

## UnicodeRanges.CjkRadicalsSupplement property

```csharp
public static System.Text.Unicode.UnicodeRange CjkRadicalsSupplement { get; }
```

Gets the CJK Radicals Supplement Unicode block (U+2E80-U+2EFF).

Returns: The CJK Radicals Supplement Unicode block (U+2E80-U+2EFF).

#### Remarks

For the full set of characters in this block, see The Unicode Standard, Version 12.1 - CJK Radicals Supplement.

## UnicodeRanges.CjkStrokes property

```csharp
public static System.Text.Unicode.UnicodeRange CjkStrokes { get; }
```

Gets the CJK Strokes Unicode block (U+31C0-U+31EF).

Returns: The CJK Strokes Unicode block (U+31C0-U+31EF).

#### Remarks

For the full set of characters in this block, see The Unicode Standard, Version 12.1 - CJK Strokes.

## UnicodeRanges.CjkSymbolsandPunctuation property

```csharp
public static System.Text.Unicode.UnicodeRange CjkSymbolsandPunctuation { get; }
```

Gets the CJK Symbols and Punctuation Unicode block (U+3000-U+303F).

Returns: The CJK Symbols and Punctuation Unicode block (U+3000-U+303F).

#### Remarks

For the full set of characters in this block, see The Unicode Standard, Version 12.1 - CJK Symbols and Punctuation.

## UnicodeRanges.CjkUnifiedIdeographs property

```csharp
public static System.Text.Unicode.UnicodeRange CjkUnifiedIdeographs { get; }
```

Gets the CJK Unified Ideographs Unicode block (U+4E00-U+9FCC).

Returns: The CJK Unified Ideographs Unicode block (U+4E00-U+9FCC).

#### Remarks

For the full set of characters in this block, see The Unicode Standard, Version 12.1 - CJK Unified Ideographs.

## UnicodeRanges.CjkUnifiedIdeographsExtensionA property

```csharp
public static System.Text.Unicode.UnicodeRange CjkUnifiedIdeographsExtensionA { get; }
```

Gets the CJK Unitied Ideographs Extension A Unicode block (U+3400-U+4DB5).

Returns: The CJK Unitied Ideographs Extension A Unicode block (U+3400-U+4DB5).

#### Remarks

For the full set of characters in this block, see The Unicode Standard, Version 12.1 - CJK Unified Ideographs Extension A.

## UnicodeRanges.CombiningDiacriticalMarks property

```csharp
public static System.Text.Unicode.UnicodeRange CombiningDiacriticalMarks { get; }
```

Gets the Combining Diacritical Marks Unicode block (U+0300-U+036F).

Returns: The Combining Diacritical Marks Unicode block (U+0300-U+036F).

#### Remarks

For the full set of characters in this block, see The Unicode Standard, Version 12.1 - Combining Diacritical Marks.

## UnicodeRanges.CombiningDiacriticalMarksExtended property

```csharp
public static System.Text.Unicode.UnicodeRange CombiningDiacriticalMarksExtended { get; }
```

Gets the Combining Diacritical Marks Extended Unicode block (U+1AB0-U+1AFF).

Returns: The Combining Diacritical Marks Extended Unicode block (U+1AB0-U+1AFF).

#### Remarks

For the full set of characters in this block, see The Unicode Standard, Version 12.1 - Combining Diacritical Marks Extended.

## UnicodeRanges.CombiningDiacriticalMarksforSymbols property

```csharp
public static System.Text.Unicode.UnicodeRange CombiningDiacriticalMarksforSymbols { get; }
```

Gets the Combining Diacritical Marks for Symbols Unicode block (U+20D0-U+20FF).

Returns: The Combining Diacritical Marks for Symbols Unicode block (U+20D0-U+20FF).

#### Remarks

For the full set of characters in this block, see The Unicode Standard, Version 12.1 - Combining Diacritical Marks for Symbols.

## UnicodeRanges.CombiningDiacriticalMarksSupplement property

```csharp
public static System.Text.Unicode.UnicodeRange CombiningDiacriticalMarksSupplement { get; }
```

Gets the Combining Diacritical Marks Supplement Unicode block (U+1DC0-U+1DFF).

Returns: The Combining Diacritical Marks Supplement Unicode block (U+1DC0-U+1DFF).

#### Remarks

For the full set of characters in this block, see The Unicode Standard, Version 12.1 - Combining Diacritical Marks Supplement.
