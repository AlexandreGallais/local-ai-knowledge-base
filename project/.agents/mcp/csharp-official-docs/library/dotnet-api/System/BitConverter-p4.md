---
title: "BitConverter class (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/BitConverter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BitConverter class (part 4 of 4)

## BitConverter.TryWriteBytes(Byte>, BFloat16) method

```csharp
public static bool TryWriteBytes (Span<byte> destination, System.Numerics.BFloat16 value);
```

To be added.

Parameters:

- `destination`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## BitConverter.TryWriteBytes(Byte>, Single) method

```csharp
public static bool TryWriteBytes (Span<byte> destination, float value);
```

Converts a single-precision floating-point value into a span of bytes.

Parameters:

- `destination`: When this method returns, the bytes representing the converted single-precision floating-point value.
- `value`: The single-precision floating-point value to convert.

Returns: `true` if the conversion was successful; `false` otherwise.

To be added.

## BitConverter.TryWriteBytes(Byte>, UInt128) method

```csharp
public static bool TryWriteBytes (Span<byte> destination, UInt128 value);
```

Converts a 128-bit unsigned integer into a span of bytes.

Parameters:

- `destination`: When this method returns, the bytes representing the converted 128-bit unsigned integer.
- `value`: The 128-bit unsigned integer to convert.

Returns: `true` if the conversion was successful; `false` otherwise.

To be added.

## BitConverter.TryWriteBytes(Byte>, UInt16) method

```csharp
public static bool TryWriteBytes (Span<byte> destination, ushort value);
```

Converts an unsigned 16-bit integer into a span of bytes.

Parameters:

- `destination`: When this method returns, the bytes representing the converted unsigned 16-bit integer.
- `value`: The unsigned 16-bit integer to convert.

Returns: `true` if the conversion was successful; `false` otherwise.

To be added.

## BitConverter.TryWriteBytes(Byte>, UInt32) method

```csharp
public static bool TryWriteBytes (Span<byte> destination, uint value);
```

Converts a 32-bit unsigned integer into a span of bytes.

Parameters:

- `destination`: When this method returns, the bytes representing the converted unsigned 32-bit integer.
- `value`: The unsigned 32-bit integer to convert.

Returns: `true` if the conversion was successful; `false` otherwise.

To be added.

## BitConverter.TryWriteBytes(Byte>, UInt64) method

```csharp
public static bool TryWriteBytes (Span<byte> destination, ulong value);
```

Converts an unsigned 64-bit integer into a span of bytes.

Parameters:

- `destination`: When this method returns, the bytes representing the converted unsigned 64-bit integer.
- `value`: The unsigned 64-bit integer to convert.

Returns: `true` if the conversion was successful; `false` otherwise.

To be added.

## BitConverter.UInt16BitsToBFloat16(UInt16) method

```csharp
public static System.Numerics.BFloat16 UInt16BitsToBFloat16 (ushort value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## BitConverter.UInt16BitsToHalf(UInt16) method

```csharp
public static Half UInt16BitsToHalf (ushort value);
```

Converts the specified 16-bit unsigned integer to a half-precision floating point number.

Parameters:

- `value`: The number to convert.

Returns: A half-precision floating point number whose bits are identical to `value`.

To be added.

## BitConverter.UInt32BitsToSingle(UInt32) method

```csharp
public static float UInt32BitsToSingle (uint value);
```

Converts the specified 32-bit unsigned integer to a single-precision floating point number.

Parameters:

- `value`: The number to convert.

Returns: A single-precision floating point number whose bits are identical to `value`.

To be added.

## BitConverter.UInt64BitsToDouble(UInt64) method

```csharp
public static double UInt64BitsToDouble (ulong value);
```

Converts the specified 64-bit unsigned integer to a double-precision floating point number.

Parameters:

- `value`: The number to convert.

Returns: A double-precision floating point number whose bits are identical to `value`.

To be added.

## BitConverter.IsLittleEndian field

```csharp
public static readonly bool IsLittleEndian;
```

Indicates the byte order ("endianness") in which data is stored in this computer architecture.

#### Remarks
Different computer architectures store data using different byte orders. "Big-endian" means the most significant byte is on the left end of a word. "Little-endian" means the most significant byte is on the right end of a word.

> **Note:**
> You can convert from network byte order to the byte order of the host computer without retrieving the value of the `IsLittleEndian` field by passing a 16-bit, 32-bit, or 64 bit integer to the `IPAddress.HostToNetworkOrder` method.

#### Examples
The following code example illustrates the use of the `IsLittleEndian` field.

_Code sample not included: ~/snippets/csharp/System/BitConverter/Overview/littleend.cs._
