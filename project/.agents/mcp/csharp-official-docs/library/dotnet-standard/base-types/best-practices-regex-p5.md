---
title: "Best Practices for Regular Expressions in .NET (part 5 of 5)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/best-practices-regex.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Best Practices for Regular Expressions in .NET (part 5 of 5)

## Capture only when necessary

Regular expressions in .NET support grouping constructs, which let you group a regular expression pattern into one or more subexpressions. The most commonly used grouping constructs in .NET regular expression language are `(`*subexpression*`)`, which defines a numbered capturing group, and `(?<`*name*`>`*subexpression*`)`, which defines a named capturing group. Grouping constructs are essential for creating backreferences and for defining a subexpression to which a quantifier is applied.

However, the use of these language elements has a cost. They cause the `System.Text.RegularExpressions.GroupCollection` object returned by the `System.Text.RegularExpressions.Match.Groups` property to be populated with the most recent unnamed or named captures. If a single grouping construct has captured multiple substrings in the input string, they also populate the `System.Text.RegularExpressions.CaptureCollection` object returned by the `System.Text.RegularExpressions.Group.Captures` property of a particular capturing group with multiple `System.Text.RegularExpressions.Capture` objects.

Often, grouping constructs are used in a regular expression only so that quantifiers can be applied to them. The groups captured by these subexpressions aren't used later. For example, the regular expression `\b(\w+[;,]?\s?)+[.?!]` is designed to capture an entire sentence. The following table describes the language elements in this regular expression pattern and their effect on the `System.Text.RegularExpressions.Match` object's `System.Text.RegularExpressions.Match.Groups*` and `System.Text.RegularExpressions.Group.Captures*` collections:

| Pattern | Description                                |
|---------|--------------------------------------------|
| `\b`    | Begin the match at a word boundary.        |
| `\w+`   | Matches one or more word characters.       |
| `[;,]?` | Matches zero or one comma or semicolon.    |
| `\s?`   | Matches zero or one white-space character. |
|`(\w+[;,]?\s?)+`|Matches one or more occurrences of one or more word characters followed by an optional comma or semicolon followed by an optional white-space character. This pattern defines the first capturing group, which is necessary so that the combination of multiple word characters (that is, a word) followed by an optional punctuation symbol will be repeated until the regular expression engine reaches the end of a sentence.|
|`[.?!]`|Matches a period, question mark, or exclamation point.|

As the following example shows, when a match is found, both the `System.Text.RegularExpressions.GroupCollection` and `System.Text.RegularExpressions.CaptureCollection` objects are populated with captures from the match. In this case, the capturing group `(\w+[;,]?\s?)` exists so that the `+` quantifier can be applied to it, which enables the regular expression pattern to match each word in a sentence. Otherwise, it would match the last word in a sentence.

```csharp
using System;
using System.Text.RegularExpressions;

public class Group1Example
{
    public static void Main()
    {
        string input = "This is one sentence. This is another.";
        string pattern = @"\b(\w+[;,]?\s?)+[.?!]";

        foreach (Match match in Regex.Matches(input, pattern))
        {
            Console.WriteLine($"Match: '{match.Value}' at index {match.Index}.");
            int grpCtr = 0;
            foreach (Group grp in match.Groups)
            {
                Console.WriteLine($"   Group {grpCtr}: '{grp.Value}' at index {grp.Index}.");
                int capCtr = 0;
                foreach (Capture cap in grp.Captures)
                {
                    Console.WriteLine($"      Capture {capCtr}: '{cap.Value}' at {cap.Index}.");
                    capCtr++;
                }
                grpCtr++;
            }
            Console.WriteLine();
        }
    }
}
// The example displays the following output:
//       Match: 'This is one sentence.' at index 0.
//          Group 0: 'This is one sentence.' at index 0.
//             Capture 0: 'This is one sentence.' at 0.
//          Group 1: 'sentence' at index 12.
//             Capture 0: 'This ' at 0.
//             Capture 1: 'is ' at 5.
//             Capture 2: 'one ' at 8.
//             Capture 3: 'sentence' at 12.
//
//       Match: 'This is another.' at index 22.
//          Group 0: 'This is another.' at index 22.
//             Capture 0: 'This is another.' at 22.
//          Group 1: 'another' at index 30.
//             Capture 0: 'This ' at 22.
//             Capture 1: 'is ' at 27.
//             Capture 2: 'another' at 30.
```

When you use subexpressions only to apply quantifiers to them and you aren't interested in the captured text, you should disable group captures. For example, the `(?:subexpression)` language element prevents the group to which it applies from capturing matched substrings. In the following example, the regular expression pattern from the previous example is changed to `\b(?:\w+[;,]?\s?)+[.?!]`. As the output shows, it prevents the regular expression engine from populating the `System.Text.RegularExpressions.GroupCollection` and `System.Text.RegularExpressions.CaptureCollection` collections:

```csharp
using System;
using System.Text.RegularExpressions;

public class Group2Example
{
    public static void Main()
    {
        string input = "This is one sentence. This is another.";
        string pattern = @"\b(?:\w+[;,]?\s?)+[.?!]";

        foreach (Match match in Regex.Matches(input, pattern))
        {
            Console.WriteLine($"Match: '{match.Value}' at index {match.Index}.");
            int grpCtr = 0;
            foreach (Group grp in match.Groups)
            {
                Console.WriteLine($"   Group {grpCtr}: '{grp.Value}' at index {grp.Index}.");
                int capCtr = 0;
                foreach (Capture cap in grp.Captures)
                {
                    Console.WriteLine($"      Capture {capCtr}: '{cap.Value}' at {cap.Index}.");
                    capCtr++;
                }
                grpCtr++;
            }
            Console.WriteLine();
        }
    }
}
// The example displays the following output:
//       Match: 'This is one sentence.' at index 0.
//          Group 0: 'This is one sentence.' at index 0.
//             Capture 0: 'This is one sentence.' at 0.
//
//       Match: 'This is another.' at index 22.
//          Group 0: 'This is another.' at index 22.
//             Capture 0: 'This is another.' at 22.
```

You can disable captures in one of the following ways:

- Use the `(?:subexpression)` language element. This element prevents the capture of matched substrings in the group to which it applies. It doesn't disable substring captures in any nested groups.

- Use the `System.Text.RegularExpressions.RegexOptions.ExplicitCapture` option. It disables all unnamed or implicit captures in the regular expression pattern. When you use this option, only substrings that match named groups defined with the `(?<name>subexpression)` language element can be captured. The `System.Text.RegularExpressions.RegexOptions.ExplicitCapture` flag can be passed to the `options` parameter of a `System.Text.RegularExpressions.Regex` class constructor or to the `options` parameter of a `System.Text.RegularExpressions.Regex` static matching method.

- Use the `n` option in the `(?imnsx)` language element. This option disables all unnamed or implicit captures from the point in the regular expression pattern at which the element appears. Captures are disabled either until the end of the pattern or until the `(-n)` option enables unnamed or implicit captures. For more information, see Miscellaneous Constructs.

- Use the `n` option in the `(?imnsx:subexpression)` language element. This option disables all unnamed or implicit captures in `subexpression`. Captures by any unnamed or implicit nested capturing groups are disabled as well.

## Thread safety

The `System.Text.RegularExpressions.Regex` class itself is thread safe and immutable (read-only). That is, `Regex` objects can be created on any thread and shared between threads; matching methods can be called from any thread and never alter any global state.

However, result objects (`Match` and `MatchCollection`) returned by `Regex` should be used on a single thread. Although many of these objects are logically immutable, their implementations could delay computation of some results to improve performance, and as a result, callers must serialize access to them.

If you have a need to share `Regex` result objects on multiple threads, these objects can be converted to thread-safe instances by calling their synchronized methods. With the exception of enumerators, all regular expression classes are thread safe or can be converted into thread-safe objects by a synchronized method.

Enumerators are the only exception. You must serialize calls to collection enumerators. The rule is that if a collection can be enumerated on more than one thread simultaneously, you should synchronize enumerator methods on the root object of the collection traversed by the enumerator.

## Related articles

| Title | Description |
|-------|-------------|
|Details of Regular Expression Behavior|Examines the implementation of the regular expression engine in .NET. The article focuses on the flexibility of regular expressions and explains the developer's responsibility for ensuring the efficient and robust operation of the regular expression engine.|
|Backtracking|Explains what backtracking is and how it affects regular expression performance, and examines language elements that provide alternatives to backtracking.|
|Regular Expression Language - Quick Reference|Describes the elements of the regular expression language in .NET and provides links to detailed documentation for each language element.|
