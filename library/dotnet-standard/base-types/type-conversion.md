---
title: "Type Conversion in .NET (part 1 of 6)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/type-conversion.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Type conversion in .NET

Every value has an associated type, which defines attributes such as the amount of space allocated to the value, the range of possible values it can have, and the members that it makes available. Many values can be expressed as more than one type. For example, the value 4 can be expressed as an integer or a floating-point value. Type conversion creates a value in a new type that is equivalent to the value of an old type, but does not necessarily preserve the identity (or exact value) of the original object.

.NET automatically supports the following conversions:

- Conversion from a derived class to a base class. This means, for example, that an instance of any class or structure can be converted to an `System.Object` instance.  This conversion does not require a casting or conversion operator.

- Conversion from a base class back to the original derived class. In C#, this conversion requires a casting operator. In Visual Basic, it requires the `CType` operator if `Option Strict` is on.

- Conversion from a type that implements an interface to an interface object that represents that interface. This conversion does not require a casting or conversion operator.

- Conversion from an interface object back to the original type that implements that interface.  In C#, this conversion requires a casting operator. In Visual Basic, it requires the `CType` operator if `Option Strict` is on.

In addition to these automatic conversions, .NET provides several features that support custom type conversion. These include the following:

- The `Implicit` operator, which defines the available widening conversions between types. For more information, see the Implicit Conversion with the Implicit Operator section.

- The `Explicit` operator, which defines the available narrowing conversions between types. For more information, see the Explicit Conversion with the Explicit Operator section.

- The `System.IConvertible` interface, which defines conversions to each of the base .NET data types. For more information, see The IConvertible Interface section.

- The `System.Convert` class, which provides a set of methods that implement the methods in the `System.IConvertible` interface. For more information, see The Convert Class section.

- The `System.ComponentModel.TypeConverter` class, which is a base class that can be extended to support the conversion of a specified type to any other type. For more information, see The TypeConverter Class section.

## Implicit conversion with the implicit operator

Widening conversions involve the creation of a new value from the value of an existing type that has either a more restrictive range or a more restricted member list than the target type. Widening conversions cannot result in data loss (although they may result in a loss of precision). Because data cannot be lost, compilers can handle the conversion implicitly or transparently, without requiring the use of an explicit conversion method or a casting operator.

> **Note:**
> Although code that performs an implicit conversion can call a conversion method or use a casting operator, their use is not required by compilers that support implicit conversions.

 For example, the `System.Decimal` type supports implicit conversions from `System.Byte`, `System.Char`, `System.Int16`, `System.Int32`, `System.Int64`, `System.SByte`, `System.UInt16`, `System.UInt32`, and `System.UInt64` values. The following example illustrates some of these implicit conversions in assigning values to a `System.Decimal` variable.

 ```csharp
﻿using System;

public class Example5
{
    public static void Main()
    {
        PerformDecimalConversions();
        Console.WriteLine("-----");
        PerformCustomConversions();
    }

    private static void PerformDecimalConversions()
    {
        byte byteValue = 16;
        short shortValue = -1024;
        int intValue = -1034000;
        long longValue = 1152921504606846976;
        ulong ulongValue = UInt64.MaxValue;

        decimal decimalValue;

        decimalValue = byteValue;
        Console.WriteLine("After assigning a {0} value, the Decimal value is {1}.",
                          byteValue.GetType().Name, decimalValue);

        decimalValue = shortValue;
        Console.WriteLine("After assigning a {0} value, the Decimal value is {1}.",
                          shortValue.GetType().Name, decimalValue);

        decimalValue = intValue;
        Console.WriteLine("After assigning a {0} value, the Decimal value is {1}.",
                          intValue.GetType().Name, decimalValue);

        decimalValue = longValue;
        Console.WriteLine("After assigning a {0} value, the Decimal value is {1}.",
                          longValue.GetType().Name, decimalValue);

      decimalValue = ulongValue;
      Console.WriteLine("After assigning a {0} value, the Decimal value is {1}.",
                        ulongValue.GetType().Name, decimalValue);
      // The example displays the following output:
      //    After assigning a Byte value, the Decimal value is 16.
      //    After assigning a Int16 value, the Decimal value is -1024.
      //    After assigning a Int32 value, the Decimal value is -1034000.
      //    After assigning a Int64 value, the Decimal value is 1152921504606846976.
      //    After assigning a UInt64 value, the Decimal value is 18446744073709551615.
   }

    private static void PerformCustomConversions()
    {
        SByte sbyteValue = -120;
        ByteWithSign value = sbyteValue;
        Console.WriteLine(value);
        value = Byte.MaxValue;
        Console.WriteLine(value);
        // The example displays the following output:
        //       -120
        //       255
    }
}

public struct ByteWithSign
{
    private SByte signValue;
    private Byte value;

    public static implicit operator ByteWithSign(SByte value)
    {
        ByteWithSign newValue;
        newValue.signValue = (SByte)Math.Sign(value);
        newValue.value = (byte)Math.Abs(value);
        return newValue;
    }

    public static implicit operator ByteWithSign(Byte value)
    {
        ByteWithSign newValue;
        newValue.signValue = 1;
        newValue.value = value;
        return newValue;
    }

    public override string ToString()
    {
        return (signValue * value).ToString();
    }
}
```

 If a particular language compiler supports custom operators, you can also define implicit conversions in your own custom types. The following example provides a partial implementation of a signed byte data type named `ByteWithSign` that uses sign-and-magnitude representation. It supports implicit conversion of `System.Byte` and `System.SByte` values to `ByteWithSign` values.

 ```csharp
﻿using System;

public class Example5
{
    public static void Main()
    {
        PerformDecimalConversions();
        Console.WriteLine("-----");
        PerformCustomConversions();
    }

    private static void PerformDecimalConversions()
    {
        byte byteValue = 16;
        short shortValue = -1024;
        int intValue = -1034000;
        long longValue = 1152921504606846976;
        ulong ulongValue = UInt64.MaxValue;

        decimal decimalValue;

        decimalValue = byteValue;
        Console.WriteLine("After assigning a {0} value, the Decimal value is {1}.",
                          byteValue.GetType().Name, decimalValue);

        decimalValue = shortValue;
        Console.WriteLine("After assigning a {0} value, the Decimal value is {1}.",
                          shortValue.GetType().Name, decimalValue);

        decimalValue = intValue;
        Console.WriteLine("After assigning a {0} value, the Decimal value is {1}.",
                          intValue.GetType().Name, decimalValue);

        decimalValue = longValue;
        Console.WriteLine("After assigning a {0} value, the Decimal value is {1}.",
                          longValue.GetType().Name, decimalValue);

      decimalValue = ulongValue;
      Console.WriteLine("After assigning a {0} value, the Decimal value is {1}.",
                        ulongValue.GetType().Name, decimalValue);
      // The example displays the following output:
      //    After assigning a Byte value, the Decimal value is 16.
      //    After assigning a Int16 value, the Decimal value is -1024.
      //    After assigning a Int32 value, the Decimal value is -1034000.
      //    After assigning a Int64 value, the Decimal value is 1152921504606846976.
      //    After assigning a UInt64 value, the Decimal value is 18446744073709551615.
   }

    private static void PerformCustomConversions()
    {
        SByte sbyteValue = -120;
        ByteWithSign value = sbyteValue;
        Console.WriteLine(value);
        value = Byte.MaxValue;
        Console.WriteLine(value);
        // The example displays the following output:
        //       -120
        //       255
    }
}

public struct ByteWithSign
{
    private SByte signValue;
    private Byte value;

    public static implicit operator ByteWithSign(SByte value)
    {
        ByteWithSign newValue;
        newValue.signValue = (SByte)Math.Sign(value);
        newValue.value = (byte)Math.Abs(value);
        return newValue;
    }

    public static implicit operator ByteWithSign(Byte value)
    {
        ByteWithSign newValue;
        newValue.signValue = 1;
        newValue.value = value;
        return newValue;
    }

    public override string ToString()
    {
        return (signValue * value).ToString();
    }
}
```

 Client code can then declare a `ByteWithSign` variable and assign it `System.Byte` and `System.SByte` values without performing any explicit conversions or using any casting operators, as the following example shows.

 ```csharp
﻿using System;

public class Example5
{
    public static void Main()
    {
        PerformDecimalConversions();
        Console.WriteLine("-----");
        PerformCustomConversions();
    }

    private static void PerformDecimalConversions()
    {
        byte byteValue = 16;
        short shortValue = -1024;
        int intValue = -1034000;
        long longValue = 1152921504606846976;
        ulong ulongValue = UInt64.MaxValue;

        decimal decimalValue;

        decimalValue = byteValue;
        Console.WriteLine("After assigning a {0} value, the Decimal value is {1}.",
                          byteValue.GetType().Name, decimalValue);

        decimalValue = shortValue;
        Console.WriteLine("After assigning a {0} value, the Decimal value is {1}.",
                          shortValue.GetType().Name, decimalValue);

        decimalValue = intValue;
        Console.WriteLine("After assigning a {0} value, the Decimal value is {1}.",
                          intValue.GetType().Name, decimalValue);

        decimalValue = longValue;
        Console.WriteLine("After assigning a {0} value, the Decimal value is {1}.",
                          longValue.GetType().Name, decimalValue);

      decimalValue = ulongValue;
      Console.WriteLine("After assigning a {0} value, the Decimal value is {1}.",
                        ulongValue.GetType().Name, decimalValue);
      // The example displays the following output:
      //    After assigning a Byte value, the Decimal value is 16.
      //    After assigning a Int16 value, the Decimal value is -1024.
      //    After assigning a Int32 value, the Decimal value is -1034000.
      //    After assigning a Int64 value, the Decimal value is 1152921504606846976.
      //    After assigning a UInt64 value, the Decimal value is 18446744073709551615.
   }

    private static void PerformCustomConversions()
    {
        SByte sbyteValue = -120;
        ByteWithSign value = sbyteValue;
        Console.WriteLine(value);
        value = Byte.MaxValue;
        Console.WriteLine(value);
        // The example displays the following output:
        //       -120
        //       255
    }
}

public struct ByteWithSign
{
    private SByte signValue;
    private Byte value;

    public static implicit operator ByteWithSign(SByte value)
    {
        ByteWithSign newValue;
        newValue.signValue = (SByte)Math.Sign(value);
        newValue.value = (byte)Math.Abs(value);
        return newValue;
    }

    public static implicit operator ByteWithSign(Byte value)
    {
        ByteWithSign newValue;
        newValue.signValue = 1;
        newValue.value = value;
        return newValue;
    }

    public override string ToString()
    {
        return (signValue * value).ToString();
    }
}
```
