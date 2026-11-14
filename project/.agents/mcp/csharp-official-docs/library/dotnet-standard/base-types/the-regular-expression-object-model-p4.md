---
title: "The Regular Expression Object Model (part 4 of 5)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/the-regular-expression-object-model.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# The Regular Expression Object Model (part 4 of 5)

The properties of the `System.Text.RegularExpressions.Group` class provide information about the captured group: The `Group.Value` property contains the captured substring, the `Group.Index` property indicates the starting position of the captured group in the input text, the `Group.Length` property contains the length of the captured text, and the `Group.Success` property indicates whether a substring matched the pattern defined by the capturing group.

 Applying quantifiers to a group (for more information, see Quantifiers) modifies the relationship of one capture per capturing group in two ways:

- If the `*` or `*?` quantifier (which specifies zero or more matches) is applied to a group, a capturing group may not have a match in the input string. When there is no captured text, the properties of the `System.Text.RegularExpressions.Group` object are set as shown in the following table.

  | Group property | Value                                                   |
  |----------------|---------------------------------------------------------|
  | `Success`      | `false`                                                 |
  | `Value`        | `System.String.Empty` |
  | `Length`       | 0                                                       |

     The following example provides an illustration. In the regular expression pattern `aaa(bbb)*ccc`, the first capturing group (the substring "bbb") can be matched zero or more times. Because the input string "aaaccc" matches the pattern, the capturing group does not have a match.

     ```csharp
using System;
using System.Text.RegularExpressions;

public class Example
{
   public static void Main()
   {
      string pattern = "aaa(bbb)*ccc";
      string input = "aaaccc";
      Match match = Regex.Match(input, pattern);
      Console.WriteLine($"Match value: {match.Value}");
      if (match.Groups[1].Success)
         Console.WriteLine($"Group 1 value: {match.Groups[1].Value}");
      else
         Console.WriteLine("The first capturing group has no match.");
   }
}
// The example displays the following output:
//       Match value: aaaccc
//       The first capturing group has no match.
```

- Quantifiers can match multiple occurrences of a pattern that is defined by a capturing group. In this case, the `Value` and `Length` properties of a `System.Text.RegularExpressions.Group` object contain information only about the last captured substring. For example, the following regular expression matches a single sentence that ends in a period. It uses two grouping constructs: The first captures individual words along with a white-space character; the second captures individual words. As the output from the example shows, although the regular expression succeeds in capturing an entire sentence, the second capturing group captures only the last word.

     ```csharp
using System;
using System.Text.RegularExpressions;

public class Example
{
   public static void Main()
   {
      string pattern = @"\b((\w+)\s?)+\.";
      string input = "This is a sentence. This is another sentence.";
      Match match = Regex.Match(input, pattern);
      if (match.Success)
      {
         Console.WriteLine("Match: " + match.Value);
         Console.WriteLine("Group 2: " + match.Groups[2].Value);
      }
   }
}
// The example displays the following output:
//       Match: This is a sentence.
//       Group 2: sentence
```

## The `CaptureCollection` class

 The `System.Text.RegularExpressions.Group` object contains information only about the last capture. However, the entire set of captures made by a capturing group is still available from the `System.Text.RegularExpressions.CaptureCollection` object that is returned by the `System.Text.RegularExpressions.Group.Captures` property. Each member of the collection is a `System.Text.RegularExpressions.Capture` object that represents a capture made by that capturing group, in the order in which they were captured (and, therefore, in the order in which the captured strings were matched from left to right in the input string). You can retrieve individual `System.Text.RegularExpressions.Capture` objects from the collection in either of two ways:

- By iterating through the collection using a construct such as `foreach` (in C#) or `For Each` (in Visual Basic).

- By using the `System.Text.RegularExpressions.CaptureCollection.Item*` property to retrieve a specific object by index. The `System.Text.RegularExpressions.CaptureCollection.Item*` property is the `System.Text.RegularExpressions.CaptureCollection` object's default property (in Visual Basic) or indexer (in C#).

 If a quantifier is not applied to a capturing group, the `System.Text.RegularExpressions.CaptureCollection` object contains a single `System.Text.RegularExpressions.Capture` object that is of little interest, because it provides information about the same match as its `System.Text.RegularExpressions.Group` object. If a quantifier is applied to a capturing group, the `System.Text.RegularExpressions.CaptureCollection` object contains all captures made by the capturing group, and the last member of the collection represents the same capture as the `System.Text.RegularExpressions.Group` object.

 For example, if you use the regular expression pattern `((a(b))c)+` (where the + quantifier specifies one or more matches) to capture matches from the string "abcabcabc", the `System.Text.RegularExpressions.CaptureCollection` object for each `System.Text.RegularExpressions.Group` object contains three members.

 ```csharp
using System;
using System.Text.RegularExpressions;

public class Example
{
   public static void Main()
   {
      string pattern = "((a(b))c)+";
      string input = "abcabcabc";

      Match match = Regex.Match(input, pattern);
      if (match.Success)
      {
         Console.WriteLine($"Match: '{match.Value}' at position {match.Index}");
         GroupCollection groups = match.Groups;
         for (int ctr = 0; ctr < groups.Count; ctr++) {
            Console.WriteLine($"   Group {ctr}: '{groups[ctr].Value}' at position {groups[ctr].Index}");
            CaptureCollection captures = groups[ctr].Captures;
            for (int ctr2 = 0; ctr2 < captures.Count; ctr2++) {
               Console.WriteLine($"      Capture {ctr2}: '{captures[ctr2].Value}' at position {captures[ctr2].Index}");
            }
         }
      }
   }
}
// The example displays the following output:
//       Match: 'abcabcabc' at position 0
//          Group 0: 'abcabcabc' at position 0
//             Capture 0: 'abcabcabc' at position 0
//          Group 1: 'abc' at position 6
//             Capture 0: 'abc' at position 0
//             Capture 1: 'abc' at position 3
//             Capture 2: 'abc' at position 6
//          Group 2: 'ab' at position 6
//             Capture 0: 'ab' at position 0
//             Capture 1: 'ab' at position 3
//             Capture 2: 'ab' at position 6
//          Group 3: 'b' at position 7
//             Capture 0: 'b' at position 1
//             Capture 1: 'b' at position 4
//             Capture 2: 'b' at position 7
```

 The following example uses the regular expression `(Abc)+` to find one or more consecutive runs of the string "Abc" in the string "XYZAbcAbcAbcXYZAbcAb". The example illustrates the use of the `System.Text.RegularExpressions.Group.Captures` property to return multiple groups of captured substrings.

 ```csharp
using System;
using System.Text.RegularExpressions;
using System.Collections.Generic;

public class Example
{
    public static void Main()
    {
        InstantiateRegex();
        UseMatch();
        Console.WriteLine();
        UseMatchCollection();
        Console.WriteLine();
        UseGroupCollection();
        Console.WriteLine();
        UseCaptureCollection();
        Console.WriteLine();
        UseGroup();
        Console.WriteLine();
        UseCapture();
        Console.WriteLine();
        UseNamedGroups();
    }

    private static void InstantiateRegex()
    {
        // Declare object variable of type Regex.
        Regex r;
        // Create a Regex object and define its regular expression.
        r = new Regex(@"\s2000");
    }

    private static void UseMatch()
    {
        // Create a new Regex object.
        var r = new Regex("abc");
        // Find a single match in the string.
        Match m = r.Match("123abc456");
        if (m.Success)
        {
            // Print out the character position where a match was found.
            Console.WriteLine("Found match at position " + m.Index);
        }
       // The example displays the following output:
       //       Found match at position 3
    }

    private static void UseMatchCollection()
    {
        MatchCollection mc;
        var results = new List<string>();
        var matchposition = new List<int>();

        // Create a new Regex object and define the regular expression.
        var r = new Regex("abc");
        // Use the Matches method to find all matches in the input string.
        mc = r.Matches("123abc4abcd");
        // Loop through the match collection to retrieve all
        // matches and positions.
        for (int i = 0; i < mc.Count; i++)
        {
            // Add the match string to the string array.
            results.Add(mc[i].Value);
            // Record the character position where the match was found.
            matchposition.Add(mc[i].Index);
        }
        // List the results.
        for (int ctr = 0; ctr <= results.Count - 1; ctr++)
            Console.WriteLine($"'{results[ctr]}' found at position {matchposition[ctr]}.");

        // The example displays the following output:
        //       'abc' found at position 3.
        //       'abc' found at position 7.
    }

    private static void UseGroupCollection()
    {
        // Define groups "abc", "ab", and "b".
        var r = new Regex("(a(b))c");
        Match m = r.Match("abdabc");
        Console.WriteLine("Number of groups found = " + m.Groups.Count);
        // The example displays the following output:
        //       Number of groups found = 3
    }

    private static void UseCaptureCollection()
    {
        int counter;
        Match m;
        CaptureCollection cc;
        GroupCollection gc;

        // Look for groupings of "Abc".
        var r = new Regex("(Abc)+");
        // Define the string to search.
        m = r.Match("XYZAbcAbcAbcXYZAbcAb");
        gc = m.Groups;

        // Display the number of groups.
        Console.WriteLine("Captured groups = " + gc.Count.ToString());

        // Loop through each group.
        for (int i = 0; i < gc.Count; i++)
        {
            cc = gc[i].Captures;
            counter = cc.Count;

            // Display the number of captures in this group.
            Console.WriteLine("Captures count = " + counter.ToString());

            // Loop through each capture in the group.
            for (int ii = 0; ii < counter; ii++)
            {
                // Display the capture and its position.
                Console.WriteLine(cc[ii] + "   Starts at character " +
                     cc[ii].Index);
            }
        }
        // The example displays the following output:
        //       Captured groups = 2
        //       Captures count = 1
        //       AbcAbcAbc   Starts at character 3
        //       Captures count = 3
        //       Abc   Starts at character 3
        //       Abc   Starts at character 6
        //       Abc   Starts at character 9
    }

    private static void UseGroup()
    {
        var matchposition = new List<int>();
        var results = new List<string>();
        // Define substrings abc, ab, b.
        var r = new Regex("(a(b))c");
        Match m = r.Match("abdabc");
        for (int i = 0; m.Groups[i].Value != ""; i++)
        {
            // Add groups to string array.
            results.Add(m.Groups[i].Value);
            // Record character position.
            matchposition.Add(m.Groups[i].Index);
        }

        // Display the capture groups.
        for (int ctr = 0; ctr < results.Count; ctr++)
            Console.WriteLine($"{results[ctr]} at position {matchposition[ctr]}");
        // The example displays the following output:
        //       abc at position 3
        //       ab at position 3
        //       b at position 4
    }

    private static void UseCapture()
    {
        Regex r;
        Match m;
        CaptureCollection cc;
        int posn, length;

        r = new Regex("(abc)+");
        m = r.Match("bcabcabc");
        for (int i = 0; m.Groups[i].Value != ""; i++)
        {
            Console.WriteLine(m.Groups[i].Value);
            // Capture the Collection for Group(i).
            cc = m.Groups[i].Captures;
            for (int j = 0; j < cc.Count; j++)
            {
                Console.WriteLine($"   Capture at position {cc[j].Index} for {cc[j].Length} characters.");
                // Position of Capture object.
                posn = cc[j].Index;
                // Length of Capture object.
                length = cc[j].Length;
            }
        }
        // The example displays the following output:
        //       abcabc
        //          Capture at position 2 for 6 characters.
        //       abc
        //          Capture at position 2 for 3 characters.
        //          Capture at position 5 for 3 characters.
    }

    private static void UseNamedGroups()
    {
        var r = new Regex(@"^(?<name>\w+):(?<value>\w+)");
        Match m = r.Match("Section1:119900");
        Console.WriteLine(m.Groups["name"].Value);
        Console.WriteLine(m.Groups["value"].Value);
        // The example displays the following output:
        //       Section1
        //       119900
   }
}
```
