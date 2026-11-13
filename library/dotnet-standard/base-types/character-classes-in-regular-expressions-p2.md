---
title: "Character Classes in .NET Regular Expressions (part 2 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/character-classes-in-regular-expressions.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Character Classes in .NET Regular Expressions (part 2 of 4)

## Any character: .

The period character (.) matches any character except `\n` (the newline character), with the following two qualifications:

- If a regular expression pattern is modified by the `System.Text.RegularExpressions.RegexOptions.Singleline` option, or if the portion of the pattern that contains the `.` character class is modified by the `s` option, `.` matches any character. For more information, see Regular Expression Options.

- Starting with .NET 11, if the `System.Text.RegularExpressions.RegexOptions.AnyNewLine` option is specified, `.` excludes all common newline sequences instead of only `\n`. If both `Singleline` and `AnyNewLine` are specified, `Singleline` takes precedence and `.` matches every character. For more information, see AnyNewLine mode.

  The following example illustrates the different behavior of the `.` character class by default and with the `System.Text.RegularExpressions.RegexOptions.Singleline` option. The regular expression `^.+` starts at the beginning of the string and matches every character. By default, the match ends at the end of the first line; the regular expression pattern matches the carriage return character, `\r`, but it doesn't match `\n`. Because the `System.Text.RegularExpressions.RegexOptions.Singleline` option interprets the entire input string as a single line, it matches every character in the input string, including `\n`.

```csharp
static void AnyCharacterMultiline()
{
    string pattern = "^.+";
    string input = "This is one line and" + Environment.NewLine + "this is the second.";
    foreach (Match match in Regex.Matches(input, pattern))
        Console.WriteLine(Regex.Escape(match.Value));

    Console.WriteLine();
    foreach (Match match in Regex.Matches(input, pattern, RegexOptions.Singleline))
        Console.WriteLine(Regex.Escape(match.Value));
}
// The example displays the following output:
//       This\ is\ one\ line\ and\r
//
//       This\ is\ one\ line\ and\r\nthis\ is\ the\ second\.
```
```vb
Sub AnyCharacterMultiline()
    Dim pattern As String = "^.+"
    Dim input As String = "This is one line and" + Environment.NewLine + "this is the second."
    For Each match As Match In Regex.Matches(input, pattern)
        Console.WriteLine(Regex.Escape(match.Value))
    Next

    Console.WriteLine()
    For Each match As Match In Regex.Matches(input, pattern, RegexOptions.Singleline)
        Console.WriteLine(Regex.Escape(match.Value))
    Next
End Sub
' The example displays the following output:
'       This\ is\ one\ line\ and\r
'
'       This\ is\ one\ line\ and\r\nthis\ is\ the\ second\.
```
> **Note:**
> By default, because it matches any character except `\n`, the `.` character class also matches `\r` (the carriage return character). With `System.Text.RegularExpressions.RegexOptions.AnyNewLine`, `.` excludes `\r` and other newline sequences as well.

- In a positive or negative character group, a period is treated as a literal period character, and not as a character class. For more information, see Positive Character Group and Negative Character Group earlier in this article. The following example provides an illustration by defining a regular expression that includes the period character (`.`) both as a character class and as a member of a positive character group. The regular expression `\b.*.?!;:` begins at a word boundary, matches any character until it encounters one of five punctuation marks, including a period, and then matches either a white-space character or the end of the string.

```csharp
static void AnyCharacterSingleline()
{
    string pattern = @"\b.*[.?!;:](\s|\z)";
    string input = "this. what: is? go, thing.";
    foreach (Match match in Regex.Matches(input, pattern))
        Console.WriteLine(match.Value);
}
// The example displays the following output:
//       this. what: is? go, thing.
```
```vb
Sub AnyCharacterSingleline()
    Dim pattern As String = "\b.*[.?!;:](\s|\z)"
    Dim input As String = "this. what: is? go, thing."
    For Each match As Match In Regex.Matches(input, pattern)
        Console.WriteLine(match.Value)
    Next
End Sub
' The example displays the following output:
'       this. what: is? go, thing.
```
> **Note:**
> Because it matches any character, the `.` language element is often used with a lazy quantifier if a regular expression pattern attempts to match any character multiple times. For more information, see Quantifiers.

## Unicode category or Unicode block: \p{}

The Unicode standard assigns each character a general category. For example, a particular character might be an uppercase letter (represented by the `Lu` category), a decimal digit (the `Nd` category), a math symbol (the `Sm` category), or a paragraph separator (the `Zl` category). Specific character sets in the Unicode standard also occupy a specific range or block of consecutive code points. For example, the basic Latin character set is found from \u0000 through \u007F, while the Arabic character set is found from \u0600 through \u06FF.

The regular expression construct

`\p{` *name* `}`

Matches any character that belongs to a Unicode general category or named block, where *name* is the category abbreviation or named block name. For a list of category abbreviations, see the Supported Unicode General Categories section later in this article. For a list of named blocks, see the Supported Named Blocks section later in this article.

> **Tip:**
> Matching can be improved if the string is first normalized by calling the `System.String.Normalize*` method.

The following example uses the `\p{`*name*`}` construct to match both a Unicode general category (in this case, the `Pd`, or Punctuation, Dash category) and a named block (the `IsGreek` and `IsBasicLatin` named blocks).

```csharp
static void UnicodeCategory()
{
    string pattern = @"\b(\p{IsGreek}+(\s)?)+\p{Pd}\s(\p{IsBasicLatin}+(\s)?)+";
    string input = "Ελληνική Γλώσσα - Greek Language";

    Console.WriteLine(Regex.IsMatch(input, pattern));        // Displays True.
}
```
```vb
Sub UnicodeCategory()
    Dim pattern As String = "\b(\p{IsGreek}+(\s)?)+\p{Pd}\s(\p{IsBasicLatin}+(\s)?)+"
    Dim input As String = "Ελληνική Γλώσσα - Greek Language"

    Console.WriteLine(Regex.IsMatch(input, pattern))        ' Displays True.
End Sub
```
The regular expression `\b(\p{IsGreek}+(\s)?)+\p{Pd}\s(\p{IsBasicLatin}+(\s)?)+` is defined as shown in the following table.

|Pattern|Description|
|-------------|-----------------|
|`\b`|Start at a word boundary.|
|`\p{IsGreek}+`|Match one or more Greek characters.|
|`(\s)?`|Match zero or one white-space character.|
|`(\p{IsGreek}+(\s)?)+`|Match the pattern of one or more Greek characters followed by zero or one white-space characters one or more times.|
|`\p{Pd}`|Match a Punctuation, Dash character.|
|`\s`|Match a white-space character.|
|`\p{IsBasicLatin}+`|Match one or more basic Latin characters.|
|`(\s)?`|Match zero or one white-space character.|
|`(\p{IsBasicLatin}+(\s)?)+`|Match the pattern of one or more basic Latin characters followed by zero or one white-space characters one or more times.|

## Negative Unicode category or Unicode block: \P{}

The Unicode standard assigns each character a general category. For example, a particular character can be an uppercase letter (represented by the `Lu` category), a decimal digit (the `Nd` category), a math symbol (the `Sm` category), or a paragraph separator (the `Zl` category). Specific character sets in the Unicode standard also occupy a specific range or block of consecutive code points. For example, the basic Latin character set is found from \u0000 through \u007F, while the Arabic character set is found from \u0600 through \u06FF.

The regular expression construct

`\P{` *name* `}`

Matches any character that doesn't belong to a Unicode general category or named block, where *name* is the category abbreviation or named block name. For a list of category abbreviations, see the Supported Unicode General Categories section later in this article. For a list of named blocks, see the Supported Named Blocks section later in this article.

> **Tip:**
> Matching can be improved if the string is first normalized by calling the `System.String.Normalize*` method.

The following example uses the `\P{`*name*`}` construct to remove any currency symbols (in this case, the `Sc`, or Symbol, Currency category) from numeric strings.

```csharp
static void NegativeUnicodeCategory()
{
    string pattern = @"(\P{Sc})+";

    string[] values = { "$164,091.78", "£1,073,142.68", "73¢", "€120" };
    foreach (string value in values)
        Console.WriteLine(Regex.Match(value, pattern).Value);
}
// The example displays the following output:
//       164,091.78
//       1,073,142.68
//       73
//       120
```
```vb
Sub NegativeUnicodeCategory()
    Dim pattern As String = "(\P{Sc})+"

    Dim values() As String = {"$164,091.78", "£1,073,142.68", "73¢", "€120"}
    For Each value As String In values
        Console.WriteLine(Regex.Match(value, pattern).Value)
    Next
End Sub
' The example displays the following output:
'       164,091.78
'       1,073,142.68
'       73
'       120
```
The regular expression pattern `(\P{Sc})+` matches one or more characters that aren't currency symbols; it effectively strips any currency symbol from the result string.

## Word character: \w

`\w` matches any word character. A word character is a member of any of the Unicode categories listed in the following table.

|Category|Description|
|--------------|-----------------|
|Ll|Letter, Lowercase|
|Lu|Letter, Uppercase|
|Lt|Letter, Titlecase|
|Lo|Letter, Other|
|Lm|Letter, Modifier|
|Mn|Mark, Nonspacing|
|Nd|Number, Decimal Digit|
|Pc|Punctuation, Connector. This category includes ten characters, the most commonly used of which is the LOWLINE character (_), u+005F.|

If ECMAScript-compliant behavior is specified, `\w` is equivalent to `[a-zA-Z_0-9]`. For information on ECMAScript regular expressions, see the "ECMAScript Matching Behavior" section in Regular Expression Options.

> **Note:**
> Because it matches any word character, the `\w` language element is often used with a lazy quantifier if a regular expression pattern attempts to match any word character multiple times, followed by a specific word character. For more information, see Quantifiers.

The following example uses the `\w` language element to match duplicate characters in a word. The example defines a regular expression pattern, `(\w)\1`, which can be interpreted as follows.

|Element|Description|
|-------------|-----------------|
|(\w)|Match a word character. This is the first capturing group.|
|\1|Match the value of the first capture.|

```csharp
static void WordCharacter()
{
    string pattern = @"(\w)\1";
    string[] words = { "trellis", "seer", "latter", "summer",
                       "hoarse", "lesser", "aardvark", "stunned" };
    foreach (string word in words)
    {
        Match match = Regex.Match(word, pattern);
        if (match.Success)
            Console.WriteLine($"'{match.Value}' found in '{word}' at position {match.Index}.");
        else
            Console.WriteLine($"No double characters in '{word}'.");
    }
}
// The example displays the following output:
//       'll' found in 'trellis' at position 3.
//       'ee' found in 'seer' at position 1.
//       'tt' found in 'latter' at position 2.
//       'mm' found in 'summer' at position 2.
//       No double characters in 'hoarse'.
//       'ss' found in 'lesser' at position 2.
//       'aa' found in 'aardvark' at position 0.
//       'nn' found in 'stunned' at position 3.
```
```vb
Sub WordCharacter()
    Dim pattern As String = "(\w)\1"
    Dim words() As String = {"trellis", "seer", "latter", "summer",
                             "hoarse", "lesser", "aardvark", "stunned"}
    For Each word As String In words
        Dim match As Match = Regex.Match(word, pattern)
        If match.Success Then
            Console.WriteLine($"'{match.Value}' found in '{word}' at position {match.Index}.")
        Else
            Console.WriteLine($"No double characters in '{word}'.")
        End If
    Next
End Sub
' The example displays the following output:
'       'll' found in 'trellis' at position 3.
'       'ee' found in 'seer' at position 1.
'       'tt' found in 'latter' at position 2.
'       'mm' found in 'summer' at position 2.
'       No double characters in 'hoarse'.
'       'ss' found in 'lesser' at position 2.
'       'aa' found in 'aardvark' at position 0.
'       'nn' found in 'stunned' at position 3.
```
