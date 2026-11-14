---
title: "The Regular Expression Object Model (part 2 of 5)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/the-regular-expression-object-model.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# The Regular Expression Object Model (part 2 of 5)

## The `MatchCollection` and `Match` objects

 Regex methods return two objects that are part of the regular expression object model: the `System.Text.RegularExpressions.MatchCollection` object, and the `System.Text.RegularExpressions.Match` object.

### The `MatchCollection` class

 The `System.Text.RegularExpressions.Regex.Matches*` method returns a `System.Text.RegularExpressions.MatchCollection` object that contains `System.Text.RegularExpressions.Match` objects that represent all the matches that the regular expression engine found, in the order in which they occur in the input string. If there are no matches, the method returns a `System.Text.RegularExpressions.MatchCollection` object with no members. The `System.Text.RegularExpressions.MatchCollection.Item*` property lets you access individual members of the collection by index, from zero to one less than the value of the `System.Text.RegularExpressions.MatchCollection.Count` property. `System.Text.RegularExpressions.MatchCollection.Item*` is the collection's indexer (in C#) and default property (in Visual Basic).

 By default, the call to the `System.Text.RegularExpressions.Regex.Matches*` method uses lazy evaluation to populate the `System.Text.RegularExpressions.MatchCollection` object. Access to properties that require a fully populated collection, such as the `System.Text.RegularExpressions.MatchCollection.Count*` and `System.Text.RegularExpressions.MatchCollection.Item*` properties, may involve a performance penalty. As a result, we recommend that you access the collection by using the `System.Collections.IEnumerator` object that is returned by the `System.Text.RegularExpressions.MatchCollection.GetEnumerator*` method. Individual languages provide constructs, such as `For Each` in Visual Basic and `foreach` in C#, that wrap the collection's `System.Collections.IEnumerator` interface.

 The following example uses the `System.Text.RegularExpressions.Regex.Matches(System.String)` method to populate a `System.Text.RegularExpressions.MatchCollection` object with all the matches found in an input string. The example enumerates the collection, copies the matches to a string array, and records the character positions in an integer array.

 ```csharp
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

public class Example
{
   public static void Main()
   {
       MatchCollection matches;
       List<string> results = new List<string>();
       List<int> matchposition = new List<int>();

       // Create a new Regex object and define the regular expression.
       Regex r = new Regex("abc");
       // Use the Matches method to find all matches in the input string.
       matches = r.Matches("123abc4abcd");
       // Enumerate the collection to retrieve all matches and positions.
       foreach (Match match in matches)
       {
          // Add the match string to the string array.
           results.Add(match.Value);
           // Record the character position where the match was found.
           matchposition.Add(match.Index);
       }
       // List the results.
       for (int ctr = 0; ctr < results.Count; ctr++)
         Console.WriteLine($"'{results[ctr]}' found at position {matchposition[ctr]}.");
   }
}
// The example displays the following output:
//       'abc' found at position 3.
//       'abc' found at position 7.
```

### The `Match` class

 The `System.Text.RegularExpressions.Match` class represents the result of a single regular expression match. You can access `System.Text.RegularExpressions.Match` objects in two ways:

- By retrieving them from the `System.Text.RegularExpressions.MatchCollection` object that is returned by the `System.Text.RegularExpressions.Regex.Matches*` method. To retrieve individual `System.Text.RegularExpressions.Match` objects, iterate the collection by using a `foreach` (in C#) or `For Each`...`Next` (in Visual Basic) construct, or use the `System.Text.RegularExpressions.MatchCollection.Item*` property to retrieve a specific `System.Text.RegularExpressions.Match` object either by index or by name. You can also retrieve individual `System.Text.RegularExpressions.Match` objects from the collection by iterating the collection by index, from zero to one less that the number of objects in the collection. However, this method does not take advantage of lazy evaluation, because it accesses the `System.Text.RegularExpressions.MatchCollection.Count` property.

     The following example retrieves individual `System.Text.RegularExpressions.Match` objects from a `System.Text.RegularExpressions.MatchCollection` object by iterating the collection using the `foreach` or `For Each`...`Next` construct. The regular expression simply matches the string "abc" in the input string.

     ```csharp
using System;
using System.Text.RegularExpressions;

public class Example
{
   public static void Main()
   {
      string pattern = "abc";
      string input = "abc123abc456abc789";
      foreach (Match match in Regex.Matches(input, pattern))
         Console.WriteLine($"{match.Value} found at position {match.Index}.");
   }
}
// The example displays the following output:
//       abc found at position 0.
//       abc found at position 6.
//       abc found at position 12.
```

- By calling the `System.Text.RegularExpressions.Regex.Match*` method, which returns a `System.Text.RegularExpressions.Match` object that represents the first match in a string or a portion of a string. You can determine whether the match has been found by retrieving the value of the `Match.Success` property. To retrieve `System.Text.RegularExpressions.Match` objects that represent subsequent matches, call the `System.Text.RegularExpressions.Match.NextMatch*` method repeatedly, until the `Success` property of the returned `System.Text.RegularExpressions.Match` object is `false`.

     The following example uses the `System.Text.RegularExpressions.Regex.Match(System.String,System.String)` and `System.Text.RegularExpressions.Match.NextMatch*` methods to match the string "abc" in the input string.

     ```csharp
using System;
using System.Text.RegularExpressions;

public class Example
{
   public static void Main()
   {
      string pattern = "abc";
      string input = "abc123abc456abc789";
      Match match = Regex.Match(input, pattern);
      while (match.Success)
      {
         Console.WriteLine($"{match.Value} found at position {match.Index}.");
         match = match.NextMatch();
      }
   }
}
// The example displays the following output:
//       abc found at position 0.
//       abc found at position 6.
//       abc found at position 12.
```

 Two properties of the `System.Text.RegularExpressions.Match` class return collection objects:

- The `System.Text.RegularExpressions.Match.Groups` property returns a `System.Text.RegularExpressions.GroupCollection` object that contains information about the substrings that match capturing groups in the regular expression pattern.

- The `Match.Captures` property returns a `System.Text.RegularExpressions.CaptureCollection` object that is of limited use. The collection is not populated for a `System.Text.RegularExpressions.Match` object whose `Success` property is `false`. Otherwise, it contains a single `System.Text.RegularExpressions.Capture` object that has the same information as the `System.Text.RegularExpressions.Match` object.

For more information about these objects, see The `GroupCollection` class and The `CaptureCollection` class sections later in this article.

Two additional properties of the `System.Text.RegularExpressions.Match` class provide information about the match. The `Match.Value` property returns the substring in the input string that matches the regular expression pattern. The `Match.Index` property returns the zero-based starting position of the matched string in the input string.

The `System.Text.RegularExpressions.Match` class also has two pattern-matching methods:

- The `System.Text.RegularExpressions.Match.NextMatch*` method finds the match after the match represented by the current `System.Text.RegularExpressions.Match` object, and returns a `System.Text.RegularExpressions.Match` object that represents that match.

- The `System.Text.RegularExpressions.Match.Result*` method performs a specified replacement operation on the matched string and returns the result.

 The following example uses the `System.Text.RegularExpressions.Match.Result*` method to prepend a $ symbol and a space before every number that includes two fractional digits.

 ```csharp
using System;
using System.Text.RegularExpressions;

public class Example
{
   public static void Main()
   {
      string pattern = @"\b\d+(,\d{3})*\.\d{2}\b";
      string input = "16.32\n194.03\n1,903,672.08";

      foreach (Match match in Regex.Matches(input, pattern))
         Console.WriteLine(match.Result("$$ $&"));
   }
}
// The example displays the following output:
//       $ 16.32
//       $ 194.03
//       $ 1,903,672.08
```

 The regular expression pattern `\b\d+(,\d{3})*\.\d{2}\b` is defined as shown in the following table.

| Pattern     | Description                                                                 |
|-------------|-----------------------------------------------------------------------------|
| `\b`        | Begin the match at a word boundary.                                         |
| `\d+`       | Match one or more decimal digits.                                           |
| `(,\d{3})*` | Match zero or more occurrences of a comma followed by three decimal digits. |
| `\.`        | Match the decimal point character.                                          |
| `\d{2}`     | Match two decimal digits.                                                   |
| `\b`        | End the match at a word boundary.                                           |

 The replacement pattern `$$ $&` indicates that the matched substring should be replaced by a dollar sign ($) symbol (the `$$` pattern), a space, and the value of the match (the `$&` pattern).

## The `GroupCollection` class

 The `System.Text.RegularExpressions.Match.Groups` property returns a `System.Text.RegularExpressions.GroupCollection` object that contains `System.Text.RegularExpressions.Group` objects that represent captured groups in a single match. The first `System.Text.RegularExpressions.Group` object in the collection (at index 0) represents the entire match. Each object that follows represents the results of a single capturing group.

 You can retrieve individual `System.Text.RegularExpressions.Group` objects in the collection by using the `System.Text.RegularExpressions.GroupCollection.Item*` property. You can retrieve unnamed groups by their ordinal position in the collection, and retrieve named groups either by name or by ordinal position. Unnamed captures appear first in the collection, and are indexed from left to right in the order in which they appear in the regular expression pattern. Named captures are indexed after unnamed captures, from left to right in the order in which they appear in the regular expression pattern. To determine what numbered groups are available in the collection returned for a particular regular expression matching method, you can call the instance `System.Text.RegularExpressions.Regex.GetGroupNumbers*` method. To determine what named groups are available in the collection, you can call the instance `System.Text.RegularExpressions.Regex.GetGroupNames*` method. Both methods are particularly useful in general-purpose routines that analyze the matches found by any regular expression.

 The `System.Text.RegularExpressions.GroupCollection.Item*` property is the indexer of the collection in C# and the collection object's default property in Visual Basic. This means that individual `System.Text.RegularExpressions.Group` objects can be accessed by index (or by name, in the case of named groups) as follows:

 ```csharp
﻿using System;
using System.Text.RegularExpressions;

public class Example
{
   public static void Main()
   {
      int ctr = 1;
      Match match = Regex.Match("aaabbbaaacccaaaddd", "(aaa)");
      if (match.Success)
      {
         Group group = match.Groups[ctr];
      }
   }
}
```

 The following example defines a regular expression that uses grouping constructs to capture the month, day, and year of a date.

 ```csharp
using System;
using System.Text.RegularExpressions;

public class Example
{
   public static void Main()
   {
      string pattern = @"\b(\w+)\s(\d{1,2}),\s(\d{4})\b";
      string input = "Born: July 28, 1989";
      Match match = Regex.Match(input, pattern);
      if (match.Success)
         for (int ctr = 0; ctr <  match.Groups.Count; ctr++)
            Console.WriteLine($"Group {ctr}: {match.Groups[ctr].Value}");
    }
}
// The example displays the following output:
//       Group 0: July 28, 1989
//       Group 1: July
//       Group 2: 28
//       Group 3: 1989
```

 The regular expression pattern `\b(\w+)\s(\d{1,2}),\s(\d{4})\b` is defined as shown in the following table.

| Pattern     | Description                                                           |
|-------------|-----------------------------------------------------------------------|
| `\b`        | Begin the match at a word boundary.                                   |
| `(\w+)`     | Match one or more word characters. This is the first capturing group. |
| `\s`        | Match a white-space character.                                        |
| `(\d{1,2})` | Match one or two decimal digits. This is the second capturing group.  |
| `,`         | Match a comma.                                                        |
| `\s`        | Match a white-space character.                                        |
| `(\d{4})`   | Match four decimal digits. This is the third capturing group.         |
| `\b`        | End the match on a word boundary.                                     |
