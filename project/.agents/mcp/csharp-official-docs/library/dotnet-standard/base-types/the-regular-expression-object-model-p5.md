---
title: "The Regular Expression Object Model (part 5 of 5)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/the-regular-expression-object-model.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# The Regular Expression Object Model (part 5 of 5)

## The `Capture` class

 The `System.Text.RegularExpressions.Capture` class contains the results from a single subexpression capture. The `System.Text.RegularExpressions.Capture.Value` property contains the matched text, and the `System.Text.RegularExpressions.Capture.Index` property indicates the zero-based position in the input string at which the matched substring begins.

 The following example parses an input string for the temperature of selected cities. A comma (",") is used to separate a city and its temperature, and a semicolon (";") is used to separate each city's data. The entire input string represents a single match. In the regular expression pattern `((\w+(\s\w+)*),(\d+);)+`, which is used to parse the string, the city name is assigned to the second capturing group, and the temperature is assigned to the fourth capturing group.

 ```csharp
using System;
using System.Text.RegularExpressions;

public class Example
{
   public static void Main()
   {
      string input = "Miami,78;Chicago,62;New York,67;San Francisco,59;Seattle,58;";
      string pattern = @"((\w+(\s\w+)*),(\d+);)+";
      Match match = Regex.Match(input, pattern);
      if (match.Success)
      {
         Console.WriteLine("Current temperatures:");
         for (int ctr = 0; ctr < match.Groups[2].Captures.Count; ctr++)
            Console.WriteLine("{0,-20} {1,3}", match.Groups[2].Captures[ctr].Value,
                              match.Groups[4].Captures[ctr].Value);
      }
   }
}
// The example displays the following output:
//       Current temperatures:
//       Miami                 78
//       Chicago               62
//       New York              67
//       San Francisco         59
//       Seattle               58
```

 The regular expression is defined as shown in the following table.

|Pattern|Description|
|-------------|-----------------|
|`\w+`|Match one or more word characters.|
|`(\s\w+)*`|Match zero or more occurrences of a white-space character followed by one or more word characters. This pattern matches multi-word city names. This is the third capturing group.|
|`(\w+(\s\w+)*)`|Match one or more word characters followed by zero or more occurrences of a white-space character and one or more word characters. This is the second capturing group.|
|`,`|Match a comma.|
|`(\d+)`|Match one or more digits. This is the fourth capturing group.|
|`;`|Match a semicolon.|
|`((\w+(\s\w+)*),(\d+);)+`|Match the pattern of a word followed by any additional words followed by a comma, one or more digits, and a semicolon, one or more times. This is the first capturing group.|

## See also

- `System.Text.RegularExpressions`
- .NET Regular Expressions
- Regular Expression Language - Quick Reference
