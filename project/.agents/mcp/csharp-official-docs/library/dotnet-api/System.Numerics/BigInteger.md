---
title: "BigInteger struct (part 1 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/BigInteger.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BigInteger struct

Namespace: `System.Numerics`

```csharp
public readonly struct BigInteger : IComparable<System.Numerics.BigInteger>, IEquatable<System.Numerics.BigInteger>, IParsable<System.Numerics.BigInteger>, ISpanParsable<System.Numerics.BigInteger>, IUtf8SpanParsable<System.Numerics.BigInteger>, System.Numerics.IAdditionOperators<System.Numerics.BigInteger,System.Numerics.BigInteger,System.Numerics.BigInteger>, System.Numerics.IAdditiveIdentity<System.Numerics.BigInteger,System.Numerics.BigInteger>, System.Numerics.IBinaryInteger<System.Numerics.BigInteger>, System.Numerics.IBinaryNumber<System.Numerics.BigInteger>, System.Numerics.IBitwiseOperators<System.Numerics.BigInteger,System.Numerics.BigInteger,System.Numerics.BigInteger>, System.Numerics.IComparisonOperators<System.Numerics.BigInteger,System.Numerics.BigInteger,bool>, System.Numerics.IDecrementOperators<System.Numerics.BigInteger>, System.Numerics.IDivisionOperators<System.Numerics.BigInteger,System.Numerics.BigInteger,System.Numerics.BigInteger>, System.Numerics.IEqualityOperators<System.Numerics.BigInteger,System.Numerics.BigInteger,bool>, System.Numerics.IIncrementOperators<System.Numerics.BigInteger>, System.Numerics.IModulusOperators<System.Numerics.BigInteger,System.Numerics.BigInteger,System.Numerics.BigInteger>, System.Numerics.IMultiplicativeIdentity<System.Numerics.BigInteger,System.Numerics.BigInteger>, System.Numerics.IMultiplyOperators<System.Numerics.BigInteger,System.Numerics.BigInteger,System.Numerics.BigInteger>, System.Numerics.INumber<System.Numerics.BigInteger>, System.Numerics.INumberBase<System.Numerics.BigInteger>, System.Numerics.IShiftOperators<System.Numerics.BigInteger,int,System.Numerics.BigInteger>, System.Numerics.ISignedNumber<System.Numerics.BigInteger>, System.Numerics.ISubtractionOperators<System.Numerics.BigInteger,System.Numerics.BigInteger,System.Numerics.BigInteger>, System.Numerics.IUnaryNegationOperators<System.Numerics.BigInteger,System.Numerics.BigInteger>, System.Numerics.IUnaryPlusOperators<System.Numerics.BigInteger,System.Numerics.BigInteger>
```

Represents an arbitrarily large signed integer.

The `BigInteger` type is an immutable type that represents an arbitrarily large integer whose value in theory has no upper or lower bounds. The members of the `BigInteger` type closely parallel those of other integral types (the `Byte`, `Int16`, `Int32`, `Int64`, `SByte`, `UInt16`, `UInt32`, and `UInt64` types). This type differs from the other integral types in .NET, which have a range indicated by their `MinValue` and `MaxValue` properties.

In .NET 11 and later, conversions from `BigInteger` to binary floating-point types round the exact integer value once to the nearest representable result.

> **Note:**
> Because the `BigInteger` type is immutable (see Mutability) and because it has no upper or lower bounds, an `OutOfMemoryException` can be thrown for any operation that causes a `BigInteger` value to grow too large.

#### Instantiate a BigInteger object

You can instantiate a `BigInteger` object in several ways:

- You can use the `new` keyword and provide any integral or floating-point value as a parameter to the `BigInteger` constructor. (Floating-point values are truncated before they are assigned to the `BigInteger`.) The following example illustrates how to use the `new` keyword to instantiate `BigInteger` values.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/Overview/BigInteger_Examples.cs._

- You can declare a `BigInteger` variable and assign it a value just as you would any numeric type, as long as that value is an integral type. The following example uses assignment to create a `BigInteger` value from an `Int64`.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/Overview/BigInteger_Examples.cs._

- You can assign a decimal or floating-point value to a `BigInteger` object if you cast the value or convert it first. The following example explicitly casts (in C#) or converts (in Visual Basic) a `Double` and a `Decimal` value to a `BigInteger`.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/Overview/BigInteger_Examples.cs._

These methods enable you to instantiate a `BigInteger` object whose value is in the range of one of the existing numeric types only. You can instantiate a `BigInteger` object whose value can exceed the range of the existing numeric types in one of three ways:

- You can use the `new` keyword and provide a byte array of any size to the `BigInteger.%23ctor` constructor. For example:

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/Overview/BigInteger_Examples.cs._

- You can call the `BigInteger.Parse` or `BigInteger.TryParse` methods to convert the string representation of a number to a `BigInteger`. For example:

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/Overview/BigInteger_Examples.cs._

- You can call a `static` (`Shared` in Visual Basic) `BigInteger` method that performs some operation on a numeric expression and returns a calculated `BigInteger` result. The following example does this by cubing `MaxValue` and assigning the result to a `BigInteger`.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/Overview/BigInteger_Examples.cs._

The uninitialized value of a `BigInteger` is `Zero`.

#### Perform operations on BigInteger values

You can use a `BigInteger` instance as you would use any other integral type. `BigInteger` overloads the standard numeric operators to enable you to perform basic <example-value> operations such as addition, subtraction, division, multiplication, and unary negation. You can also use the standard numeric operators to compare two `BigInteger` values with each other. Like the other integral types, `BigInteger` also supports the bitwise `And`, `Or`, `XOr`, left shift, and right shift operators. For languages that do not support custom operators, the `BigInteger` structure also provides equivalent methods for performing mathematical operations. These include `BigInteger.Add`, `BigInteger.Divide`, `BigInteger.Multiply`, `BigInteger.Negate`, `BigInteger.Subtract`, and several others.

Many members of the `BigInteger` structure correspond directly to members of the other integral types. In addition, `BigInteger` adds members such as the following:

- `BigInteger.Sign`, which returns a value that indicates the sign of a `BigInteger` value.

- `BigInteger.Abs`, which returns the absolute value of a `BigInteger` value.

- `BigInteger.DivRem`, which returns both the quotient and remainder of a division operation.

- `BigInteger.GreatestCommonDivisor`, which returns the greatest common divisor of two `BigInteger` values.

Many of these additional members correspond to the members of the `Math` class, which provides the functionality to work with the primitive numeric types.

#### Mutability

The following example instantiates a `BigInteger` object and then increments its value by one.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/Overview/Mutability_Examples.cs._

Although this example appears to modify the value of the existing object, this is not the case. `BigInteger` objects are immutable, which means that internally, the common language runtime actually creates a new `BigInteger` object and assigns it a value one greater than its previous value. This new object is then returned to the caller.

> **Note:**
> The other numeric types in .NET are also immutable. However, because the `BigInteger` type has no upper or lower bounds, its values can grow extremely large and have a measurable impact on performance.

Although this process is transparent to the caller, it does incur a performance penalty. In some cases, especially when repeated operations are performed in a loop on very large `BigInteger` values, that performance penalty can be significant. For example, in the following example, an operation is performed repetitively up to a million times, and a `BigInteger` value is incremented by one every time the operation succeeds.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/Overview/Mutability_Examples.cs._

In such a case, you can improve performance by performing all intermediate assignments to an `Int32` variable. The final value of the variable can then be assigned to the `BigInteger` object when the loop exits. The following example provides an illustration.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/Overview/Mutability_Examples.cs._

#### Byte arrays and hexadecimal strings

If you convert `BigInteger` values to byte arrays, or if you convert byte arrays to `BigInteger` values, you must consider the order of bytes. The `BigInteger` structure expects the individual bytes in a byte array to appear in little-endian order (that is, the lower-order bytes of the value precede the higher-order bytes). You can round-trip a `BigInteger` value by calling the `BigInteger.ToByteArray` method and then passing the resulting byte array to the `%23ctor` constructor, as the following example shows.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/Overview/ByteAndHex_Examples.cs._

To instantiate a `BigInteger` value from a byte array that represents a value of some other integral type, you can pass the integral value to the `BitConverter.GetBytes` method, and then pass the resulting byte array to the `%23ctor` constructor. The following example instantiates a `BigInteger` value from a byte array that represents an `Int16` value.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/Overview/ByteAndHex_Examples.cs._

The `BigInteger` structure assumes that negative values are stored by using two's complement representation. Because the `BigInteger` structure represents a numeric value with no fixed length, the `%23ctor` constructor always interprets the most significant bit of the last byte in the array as a sign bit. To prevent the `%23ctor` constructor from confusing the two's complement representation of a negative value with the sign and magnitude representation of a positive value, positive values in which the most significant bit of the last byte in the byte array would ordinarily be set should include an additional byte whose value is 0. For example, 0xC0 0xBD 0xF0 0xFF is the little-endian hexadecimal representation of either -1,000,000 or 4,293,967,296. Because the most significant bit of the last byte in this array is on, the value of the byte array would be interpreted by the `%23ctor` constructor as -1,000,000. To instantiate a `BigInteger` whose value is positive, a byte array whose elements are 0xC0 0xBD 0xF0 0xFF 0x00 must be passed to the constructor. The following example illustrates this.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/Overview/ByteAndHex_Examples.cs._

Byte arrays created by the `BigInteger.ToByteArray` method from positive values include this extra zero-value byte. Therefore, the `BigInteger` structure can successfully round-trip values by assigning them to, and then restoring them from, byte arrays, as the following example shows.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/Overview/ByteAndHex_Examples.cs._

However, you may need to add this additional zero-value byte to byte arrays that are created dynamically by the developer or that are returned by methods that convert unsigned integers to byte arrays (such as `GetBytes`, `GetBytes`, and `GetBytes`).

When parsing a hexadecimal string, the `Parse` and `Parse` methods assume that if the most significant bit of the first byte in the string is set, or if the first hexadecimal digit of the string represents the lower four bits of a byte value, the value is represented by using two's complement representation. For example, both "FF01" and "F01" represent the decimal value -255. To differentiate positive from negative values, positive values should include a leading zero. The relevant overloads of the `BigInteger.ToString` method, when they are passed the "X" format string, add a leading zero to the returned hexadecimal string for positive values. This makes it possible to round-trip `BigInteger` values by using the `BigInteger.ToString` and `BigInteger.Parse` methods, as the following example shows.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/Overview/ByteAndHex_Examples.cs._

However, the hexadecimal strings created by calling the `ToString` methods of the other integral types or the overloads of the `Convert.ToString` method that include a `toBase` parameter do not indicate the sign of the value or the source data type from which the hexadecimal string was derived. Successfully instantiating a `BigInteger` value from such a string requires some additional logic. The following example provides one possible implementation.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/Overview/ByteAndHex_Examples2.cs._
