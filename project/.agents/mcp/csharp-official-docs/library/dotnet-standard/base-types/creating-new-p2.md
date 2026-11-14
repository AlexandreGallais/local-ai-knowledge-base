---
title: "Creating New Strings (part 2 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/creating-new.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Creating New Strings (part 2 of 3)

## Methods that return strings

The following table lists several useful methods that return new string objects.

| Method name                                                   | Use                                                    |
|---------------------------------------------------------------|--------------------------------------------------------|
| `System.String.Format*`   | Builds a formatted string from a set of input objects. |
| `System.String.Concat*`   | Builds strings from two or more strings.               |
| `System.String.Join*`     | Builds a new string by combining an array of strings.  |
| `System.String.Insert*`   | Builds a new string by inserting a string into the specified index of an existing string. |
| `System.String.CopyTo*`   | Copies specified characters in a string into a specified position in an array of characters. |
| `System.String.Create*`   | Creates a new string of a specified length, populating characters via a callback that receives a writable `System.Span`1` and a caller-supplied state object. |

### `String.Format`

You can use the `String.Format` method to create formatted strings and concatenate strings representing multiple objects. This method automatically converts any passed object into a string. For example, if your application must display an `Int32` value and a `DateTime` value to the user, you can easily construct a string to represent these values using the `Format` method. For information about formatting conventions used with this method, see the section on composite formatting.

The following example uses the `Format` method to create a string that uses an integer variable.

```csharp
using System;

[assembly: CLSCompliant(true)]
public class Class1
{
   public static void Main()
   {
      UseStringFormat();
      Console.WriteLine();
      UseStringConcat();
      Console.WriteLine();
      UseStringJoin();
      Console.WriteLine();
      UseStringInsert();
      Console.WriteLine();
      UseStringCopyTo();
   }

   private static void UseStringFormat()
   {
      int numberOfFleas = 12;
      string miscInfo = String.Format("Your dog has {0} fleas. " +
                                      "It is time to get a flea collar. " +
                                      "The current universal date is: {1:u}.",
                                      numberOfFleas, DateTime.Now);
      Console.WriteLine(miscInfo);
      // The example displays the following output:
      //       Your dog has 12 fleas. It is time to get a flea collar.
      //       The current universal date is: 2008-03-28 13:31:40Z.
   }

   private static void UseStringConcat()
   {
      string helloString1 = "Hello";
      string helloString2 = "World!";
      Console.WriteLine(String.Concat(helloString1, ' ', helloString2));
      // The example displays the following output:
      //      Hello World!
   }

   private static void UseStringJoin()
   {
      string[] words = {"Hello", "and", "welcome", "to", "my" , "world!"};
      Console.WriteLine(String.Join(" ", words));
      // The example displays the following output:
      //      Hello and welcome to my world!
   }

   private static void UseStringInsert()
   {
     string sentence = "Once a time.";
      Console.WriteLine(sentence.Insert(4, " upon"));
      // The example displays the following output:
      //      Once upon a time.
   }

   private static void UseStringCopyTo()
   {
      string greeting = "Hello World!";
      char[] charArray = {'W','h','e','r','e'};
      Console.WriteLine($"The original character array: {new string(charArray)}");
      greeting.CopyTo(0, charArray,0 ,5);
      Console.WriteLine($"The new character array: {new string(charArray)}");
      // The example displays the following output:
      //       The original character array: Where
      //       The new character array: Hello
   }
}
```

In this example, `System.DateTime.Now*` displays the current date and time in a manner specified by the culture associated with the current thread.

### `String.Concat`

The `String.Concat` method can be used to easily create a new string object from two or more existing objects. It provides a language-independent way to concatenate strings. This method accepts any class that derives from `System.Object`. The following example creates a string from two existing string objects and a separating character.

```csharp
using System;

[assembly: CLSCompliant(true)]
public class Class1
{
   public static void Main()
   {
      UseStringFormat();
      Console.WriteLine();
      UseStringConcat();
      Console.WriteLine();
      UseStringJoin();
      Console.WriteLine();
      UseStringInsert();
      Console.WriteLine();
      UseStringCopyTo();
   }

   private static void UseStringFormat()
   {
      int numberOfFleas = 12;
      string miscInfo = String.Format("Your dog has {0} fleas. " +
                                      "It is time to get a flea collar. " +
                                      "The current universal date is: {1:u}.",
                                      numberOfFleas, DateTime.Now);
      Console.WriteLine(miscInfo);
      // The example displays the following output:
      //       Your dog has 12 fleas. It is time to get a flea collar.
      //       The current universal date is: 2008-03-28 13:31:40Z.
   }

   private static void UseStringConcat()
   {
      string helloString1 = "Hello";
      string helloString2 = "World!";
      Console.WriteLine(String.Concat(helloString1, ' ', helloString2));
      // The example displays the following output:
      //      Hello World!
   }

   private static void UseStringJoin()
   {
      string[] words = {"Hello", "and", "welcome", "to", "my" , "world!"};
      Console.WriteLine(String.Join(" ", words));
      // The example displays the following output:
      //      Hello and welcome to my world!
   }

   private static void UseStringInsert()
   {
     string sentence = "Once a time.";
      Console.WriteLine(sentence.Insert(4, " upon"));
      // The example displays the following output:
      //      Once upon a time.
   }

   private static void UseStringCopyTo()
   {
      string greeting = "Hello World!";
      char[] charArray = {'W','h','e','r','e'};
      Console.WriteLine($"The original character array: {new string(charArray)}");
      greeting.CopyTo(0, charArray,0 ,5);
      Console.WriteLine($"The new character array: {new string(charArray)}");
      // The example displays the following output:
      //       The original character array: Where
      //       The new character array: Hello
   }
}
```

### `String.Join`

The `String.Join` method creates a new string from an array of strings and a separator string. This method is useful if you want to concatenate multiple strings together, making a list perhaps separated by a comma.

The following example uses a space to bind a string array.

```csharp
using System;

[assembly: CLSCompliant(true)]
public class Class1
{
   public static void Main()
   {
      UseStringFormat();
      Console.WriteLine();
      UseStringConcat();
      Console.WriteLine();
      UseStringJoin();
      Console.WriteLine();
      UseStringInsert();
      Console.WriteLine();
      UseStringCopyTo();
   }

   private static void UseStringFormat()
   {
      int numberOfFleas = 12;
      string miscInfo = String.Format("Your dog has {0} fleas. " +
                                      "It is time to get a flea collar. " +
                                      "The current universal date is: {1:u}.",
                                      numberOfFleas, DateTime.Now);
      Console.WriteLine(miscInfo);
      // The example displays the following output:
      //       Your dog has 12 fleas. It is time to get a flea collar.
      //       The current universal date is: 2008-03-28 13:31:40Z.
   }

   private static void UseStringConcat()
   {
      string helloString1 = "Hello";
      string helloString2 = "World!";
      Console.WriteLine(String.Concat(helloString1, ' ', helloString2));
      // The example displays the following output:
      //      Hello World!
   }

   private static void UseStringJoin()
   {
      string[] words = {"Hello", "and", "welcome", "to", "my" , "world!"};
      Console.WriteLine(String.Join(" ", words));
      // The example displays the following output:
      //      Hello and welcome to my world!
   }

   private static void UseStringInsert()
   {
     string sentence = "Once a time.";
      Console.WriteLine(sentence.Insert(4, " upon"));
      // The example displays the following output:
      //      Once upon a time.
   }

   private static void UseStringCopyTo()
   {
      string greeting = "Hello World!";
      char[] charArray = {'W','h','e','r','e'};
      Console.WriteLine($"The original character array: {new string(charArray)}");
      greeting.CopyTo(0, charArray,0 ,5);
      Console.WriteLine($"The new character array: {new string(charArray)}");
      // The example displays the following output:
      //       The original character array: Where
      //       The new character array: Hello
   }
}
```

### `String.Insert`

The `String.Insert` method creates a new string by inserting a string into a specified position in another string. This method uses a zero-based index. The following example inserts a string into the fifth index position of `MyString` and creates a new string with this value.

```csharp
using System;

[assembly: CLSCompliant(true)]
public class Class1
{
   public static void Main()
   {
      UseStringFormat();
      Console.WriteLine();
      UseStringConcat();
      Console.WriteLine();
      UseStringJoin();
      Console.WriteLine();
      UseStringInsert();
      Console.WriteLine();
      UseStringCopyTo();
   }

   private static void UseStringFormat()
   {
      int numberOfFleas = 12;
      string miscInfo = String.Format("Your dog has {0} fleas. " +
                                      "It is time to get a flea collar. " +
                                      "The current universal date is: {1:u}.",
                                      numberOfFleas, DateTime.Now);
      Console.WriteLine(miscInfo);
      // The example displays the following output:
      //       Your dog has 12 fleas. It is time to get a flea collar.
      //       The current universal date is: 2008-03-28 13:31:40Z.
   }

   private static void UseStringConcat()
   {
      string helloString1 = "Hello";
      string helloString2 = "World!";
      Console.WriteLine(String.Concat(helloString1, ' ', helloString2));
      // The example displays the following output:
      //      Hello World!
   }

   private static void UseStringJoin()
   {
      string[] words = {"Hello", "and", "welcome", "to", "my" , "world!"};
      Console.WriteLine(String.Join(" ", words));
      // The example displays the following output:
      //      Hello and welcome to my world!
   }

   private static void UseStringInsert()
   {
     string sentence = "Once a time.";
      Console.WriteLine(sentence.Insert(4, " upon"));
      // The example displays the following output:
      //      Once upon a time.
   }

   private static void UseStringCopyTo()
   {
      string greeting = "Hello World!";
      char[] charArray = {'W','h','e','r','e'};
      Console.WriteLine($"The original character array: {new string(charArray)}");
      greeting.CopyTo(0, charArray,0 ,5);
      Console.WriteLine($"The new character array: {new string(charArray)}");
      // The example displays the following output:
      //       The original character array: Where
      //       The new character array: Hello
   }
}
```

### `String.CopyTo`

The `String.CopyTo` method copies portions of a string into an array of characters. You can specify both the beginning index of the string and the number of characters to be copied. This method takes the source index, an array of characters, the destination index, and the number of characters to copy. All indexes are zero-based.

The following example uses the `CopyTo` method to copy the characters of the word "Hello" from a string object to the first index position of an array of characters.

```csharp
using System;

[assembly: CLSCompliant(true)]
public class Class1
{
   public static void Main()
   {
      UseStringFormat();
      Console.WriteLine();
      UseStringConcat();
      Console.WriteLine();
      UseStringJoin();
      Console.WriteLine();
      UseStringInsert();
      Console.WriteLine();
      UseStringCopyTo();
   }

   private static void UseStringFormat()
   {
      int numberOfFleas = 12;
      string miscInfo = String.Format("Your dog has {0} fleas. " +
                                      "It is time to get a flea collar. " +
                                      "The current universal date is: {1:u}.",
                                      numberOfFleas, DateTime.Now);
      Console.WriteLine(miscInfo);
      // The example displays the following output:
      //       Your dog has 12 fleas. It is time to get a flea collar.
      //       The current universal date is: 2008-03-28 13:31:40Z.
   }

   private static void UseStringConcat()
   {
      string helloString1 = "Hello";
      string helloString2 = "World!";
      Console.WriteLine(String.Concat(helloString1, ' ', helloString2));
      // The example displays the following output:
      //      Hello World!
   }

   private static void UseStringJoin()
   {
      string[] words = {"Hello", "and", "welcome", "to", "my" , "world!"};
      Console.WriteLine(String.Join(" ", words));
      // The example displays the following output:
      //      Hello and welcome to my world!
   }

   private static void UseStringInsert()
   {
     string sentence = "Once a time.";
      Console.WriteLine(sentence.Insert(4, " upon"));
      // The example displays the following output:
      //      Once upon a time.
   }

   private static void UseStringCopyTo()
   {
      string greeting = "Hello World!";
      char[] charArray = {'W','h','e','r','e'};
      Console.WriteLine($"The original character array: {new string(charArray)}");
      greeting.CopyTo(0, charArray,0 ,5);
      Console.WriteLine($"The new character array: {new string(charArray)}");
      // The example displays the following output:
      //       The original character array: Where
      //       The new character array: Hello
   }
}
```
