---
title: "BitConverter class (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/BitConverter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BitConverter class

Namespace: `System`

```csharp
public static class BitConverter
```

Converts base data types to an array of bytes, and an array of bytes to base data types.

#### Remarks
The `BitConverter` class helps manipulate value types in their fundamental form, as a series of bytes. A byte is defined as an 8-bit unsigned integer. The `BitConverter` class includes static methods to convert each of the primitive types to and from an array of bytes, as the following table illustrates.

| Type                  | To byte conversion                                     | From byte conversion                    |
|-----------------------|--------------------------------------------------------|-----------------------------------------|
| `Boolean` | `GetBytes`| `BitConverter.ToBoolean` |
| `Char`    | `GetBytes`   | `BitConverter.ToChar`    |
| `Double`  | `GetBytes`-or-`DoubleToInt64Bits`-or-`DoubleToUInt64Bits` | `BitConverter.ToDouble`-or-`BitConverter.Int64BitsToDouble`-or-`BitConverter.UInt64BitsToDouble` |
| `Half`    | `GetBytes`-or-`HalfToInt16Bits`-or-`HalfToUInt16Bits`           | `BitConverter.ToHalf`-or-`BitConverter.Int16BitsToHalf`-or-`BitConverter.UInt16BitsToHalf`       |
| `Int16`   | `GetBytes`  | `BitConverter.ToInt16`   |
| `Int32`   | `GetBytes`  | `BitConverter.ToInt32`   |
| `Int64`   | `GetBytes`  | `BitConverter.ToInt64`   |
| `Single`  | `GetBytes`-or-`SingleToInt32Bits`-or-`SingleToUInt32Bits` | `BitConverter.ToSingle`-or-`BitConverter.Int32BitsToSingle`-or-`BitConverter.UInt32BitsToSingle` |
| `UInt16`  | `GetBytes` | `BitConverter.ToUInt16`  |
| `UInt32`  | `GetBytes` | `BitConverter.ToUInt32`  |
| `UInt64`  | `GetBytes` | `BitConverter.ToUInt64`  |

If you use `BitConverter` methods to round-trip data, make sure that the `BitConverter.GetBytes` overload and the `To`*Type* method specify the same type. As the following example illustrates, restoring an array that represents a signed integer by calling the `BitConverter.ToUInt32` method can result in a value that is different from the original. For more information, see Working with Signed Non-Decimal and Bitwise Values.

_Code sample not included: ~/snippets/csharp/System/BitConverter/Overview/example1.cs._

The order of bytes in the array returned by the `BitConverter.GetBytes` method overloads (as well as the order of bits in the integer returned by the `BitConverter.DoubleToInt64Bits` method) depends on whether the computer architecture is little-endian or big-endian. Similarly, the order of bytes in the array and returned by the `To`*IntegerValue* methods and the `BitConverter.ToChar` method depends on whether the computer architecture is little-endian or big-endian. The endianness of an architecture is indicated by the `IsLittleEndian` property, which returns `true` on little-endian systems and `false` on big-endian systems. On little-endian systems, lower-order bytes precede higher-order bytes. On big-endian system, higher-order bytes precede lower-order bytes. The following table illustrates the difference in the byte arrays that result from passing the integer 1,234,567,890 (0x499602D2) to the `GetBytes` method. The bytes are listed in order from the byte at index 0 to the byte at index 3.

| Architecture  | Byte array  |
|---------------|-------------|
| Little-endian | D2-02-96-49 |
| Big-endian    | 49-96-02-D2 |

Because the return value of some methods depends on system architecture, be careful when transmitting byte data beyond machine boundaries:

- If all systems sending and receiving data are guaranteed to have the same endianness, nothing has to be done to the data.

- If systems sending and receiving data can have different endianness, always transmit data in a particular order. This means that the order of bytes in the array may have to be reversed either before sending them or after receiving them. A common convention is to transmit data in network byte order (big-endian order). The following example provides an implementation for sending an integer value in network byte order.

_Code sample not included: ~/snippets/csharp/System/BitConverter/Overview/networkorder1.cs._

- If systems sending and receiving data can have different endianness and the data to be transmitted consists of signed integers, call the `IPAddress.HostToNetworkOrder` method to convert the data to network byte order and the `IPAddress.NetworkToHostOrder` method to convert it to the order required by the recipient.

#### Examples
The following code example illustrates the use of several `BitConverter` class methods.

_Code sample not included: ~/snippets/csharp/System/BitConverter/Overview/bitconv.cs._

## BitConverter.BFloat16ToInt16Bits(BFloat16) method

```csharp
public static short BFloat16ToInt16Bits (System.Numerics.BFloat16 value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## BitConverter.BFloat16ToUInt16Bits(BFloat16) method

```csharp
public static ushort BFloat16ToUInt16Bits (System.Numerics.BFloat16 value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## BitConverter.DoubleToInt64Bits(Double) method

```csharp
public static long DoubleToInt64Bits (double value);
```

Converts the specified double-precision floating point number to a 64-bit signed integer.

Parameters:

- `value`: The number to convert.

Returns: A 64-bit signed integer whose value is equivalent to `value`.

#### Remarks
The order of bits in the integer returned by the `BitConverter.DoubleToInt64Bits` method depends on whether the computer architecture is little-endian or big-endian.

#### Examples
The following code example converts the bit patterns of several `Double` values to `Int64` values with the `DoubleToInt64Bits` method.

_Code sample not included: ~/snippets/csharp/System/BitConverter/DoubleToInt64Bits/dbltobits.cs._

## BitConverter.DoubleToUInt64Bits(Double) method

```csharp
public static ulong DoubleToUInt64Bits (double value);
```

Converts the specified double-precision floating point number to a 64-bit unsigned integer.

Parameters:

- `value`: The number to convert.

Returns: A 64-bit unsigned integer whose bits are identical to `value`.

To be added.

## BitConverter.GetBytes(Boolean) method

```csharp
public static byte[] GetBytes (bool value);
```

Returns the specified Boolean value as a byte array.

Parameters:

- `value`: The value to convert.

Returns: A byte array with length 1.

#### Remarks
You can convert a byte array back to a `Boolean` value by calling the `BitConverter.ToBoolean` method.

#### Examples
The following example converts the bit patterns of `Boolean` values to `Byte` arrays with the `GetBytes` method.

_Code sample not included: ~/snippets/csharp/System/BitConverter/GetBytes/bytesbool.cs._

## BitConverter.GetBytes(Char) method

```csharp
public static byte[] GetBytes (char value);
```

Returns the specified Unicode character value as an array of bytes.

Parameters:

- `value`: The character to convert.

Returns: An array of bytes with length 2.

#### Remarks
The order of bytes in the array returned by the `BitConverter.GetBytes` method depends on whether the computer architecture is little-endian or big-endian.

#### Examples
The following code example converts the bit patterns of `Char` values (Unicode characters) to `Byte` arrays with the `GetBytes` method.

_Code sample not included: ~/snippets/csharp/System/BitConverter/GetBytes/byteschar.cs._

## BitConverter.GetBytes(Double) method

```csharp
public static byte[] GetBytes (double value);
```

Returns the specified double-precision floating-point value as an array of bytes.

Parameters:

- `value`: The number to convert.

Returns: An array of bytes with length 8.

#### Remarks
The order of bytes in the array returned by the `BitConverter.GetBytes` method depends on whether the computer architecture is little-endian or big-endian.

#### Examples
The following code example converts the bit patterns of `Double` values to `Byte` arrays with the `GetBytes` method.

_Code sample not included: ~/snippets/csharp/System/BitConverter/GetBytes/bytesdouble.cs._

## BitConverter.GetBytes(Half) method

```csharp
public static byte[] GetBytes (Half value);
```

Returns the specified half-precision floating-point value as an array of bytes.

Parameters:

- `value`: The number to convert.

Returns: An array of bytes with length 2.

To be added.

## BitConverter.GetBytes(Int128) method

```csharp
public static byte[] GetBytes (Int128 value);
```

Returns the specified 128-bit signed integer value as an array of bytes.

Parameters:

- `value`: The number to convert.

Returns: An array of bytes with length 16.

To be added.

## BitConverter.GetBytes(Int16) method

```csharp
public static byte[] GetBytes (short value);
```

Returns the specified 16-bit signed integer value as an array of bytes.

Parameters:

- `value`: The number to convert.

Returns: An array of bytes with length 2.

#### Remarks
The order of bytes in the array returned by the `BitConverter.GetBytes` method depends on whether the computer architecture is little-endian or big-endian.

#### Examples
The following code example converts the bit patterns of `Int16` values to `Byte` arrays with the `GetBytes` method.

_Code sample not included: ~/snippets/csharp/System/BitConverter/GetBytes/bytesint16.cs._

## BitConverter.GetBytes(Int32) method

```csharp
public static byte[] GetBytes (int value);
```

Returns the specified 32-bit signed integer value as an array of bytes.

Parameters:

- `value`: The number to convert.

Returns: An array of bytes with length 4.

#### Remarks
The order of bytes in the array returned by the `BitConverter.GetBytes` method depends on whether the computer architecture is little-endian or big-endian.

#### Examples
The following code example converts the bit patterns of `Int32` values to `Byte` arrays with the `GetBytes` method.

_Code sample not included: ~/snippets/csharp/System/BitConverter/GetBytes/bytesint32.cs._

## BitConverter.GetBytes(Int64) method

```csharp
public static byte[] GetBytes (long value);
```

Returns the specified 64-bit signed integer value as an array of bytes.

Parameters:

- `value`: The number to convert.

Returns: An array of bytes with length 8.

#### Remarks
The order of bytes in the array returned by the `BitConverter.GetBytes` method depends on whether the computer architecture is little-endian or big-endian.

#### Examples
The following example calls the `BitConverter.GetBytes` method to convert each element in an `Int64` array to a `Byte` arrays.

_Code sample not included: ~/snippets/csharp/System/BitConverter/GetBytes/bytesint64.cs._

## BitConverter.GetBytes(BFloat16) method

```csharp
public static byte[] GetBytes (System.Numerics.BFloat16 value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## BitConverter.GetBytes(Single) method

```csharp
public static byte[] GetBytes (float value);
```

Returns the specified single-precision floating point value as an array of bytes.

Parameters:

- `value`: The number to convert.

Returns: An array of bytes with length 4.

#### Remarks
The order of bytes in the array returned by the `BitConverter.GetBytes` method depends on whether the computer architecture is little-endian or big-endian.

#### Examples
The following code example converts the bit patterns of `Single` values to `Byte` arrays with the `GetBytes` method.

_Code sample not included: ~/snippets/csharp/System/BitConverter/GetBytes/bytessingle.cs._

## BitConverter.GetBytes(UInt128) method

```csharp
public static byte[] GetBytes (UInt128 value);
```

Returns the specified 128-bit unsigned integer value as an array of bytes.

Parameters:

- `value`: The number to convert.

Returns: An array of bytes with length 16.

To be added.

## BitConverter.GetBytes(UInt16) method

```csharp
public static byte[] GetBytes (ushort value);
```

Returns the specified 16-bit unsigned integer value as an array of bytes.

Parameters:

- `value`: The number to convert.

Returns: An array of bytes with length 2.

#### Remarks
The order of bytes in the array returned by the `BitConverter.GetBytes` method depends on whether the computer architecture is little-endian or big-endian.

#### Examples
The following code example converts the bit patterns of `UInt16` values to `Byte` arrays with the `GetBytes` method.

_Code sample not included: ~/snippets/csharp/System/BitConverter/GetBytes/bytesuint16.cs._

## BitConverter.GetBytes(UInt32) method

```csharp
public static byte[] GetBytes (uint value);
```

Returns the specified 32-bit unsigned integer value as an array of bytes.

Parameters:

- `value`: The number to convert.

Returns: An array of bytes with length 4.

#### Remarks
The order of bytes in the array returned by the `BitConverter.GetBytes` method depends on whether the computer architecture is little-endian or big-endian.

#### Examples
The following code example converts the bit patterns of `UInt32` values to `Byte` arrays with the `GetBytes` method.

_Code sample not included: ~/snippets/csharp/System/BitConverter/GetBytes/bytesuint32.cs._

## BitConverter.GetBytes(UInt64) method

```csharp
public static byte[] GetBytes (ulong value);
```

Returns the specified 64-bit unsigned integer value as an array of bytes.

Parameters:

- `value`: The number to convert.

Returns: An array of bytes with length 8.

#### Remarks
The order of bytes in the array returned by the `BitConverter.GetBytes` method depends on whether the computer architecture is little-endian or big-endian.

#### Examples
The following code example converts the bit patterns of `UInt64` values to `Byte` arrays with the `GetBytes` method.

_Code sample not included: ~/snippets/csharp/System/BitConverter/GetBytes/bytesuint64.cs._

## BitConverter.HalfToInt16Bits(Half) method

```csharp
public static short HalfToInt16Bits (Half value);
```

Converts a half-precision floating-point value into a 16-bit integer.

Parameters:

- `value`: The half-precision floating-point value to convert.

Returns: An integer representing the converted half-precision floating-point value.

To be added.

## BitConverter.HalfToUInt16Bits(Half) method

```csharp
public static ushort HalfToUInt16Bits (Half value);
```

Converts the specified half-precision floating point number to a 16-bit unsigned integer.

Parameters:

- `value`: The number to convert.

Returns: A 16-bit unsigned integer whose bits are identical to `value`.

To be added.

## BitConverter.Int16BitsToBFloat16(Int16) method

```csharp
public static System.Numerics.BFloat16 Int16BitsToBFloat16 (short value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.
