---
title: "BinaryPrimitives class (part 1 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Buffers.Binary/BinaryPrimitives.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BinaryPrimitives class

Namespace: `System.Buffers.Binary`

```csharp
public static class BinaryPrimitives
```

Reads bytes as primitives with specific endianness.

#### Remarks

Use these helpers when you need to read specific endianness.

## BinaryPrimitives.ReadBFloat16BigEndian(Byte>) method

```csharp
public static System.Numerics.BFloat16 ReadBFloat16BigEndian (ReadOnlySpan<byte> source);
```

To be added.

Parameters:

- `source`: To be added.

Returns: To be added.

To be added.

## BinaryPrimitives.ReadBFloat16LittleEndian(Byte>) method

```csharp
public static System.Numerics.BFloat16 ReadBFloat16LittleEndian (ReadOnlySpan<byte> source);
```

To be added.

Parameters:

- `source`: To be added.

Returns: To be added.

To be added.

## BinaryPrimitives.ReadDoubleBigEndian(Byte>) method

```csharp
public static double ReadDoubleBigEndian (ReadOnlySpan<byte> source);
```

Reads a `Double` from the beginning of a read-only span of bytes, as big endian.

Parameters:

- `source`: The read-only span to read.

Returns: The big endian value.

Exceptions:

- `ArgumentOutOfRangeException`: `source` is too small to contain a `Double`.

#### Remarks

Reads exactly 8 bytes from the beginning of the span.

## BinaryPrimitives.ReadDoubleLittleEndian(Byte>) method

```csharp
public static double ReadDoubleLittleEndian (ReadOnlySpan<byte> source);
```

Reads a `Double` from the beginning of a read-only span of bytes, as little endian.

Parameters:

- `source`: The read-only span to read.

Returns: The little endian value.

Exceptions:

- `ArgumentOutOfRangeException`: `source` is too small to contain a `Double`.

#### Remarks

Reads exactly 8 bytes from the beginning of the span.

## BinaryPrimitives.ReadHalfBigEndian(Byte>) method

```csharp
public static Half ReadHalfBigEndian (ReadOnlySpan<byte> source);
```

Reads a `Half` from the beginning of a read-only span of bytes, as big endian.

Parameters:

- `source`: The read-only span to read.

Returns: The big endian value.

Exceptions:

- `ArgumentOutOfRangeException`: `source` is too small to contain a `Half`.

#### Remarks

Reads exactly 2 bytes from the beginning of the span.

## BinaryPrimitives.ReadHalfLittleEndian(Byte>) method

```csharp
public static Half ReadHalfLittleEndian (ReadOnlySpan<byte> source);
```

Reads a `Half` from the beginning of a read-only span of bytes, as little endian.

Parameters:

- `source`: The read-only span to read.

Returns: The little endian value.

Exceptions:

- `ArgumentOutOfRangeException`: `source` is too small to contain a `Half`.

#### Remarks

Reads exactly 2 bytes from the beginning of the span.

## BinaryPrimitives.ReadInt128BigEndian(Byte>) method

```csharp
public static Int128 ReadInt128BigEndian (ReadOnlySpan<byte> source);
```

Reads a `Int128` from the beginning of a read-only span of bytes, as big endian.

Parameters:

- `source`: The read-only span to read.

Returns: The big endian value.

Exceptions:

- `ArgumentOutOfRangeException`: `source` is too small to contain a `Int128`.

Reads exactly 16 bytes from the beginning of the span.

## BinaryPrimitives.ReadInt128LittleEndian(Byte>) method

```csharp
public static Int128 ReadInt128LittleEndian (ReadOnlySpan<byte> source);
```

Reads a `Int128` from the beginning of a read-only span of bytes, as little endian.

Parameters:

- `source`: The read-only span to read.

Returns: The little endian value.

Exceptions:

- `ArgumentOutOfRangeException`: `source` is too small to contain a `Int128`.

Reads exactly 16 bytes from the beginning of the span.

## BinaryPrimitives.ReadInt16BigEndian(Byte>) method

```csharp
public static short ReadInt16BigEndian (ReadOnlySpan<byte> source);
```

Reads an `Int16` from the beginning of a read-only span of bytes, as big endian.

Parameters:

- `source`: The read-only span to read.

Returns: The big endian value.

Exceptions:

- `ArgumentOutOfRangeException`: `source` is too small to contain an `Int16`.

#### Remarks

Reads exactly 2 bytes from the beginning of the span.

## BinaryPrimitives.ReadInt16LittleEndian(Byte>) method

```csharp
public static short ReadInt16LittleEndian (ReadOnlySpan<byte> source);
```

Reads an `Int16` from the beginning of a read-only span of bytes, as little endian.

Parameters:

- `source`: The read-only span to read.

Returns: The little endian value.

Exceptions:

- `ArgumentOutOfRangeException`: `source` is too small to contain an `Int16`.

#### Remarks

Reads exactly 2 bytes from the beginning of the span.

## BinaryPrimitives.ReadInt32BigEndian(Byte>) method

```csharp
public static int ReadInt32BigEndian (ReadOnlySpan<byte> source);
```

Reads an `Int32` from the beginning of a read-only span of bytes, as big endian.

Parameters:

- `source`: The read-only span to read.

Returns: The big endian value.

Exceptions:

- `ArgumentOutOfRangeException`: `source` is too small to contain an `Int32`.

#### Remarks

Reads exactly 4 bytes from the beginning of the span.

## BinaryPrimitives.ReadInt32LittleEndian(Byte>) method

```csharp
public static int ReadInt32LittleEndian (ReadOnlySpan<byte> source);
```

Reads an `Int32` from the beginning of a read-only span of bytes, as little endian.

Parameters:

- `source`: The read-only span to read.

Returns: The little endian value.

Exceptions:

- `ArgumentOutOfRangeException`: `source` is too small to contain an `Int32`.

#### Remarks

Reads exactly 4 bytes from the beginning of the span.

## BinaryPrimitives.ReadInt64BigEndian(Byte>) method

```csharp
public static long ReadInt64BigEndian (ReadOnlySpan<byte> source);
```

Reads an `Int64` from the beginning of a read-only span of bytes, as big endian.

Parameters:

- `source`: The read-only span to read.

Returns: The big endian value.

Exceptions:

- `ArgumentOutOfRangeException`: `source` is too small to contain an `Int64`.

#### Remarks

Reads exactly 8 bytes from the beginning of the span.

## BinaryPrimitives.ReadInt64LittleEndian(Byte>) method

```csharp
public static long ReadInt64LittleEndian (ReadOnlySpan<byte> source);
```

Reads an `Int64` from the beginning of a read-only span of bytes, as little endian.

Parameters:

- `source`: The read-only span to read.

Returns: The little endian value.

Exceptions:

- `ArgumentOutOfRangeException`: `source` is too small to contain an `Int64`.

#### Remarks

Reads exactly 8 bytes from the beginning of the span.

## BinaryPrimitives.ReadIntPtrBigEndian(Byte>) method

```csharp
public static IntPtr ReadIntPtrBigEndian (ReadOnlySpan<byte> source);
```

Reads a `IntPtr` from the beginning of a read-only span of bytes, as big endian.

Parameters:

- `source`: The read-only span to read.

Returns: The big endian value.

Exceptions:

- `ArgumentOutOfRangeException`: `source` is too small to contain a `IntPtr`.

Reads exactly 4 bytes on 32-bit platforms -or- 8 bytes on 64-bit platforms from the beginning of the span.

## BinaryPrimitives.ReadIntPtrLittleEndian(Byte>) method

```csharp
public static IntPtr ReadIntPtrLittleEndian (ReadOnlySpan<byte> source);
```

Reads a `IntPtr` from the beginning of a read-only span of bytes, as little endian.

Parameters:

- `source`: The read-only span to read.

Returns: The little endian value.

Exceptions:

- `ArgumentOutOfRangeException`: `source` is too small to contain a `IntPtr`.

Reads exactly 4 bytes on 32-bit platforms -or- 8 bytes on 64-bit platforms from the beginning of the span.

## BinaryPrimitives.ReadSingleBigEndian(Byte>) method

```csharp
public static float ReadSingleBigEndian (ReadOnlySpan<byte> source);
```

Reads a `Single` from the beginning of a read-only span of bytes, as big endian.

Parameters:

- `source`: The read-only span to read.

Returns: The big endian value.

Exceptions:

- `ArgumentOutOfRangeException`: `source` is too small to contain a `Single`.

#### Remarks

Reads exactly 4 bytes from the beginning of the span.

## BinaryPrimitives.ReadSingleLittleEndian(Byte>) method

```csharp
public static float ReadSingleLittleEndian (ReadOnlySpan<byte> source);
```

Reads a `Single` from the beginning of a read-only span of bytes, as little endian.

Parameters:

- `source`: The read-only span to read.

Returns: The little endian value.

Exceptions:

- `ArgumentOutOfRangeException`: `source` is too small to contain a `Single`.

#### Remarks

Reads exactly 4 bytes from the beginning of the span.

## BinaryPrimitives.ReadUInt128BigEndian(Byte>) method

```csharp
public static UInt128 ReadUInt128BigEndian (ReadOnlySpan<byte> source);
```

Reads a `UInt128` from the beginning of a read-only span of bytes, as big endian.

Parameters:

- `source`: The read-only span to read.

Returns: The big endian value.

Exceptions:

- `ArgumentOutOfRangeException`: `source` is too small to contain a `UInt128`.

Reads exactly 16 bytes from the beginning of the span.

## BinaryPrimitives.ReadUInt128LittleEndian(Byte>) method

```csharp
public static UInt128 ReadUInt128LittleEndian (ReadOnlySpan<byte> source);
```

Reads a `UInt128` from the beginning of a read-only span of bytes, as little endian.

Parameters:

- `source`: The read-only span to read.

Returns: The little endian value.

Exceptions:

- `ArgumentOutOfRangeException`: `source` is too small to contain a `UInt128`.

Reads exactly 16 bytes from the beginning of the span.

## BinaryPrimitives.ReadUInt16BigEndian(Byte>) method

```csharp
public static ushort ReadUInt16BigEndian (ReadOnlySpan<byte> source);
```

Reads a `UInt16` from the beginning of a read-only span of bytes, as big endian.

Parameters:

- `source`: The read-only span to read.

Returns: The big endian value.

Exceptions:

- `ArgumentOutOfRangeException`: `source` is too small to contain a `UInt16`.

#### Remarks

Reads exactly 2 bytes from the beginning of the span.

## BinaryPrimitives.ReadUInt16LittleEndian(Byte>) method

```csharp
public static ushort ReadUInt16LittleEndian (ReadOnlySpan<byte> source);
```

Reads a `UInt16` from the beginning of a read-only span of bytes, as little endian.

Parameters:

- `source`: The read-only span to read.

Returns: The little endian value.

Exceptions:

- `ArgumentOutOfRangeException`: `source` is too small to contain a `UInt16`.

#### Remarks

Reads exactly 2 bytes from the beginning of the span.

## BinaryPrimitives.ReadUInt32BigEndian(Byte>) method

```csharp
public static uint ReadUInt32BigEndian (ReadOnlySpan<byte> source);
```

Reads a `UInt32` from the beginning of a read-only span of bytes, as big endian.

Parameters:

- `source`: The read-only span to read.

Returns: The big endian value.

Exceptions:

- `ArgumentOutOfRangeException`: `source` is too small to contain a `UInt32`.

#### Remarks

Reads exactly 4 bytes from the beginning of the span.

## BinaryPrimitives.ReadUInt32LittleEndian(Byte>) method

```csharp
public static uint ReadUInt32LittleEndian (ReadOnlySpan<byte> source);
```

Reads a `UInt32` from the beginning of a read-only span of bytes, as little endian.

Parameters:

- `source`: The read-only span of bytes to read.

Returns: The little endian value.

Exceptions:

- `ArgumentOutOfRangeException`: `source` is too small to contain a `UInt32`.

#### Remarks

Reads exactly 4 bytes from the beginning of the span.

## BinaryPrimitives.ReadUInt64BigEndian(Byte>) method

```csharp
public static ulong ReadUInt64BigEndian (ReadOnlySpan<byte> source);
```

Reads a `UInt64` from the beginning of a read-only span of bytes, as big endian.

Parameters:

- `source`: The read-only span of bytes to read.

Returns: The big endian value.

Exceptions:

- `ArgumentOutOfRangeException`: `source` is too small to contain a `UInt64`.

#### Remarks

Reads exactly 8 bytes from the beginning of the span.

## BinaryPrimitives.ReadUInt64LittleEndian(Byte>) method

```csharp
public static ulong ReadUInt64LittleEndian (ReadOnlySpan<byte> source);
```

Reads a `UInt64` from the beginning of a read-only span of bytes, as little endian.

Parameters:

- `source`: The read-only span of bytes to read.

Returns: The little endian value.

Exceptions:

- `ArgumentOutOfRangeException`: `source` is too small to contain a `UInt64`.

#### Remarks

Reads exactly 8 bytes from the beginning of the span.

## BinaryPrimitives.ReadUIntPtrBigEndian(Byte>) method

```csharp
public static UIntPtr ReadUIntPtrBigEndian (ReadOnlySpan<byte> source);
```

Reads a `UIntPtr` from the beginning of a read-only span of bytes, as big endian.

Parameters:

- `source`: The read-only span to read.

Returns: The big endian value.

Exceptions:

- `ArgumentOutOfRangeException`: `source` is too small to contain a `UIntPtr`.

Reads exactly 4 bytes on 32-bit platforms -or- 8 bytes on 64-bit platforms from the beginning of the span.

## BinaryPrimitives.ReadUIntPtrLittleEndian(Byte>) method

```csharp
public static UIntPtr ReadUIntPtrLittleEndian (ReadOnlySpan<byte> source);
```

Reads a `UIntPtr` from the beginning of a read-only span of bytes, as little endian.

Parameters:

- `source`: The read-only span to read.

Returns: The little endian value.

Exceptions:

- `ArgumentOutOfRangeException`: `source` is too small to contain a `UIntPtr`.

Reads exactly 4 bytes on 32-bit platforms or 8 bytes on 64-bit platforms from the beginning of the span.

## BinaryPrimitives.ReverseEndianness(Byte) method

```csharp
public static byte ReverseEndianness (byte value);
```

Reverses a primitive value by performing an endianness swap of the specified `Byte` value, which effectively does nothing for a `Byte`.

Parameters:

- `value`: The value to reverse.

Returns: The passed-in value, unmodified.

#### Remarks

This method effectively does nothing and was added only for consistency.

## BinaryPrimitives.ReverseEndianness(Int128) method

```csharp
public static Int128 ReverseEndianness (Int128 value);
```

Reverses a primitive value by performing an endianness swap of the specified `Int128` value.

Parameters:

- `value`: The value to reverse.

Returns: The reversed value.

To be added.

## BinaryPrimitives.ReverseEndianness(Int16) method

```csharp
public static short ReverseEndianness (short value);
```

Reverses a primitive value by performing an endianness swap of the specified `Int16` value.

Parameters:

- `value`: The value to reverse.

Returns: The reversed value.

To be added.

## BinaryPrimitives.ReverseEndianness(Int32) method

```csharp
public static int ReverseEndianness (int value);
```

Reverses a primitive value by performing an endianness swap of the specified `Int32` value.

Parameters:

- `value`: The value to reverse.

Returns: The reversed value.

To be added.

## BinaryPrimitives.ReverseEndianness(Int64) method

```csharp
public static long ReverseEndianness (long value);
```

Reverses a primitive value by performing an endianness swap of the specified `Int64` value.

Parameters:

- `value`: The value to reverse.

Returns: The reversed value.

To be added.
