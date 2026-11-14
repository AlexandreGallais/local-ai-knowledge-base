---
title: "BitConverter class (part 2 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/BitConverter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BitConverter class (part 2 of 4)

## BitConverter.Int16BitsToHalf(Int16) method

```csharp
public static Half Int16BitsToHalf (short value);
```

Reinterprets the specified 16-bit signed integer value as a half-precision floating-point value.

Parameters:

- `value`: The 16-bit signed integer value to convert.

Returns: A half-precision floating-point value that represents the converted integer.

To be added.

## BitConverter.Int32BitsToSingle(Int32) method

```csharp
public static float Int32BitsToSingle (int value);
```

Reinterprets the specified 32-bit integer as a single-precision floating-point value.

Parameters:

- `value`: The integer to convert.

Returns: A single-precision floating-point value that represents the converted integer.

To be added.

## BitConverter.Int64BitsToDouble(Int64) method

```csharp
public static double Int64BitsToDouble (long value);
```

Reinterprets the specified 64-bit signed integer to a double-precision floating point number.

Parameters:

- `value`: The number to convert.

Returns: A double-precision floating point number whose value is equivalent to `value`.

#### Remarks
Typically, `value` is an integer that is returned by the `BitConverter.DoubleToInt64Bits` method.

#### Examples
The following code example converts the bit patterns of several `Int64` values to `Double` values with the `Int64BitsToDouble` method.

_Code sample not included: ~/snippets/csharp/System/BitConverter/DoubleToInt64Bits/bitstodbl.cs._

## BitConverter.SingleToInt32Bits(Single) method

```csharp
public static int SingleToInt32Bits (float value);
```

Converts a single-precision floating-point value into an integer.

Parameters:

- `value`: The single-precision floating-point value to convert.

Returns: An integer representing the converted single-precision floating-point value.

To be added.

## BitConverter.SingleToUInt32Bits(Single) method

```csharp
public static uint SingleToUInt32Bits (float value);
```

Converts the specified single-precision floating point number to a 32-bit unsigned integer.

Parameters:

- `value`: The number to convert.

Returns: A 32-bit unsigned integer whose bits are identical to `value`.

To be added.

## BitConverter.ToBFloat16(Byte>) method

```csharp
public static System.Numerics.BFloat16 ToBFloat16 (ReadOnlySpan<byte> value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## BitConverter.ToBFloat16(Byte[], Int32) method

```csharp
public static System.Numerics.BFloat16 ToBFloat16 (byte[] value, int startIndex);
```

To be added.

Parameters:

- `value`: To be added.
- `startIndex`: To be added.

Returns: To be added.

To be added.

## BitConverter.ToBoolean(Byte>) method

```csharp
public static bool ToBoolean (ReadOnlySpan<byte> value);
```

Converts a read-only byte span to a Boolean value.

Parameters:

- `value`: A read-only span containing the bytes to convert.

Returns: A Boolean representing the converted bytes.

Exceptions:

- `ArgumentOutOfRangeException`: The length of `value` is less than 1.

To be added.

## BitConverter.ToBoolean(Byte[], Int32) method

```csharp
public static bool ToBoolean (byte[] value, int startIndex);
```

Returns a Boolean value converted from the byte at a specified position in a byte array.

Parameters:

- `value`: A byte array.
- `startIndex`: The index of the byte within `value` to convert.

Returns: `true` if the byte at `startIndex` in `value` is nonzero; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `value` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` is less than zero or greater than the length of `value` minus 1.

#### Remarks
To convert a `Boolean` value to its byte representation, call the `GetBytes` method.

#### Examples
The following code example converts elements of `Byte` arrays to `Boolean` values with the `ToBoolean` method.

_Code sample not included: ~/snippets/csharp/System/BitConverter/ToBoolean/batobool.cs._

## BitConverter.ToChar(Byte>) method

```csharp
public static char ToChar (ReadOnlySpan<byte> value);
```

Converts a read-only byte span into a character.

Parameters:

- `value`: A read-only span containing the bytes to convert.

Returns: A character representing the converted bytes.

Exceptions:

- `ArgumentOutOfRangeException`: The length of `value` is less than the length of a `Char`.

To be added.

## BitConverter.ToChar(Byte[], Int32) method

```csharp
public static char ToChar (byte[] value, int startIndex);
```

Returns a Unicode character converted from two bytes at a specified position in a byte array.

Parameters:

- `value`: An array that includes the two bytes to convert.
- `startIndex`: The starting position within `value`.

Returns: The character formed by two bytes beginning at `startIndex`.

Exceptions:

- `ArgumentException`: `startIndex` equals the length of `value` minus 1.
- `ArgumentNullException`: `value` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` is less than zero or greater than the length of `value` minus 1.

#### Remarks
The `BitConverter.ToChar` method converts the bytes from index `startIndex` to `startIndex` + 1 to a `Char` value. The order of bytes in the array must reflect the endianness of the computer system's architecture. For more information, see the Remarks section of the `BitConverter` class topic.

#### Examples
The following code example converts elements of `Byte` arrays to `Char` values (Unicode characters) with the `ToChar` method.

_Code sample not included: ~/snippets/csharp/System/BitConverter/ToBoolean/batochar.cs._

## BitConverter.ToDouble(Byte>) method

```csharp
public static double ToDouble (ReadOnlySpan<byte> value);
```

Converts a read-only byte span into a double-precision floating-point value.

Parameters:

- `value`: A read-only span containing the bytes to convert.

Returns: A double-precision floating-point value that represents the converted bytes.

Exceptions:

- `ArgumentOutOfRangeException`: The length of `value` is less than the length of a `Double` value.

To be added.

## BitConverter.ToDouble(Byte[], Int32) method

```csharp
public static double ToDouble (byte[] value, int startIndex);
```

Returns a double-precision floating point number converted from eight bytes at a specified position in a byte array.

Parameters:

- `value`: An array of bytes that includes the eight bytes to convert.
- `startIndex`: The starting position within `value`.

Returns: A double-precision floating point number formed by eight bytes beginning at `startIndex`.

Exceptions:

- `ArgumentException`: `startIndex` is greater than or equal to the length of `value` minus 7, and is less than or equal to the length of `value` minus 1.
- `ArgumentNullException`: `value` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` is less than zero or greater than the length of `value` minus 1.

#### Remarks
The `BitConverter.ToDouble` method converts the bytes from index `startIndex` to `startIndex` + 7 to a `Double` value. The order of bytes in the array must reflect the endianness of the computer system's architecture. For more information, see the Remarks section of the `BitConverter` class topic.

#### Examples
The following code example converts elements of `Byte` arrays to `Double` values with the `ToDouble` method.

_Code sample not included: ~/snippets/csharp/System/BitConverter/ToBoolean/batodouble.cs._

## BitConverter.ToHalf(Byte>) method

```csharp
public static Half ToHalf (ReadOnlySpan<byte> value);
```

Converts a read-only byte span into a half-precision floating-point value.

Parameters:

- `value`: A read-only span containing the bytes to convert.

Returns: A half-precision floating-point value that represents the converted bytes.

Exceptions:

- `ArgumentOutOfRangeException`: The length of `value` is less than 2.

To be added.

## BitConverter.ToHalf(Byte[], Int32) method

```csharp
public static Half ToHalf (byte[] value, int startIndex);
```

Returns a half-precision floating point number converted from two bytes at a specified position in a byte array.

Parameters:

- `value`: An array of bytes that includes the two bytes to convert.
- `startIndex`: The starting position within `value`.

Returns: A half-precision floating point number formed by two bytes beginning at `startIndex`.

Exceptions:

- `ArgumentException`: `startIndex` equals the length of `value` minus 1.
- `ArgumentNullException`: `value` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` is less than zero or greater than the length of `value` minus 1.

To be added.

## BitConverter.ToInt128(Byte>) method

```csharp
public static Int128 ToInt128 (ReadOnlySpan<byte> value);
```

Converts a read-only byte span into a 128-bit signed integer.

Parameters:

- `value`: A read-only span containing the bytes to convert.

Returns: A 128-bit signed integer representing the converted bytes.

Exceptions:

- `ArgumentOutOfRangeException`: The length of `value` is less than 16.

To be added.

## BitConverter.ToInt128(Byte[], Int32) method

```csharp
public static Int128 ToInt128 (byte[] value, int startIndex);
```

Returns a 128-bit signed integer converted from sixteen bytes at a specified position in a byte array.

Parameters:

- `value`: An array of bytes.
- `startIndex`: The starting position within `value`.

Returns: A 128-bit signed integer formed by sixteen bytes beginning at `startIndex`.

Exceptions:

- `ArgumentException`: `startIndex` is greater than or equal to the length of `value` minus 15,
and is less than or equal to the length of `value` minus 1.
- `ArgumentNullException`: `value` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` is less than zero or greater than the length of `value` minus 1.

To be added.

## BitConverter.ToInt16(Byte>) method

```csharp
public static short ToInt16 (ReadOnlySpan<byte> value);
```

Converts a read-only byte span into a 16-bit signed integer.

Parameters:

- `value`: A read-only span containing the bytes to convert.

Returns: A 16-bit signed integer representing the converted bytes.

Exceptions:

- `ArgumentOutOfRangeException`: The length of `value` is less than 2.

To be added.

## BitConverter.ToInt16(Byte[], Int32) method

```csharp
public static short ToInt16 (byte[] value, int startIndex);
```

Returns a 16-bit signed integer converted from two bytes at a specified position in a byte array.

Parameters:

- `value`: An array of bytes that includes the two bytes to convert.
- `startIndex`: The starting position within `value`.

Returns: A 16-bit signed integer formed by two bytes beginning at `startIndex`.

Exceptions:

- `ArgumentException`: `startIndex` equals the length of `value` minus 1.
- `ArgumentNullException`: `value` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` is less than zero or greater than the length of `value` minus 1.

#### Remarks
The `BitConverter.ToInt16` method converts the bytes from index `startIndex` to `startIndex` + 1 to an `Int16` value. The order of bytes in the array must reflect the endianness of the computer system's architecture. For more information, see the Remarks section of the `BitConverter` class topic.

#### Examples
The following code example converts elements of `Byte` arrays to `Int16` values with the `ToInt16` method.

_Code sample not included: ~/snippets/csharp/System/BitConverter/ToInt16/batoint16.cs._

## BitConverter.ToInt32(Byte>) method

```csharp
public static int ToInt32 (ReadOnlySpan<byte> value);
```

Converts a read-only byte span into a 32-bit signed integer.

Parameters:

- `value`: A read-only span containing the bytes to convert.

Returns: A 32-bit signed integer representing the converted bytes.

Exceptions:

- `ArgumentOutOfRangeException`: The length of `value` is less than 4.

To be added.

## BitConverter.ToInt32(Byte[], Int32) method

```csharp
public static int ToInt32 (byte[] value, int startIndex);
```

Returns a 32-bit signed integer converted from four bytes at a specified position in a byte array.

Parameters:

- `value`: An array of bytes that includes the four bytes to convert.
- `startIndex`: The starting position within `value`.

Returns: A 32-bit signed integer formed by four bytes beginning at `startIndex`.

Exceptions:

- `ArgumentException`: `startIndex` is greater than or equal to the length of `value` minus 3, and is less than or equal to the length of `value` minus 1.
- `ArgumentNullException`: `value` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` is less than zero or greater than the length of `value` minus 1.

#### Remarks
The `BitConverter.ToInt32` method converts the bytes from index `startIndex` to `startIndex` + 3 to an `Int32` value. The order of bytes in the array must reflect the endianness of the computer system's architecture. For more information, see the Remarks section of `BitConverter`.

#### Examples
The following example uses the `BitConverter.ToInt32` method to create `Int32` values from a four-byte array and from the upper four bytes of an eight-byte array. It also uses the `GetBytes` and `BitConverter.ToInt32` methods to round-trip an `Int32` value.

_Code sample not included: ~/snippets/csharp/System/BitConverter/ToInt32/toint32.cs._

## BitConverter.ToInt64(Byte>) method

```csharp
public static long ToInt64 (ReadOnlySpan<byte> value);
```

Converts a read-only byte span into a 64-bit signed integer.

Parameters:

- `value`: A read-only span containing the bytes to convert.

Returns: A 64-bit signed integer representing the converted bytes.

Exceptions:

- `ArgumentOutOfRangeException`: The length of `value` is less than 8.

To be added.

## BitConverter.ToInt64(Byte[], Int32) method

```csharp
public static long ToInt64 (byte[] value, int startIndex);
```

Returns a 64-bit signed integer converted from eight bytes at a specified position in a byte array.

Parameters:

- `value`: An array of bytes that includes the eight bytes to convert.
- `startIndex`: The starting position within `value`.

Returns: A 64-bit signed integer formed by eight bytes beginning at `startIndex`.

Exceptions:

- `ArgumentException`: `startIndex` is greater than or equal to the length of `value` minus 7, and is less than or equal to the length of `value` minus 1.
- `ArgumentNullException`: `value` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` is less than zero or greater than the length of `value` minus 1.

#### Remarks
The `BitConverter.ToInt64` method converts the bytes from index `startIndex` to `startIndex` + 7 to a `Int64` value. The order of bytes in the array must reflect the endianness of the computer system's architecture. For more information, see the Remarks section of the `BitConverter` class topic.

#### Examples
The following code example converts elements of `Byte` arrays to `Int64` values with the `ToInt64` method.

_Code sample not included: ~/snippets/csharp/System/BitConverter/ToInt16/batoint64.cs._
