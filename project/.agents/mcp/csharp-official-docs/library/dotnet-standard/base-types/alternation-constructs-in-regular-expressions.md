---
title: "Alternation Constructs in .NET Regular Expressions"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/alternation-constructs-in-regular-expressions.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Alternation Constructs in Regular Expressions

Alternation constructs modify a regular expression to enable either/or or conditional matching. .NET supports three alternation constructs:

- Pattern matching with &#124;
- Conditional matching with (?(expression)yes&#124;no)
- Conditional matching based on a valid captured group

## Pattern Matching with &#124;

You can use the vertical bar (`|`) character to match any one of a series of patterns, where the `|` character separates each pattern.

Like the positive character class, the `|` character can be used to match any one of a number of single characters. The following example uses both a positive character class and either/or pattern matching with the `|` character to locate occurrences of the words "gray" or "grey" in a string. In this case, the `|` character produces a regular expression that is more verbose.

```csharp
string pattern1 = @"\bgr[ae]y\b";
string pattern2 = @"\bgr(a|e)y\b";

string input = "The gray wolf blended in among the grey rocks.";
foreach (Match match in Regex.Matches(input, pattern1))
    Console.WriteLine($"'{match.Value}' found at position {match.Index}");
Console.WriteLine();
foreach (Match match in Regex.Matches(input, pattern2))
    Console.WriteLine($"'{match.Value}' found at position {match.Index}");

// The example displays the following output:
// 'gray' found at position 4
// 'grey' found at position 35
//
// 'gray' found at position 4
// 'grey' found at position 35
```
```vb
Dim pattern1 As String = "\bgr[ae]y\b"
Dim pattern2 As String = "\bgr(a|e)y\b"

Dim input As String = "The gray wolf blended in among the grey rocks."
For Each match As Match In Regex.Matches(input, pattern1)
    Console.WriteLine($"'{match.Value}' found at position {match.Index}")
Next
Console.WriteLine()
For Each match As Match In Regex.Matches(input, pattern2)
    Console.WriteLine($"'{match.Value}' found at position {match.Index}")
Next

' The example displays the following output:
' 'gray' found at position 4
' 'grey' found at position 35
'
' 'gray' found at position 4
' 'grey' found at position 35
```
The regular expression that uses the `|` character, `\bgr(a|e)y\b`, is interpreted as shown in the following table:

|Pattern|Description|
|-------------|-----------------|
|`\b`|Start at a word boundary.|
|`gr`|Match the characters "gr".|
|`(a&#124;e)`|Match either an "a" or an "e".|
|`y\b`|Match a "y" on a word boundary.|

The `|` character can also be used to perform an either/or match with multiple characters or subexpressions, which can include any combination of character literals and regular expression language elements. (The character class does not provide this functionality.) The following example uses the `|` character to extract either a U.S. Social Security Number (SSN), which is a 9-digit number with the format *ddd*-*dd*-*dddd*, or a U.S. Employer Identification Number (EIN), which is a 9-digit number with the format *dd*-*ddddddd*.

```csharp
string eitherOrPattern = @"\b(\d{2}-\d{7}|\d{3}-\d{2}-\d{4})\b";
string eitherOrInput = "01-9999999 020-333333 777-88-9999";
Console.WriteLine($"Matches for {eitherOrPattern}:");
foreach (Match match in Regex.Matches(eitherOrInput, eitherOrPattern))
    Console.WriteLine($"   {match.Value} at position {match.Index}");

// The example displays the following output:
// Matches for \b(\d{2}-\d{7}|\d{3}-\d{2}-\d{4})\b:
//    01-9999999 at position 0
//    777-88-9999 at position 22
```
```vb
Dim eitherOrPattern As String = "\b(\d{2}-\d{7}|\d{3}-\d{2}-\d{4})\b"
Dim eitherOrInput As String = "01-9999999 020-333333 777-88-9999"
Console.WriteLine($"Matches for {eitherOrPattern}:")
For Each match As Match In Regex.Matches(eitherOrInput, eitherOrPattern)
    Console.WriteLine($"   {match.Value} at position {match.Index}")
Next

' The example displays the following output:
' Matches for \b(\d{2}-\d{7}|\d{3}-\d{2}-\d{4})\b:
'    01-9999999 at position 0
'    777-88-9999 at position 22
```
The regular expression `\b(\d{2}-\d{7}|\d{3}-\d{2}-\d{4})\b` is interpreted as shown in the following table:

|Pattern|Description|
|-------------|-----------------|
|`\b`|Start at a word boundary.|
|`(\d{2}-\d{7}&#124;\d{3}-\d{2}-\d{4})`|Match either of the following: two decimal digits followed by a hyphen followed by seven decimal digits; or three decimal digits, a hyphen, two decimal digits, another hyphen, and four decimal digits.|
|`\b`|End the match at a word boundary.|

## Conditional matching with an expression

This language element attempts to match one of two patterns depending on whether it can match an initial pattern. Its syntax is:

`(?(` *expression* `)` *yes* `)`

or

`(?(` *expression* `)` *yes* `|` *no* `)`

where *expression* is the initial pattern to match, *yes* is the pattern to match if *expression* is matched, and *no* is the optional pattern to match if *expression* is not matched (if a *no* pattern is not provided, it's equivalent to an empty *no*). The regular expression engine treats *expression* as a zero-width assertion; that is, the regular expression engine does not advance in the input stream after it evaluates *expression*. Therefore, this construct is equivalent to the following:

`(?(?=` *expression* `)` *yes* `|` *no* `)`

where `(?=`*expression*`)` is a zero-width assertion construct. (For more information, see Grouping Constructs.) Because the regular expression engine interprets *expression* as an anchor (a zero-width assertion), *expression* must either be a zero-width assertion (for more information, see Anchors) or a subexpression that is also contained in *yes*. Otherwise, the *yes* pattern cannot be matched.

> **Note:**
> If *expression* is a named or numbered capturing group, the alternation construct is interpreted as a capture test; for more information, see the next section, Conditional Matching Based on a Valid Capture Group. In other words, the regular expression engine does not attempt to match the captured substring, but instead tests for the presence or absence of the group.

The following example is a variation of the example that appears in the Either/Or Pattern Matching with &#124; section. It uses conditional matching to determine whether the first three characters after a word boundary are two digits followed by a hyphen. If they are, it attempts to match a U.S. Employer Identification Number (EIN). If not, it attempts to match a U.S. Social Security Number (SSN).

```csharp
string condExprPattern = @"\b(?(\d{2}-)\d{2}-\d{7}|\d{3}-\d{2}-\d{4})\b";
string condExprInput = "01-9999999 020-333333 777-88-9999";
Console.WriteLine($"Matches for {condExprPattern}:");
foreach (Match match in Regex.Matches(condExprInput, condExprPattern))
    Console.WriteLine($"   {match.Value} at position {match.Index}");

// The example displays the following output:
// Matches for \b(?(\d{2}-)\d{2}-\d{7}|\d{3}-\d{2}-\d{4})\b:
//    01-9999999 at position 0
//    777-88-9999 at position 22
```
```vb
Dim condExprPattern As String = "\b(?(\d{2}-)\d{2}-\d{7}|\d{3}-\d{2}-\d{4})\b"
Dim condExprInput As String = "01-9999999 020-333333 777-88-9999"
Console.WriteLine($"Matches for {condExprPattern}:")
For Each match As Match In Regex.Matches(condExprInput, condExprPattern)
    Console.WriteLine($"   {match.Value} at position {match.Index}")
Next

' The example displays the following output:
' Matches for \b(?(\d{2}-)\d{2}-\d{7}|\d{3}-\d{2}-\d{4})\b:
'    01-9999999 at position 0
'    777-88-9999 at position 22
```
The regular expression pattern `\b(?(\d{2}-)\d{2}-\d{7}|\d{3}-\d{2}-\d{4})\b` is interpreted as shown in the following table:

|Pattern|Description|
|-------------|-----------------|
|`\b`|Start at a word boundary.|
|`(?(\d{2}-)`|Determine whether the next three characters consist of two digits followed by a hyphen.|
|`\d{2}-\d{7}`|If the previous pattern matches, match two digits followed by a hyphen followed by seven digits.|
|`\d{3}-\d{2}-\d{4}`|If the previous pattern does not match, match three decimal digits, a hyphen, two decimal digits, another hyphen, and four decimal digits.|
|`\b`|Match a word boundary.|

## Conditional matching based on a valid captured group

This language element attempts to match one of two patterns depending on whether it has matched a specified capturing group. Its syntax is:

`(?(` *name* `)` *yes* `)`

or

`(?(` *name* `)` *yes* `|` *no* `)`

or

`(?(` *number* `)` *yes* `)`

or

`(?(` *number* `)` *yes* `|` *no* `)`

where *name* is the name and *number* is the number of a capturing group, *yes* is the expression to match if *name* or *number* has a match, and *no* is the optional expression to match if it does not (if a *no* pattern is not provided, it's equivalent to an empty *no*).

If *name* does not correspond to the name of a capturing group that is used in the regular expression pattern, the alternation construct is interpreted as an expression test, as explained in the previous section. Typically, this means that *expression* evaluates to `false`. If *number* does not correspond to a numbered capturing group that is used in the regular expression pattern, the regular expression engine throws an `System.ArgumentException`.

The following example is a variation of the example that appears in the Either/Or Pattern Matching with &#124; section. It uses a capturing group named `n2` that consists of two digits followed by a hyphen. The alternation construct tests whether this capturing group has been matched in the input string. If it has, the alternation construct attempts to match the last seven digits of a nine-digit U.S. Employer Identification Number (EIN). If it has not, it attempts to match a nine-digit U.S. Social Security Number (SSN).

```csharp
string namedGroupPattern = @"\b(?<n2>\d{2}-)?(?(n2)\d{7}|\d{3}-\d{2}-\d{4})\b";
string namedGroupInput = "01-9999999 020-333333 777-88-9999";
Console.WriteLine($"Matches for {namedGroupPattern}:");
foreach (Match match in Regex.Matches(namedGroupInput, namedGroupPattern))
    Console.WriteLine($"   {match.Value} at position {match.Index}");

// The example displays the following output:
// Matches for \b(?<n2>\d{2}-)?(?(n2)\d{7}|\d{3}-\d{2}-\d{4})\b:
//    01-9999999 at position 0
//    777-88-9999 at position 22
```
```vb
Dim namedGroupPattern As String = "\b(?<n2>\d{2}-)?(?(n2)\d{7}|\d{3}-\d{2}-\d{4})\b"
Dim namedGroupInput As String = "01-9999999 020-333333 777-88-9999"
Console.WriteLine($"Matches for {namedGroupPattern}:")
For Each match As Match In Regex.Matches(namedGroupInput, namedGroupPattern)
    Console.WriteLine($"   {match.Value} at position {match.Index}")
Next

' The example displays the following output:
' Matches for \b(?<n2>\d{2}-)?(?(n2)\d{7}|\d{3}-\d{2}-\d{4})\b:
'    01-9999999 at position 0
'    777-88-9999 at position 22
```
The regular expression pattern `\b(?<n2>\d{2}-)?(?(n2)\d{7}|\d{3}-\d{2}-\d{4})\b` is interpreted as shown in the following table:

|Pattern|Description|
|-------------|-----------------|
|`\b`|Start at a word boundary.|
|`(?<n2>\d{2}-)?`|Match zero or one occurrence of two digits followed by a hyphen. Name this capturing group `n2`.|
|`(?(n2)`|Test whether `n2` was matched in the input string.|
|`\d{7}`|If `n2` was matched, match seven decimal digits.|
|`&#124;\d{3}-\d{2}-\d{4}`|If `n2` was not matched, match three decimal digits, a hyphen, two decimal digits, another hyphen, and four decimal digits.|
|`\b`|Match a word boundary.|

A variation of this example that uses a numbered group instead of a named group is shown in the following example. Its regular expression pattern is `\b(\d{2}-)?(?(1)\d{7}|\d{3}-\d{2}-\d{4})\b`.

```csharp
string numberedGroupPattern = @"\b(\d{2}-)?(?(1)\d{7}|\d{3}-\d{2}-\d{4})\b";
string numberedGroupInput = "01-9999999 020-333333 777-88-9999";
Console.WriteLine($"Matches for {numberedGroupPattern}:");
foreach (Match match in Regex.Matches(numberedGroupInput, numberedGroupPattern))
    Console.WriteLine($"   {match.Value} at position {match.Index}");
// The example displays the following output:
// Matches for \b(\d{2}-)?(?(1)\d{7}|\d{3}-\d{2}-\d{4})\b:
//    01-9999999 at position 0
//    777-88-9999 at position 22
```
```vb
Dim numberedGroupPattern As String = "\b(\d{2}-)?(?(1)\d{7}|\d{3}-\d{2}-\d{4})\b"
Dim numberedGroupInput As String = "01-9999999 020-333333 777-88-9999"
Console.WriteLine($"Matches for {numberedGroupPattern}:")
For Each match As Match In Regex.Matches(numberedGroupInput, numberedGroupPattern)
    Console.WriteLine($"   {match.Value} at position {match.Index}")
Next

' The example displays the following output:
' Matches for \b(\d{2}-)?(?(1)\d{7}|\d{3}-\d{2}-\d{4})\b:
'    01-9999999 at position 0
'    777-88-9999 at position 22
```
## See also

- Regular Expression Language - Quick Reference
