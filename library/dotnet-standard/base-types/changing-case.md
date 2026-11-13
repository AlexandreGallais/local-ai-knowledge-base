---
title: "Changing case in .NET"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/changing-case.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Change case in .NET

If you write an application that accepts input from a user, you can never be sure what case (upper or lower) they will use to enter the data. Often, you want strings to be cased consistently, particularly if you are displaying them in the user interface. The following table describes three case-changing methods. The first two methods provide an overload that accepts a culture.

| Method name | Use |
|--|--|
| `System.String.ToUpper*` | Converts all characters in a string to uppercase. |
| `System.String.ToLower*` | Converts all characters in a string to lowercase. |
| `System.Globalization.TextInfo.ToTitleCase*` | Converts a string to title case. |

> **Warning:**
> The `System.String.ToUpper*` and `System.String.ToLower*` methods should not be used to convert strings in order to compare them or test them for equality. For more information, see the Compare strings of mixed case section.

## Compare strings of mixed case

To compare strings of mixed case to determine their ordering, call one of the overloads of the `System.String.CompareTo*` method with a `comparisonType` parameter, and provide a value of either `System.StringComparison.CurrentCultureIgnoreCase`, `System.StringComparison.InvariantCultureIgnoreCase`, or `System.StringComparison.OrdinalIgnoreCase` for the `comparisonType` argument. For a comparison using a specific culture other than the current culture, call an overload of the `System.String.CompareTo*` method with both a `culture` and `options` parameter, and provide a value of `System.Globalization.CompareOptions.IgnoreCase` as the `options` argument.

To compare strings of mixed case to determine whether they're equal, call one of the overloads of the `System.String.Equals*` method with a `comparisonType` parameter, and provide a value of either `System.StringComparison.CurrentCultureIgnoreCase`, `System.StringComparison.InvariantCultureIgnoreCase`, or `System.StringComparison.OrdinalIgnoreCase` for the `comparisonType` argument.

For more information, see Best practices for using strings.

## `ToUpper` method

The `System.String.ToUpper*` method changes all characters in a string to uppercase. The following example converts the string "Hello World!" from mixed case to uppercase.

```csharp
﻿using System;

[assembly: CLSCompliant(true)]
public class Example
{
   public static void Main()
   {
      ConvertToUpperCase();
      Console.WriteLine();
      ConvertToLowerCase();
   }

   private static void ConvertToUpperCase()
   {
      string properString = "Hello World!";
      Console.WriteLine(properString.ToUpper());
      // This example displays the following output:
      //       HELLO WORLD!
   }

   private static void ConvertToLowerCase()
   {
      string properString = "Hello World!";
      Console.WriteLine(properString.ToLower());
      // This example displays the following output:
      //       hello world!
   }
}
```

The preceding example is culture-sensitive by default; it applies the casing conventions of the current culture. To perform a culture-insensitive case change or to apply the casing conventions of a particular culture, use the `System.String.ToUpper(System.Globalization.CultureInfo)` method overload and supply a value of `System.Globalization.CultureInfo.InvariantCulture*` or a `System.Globalization.CultureInfo` object that represents the specified culture to the `culture` parameter. For an example that demonstrates how to use the `System.String.ToUpper*` method to perform a culture-insensitive case change, see Perform culture-insensitive case changes.

## `ToLower` method

The `System.String.ToLower*` method is similar to the previous method, but instead converts all the characters in a string to lowercase. The following example converts the string "Hello World!" to lowercase.

```csharp
﻿using System;

[assembly: CLSCompliant(true)]
public class Example
{
   public static void Main()
   {
      ConvertToUpperCase();
      Console.WriteLine();
      ConvertToLowerCase();
   }

   private static void ConvertToUpperCase()
   {
      string properString = "Hello World!";
      Console.WriteLine(properString.ToUpper());
      // This example displays the following output:
      //       HELLO WORLD!
   }

   private static void ConvertToLowerCase()
   {
      string properString = "Hello World!";
      Console.WriteLine(properString.ToLower());
      // This example displays the following output:
      //       hello world!
   }
}
```

The preceding example is culture-sensitive by default; it applies the casing conventions of the current culture. To perform a culture-insensitive case change or to apply the casing conventions of a particular culture, use the `System.String.ToLower(System.Globalization.CultureInfo)` method overload and supply a value of `System.Globalization.CultureInfo.InvariantCulture*` or a `System.Globalization.CultureInfo` object that represents the specified culture to the `culture` parameter. For an example that demonstrates how to use the `System.String.ToLower(System.Globalization.CultureInfo)` method to perform a culture-insensitive case change, see Perform culture-insensitive case changes.

## `ToTitleCase` method

The `System.Globalization.TextInfo.ToTitleCase*` converts the first character of each word to uppercase and the remaining characters to lowercase. However, words that are entirely uppercase are assumed to be acronyms and are not converted.

The `System.Globalization.TextInfo.ToTitleCase*` method is culture-sensitive; that is, it uses the casing conventions of a particular culture. In order to call the method, you first retrieve the `System.Globalization.TextInfo` object that represents the casing conventions of the particular culture from the `System.Globalization.CultureInfo.TextInfo` property of a particular culture.

The following example passes each string in an array to the `System.Globalization.TextInfo.ToTitleCase*` method. The strings include proper title strings as well as acronyms. The strings are converted to title case by using the casing conventions of the English (United States) culture.

```csharp
using System;
using System.Globalization;

public class Example
{
   public static void Main()
   {
      string[] values = { "a tale of two cities", "gROWL to the rescue",
                          "inside the US government", "sports and MLB baseball",
                          "The Return of Sherlock Holmes", "UNICEF and children"};

      TextInfo ti = CultureInfo.CurrentCulture.TextInfo;
      foreach (var value in values)
         Console.WriteLine($"{value} --> {ti.ToTitleCase(value)}");
   }
}
// The example displays the following output:
//    a tale of two cities --> A Tale Of Two Cities
//    gROWL to the rescue --> Growl To The Rescue
//    inside the US government --> Inside The US Government
//    sports and MLB baseball --> Sports And MLB Baseball
//    The Return of Sherlock Holmes --> The Return Of Sherlock Holmes
//    UNICEF and children --> UNICEF And Children
```

Note that although it is culture-sensitive, the `System.Globalization.TextInfo.ToTitleCase*` method does not provide linguistically correct casing rules. For instance, in the previous example, the method converts "a tale of two cities" to "A Tale Of Two Cities". However, the linguistically correct title casing for the en-US culture is "A Tale of Two Cities."

## See also

- Perform culture-insensitive string operations
