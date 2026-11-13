---
title: "Comparing Strings in .NET (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/comparing.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Compare strings in .NET

.NET provides several methods to compare the values of strings. The following table lists and describes the value-comparison methods.

| Method name | Use |
|--|--|
| `System.String.Compare*` | Compares the values of two strings. Returns an integer value. |
| `System.String.CompareOrdinal*` | Compares two strings without regard to local culture. Returns an integer value. |
| `System.String.CompareTo*` | Compares the current string object to another string. Returns an integer value. |
| `System.String.StartsWith*` | Determines whether a string begins with the string passed. Returns a Boolean value. |
| `System.String.EndsWith*` | Determines whether a string ends with the string passed. Returns a Boolean value. |
| `System.String.Contains*` | Determines whether a character or string occurs within another string. Returns a Boolean value. |
| `System.String.Equals*` | Determines whether two strings are the same. Returns a Boolean value. |
| `System.String.IndexOf*` | Returns the index position of a character or string, starting from the beginning of the string you are examining. Returns an integer value. |
| `System.String.LastIndexOf*` | Returns the index position of a character or string, starting from the end of the string you are examining. Returns an integer value. |

## `Compare` method

The static `System.String.Compare*` method provides a thorough way of comparing two strings. This method is culturally aware. You can use this function to compare two strings or substrings of two strings. Additionally, overloads are provided that regard or disregard case and cultural variance. The following table shows the three integer values that this method might return.

| Return value | Condition |
|--|--|
| A negative integer | The first string precedes the second string in the sort order. -or- The first string is `null`. |
| 0 | The first string and the second string are equal. -or- Both strings are `null`. |
| A positive integer -or- 1 | The first string follows the second string in the sort order. -or- The second string is `null`. |

> **Important:**
> The `System.String.Compare*` method is primarily intended for use when ordering or sorting strings. You should not use the `System.String.Compare*` method to test for equality (that is, to explicitly look for a return value of 0 with no regard for whether one string is less than or greater than the other). Instead, to determine whether two strings are equal, use the `System.String.Equals(System.String,System.String,System.StringComparison)` method.

 The following example uses the `System.String.Compare*` method to determine the relative values of two strings.

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

 This example displays `-1` to the console.

 The preceding example is culture-sensitive by default. To perform a culture-insensitive string comparison, use an overload of the `System.String.Compare*` method that allows you to specify the culture to use by supplying a *culture* parameter. For an example that demonstrates how to use the `System.String.Compare*` method to perform a culture-insensitive comparison, see Culture-insensitive string comparisons.

## `CompareOrdinal` method

The `System.String.CompareOrdinal*` method compares two string objects without considering the local culture. The return values of this method are identical to the values returned by the `Compare` method in the previous table.

> **Important:**
> The `System.String.CompareOrdinal*` method is primarily intended for use when ordering or sorting strings. You should not use the `System.String.CompareOrdinal*` method to test for equality (that is, to explicitly look for a return value of 0 with no regard for whether one string is less than or greater than the other). Instead, to determine whether two strings are equal, use the `System.String.Equals(System.String,System.String,System.StringComparison)` method.

 The following example uses the `CompareOrdinal` method to compare the values of two strings.

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

 This example displays `-32` to the console.

## `CompareTo` method

The `System.String.CompareTo*` method compares the string that the current string object encapsulates to another string or object. The return values of this method are identical to the values returned by the `System.String.Compare*` method in the previous table.

> **Important:**
> The `System.String.CompareTo*` method is primarily intended for use when ordering or sorting strings. You should not use the `System.String.CompareTo*` method to test for equality (that is, to explicitly look for a return value of 0 with no regard for whether one string is less than or greater than the other). Instead, to determine whether two strings are equal, use the `System.String.Equals(System.String,System.String,System.StringComparison)` method.

 The following example uses the `System.String.CompareTo*` method to compare the `string1` object to the `string2` object.

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

 This example displays `-1` to the console.

 All overloads of the `System.String.CompareTo*` method perform culture-sensitive and case-sensitive comparisons by default. No overloads of this method are provided that allow you to perform a culture-insensitive comparison. For code clarity, we recommend that you use the `String.Compare` method instead, specifying `System.Globalization.CultureInfo.CurrentCulture*` for culture-sensitive operations or `System.Globalization.CultureInfo.InvariantCulture*` for culture-insensitive operations. For examples that demonstrate how to use the `String.Compare` method to perform both culture-sensitive and culture-insensitive comparisons, see Performing Culture-Insensitive String Comparisons.
