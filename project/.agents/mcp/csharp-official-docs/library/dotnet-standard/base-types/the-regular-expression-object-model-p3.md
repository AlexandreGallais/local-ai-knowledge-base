---
title: "The Regular Expression Object Model (part 3 of 5)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/the-regular-expression-object-model.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# The Regular Expression Object Model (part 3 of 5)

## The captured group

 The `System.Text.RegularExpressions.Group` class represents the result from a single capturing group. Group objects that represent the capturing groups defined in a regular expression are returned by the `System.Text.RegularExpressions.GroupCollection.Item*` property of the `System.Text.RegularExpressions.GroupCollection` object returned by the `System.Text.RegularExpressions.Match.Groups` property. The `System.Text.RegularExpressions.GroupCollection.Item*` property is the indexer (in C#) and the default property (in Visual Basic) of the `System.Text.RegularExpressions.Group` class. You can also retrieve individual members by iterating the collection using the `foreach` or `For Each` construct. For an example, see the previous section.

 The following example uses nested grouping constructs to capture substrings into groups. The regular expression pattern `(a(b))c` matches the string "abc". It assigns the substring "ab" to the first capturing group, and the substring "b" to the second capturing group.

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

 The following example uses named grouping constructs to capture substrings from a string that contains data in the format "DATANAME:VALUE", which the regular expression splits at the colon (:).

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

 The regular expression pattern `^(?<name>\w+):(?<value>\w+)` is defined as shown in the following table.

| Pattern         | Description                                                                     |
|-----------------|---------------------------------------------------------------------------------|
| `^`             | Begin the match at the beginning of the input string.                           |
| `(?<name>\w+)`  | Match one or more word characters. The name of this capturing group is `name`.  |
| `:`             | Match a colon.                                                                  |
| `(?<value>\w+)` | Match one or more word characters. The name of this capturing group is `value`. |
