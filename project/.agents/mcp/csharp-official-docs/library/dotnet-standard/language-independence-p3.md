---
title: "Language independence and language-independent components (part 3 of 8)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/language-independence.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Language independence and language-independent components (part 3 of 8)

### Types and type-member signatures

The System.Object type is CLS-compliant and is the base type of all object types in the .NET type system. Inheritance in .NET is either implicit (for example, the String class implicitly inherits from the `Object` class) or explicit (for example, the CultureNotFoundException class explicitly inherits from the ArgumentException class, which explicitly inherits from the Exception class. For a derived type to be CLS compliant, its base type must also be CLS-compliant.

The following example shows a derived type whose base type is not CLS-compliant. It defines a base `Counter` class that uses an unsigned 32-bit integer as a counter. Because the class provides counter functionality by wrapping an unsigned integer, the class is marked as non-CLS-compliant. As a result, a derived class, `NonZeroCounter`, is also not CLS-compliant.

```csharp
using System;

[assembly: CLSCompliant(true)]

[CLSCompliant(false)]
public class Counter
{
   UInt32 ctr;

   public Counter()
   {
      ctr = 0;
   }

   protected Counter(UInt32 ctr)
   {
      this.ctr = ctr;
   }

   public override string ToString()
   {
      return String.Format("{0}). ", ctr);
   }

   public UInt32 Value
   {
      get { return ctr; }
   }

   public void Increment()
   {
      ctr += (uint) 1;
   }
}

public class NonZeroCounter : Counter
{
   public NonZeroCounter(int startIndex) : this((uint) startIndex)
   {
   }

   private NonZeroCounter(UInt32 startIndex) : base(startIndex)
   {
   }
}
// Compilation produces a compiler warning like the following:
//    Type3.cs(37,14): warning CS3009: 'NonZeroCounter': base type 'Counter' is not
//            CLS-compliant
//    Type3.cs(7,14): (Location of symbol related to previous warning)

public class Example
{
   public static void Main()
   {
   }
}
```

All types that appear in member signatures, including a method's return type or a property type, must be CLS-compliant. In addition, for generic types:

* All types that compose an instantiated generic type must be CLS-compliant.

* All types used as constraints on generic parameters must be CLS-compliant.

The .NET common type system includes many built-in types that are supported directly by the common language runtime and are specially encoded in an assembly's metadata. Of these intrinsic types, the types listed in the following table are CLS-compliant.

CLS-compliant type | Description
------------------ | -----------
Byte | 8-bit unsigned integer
Int16 | 16-bit signed integer
Int32 | 32-bit signed integer
Int64 | 64-bit signed integer
Half | Half-precision floating-point value
Single | Single-precision floating-point value
Double | Double-precision floating-point value
Boolean | true or false value type
Char | UTF-16 encoded code unit
Decimal | Non-floating-point decimal number
IntPtr | Pointer or handle of a platform-defined size
String | Collection of zero, one, or more Char objects

The intrinsic types listed in the following table are not CLS-Compliant.

Non-compliant type | Description | CLS-compliant alternative
------------------ | ----------- | -------------------------
SByte | 8-bit signed integer data type | Int16
UInt16 | 16-bit unsigned integer | Int32
UInt32 | 32-bit unsigned integer | Int64
UInt64 | 64-bit unsigned integer | Int64 (may overflow), BigInteger, or Double
UIntPtr | Unsigned pointer or handle | IntPtr

The .NET Class Library or any other class library may include other types that aren't CLS-compliant, for example:

- Boxed value types. The following C# example creates a class that has a public property of type `int*` named `Value`. Because an `int*` is a boxed value type, the compiler flags it as non-CLS-compliant.

  ```csharp
using System;

[assembly:CLSCompliant(true)]

public unsafe class TestClass
{
   private int* val;

   public TestClass(int number)
   {
      val = (int*) number;
   }

   public int* Value {
      get { return val; }
   }
}
// The compiler generates the following output when compiling this example:
//        warning CS3003: Type of 'TestClass.Value' is not CLS-compliant

public class Example
{
   public static void Main()
   {
   }
}
```

- Typed references, which are special constructs that contain a reference to an object and a reference to a type. Typed references are represented in .NET by the `System.TypedReference` class.

If a type is not CLS-compliant, you should apply the `System.CLSCompliantAttribute` attribute with an `isCompliant` value of `false` to it. For more information, see The CLSCompliantAttribute attribute section.

The following example illustrates the problem of CLS compliance in a method signature and in generic type instantiation. It defines an `InvoiceItem` class with a property of type `System.UInt32`, a property of type `Nullable<UInt32>`, and a constructor with parameters of type `System.UInt32` and `Nullable<UInt32>`. You get four compiler warnings when you try to compile this example.

```csharp
using System;

[assembly: CLSCompliant(true)]

public class InvoiceItem
{
   private uint invId = 0;
   private uint itemId = 0;
   private Nullable<uint> qty;

   public InvoiceItem(uint sku, Nullable<uint> quantity)
   {
      itemId = sku;
      qty = quantity;
   }

   public Nullable<uint> Quantity
   {
      get { return qty; }
      set { qty = value; }
   }

   public uint InvoiceId
   {
      get { return invId; }
      set { invId = value; }
   }
}
// The attempt to compile the example displays the following output:
//    Type1.cs(13,23): warning CS3001: Argument type 'uint' is not CLS-compliant
//    Type1.cs(13,33): warning CS3001: Argument type 'uint?' is not CLS-compliant
//    Type1.cs(19,26): warning CS3003: Type of 'InvoiceItem.Quantity' is not CLS-compliant
//    Type1.cs(25,16): warning CS3003: Type of 'InvoiceItem.InvoiceId' is not CLS-compliant
```

To eliminate the compiler warnings, replace the non-CLS-compliant types in the `InvoiceItem` public interface with compliant types:

```csharp
using System;

[assembly: CLSCompliant(true)]

public class InvoiceItem
{
   private uint invId = 0;
   private uint itemId = 0;
   private Nullable<int> qty;

   public InvoiceItem(int sku, Nullable<int> quantity)
   {
      if (sku <= 0)
         throw new ArgumentOutOfRangeException("The item number is zero or negative.");
      itemId = (uint) sku;

      qty = quantity;
   }

   public Nullable<int> Quantity
   {
      get { return qty; }
      set { qty = value; }
   }

   public int InvoiceId
   {
      get { return (int) invId; }
      set {
         if (value <= 0)
            throw new ArgumentOutOfRangeException("The invoice number is zero or negative.");
         invId = (uint) value; }
   }
}
```

In addition to the specific types listed, some categories of types are not CLS compliant. These include unmanaged pointer types and function pointer types. The following example generates a compiler warning because it uses a pointer to an integer to create an array of integers.

```csharp
using System;

[assembly: CLSCompliant(true)]

public class ArrayHelper
{
   unsafe public static Array CreateInstance(Type type, int* ptr, int items)
   {
      Array arr = Array.CreateInstance(type, items);
      int* addr = ptr;
      for (int ctr = 0; ctr < items; ctr++) {
          int value = *addr;
          arr.SetValue(value, ctr);
          addr++;
      }
      return arr;
   }
}
// The attempt to compile this example displays the following output:
//    UnmanagedPtr1.cs(8,57): warning CS3001: Argument type 'int*' is not CLS-compliant

public class Example
{
   public static void Main()
   {
      int[] numbers = {3, 6, 9, 12 };
      int[] numbers2;
      unsafe {
         fixed(int* ptr = numbers) {
            numbers2 = (int[]) ArrayHelper.CreateInstance(typeof(int), ptr, numbers.Length);
         }
      }
      foreach (var number2 in numbers2)
         Console.WriteLine(number2);
   }
}
```

For CLS-compliant abstract classes (that is, classes marked as `abstract` in C# or as `MustInherit` in Visual Basic), all members of the class must also be CLS-compliant.
