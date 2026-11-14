---
title: "Trimming and Removing Characters from Strings in .NET"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/trimming.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Trim and remove characters from strings in .NET

If you're parsing a sentence into individual words, you might end up with words that have blank spaces (also called white spaces) on either end of the word. In this situation, you can use one of the trim methods in the `System.String` class to remove any number of spaces or other characters from a specified position in the string. The following table describes the available trim methods:

|Method name|Use|
|-----------------|---------|
|`System.String.Trim*`|Removes white spaces or characters specified in an array of characters from the beginning and end of a string.|
|`System.String.TrimEnd*`|Removes characters specified in an array of characters from the end of a string.|
|`System.String.TrimStart*`|Removes characters specified in an array of characters from the beginning of a string.|
|`System.String.Remove*`|Removes a specified number of characters from a specified index position in a string.|

## Trim

 You can easily remove white spaces from both ends of a string by using the `System.String.Trim*` method, as shown in the following example:
 ```csharp
using System;

class Example
{
    public static void Main()
    {
        Trim();
        TrimEnd1();
        TrimEnd2();
        TrimStart();
        Remove();
    }

    public static void Trim()
    {
        string MyString = " Big   ";
        Console.WriteLine($"Hello{MyString}World!");
        string TrimString = MyString.Trim();
        Console.WriteLine($"Hello{TrimString}World!");
        //       The example displays the following output:
        //             Hello Big   World!
        //             HelloBigWorld!
    }

    public static void TrimEnd1()
    {
        string MyString = "Hello World!";
        char[] MyChar = {'r','o','W','l','d','!',' '};
        string NewString = MyString.TrimEnd(MyChar);
        Console.WriteLine(NewString);
    }

    public static void TrimEnd2()
    {
        string MyString = "Hello, World!";
        char[] MyChar = {'r','o','W','l','d','!',' '};
        string NewString = MyString.TrimEnd(MyChar);
        Console.WriteLine(NewString);
    }

    public static void TrimStart()
    {
        string MyString = "Hello World!";
        char[] MyChar = {'e', 'H','l','o',' ' };
        string NewString = MyString.TrimStart(MyChar);
        Console.WriteLine(NewString);
    }

    public static void Remove()
    {
        string MyString = "Hello Beautiful World!";
        Console.WriteLine(MyString.Remove(5,10));
        // The example displays the following output:
        //         Hello World!
    }
}
```

 You can also remove characters that you specify in a character array from the beginning and end of a string. The following example removes white-space characters, periods, and asterisks:

 ```csharp
using System;

public class Example
{
   public static void Main()
   {
      String header = "* A Short String. *";
      Console.WriteLine(header);
      Console.WriteLine(header.Trim( new Char[] { ' ', '*', '.' } ));
   }
}
// The example displays the following output:
//       * A Short String. *
//       A Short String
```

## TrimEnd

 The `String.TrimEnd` method removes characters from the end of a string, creating a new string object. An array of characters is passed to this method to specify the characters to be removed. The order of the elements in the character array doesn't affect the trim operation. The trim stops when a character not specified in the array is found.

 The following example removes the last letters of a string using the `TrimEnd` method. In this example, the position of the `'r'` character and the `'W'` character are reversed to illustrate that the order of characters in the array doesn't matter. Notice that this code removes the last word of `MyString` plus part of the first.
 ```csharp
using System;

class Example
{
    public static void Main()
    {
        Trim();
        TrimEnd1();
        TrimEnd2();
        TrimStart();
        Remove();
    }

    public static void Trim()
    {
        string MyString = " Big   ";
        Console.WriteLine($"Hello{MyString}World!");
        string TrimString = MyString.Trim();
        Console.WriteLine($"Hello{TrimString}World!");
        //       The example displays the following output:
        //             Hello Big   World!
        //             HelloBigWorld!
    }

    public static void TrimEnd1()
    {
        string MyString = "Hello World!";
        char[] MyChar = {'r','o','W','l','d','!',' '};
        string NewString = MyString.TrimEnd(MyChar);
        Console.WriteLine(NewString);
    }

    public static void TrimEnd2()
    {
        string MyString = "Hello, World!";
        char[] MyChar = {'r','o','W','l','d','!',' '};
        string NewString = MyString.TrimEnd(MyChar);
        Console.WriteLine(NewString);
    }

    public static void TrimStart()
    {
        string MyString = "Hello World!";
        char[] MyChar = {'e', 'H','l','o',' ' };
        string NewString = MyString.TrimStart(MyChar);
        Console.WriteLine(NewString);
    }

    public static void Remove()
    {
        string MyString = "Hello Beautiful World!";
        Console.WriteLine(MyString.Remove(5,10));
        // The example displays the following output:
        //         Hello World!
    }
}
```

 This code displays `He` to the console.

 The following example removes the last word of a string using the `TrimEnd` method. In this code, a comma follows the word `Hello` and because the comma isn't specified in the array of characters to trim, the trim ends at the comma.
 ```csharp
using System;

class Example
{
    public static void Main()
    {
        Trim();
        TrimEnd1();
        TrimEnd2();
        TrimStart();
        Remove();
    }

    public static void Trim()
    {
        string MyString = " Big   ";
        Console.WriteLine($"Hello{MyString}World!");
        string TrimString = MyString.Trim();
        Console.WriteLine($"Hello{TrimString}World!");
        //       The example displays the following output:
        //             Hello Big   World!
        //             HelloBigWorld!
    }

    public static void TrimEnd1()
    {
        string MyString = "Hello World!";
        char[] MyChar = {'r','o','W','l','d','!',' '};
        string NewString = MyString.TrimEnd(MyChar);
        Console.WriteLine(NewString);
    }

    public static void TrimEnd2()
    {
        string MyString = "Hello, World!";
        char[] MyChar = {'r','o','W','l','d','!',' '};
        string NewString = MyString.TrimEnd(MyChar);
        Console.WriteLine(NewString);
    }

    public static void TrimStart()
    {
        string MyString = "Hello World!";
        char[] MyChar = {'e', 'H','l','o',' ' };
        string NewString = MyString.TrimStart(MyChar);
        Console.WriteLine(NewString);
    }

    public static void Remove()
    {
        string MyString = "Hello Beautiful World!";
        Console.WriteLine(MyString.Remove(5,10));
        // The example displays the following output:
        //         Hello World!
    }
}
```

 This code displays `Hello,` to the console.

## TrimStart

 The `String.TrimStart` method is similar to the `String.TrimEnd` method except that it creates a new string by removing characters from the beginning of an existing string object. An array of characters is passed to the `TrimStart` method to specify the characters to be removed. As with the `TrimEnd` method, the order of the elements in the character array doesn't affect the trim operation. The trim stops when a character not specified in the array is found.

 The following example removes the first word of a string. In this example, the position of the `'l'` character and the `'H'` character are reversed to illustrate that the order of characters in the array doesn't matter.
 ```csharp
using System;

class Example
{
    public static void Main()
    {
        Trim();
        TrimEnd1();
        TrimEnd2();
        TrimStart();
        Remove();
    }

    public static void Trim()
    {
        string MyString = " Big   ";
        Console.WriteLine($"Hello{MyString}World!");
        string TrimString = MyString.Trim();
        Console.WriteLine($"Hello{TrimString}World!");
        //       The example displays the following output:
        //             Hello Big   World!
        //             HelloBigWorld!
    }

    public static void TrimEnd1()
    {
        string MyString = "Hello World!";
        char[] MyChar = {'r','o','W','l','d','!',' '};
        string NewString = MyString.TrimEnd(MyChar);
        Console.WriteLine(NewString);
    }

    public static void TrimEnd2()
    {
        string MyString = "Hello, World!";
        char[] MyChar = {'r','o','W','l','d','!',' '};
        string NewString = MyString.TrimEnd(MyChar);
        Console.WriteLine(NewString);
    }

    public static void TrimStart()
    {
        string MyString = "Hello World!";
        char[] MyChar = {'e', 'H','l','o',' ' };
        string NewString = MyString.TrimStart(MyChar);
        Console.WriteLine(NewString);
    }

    public static void Remove()
    {
        string MyString = "Hello Beautiful World!";
        Console.WriteLine(MyString.Remove(5,10));
        // The example displays the following output:
        //         Hello World!
    }
}
```

 This code displays `World!` to the console.

## Remove

 The `System.String.Remove*` method removes a specified number of characters that begin at a specified position in an existing string. This method assumes a zero-based index.

 The following example removes 10 characters from a string beginning at position five of a zero-based index of the string.
 ```csharp
using System;

class Example
{
    public static void Main()
    {
        Trim();
        TrimEnd1();
        TrimEnd2();
        TrimStart();
        Remove();
    }

    public static void Trim()
    {
        string MyString = " Big   ";
        Console.WriteLine($"Hello{MyString}World!");
        string TrimString = MyString.Trim();
        Console.WriteLine($"Hello{TrimString}World!");
        //       The example displays the following output:
        //             Hello Big   World!
        //             HelloBigWorld!
    }

    public static void TrimEnd1()
    {
        string MyString = "Hello World!";
        char[] MyChar = {'r','o','W','l','d','!',' '};
        string NewString = MyString.TrimEnd(MyChar);
        Console.WriteLine(NewString);
    }

    public static void TrimEnd2()
    {
        string MyString = "Hello, World!";
        char[] MyChar = {'r','o','W','l','d','!',' '};
        string NewString = MyString.TrimEnd(MyChar);
        Console.WriteLine(NewString);
    }

    public static void TrimStart()
    {
        string MyString = "Hello World!";
        char[] MyChar = {'e', 'H','l','o',' ' };
        string NewString = MyString.TrimStart(MyChar);
        Console.WriteLine(NewString);
    }

    public static void Remove()
    {
        string MyString = "Hello Beautiful World!";
        Console.WriteLine(MyString.Remove(5,10));
        // The example displays the following output:
        //         Hello World!
    }
}
```

## Replace

 You can also remove a specified character or substring from a string by calling the `System.String.Replace(System.String,System.String)` method and specifying an empty string (`System.String.Empty`) as the replacement. The following example removes all commas from a string:

 ```csharp
using System;

public class Example
{
   public static void Main()
   {
      String phrase = "a cold, dark night";
      Console.WriteLine($"Before: {phrase}");
      phrase = phrase.Replace(",", "");
      Console.WriteLine($"After: {phrase}");
   }
}
// The example displays the following output:
//       Before: a cold, dark night
//       After: a cold dark night
```
