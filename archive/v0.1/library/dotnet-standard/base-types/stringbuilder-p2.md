---
title: "Using the StringBuilder Class in .NET (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/stringbuilder.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Using the StringBuilder Class in .NET (part 2 of 2)

## Modifying the StringBuilder String

 The following table lists the methods you can use to modify the contents of a **StringBuilder**.

|Method name|Use|
|-----------------|---------|
|`System.Text.StringBuilder.Append*`|Appends information to the end of the current **StringBuilder**.|
|`System.Text.StringBuilder.AppendFormat*`|Replaces a format specifier passed in a string with formatted text.|
|`System.Text.StringBuilder.Insert*`|Inserts a string or object into the specified index of the current **StringBuilder**.|
|`System.Text.StringBuilder.Remove*`|Removes a specified number of characters from the current **StringBuilder**.|
|`System.Text.StringBuilder.Replace*`|Replaces all occurrences of a specified character or string in the current **StringBuilder** with another specified character or string.|

### Append

 The **Append** method can be used to add text or a string representation of an object to the end of a string represented by the current **StringBuilder**. The following example initializes a **StringBuilder** to "Hello World" and then appends some text to the end of the object. Space is allocated automatically as needed.
 ```csharp
using System;
using System.Text;

[assembly: CLSCompliant(true)]
public class Example
{
   public static void Main()
   {
      InstantiateStringBuilder();
      InstantiateWithCapacity();
      Appending();
      AppendingFormat();
      Inserting();
      Removing();
      Replacing();
   }

   private static void InstantiateStringBuilder()
   {
      StringBuilder myStringBuilder = new StringBuilder("Hello World!");
   }

   private static void InstantiateWithCapacity()
   {
      StringBuilder myStringBuilder = new StringBuilder("Hello World!", 25);
      myStringBuilder.Capacity = 25;
   }

   private static void Appending()
   {
      StringBuilder myStringBuilder = new StringBuilder("Hello World!");
      myStringBuilder.Append(" What a beautiful day.");
      Console.WriteLine(myStringBuilder);
      // The example displays the following output:
      //       Hello World! What a beautiful day.
   }

   private static void AppendingFormat()
   {
      int MyInt = 25;
      StringBuilder myStringBuilder = new StringBuilder("Your total is ");
      myStringBuilder.AppendFormat("{0:C} ", MyInt);
      Console.WriteLine(myStringBuilder);
      // The example displays the following output:
      //       Your total is $25.00
   }

   private static void Inserting()
   {
      StringBuilder myStringBuilder = new StringBuilder("Hello World!");
      myStringBuilder.Insert(6,"Beautiful ");
      Console.WriteLine(myStringBuilder);
      // The example displays the following output:
      //       Hello Beautiful World!
   }

   private static void Removing()
   {
      StringBuilder myStringBuilder = new StringBuilder("Hello World!");
      myStringBuilder.Remove(5,7);
      Console.WriteLine(myStringBuilder);
      // The example displays the following output:
      //       Hello
   }

   private static void Replacing()
   {
      StringBuilder myStringBuilder = new StringBuilder("Hello World!");
      myStringBuilder.Replace('!', '?');
      Console.WriteLine(myStringBuilder);
      // The example displays the following output:
      //       Hello World?
   }
}
```

### AppendFormat

 The `System.Text.StringBuilder.AppendFormat*` method adds text to the end of the `System.Text.StringBuilder` object. It supports the composite formatting feature by calling the `System.IFormattable` implementation of the object or objects to be formatted. Therefore, it accepts the standard format strings for numeric, date and time, and enumeration values, the custom format strings for numeric and date and time values, and the format strings defined for custom types. (For information about formatting, see Formatting Types.) You can use this method to customize the format of variables and append those values to a `System.Text.StringBuilder`. The following example uses the `System.Text.StringBuilder.AppendFormat*` method to place an integer value formatted as a currency value at the end of a `System.Text.StringBuilder` object.
 ```csharp
using System;
using System.Text;

[assembly: CLSCompliant(true)]
public class Example
{
   public static void Main()
   {
      InstantiateStringBuilder();
      InstantiateWithCapacity();
      Appending();
      AppendingFormat();
      Inserting();
      Removing();
      Replacing();
   }

   private static void InstantiateStringBuilder()
   {
      StringBuilder myStringBuilder = new StringBuilder("Hello World!");
   }

   private static void InstantiateWithCapacity()
   {
      StringBuilder myStringBuilder = new StringBuilder("Hello World!", 25);
      myStringBuilder.Capacity = 25;
   }

   private static void Appending()
   {
      StringBuilder myStringBuilder = new StringBuilder("Hello World!");
      myStringBuilder.Append(" What a beautiful day.");
      Console.WriteLine(myStringBuilder);
      // The example displays the following output:
      //       Hello World! What a beautiful day.
   }

   private static void AppendingFormat()
   {
      int MyInt = 25;
      StringBuilder myStringBuilder = new StringBuilder("Your total is ");
      myStringBuilder.AppendFormat("{0:C} ", MyInt);
      Console.WriteLine(myStringBuilder);
      // The example displays the following output:
      //       Your total is $25.00
   }

   private static void Inserting()
   {
      StringBuilder myStringBuilder = new StringBuilder("Hello World!");
      myStringBuilder.Insert(6,"Beautiful ");
      Console.WriteLine(myStringBuilder);
      // The example displays the following output:
      //       Hello Beautiful World!
   }

   private static void Removing()
   {
      StringBuilder myStringBuilder = new StringBuilder("Hello World!");
      myStringBuilder.Remove(5,7);
      Console.WriteLine(myStringBuilder);
      // The example displays the following output:
      //       Hello
   }

   private static void Replacing()
   {
      StringBuilder myStringBuilder = new StringBuilder("Hello World!");
      myStringBuilder.Replace('!', '?');
      Console.WriteLine(myStringBuilder);
      // The example displays the following output:
      //       Hello World?
   }
}
```

### Insert

 The `System.Text.StringBuilder.Insert*` method adds a string or object to a specified position in the current `System.Text.StringBuilder` object. The following example uses this method to insert a word into the sixth position of a `System.Text.StringBuilder` object.
 ```csharp
using System;
using System.Text;

[assembly: CLSCompliant(true)]
public class Example
{
   public static void Main()
   {
      InstantiateStringBuilder();
      InstantiateWithCapacity();
      Appending();
      AppendingFormat();
      Inserting();
      Removing();
      Replacing();
   }

   private static void InstantiateStringBuilder()
   {
      StringBuilder myStringBuilder = new StringBuilder("Hello World!");
   }

   private static void InstantiateWithCapacity()
   {
      StringBuilder myStringBuilder = new StringBuilder("Hello World!", 25);
      myStringBuilder.Capacity = 25;
   }

   private static void Appending()
   {
      StringBuilder myStringBuilder = new StringBuilder("Hello World!");
      myStringBuilder.Append(" What a beautiful day.");
      Console.WriteLine(myStringBuilder);
      // The example displays the following output:
      //       Hello World! What a beautiful day.
   }

   private static void AppendingFormat()
   {
      int MyInt = 25;
      StringBuilder myStringBuilder = new StringBuilder("Your total is ");
      myStringBuilder.AppendFormat("{0:C} ", MyInt);
      Console.WriteLine(myStringBuilder);
      // The example displays the following output:
      //       Your total is $25.00
   }

   private static void Inserting()
   {
      StringBuilder myStringBuilder = new StringBuilder("Hello World!");
      myStringBuilder.Insert(6,"Beautiful ");
      Console.WriteLine(myStringBuilder);
      // The example displays the following output:
      //       Hello Beautiful World!
   }

   private static void Removing()
   {
      StringBuilder myStringBuilder = new StringBuilder("Hello World!");
      myStringBuilder.Remove(5,7);
      Console.WriteLine(myStringBuilder);
      // The example displays the following output:
      //       Hello
   }

   private static void Replacing()
   {
      StringBuilder myStringBuilder = new StringBuilder("Hello World!");
      myStringBuilder.Replace('!', '?');
      Console.WriteLine(myStringBuilder);
      // The example displays the following output:
      //       Hello World?
   }
}
```

### Remove

 You can use the **Remove** method to remove a specified number of characters from the current `System.Text.StringBuilder` object, beginning at a specified zero-based index. The following example uses the **Remove** method to shorten a `System.Text.StringBuilder` object.
 ```csharp
using System;
using System.Text;

[assembly: CLSCompliant(true)]
public class Example
{
   public static void Main()
   {
      InstantiateStringBuilder();
      InstantiateWithCapacity();
      Appending();
      AppendingFormat();
      Inserting();
      Removing();
      Replacing();
   }

   private static void InstantiateStringBuilder()
   {
      StringBuilder myStringBuilder = new StringBuilder("Hello World!");
   }

   private static void InstantiateWithCapacity()
   {
      StringBuilder myStringBuilder = new StringBuilder("Hello World!", 25);
      myStringBuilder.Capacity = 25;
   }

   private static void Appending()
   {
      StringBuilder myStringBuilder = new StringBuilder("Hello World!");
      myStringBuilder.Append(" What a beautiful day.");
      Console.WriteLine(myStringBuilder);
      // The example displays the following output:
      //       Hello World! What a beautiful day.
   }

   private static void AppendingFormat()
   {
      int MyInt = 25;
      StringBuilder myStringBuilder = new StringBuilder("Your total is ");
      myStringBuilder.AppendFormat("{0:C} ", MyInt);
      Console.WriteLine(myStringBuilder);
      // The example displays the following output:
      //       Your total is $25.00
   }

   private static void Inserting()
   {
      StringBuilder myStringBuilder = new StringBuilder("Hello World!");
      myStringBuilder.Insert(6,"Beautiful ");
      Console.WriteLine(myStringBuilder);
      // The example displays the following output:
      //       Hello Beautiful World!
   }

   private static void Removing()
   {
      StringBuilder myStringBuilder = new StringBuilder("Hello World!");
      myStringBuilder.Remove(5,7);
      Console.WriteLine(myStringBuilder);
      // The example displays the following output:
      //       Hello
   }

   private static void Replacing()
   {
      StringBuilder myStringBuilder = new StringBuilder("Hello World!");
      myStringBuilder.Replace('!', '?');
      Console.WriteLine(myStringBuilder);
      // The example displays the following output:
      //       Hello World?
   }
}
```

### Replace

 The **Replace** method can be used to replace characters within the `System.Text.StringBuilder` object with another specified character. The following example uses the **Replace** method to search a `System.Text.StringBuilder` object for all instances of the exclamation point character (!) and replace them with the question mark character (?).
 ```csharp
using System;
using System.Text;

[assembly: CLSCompliant(true)]
public class Example
{
   public static void Main()
   {
      InstantiateStringBuilder();
      InstantiateWithCapacity();
      Appending();
      AppendingFormat();
      Inserting();
      Removing();
      Replacing();
   }

   private static void InstantiateStringBuilder()
   {
      StringBuilder myStringBuilder = new StringBuilder("Hello World!");
   }

   private static void InstantiateWithCapacity()
   {
      StringBuilder myStringBuilder = new StringBuilder("Hello World!", 25);
      myStringBuilder.Capacity = 25;
   }

   private static void Appending()
   {
      StringBuilder myStringBuilder = new StringBuilder("Hello World!");
      myStringBuilder.Append(" What a beautiful day.");
      Console.WriteLine(myStringBuilder);
      // The example displays the following output:
      //       Hello World! What a beautiful day.
   }

   private static void AppendingFormat()
   {
      int MyInt = 25;
      StringBuilder myStringBuilder = new StringBuilder("Your total is ");
      myStringBuilder.AppendFormat("{0:C} ", MyInt);
      Console.WriteLine(myStringBuilder);
      // The example displays the following output:
      //       Your total is $25.00
   }

   private static void Inserting()
   {
      StringBuilder myStringBuilder = new StringBuilder("Hello World!");
      myStringBuilder.Insert(6,"Beautiful ");
      Console.WriteLine(myStringBuilder);
      // The example displays the following output:
      //       Hello Beautiful World!
   }

   private static void Removing()
   {
      StringBuilder myStringBuilder = new StringBuilder("Hello World!");
      myStringBuilder.Remove(5,7);
      Console.WriteLine(myStringBuilder);
      // The example displays the following output:
      //       Hello
   }

   private static void Replacing()
   {
      StringBuilder myStringBuilder = new StringBuilder("Hello World!");
      myStringBuilder.Replace('!', '?');
      Console.WriteLine(myStringBuilder);
      // The example displays the following output:
      //       Hello World?
   }
}
```

## Converting a StringBuilder Object to a String

 You must convert the `System.Text.StringBuilder` object to a `System.String` object before you can pass the string represented by the `System.Text.StringBuilder` object to a method that has a `System.String` parameter or display it in the user interface. You do this conversion by calling the `System.Text.StringBuilder.ToString*` method. The following example calls a number of `System.Text.StringBuilder` methods and then calls the `System.Text.StringBuilder.ToString` method to display the string.

 ```csharp
using System;
using System.Text;

public class Example
{
   public static void Main()
   {
      StringBuilder sb = new StringBuilder();
      bool flag = true;
      string[] spellings = { "recieve", "receeve", "receive" };
      sb.AppendFormat("Which of the following spellings is {0}:", flag);
      sb.AppendLine();
      for (int ctr = 0; ctr <= spellings.GetUpperBound(0); ctr++) {
         sb.AppendFormat("   {0}. {1}", ctr, spellings[ctr]);
         sb.AppendLine();
      }
      sb.AppendLine();
      Console.WriteLine(sb.ToString());
   }
}
// The example displays the following output:
//       Which of the following spellings is True:
//          0. recieve
//          1. receeve
//          2. receive
```

## See also

- `System.Text.StringBuilder`
- Formatting Types
