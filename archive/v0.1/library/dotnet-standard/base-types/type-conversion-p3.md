---
title: "Type Conversion in .NET (part 3 of 6)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/type-conversion.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Type Conversion in .NET (part 3 of 6)

If a particular language compiler supports custom overloaded operators, you can also define explicit conversions in your own custom types. The following example provides a partial implementation of a signed byte data type named `ByteWithSign` that uses sign-and-magnitude representation. It supports explicit conversion of `System.Int32` and `System.UInt32` values to `ByteWithSign` values.

 ```csharp
using System;

public class Example2
{
    public static void Main()
    {
        PerformIntegerConversion();
        Console.WriteLine("-----");
        PerformCustomConversion();
        Console.WriteLine("-----");
        CheckedAndUnchecked();
    }

    private static void PerformIntegerConversion()
    {
        long number1 = int.MaxValue + 20L;
        uint number2 = int.MaxValue - 1000;
        ulong number3 = int.MaxValue;

        int intNumber;

        try
        {
            intNumber = checked((int)number1);
            Console.WriteLine("After assigning a {0} value, the Integer value is {1}.",
                              number1.GetType().Name, intNumber);
        }
        catch (OverflowException)
        {
            if (number1 > int.MaxValue)
                Console.WriteLine($"Conversion failed: {number1} exceeds {int.MaxValue}.");
            else
                Console.WriteLine($"Conversion failed: {number1} is less than {int.MinValue}.");
        }

        try
        {
            intNumber = checked((int)number2);
            Console.WriteLine("After assigning a {0} value, the Integer value is {1}.",
                              number2.GetType().Name, intNumber);
        }
        catch (OverflowException)
        {
            Console.WriteLine($"Conversion failed: {number2} exceeds {int.MaxValue}.");
        }

        try
        {
            intNumber = checked((int)number3);
            Console.WriteLine("After assigning a {0} value, the Integer value is {1}.",
                              number3.GetType().Name, intNumber);
        }
        catch (OverflowException)
        {
            Console.WriteLine($"Conversion failed: {number1} exceeds {int.MaxValue}.");
        }

        // The example displays the following output:
        //    Conversion failed: 2147483667 exceeds 2147483647.
        //    After assigning a UInt32 value, the Integer value is 2147482647.
        //    After assigning a UInt64 value, the Integer value is 2147483647.
    }

    private static void PerformCustomConversion()
    {
        ByteWithSignE value;

        try
        {
            int intValue = -120;
            value = (ByteWithSignE)intValue;
            Console.WriteLine(value);
        }
        catch (OverflowException e)
        {
            Console.WriteLine(e.Message);
        }

        try
        {
            uint uintValue = 1024;
            value = (ByteWithSignE)uintValue;
            Console.WriteLine(value);
        }
        catch (OverflowException e)
        {
            Console.WriteLine(e.Message);
        }
        // The example displays the following output:
        //       -120
        //       '1024' is out of range of the ByteWithSignE data type.
    }

    private static void CheckedAndUnchecked()
    {
        int largeValue = Int32.MaxValue;
        byte newValue;

        try
        {
            newValue = unchecked((byte)largeValue);
            Console.WriteLine($"Converted the {largeValue.GetType().Name} value {largeValue} to the {newValue.GetType().Name} value {newValue}.");
        }
        catch (OverflowException)
        {
            Console.WriteLine($"{largeValue} is outside the range of the Byte data type.");
        }

        try
        {
            newValue = checked((byte)largeValue);
            Console.WriteLine($"Converted the {largeValue.GetType().Name} value {largeValue} to the {newValue.GetType().Name} value {newValue}.");
        }
        catch (OverflowException)
        {
            Console.WriteLine($"{largeValue} is outside the range of the Byte data type.");
        }
        // The example displays the following output:
        //    Converted the Int32 value 2147483647 to the Byte value 255.
        //    2147483647 is outside the range of the Byte data type.
    }
}

public struct ByteWithSignE
{
    private SByte signValue;
    private Byte value;

    private const byte MaxValue = byte.MaxValue;
    private const int MinValue = -1 * byte.MaxValue;

    public static explicit operator ByteWithSignE(int value)
    {
        // Check for overflow.
        if (value > ByteWithSignE.MaxValue || value < ByteWithSignE.MinValue)
            throw new OverflowException(String.Format("'{0}' is out of range of the ByteWithSignE data type.",
                                                      value));

        ByteWithSignE newValue;
        newValue.signValue = (SByte)Math.Sign(value);
        newValue.value = (byte)Math.Abs(value);
        return newValue;
    }

    public static explicit operator ByteWithSignE(uint value)
    {
        if (value > ByteWithSignE.MaxValue)
            throw new OverflowException(String.Format("'{0}' is out of range of the ByteWithSignE data type.",
                                                      value));

        ByteWithSignE newValue;
        newValue.signValue = 1;
        newValue.value = (byte)value;
        return newValue;
    }

    public override string ToString()
    {
        return (signValue * value).ToString();
    }
}
```

 Client code can then declare a `ByteWithSign` variable and assign it `System.Int32` and `System.UInt32` values if the assignments include a casting operator or a conversion method, as the following example shows.

 ```csharp
using System;

public class Example2
{
    public static void Main()
    {
        PerformIntegerConversion();
        Console.WriteLine("-----");
        PerformCustomConversion();
        Console.WriteLine("-----");
        CheckedAndUnchecked();
    }

    private static void PerformIntegerConversion()
    {
        long number1 = int.MaxValue + 20L;
        uint number2 = int.MaxValue - 1000;
        ulong number3 = int.MaxValue;

        int intNumber;

        try
        {
            intNumber = checked((int)number1);
            Console.WriteLine("After assigning a {0} value, the Integer value is {1}.",
                              number1.GetType().Name, intNumber);
        }
        catch (OverflowException)
        {
            if (number1 > int.MaxValue)
                Console.WriteLine($"Conversion failed: {number1} exceeds {int.MaxValue}.");
            else
                Console.WriteLine($"Conversion failed: {number1} is less than {int.MinValue}.");
        }

        try
        {
            intNumber = checked((int)number2);
            Console.WriteLine("After assigning a {0} value, the Integer value is {1}.",
                              number2.GetType().Name, intNumber);
        }
        catch (OverflowException)
        {
            Console.WriteLine($"Conversion failed: {number2} exceeds {int.MaxValue}.");
        }

        try
        {
            intNumber = checked((int)number3);
            Console.WriteLine("After assigning a {0} value, the Integer value is {1}.",
                              number3.GetType().Name, intNumber);
        }
        catch (OverflowException)
        {
            Console.WriteLine($"Conversion failed: {number1} exceeds {int.MaxValue}.");
        }

        // The example displays the following output:
        //    Conversion failed: 2147483667 exceeds 2147483647.
        //    After assigning a UInt32 value, the Integer value is 2147482647.
        //    After assigning a UInt64 value, the Integer value is 2147483647.
    }

    private static void PerformCustomConversion()
    {
        ByteWithSignE value;

        try
        {
            int intValue = -120;
            value = (ByteWithSignE)intValue;
            Console.WriteLine(value);
        }
        catch (OverflowException e)
        {
            Console.WriteLine(e.Message);
        }

        try
        {
            uint uintValue = 1024;
            value = (ByteWithSignE)uintValue;
            Console.WriteLine(value);
        }
        catch (OverflowException e)
        {
            Console.WriteLine(e.Message);
        }
        // The example displays the following output:
        //       -120
        //       '1024' is out of range of the ByteWithSignE data type.
    }

    private static void CheckedAndUnchecked()
    {
        int largeValue = Int32.MaxValue;
        byte newValue;

        try
        {
            newValue = unchecked((byte)largeValue);
            Console.WriteLine($"Converted the {largeValue.GetType().Name} value {largeValue} to the {newValue.GetType().Name} value {newValue}.");
        }
        catch (OverflowException)
        {
            Console.WriteLine($"{largeValue} is outside the range of the Byte data type.");
        }

        try
        {
            newValue = checked((byte)largeValue);
            Console.WriteLine($"Converted the {largeValue.GetType().Name} value {largeValue} to the {newValue.GetType().Name} value {newValue}.");
        }
        catch (OverflowException)
        {
            Console.WriteLine($"{largeValue} is outside the range of the Byte data type.");
        }
        // The example displays the following output:
        //    Converted the Int32 value 2147483647 to the Byte value 255.
        //    2147483647 is outside the range of the Byte data type.
    }
}

public struct ByteWithSignE
{
    private SByte signValue;
    private Byte value;

    private const byte MaxValue = byte.MaxValue;
    private const int MinValue = -1 * byte.MaxValue;

    public static explicit operator ByteWithSignE(int value)
    {
        // Check for overflow.
        if (value > ByteWithSignE.MaxValue || value < ByteWithSignE.MinValue)
            throw new OverflowException(String.Format("'{0}' is out of range of the ByteWithSignE data type.",
                                                      value));

        ByteWithSignE newValue;
        newValue.signValue = (SByte)Math.Sign(value);
        newValue.value = (byte)Math.Abs(value);
        return newValue;
    }

    public static explicit operator ByteWithSignE(uint value)
    {
        if (value > ByteWithSignE.MaxValue)
            throw new OverflowException(String.Format("'{0}' is out of range of the ByteWithSignE data type.",
                                                      value));

        ByteWithSignE newValue;
        newValue.signValue = 1;
        newValue.value = (byte)value;
        return newValue;
    }

    public override string ToString()
    {
        return (signValue * value).ToString();
    }
}
```

## The IConvertible interface

To support the conversion of any type to a common language runtime base type, .NET provides the `System.IConvertible` interface. The implementing type is required to provide the following:

- A method that returns the `System.TypeCode` of the implementing type.

- Methods to convert the implementing type to each common language runtime base type (`System.Boolean`, `System.Byte`, `System.DateTime`, `System.Decimal`, `System.Double`, and so on).

- A generalized conversion method to convert an instance of the implementing type to another specified type. Conversions that are not supported should throw an `System.InvalidCastException`.

 Each common language runtime base type (that is, the `System.Boolean`, `System.Byte`, `System.Char`, `System.DateTime`, `System.Decimal`, `System.Double`, `System.Int16`, `System.Int32`, `System.Int64`, `System.SByte`, `System.Single`, `System.String`, `System.UInt16`, `System.UInt32`, and `System.UInt64`), as well as the `System.DBNull` and `System.Enum` types, implement the `System.IConvertible` interface. However, these are explicit interface implementations; the conversion method can be called only through an `System.IConvertible` interface variable, as the following example shows. This example converts an `System.Int32` value to its equivalent `System.Char` value.

 ```csharp
using System;

public class Example3
{
    public static void Main()
    {
        CallEII();
        Console.WriteLine("-----");
    }

    private static void CallEII()
    {
        int codePoint = 1067;
        IConvertible iConv = codePoint;
        char ch = iConv.ToChar(null);
        Console.WriteLine($"Converted {codePoint} to {ch}.");
    }
}
```

 The requirement to call the conversion method on its interface rather than on the implementing type makes explicit interface implementations relatively expensive. Instead, we recommend that you call the appropriate member of the `System.Convert` class to convert between common language runtime base types. For more information, see the next section, The Convert Class.

> **Note:**
> In addition to the `System.IConvertible` interface and the `System.Convert` class provided by .NET, individual languages may also provide ways to perform conversions. For example, C# uses casting operators; Visual Basic uses compiler-implemented conversion functions such as `CType`, `CInt`, and `DirectCast`.

 For the most part, the `System.IConvertible` interface is designed to support conversion between the base types in .NET. However, the interface can also be implemented by a custom type to support conversion of that type to other custom types. For more information, see the section Custom Conversions with the ChangeType Method later in this topic.
