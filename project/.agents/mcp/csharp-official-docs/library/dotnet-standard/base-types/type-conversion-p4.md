---
title: "Type Conversion in .NET (part 4 of 6)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/type-conversion.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Type Conversion in .NET (part 4 of 6)

## The Convert class

Although each base type's `System.IConvertible` interface implementation can be called to perform a type conversion, calling the methods of the `System.Convert` class is the recommended language-neutral way to convert from one base type to another. In addition, the `System.Convert.ChangeType(System.Object,System.Type,System.IFormatProvider)` method can be used to convert from a specified custom type to another type.

### Conversions between base types

The `System.Convert` class provides a language-neutral way to perform conversions between base types and is available to all languages that target the common language runtime. It provides a complete set of methods for both widening and narrowing conversions, and throws an `System.InvalidCastException` for conversions that are not supported (such as the conversion of a `System.DateTime` value to an integer value). Narrowing conversions are performed in a checked context, and an `System.OverflowException` is thrown if the conversion fails.

> **Important:**
> Because the `System.Convert` class includes methods to convert to and from each base type, it eliminates the need to call each base type's `System.IConvertible` explicit interface implementation.

 The following example illustrates the use of the `System.Convert` class to perform several widening and narrowing conversions between .NET base types.

 ```csharp
using System;

public class Example
{
    public static void Main()
    {
        PerformConversions();
        Console.WriteLine("-----");
        LosePrecision();
    }

    private static void PerformConversions()
    {
        // Convert an Int32 value to a Decimal (a widening conversion).
        int integralValue = 12534;
        decimal decimalValue = Convert.ToDecimal(integralValue);
        Console.WriteLine($"Converted the {integralValue.GetType().Name} value {integralValue} to " +
                                          "the {decimalValue.GetType().Name} value {decimalValue:N2}.");
        // Convert a Byte value to an Int32 value (a widening conversion).
        byte byteValue = Byte.MaxValue;
        int integralValue2 = Convert.ToInt32(byteValue);
        Console.WriteLine($"Converted the {byteValue.GetType().Name} value {byteValue} to " +
                                          "the {integralValue2.GetType().Name} value {integralValue2:G}.");

        // Convert a Double value to an Int32 value (a narrowing conversion).
        double doubleValue = 16.32513e12;
        try
        {
            long longValue = Convert.ToInt64(doubleValue);
            Console.WriteLine($"Converted the {doubleValue.GetType().Name} value {doubleValue:E} to " +
                                              "the {longValue.GetType().Name} value {longValue:N0}.");
        }
        catch (OverflowException)
        {
            Console.WriteLine($"Unable to convert the {doubleValue.GetType().Name:E} value {doubleValue}.");
        }

        // Convert a signed byte to a byte (a narrowing conversion).
        sbyte sbyteValue = -16;
        try
        {
            byte byteValue2 = Convert.ToByte(sbyteValue);
            Console.WriteLine($"Converted the {sbyteValue.GetType().Name} value {sbyteValue} to " +
                                              "the {byteValue2.GetType().Name} value {byteValue2:G}.");
        }
        catch (OverflowException)
        {
            Console.WriteLine($"Unable to convert the {sbyteValue.GetType().Name} value {sbyteValue}.");
        }
        // The example displays the following output:
        //       Converted the Int32 value 12534 to the Decimal value 12,534.00.
        //       Converted the Byte value 255 to the Int32 value 255.
        //       Converted the Double value 1.632513E+013 to the Int64 value 16,325,130,000,000.
        //       Unable to convert the SByte value -16.
    }

    private static void LosePrecision()
    {
        double doubleValue;

        // Convert a Double to a Decimal.
        decimal decimalValue = 13956810.96702888123451471211m;
        doubleValue = Convert.ToDouble(decimalValue);
        Console.WriteLine($"{decimalValue} converted to {doubleValue}.");

        doubleValue = 42.72;
        try
        {
            int integerValue = Convert.ToInt32(doubleValue);
            Console.WriteLine($"{doubleValue} converted to {integerValue}.");
        }
        catch (OverflowException)
        {
            Console.WriteLine($"Unable to convert {doubleValue} to an integer.");
        }
        // The example displays the following output:
        //       13956810.96702888123451471211 converted to 13956810.9670289.
        //       42.72 converted to 43.
    }
}
```

 In some cases, particularly when converting to and from floating-point values, a conversion may involve a loss of precision, even though it does not throw an `System.OverflowException`. The following example illustrates this loss of precision. In the first case, a `System.Decimal` value has less precision (fewer significant digits) when it is converted to a `System.Double`. In the second case, a `System.Double` value is rounded from 42.72 to 43 in order to complete the conversion.

 ```csharp
using System;

public class Example
{
    public static void Main()
    {
        PerformConversions();
        Console.WriteLine("-----");
        LosePrecision();
    }

    private static void PerformConversions()
    {
        // Convert an Int32 value to a Decimal (a widening conversion).
        int integralValue = 12534;
        decimal decimalValue = Convert.ToDecimal(integralValue);
        Console.WriteLine($"Converted the {integralValue.GetType().Name} value {integralValue} to " +
                                          "the {decimalValue.GetType().Name} value {decimalValue:N2}.");
        // Convert a Byte value to an Int32 value (a widening conversion).
        byte byteValue = Byte.MaxValue;
        int integralValue2 = Convert.ToInt32(byteValue);
        Console.WriteLine($"Converted the {byteValue.GetType().Name} value {byteValue} to " +
                                          "the {integralValue2.GetType().Name} value {integralValue2:G}.");

        // Convert a Double value to an Int32 value (a narrowing conversion).
        double doubleValue = 16.32513e12;
        try
        {
            long longValue = Convert.ToInt64(doubleValue);
            Console.WriteLine($"Converted the {doubleValue.GetType().Name} value {doubleValue:E} to " +
                                              "the {longValue.GetType().Name} value {longValue:N0}.");
        }
        catch (OverflowException)
        {
            Console.WriteLine($"Unable to convert the {doubleValue.GetType().Name:E} value {doubleValue}.");
        }

        // Convert a signed byte to a byte (a narrowing conversion).
        sbyte sbyteValue = -16;
        try
        {
            byte byteValue2 = Convert.ToByte(sbyteValue);
            Console.WriteLine($"Converted the {sbyteValue.GetType().Name} value {sbyteValue} to " +
                                              "the {byteValue2.GetType().Name} value {byteValue2:G}.");
        }
        catch (OverflowException)
        {
            Console.WriteLine($"Unable to convert the {sbyteValue.GetType().Name} value {sbyteValue}.");
        }
        // The example displays the following output:
        //       Converted the Int32 value 12534 to the Decimal value 12,534.00.
        //       Converted the Byte value 255 to the Int32 value 255.
        //       Converted the Double value 1.632513E+013 to the Int64 value 16,325,130,000,000.
        //       Unable to convert the SByte value -16.
    }

    private static void LosePrecision()
    {
        double doubleValue;

        // Convert a Double to a Decimal.
        decimal decimalValue = 13956810.96702888123451471211m;
        doubleValue = Convert.ToDouble(decimalValue);
        Console.WriteLine($"{decimalValue} converted to {doubleValue}.");

        doubleValue = 42.72;
        try
        {
            int integerValue = Convert.ToInt32(doubleValue);
            Console.WriteLine($"{doubleValue} converted to {integerValue}.");
        }
        catch (OverflowException)
        {
            Console.WriteLine($"Unable to convert {doubleValue} to an integer.");
        }
        // The example displays the following output:
        //       13956810.96702888123451471211 converted to 13956810.9670289.
        //       42.72 converted to 43.
    }
}
```

 For a table that lists both the widening and narrowing conversions supported by the `System.Convert` class, see Type Conversion Tables.
