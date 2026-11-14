---
title: "Comparing Strings in .NET (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/comparing.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Comparing Strings in .NET (part 2 of 2)

## `Equals` method

The `System.String.Equals*` method can easily determine if two strings are the same. This case-sensitive method returns a `true` or `false` Boolean value. It can be used from an existing class, as illustrated in the next example. The following example uses the `Equals` method to determine whether a string object contains the phrase "Hello World".

 ```csharp
using System;

class Example
{
    public static void Main()
    {
        Compare();
        CompareOrdinal();
        Console.Write("CompareTo: ");
        CompareTo();
        Console.Write("Equals: ");
        Equals1();
        Equals2();
        StartsWith();
        EndsWith();
        IndexOf();
        LastIndexOf();
    }

    public static void Compare()
    {
        string string1 = "Hello World!";
        Console.WriteLine(String.Compare(string1, "Hello World?"));
    }

    public static void CompareOrdinal()
    {
        string string1 = "Hello World!";
        Console.WriteLine(String.CompareOrdinal(string1, "hello world!"));
    }

    public static void CompareTo()
    {
        string string1 = "Hello World";
        string string2 = "Hello World!";
        int MyInt = string1.CompareTo(string2);
        Console.WriteLine( MyInt );
    }

    public static void Equals1()
    {
        string string1 = "Hello World";
        Console.WriteLine(string1.Equals("Hello World"));
    }

    public static void Equals2()
    {
        string string1 = "Hello World";
        string string2 = "Hello World";
        Console.WriteLine(String.Equals(string1, string2));
    }

    public static void StartsWith()
    {
        string string1 = "Hello World";
        Console.WriteLine(string1.StartsWith("Hello"));
    }

    public static void EndsWith()
    {
        string string1 = "Hello World";
        Console.WriteLine(string1.EndsWith("Hello"));
    }

    public static void IndexOf()
    {
        string string1 = "Hello World";
        Console.WriteLine(string1.IndexOf('l'));
    }

    public static void LastIndexOf()
    {
        string string1 = "Hello World";
        Console.WriteLine(string1.LastIndexOf('l'));
    }
}
```

 This example displays `True` to the console.

 This method can also be used as a static method. The following example compares two string objects using a static method.

 ```csharp
using System;

class Example
{
    public static void Main()
    {
        Compare();
        CompareOrdinal();
        Console.Write("CompareTo: ");
        CompareTo();
        Console.Write("Equals: ");
        Equals1();
        Equals2();
        StartsWith();
        EndsWith();
        IndexOf();
        LastIndexOf();
    }

    public static void Compare()
    {
        string string1 = "Hello World!";
        Console.WriteLine(String.Compare(string1, "Hello World?"));
    }

    public static void CompareOrdinal()
    {
        string string1 = "Hello World!";
        Console.WriteLine(String.CompareOrdinal(string1, "hello world!"));
    }

    public static void CompareTo()
    {
        string string1 = "Hello World";
        string string2 = "Hello World!";
        int MyInt = string1.CompareTo(string2);
        Console.WriteLine( MyInt );
    }

    public static void Equals1()
    {
        string string1 = "Hello World";
        Console.WriteLine(string1.Equals("Hello World"));
    }

    public static void Equals2()
    {
        string string1 = "Hello World";
        string string2 = "Hello World";
        Console.WriteLine(String.Equals(string1, string2));
    }

    public static void StartsWith()
    {
        string string1 = "Hello World";
        Console.WriteLine(string1.StartsWith("Hello"));
    }

    public static void EndsWith()
    {
        string string1 = "Hello World";
        Console.WriteLine(string1.EndsWith("Hello"));
    }

    public static void IndexOf()
    {
        string string1 = "Hello World";
        Console.WriteLine(string1.IndexOf('l'));
    }

    public static void LastIndexOf()
    {
        string string1 = "Hello World";
        Console.WriteLine(string1.LastIndexOf('l'));
    }
}
```

 This example displays `True` to the console.

## `StartsWith` and `EndsWith` methods

You can use the `System.String.StartsWith*` method to determine whether a string object begins with the same characters that encompass <example-value> string. This case-sensitive method returns `true` if the current string object begins with the passed string and `false` if it does not. The following example uses this method to determine if a string object begins with "Hello".

 ```csharp
using System;

class Example
{
    public static void Main()
    {
        Compare();
        CompareOrdinal();
        Console.Write("CompareTo: ");
        CompareTo();
        Console.Write("Equals: ");
        Equals1();
        Equals2();
        StartsWith();
        EndsWith();
        IndexOf();
        LastIndexOf();
    }

    public static void Compare()
    {
        string string1 = "Hello World!";
        Console.WriteLine(String.Compare(string1, "Hello World?"));
    }

    public static void CompareOrdinal()
    {
        string string1 = "Hello World!";
        Console.WriteLine(String.CompareOrdinal(string1, "hello world!"));
    }

    public static void CompareTo()
    {
        string string1 = "Hello World";
        string string2 = "Hello World!";
        int MyInt = string1.CompareTo(string2);
        Console.WriteLine( MyInt );
    }

    public static void Equals1()
    {
        string string1 = "Hello World";
        Console.WriteLine(string1.Equals("Hello World"));
    }

    public static void Equals2()
    {
        string string1 = "Hello World";
        string string2 = "Hello World";
        Console.WriteLine(String.Equals(string1, string2));
    }

    public static void StartsWith()
    {
        string string1 = "Hello World";
        Console.WriteLine(string1.StartsWith("Hello"));
    }

    public static void EndsWith()
    {
        string string1 = "Hello World";
        Console.WriteLine(string1.EndsWith("Hello"));
    }

    public static void IndexOf()
    {
        string string1 = "Hello World";
        Console.WriteLine(string1.IndexOf('l'));
    }

    public static void LastIndexOf()
    {
        string string1 = "Hello World";
        Console.WriteLine(string1.LastIndexOf('l'));
    }
}
```

 This example displays `True` to the console.

 The `System.String.EndsWith*` method compares a passed string to the characters that exist at the end of the current string object. It also returns a Boolean value. The following example checks the end of a string using the `EndsWith` method.

 ```csharp
using System;

class Example
{
    public static void Main()
    {
        Compare();
        CompareOrdinal();
        Console.Write("CompareTo: ");
        CompareTo();
        Console.Write("Equals: ");
        Equals1();
        Equals2();
        StartsWith();
        EndsWith();
        IndexOf();
        LastIndexOf();
    }

    public static void Compare()
    {
        string string1 = "Hello World!";
        Console.WriteLine(String.Compare(string1, "Hello World?"));
    }

    public static void CompareOrdinal()
    {
        string string1 = "Hello World!";
        Console.WriteLine(String.CompareOrdinal(string1, "hello world!"));
    }

    public static void CompareTo()
    {
        string string1 = "Hello World";
        string string2 = "Hello World!";
        int MyInt = string1.CompareTo(string2);
        Console.WriteLine( MyInt );
    }

    public static void Equals1()
    {
        string string1 = "Hello World";
        Console.WriteLine(string1.Equals("Hello World"));
    }

    public static void Equals2()
    {
        string string1 = "Hello World";
        string string2 = "Hello World";
        Console.WriteLine(String.Equals(string1, string2));
    }

    public static void StartsWith()
    {
        string string1 = "Hello World";
        Console.WriteLine(string1.StartsWith("Hello"));
    }

    public static void EndsWith()
    {
        string string1 = "Hello World";
        Console.WriteLine(string1.EndsWith("Hello"));
    }

    public static void IndexOf()
    {
        string string1 = "Hello World";
        Console.WriteLine(string1.IndexOf('l'));
    }

    public static void LastIndexOf()
    {
        string string1 = "Hello World";
        Console.WriteLine(string1.LastIndexOf('l'));
    }
}
```

 This example displays `False` to the console.

## `IndexOf` and `LastIndexOf` methods

You can use the `System.String.IndexOf*` method to determine the position of the first occurrence of a particular character within a string. This case-sensitive method starts counting from the beginning of a string and returns the position of a passed character using a zero-based index. If the character cannot be found, a value of –1 is returned.

The following example uses the `IndexOf` method to search for the first occurrence of the '`l`' character in a string.

 ```csharp
using System;

class Example
{
    public static void Main()
    {
        Compare();
        CompareOrdinal();
        Console.Write("CompareTo: ");
        CompareTo();
        Console.Write("Equals: ");
        Equals1();
        Equals2();
        StartsWith();
        EndsWith();
        IndexOf();
        LastIndexOf();
    }

    public static void Compare()
    {
        string string1 = "Hello World!";
        Console.WriteLine(String.Compare(string1, "Hello World?"));
    }

    public static void CompareOrdinal()
    {
        string string1 = "Hello World!";
        Console.WriteLine(String.CompareOrdinal(string1, "hello world!"));
    }

    public static void CompareTo()
    {
        string string1 = "Hello World";
        string string2 = "Hello World!";
        int MyInt = string1.CompareTo(string2);
        Console.WriteLine( MyInt );
    }

    public static void Equals1()
    {
        string string1 = "Hello World";
        Console.WriteLine(string1.Equals("Hello World"));
    }

    public static void Equals2()
    {
        string string1 = "Hello World";
        string string2 = "Hello World";
        Console.WriteLine(String.Equals(string1, string2));
    }

    public static void StartsWith()
    {
        string string1 = "Hello World";
        Console.WriteLine(string1.StartsWith("Hello"));
    }

    public static void EndsWith()
    {
        string string1 = "Hello World";
        Console.WriteLine(string1.EndsWith("Hello"));
    }

    public static void IndexOf()
    {
        string string1 = "Hello World";
        Console.WriteLine(string1.IndexOf('l'));
    }

    public static void LastIndexOf()
    {
        string string1 = "Hello World";
        Console.WriteLine(string1.LastIndexOf('l'));
    }
}
```

 This example displays `2` to the console.

 The `System.String.LastIndexOf*` method is similar to the `String.IndexOf` method except that it returns the position of the last occurrence of a particular character within a string. It is case-sensitive and uses a zero-based index.

 The following example uses the `LastIndexOf` method to search for the last occurrence of the '`l`' character in a string.

 ```csharp
using System;

class Example
{
    public static void Main()
    {
        Compare();
        CompareOrdinal();
        Console.Write("CompareTo: ");
        CompareTo();
        Console.Write("Equals: ");
        Equals1();
        Equals2();
        StartsWith();
        EndsWith();
        IndexOf();
        LastIndexOf();
    }

    public static void Compare()
    {
        string string1 = "Hello World!";
        Console.WriteLine(String.Compare(string1, "Hello World?"));
    }

    public static void CompareOrdinal()
    {
        string string1 = "Hello World!";
        Console.WriteLine(String.CompareOrdinal(string1, "hello world!"));
    }

    public static void CompareTo()
    {
        string string1 = "Hello World";
        string string2 = "Hello World!";
        int MyInt = string1.CompareTo(string2);
        Console.WriteLine( MyInt );
    }

    public static void Equals1()
    {
        string string1 = "Hello World";
        Console.WriteLine(string1.Equals("Hello World"));
    }

    public static void Equals2()
    {
        string string1 = "Hello World";
        string string2 = "Hello World";
        Console.WriteLine(String.Equals(string1, string2));
    }

    public static void StartsWith()
    {
        string string1 = "Hello World";
        Console.WriteLine(string1.StartsWith("Hello"));
    }

    public static void EndsWith()
    {
        string string1 = "Hello World";
        Console.WriteLine(string1.EndsWith("Hello"));
    }

    public static void IndexOf()
    {
        string string1 = "Hello World";
        Console.WriteLine(string1.IndexOf('l'));
    }

    public static void LastIndexOf()
    {
        string string1 = "Hello World";
        Console.WriteLine(string1.LastIndexOf('l'));
    }
}
```

 This example displays `9` to the console.

 Both methods are useful when used in conjunction with the `System.String.Remove*` method. You can use either the `IndexOf` or `LastIndexOf` methods to retrieve the position of a character, and then supply that position to the `Remove` method in order to remove a character or a word that begins with that character.

## See also

- Best practices for using strings in .NET
- Perform culture-insensitive string operations
- Sorting weight tables - used by .NET Framework and .NET Core 1.0-3.1 on Windows
- Default Unicode collation element table - used by .NET 5 on all platforms, and by .NET Core on Linux and macOS
