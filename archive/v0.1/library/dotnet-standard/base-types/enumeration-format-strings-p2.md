---
title: "Enumeration format strings (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/enumeration-format-strings.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Enumeration format strings (part 2 of 2)

## Example

The following example defines an enumeration called `Colors` that consists of three entries: `Red`, `Blue`, and `Green`.

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

After the enumeration is defined, an instance can be declared in the following manner.

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

The `Color.ToString(System.String)` method can then be used to display the enumeration value in different ways, depending on the format specifier passed to it.

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

## See also

- Formatting types
