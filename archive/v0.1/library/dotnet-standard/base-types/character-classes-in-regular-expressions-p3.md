---
title: "Character Classes in .NET Regular Expressions (part 3 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/character-classes-in-regular-expressions.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Character Classes in .NET Regular Expressions (part 3 of 4)

## Non-word character: \W

`\W` matches any non-word character. The \W language element is equivalent to the following character class:

`[^\p{Ll}\p{Lu}\p{Lt}\p{Lo}\p{Lm}\p{Mn}\p{Nd}\p{Pc}]`

In other words, it matches any character except for those in the Unicode categories listed in the following table.

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

If ECMAScript-compliant behavior is specified, `\W` is equivalent to `[^a-zA-Z_0-9]`. For information on ECMAScript regular expressions, see the "ECMAScript Matching Behavior" section in Regular Expression Options.

> **Note:**
> Because it matches any non-word character, the `\W` language element is often used with a lazy quantifier if a regular expression pattern attempts to match any non-word character multiple times followed by a specific non-word character. For more information, see Quantifiers.

The following example illustrates the `\W` character class.  It defines a regular expression pattern, `\b(\w+)(\W){1,2}`, that matches a word followed by one or two non-word characters, such as white space or punctuation. The regular expression is interpreted as shown in the following table.

|Element|Description|
|-------------|-----------------|
|\b|Begin the match at a word boundary.|
|(\w+)|Match one or more word characters. This is the first capturing group.|
|(\W){1,2}|Match a non-word character either one or two times. This is the second capturing group.|

```csharp
static void NonWordCharacter()
{
    string pattern = @"\b(\w+)(\W){1,2}";
    string input = "The old, grey mare slowly walked across the narrow, green pasture.";
    foreach (Match match in Regex.Matches(input, pattern))
    {
        Console.WriteLine(match.Value);
        Console.Write("   Non-word character(s):");
        CaptureCollection captures = match.Groups[2].Captures;
        for (int ctr = 0; ctr < captures.Count; ctr++)
            Console.Write(@"'{0}' (\u{1}){2}", captures[ctr].Value,
                          Convert.ToUInt16(captures[ctr].Value[0]).ToString("X4"),
                          ctr < captures.Count - 1 ? ", " : "");
        Console.WriteLine();
    }
}
// The example displays the following output:
//       The
//          Non-word character(s):' ' (\u0020)
//       old,
//          Non-word character(s):',' (\u002C), ' ' (\u0020)
//       grey
//          Non-word character(s):' ' (\u0020)
//       mare
//          Non-word character(s):' ' (\u0020)
//       slowly
//          Non-word character(s):' ' (\u0020)
//       walked
//          Non-word character(s):' ' (\u0020)
//       across
//          Non-word character(s):' ' (\u0020)
//       the
//          Non-word character(s):' ' (\u0020)
//       narrow,
//          Non-word character(s):',' (\u002C), ' ' (\u0020)
//       green
//          Non-word character(s):' ' (\u0020)
//       pasture.
//          Non-word character(s):'.' (\u002E)
```
```vb
Sub NonWordCharacter()
    Dim pattern As String = "\b(\w+)(\W){1,2}"
    Dim input As String = "The old, grey mare slowly walked across the narrow, green pasture."
    For Each match As Match In Regex.Matches(input, pattern)
        Console.WriteLine(match.Value)
        Console.Write("   Non-word character(s):")
        Dim captures As CaptureCollection = match.Groups(2).Captures
        For ctr As Integer = 0 To captures.Count - 1
            Console.Write("'{0}' (\u{1}){2}", captures(ctr).Value,
                          Convert.ToUInt16(captures(ctr).Value.Chars(0)).ToString("X4"),
                          If(ctr < captures.Count - 1, ", ", ""))
        Next
        Console.WriteLine()
    Next
End Sub
' The example displays the following output:
'       The
'          Non-word character(s):' ' (\u0020)
'       old,
'          Non-word character(s):',' (\u002C), ' ' (\u0020)
'       grey
'          Non-word character(s):' ' (\u0020)
'       mare
'          Non-word character(s):' ' (\u0020)
'       slowly
'          Non-word character(s):' ' (\u0020)
'       walked
'          Non-word character(s):' ' (\u0020)
'       across
'          Non-word character(s):' ' (\u0020)
'       the
'          Non-word character(s):' ' (\u0020)
'       narrow,
'          Non-word character(s):',' (\u002C), ' ' (\u0020)
'       green
'          Non-word character(s):' ' (\u0020)
'       pasture.
'          Non-word character(s):'.' (\u002E)
```
Because the `System.Text.RegularExpressions.Group` object for the second capturing group contains only a single captured non-word character, the example retrieves all captured non-word characters from the `System.Text.RegularExpressions.CaptureCollection` object that is returned by the `System.Text.RegularExpressions.Group.Captures` property.

## Whitespace character: \s

`\s` matches any whitespace character. It's equivalent to the escape sequences and Unicode categories listed in the following table.

|Category|Description|
|--------------|-----------------|
|`\f`|The form feed character, \u000C.|
|`\n`|The newline character, \u000A.|
|`\r`|The carriage return character, \u000D.|
|`\t`|The tab character, \u0009.|
|`\v`|The vertical tab character, \u000B.|
|`\x85`|The NEXT LINE (NEL) character, \u0085.|
|`\p{Z}`|Matches all separator characters. This includes the `Zs`, `Zl`, and `Zp` categories.|

If ECMAScript-compliant behavior is specified, `\s` is equivalent to `[ \f\n\r\t\v]`. For information on ECMAScript regular expressions, see the "ECMAScript Matching Behavior" section in Regular Expression Options.

The following example illustrates the `\s` character class. It defines a regular expression pattern, `\b\w+(e)?s(\s|$)`, that matches a word ending in either "s" or "es" followed by either a white-space character or the end of the input string. The regular expression is interpreted as shown in the following table.

|Element|Description|
|-------------|-----------------|
|\b|Begin the match at a word boundary.|
|\w+|Match one or more word characters.|
|(e)?|Match an "e" either zero or one time.|
|s|Match an "s".|
|(\s&#124;$)|Match either a white-space character or the end of the input string.|

```csharp
static void WhitespaceCharacter()
{
    string pattern = @"\b\w+(e)?s(\s|$)";
    string input = "matches stores stops leave leaves";
    foreach (Match match in Regex.Matches(input, pattern))
        Console.WriteLine(match.Value);
}
// The example displays the following output:
//       matches
//       stores
//       stops
//       leaves
```
```vb
Sub WhitespaceCharacter()
    Dim pattern As String = "\b\w+(e)?s(\s|$)"
    Dim input As String = "matches stores stops leave leaves"
    For Each match As Match In Regex.Matches(input, pattern)
        Console.WriteLine(match.Value)
    Next
End Sub
' The example displays the following output:
'       matches
'       stores
'       stops
'       leaves
```

## Non-whitespace character: \S

`\S` matches any non-white-space character. It's equivalent to the `[^\f\n\r\t\v\x85\p{Z}]` regular expression pattern, or the opposite of the regular expression pattern that is equivalent to `\s`, which matches white-space characters. For more information, see White-Space Character: \s.

If ECMAScript-compliant behavior is specified, `\S` is equivalent to  `[^ \f\n\r\t\v]`. For information on ECMAScript regular expressions, see the "ECMAScript Matching Behavior" section in Regular Expression Options.

The following example illustrates the `\S` language element. The regular expression pattern `\b(\S+)\s?` matches strings that are delimited by white-space characters. The second element in the match's `System.Text.RegularExpressions.GroupCollection` object contains the matched string. The regular expression can be interpreted as shown in the following table.

|Element|Description|
|-------------|-----------------|
|`\b`|Begin the match at a word boundary.|
|`(\S+)`|Match one or more non-white-space characters. This is the first capturing group.|
|`\s?`|Match zero or one white-space character.|

```csharp
static void NonWhitespaceCharacter()
{
    string pattern = @"\b(\S+)\s?";
    string input = "This is the first sentence of the first paragraph. " +
                          "This is the second sentence.\n" +
                          "This is the only sentence of the second paragraph.";
    foreach (Match match in Regex.Matches(input, pattern))
        Console.WriteLine(match.Groups[1]);
}
// The example displays the following output:
//    This
//    is
//    the
//    first
//    sentence
//    of
//    the
//    first
//    paragraph.
//    This
//    is
//    the
//    second
//    sentence.
//    This
//    is
//    the
//    only
//    sentence
//    of
//    the
//    second
//    paragraph.
```
```vb
Sub NonWhitespaceCharacter()
    Dim pattern As String = "\b(\S+)\s?"
    Dim input As String = "This is the first sentence of the first paragraph. " +
                          "This is the second sentence." + Environment.NewLine +
                          "This is the only sentence of the second paragraph."
    For Each match As Match In Regex.Matches(input, pattern)
        Console.WriteLine(match.Groups(1))
    Next
End Sub
' The example displays the following output:
'    This
'    is
'    the
'    first
'    sentence
'    of
'    the
'    first
'    paragraph.
'    This
'    is
'    the
'    second
'    sentence.
'    This
'    is
'    the
'    only
'    sentence
'    of
'    the
'    second
'    paragraph.
```

## Decimal digit character: \d

`\d` matches any decimal digit. It's equivalent to the `\p{Nd}` regular expression pattern, which includes the standard decimal digits 0-9 and the decimal digits of many other character sets.

If ECMAScript-compliant behavior is specified, `\d` is equivalent to  `[0-9]`. For information on ECMAScript regular expressions, see the "ECMAScript Matching Behavior" section in Regular Expression Options.

The following example illustrates the `\d` language element. It tests whether an input string represents a valid telephone number in the United States and Canada. The regular expression pattern `^(\(?\d{3}\)?[\s-])?\d{3}-\d{4}$` is defined as shown in the following table.

|Element|Description|
|-------------|-----------------|
|`^`|Begin the match at the beginning of the input string.|
|`\(?`|Match zero or one literal "(" character.|
|`\d{3}`|Match three decimal digits.|
|`\)?`|Match zero or one literal ")" character.|
|`[\s-]`|Match a hyphen or a white-space character.|
|`(\(?\d{3}\)?[\s-])?`|Match an optional opening parenthesis followed by three decimal digits, an optional closing parenthesis, and either a white-space character or a hyphen zero or one time. This is the first capturing group.|
|`\d{3}-\d{4}`|Match three decimal digits followed by a hyphen and four more decimal digits.|
|`$`|Match the end of the input string.|

```csharp
static void DigitCharacter()
{
    string pattern = @"^(\(?\d{3}\)?[\s-])?\d{3}-\d{4}$";
    string[] inputs = { "111 111-1111", "222-2222", "222 333-444",
                        "(212) 111-1111", "111-AB1-1111",
                        "212-111-1111", "01 999-9999" };

    foreach (string input in inputs)
    {
        if (Regex.IsMatch(input, pattern))
            Console.WriteLine(input + ": matched");
        else
            Console.WriteLine(input + ": match failed");
    }
}
// The example displays the following output:
//       111 111-1111: matched
//       222-2222: matched
//       222 333-444: match failed
//       (212) 111-1111: matched
//       111-AB1-1111: match failed
//       212-111-1111: matched
//       01 999-9999: match failed
```
```vb
Sub DigitCharacter()
    Dim pattern As String = "^(\(?\d{3}\)?[\s-])?\d{3}-\d{4}$"
    Dim inputs() As String = {"111 111-1111", "222-2222", "222 333-444",
                               "(212) 111-1111", "111-AB1-1111",
                               "212-111-1111", "01 999-9999"}

    For Each input As String In inputs
        If Regex.IsMatch(input, pattern) Then
            Console.WriteLine(input + ": matched")
        Else
            Console.WriteLine(input + ": match failed")
        End If
    Next
End Sub
' The example displays the following output:
'       111 111-1111: matched
'       222-2222: matched
'       222 333-444: match failed
'       (212) 111-1111: matched
'       111-AB1-1111: match failed
'       212-111-1111: matched
'       01 999-9999: match failed
```

## Non-digit character: \D

`\D` matches any non-digit character. It's equivalent to the `\P{Nd}` regular expression pattern.

If ECMAScript-compliant behavior is specified, `\D` is equivalent to  `[^0-9]`. For information on ECMAScript regular expressions, see the "ECMAScript Matching Behavior" section in Regular Expression Options.

The following example illustrates the \D language element. It tests whether a string such as a part number consists of the appropriate combination of decimal and non-decimal characters. The regular expression pattern `^\D\d{1,5}\D*$` is defined as shown in the following table.

|Element|Description|
|-------------|-----------------|
|`^`|Begin the match at the beginning of the input string.|
|`\D`|Match a non-digit character.|
|`\d{1,5}`|Match from one to five decimal digits.|
|`\D*`|Match zero, one, or more non-decimal characters.|
|`$`|Match the end of the input string.|

```csharp
static void NonDigitCharacter()
{
    string pattern = @"^\D\d{1,5}\D*$";
    string[] inputs = { "A1039C", "AA0001", "C18A", "Y938518" };

    foreach (string input in inputs)
    {
        if (Regex.IsMatch(input, pattern))
            Console.WriteLine(input + ": matched");
        else
            Console.WriteLine(input + ": match failed");
    }
}
// The example displays the following output:
//       A1039C: matched
//       AA0001: match failed
//       C18A: matched
//       Y938518: match failed
```
```vb
Sub NonDigitCharacter()
    Dim pattern As String = "^\D\d{1,5}\D*$"
    Dim inputs() As String = {"A1039C", "AA0001", "C18A", "Y938518"}

    For Each input As String In inputs
        If Regex.IsMatch(input, pattern) Then
            Console.WriteLine(input + ": matched")
        Else
            Console.WriteLine(input + ": match failed")
        End If
    Next
End Sub
' The example displays the following output:
'       A1039C: matched
'       AA0001: match failed
'       C18A: matched
'       Y938518: match failed
```
