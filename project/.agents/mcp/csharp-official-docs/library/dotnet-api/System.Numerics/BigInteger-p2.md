---
title: "BigInteger struct (part 2 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/BigInteger.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BigInteger struct (part 2 of 18)

## BigInteger.BigInteger(Byte[]) constructor

```csharp
public BigInteger (byte[] value);
```

Initializes a new instance of the `BigInteger` structure using the values in a byte array.

Parameters:

- `value`: An array of byte values in little-endian order.

Exceptions:

- `ArgumentNullException`: `value` is `null`.

#### Remarks

The individual bytes in the `value` array should be in little-endian order, from lowest-order byte to highest-order byte. For example, the numeric value 1,000,000,000,000 is represented as shown in the following table:

| Representation | Value |
|-|-|
|Hexadecimal string|E8D4A51000|
|Byte array (lowest index first)|00 10 A5 D4 E8 00|

Most methods that convert numeric values to byte arrays, such as `BigInteger.ToByteArray` and `BitConverter.GetBytes`, return byte arrays in little-endian order.

The constructor expects positive values in the byte array to use sign-and-magnitude representation, and negative values to use two's complement representation. In other words, if the highest-order bit of the highest-order byte in `value` is set, the resulting `BigInteger` value is negative. Depending on the source of the byte array, this might cause a positive value to be misinterpreted as a negative value. Byte arrays are typically generated in the following ways:

- By calling the `BigInteger.ToByteArray` method. Because this method returns a byte array with the highest-order bit of the highest-order byte in the array set to zero for positive values, there is no chance of misinterpreting a positive value as negative. Unmodified byte arrays created by the `BigInteger.ToByteArray` method always successfully round-trip when they are passed to the `%23ctor` constructor.

- By calling the `BitConverter.GetBytes` method and passing it a signed integer as a parameter. Because signed integers handle both sign-and-magnitude representation and two's complement representation, there is no chance of misinterpreting a positive value as negative.

- By calling the `BitConverter.GetBytes` method and passing it an unsigned integer as a parameter. Because unsigned integers are represented by their magnitude only, positive values can be misinterpreted as negative values. To prevent this misinterpretation, you can add a zero-byte value to the end of the array. The example in the next section provides an illustration.

- By creating a byte array either dynamically or statically without necessarily calling any of the previous methods, or by modifying an existing byte array. To prevent positive values from being misinterpreted as negative values, you can add a zero-byte value to the end of the array.

If `value` is an empty `Byte` array, the new `BigInteger` object is initialized to a value of `BigInteger.Zero`. If `value` is `null`, the constructor throws an `ArgumentNullException`.

#### Examples
The following example instantiates a `BigInteger` object from a 5-element byte array whose value is {5, 4, 3, 2, 1}. It then displays the `BigInteger` value, represented as both decimal and hexadecimal numbers, to the console. A comparison of the input array with the text output makes it clear why this overload of the `BigInteger` class constructor creates a `BigInteger` object whose value is 4328719365 (or 0x102030405). The first element of the byte array, whose value is 5, defines the value of the lowest-order byte of the `BigInteger` object, which is 0x05. The second element of the byte array, whose value is 4, defines the value of the second byte of the `BigInteger` object, which is 0x04, and so on.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/.ctor/Example1.cs._

The following example instantiates a positive and a negative `BigInteger` value, passes them to the `BigInteger.ToByteArray` method, and then restores the original `BigInteger` values from the resulting byte array. Note that the two values are represented by identical byte arrays. The only difference between them is in the most significant bit of the last element in the byte array. This bit is set (the value of the byte is 0xFF) if the array is created from a negative `BigInteger` value. The bit is not set (the value of the byte is zero), if the array is created from a positive `BigInteger` value.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/.ctor/Example1.cs._

The following example illustrates how to make sure that a positive value is not incorrectly instantiated as a negative value by adding a byte whose value is zero to the end of the array.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/.ctor/Example1.cs._

## BigInteger.BigInteger(Decimal) constructor

```csharp
public BigInteger (decimal value);
```

Initializes a new instance of the `BigInteger` structure using a `Decimal` value.

Parameters:

- `value`: A decimal number.

#### Remarks
The result of calling this constructor is identical to explicitly assigning a `Decimal` value to a `BigInteger` variable.

Calling this constructor can cause data loss; any fractional part of `value` is truncated when instantiating a `BigInteger` object.

#### Examples
The following example illustrates the use of the `%23ctor` constructor to instantiate a `BigInteger` object. It defines an array of `Decimal` values, and then passes each value to the `%23ctor` constructor. Note that the `Decimal` value is truncated instead of rounded when it is assigned to the `BigInteger` object.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/.ctor/Example2.cs._

## BigInteger.BigInteger(Double) constructor

```csharp
public BigInteger (double value);
```

Initializes a new instance of the `BigInteger` structure using a double-precision floating-point value.

Parameters:

- `value`: A double-precision floating-point value.

Exceptions:

- `OverflowException`: `value` is `Double.NaN`, `Double.NegativeInfinity`, or `Double.PositiveInfinity`.

#### Remarks
Any fractional part of the `value` parameter is truncated when instantiating a `BigInteger` object.

Because of the lack of precision of the `Double` data type, calling this constructor can cause data loss.

The `BigInteger` value that results from calling this constructor is identical to the value that results from explicitly assigning a `Double` value to a `BigInteger`.

#### Examples
The following example illustrates the use of the `%23ctor` constructor to instantiate a `BigInteger` object. It also illustrates the loss of precision that may occur when you use the `Double` data type. A `Double` is assigned a large value, which is then assigned to a `BigInteger` object. As the output shows, this assignment involves a loss of precision. Both values are then incremented by one. The output shows that the `BigInteger` object reflects the changed value, whereas the `Double` object does not.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/.ctor/Example2.cs._

## BigInteger.BigInteger(Int32) constructor

```csharp
public BigInteger (int value);
```

Initializes a new instance of the `BigInteger` structure using a 32-bit signed integer value.

Parameters:

- `value`: A 32-bit signed integer.

#### Remarks
There is no loss of precision when instantiating a `BigInteger` object by using this constructor.

The `BigInteger` value that results from calling this constructor is identical to the value that results from assigning an `Int32` value to a `BigInteger`.

The `BigInteger` structure does not include constructors with a parameter of type `Byte`, `Int16`, `SByte`, or `UInt16`. However, the `Int32` type supports the implicit conversion of 8-bit and 16-bit signed and unsigned integers to signed 32-bit integers. As a result, this constructor is called if `value` is any one of these four integral types.

#### Examples
The following example calls the `%23ctor` constructor to instantiate `BigInteger` values from an array of 32-bit integers. It also uses implicit conversion to assign each 32-bit integer value to a `BigInteger` variable. It then compares the two values to establish that the resulting `BigInteger` values are the same.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/.ctor/Example2.cs._

## BigInteger.BigInteger(Int64) constructor

```csharp
public BigInteger (long value);
```

Initializes a new instance of the `BigInteger` structure using a 64-bit signed integer value.

Parameters:

- `value`: A 64-bit signed integer.

#### Remarks
There is no loss of precision when instantiating a `BigInteger` object by using this constructor.

The `BigInteger` value that results from calling this constructor is identical to the value that results from assigning an `Int64` value to a `BigInteger`.

#### Examples
The following example calls the `%23ctor` constructor to instantiate `BigInteger` values from an array of 64-bit integers. It also uses implicit conversion to assign each 64-bit integer value to a `BigInteger` variable. It then compares the two values to establish that the resulting `BigInteger` values are the same.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/.ctor/Example2.cs._

## BigInteger.BigInteger(Single) constructor

```csharp
public BigInteger (float value);
```

Initializes a new instance of the `BigInteger` structure using a single-precision floating-point value.

Parameters:

- `value`: A single-precision floating-point value.

Exceptions:

- `OverflowException`: `value` is `Single.NaN`, `Single.NegativeInfinity`, or `Single.PositiveInfinity`.

#### Remarks
Any fractional part of the `value` parameter is truncated when instantiating a `BigInteger` object.

Because of the lack of precision of the `Single` data type, calling this constructor can result in data loss.

The `BigInteger` value that results from calling this constructor is identical to the value that results from explicitly assigning a `Single` value to a `BigInteger`.

#### Examples
The following example illustrates the use of the `%23ctor` constructor to instantiate a `BigInteger` object. It also illustrates the loss of precision that may occur when you use the `Single` data type. A `Single` is assigned a large negative value, which is then assigned to a `BigInteger` object. As the output shows, this assignment involves a loss of precision. Both values are then incremented by one. The output shows that the `BigInteger` object reflects the changed value, whereas the `Single` object does not.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/.ctor/Example2.cs._

## BigInteger.BigInteger(UInt32) constructor

```csharp
public BigInteger (uint value);
```

Initializes a new instance of the `BigInteger` structure using an unsigned 32-bit integer value.

Parameters:

- `value`: An unsigned 32-bit integer value.

#### Remarks
There is no loss of precision when instantiating a `BigInteger` using this constructor.

The `BigInteger` value that results from calling this constructor is identical to the value that results from assigning a `UInt32` value to a `BigInteger`.

#### Examples
The following example uses the `%23ctor` constructor and an assignment statement to initialize `BigInteger` values from an array of unsigned 32-bit integers. It then compares the two values to demonstrate that the two methods of initializing a `BigInteger` value produce identical results.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/.ctor/Example2.cs._

## BigInteger.BigInteger(UInt64) constructor

```csharp
public BigInteger (ulong value);
```

Initializes a new instance of the `BigInteger` structure with an unsigned 64-bit integer value.

Parameters:

- `value`: An unsigned 64-bit integer.

#### Remarks
There is no loss of precision when instantiating a `BigInteger` using this constructor.

The `BigInteger` value that results from calling this constructor is identical to the value that results from assigning a `UInt64` value to a `BigInteger`.

#### Examples
The following example uses the `%23ctor` constructor to instantiate a `BigInteger` object whose value is equal to `MaxValue`.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/.ctor/Example2.cs._

## BigInteger.BigInteger(Byte>, Boolean, Boolean) constructor

```csharp
public BigInteger (ReadOnlySpan<byte> value, bool isUnsigned = false, bool isBigEndian = false);
```

Initializes a new instance of the `BigInteger` structure using the values in a read-only span of bytes, and optionally indicating the signing encoding and the endianness byte order.

Parameters:

- `value`: A read-only span of bytes representing the big integer.
- `isUnsigned`: `true` to indicate `value` uses unsigned encoding; otherwise, `false` (the default value).
- `isBigEndian`: `true` to indicate `value` is in big-endian byte order; otherwise, `false`  (the default value).

To be added.

## BigInteger.IsEven property

```csharp
public bool IsEven { get; }
```

Indicates whether the value of the current `BigInteger` object is an even number.

Returns: `true` if the value of the `BigInteger` object is an even number; otherwise, `false`.

#### Remarks
This property is a convenience feature that indicates whether a `BigInteger` value is evenly divisible by two. It is equivalent to the following expression:

```csharp
value % 2 == 0;
```

```vb
value Mod 2 = 0
```

If the value of the current `BigInteger` object is `BigInteger.Zero`, the property returns `true`.

## BigInteger.IsOne property

```csharp
public bool IsOne { get; }
```

Indicates whether the value of the current `BigInteger` object is `BigInteger.One`.

Returns: `true` if the value of the `BigInteger` object is `BigInteger.One`; otherwise, `false`.

#### Remarks
This property offers significantly better performance than other comparisons with one, such as `thisBigInteger.Equals(BigInteger.One)`.

## BigInteger.IsPowerOfTwo property

```csharp
public bool IsPowerOfTwo { get; }
```

Indicates whether the value of the current `BigInteger` object is a power of two.

Returns: `true` if the value of the `BigInteger` object is a power of two; otherwise, `false`.

#### Remarks
This property determines whether a `BigInteger` value has a single non-zero bit set. This means that it returns `true` if the value of the current `BigInteger` object is 1 (that is, 20) or any greater power of two. It returns `false` if the value of the current `BigInteger` object is 0.

## BigInteger.IsZero property

```csharp
public bool IsZero { get; }
```

Indicates whether the value of the current `BigInteger` object is `BigInteger.Zero`.

Returns: `true` if the value of the `BigInteger` object is `BigInteger.Zero`; otherwise, `false`.

#### Remarks
This property offers significantly better performance than `BigInteger.Equals(BigInteger.Zero)`.
