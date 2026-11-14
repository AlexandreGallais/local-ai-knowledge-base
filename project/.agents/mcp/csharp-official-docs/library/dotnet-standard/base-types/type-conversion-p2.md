---
title: "Type Conversion in .NET (part 2 of 6)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/type-conversion.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Type Conversion in .NET (part 2 of 6)

## Explicit conversion with the explicit operator

Narrowing conversions involve the creation of a new value from the value of an existing type that has either a greater range or a larger member list than the target type. Because a narrowing conversion can result in a loss of data, compilers often require that the conversion be made explicit through a call to a conversion method or a casting operator. That is, the conversion must be handled explicitly in developer code.

> **Note:**
> The major purpose of requiring a conversion method or casting operator for narrowing conversions is to make the developer aware of the possibility of data loss or an `System.OverflowException` so that it can be handled in code. However, some compilers can relax this requirement. For example, in Visual Basic, if `Option Strict` is off (its default setting), the Visual Basic <example-value> tries to perform narrowing conversions implicitly.

 For example, the `System.UInt32`, `System.Int64`, and `System.UInt64` data types have ranges that exceed that the `System.Int32` data type, as the following table shows.

|Type|Comparison with range of Int32|
|----------|------------------------------------|
|`System.Int64`|`System.Int64.MaxValue` is greater than `System.Int32.MaxValue`, and `System.Int64.MinValue` is less than (has a greater negative range than) `System.Int32.MinValue`.|
|`System.UInt32`|`System.UInt32.MaxValue` is greater than `System.Int32.MaxValue`.|
|`System.UInt64`|`System.UInt64.MaxValue` is greater than `System.Int32.MaxValue`.|

 To handle such narrowing conversions, .NET allows types to define an `Explicit` operator. Individual language compilers can then implement this operator using their own syntax, or a member of the `System.Convert` class can be called to perform the conversion. (For more information about the `System.Convert` class, see The Convert Class later in this topic.) The following example illustrates the use of language features to handle the explicit conversion of these potentially out-of-range integer values to `System.Int32` values.

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

 Explicit conversions can produce different results in different languages, and these results can differ from the value returned by the corresponding `System.Convert` method. For example, if the `System.Double` value 12.63251 is converted to an `System.Int32`, both the Visual Basic `CInt` method and the .NET `System.Convert.ToInt32(System.Double)` method round the `System.Double` to return a value of 13, but the C# `(int)` operator truncates the `System.Double` to return a value of 12. Similarly, the C# `(int)` operator does not support Boolean-to-integer conversion, but the Visual Basic `CInt` method converts a value of `true` to -1. On the other hand, the `System.Convert.ToInt32(System.Boolean)` method converts a value of `true` to 1.

 Most compilers allow explicit conversions to be performed in a checked or unchecked manner. When a checked conversion is performed, an `System.OverflowException` is thrown when the value of the type to be converted is outside the range of the target type. When an unchecked conversion is performed under the same conditions, the conversion might not throw an exception, but the exact behavior becomes undefined and an incorrect value might result.

> **Note:**
> In C#, checked conversions can be performed by using the `checked` keyword together with a casting operator, or by specifying the `/checked+` compiler option. Conversely, unchecked conversions can be performed by using the `unchecked` keyword together with the casting operator, or by specifying the `/checked-` compiler option. By default, explicit conversions are unchecked. In Visual Basic, checked conversions can be performed by clearing the **Remove integer overflow checks** check box in the project's **Advanced Compiler Settings** dialog box, or by specifying the `/removeintchecks-` compiler option. Conversely, unchecked conversions can be performed by selecting the **Remove integer overflow checks** check box in the project's **Advanced Compiler Settings** dialog box or by specifying the `/removeintchecks+` compiler option. By default, explicit conversions are checked.

 The following C# example uses the `checked` and `unchecked` keywords to illustrate the difference in behavior when a value outside the range of a `System.Byte` is converted to a `System.Byte`. The checked conversion throws an exception, but the unchecked conversion assigns `System.Byte.MaxValue` to the `System.Byte` variable.

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
