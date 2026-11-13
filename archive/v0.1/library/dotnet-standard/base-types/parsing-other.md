---
title: "Parsing Other Strings in .NET"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/parsing-other.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Parse other strings in .NET

In addition to numeric and `System.DateTime` strings, you can also parse strings that represent the types `System.Char`, `System.Boolean`, and `System.Enum` into data types.

## Char

 The static parse method associated with the **Char** data type is useful for converting a string that contains a single character into its Unicode value. The following code example parses a string into a Unicode character.

 ```csharp
using System;

class StringsParseMethod
{
    public static void Main()
    {
        string MyString1 = "A";
        char MyChar = Char.Parse(MyString1);
        // MyChar now contains a Unicode "A" character.

        string MyString2 = "True";
        bool MyBool = bool.Parse(MyString2);
        // MyBool now contains a True Boolean value.

        string MyString3 = "Thursday";
        DayOfWeek MyDays = (DayOfWeek)Enum.Parse(typeof(DayOfWeek), MyString3);
        Console.WriteLine(MyDays);
        // The result is Thursday.
    }
}
```

## Boolean

 The **Boolean** data type contains a **Parse** method that you can use to convert a string that represents a Boolean value into an actual **Boolean** type. This method is not case-sensitive and can successfully parse a string containing "True" or "False." The **Parse** method associated with the **Boolean** type can also parse strings that are surrounded by white spaces. If any other string is passed, a `System.FormatException` is thrown.

 The following code example uses the **Parse** method to convert a string into a Boolean value.

 ```csharp
using System;

class StringsParseMethod
{
    public static void Main()
    {
        string MyString1 = "A";
        char MyChar = Char.Parse(MyString1);
        // MyChar now contains a Unicode "A" character.

        string MyString2 = "True";
        bool MyBool = bool.Parse(MyString2);
        // MyBool now contains a True Boolean value.

        string MyString3 = "Thursday";
        DayOfWeek MyDays = (DayOfWeek)Enum.Parse(typeof(DayOfWeek), MyString3);
        Console.WriteLine(MyDays);
        // The result is Thursday.
    }
}
```

## Enumeration

 You can use the static **Parse** method to initialize an enumeration type to the value of a string. This method accepts the enumeration type you are parsing, the string to parse, and an optional Boolean flag indicating whether or not the parse is case-sensitive. The string you are parsing can contain several values separated by commas, which can be preceded or followed by one or more empty spaces (also called white spaces). When the string contains multiple values, the value of the returned object is the value of all specified values combined with a bitwise OR operation.

 The following example uses the **Parse** method to convert a string representation into an enumeration value. The `System.DayOfWeek` enumeration is initialized to **Thursday** from a string.

 ```csharp
using System;

class StringsParseMethod
{
    public static void Main()
    {
        string MyString1 = "A";
        char MyChar = Char.Parse(MyString1);
        // MyChar now contains a Unicode "A" character.

        string MyString2 = "True";
        bool MyBool = bool.Parse(MyString2);
        // MyBool now contains a True Boolean value.

        string MyString3 = "Thursday";
        DayOfWeek MyDays = (DayOfWeek)Enum.Parse(typeof(DayOfWeek), MyString3);
        Console.WriteLine(MyDays);
        // The result is Thursday.
    }
}
```

## See also

- Parsing Strings
- Formatting Types
- Type Conversion in .NET
