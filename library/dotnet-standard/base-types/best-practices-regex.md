---
title: "Best Practices for Regular Expressions in .NET (part 1 of 5)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/best-practices-regex.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Best practices for regular expressions in .NET

The regular expression engine in .NET is a powerful, full-featured tool that processes text based on pattern matches rather than on comparing and matching literal text. In most cases, it performs pattern matching rapidly and efficiently. However, in some cases, the regular expression engine can appear to be slow. In extreme cases, it can even appear to stop responding as it processes a relatively small input over the course of hours or even days.

This article outlines some of the best practices that developers can adopt to ensure that their regular expressions achieve optimal performance and robustness.

> **Warning:**
> Unrestricted use of regular expressions with untrusted input can subject applications to denial-of-service attacks. The .NET regular expression engine offers options to mitigate these attacks. For more information, see Consider the input source, Take charge of backtracking, and Use time-out values.
>
> The .NET regular expression engine does not offer protection against untrusted *patterns*, and applications should not create regular expression patterns from untrusted user-provided values. For more information, see Use trusted patterns.

## Use trusted patterns

The .NET regular expression engine distinguishes *patterns* (the regular expression itself, such as `^[0-9A-Za-z]+$`) from the *input text* (the string being evaluated against the regular expression, such as `123AbC456`). These values are typically passed to the `Regex` APIs through arguments named *pattern* and *input*, respectively.

These APIs are designed with the assumption that patterns are trusted, that is, they are authored or reviewed by the application developer, not supplied by end users or other untrusted sources. Patterns can cause excessive resource consumption regardless of the input text, and the regular expression engine does not attempt to guard against hostile patterns.

If your application needs to accept search expressions from users, avoid passing user-provided values directly as a regex pattern. Instead, consider these alternatives:

- Support a restricted search syntax (such as simple wildcards or substring matching) that you translate into a regex pattern internally.
- Use `System.Text.RegularExpressions.Regex.Escape*` to treat any user-supplied text as a literal string within a pattern.

Features such as time-out values and `System.Text.RegularExpressions.RegexOptions.NonBacktracking` (which guarantees linear-time processing in the length of the input) help protect against accidental performance problems in developer-authored patterns. They are not intended as a security boundary against malicious patterns.

## Consider the input source

In general, regular expressions can accept two types of input: constrained or unconstrained. Constrained input is a text that originates from a known or reliable source and follows a predefined format. Unconstrained input is a text that originates from an unreliable source, such as a web user, and might not follow a predefined or expected format.

Regular expression patterns are often written to match valid input. That is, developers examine the text that they want to match and then write a regular expression pattern that matches it. Developers then determine whether this pattern requires correction or further elaboration by testing it with multiple valid input items. When the pattern matches all presumed valid inputs, it's declared to be production-ready, and can be included in a released application. This approach makes a regular expression pattern suitable for matching constrained input. However, it doesn't make it suitable for matching unconstrained input.

To match unconstrained input, a regular expression must handle three kinds of text efficiently:

- Text that matches the regular expression pattern.
- Text that doesn't match the regular expression pattern.
- Text that nearly matches the regular expression pattern.

The last text type is especially problematic for a regular expression that has been written to handle constrained input. If that regular expression also relies on extensive backtracking, the regular expression engine can spend an inordinate amount of time (in some cases, many hours or days) processing seemingly innocuous text.

> **Warning:**
> The following example uses a regular expression that's prone to excessive backtracking and that's likely to reject valid email addresses. You shouldn't use it in an email validation routine. If you would like a regular expression that validates email addresses, see How to: Verify that Strings Are in Valid Email Format.

For example, consider a commonly used but problematic regular expression for validating the alias of an email address. The regular expression `^0-9A-Z*$` is written to process what is considered to be a valid email address. A valid email address consists of an alphanumeric character, followed by zero or more characters that can be alphanumeric, periods, or hyphens. The regular expression must end with an alphanumeric character. However, as the following example shows, although this regular expression handles valid input easily, its performance is inefficient when it's processing nearly valid input:

```csharp
using System;
using System.Diagnostics;
using System.Text.RegularExpressions;

public class DesignExample
{
    public static void Main()
    {
        Stopwatch sw;
        string[] addresses = { "user@example.com",
                             "AAAAAAAAAAaaaaaaaaaa!@contoso.com" };
        // The following regular expression should not actually be used to
        // validate an email address.
        string pattern = @"^[0-9A-Z]([-.\w]*[0-9A-Z])*$";
        string input;

        foreach (var address in addresses)
        {
            string mailBox = address.Substring(0, address.IndexOf("@"));
            int index = 0;
            for (int ctr = mailBox.Length - 1; ctr >= 0; ctr--)
            {
                index++;

                input = mailBox.Substring(ctr, index);
                sw = Stopwatch.StartNew();
                Match m = Regex.Match(input, pattern, RegexOptions.IgnoreCase);
                sw.Stop();
                if (m.Success)
                    Console.WriteLine("{0,2}. Matched '{1,25}' in {2}",
                                      index, m.Value, sw.Elapsed);
                else
                    Console.WriteLine("{0,2}. Failed  '{1,25}' in {2}",
                                      index, input, sw.Elapsed);
            }
            Console.WriteLine();
        }
    }
}

// The example displays output similar to the following:
//     1. Matched '                        A' in 00:00:00.0007122
//     2. Matched '                       AA' in 00:00:00.0000282
//     3. Matched '                      AAA' in 00:00:00.0000042
//     4. Matched '                     AAAA' in 00:00:00.0000038
//     5. Matched '                    AAAAA' in 00:00:00.0000042
//     6. Matched '                   AAAAAA' in 00:00:00.0000042
//     7. Matched '                  AAAAAAA' in 00:00:00.0000042
//     8. Matched '                 AAAAAAAA' in 00:00:00.0000087
//     9. Matched '                AAAAAAAAA' in 00:00:00.0000045
//    10. Matched '               AAAAAAAAAA' in 00:00:00.0000045
//    11. Matched '              AAAAAAAAAAA' in 00:00:00.0000045
//
//     1. Failed  '                        !' in 00:00:00.0000447
//     2. Failed  '                       a!' in 00:00:00.0000071
//     3. Failed  '                      aa!' in 00:00:00.0000071
//     4. Failed  '                     aaa!' in 00:00:00.0000061
//     5. Failed  '                    aaaa!' in 00:00:00.0000081
//     6. Failed  '                   aaaaa!' in 00:00:00.0000126
//     7. Failed  '                  aaaaaa!' in 00:00:00.0000359
//     8. Failed  '                 aaaaaaa!' in 00:00:00.0000414
//     9. Failed  '                aaaaaaaa!' in 00:00:00.0000758
//    10. Failed  '               aaaaaaaaa!' in 00:00:00.0001462
//    11. Failed  '              aaaaaaaaaa!' in 00:00:00.0002885
//    12. Failed  '             Aaaaaaaaaaa!' in 00:00:00.0005780
//    13. Failed  '            AAaaaaaaaaaa!' in 00:00:00.0011628
//    14. Failed  '           AAAaaaaaaaaaa!' in 00:00:00.0022851
//    15. Failed  '          AAAAaaaaaaaaaa!' in 00:00:00.0045864
//    16. Failed  '         AAAAAaaaaaaaaaa!' in 00:00:00.0093168
//    17. Failed  '        AAAAAAaaaaaaaaaa!' in 00:00:00.0185993
//    18. Failed  '       AAAAAAAaaaaaaaaaa!' in 00:00:00.0366723
//    19. Failed  '      AAAAAAAAaaaaaaaaaa!' in 00:00:00.1370108
//    20. Failed  '     AAAAAAAAAaaaaaaaaaa!' in 00:00:00.1553966
//    21. Failed  '    AAAAAAAAAAaaaaaaaaaa!' in 00:00:00.3223372
```

As the output from the preceding example shows, the regular expression engine processes the valid email alias in about the same time interval regardless of its length. On the other hand, when the nearly valid email address has more than five characters, processing time approximately doubles for each extra character in the string. Therefore, a nearly valid 28-character string would take over an hour to process, and a nearly valid 33-character string would take nearly a day to process.

Because this regular expression was developed solely by considering the format of input to be matched, it fails to take account of input that doesn't match the pattern. This oversight, in turn, can allow unconstrained input that nearly matches the regular expression pattern to significantly degrade performance.

To solve this problem, you can do the following:

- When developing a pattern, you should consider how backtracking might affect the performance of the regular expression engine, particularly if your regular expression is designed to process unconstrained input. For more information, see the Take Charge of Backtracking section.

- Thoroughly test your regular expression using invalid, near-valid, and valid input. You can use Rex to randomly generate input for a particular regular expression. Rex is a regular expression exploration tool from Microsoft Research.
