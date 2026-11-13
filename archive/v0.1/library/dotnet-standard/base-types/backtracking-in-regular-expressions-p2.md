---
title: "Backtracking in .NET regular expressions (part 2 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/backtracking-in-regular-expressions.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Backtracking in .NET regular expressions (part 2 of 3)

## Control backtracking

 Backtracking lets you create powerful, flexible regular expressions. However, as the previous section showed, these benefits may be coupled with unacceptably poor performance. To prevent excessive backtracking, you should define a time-out interval when you instantiate a `System.Text.RegularExpressions.Regex` object or call a static regular expression matching method. This is discussed in the next section. In addition, .NET supports three regular expression language elements that limit or suppress backtracking and that support complex regular expressions with little or no performance penalty: atomic groups, lookbehind assertions, and lookahead assertions. For more information about each language element, see Grouping constructs.

### Non-backtracking regular expression engine

If you don't need to use any constructs that require backtracking (for example, lookarounds, backreferences, or atomic groups), consider using the `System.Text.RegularExpressions.RegexOptions.NonBacktracking` mode. This mode is designed to execute in time proportional to the length of the input. For more information, see NonBacktracking mode. You can also set a time-out value.

### Limit the size of inputs

 Some regular expressions have acceptable performance unless the input is exceptionally large. If all reasonable text inputs in your scenario are known to be under a certain length, consider rejecting longer inputs before applying the regular expression to them.

### Specify a time-out interval

 You can set a time-out value that represents the longest interval the regular expression engine will search for a single match before it abandons the attempt and throws a `System.Text.RegularExpressions.RegexMatchTimeoutException` exception. You specify the time-out interval by supplying a `System.TimeSpan` value to the `System.Text.RegularExpressions.Regex.#ctor(System.String,System.Text.RegularExpressions.RegexOptions,System.TimeSpan)` constructor for instance regular expressions. In addition, each static pattern matching method has an overload with a `System.TimeSpan` parameter that allows you to specify a time-out value.

If you don't set a time-out value explicitly, the default time-out value is determined as follows:

- By using the application-wide time-out value, if one exists. This can be any time-out value that applies to the application domain in which the `System.Text.RegularExpressions.Regex` object is instantiated or the static method call is made. You can set the application-wide time-out value by calling the `System.AppDomain.SetData*` method to assign the string representation of a `System.TimeSpan` value to the `REGEX_DEFAULT_MATCH_TIMEOUT` property.
- By using the value `System.Text.RegularExpressions.Regex.InfiniteMatchTimeout`, if no application-wide time-out value has been set.

By default, the time-out interval is set to `System.Text.RegularExpressions.Regex.InfiniteMatchTimeout` and the regular expression engine does not time out.

> **Important:**
> When not using `System.Text.RegularExpressions.RegexOptions.NonBacktracking`, we recommend that you always set a time-out interval if your regular expression relies on backtracking or operates on untrusted inputs.

 A `System.Text.RegularExpressions.RegexMatchTimeoutException` exception indicates that the regular expression engine was unable to find a match within the specified time-out interval but does not indicate why the exception was thrown. The reason might be excessive backtracking, but it's also possible that the time-out interval was set too low given the system load at the time the exception was thrown. When you handle the exception, you can choose to abandon further matches with the input string or increase the time-out interval and retry the matching operation.

 For example, the following code calls the `System.Text.RegularExpressions.Regex.#ctor(System.String,System.Text.RegularExpressions.RegexOptions,System.TimeSpan)` constructor to instantiate a `System.Text.RegularExpressions.Regex` object with a time-out value of 1 second. The regular expression pattern `(a+)+$`, which matches one or more sequences of one or more "a" characters at the end of a line, is subject to excessive backtracking. If a `System.Text.RegularExpressions.RegexMatchTimeoutException` is thrown, the example increases the time-out value up to a maximum interval of 3 seconds. After that, it abandons the attempt to match the pattern.

 ```csharp
using System;
using System.ComponentModel;
using System.Diagnostics;
using System.Security;
using System.Text.RegularExpressions;
using System.Threading;

public class Example
{
    const int MaxTimeoutInSeconds = 3;

    public static void Main()
    {
        string pattern = @"(a+)+$";    // DO NOT REUSE THIS PATTERN.
        Regex rgx = new Regex(pattern, RegexOptions.IgnoreCase, TimeSpan.FromSeconds(1));
        Stopwatch? sw = null;

        string[] inputs = { "aa", "aaaa>",
                         "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                         "aaaaaaaaaaaaaaaaaaaaaa>",
                         "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa>" };

        foreach (var inputValue in inputs)
        {
            Console.WriteLine($"Processing {inputValue}");
            bool timedOut = false;
            do
            {
                try
                {
                    sw = Stopwatch.StartNew();
                    // Display the result.
                    if (rgx.IsMatch(inputValue))
                    {
                        sw.Stop();
                        Console.WriteLine(@"Valid: '{0}' ({1:ss\.fffffff} seconds)",
                                          inputValue, sw.Elapsed);
                    }
                    else
                    {
                        sw.Stop();
                        Console.WriteLine(@"'{0}' is not a valid string. ({1:ss\.fffff} seconds)",
                                          inputValue, sw.Elapsed);
                    }
                }
                catch (RegexMatchTimeoutException e)
                {
                    sw.Stop();
                    // Display the elapsed time until the exception.
                    Console.WriteLine(@"Timeout with '{0}' after {1:ss\.fffff}",
                                      inputValue, sw.Elapsed);
                    Thread.Sleep(1500);       // Pause for 1.5 seconds.

                    // Increase the timeout interval and retry.
                    TimeSpan timeout = e.MatchTimeout.Add(TimeSpan.FromSeconds(1));
                    if (timeout.TotalSeconds > MaxTimeoutInSeconds)
                    {
                        Console.WriteLine($"Maximum timeout interval of {MaxTimeoutInSeconds} seconds exceeded.");
                        timedOut = false;
                    }
                    else
                    {
                        Console.WriteLine($"Changing the timeout interval to {timeout}");
                        rgx = new Regex(pattern, RegexOptions.IgnoreCase, timeout);
                        timedOut = true;
                    }
                }
            } while (timedOut);
            Console.WriteLine();
        }
    }
}
// The example displays output like the following :
//    Processing aa
//    Valid: 'aa' (00.0000779 seconds)
//
//    Processing aaaa>
//    'aaaa>' is not a valid string. (00.00005 seconds)
//
//    Processing aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
//    Valid: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' (00.0000043 seconds)
//
//    Processing aaaaaaaaaaaaaaaaaaaaaa>
//    Timeout with 'aaaaaaaaaaaaaaaaaaaaaa>' after 01.00469
//    Changing the timeout interval to 00:00:02
//    Timeout with 'aaaaaaaaaaaaaaaaaaaaaa>' after 02.01202
//    Changing the timeout interval to 00:00:03
//    Timeout with 'aaaaaaaaaaaaaaaaaaaaaa>' after 03.01043
//    Maximum timeout interval of 3 seconds exceeded.
//
//    Processing aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa>
//    Timeout with 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa>' after 03.01018
//    Maximum timeout interval of 3 seconds exceeded.
```

### Atomic groups

 The `(?>`*subexpression*`)` language element is an atomic grouping. It prevents backtracking into the subexpression. Once this language element has successfully matched, it will not give up any part of its match to subsequent backtracking. For example, in the pattern `(?>\w*\d*)1`, if the `1` cannot be matched, the `\d*` will not give up any of its match even if that means it would allow the `1` to successfully match. Atomic groups can help prevent the performance problems associated with failed matches.

 The following example illustrates how suppressing backtracking improves performance when using nested quantifiers. It measures the time required for the regular expression engine to determine that an input string does not match two regular expressions. The first regular expression uses backtracking to attempt to match a string that contains one or more occurrences of one or more hexadecimal digits, followed by a colon, followed by one or more hexadecimal digits, followed by two colons. The second regular expression is identical to the first, except that it disables backtracking. As the output from the example shows, the performance improvement from disabling backtracking is significant.

```csharp
using System;
using System.Diagnostics;
using System.Text.RegularExpressions;

public class Example4
{
    public static void Run()
    {
        string input = "b51:4:1DB:9EE1:5:27d60:f44:D4:cd:E:5:0A5:4a:D24:41Ad:";
        bool matched;
        Stopwatch sw;

        Console.WriteLine("With backtracking:");
        string backPattern = "^(([0-9a-fA-F]{1,4}:)*([0-9a-fA-F]{1,4}))*(::)$";
        sw = Stopwatch.StartNew();
        matched = Regex.IsMatch(input, backPattern);
        sw.Stop();
        Console.WriteLine($"Match: {Regex.IsMatch(input, backPattern)} in {sw.Elapsed}");
        Console.WriteLine();

        Console.WriteLine("Without backtracking:");
        string noBackPattern = "^((?>[0-9a-fA-F]{1,4}:)*(?>[0-9a-fA-F]{1,4}))*(::)$";
        sw = Stopwatch.StartNew();
        matched = Regex.IsMatch(input, noBackPattern);
        sw.Stop();
        Console.WriteLine($"Match: {Regex.IsMatch(input, noBackPattern)} in {sw.Elapsed}");
    }
}
// The example displays output like the following:
//       With backtracking:
//       Match: False in 00:00:27.4282019
//
//       Without backtracking:
//       Match: False in 00:00:00.0001391
```
```vb
﻿' Visual Basic .NET Document
Option Strict On

Imports System.Text.RegularExpressions

Module Example4
    Public Sub Run()
        Dim input As String = "b51:4:1DB:9EE1:5:27d60:f44:D4:cd:E:5:0A5:4a:D24:41Ad:"
        Dim matched As Boolean
        Dim sw As Stopwatch

        Console.WriteLine("With backtracking:")
        Dim backPattern As String = "^(([0-9a-fA-F]{1,4}:)*([0-9a-fA-F]{1,4}))*(::)$"
        sw = Stopwatch.StartNew()
        matched = Regex.IsMatch(input, backPattern)
        sw.Stop()
        Console.WriteLine("Match: {0} in {1}", Regex.IsMatch(input, backPattern), sw.Elapsed)
        Console.WriteLine()

        Console.WriteLine("Without backtracking:")
        Dim noBackPattern As String = "^((?>[0-9a-fA-F]{1,4}:)*(?>[0-9a-fA-F]{1,4}))*(::)$"
        sw = Stopwatch.StartNew()
        matched = Regex.IsMatch(input, noBackPattern)
        sw.Stop()
        Console.WriteLine("Match: {0} in {1}", Regex.IsMatch(input, noBackPattern), sw.Elapsed)
    End Sub
End Module
' The example displays the following output:
'       With backtracking:
'       Match: False in 00:00:27.4282019
'       
'       Without backtracking:
'       Match: False in 00:00:00.0001391
```
