---
title: "Grouping Constructs in Regular Expressions (part 4 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/grouping-constructs-in-regular-expressions.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Grouping Constructs in Regular Expressions (part 4 of 4)

## Zero-width negative lookbehind assertions

The following grouping construct defines a zero-width negative lookbehind assertion:

`(?<!` *subexpression* `)`

Here, *subexpression* is any regular expression pattern. For a match to be successful, *subexpression* must not occur at the input string to the left of the current position. However, any substring that does not match `subexpression` is not included in the match result.

Zero-width negative lookbehind assertions are typically used at the beginning of regular expressions. The pattern that they define precludes a match in the string that follows. They are also used to limit backtracking when the last character or characters in a captured group must not be one or more of the characters that match that group's regular expression pattern. For example, if a group captures all consecutive word characters, you can use a zero-width positive lookbehind assertion to require that the last character not be an underscore (\_).

The following example matches the date for any day of the week that is not a weekend (that is, that is neither Saturday nor Sunday).

```csharp
using System;
using System.Text.RegularExpressions;

public class Example
{
   public static void Main()
   {
      string[] dates = { "Monday February 1, 2010",
                         "Wednesday February 3, 2010",
                         "Saturday February 6, 2010",
                         "Sunday February 7, 2010",
                         "Monday, February 8, 2010" };
      string pattern = @"(?<!(Saturday|Sunday) )\b\w+ \d{1,2}, \d{4}\b";

      foreach (string dateValue in dates)
      {
         Match match = Regex.Match(dateValue, pattern);
         if (match.Success)
            Console.WriteLine(match.Value);
      }
   }
}
// The example displays the following output:
//       February 1, 2010
//       February 3, 2010
//       February 8, 2010
```

The regular expression pattern `(?<!(Saturday|Sunday) )\b\w+ \d{1,2}, \d{4}\b` is interpreted as shown in the following table.

|Pattern|Description|
|-------------|-----------------|
|`\b`|Begin the match at a word boundary.|
|`\w+`|Match one or more word characters followed by a white-space character.|
|`\d{1,2},`|Match either one or two decimal digits followed by a white-space character and a comma.|
|`\d{4}\b`|Match four decimal digits, and end the match at a word boundary.|
|<code>(?<!(Saturday&#124;Sunday) )</code>|If the match is preceded by something other than the strings "Saturday" or "Sunday" followed by a space, the match is successful.|

## Atomic groups

The following grouping construct represents an atomic group (known in some other regular expression engines as a nonbacktracking subexpression, an atomic subexpression, or a once-only subexpression):

`(?>` *subexpression* `)`

Here, *subexpression* is any regular expression pattern.

Ordinarily, if a regular expression includes an optional or alternative matching pattern and a match does not succeed, the regular expression engine can branch in multiple directions to match an input string with a pattern. If a match is not found when it takes the first branch, the regular expression engine can back up or backtrack to the point where it took the first match and attempt the match using the second branch. This process can continue until all branches have been tried.

The `(?>`*subexpression*`)` language construct disables backtracking. The regular expression engine will match as many characters in the input string as it can. When no further match is possible, it will not backtrack to attempt alternate pattern matches. (That is, the subexpression matches only strings that would be matched by the subexpression alone; it does not attempt to match a string based on the subexpression and any subexpressions that follow it.)

This option is recommended if you know that backtracking will not succeed. Preventing the regular expression engine from performing unnecessary searching improves performance.

The following example illustrates how an atomic group modifies the results of a pattern match. The backtracking regular expression successfully matches a series of repeated characters followed by one more occurrence of the same character on a word boundary, but the nonbacktracking regular expression does not.

```csharp
using System;
using System.Text.RegularExpressions;

public class Example
{
   public static void Main()
   {
      string[] inputs = { "cccd.", "aaad", "aaaa" };
      string back = @"(\w)\1+.\b";
      string noback = @"(?>(\w)\1+).\b";

      foreach (string input in inputs)
      {
         Match match1 = Regex.Match(input, back);
         Match match2 = Regex.Match(input, noback);
         Console.WriteLine($"{input}: ");

         Console.Write("   Backtracking : ");
         if (match1.Success)
            Console.WriteLine(match1.Value);
         else
            Console.WriteLine("No match");

         Console.Write("   Nonbacktracking: ");
         if (match2.Success)
            Console.WriteLine(match2.Value);
         else
            Console.WriteLine("No match");
      }
   }
}
// The example displays the following output:
//    cccd.:
//       Backtracking : cccd
//       Nonbacktracking: cccd
//    aaad:
//       Backtracking : aaad
//       Nonbacktracking: aaad
//    aaaa:
//       Backtracking : aaaa
//       Nonbacktracking: No match
```

The nonbacktracking regular expression `(?>(\w)\1+).\b` is defined as shown in the following table.

| Pattern       | Description                                                                                                                       |
|---------------|-----------------------------------------------------------------------------------------------------------------------------------|
| `(\w)`        | Match a single word character and assign it to the first capturing group.                                                         |
| `\1+`         | Match the value of the first captured substring one or more times.                                                                |
| `.`           | Match any character.                                                                                                              |
| `\b`          | End the match on a word boundary.                                                                                                 |
| `(?>(\w)\1+)` | Match one or more occurrences of a duplicated word character, but don't backtrack to match the last character on a word boundary. |

## Grouping constructs and regular expression objects

Substrings that are matched by a regular expression capturing group are represented by `System.Text.RegularExpressions.Group` objects, which can be retrieved from the `System.Text.RegularExpressions.GroupCollection` object that is returned by the `System.Text.RegularExpressions.Match.Groups` property. The `System.Text.RegularExpressions.GroupCollection` object is populated as follows:

- The first `System.Text.RegularExpressions.Group` object in the collection (the object at index zero) represents the entire match.
- The next set of `System.Text.RegularExpressions.Group` objects represent unnamed (numbered) capturing groups. They appear in the order in which they are defined in the regular expression, from left to right. The index values of these groups range from 1 to the number of unnamed capturing groups in the collection. (The index of a particular group is equivalent to its numbered backreference. For more information about backreferences, see Backreference Constructs.)
- The final set of `System.Text.RegularExpressions.Group` objects represent named capturing groups. They appear in the order in which they are defined in the regular expression, from left to right. The index value of the first named capturing group is one greater than the index of the last unnamed capturing group. If there are no unnamed capturing groups in the regular expression, the index value of the first named capturing group is one.

If you apply a quantifier to a capturing group, the corresponding `System.Text.RegularExpressions.Group` object's `System.Text.RegularExpressions.Capture.Value*`, `System.Text.RegularExpressions.Capture.Index*`, and `System.Text.RegularExpressions.Capture.Length` properties reflect the last substring that is captured by a capturing group. You can retrieve a complete set of substrings that are captured by groups that have quantifiers from the `System.Text.RegularExpressions.CaptureCollection` object that is returned by the `System.Text.RegularExpressions.Group.Captures` property.

The following example clarifies the relationship between the `System.Text.RegularExpressions.Group` and `System.Text.RegularExpressions.Capture` objects.

```csharp
using System;
using System.Text.RegularExpressions;

public class Example
{
   public static void Main()
   {
      string pattern = @"(\b(\w+)\W+)+";
      string input = "This is a short sentence.";
      Match match = Regex.Match(input, pattern);
      Console.WriteLine($"Match: '{match.Value}'");
      for (int ctr = 1; ctr < match.Groups.Count; ctr++)
      {
         Console.WriteLine($"   Group {ctr}: '{match.Groups[ctr].Value}'");
         int capCtr = 0;
         foreach (Capture capture in match.Groups[ctr].Captures)
         {
            Console.WriteLine($"      Capture {capCtr}: '{capture.Value}'");
            capCtr++;
         }
      }
   }
}
// The example displays the following output:
//       Match: 'This is a short sentence.'
//          Group 1: 'sentence.'
//             Capture 0: 'This '
//             Capture 1: 'is '
//             Capture 2: 'a '
//             Capture 3: 'short '
//             Capture 4: 'sentence.'
//          Group 2: 'sentence'
//             Capture 0: 'This'
//             Capture 1: 'is'
//             Capture 2: 'a'
//             Capture 3: 'short'
//             Capture 4: 'sentence'
```

The regular expression pattern `(\b(\w+)\W+)+` extracts individual words from a string. It is defined as shown in the following table.

|Pattern|Description|
|-------------|-----------------|
|`\b`|Begin the match at a word boundary.|
|`(\w+)`|Match one or more word characters. Together, these characters form a word. This is the second capturing group.|
|`\W+`|Match one or more non-word characters.|
|`(\b(\w+)\W+)`|Match the pattern of one or more word characters followed by one or more non-word characters one or more times. This is the first capturing group.|

The second capturing group matches each word of the sentence. The first capturing group matches each word along with the punctuation and white space that follow the word. The `System.Text.RegularExpressions.Group` object whose index is 2 provides information about the text matched by the second capturing group. The complete set of words captured by the capturing group are available from the `System.Text.RegularExpressions.CaptureCollection` object returned by the `System.Text.RegularExpressions.Group.Captures` property.

## See also

- Regular Expression Language - Quick Reference
- Backtracking
