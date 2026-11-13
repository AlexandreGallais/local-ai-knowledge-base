---
title: "Language independence and language-independent components (part 5 of 8)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/language-independence.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Language independence and language-independent components (part 5 of 8)

### Arrays

CLS-compliant arrays conform to the following rules:

- All dimensions of an array must have a lower bound of zero. The following example creates a non-CLS-compliant array with a lower bound of one. Despite the presence of the `System.CLSCompliantAttribute` attribute, the compiler does not detect that the array returned by the `Numbers.GetTenPrimes` method is not CLS-compliant.

  ```csharp
﻿using System;
using System.Linq;

[assembly: CLSCompliant(true)]

public class Numbers
{
   public static Array GetTenPrimes()
   {
      Array arr = Array.CreateInstance(typeof(Int32), new int[] {10}, new int[] {1});
      arr.SetValue(1, 1);
      arr.SetValue(2, 2);
      arr.SetValue(3, 3);
      arr.SetValue(5, 4);
      arr.SetValue(7, 5);
      arr.SetValue(11, 6);
      arr.SetValue(13, 7);
      arr.SetValue(17, 8);
      arr.SetValue(19, 9);
      arr.SetValue(23, 10);

      return arr;
   }
}

public class Example
{
   public static void Main()
   {
      foreach(var number in Numbers.GetTenPrimes())
         Console.WriteLine(number);
   }
}
```

- All array elements must consist of CLS-compliant types. The following example defines two methods that return non-CLS-compliant arrays. The first returns an array of `System.UInt32` values. The second returns an `System.Object` array that includes `System.Int32` and `System.UInt32` values. Although the compiler identifies the first array as non-compliant because of its `System.UInt32` type, it fails to recognize that the second array includes non-CLS-compliant elements.

  ```csharp
using System;

[assembly: CLSCompliant(true)]

public class Numbers
{
   public static UInt32[] GetTenPrimes()
   {
      uint[] arr = { 1u, 2u, 3u, 5u, 7u, 11u, 13u, 17u, 19u };
      return arr;
   }

   public static Object[] GetFivePrimes()
   {
      Object[] arr = { 1, 2, 3, 5u, 7u };
      return arr;
   }
}
// Compilation produces a compiler warning like the following:
//    Array2.cs(8,27): warning CS3002: Return type of 'Numbers.GetTenPrimes()' is not
//            CLS-compliant

public class Example
{
   public static void Main()
   {
   }
}
```

- Overload resolution for methods that have array parameters is based on the fact that they are arrays and on their element type. For this reason, the following definition of an overloaded `GetSquares` method is CLS-compliant.

  ```csharp
using System;
using System.Numerics;

[assembly: CLSCompliant(true)]

public class Numbers
{
   public static byte[] GetSquares(byte[] numbers)
   {
      byte[] numbersOut = new byte[numbers.Length];
      for (int ctr = 0; ctr < numbers.Length; ctr++) {
         int square = ((int) numbers[ctr]) * ((int) numbers[ctr]);
         if (square <= Byte.MaxValue)
            numbersOut[ctr] = (byte) square;
         // If there's an overflow, assign MaxValue to the corresponding
         // element.
         else
            numbersOut[ctr] = Byte.MaxValue;
      }
      return numbersOut;
   }

   public static BigInteger[] GetSquares(BigInteger[] numbers)
   {
      BigInteger[] numbersOut = new BigInteger[numbers.Length];
      for (int ctr = 0; ctr < numbers.Length; ctr++)
         numbersOut[ctr] = numbers[ctr] * numbers[ctr];

      return numbersOut;
   }
}

public class Example
{
   public static void Main()
   {
       Byte[] bytes = Numbers.GetSquares( new Byte[] { (byte) 3, (byte) 10,
                                                       (byte) 13, (byte) 20 } );
       foreach (var byt in bytes)
          Console.Write("{0}  ", byt);

       Console.WriteLine();
       BigInteger[] bigs = new BigInteger[] { 1034, 1058, 100, 12399 };
       foreach (var bigSquare in Numbers.GetSquares(bigs))
          Console.Write("{0:N0}  ", bigSquare);

       Console.WriteLine();
   }
}
```

### Interfaces

CLS-compliant interfaces can define properties, events, and virtual methods (methods with no implementation). A CLS-compliant interface cannot have any of the following:

- Static methods or static fields. Both the C# and Visual Basic <example-value> generate compiler errors if you define a static member in an interface.

- Fields. Both the C# and Visual Basic <example-value> generate compiler errors if you define a field in an interface.

- Methods that are not CLS-compliant. For example, the following interface definition includes a method, `INumber.GetUnsigned`, that is marked as non-CLS-compliant. This example generates a compiler warning.

  ```csharp
using System;

[assembly:CLSCompliant(true)]

public interface INumber
{
   int Length();
   [CLSCompliant(false)] ulong GetUnsigned();
}
// Attempting to compile the example displays output like the following:
//    Interface2.cs(8,32): warning CS3010: 'INumber.GetUnsigned()': CLS-compliant interfaces
//            must have only CLS-compliant members

public class Example
{
   public static void Main()
   {
   }
}
```

  Because of this rule, CLS-compliant types are not required to implement non-CLS-compliant members. If a CLS-compliant framework does expose a class that implements a non-CLS compliant interface, it should also provide concrete implementations of all non-CLS-compliant members.

CLS-compliant language compilers must also allow a class to provide separate implementations of members that have the same name and signature in multiple interfaces.  Both C# and Visual Basic <example-value> explicit interface implementations to provide different implementations of identically named methods. Visual Basic also supports the `Implements` keyword, which enables you to explicitly designate which interface and member a particular member implements. The following example illustrates this scenario by defining a `Temperature` class that implements the `ICelsius` and `IFahrenheit` interfaces as explicit interface implementations.

```csharp
using System;

[assembly: CLSCompliant(true)]

public interface IFahrenheit
{
   decimal GetTemperature();
}

public interface ICelsius
{
   decimal GetTemperature();
}

public class Temperature : ICelsius, IFahrenheit
{
   private decimal _value;

   public Temperature(decimal value)
   {
      // We assume that this is the Celsius value.
      _value = value;
   }

   decimal IFahrenheit.GetTemperature()
   {
      return _value * 9 / 5 + 32;
   }

   decimal ICelsius.GetTemperature()
   {
      return _value;
   }
}
public class Example
{
   public static void Main()
   {
      Temperature temp = new Temperature(100.0m);
      ICelsius cTemp = temp;
      IFahrenheit fTemp = temp;
      Console.WriteLine($"Temperature in Celsius: {cTemp.GetTemperature()} degrees");
      Console.WriteLine($"Temperature in Fahrenheit: {fTemp.GetTemperature()} degrees");
   }
}
// The example displays the following output:
//       Temperature in Celsius: 100.0 degrees
//       Temperature in Fahrenheit: 212.0 degrees
```

### Enumerations

CLS-compliant enumerations must follow these rules:

- The underlying type of the enumeration must be an intrinsic CLS-compliant integer (`System.Byte`, `System.Int16`, `System.Int32`, or `System.Int64`). For example, the following code tries to define an enumeration whose underlying type is `System.UInt32` and generates a compiler warning.

  ```csharp
using System;

[assembly: CLSCompliant(true)]

public enum Size : uint {
   Unspecified = 0,
   XSmall = 1,
   Small = 2,
   Medium = 3,
   Large = 4,
   XLarge = 5
};

public class Clothing
{
   public string Name;
   public string Type;
   public string Size;
}
// The attempt to compile the example displays a compiler warning like the following:
//    Enum3.cs(6,13): warning CS3009: 'Size': base type 'uint' is not CLS-compliant
```

- An enumeration type must have a single instance field named `Value__` that is marked with the `System.Reflection.FieldAttributes.RTSpecialName` attribute. This enables you to reference the field value implicitly.

- An enumeration includes literal static fields whose types match the type of the enumeration itself. For example, if you define a `State` enumeration with values of `State.On` and `State.Off`, `State.On` and `State.Off` are both literal static fields whose type is `State`.

- There are two kinds of enumerations:

  - An enumeration that represents a set of mutually exclusive, named integer values. This type of enumeration is indicated by the absence of the `System.FlagsAttribute` custom attribute.

  - An enumeration that represents a set of bit flags that can combine to generate an unnamed value. This type of enumeration is indicated by the presence of the `System.FlagsAttribute` custom attribute.

  For more information, see the documentation for the `System.Enum` structure.

- The value of an enumeration is not limited to the range of its specified values. In other words, the range of values in an enumeration is the range of its underlying value. You can use the `System.Enum.IsDefined*` method to determine whether a specified value is a member of an enumeration.

### Type members in general

The Common Language Specification requires all fields and methods to be accessed as members of a particular class. Therefore, global static fields and methods (that is, static fields or methods that are defined apart from a type) are not CLS-compliant. If you try to include a global field or method in your source code, both the C# and Visual Basic <example-value> generate a compiler error.

The Common Language Specification supports only the standard managed calling convention. It doesn't support unmanaged calling conventions and methods with variable argument lists marked with the `varargs` keyword. For variable argument lists that are compatible with the standard managed calling convention, use the `System.ParamArrayAttribute` attribute or the individual language's implementation, such as the `params` keyword in C# and the `ParamArray` keyword in Visual Basic.

### Member accessibility

Overriding an inherited member cannot change the accessibility of that member. For example, a public method in a base class cannot be overridden by a private method in a derived class. There is one exception: a `protected internal` (in C#) or `Protected Friend` (in Visual Basic) member in one assembly that is overridden by a type in a different assembly.  In that case, the accessibility of the override is `Protected`.

The following example illustrates the error that is generated when the CLSCompliantAttribute attribute is set to `true`, and `Human`, which is a class derived from `Animal`, tries to change the accessibility of the `Species` property from public to private. The example compiles successfully if its accessibility is changed to public.

```csharp
using System;

[assembly: CLSCompliant(true)]

public class Animal
{
   private string _species;

   public Animal(string species)
   {
      _species = species;
   }

   public virtual string Species
   {
      get { return _species; }
   }

   public override string ToString()
   {
      return _species;
   }
}

public class Human : Animal
{
   private string _name;

   public Human(string name) : base("Homo Sapiens")
   {
      _name = name;
   }

   public string Name
   {
      get { return _name; }
   }

   private override string Species
   {
      get { return base.Species; }
   }

   public override string ToString()
   {
      return _name;
   }
}

public class Example
{
   public static void Main()
   {
      Human p = new Human("John");
      Console.WriteLine(p.Species);
      Console.WriteLine(p.ToString());
   }
}
// The example displays the following output:
//    error CS0621: 'Human.Species': virtual or abstract members cannot be private
```

Types in the signature of a member must be accessible whenever that member is accessible. For example, this means  that a public member cannot include a parameter whose type is private, protected, or internal. The following example illustrates the compiler error that results when a `StringWrapper` class constructor exposes an internal `StringOperationType` enumeration value that determines how a string value should be wrapped.

```csharp
using System;
using System.Text;

public class StringWrapper
{
   string internalString;
   StringBuilder internalSB = null;
   bool useSB = false;

   public StringWrapper(StringOperationType type)
   {
      if (type == StringOperationType.Normal) {
         useSB = false;
      }
      else {
         useSB = true;
         internalSB = new StringBuilder();
      }
   }

   // The remaining source code...
}

internal enum StringOperationType { Normal, Dynamic }
// The attempt to compile the example displays the following output:
//    error CS0051: Inconsistent accessibility: parameter type
//            'StringOperationType' is less accessible than method
//            'StringWrapper.StringWrapper(StringOperationType)'
```
