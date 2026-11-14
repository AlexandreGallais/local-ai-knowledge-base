---
title: "Regular Expression Example: Changing Date Formats"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/regular-expression-example-changing-date-formats.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Regular Expression Example: Changing Date Formats

The following code example uses the `System.Text.RegularExpressions.Regex.Replace*` method to replace dates that have the form *mm*/*dd*/*yy* with dates that have the form *dd*-*mm*-*yy*.

> **Warning:**
> Unrestricted use of `System.Text.RegularExpressions` with untrusted input can subject applications to denial-of-service attacks. Consult Best practices for regular expressions in .NET for guidance on how to safely use .NET regular expressions with untrusted input.

## Example

 ```csharp
using System;
using System.Globalization;
using System.Text.RegularExpressions;

public class Class1
{
   public static void Main()
   {
      string dateString = DateTime.Today.ToString("d",
                                        DateTimeFormatInfo.InvariantInfo);
      string resultString = MDYToDMY(dateString);
      Console.WriteLine($"Converted {dateString} to {resultString}.");
   }

   static string MDYToDMY(string input)
   {
      try {
         return Regex.Replace(input,
                @"\b(?<month>\d{1,2})/(?<day>\d{1,2})/(?<year>\d{2,4})\b",
               "${day}-${month}-${year}", RegexOptions.None,
               TimeSpan.FromMilliseconds(150));
      }
      catch (RegexMatchTimeoutException) {
         return input;
      }
   }
}
// The example displays the following output to the console if run on 8/21/2007:
//      Converted 08/21/2007 to 21-08-2007.
```

 The following code shows how the `MDYToDMY` method can be called in an application.

 ```csharp
using System;
using System.Globalization;
using System.Text.RegularExpressions;

public class Class1
{
   public static void Main()
   {
      string dateString = DateTime.Today.ToString("d",
                                        DateTimeFormatInfo.InvariantInfo);
      string resultString = MDYToDMY(dateString);
      Console.WriteLine($"Converted {dateString} to {resultString}.");
   }

   static string MDYToDMY(string input)
   {
      try {
         return Regex.Replace(input,
                @"\b(?<month>\d{1,2})/(?<day>\d{1,2})/(?<year>\d{2,4})\b",
               "${day}-${month}-${year}", RegexOptions.None,
               TimeSpan.FromMilliseconds(150));
      }
      catch (RegexMatchTimeoutException) {
         return input;
      }
   }
}
// The example displays the following output to the console if run on 8/21/2007:
//      Converted 08/21/2007 to 21-08-2007.
```

## Comments

 The regular expression pattern  `\b(?<month>\d{1,2})/(?<day>\d{1,2})/(?<year>\d{2,4})\b` is interpreted as shown in the following table.

|Pattern|Description|
|-------------|-----------------|
|`\b`|Begin the match at a word boundary.|
|`(?<month>\d{1,2})`|Match one or two decimal digits. This is the `month` captured group.|
|`/`|Match the slash mark.|
|`(?<day>\d{1,2})`|Match one or two decimal digits. This is the `day` captured group.|
|`/`|Match the slash mark.|
|`(?<year>\d{2,4})`|Match from two to four decimal digits. This is the `year` captured group.|
|`\b`|End the match at a word boundary.|

 The pattern `${day}-${month}-${year}` defines the replacement string as shown in the following table.

|Pattern|Description|
|-------------|-----------------|
|`$(day)`|Add the string captured by the `day` capturing group.|
|`-`|Add a hyphen.|
|`$(month)`|Add the string captured by the `month` capturing group.|
|`-`|Add a hyphen.|
|`$(year)`|Add the string captured by the `year` capturing group.|

## See also

- .NET Regular Expressions
