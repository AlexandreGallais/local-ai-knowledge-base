---
title: "Using the StringBuilder Class in .NET (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/stringbuilder.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Using the StringBuilder Class in .NET

The `System.String` object is immutable. Every time you use one of the methods in the `System.String` class, you create a new string object in memory, which requires a new allocation of space for that new object. In situations where you need to perform repeated modifications to a string, the overhead associated with creating a new `System.String` object can be costly. The `System.Text.StringBuilder` class can be used when you want to modify a string without creating a new object. For example, using the `System.Text.StringBuilder` class can boost performance when concatenating many strings together in a loop.

## Importing the System.Text Namespace

 The `System.Text.StringBuilder` class is found in the `System.Text` namespace.  To avoid having to provide a fully qualified type name in your code,  you can import the `System.Text` namespace:
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

## Instantiating a StringBuilder Object

 You can create a new instance of the `System.Text.StringBuilder` class by initializing your variable with one of the overloaded constructor methods, as illustrated in the following example.
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

## Setting the Capacity and Length

 Although the `System.Text.StringBuilder` is a dynamic object that allows you to expand the number of characters in the string that it encapsulates, you can specify a value for the maximum number of characters that it can hold. This value is called the capacity of the object and should not be confused with the length of the string that the current `System.Text.StringBuilder` holds. For example, you might create a new instance of the `System.Text.StringBuilder` class with the string "Hello", which has a length of 5, and you might specify that the object has a maximum capacity of 25. When you modify the `System.Text.StringBuilder`, it does not reallocate size for itself until the capacity is reached. When this occurs, the new space is allocated automatically and the capacity is doubled. You can specify the capacity of the `System.Text.StringBuilder` class using one of the overloaded constructors. The following example specifies that the `myStringBuilder` object can be expanded to a maximum of 25 spaces.
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

 Additionally, you can use the read/write `System.Text.StringBuilder.Capacity` property to set the maximum length of your object. The following example uses the **Capacity** property to define the maximum object length.
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

 The `System.Text.StringBuilder.EnsureCapacity*` method can be used to check the capacity of the current **StringBuilder**. If the capacity is greater than the passed value, no change is made; however, if the capacity is smaller than the passed value, the current capacity is changed to match the passed value.

 The `System.Text.StringBuilder.Length` property can also be viewed or set. If you set the **Length** property to a value that is greater than the **Capacity** property, the **Capacity** property is automatically changed to the same value as the **Length** property. Setting the **Length** property to a value that is less than the length of the string within the current **StringBuilder** shortens the string.
