---
title: "Breaking change: Unicode category changed for some Latin-1 characters"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/globalization/5.0/unicode-categories-for-latin1-chars.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Unicode category changed for some Latin-1 characters

`System.Char` methods now return the correct Unicode category for characters in the Latin-1 range. The category matches that of the Unicode standard.

## Change description

In previous .NET versions, `System.Char` methods used a fixed list of Unicode categories for characters in the Latin-1 range. However, the Unicode standard has changed the categories of some of these characters since those APIs were implemented, creating a discrepancy. In addition, there was also a discrepancy between `System.Char` and `System.Globalization.CharUnicodeInfo` APIs, which follow the Unicode standard. In .NET 5 and later versions, `System.Char` methods use and return the Unicode category that matches the Unicode standard for all characters.

The following table shows the characters whose Unicode categories have changed in .NET 5:

| Character    | Unicode categoryin previous .NET versions | Unicode categoryin .NET 5 and later versions |
|:------------:|:---------------------------------------------:|:--------------------------------------------------:|
| § (\u00a7)   | `OtherSymbol`                                 | `OtherPunctuation`                                 |
| ª (\u00aa)   | `LowercaseLetter`                             | `OtherLetter`                                      |
| SHY (\u00ad) | `DashPunctuation`                             | `Format`                                           |
| ¶ (\u00b6)   | `OtherSymbol`                                 | `OtherPunctuation`                                 |
| º (\u00ba)   | `LowercaseLetter`                             | `OtherLetter`                                      |

## Version introduced

.NET 5.0

## Recommended action

If you have any code that gets the Unicode character category by using the `System.Char` class and assumes the category will never change, you may need to update it.

## Reason for change

This change was made so that the categories returned by the `System.Char` type are consistent with both the Unicode standard and the `System.Globalization.CharUnicodeInfo` type.

## Affected APIs

- `System.Char.GetUnicodeCategory*`
- `System.Char.IsLetter*`
- `System.Char.IsPunctuation*`
- `System.Char.IsSymbol*`
- `System.Char.IsLower*`

Additionally, any class that depends on `System.Char` to obtain the Unicode character category, for example, `System.Text.RegularExpressions.Regex`, is affected by this change.
