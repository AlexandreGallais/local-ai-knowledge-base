---
title: "Quantifiers in Regular Expressions (part 13 of 13)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/quantifiers-in-regular-expressions.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Quantifiers in Regular Expressions (part 13 of 13)

## Quantifiers and Empty Matches

 The quantifiers `*`, `+`, and `{`*n*`,`*m*`}` and their lazy counterparts never repeat after an empty match when the minimum number of captures has been found. This rule prevents quantifiers from entering infinite loops on empty subexpression matches when the maximum number of possible group captures is infinite or near infinite.

 For example, the following code shows the result of a call to the `System.Text.RegularExpressions.Regex.Match*` method with the regular expression pattern `(a?)*`, which matches zero or one `a` character zero or more times. The single capturing group captures each `a` and `System.String.Empty`, but there's no second empty match because the first empty match causes the quantifier to stop repeating.

 ```csharp
using System;
using System.Text.RegularExpressions;

public class Example
{
   public static void Main()
   {
      string pattern = "(a?)*";
      string input = "aaabbb";
      Match match = Regex.Match(input, pattern);
      Console.WriteLine($"Match: '{match.Value}' at index {match.Index}");
      if (match.Groups.Count > 1) {
         GroupCollection groups = match.Groups;
         for (int grpCtr = 1; grpCtr <= groups.Count - 1; grpCtr++) {
            Console.WriteLine($"   Group {grpCtr}: '{groups[grpCtr].Value}' at index {groups[grpCtr].Index}");
            int captureCtr = 0;
            foreach (Capture capture in groups[grpCtr].Captures) {
               captureCtr++;
               Console.WriteLine($"      Capture {captureCtr}: '{capture.Value}' at index {capture.Index}");
            }
         }
      }
   }
}
// The example displays the following output:
//       Match: 'aaa' at index 0
//          Group 1: '' at index 3
//             Capture 1: 'a' at index 0
//             Capture 2: 'a' at index 1
//             Capture 3: 'a' at index 2
//             Capture 4: '' at index 3
```

 To see the practical difference between a capturing group that defines a minimum and a maximum number of captures and one that defines a fixed number of captures, consider the regular expression patterns `(a\1|(?(1)\1)){0,2}` and `(a\1|(?(1)\1)){2}`. Both regular expressions consist of a single capturing group, which is defined in the following table:

|Pattern|Description|
|-------------|-----------------|
|`(a\1`|Either matches `a` along with the value of the first captured group …|
|`&#124;(?(1)`|… or tests whether the first captured group has been defined. The `(?(1)` construct doesn't define a capturing group.|
|`\1))`|If the first captured group exists, match its value. If the group doesn't exist, the group will match `System.String.Empty`.|

 The first regular expression tries to match this pattern between zero and two times; the second, exactly two times. Because the first pattern reaches its minimum number of captures with its first capture of `System.String.Empty`, it never repeats to try to match `a\1`. The `{0,2}` quantifier allows only empty matches in the last iteration. In contrast, the second regular expression does match `a` because it evaluates `a\1` a second time. The minimum number of iterations, 2, forces the engine to repeat after an empty match.

 ```csharp
using System;
using System.Text.RegularExpressions;

public class Example
{
   public static void Main()
   {
      string pattern, input;

      pattern = @"(a\1|(?(1)\1)){0,2}";
      input = "aaabbb";

      Console.WriteLine($"Regex pattern: {pattern}");
      Match match = Regex.Match(input, pattern);
      Console.WriteLine($"Match: '{match.Value}' at position {match.Index}.");
      if (match.Groups.Count > 1) {
         for (int groupCtr = 1; groupCtr <= match.Groups.Count - 1; groupCtr++)
         {
            Group group = match.Groups[groupCtr];
            Console.WriteLine($"   Group: {groupCtr}: '{group.Value}' at position {group.Index}.");
            int captureCtr = 0;
            foreach (Capture capture in group.Captures) {
               captureCtr++;
               Console.WriteLine($"      Capture: {captureCtr}: '{capture.Value}' at position {capture.Index}.");
            }
         }
      }
      Console.WriteLine();

      pattern = @"(a\1|(?(1)\1)){2}";
      Console.WriteLine($"Regex pattern: {pattern}");
      match = Regex.Match(input, pattern);
         Console.WriteLine($"Matched '{match.Value}' at position {match.Index}.");
      if (match.Groups.Count > 1) {
         for (int groupCtr = 1; groupCtr <= match.Groups.Count - 1; groupCtr++)
         {
            Group group = match.Groups[groupCtr];
            Console.WriteLine($"   Group: {groupCtr}: '{group.Value}' at position {group.Index}.");
            int captureCtr = 0;
            foreach (Capture capture in group.Captures) {
               captureCtr++;
               Console.WriteLine($"      Capture: {captureCtr}: '{capture.Value}' at position {capture.Index}.");
            }
         }
      }
   }
}
// The example displays the following output:
//       Regex pattern: (a\1|(?(1)\1)){0,2}
//       Match: '' at position 0.
//          Group: 1: '' at position 0.
//             Capture: 1: '' at position 0.
//
//       Regex pattern: (a\1|(?(1)\1)){2}
//       Matched 'a' at position 0.
//          Group: 1: 'a' at position 0.
//             Capture: 1: '' at position 0.
//             Capture: 2: 'a' at position 0.
```

## See also

- Regular Expression Language - Quick Reference
- Backtracking
