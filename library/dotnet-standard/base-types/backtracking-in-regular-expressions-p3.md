---
title: "Backtracking in .NET regular expressions (part 3 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/backtracking-in-regular-expressions.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Backtracking in .NET regular expressions (part 3 of 3)

### Lookbehind assertions

 .NET includes two language elements, `(?<=`*subexpression*`)` and `(?<!`*subexpression*`)`, that match the previous character or characters in the input string. Both language elements are zero-width assertions; that is, they determine whether the character or characters that immediately precede the current character can be matched by *subexpression*, without advancing or backtracking.

 `(?<=`*subexpression*`)` is a positive lookbehind assertion; that is, the character or characters before the current position must match *subexpression*. `(?<!`*subexpression*`)` is a negative lookbehind assertion; that is, the character or characters before the current position must not match *subexpression*. Both positive and negative lookbehind assertions are most useful when *subexpression* is a subset of the previous subexpression.

 The following example uses two equivalent regular expression patterns that validate the user name in an email address. The first pattern is subject to poor performance because of excessive backtracking. The second pattern modifies the first regular expression by replacing a nested quantifier with a positive lookbehind assertion. The output from the example displays the execution time of the `System.Text.RegularExpressions.Regex.IsMatch*` method.

```csharp
using System;
using System.Diagnostics;
using System.Text.RegularExpressions;

public class Example5
{
    public static void Run()
    {
        Stopwatch sw;
        string input = "test@contoso.com";
        bool result;

        string pattern = @"^[0-9A-Z]([-.\w]*[0-9A-Z])?@";
        sw = Stopwatch.StartNew();
        result = Regex.IsMatch(input, pattern, RegexOptions.IgnoreCase);
        sw.Stop();
        Console.WriteLine($"Match: {result} in {sw.Elapsed}");

        string behindPattern = @"^[0-9A-Z][-.\w]*(?<=[0-9A-Z])@";
        sw = Stopwatch.StartNew();
        result = Regex.IsMatch(input, behindPattern, RegexOptions.IgnoreCase);
        sw.Stop();
        Console.WriteLine($"Match with Lookbehind: {result} in {sw.Elapsed}");
    }
}
// The example displays output similar to the following:
//       Match: True in 00:00:00.0017549
//       Match with Lookbehind: True in 00:00:00.0000659
```
```vb
﻿' Visual Basic .NET Document
Option Strict On
Imports System.Text.RegularExpressions

Module Example5
    Public Sub Run()
        Dim sw As Stopwatch
        Dim input As String = "test@contoso.com"
        Dim result As Boolean

        Dim pattern As String = "^[0-9A-Z]([-.\w]*[0-9A-Z])?@"
        sw = Stopwatch.StartNew()
        result = Regex.IsMatch(input, pattern, RegexOptions.IgnoreCase)
        sw.Stop()
        Console.WriteLine("Match: {0} in {1}", result, sw.Elapsed)

        Dim behindPattern As String = "^[0-9A-Z][-.\w]*(?<=[0-9A-Z])@"
        sw = Stopwatch.StartNew()
        result = Regex.IsMatch(input, behindPattern, RegexOptions.IgnoreCase)
        sw.Stop()
        Console.WriteLine("Match with Lookbehind: {0} in {1}", result, sw.Elapsed)
    End Sub
End Module
' The example displays output similar to the following:
'       Match: True in 00:00:00.0017549
'       Match with Lookbehind: True in 00:00:00.0000659
```
 The first regular expression pattern, `^0-9A-Z*@`, is defined as shown in the following table.

| Pattern | Description                                     |
|---------|-------------------------------------------------|
| `^`     | Start the match at the beginning of the string. |
|`[0-9A-Z]`|Match an alphanumeric character. This comparison is case-insensitive, because the `System.Text.RegularExpressions.Regex.IsMatch*` method is called with the `System.Text.RegularExpressions.RegexOptions.IgnoreCase` option.|
|`[-.\w]*`|Match zero, one, or more occurrences of a hyphen, period, or word character.|
|`[0-9A-Z]`|Match an alphanumeric character.|
|`([-.\w]*[0-9A-Z])*`|Match zero or more occurrences of the combination of zero or more hyphens, periods, or word characters, followed by an alphanumeric character. This is the first capturing group.|
|`@`|Match an at sign ("\@").|

 The second regular expression pattern, `^0-9A-Z*(?<=[0-9A-Z])@`, uses a positive lookbehind assertion. It is defined as shown in the following table.

| Pattern | Description                                     |
|---------|-------------------------------------------------|
| `^`     | Start the match at the beginning of the string. |
|`[0-9A-Z]`|Match an alphanumeric character. This comparison is case-insensitive, because the `System.Text.RegularExpressions.Regex.IsMatch*` method is called with the `System.Text.RegularExpressions.RegexOptions.IgnoreCase` option.|
|`[-.\w]*`|Match zero or more occurrences of a hyphen, period, or word character.|
|`(?<=[0-9A-Z])`|Look back at the last matched character and continue the match if it is alphanumeric. Note that alphanumeric characters are a subset of the set that consists of periods, hyphens, and all word characters.|
|`@`|Match an at sign ("\@").|

### Lookahead assertions

 .NET includes two language elements, `(?=`*subexpression*`)` and `(?!`*subexpression*`)`, that match the next character or characters in the input string. Both language elements are zero-width assertions; that is, they determine whether the character or characters that immediately follow the current character can be matched by *subexpression*, without advancing or backtracking.

 `(?=`*subexpression*`)` is a positive lookahead assertion; that is, the character or characters after the current position must match *subexpression*. `(?!`*subexpression*`)` is a negative lookahead assertion; that is, the character or characters after the current position must not match *subexpression*. Both positive and negative lookahead assertions are most useful when *subexpression* is a subset of the next subexpression.

 The following example uses two equivalent regular expression patterns that validate a fully qualified type name. The first pattern is subject to poor performance because of excessive backtracking. The second modifies the first regular expression by replacing a nested quantifier with a positive lookahead assertion. The output from the example displays the execution time of the `System.Text.RegularExpressions.Regex.IsMatch*` method.

```csharp
using System;
using System.Diagnostics;
using System.Text.RegularExpressions;

public class Example6
{
    public static void Run()
    {
        string input = "aaaaaaaaaaaaaaaaaaaaaa.";
        bool result;
        Stopwatch sw;

        string pattern = @"^(([A-Z]\w*)+\.)*[A-Z]\w*$";
        sw = Stopwatch.StartNew();
        result = Regex.IsMatch(input, pattern, RegexOptions.IgnoreCase);
        sw.Stop();
        Console.WriteLine($"{result} in {sw.Elapsed}");

        string aheadPattern = @"^((?=[A-Z])\w+\.)*[A-Z]\w*$";
        sw = Stopwatch.StartNew();
        result = Regex.IsMatch(input, aheadPattern, RegexOptions.IgnoreCase);
        sw.Stop();
        Console.WriteLine($"{result} in {sw.Elapsed}");
    }
}
// The example displays the following output:
//       False in 00:00:03.8003793
//       False in 00:00:00.0000866
```
```vb
﻿' Visual Basic .NET Document
Option Strict On

Imports System.Text.RegularExpressions

Module Example6
    Public Sub Run()
        Dim input As String = "aaaaaaaaaaaaaaaaaaaaaa."
        Dim result As Boolean
        Dim sw As Stopwatch

        Dim pattern As String = "^(([A-Z]\w*)+\.)*[A-Z]\w*$"
        sw = Stopwatch.StartNew()
        result = Regex.IsMatch(input, pattern, RegexOptions.IgnoreCase)
        sw.Stop()
        Console.WriteLine("{0} in {1}", result, sw.Elapsed)

        Dim aheadPattern As String = "^((?=[A-Z])\w+\.)*[A-Z]\w*$"
        sw = Stopwatch.StartNew()
        result = Regex.IsMatch(input, aheadPattern, RegexOptions.IgnoreCase)
        sw.Stop()
        Console.WriteLine("{0} in {1}", result, sw.Elapsed)
    End Sub
End Module
' The example displays the following output:
'       False in 00:00:03.8003793
'       False in 00:00:00.0000866
```
 The first regular expression pattern, `^(([A-Z]\w*)+\.)*[A-Z]\w*$`, is defined as shown in the following table.

|Pattern|Description|
|-------------|-----------------|
|`^`|Start the match at the beginning of the string.|
|`([A-Z]\w*)+\.`|Match an alphabetical character (A-Z) followed by zero or more word characters one or more times, followed by a period. This comparison is case-insensitive, because the `System.Text.RegularExpressions.Regex.IsMatch*` method is called with the `System.Text.RegularExpressions.RegexOptions.IgnoreCase` option.|
|`(([A-Z]\w*)+\.)*`|Match the previous pattern zero or more times.|
|`[A-Z]\w*`|Match an alphabetical character followed by zero or more word characters.|
|`$`|End the match at the end of the input string.|

 The second regular expression pattern, `^((?=[A-Z])\w+\.)*[A-Z]\w*$`, uses a positive lookahead assertion. It is defined as shown in the following table.

|Pattern|Description|
|-------------|-----------------|
|`^`|Start the match at the beginning of the string.|
|`(?=[A-Z])`|Look ahead to the first character and continue the match if it is alphabetical (A-Z). This comparison is case-insensitive, because the `System.Text.RegularExpressions.Regex.IsMatch*` method is called with the `System.Text.RegularExpressions.RegexOptions.IgnoreCase` option.|
|`\w+\.`|Match one or more word characters followed by a period.|
|`((?=[A-Z])\w+\.)*`|Match the pattern of one or more word characters followed by a period zero or more times. The initial word character must be alphabetical.|
|`[A-Z]\w*`|Match an alphabetical character followed by zero or more word characters.|
|`$`|End the match at the end of the input string.|

### General performance considerations

The following suggestions are not specifically to prevent excessive backtracking, but may help increase the performance of your regular expression:

1. Precompile heavily used patterns. The best way to do this is to use the regular expression source generator to precompile it. If the source generator is not available for your app, for example you are not targeting .NET 7 or later, or you do not know the pattern at compile time, use the `System.Text.RegularExpressions.RegexOptions.Compiled` option.

1. Cache heavily used Regex objects. This implicitly occurs when you are using the source generator. Otherwise, create a Regex object and store it for reuse, rather than using the static Regex methods or creating and throwing away a Regex object.

1. Start matching from an offset. If you know that matches will always start beyond a certain offset into the pattern, pass the offset in using an overload like `System.Text.RegularExpressions.Regex.Match(System.String,System.Int32)`. This will reduce the amount of the text the engine needs to consider.

1. Gather only the information you need. If you only need to know whether a match occurs but not where the match occurs, prefer `System.Text.RegularExpressions.Regex.IsMatch*`. If you only need to know how many times something matches, prefer using `System.Text.RegularExpressions.Regex.Count*`. If you only need to know the bounds of a match but not anything about a match's captures, prefer using `System.Text.RegularExpressions.Regex.EnumerateMatches*`. The less information the engine needs to provide, the better.

1. Avoid unnecessary captures. Parentheses in your pattern form a capturing group by default. If you don't need captures, either specify `System.Text.RegularExpressions.RegexOptions.ExplicitCapture` or use non-capturing groups instead. This saves the engine keeping track of those captures.

## See also

- .NET Regular Expressions
- Regular Expression Language - Quick Reference
- Quantifiers
- Alternation Constructs
- Grouping Constructs
