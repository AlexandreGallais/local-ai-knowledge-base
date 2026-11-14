---
title: "Character Classes in .NET Regular Expressions (part 1 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/character-classes-in-regular-expressions.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Character classes in regular expressions

A character class defines a set of characters, any one of which can occur in an input string for a match to succeed. The regular expression language in .NET supports the following character classes:

- Positive character groups. A character in the input string must match one of a specified set of characters. For more information, see Positive Character Group.

- Negative character groups. A character in the input string must not match one of a specified set of characters. For more information, see Negative Character Group.

- Any character. The `.` (dot or period) character in a regular expression is a wildcard character that matches any character except `\n`. For more information, see Any Character.

- A general Unicode category or named block. A character in the input string must be a member of a particular Unicode category or must fall within a contiguous range of Unicode characters for a match to succeed. For more information, see Unicode Category or Unicode Block.

- A negative general Unicode category or named block. A character in the input string must not be a member of a particular Unicode category or must not fall within a contiguous range of Unicode characters for a match to succeed. For more information, see Negative Unicode Category or Unicode Block.

- A word character. A character in the input string can belong to any of the Unicode categories that are appropriate for characters in words. For more information, see Word Character.

- A non-word character. A character in the input string can belong to any Unicode category that isn't a word character. For more information, see Non-Word Character.

- A white-space character. A character in the input string can be any Unicode separator character and any one of many control characters. For more information, see White-Space Character.

- A non-white-space character. A character in the input string can be any character that isn't a white-space character. For more information, see Non-White-Space Character.

- A decimal digit. A character in the input string can be any character classified as a Unicode decimal digit. For more information, see Decimal Digit Character.

- A non-decimal digit. A character in the input string can be anything other than a Unicode decimal digit. For more information, see Decimal Digit Character.

.NET supports character class subtraction expressions, which enables you to define a set of characters as the result of excluding one character class from another character class. For more information, see Character Class Subtraction.

> **Note:**
> Character classes that match characters by category, such as \w to match word characters or \p{} to match a Unicode category, rely on the `System.Globalization.CharUnicodeInfo` class to provide information about character categories. In .NET Framework 4.6.2 and later versions, character categories are based on The Unicode Standard, Version 8.0.0.

## Positive character group: [ ]

A positive character group specifies a list of characters, any one of which can appear in an input string for a match to occur. This list of characters might be specified individually, as a range, or both.

The syntax for specifying a list of individual characters is as follows:

`[*character_group*]`

Where *character_group* is a list of the individual characters that can appear in the input string for a match to succeed. *character_group* can consist of any combination of one or more literal characters, escape characters, or character classes.

The syntax for specifying a range of characters is as follows:

`[firstCharacter-lastCharacter]`

Where *firstCharacter* is the character that begins the range and *lastCharacter* is the character that ends the range. A character range is a contiguous series of characters defined by specifying the first character in the series, a hyphen (-), and then the last character in the series. Two characters are contiguous if they have adjacent Unicode code points. *firstCharacter* must be the character with the lower code point, and *lastCharacter* must be the character with the higher code point.

> **Note:**
> Because a positive character group can include both a set of characters and a character range, a hyphen character (`-`) is always interpreted as the range separator unless it's the first or last character of the group.

To include a hyphen as a nonperipheral member of a character group, escape it. For instance, to create a character group for the character `a` and the characters from `-` to `/`, the correct syntax is `[a\--/]`.

Some common regular expression patterns that contain positive character classes are listed in the following table.

|Pattern|Description|
|-------------|-----------------|
|`[aeiou]`|Match all vowels.|
|`[\p{P}\d]`|Match all punctuation and decimal digit characters.|
|`[\s\p{P}]`|Match all white space and punctuation.|

The following example defines a positive character group that contains the characters "a" and "e" so that the input string must contain the words "grey" or "gray" followed by another word for a match to occur.

```csharp
static void PositiveCharacterGroup()
{
    string pattern = @"gr[ae]y\s\S+?[\s\p{P}]";
    string input = "The gray wolf jumped over the grey wall.";
    MatchCollection matches = Regex.Matches(input, pattern);
    foreach (Match match in matches)
        Console.WriteLine($"'{match.Value}'");
}
// The example displays the following output:
//       'gray wolf '
//       'grey wall.'
```
```vb
Sub PositiveCharacterGroup()
    Dim pattern As String = "gr[ae]y\s\S+?[\s\p{P}]"
    Dim input As String = "The gray wolf jumped over the grey wall."
    Dim matches As MatchCollection = Regex.Matches(input, pattern)
    For Each match As Match In matches
        Console.WriteLine($"'{match.Value}'")
    Next
End Sub
' The example displays the following output:
'       'gray wolf '
'       'grey wall.'
```
The regular expression `gr[ae]y\s\S+?[\s|\p{P}]` is defined as follows:

|Pattern|Description|
|-------------|-----------------|
|`gr`|Match the literal characters "gr".|
|`[ae]`|Match either an "a" or an "e".|
|`y\s`|Match the literal character "y" followed by a white-space character.|
|`\S+?`|Match one or more non-white-space characters, but as few as possible.|
|`[\s\p{P}]`|Match either a white-space character or a punctuation mark.|

The following example matches words that begin with any capital letter. It uses the subexpression `[A-Z]` to represent the range of capital letters from A to Z.

```csharp
static void CharacterRange()
{
    string pattern = @"\b[A-Z]\w*\b";
    string input = "A city Albany Zulu maritime Marseilles";
    foreach (Match match in Regex.Matches(input, pattern))
        Console.WriteLine(match.Value);
}
// The example displays the following output:
//       A
//       Albany
//       Zulu
//       Marseilles
```
```vb
Sub CharacterRange()
    Dim pattern As String = "\b[A-Z]\w*\b"
    Dim input As String = "A city Albany Zulu maritime Marseilles"
    For Each match As Match In Regex.Matches(input, pattern)
        Console.WriteLine(match.Value)
    Next
End Sub
' The example displays the following output:
'       A
'       Albany
'       Zulu
'       Marseilles
```
The regular expression `\b[A-Z]\w*\b` is defined as shown in the following table.

|Pattern|Description|
|-------------|-----------------|
|`\b`|Start at a word boundary.|
|`[A-Z]`|Match any uppercase character from A to Z.|
|`\w*`|Match zero or more word characters.|
|`\b`|Match a word boundary.|

## Negative character group: [^]

A negative character group specifies a list of characters that must not appear in an input string for a match to occur. The list of characters can be specified individually, as a range, or both.

The syntax for specifying a list of individual characters is as follows:

`[*^character_group*]`

Where *character_group* is a list of the individual characters that can't appear in the input string for a match to succeed. *character_group* can consist of any combination of one or more literal characters, escape characters, or character classes.

The syntax for specifying a range of characters is as follows:

`[^*firstCharacter*-*lastCharacter*]`

Where *firstCharacter* is the character that begins the range and *lastCharacter* is the character that ends the range. A character range is a contiguous series of characters defined by specifying the first character in the series, a hyphen (-), and then the last character in the series. Two characters are contiguous if they have adjacent Unicode code points. *firstCharacter* must be the character with the lower code point, and *lastCharacter* must be the character with the higher code point.

> **Note:**
> Because a negative character group can include both a set of characters and a character range, a hyphen character (`-`) is always interpreted as the range separator unless it's the first or last character of the group.

Two or more character ranges can be concatenated. For example, to specify the range of decimal digits from "0" through "9", the range of lowercase letters from "a" through "f", and the range of uppercase letters from "A" through "F", use `[0-9a-fA-F]`.

The leading caret character (`^`) in a negative character group is mandatory and indicates the character group is a negative character group instead of a positive character group.

> **Important:**
> A negative character group in a larger regular expression pattern isn't a zero-width assertion. That is, after evaluating the negative character group, the regular expression engine advances one character in the input string.

Some common regular expression patterns that contain negative character groups are listed in the following table.

|Pattern|Description|
|-------------|-----------------|
|`[^aeiou]`|Match all characters except vowels.|
|`[^\p{P}\d]`|Match all characters except punctuation and decimal digit characters.|

The following example matches any word that begins with the characters "th" and isn't followed by an "o".

```csharp
static void NegativeCharacterGroup()
{
    string pattern = @"\bth[^o]\w+\b";
    string input = "thought thing though them through thus thorough this";
    foreach (Match match in Regex.Matches(input, pattern))
        Console.WriteLine(match.Value);
}
// The example displays the following output:
//       thing
//       them
//       through
//       thus
//       this
```
```vb
Sub NegativeCharacterGroup()
    Dim pattern As String = "\bth[^o]\w+\b"
    Dim input As String = "thought thing though them through thus thorough this"
    For Each match As Match In Regex.Matches(input, pattern)
        Console.WriteLine(match.Value)
    Next
End Sub
' The example displays the following output:
'       thing
'       them
'       through
'       thus
'       this
```
The regular expression `\bth[^o]\w+\b` is defined as shown in the following table.

|Pattern|Description|
|-------------|-----------------|
|`\b`|Start at a word boundary.|
|`th`|Match the literal characters "th".|
|`[^o]`|Match any character that isn't an "o".|
|`\w+`|Match one or more word characters.|
|`\b`|End at a word boundary.|
