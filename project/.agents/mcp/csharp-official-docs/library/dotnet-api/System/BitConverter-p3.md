---
title: "BitConverter class (part 3 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/BitConverter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BitConverter class (part 3 of 4)

## BitConverter.ToSingle(Byte>) method

```csharp
public static float ToSingle (ReadOnlySpan<byte> value);
```

Converts a read-only byte span into a single-precision floating-point value.

Parameters:

- `value`: A read-only span containing the bytes to convert.

Returns: A single-precision floating-point value representing the converted bytes.

Exceptions:

- `ArgumentOutOfRangeException`: The length of `value` is less than the length of a `Single` value.

To be added.

## BitConverter.ToSingle(Byte[], Int32) method

```csharp
public static float ToSingle (byte[] value, int startIndex);
```

Returns a single-precision floating point number converted from four bytes at a specified position in a byte array.

Parameters:

- `value`: An array of bytes.
- `startIndex`: The starting position within `value`.

Returns: A single-precision floating point number formed by four bytes beginning at `startIndex`.

Exceptions:

- `ArgumentException`: `startIndex` is greater than or equal to the length of `value` minus 3, and is less than or equal to the length of `value` minus 1.
- `ArgumentNullException`: `value` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` is less than zero or greater than the length of `value` minus 1.

#### Remarks
The `BitConverter.ToSingle` method converts the bytes from index `startIndex` to `startIndex` + 3 to a `Single` value. The order of bytes in the array must reflect the endianness of the computer system's architecture. For more information, see the Remarks section of `BitConverter`.

#### Examples
The following code example converts elements of `Byte` arrays to `Single` values with the `ToSingle` method.

_Code sample not included: ~/snippets/csharp/System/BitConverter/ToBoolean/batosingle.cs._

## BitConverter.ToString(Byte[]) method

```csharp
public static string ToString (byte[] value);
```

Converts the numeric value of each element of a specified array of bytes to its equivalent hexadecimal string representation.

Parameters:

- `value`: An array of bytes.

Returns: A string of hexadecimal pairs separated by hyphens, where each pair represents the corresponding element in `value`; for example, "7F-2C-4A-00".

Exceptions:

- `ArgumentNullException`: `value` is `null`.

#### Remarks
All the elements of `value` are converted.

#### Examples
The following code example converts `Byte` arrays to `String` objects with the `ToString` method.

_Code sample not included: ~/snippets/csharp/System/BitConverter/ToString/batostring.cs._

## BitConverter.ToString(Byte[], Int32) method

```csharp
public static string ToString (byte[] value, int startIndex);
```

Converts the numeric value of each element of a specified subarray of bytes to its equivalent hexadecimal string representation.

Parameters:

- `value`: An array of bytes.
- `startIndex`: The starting position within `value`.

Returns: A string of hexadecimal pairs separated by hyphens, where each pair represents the corresponding element in a subarray of `value`; for example, "7F-2C-4A-00".

Exceptions:

- `ArgumentNullException`: `value` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` is less than zero or greater than the length of `value` minus 1.

#### Remarks
The elements from array position `startIndex` to the end of the array are converted.

#### Examples
The following code example converts the part of a `Byte` array starting at the specified `startIndex` to a `String` with the `ToString` method.

_Code sample not included: ~/snippets/csharp/System/BitConverter/ToString/batostringii.cs._

## BitConverter.ToString(Byte[], Int32, Int32) method

```csharp
public static string ToString (byte[] value, int startIndex, int length);
```

Converts the numeric value of each element of a specified subarray of bytes to its equivalent hexadecimal string representation.

Parameters:

- `value`: An array of bytes that includes the bytes to convert.
- `startIndex`: The starting position within `value`.
- `length`: The number of array elements in `value` to convert.

Returns: A string of hexadecimal pairs separated by hyphens, where each pair represents the corresponding element in a subarray of `value`; for example, "7F-2C-4A-00".

Exceptions:

- `ArgumentNullException`: `value` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` or `length` is less than zero.

-or-

`startIndex` is greater than zero and is greater than or equal to the length of `value`.
- `ArgumentException`: The combination of `startIndex` and `length` does not specify a position within `value`; that is, the `startIndex` parameter is greater than the length of `value` minus the `length` parameter.

#### Remarks
The `length` elements from array position `startIndex` are converted. If `length` equals zero, the method returns `Empty`.

#### Examples
The following example uses the `BitConverter.ToString` method to convert part of a byte array, starting at the specified `startIndex` and with the specified `length`, to a string.

_Code sample not included: ~/snippets/csharp/System/BitConverter/ToString/batostringii.cs._

## BitConverter.ToUInt128(Byte>) method

```csharp
public static UInt128 ToUInt128 (ReadOnlySpan<byte> value);
```

Converts a read-only byte span into a 128-bit unsigned integer.

Parameters:

- `value`: A read-only span containing the bytes to convert.

Returns: A 128-bit unsigned integer representing the converted bytes.

Exceptions:

- `ArgumentOutOfRangeException`: The length of `value` is less than 16.

To be added.

## BitConverter.ToUInt128(Byte[], Int32) method

```csharp
public static UInt128 ToUInt128 (byte[] value, int startIndex);
```

Returns a 128-bit unsigned integer converted from sixteen bytes at a specified position in a byte array.

Parameters:

- `value`: An array of bytes.
- `startIndex`: The starting position within `value`.

Returns: A 128-bit unsigned integer formed by sixteen bytes beginning at `startIndex`.

Exceptions:

- `ArgumentException`: `startIndex` is greater than or equal to the length of `value` minus 15,
and is less than or equal to the length of `value` minus 1.
- `ArgumentNullException`: `value` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` is less than zero or greater than the length of `value` minus 1.

To be added.

## BitConverter.ToUInt16(Byte>) method

```csharp
public static ushort ToUInt16 (ReadOnlySpan<byte> value);
```

Converts a read-only byte-span into a 16-bit unsigned integer.

Parameters:

- `value`: A read-only span containing the bytes to convert.

Returns: An 16-bit unsigned integer representing the converted bytes.

Exceptions:

- `ArgumentOutOfRangeException`: The length of `value` is less than 2.

To be added.

## BitConverter.ToUInt16(Byte[], Int32) method

```csharp
public static ushort ToUInt16 (byte[] value, int startIndex);
```

Returns a 16-bit unsigned integer converted from two bytes at a specified position in a byte array.

Parameters:

- `value`: The array of bytes that includes the two bytes to convert.
- `startIndex`: The starting position within `value`.

Returns: A 16-bit unsigned integer formed by two bytes beginning at `startIndex`.

Exceptions:

- `ArgumentException`: `startIndex` equals the length of `value` minus 1.
- `ArgumentNullException`: `value` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` is less than zero or greater than the length of `value` minus 1.

#### Remarks
The `BitConverter.ToUInt16` method converts the bytes from index `startIndex` to `startIndex` + 1 to a `UInt16` value. The order of bytes in the array must reflect the endianness of the computer system's architecture. For more information, see the Remarks section of the `BitConverter` class topic.

#### Examples
The following code example converts elements of `Byte` arrays to `UInt16` values with the `ToUInt16` method.

_Code sample not included: ~/snippets/csharp/System/BitConverter/ToUInt16/batouint16.cs._

## BitConverter.ToUInt32(Byte>) method

```csharp
public static uint ToUInt32 (ReadOnlySpan<byte> value);
```

Converts a read-only byte span into a 32-bit unsigned integer.

Parameters:

- `value`: A read-only span containing the bytes to convert.

Returns: A 32-bit unsigned integer representing the converted bytes.

Exceptions:

- `ArgumentOutOfRangeException`: The length of `value` is less than 4.

To be added.

## BitConverter.ToUInt32(Byte[], Int32) method

```csharp
public static uint ToUInt32 (byte[] value, int startIndex);
```

Returns a 32-bit unsigned integer converted from four bytes at a specified position in a byte array.

Parameters:

- `value`: An array of bytes.
- `startIndex`: The starting position within `value`.

Returns: A 32-bit unsigned integer formed by four bytes beginning at `startIndex`.

Exceptions:

- `ArgumentException`: `startIndex` is greater than or equal to the length of `value` minus 3, and is less than or equal to the length of `value` minus 1.
- `ArgumentNullException`: `value` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` is less than zero or greater than the length of `value` minus 1.

#### Remarks
The `BitConverter.ToUInt32` method converts the bytes from index `startIndex` to `startIndex` + 3 to a `UInt32` value. The order of bytes in the array must reflect the endianness of the computer system's architecture. For more information, see the Remarks section of the `BitConverter` class topic.

#### Examples
The following code example converts elements of `Byte` arrays to `UInt32` values with the `ToUInt32` method.

_Code sample not included: ~/snippets/csharp/System/BitConverter/ToUInt16/batouint32.cs._

## BitConverter.ToUInt64(Byte>) method

```csharp
public static ulong ToUInt64 (ReadOnlySpan<byte> value);
```

Converts bytes into an unsigned long.

Parameters:

- `value`: A read-only span containing the bytes to convert.

Returns: A 64-bit unsigned integer representing the converted bytes.

Exceptions:

- `ArgumentOutOfRangeException`: The length of `value` is less than 8.

To be added.

## BitConverter.ToUInt64(Byte[], Int32) method

```csharp
public static ulong ToUInt64 (byte[] value, int startIndex);
```

Returns a 64-bit unsigned integer converted from eight bytes at a specified position in a byte array.

Parameters:

- `value`: An array of bytes that includes the eight bytes to convert.
- `startIndex`: The starting position within `value`.

Returns: A 64-bit unsigned integer formed by the eight bytes beginning at `startIndex`.

Exceptions:

- `ArgumentException`: `startIndex` is greater than or equal to the length of `value` minus 7, and is less than or equal to the length of `value` minus 1.
- `ArgumentNullException`: `value` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` is less than zero or greater than the length of `value` minus 1.

#### Remarks
The `BitConverter.ToUInt64` method converts the bytes from index `startIndex` to `startIndex` + 7 to a `UInt64` value. The order of bytes in the array must reflect the endianness of the computer system's architecture. For more information, see the Remarks section of the `BitConverter` class topic.

#### Examples
The following code example converts elements of `Byte` arrays to `UInt64` values with the `ToUInt64` method.

_Code sample not included: ~/snippets/csharp/System/BitConverter/ToUInt16/batouint64.cs._

## BitConverter.TryWriteBytes(Byte>, Boolean) method

```csharp
public static bool TryWriteBytes (Span<byte> destination, bool value);
```

Converts a Boolean into a span of bytes.

Parameters:

- `destination`: When this method returns, the bytes representing the converted Boolean.
- `value`: The Boolean to convert.

Returns: `true` if the conversion was successful; `false` otherwise.

To be added.

## BitConverter.TryWriteBytes(Byte>, Char) method

```csharp
public static bool TryWriteBytes (Span<byte> destination, char value);
```

Converts a character into a span of bytes.

Parameters:

- `destination`: When this method returns, the bytes representing the converted character.
- `value`: The character to convert.

Returns: `true` if the conversion was successful; `false` otherwise.

To be added.

## BitConverter.TryWriteBytes(Byte>, Double) method

```csharp
public static bool TryWriteBytes (Span<byte> destination, double value);
```

Converts a double-precision floating-point value into a span of bytes.

Parameters:

- `destination`: When this method returns, the bytes representing the converted double-precision floating-point value.
- `value`: The double-precision floating-point value to convert.

Returns: `true` if the conversion was successful; `false` otherwise.

To be added.

## BitConverter.TryWriteBytes(Byte>, Half) method

```csharp
public static bool TryWriteBytes (Span<byte> destination, Half value);
```

Converts a half-precision floating-point value into a span of bytes.

Parameters:

- `destination`: When this method returns, the bytes representing the converted half-precision floating-point value.
- `value`: The half-precision floating-point value to convert.

Returns: `true` if the conversion was successful; `false` otherwise.

To be added.

## BitConverter.TryWriteBytes(Byte>, Int128) method

```csharp
public static bool TryWriteBytes (Span<byte> destination, Int128 value);
```

Converts a 128-bit signed integer into a span of bytes.

Parameters:

- `destination`: When this method returns, the bytes representing the converted 128-bit signed integer.
- `value`: The 128-bit signed integer to convert.

Returns: `true` if the conversion was successful; `false` otherwise.

To be added.

## BitConverter.TryWriteBytes(Byte>, Int16) method

```csharp
public static bool TryWriteBytes (Span<byte> destination, short value);
```

Converts a 16-bit signed integer into a span of bytes.

Parameters:

- `destination`: When this method returns, the bytes representing the converted 16-bit signed integer.
- `value`: The 16-bit signed integer to convert.

Returns: `true` if the conversion was successful; `false` otherwise.

To be added.

## BitConverter.TryWriteBytes(Byte>, Int32) method

```csharp
public static bool TryWriteBytes (Span<byte> destination, int value);
```

Converts a 32-bit signed integer into a span of bytes.

Parameters:

- `destination`: When this method returns, the bytes representing the converted 32-bit signed integer.
- `value`: The 32-bit signed integer to convert.

Returns: `true` if the conversion was successful; `false` otherwise.

To be added.

## BitConverter.TryWriteBytes(Byte>, Int64) method

```csharp
public static bool TryWriteBytes (Span<byte> destination, long value);
```

Converts a 64-bit signed integer into a span of bytes.

Parameters:

- `destination`: When this method returns, the bytes representing the converted 64-bit signed integer.
- `value`: The 64-bit signed integer to convert.

Returns: `true` if the conversion was successful; `false` otherwise.

To be added.
