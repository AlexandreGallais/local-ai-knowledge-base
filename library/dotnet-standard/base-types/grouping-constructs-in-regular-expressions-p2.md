---
title: "Grouping Constructs in Regular Expressions (part 2 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/grouping-constructs-in-regular-expressions.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Grouping Constructs in Regular Expressions (part 2 of 4)

## Balancing group definitions

A balancing group definition deletes the definition of a previously defined group and stores, in the current group, the interval between the previously defined group and the current group. This grouping construct has the following format:

`(?<name1-name2>subexpression)`

or:

`(?'name1-name2' subexpression)`

Here, *name1* is the current group (optional), *name2* is a previously defined group, and *subexpression* is any valid regular expression pattern. The balancing group definition deletes the definition of *name2* and stores the interval between *name2* and *name1* in *name1*. If no *name2* group is defined, the match backtracks. Because deleting the last definition of *name2* reveals the previous definition of *name2*, this construct lets you use the stack of captures for group *name2* as a counter for keeping track of nested constructs such as parentheses or opening and closing brackets.

The balancing group definition uses *name2* as a stack. The beginning character of each nested construct is placed in the group and in its `System.Text.RegularExpressions.Group.Captures*` collection. When the closing character is matched, its corresponding opening character is removed from the group, and the `System.Text.RegularExpressions.Group.Captures*` collection is decreased by one. After the opening and closing characters of all nested constructs have been matched, *name2* is empty.

> **Note:**
> After you modify the regular expression in the following example to use the appropriate opening and closing character of a nested construct, you can use it to handle most nested constructs, such as mathematical expressions or lines of program code that include multiple nested method calls.

The following example uses a balancing group definition to match left and right angle brackets (<>) in an input string. The example defines two named groups, `Open` and `Close`, that are used like a stack to track matching pairs of angle brackets. Each captured left angle bracket is pushed into the capture collection of the `Open` group, and each captured right angle bracket is pushed into the capture collection of the `Close` group. The balancing group definition ensures that there is a matching right angle bracket for each left angle bracket. If there is not, the final subpattern, `(?(Open)(?!))`, is evaluated only if the `Open` group is not empty (and, therefore, if all nested constructs have not been closed). If the final subpattern is evaluated, the match fails, because the `(?!)` subpattern is a zero-width negative lookahead assertion that always fails.

```csharp
using System;
using System.Text.RegularExpressions;

class Example
{
   public static void Main()
   {
      string pattern = "^[^<>]*" +
                       "(" +
                       "((?'Open'<)[^<>]*)+" +
                       "((?'Close-Open'>)[^<>]*)+" +
                       ")*" +
                       "(?(Open)(?!))$";
      string input = "<abc><mno<xyz>>";

      Match m = Regex.Match(input, pattern);
      if (m.Success == true)
      {
         Console.WriteLine($"Input: \"{input}\" \nMatch: \"{m}\"");
         int grpCtr = 0;
         foreach (Group grp in m.Groups)
         {
            Console.WriteLine($"   Group {grpCtr}: {grp.Value}");
            grpCtr++;
            int capCtr = 0;
            foreach (Capture cap in grp.Captures)
            {
                Console.WriteLine($"      Capture {capCtr}: {cap.Value}");
                capCtr++;
            }
          }
      }
      else
      {
         Console.WriteLine("Match failed.");
      }
    }
}
// The example displays the following output:
//    Input: "<abc><mno<xyz>>"
//    Match: "<abc><mno<xyz>>"
//       Group 0: <abc><mno<xyz>>
//          Capture 0: <abc><mno<xyz>>
//       Group 1: <mno<xyz>>
//          Capture 0: <abc>
//          Capture 1: <mno<xyz>>
//       Group 2: <xyz
//          Capture 0: <abc
//          Capture 1: <mno
//          Capture 2: <xyz
//       Group 3: >
//          Capture 0: >
//          Capture 1: >
//          Capture 2: >
//       Group 4:
//       Group 5: mno<xyz>
//          Capture 0: abc
//          Capture 1: xyz
//          Capture 2: mno<xyz>
```

The regular expression pattern is:

`^[^<>]*(((?'Open'<)[^<>]*)+((?'Close-Open'>)[^<>]*)+)*(?(Open)(?!))$`

The regular expression is interpreted as follows:

|Pattern|Description|
|-------------|-----------------|
|`^`|Begin at the start of the string.|
|`[^<>]*`|Match zero or more characters that are not left or right angle brackets.|
|`(?'Open'<)`|Match a left angle bracket and assign it to a group named `Open`.|
|`[^<>]*`|Match zero or more characters that are not left or right angle brackets.|
|`((?'Open'<)[^<>]*)+`|Match one or more occurrences of a left angle bracket followed by zero or more characters that are not left or right angle brackets. This is the second capturing group.|
|`(?'Close-Open'>)`|Match a right angle bracket, assign the substring between the `Open` group and the current group to the `Close` group, and delete the definition of the `Open` group.|
|`[^<>]*`|Match zero or more occurrences of any character that is neither a left  nor a right angle bracket.|
|`((?'Close-Open'>)[^<>]*)+`|Match one or more occurrences of a right angle bracket, followed by zero or more occurrences of any character that is neither a left nor a right angle bracket. When matching the right angle bracket, assign the substring between the `Open` group and the current group to the `Close` group, and delete the definition of the `Open` group. This is the third capturing group.|
|`(((?'Open'<)[^<>]*)+((?'Close-Open'>)[^<>]*)+)*`|Match zero or more occurrences of the following pattern: one or more occurrences of a left angle bracket, followed by zero or more non-angle bracket characters, followed by one or more occurrences of a right angle bracket, followed by zero or more occurrences of non-angle brackets. When matching the right angle bracket, delete the definition of the `Open` group, and assign the substring between the `Open` group and the current group to the `Close` group. This is the first capturing group.|
|`(?(Open)(?!))`|If the `Open` group exists, abandon the match if an empty string can be matched, but do not advance the position of the regular expression engine in the string. This is a zero-width negative lookahead assertion. Because an empty string is always implicitly present in an input string, this match always fails. Failure of this match indicates that the angle brackets are not balanced.|
|`$`|Match the end of the input string.|

The final subexpression, `(?(Open)(?!))`, indicates whether the nesting constructs in the input string are properly balanced (for example, whether each left angle bracket is matched by a right angle bracket). It uses conditional matching based on a valid captured group; for more information, see Alternation Constructs. If the `Open` group is defined, the regular expression engine attempts to match the subexpression `(?!)` in the input string. The `Open` group should be defined only if nesting constructs are unbalanced. Therefore, the pattern to be matched in the input string should be one that always causes the match to fail. In this case, `(?!)` is a zero-width negative lookahead assertion that always fails, because an empty string is always implicitly present at the next position in the input string.

In the example, the regular expression engine evaluates the input string "\<abc><mno\<xyz>>" as shown in the following table.

|Step|Pattern|Result|
|----------|-------------|------------|
|1|`^`|Starts the match at the beginning of the input string|
|2|`[^<>]*`|Looks for non-angle bracket characters before the left angle bracket;finds no matches.|
|3|`(((?'Open'<)`|Matches the left angle bracket in "\<abc>" and assigns it to the `Open` group.|
|4|`[^<>]*`|Matches "abc".|
|5|`)+`|"<abc" is the value of the second captured group. The next character in the input string is not a left angle bracket, so the regular expression engine does not loop back to the `(?'Open'<)[^<>]*)` subpattern.|
|6|`((?'Close-Open'>)`|Matches the right angle bracket in "\<abc>", assigns "abc", which is the substring between the `Open` group and the right angle bracket, to the `Close` group, and deletes the current value ("<") of the `Open` group, leaving it empty.|
|7|`[^<>]*`|Looks for non-angle bracket characters after the right angle bracket; finds no matches.|
|8|`)+`|The value of the third captured group is ">". The next character in the input string is not a right angle bracket, so the regular expression engine does not loop back to the `((?'Close-Open'>)[^<>]*)` subpattern.|
|9|`)*`|The value of the first captured group is "\<abc>". The next character in the input string is a left  angle bracket, so the regular expression engine loops back to the `(((?'Open'<)` subpattern.|
|10|`(((?'Open'<)`|Matches the left angle bracket in "\<mno" and assigns it to the `Open` group. Its `System.Text.RegularExpressions.Group.Captures*` collection now has a single value, "<".|
|11|`[^<>]*`|Matches "mno".|
|12|`)+`|"<mno" is the value of the second captured group. The next character in the input string is an left angle bracket, so the regular expression engine loops back to the `(?'Open'<)[^<>]*)` subpattern.|
|13|`(((?'Open'<)`|Matches the left angle bracket in "\<xyz>" and assigns it to the `Open` group. The `System.Text.RegularExpressions.Group.Captures*` collection of the `Open` group now includes two captures: the left angle bracket from "\<mno", and the left angle bracket from "\<xyz>".|
|14|`[^<>]*`|Matches "xyz".|
|15|`)+`|"<xyz" is the value of the second captured group. The next character in the input string is not a left angle bracket, so the regular expression engine does not loop back to the `(?'Open'<)[^<>]*)` subpattern.|
|16|`((?'Close-Open'>)`|Matches the right angle bracket in "\<xyz>". "xyz", assigns the substring between the `Open` group and the right angle bracket to the `Close` group, and deletes the current value of the `Open` group. The value of the previous capture (the left angle bracket in "\<mno") becomes the current value of the `Open` group. The `System.Text.RegularExpressions.Group.Captures*` collection of the `Open` group now includes a single capture, the left angle bracket from "\<xyz>".|
|17|`[^<>]*`|Looks for non-angle bracket characters; finds no matches.|
|18|`)+`|The value of the third captured group is ">". The next character in the input string is a right angle bracket, so the regular expression engine loops back to the `((?'Close-Open'>)[^<>]*)` subpattern.|
|19|`((?'Close-Open'>)`|Matches the final right angle bracket in "xyz>>", assigns "mno\<xyz>" (the substring between the `Open` group and the right angle bracket) to the `Close` group, and deletes the current value of the `Open` group. The `Open` group is now empty.|
|20|`[^<>]*`|Looks for non-angle bracket characters; finds no matches.|
|21|`)+`|The value of the third captured group is ">". The next character in the input string is not a right angle bracket, so the regular expression engine does not loop back to the `((?'Close-Open'>)[^<>]*)` subpattern.|
|22|`)*`|The value of the first captured group is "<mno\<xyz>>". The next character in the input string is not a left angle bracket, so the regular expression engine does not loop back to the `(((?'Open'<)` subpattern.|
|23|`(?(Open)(?!))`|The `Open` group is not defined, so no match is attempted.|
|24|`$`|Matches the end of the input string.|

## Noncapturing groups

The following grouping construct does not capture the substring that's matched by a subexpression:

`(?:subexpression)`

Here, *subexpression* is any valid regular expression pattern. The noncapturing group construct is typically used when a quantifier is applied to a group, but the substrings captured by the group are of no interest.

> **Note:**
> If a regular expression includes nested grouping constructs, an outer noncapturing group construct does not apply to the inner nested group constructs.

The following example illustrates a regular expression that includes noncapturing groups. Note that the output does not include any captured groups.

```csharp
using System;
using System.Text.RegularExpressions;

public class Example
{
   public static void Main()
   {
      string pattern = @"(?:\b(?:\w+)\W*)+\.";
      string input = "This is a short sentence.";
      Match match = Regex.Match(input, pattern);
      Console.WriteLine($"Match: {match.Value}");
      for (int ctr = 1; ctr < match.Groups.Count; ctr++)
         Console.WriteLine($"   Group {ctr}: {match.Groups[ctr].Value}");
   }
}
// The example displays the following output:
//       Match: This is a short sentence.
```

The regular expression `(?:\b(?:\w+)\W*)+\.` matches a sentence that is terminated by a period. Because the regular expression focuses on sentences and not on individual words, grouping constructs are used exclusively as quantifiers. The regular expression pattern is interpreted as shown in the following table.

|Pattern|Description|
|-------------|-----------------|
|`\b`|Begin the match at a word boundary.|
|`(?:\w+)`|Match one or more word characters. Do not assign the matched text to a captured group.|
|`\W*`|Match zero or more non-word characters.|
|`(?:\b(?:\w+)\W*)+`|Match the pattern of one or more word characters starting at a word boundary, followed by zero or more non-word characters, one or more times. Do not assign the matched text to a captured group.|
|`\.`|Match a period.|
