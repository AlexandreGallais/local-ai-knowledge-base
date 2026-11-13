---
title: "Overview: How to format numbers, dates, enums, and other types in .NET (part 1 of 5)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/formatting-types.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Overview: How to format numbers, dates, enums, and other types in .NET

Formatting is the process of converting an instance of a class or structure, or an enumeration value, to a string representation. The purpose is to display the resulting string to users or to deserialize it later to restore the original data type. This article introduces the formatting mechanisms that .NET provides.

> **Note:**
> Parsing is the inverse of formatting. A parsing operation creates an instance of a data type from its string representation. For more information, see Parsing Strings. For information about serialization and deserialization, see Serialization in .NET.

The basic mechanism for formatting is the default implementation of the `System.Object.ToString*` method, which is discussed in the Default Formatting Using the ToString Method section later in this article. However, .NET provides several ways to modify and extend its default formatting support. These include the following:

- Overriding the `System.Object.ToString*` method to define a custom string representation of an object's value. For more information, see the Override the ToString Method section later in this article.

- Defining format specifiers that enable the string representation of an object's value to take multiple forms. For example, the "X" format specifier in the following statement converts an integer to the string representation of a hexadecimal value.

     ```csharp
﻿using System;

public class Example15
{
   public static void Main()
   {
      int integerValue = 60312;
      Console.WriteLine(integerValue.ToString("X"));   // Displays EB98.

      double cost = 1632.54;
      Console.WriteLine(cost.ToString("C",
                        new System.Globalization.CultureInfo("en-US")));
      // The example displays the following output:
      //       $1,632.54
   }
}
```

     For more information about format specifiers, see the ToString Method and Format Strings section.

- Using format providers to implement the formatting conventions of a specific culture. For example, the following statement displays a currency value by using the formatting conventions of the en-US culture.

     ```csharp
﻿using System;

public class Example15
{
   public static void Main()
   {
      int integerValue = 60312;
      Console.WriteLine(integerValue.ToString("X"));   // Displays EB98.

      double cost = 1632.54;
      Console.WriteLine(cost.ToString("C",
                        new System.Globalization.CultureInfo("en-US")));
      // The example displays the following output:
      //       $1,632.54
   }
}
```

     For more information about formatting with format providers, see the Format Providers section.

- Implementing the `System.IFormattable` interface to support both string conversion with the `System.Convert` class and composite formatting. For more information, see the IFormattable Interface section.

- Using composite formatting to embed the string representation of a value in a larger string. For more information, see the Composite Formatting section.

- Using string interpolation, a more readable syntax to embed the string representation of a value in a larger string. For more information, see String interpolation.

- Implementing `System.ICustomFormatter` and `System.IFormatProvider` to provide a complete custom formatting solution. For more information, see the Custom Formatting with ICustomFormatter section.

The following sections examine these methods for converting an object to its string representation.

## Default formatting using the ToString method

Every type that is derived from `System.Object` automatically inherits a parameterless `ToString` method, which returns the name of the type by default. The following example illustrates the default `ToString` method. It defines a class named `Automobile` that has no implementation. When the class is instantiated and its `ToString` method is called, it displays its type name. The `ToString` method isn't explicitly called in the example. The `System.Console.WriteLine(System.Object)` method implicitly calls the `ToString` method of the object passed to it as an argument.

```csharp
using System;

public class Automobile
{
   // No implementation. All members are inherited from Object.
}

public class Example9
{
   public static void Main()
   {
      Automobile firstAuto = new Automobile();
      Console.WriteLine(firstAuto);
   }
}
// The example displays the following output:
//       Automobile
```

> **Warning:**
> Starting with Windows 8.1, the Windows Runtime includes an `Windows.Foundation.IStringable` interface with a single method, IStringable.ToString, which provides default formatting support. However, we recommend that managed types don't implement the `IStringable` interface. For more information, see The Windows Runtime and the IStringable Interface.

Because all types other than interfaces are derived from `System.Object`, this functionality is automatically provided to your custom classes or structures. However, the functionality offered by the default `ToString` method, is limited: Although it identifies the type, it fails to provide any information about an instance of the type. To provide a string representation of an object that provides information about that object, you must override the `ToString` method.

> **Note:**
> Structures inherit from `System.ValueType`, which in turn is derived from `System.Object`. Although `System.ValueType` overrides `System.Object.ToString*`, its implementation is identical.

## Override the ToString method

Displaying the name of a type is often of limited use and doesn't allow consumers of your types to differentiate one instance from another. However, you can override the `ToString` method to provide a more useful representation of an object's value. The following example defines a `Temperature` object and overrides its `ToString` method to display the temperature in degrees Celsius.

```csharp
﻿namespace HotAndCold2
{
    public class Temperature
    {
        private decimal temp;

        public Temperature(decimal temperature)
        {
            this.temp = temperature;
        }

        public override string ToString()
        {
            return this.temp.ToString("N1") + "°C";
        }
    }

    public class Example12
    {
        public static void Main()
        {
            Temperature currentTemperature = new Temperature(23.6m);
            Console.WriteLine($"The current temperature is {currentTemperature}");
        }
    }
    // The example displays the following output:
    //       The current temperature is 23.6°C.
}
```

In .NET, the `ToString` method of each primitive value type has been overridden to display the object's value instead of its name. The following table shows the override for each primitive type. Most of the overridden methods call another overload of the `ToString` method and pass it the "G" format specifier, which defines the general format for its type, and an `System.IFormatProvider` object that represents the current culture.

|Type|ToString override|
|----------|-----------------------|
|`System.Boolean`|Returns either `System.Boolean.TrueString` or `System.Boolean.FalseString`.|
|`System.Byte`|Calls `Byte.ToString("G", NumberFormatInfo.CurrentInfo)` to format the `System.Byte` value for the current culture.|
|`System.Char`|Returns the character as a string.|
|`System.DateTime`|Calls `DateTime.ToString("G", DatetimeFormatInfo.CurrentInfo)` to format the date and time value for the current culture.|
|`System.Decimal`|Calls `Decimal.ToString("G", NumberFormatInfo.CurrentInfo)` to format the `System.Decimal` value for the current culture.|
|`System.Double`|Calls `Double.ToString("G", NumberFormatInfo.CurrentInfo)` to format the `System.Double` value for the current culture.|
|`System.Int16`|Calls `Int16.ToString("G", NumberFormatInfo.CurrentInfo)` to format the `System.Int16` value for the current culture.|
|`System.Int32`|Calls `Int32.ToString("G", NumberFormatInfo.CurrentInfo)` to format the `System.Int32` value for the current culture.|
|`System.Int64`|Calls `Int64.ToString("G", NumberFormatInfo.CurrentInfo)` to format the `System.Int64` value for the current culture.|
|`System.SByte`|Calls `SByte.ToString("G", NumberFormatInfo.CurrentInfo)` to format the `System.SByte` value for the current culture.|
|`System.Single`|Calls `Single.ToString("G", NumberFormatInfo.CurrentInfo)` to format the `System.Single` value for the current culture.|
|`System.UInt16`|Calls `UInt16.ToString("G", NumberFormatInfo.CurrentInfo)` to format the `System.UInt16` value for the current culture.|
|`System.UInt32`|Calls `UInt32.ToString("G", NumberFormatInfo.CurrentInfo)` to format the `System.UInt32` value for the current culture.|
|`System.UInt64`|Calls `UInt64.ToString("G", NumberFormatInfo.CurrentInfo)` to format the `System.UInt64` value for the current culture.|
