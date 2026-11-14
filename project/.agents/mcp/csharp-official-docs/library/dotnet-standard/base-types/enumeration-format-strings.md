---
title: "Enumeration format strings (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/enumeration-format-strings.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Enumeration format strings

You can use the `System.Enum.ToString*` method to create a new string object that represents the numeric, hexadecimal, or string value of an enumeration member. This method takes one of the enumeration formatting strings to specify the value that you want returned.

The following sections list the enumeration formatting strings and the values they return. These format specifiers aren't case-sensitive.

## G or g

Displays the enumeration entry as a string value, if possible, and otherwise displays the integer value of the current instance. If the enumeration is defined with the `System.FlagsAttribute` set, the string values of each valid entry are concatenated together, separated by commas. If the `Flags` attribute isn't set, an invalid value is displayed as a numeric entry. The following example illustrates the `G` format specifier.

```csharp
using System;
using System.IO;

public enum Color { Red = 1, Blue = 2, Green = 3 };

public class Class1
{
   public static void Main()
   {
      ShowGSpecifier();
      ShowFSpecifier();
      ShowDSpecifier();
      ShowXSpecifier();
      ShowExample();
   }

   private static void ShowGSpecifier()
   {
      Console.WriteLine("G Specifier:");
      Console.WriteLine(((DayOfWeek)7).ToString("G"));      // 7
      Console.WriteLine(ConsoleColor.Red.ToString("G"));    // Red

      var attributes = FileAttributes.Hidden | FileAttributes.Archive;
      Console.WriteLine(attributes.ToString("G"));          // Hidden, Archive
      Console.WriteLine();
   }

   private static void ShowFSpecifier()
   {
      Console.WriteLine("F Specifier:");
      Console.WriteLine(((DayOfWeek)7).ToString("F"));       // Monday, Saturday
      Console.WriteLine(ConsoleColor.Blue.ToString("F"));    // Blue

      var attributes = FileAttributes.Hidden | FileAttributes.Archive;
      Console.WriteLine(attributes.ToString("F"));           // Hidden, Archive
      Console.WriteLine();
   }

   private static void ShowDSpecifier()
   {
      Console.WriteLine("D Specifier:");
      Console.WriteLine(((DayOfWeek)7).ToString("D"));       // 7
      Console.WriteLine(ConsoleColor.Cyan.ToString("D"));    // 11

      var attributes = FileAttributes.Hidden | FileAttributes.Archive;
      Console.WriteLine(attributes.ToString("D"));           // 34
      Console.WriteLine();
   }

   private static void ShowXSpecifier()
   {
      Console.WriteLine("X Specifier:");
      Console.WriteLine(((DayOfWeek)7).ToString("X"));       // 00000007
      Console.WriteLine(ConsoleColor.Cyan.ToString("X"));    // 0000000B

      var attributes = FileAttributes.Hidden | FileAttributes.Archive;
      Console.WriteLine(attributes.ToString("X"));           // 00000022
      Console.WriteLine();
   }

   private static void ShowExample()
   {
      Console.WriteLine("Example:");
      Color myColor = Color.Green;

      Console.WriteLine($"The value of myColor is {myColor.ToString("G")}.");
      Console.WriteLine($"The value of myColor is {myColor.ToString("F")}.");
      Console.WriteLine($"The value of myColor is {myColor.ToString("D")}.");
      Console.WriteLine($"The value of myColor is 0x{myColor.ToString("X")}.");
      // The example displays the following output to the console:
      //       The value of myColor is Green.
      //       The value of myColor is Green.
      //       The value of myColor is 3.
      //       The value of myColor is 0x00000003.
   }
}
```

## F or f

Displays the enumeration entry as a string value, if possible. If the value can be displayed as a summation of the entries in the enumeration (even if the `Flags` attribute isn't present), the string values of each valid entry are concatenated together, separated by commas. If the value can't be determined by the enumeration entries, then the value is formatted as the integer value. The following example illustrates the `F` format specifier.

```csharp
using System;
using System.IO;

public enum Color { Red = 1, Blue = 2, Green = 3 };

public class Class1
{
   public static void Main()
   {
      ShowGSpecifier();
      ShowFSpecifier();
      ShowDSpecifier();
      ShowXSpecifier();
      ShowExample();
   }

   private static void ShowGSpecifier()
   {
      Console.WriteLine("G Specifier:");
      Console.WriteLine(((DayOfWeek)7).ToString("G"));      // 7
      Console.WriteLine(ConsoleColor.Red.ToString("G"));    // Red

      var attributes = FileAttributes.Hidden | FileAttributes.Archive;
      Console.WriteLine(attributes.ToString("G"));          // Hidden, Archive
      Console.WriteLine();
   }

   private static void ShowFSpecifier()
   {
      Console.WriteLine("F Specifier:");
      Console.WriteLine(((DayOfWeek)7).ToString("F"));       // Monday, Saturday
      Console.WriteLine(ConsoleColor.Blue.ToString("F"));    // Blue

      var attributes = FileAttributes.Hidden | FileAttributes.Archive;
      Console.WriteLine(attributes.ToString("F"));           // Hidden, Archive
      Console.WriteLine();
   }

   private static void ShowDSpecifier()
   {
      Console.WriteLine("D Specifier:");
      Console.WriteLine(((DayOfWeek)7).ToString("D"));       // 7
      Console.WriteLine(ConsoleColor.Cyan.ToString("D"));    // 11

      var attributes = FileAttributes.Hidden | FileAttributes.Archive;
      Console.WriteLine(attributes.ToString("D"));           // 34
      Console.WriteLine();
   }

   private static void ShowXSpecifier()
   {
      Console.WriteLine("X Specifier:");
      Console.WriteLine(((DayOfWeek)7).ToString("X"));       // 00000007
      Console.WriteLine(ConsoleColor.Cyan.ToString("X"));    // 0000000B

      var attributes = FileAttributes.Hidden | FileAttributes.Archive;
      Console.WriteLine(attributes.ToString("X"));           // 00000022
      Console.WriteLine();
   }

   private static void ShowExample()
   {
      Console.WriteLine("Example:");
      Color myColor = Color.Green;

      Console.WriteLine($"The value of myColor is {myColor.ToString("G")}.");
      Console.WriteLine($"The value of myColor is {myColor.ToString("F")}.");
      Console.WriteLine($"The value of myColor is {myColor.ToString("D")}.");
      Console.WriteLine($"The value of myColor is 0x{myColor.ToString("X")}.");
      // The example displays the following output to the console:
      //       The value of myColor is Green.
      //       The value of myColor is Green.
      //       The value of myColor is 3.
      //       The value of myColor is 0x00000003.
   }
}
```

## D or d

Displays the enumeration entry as an integer value in the shortest representation possible. The following example illustrates the `D` format specifier.

```csharp
using System;
using System.IO;

public enum Color { Red = 1, Blue = 2, Green = 3 };

public class Class1
{
   public static void Main()
   {
      ShowGSpecifier();
      ShowFSpecifier();
      ShowDSpecifier();
      ShowXSpecifier();
      ShowExample();
   }

   private static void ShowGSpecifier()
   {
      Console.WriteLine("G Specifier:");
      Console.WriteLine(((DayOfWeek)7).ToString("G"));      // 7
      Console.WriteLine(ConsoleColor.Red.ToString("G"));    // Red

      var attributes = FileAttributes.Hidden | FileAttributes.Archive;
      Console.WriteLine(attributes.ToString("G"));          // Hidden, Archive
      Console.WriteLine();
   }

   private static void ShowFSpecifier()
   {
      Console.WriteLine("F Specifier:");
      Console.WriteLine(((DayOfWeek)7).ToString("F"));       // Monday, Saturday
      Console.WriteLine(ConsoleColor.Blue.ToString("F"));    // Blue

      var attributes = FileAttributes.Hidden | FileAttributes.Archive;
      Console.WriteLine(attributes.ToString("F"));           // Hidden, Archive
      Console.WriteLine();
   }

   private static void ShowDSpecifier()
   {
      Console.WriteLine("D Specifier:");
      Console.WriteLine(((DayOfWeek)7).ToString("D"));       // 7
      Console.WriteLine(ConsoleColor.Cyan.ToString("D"));    // 11

      var attributes = FileAttributes.Hidden | FileAttributes.Archive;
      Console.WriteLine(attributes.ToString("D"));           // 34
      Console.WriteLine();
   }

   private static void ShowXSpecifier()
   {
      Console.WriteLine("X Specifier:");
      Console.WriteLine(((DayOfWeek)7).ToString("X"));       // 00000007
      Console.WriteLine(ConsoleColor.Cyan.ToString("X"));    // 0000000B

      var attributes = FileAttributes.Hidden | FileAttributes.Archive;
      Console.WriteLine(attributes.ToString("X"));           // 00000022
      Console.WriteLine();
   }

   private static void ShowExample()
   {
      Console.WriteLine("Example:");
      Color myColor = Color.Green;

      Console.WriteLine($"The value of myColor is {myColor.ToString("G")}.");
      Console.WriteLine($"The value of myColor is {myColor.ToString("F")}.");
      Console.WriteLine($"The value of myColor is {myColor.ToString("D")}.");
      Console.WriteLine($"The value of myColor is 0x{myColor.ToString("X")}.");
      // The example displays the following output to the console:
      //       The value of myColor is Green.
      //       The value of myColor is Green.
      //       The value of myColor is 3.
      //       The value of myColor is 0x00000003.
   }
}
```

## X or x

Displays the enumeration entry as a hexadecimal value. The value is represented with leading zeros as necessary, to ensure that the result string has two characters for each byte in the enumeration type's underlying numeric type. The following example illustrates the X format specifier. In the example, the underlying types of `System.DayOfWeek`, `System.ConsoleColor` and `System.IO.FileAttributes` is `System.Int32`, or a 32-bit (or 4-byte) integer, which produces an 8-character result string.

```csharp
using System;
using System.IO;

public enum Color { Red = 1, Blue = 2, Green = 3 };

public class Class1
{
   public static void Main()
   {
      ShowGSpecifier();
      ShowFSpecifier();
      ShowDSpecifier();
      ShowXSpecifier();
      ShowExample();
   }

   private static void ShowGSpecifier()
   {
      Console.WriteLine("G Specifier:");
      Console.WriteLine(((DayOfWeek)7).ToString("G"));      // 7
      Console.WriteLine(ConsoleColor.Red.ToString("G"));    // Red

      var attributes = FileAttributes.Hidden | FileAttributes.Archive;
      Console.WriteLine(attributes.ToString("G"));          // Hidden, Archive
      Console.WriteLine();
   }

   private static void ShowFSpecifier()
   {
      Console.WriteLine("F Specifier:");
      Console.WriteLine(((DayOfWeek)7).ToString("F"));       // Monday, Saturday
      Console.WriteLine(ConsoleColor.Blue.ToString("F"));    // Blue

      var attributes = FileAttributes.Hidden | FileAttributes.Archive;
      Console.WriteLine(attributes.ToString("F"));           // Hidden, Archive
      Console.WriteLine();
   }

   private static void ShowDSpecifier()
   {
      Console.WriteLine("D Specifier:");
      Console.WriteLine(((DayOfWeek)7).ToString("D"));       // 7
      Console.WriteLine(ConsoleColor.Cyan.ToString("D"));    // 11

      var attributes = FileAttributes.Hidden | FileAttributes.Archive;
      Console.WriteLine(attributes.ToString("D"));           // 34
      Console.WriteLine();
   }

   private static void ShowXSpecifier()
   {
      Console.WriteLine("X Specifier:");
      Console.WriteLine(((DayOfWeek)7).ToString("X"));       // 00000007
      Console.WriteLine(ConsoleColor.Cyan.ToString("X"));    // 0000000B

      var attributes = FileAttributes.Hidden | FileAttributes.Archive;
      Console.WriteLine(attributes.ToString("X"));           // 00000022
      Console.WriteLine();
   }

   private static void ShowExample()
   {
      Console.WriteLine("Example:");
      Color myColor = Color.Green;

      Console.WriteLine($"The value of myColor is {myColor.ToString("G")}.");
      Console.WriteLine($"The value of myColor is {myColor.ToString("F")}.");
      Console.WriteLine($"The value of myColor is {myColor.ToString("D")}.");
      Console.WriteLine($"The value of myColor is 0x{myColor.ToString("X")}.");
      // The example displays the following output to the console:
      //       The value of myColor is Green.
      //       The value of myColor is Green.
      //       The value of myColor is 3.
      //       The value of myColor is 0x00000003.
   }
}
```
