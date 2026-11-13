---
title: "Padding Strings in .NET"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/padding.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Pad strings in .NET

Use one of the following `System.String` methods to create a new string that consists of an original string that is padded with leading or trailing characters to a specified total length. The padding character can be a space or a specified character. The resulting string appears to be either right-aligned or left-aligned. If the original string's length is already equal to or greater than the desired total length, the padding methods return the original string unchanged; for more information, see the **Returns** sections of the two overloads of the `System.String.PadLeft*` and `System.String.PadRight*` methods.

|Method name|Use|
|-----------------|---------|
|`System.String.PadLeft*`|Pads a string with leading characters to a specified total length.|
|`System.String.PadRight*`|Pads a string with trailing characters to a specified total length.|

## PadLeft

 The `System.String.PadLeft*` method creates a new string by concatenating enough leading pad characters to an original string to achieve a specified total length. The `System.String.PadLeft(System.Int32)` method uses white space as the padding character and the `System.String.PadLeft(System.Int32,System.Char)` method enables you to specify your own padding character.

 The following code example uses the `System.String.PadLeft*` method to create a new string that is twenty characters long. The example displays "`--------Hello World!`" to the console.

 ```csharp
using System;

class Example
{
    public static void Main()
    {
        PadLeft();
        PadRight();
    }

    public static void PadLeft()
    {
        string MyString = "Hello World!";
        Console.WriteLine(MyString.PadLeft(20, '-'));
    }

    public static void PadRight()
    {
        string MyString = "Hello World!";
        Console.WriteLine(MyString.PadRight(20, '-'));
    }
}
```

## PadRight

 The `System.String.PadRight*` method creates a new string by concatenating enough trailing pad characters to an original string to achieve a specified total length. The `System.String.PadRight(System.Int32)` method uses white space as the padding character and the `System.String.PadRight(System.Int32,System.Char)` method enables you to specify your own padding character.

 The following code example uses the `System.String.PadRight*` method to create a new string that is twenty characters long. The example displays "`Hello World!--------`" to the console.

 ```csharp
using System;

class Example
{
    public static void Main()
    {
        PadLeft();
        PadRight();
    }

    public static void PadLeft()
    {
        string MyString = "Hello World!";
        Console.WriteLine(MyString.PadLeft(20, '-'));
    }

    public static void PadRight()
    {
        string MyString = "Hello World!";
        Console.WriteLine(MyString.PadRight(20, '-'));
    }
}
```
