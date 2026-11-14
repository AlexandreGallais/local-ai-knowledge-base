---
title: "BinaryPrimitives class (part 2 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Buffers.Binary/BinaryPrimitives.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BinaryPrimitives class (part 2 of 5)

## BinaryPrimitives.ReverseEndianness(IntPtr) method

```csharp
public static IntPtr ReverseEndianness (IntPtr value);
```

Reverses a primitive value by performing an endianness swap of the specified `IntPtr` value.

Parameters:

- `value`: The value to reverse.

Returns: The reversed value.

To be added.

## BinaryPrimitives.ReverseEndianness(SByte) method

```csharp
public static sbyte ReverseEndianness (sbyte value);
```

Reverses a primitive value by performing an endianness swap of the specified `SByte` value, which effectively does nothing for an `SByte`.

Parameters:

- `value`: The value to reverse.

Returns: The passed-in value, unmodified.

#### Remarks

This method effectively does nothing and was added only for consistency.

## BinaryPrimitives.ReverseEndianness(UInt128) method

```csharp
public static UInt128 ReverseEndianness (UInt128 value);
```

Reverses a primitive value by performing an endianness swap of the specified `UInt128` value.

Parameters:

- `value`: The value to reverse.

Returns: The reversed value.

To be added.

## BinaryPrimitives.ReverseEndianness(UInt16) method

```csharp
public static ushort ReverseEndianness (ushort value);
```

Reverses a primitive value by performing an endianness swap of the specified `UInt16` value.

Parameters:

- `value`: The value to reverse.

Returns: The reversed value.

To be added.

## BinaryPrimitives.ReverseEndianness(UInt32) method

```csharp
public static uint ReverseEndianness (uint value);
```

Reverses a primitive value by performing an endianness swap of the specified `UInt32` value.

Parameters:

- `value`: The value to reverse.

Returns: The reversed value.

To be added.

## BinaryPrimitives.ReverseEndianness(UInt64) method

```csharp
public static ulong ReverseEndianness (ulong value);
```

Reverses a primitive value by performing an endianness swap of the specified `UInt64` value.

Parameters:

- `value`: The value to reverse.

Returns: The reversed value.

To be added.

## BinaryPrimitives.ReverseEndianness(UIntPtr) method

```csharp
public static UIntPtr ReverseEndianness (UIntPtr value);
```

Reverses a primitive value by performing an endianness swap of the specified `UIntPtr` value.

Parameters:

- `value`: The value to reverse.

Returns: The reversed value.

To be added.

## BinaryPrimitives.ReverseEndianness(Int128>, Int128>) method

```csharp
public static void ReverseEndianness (ReadOnlySpan<Int128> source, Span<Int128> destination);
```

Copies every primitive value from `source` to `destination`, reversing each primitive by performing an endianness swap as part of writing each.

Parameters:

- `source`: The source span to copy.
- `destination`: The destination to which the source elements should be copied.

To be added.

## BinaryPrimitives.ReverseEndianness(Int16>, Int16>) method

```csharp
public static void ReverseEndianness (ReadOnlySpan<short> source, Span<short> destination);
```

Copies every primitive value from `source` to `destination`, reversing each primitive by performing an endianness swap as part of writing each.

Parameters:

- `source`: The source span to copy.
- `destination`: The destination to which the source elements should be copied.

To be added.

## BinaryPrimitives.ReverseEndianness(Int32>, Int32>) method

```csharp
public static void ReverseEndianness (ReadOnlySpan<int> source, Span<int> destination);
```

Copies every primitive value from `source` to `destination`, reversing each primitive by performing an endianness swap as part of writing each.

Parameters:

- `source`: The source span to copy.
- `destination`: The destination to which the source elements should be copied.

To be added.

## BinaryPrimitives.ReverseEndianness(Int64>, Int64>) method

```csharp
public static void ReverseEndianness (ReadOnlySpan<long> source, Span<long> destination);
```

Copies every primitive value from `source` to `destination`, reversing each primitive by performing an endianness swap as part of writing each.

Parameters:

- `source`: The source span to copy.
- `destination`: The destination to which the source elements should be copied.

To be added.

## BinaryPrimitives.ReverseEndianness(IntPtr>, IntPtr>) method

```csharp
public static void ReverseEndianness (ReadOnlySpan<IntPtr> source, Span<IntPtr> destination);
```

Copies every primitive value from `source` to `destination`, reversing each primitive by performing an endianness swap as part of writing each.

Parameters:

- `source`: The source span to copy.
- `destination`: The destination to which the source elements should be copied.

To be added.

## BinaryPrimitives.ReverseEndianness(UInt128>, UInt128>) method

```csharp
public static void ReverseEndianness (ReadOnlySpan<UInt128> source, Span<UInt128> destination);
```

Copies every primitive value from `source` to `destination`, reversing each primitive by performing an endianness swap as part of writing each.

Parameters:

- `source`: The source span to copy.
- `destination`: The destination to which the source elements should be copied.

To be added.

## BinaryPrimitives.ReverseEndianness(UInt16>, UInt16>) method

```csharp
public static void ReverseEndianness (ReadOnlySpan<ushort> source, Span<ushort> destination);
```

Copies every primitive value from `source` to `destination`, reversing each primitive by performing an endianness swap as part of writing each.

Parameters:

- `source`: The source span to copy.
- `destination`: The destination to which the source elements should be copied.

Exceptions:

- `ArgumentException`: The `destination`'s length is smaller than that of the `source`.

The source and destination spans may overlap. The same span may be passed as both the source and the destination in order to reverse each element's endianness in place.

## BinaryPrimitives.ReverseEndianness(UInt32>, UInt32>) method

```csharp
public static void ReverseEndianness (ReadOnlySpan<uint> source, Span<uint> destination);
```

Copies every primitive value from `source` to `destination`, reversing each primitive by performing an endianness swap as part of writing each.

Parameters:

- `source`: The source span to copy.
- `destination`: The destination to which the source elements should be copied.

To be added.

## BinaryPrimitives.ReverseEndianness(UInt64>, UInt64>) method

```csharp
public static void ReverseEndianness (ReadOnlySpan<ulong> source, Span<ulong> destination);
```

Copies every primitive value from `source` to `destination`, reversing each primitive by performing an endianness swap as part of writing each.

Parameters:

- `source`: The source span to copy.
- `destination`: The destination to which the source elements should be copied.

To be added.

## BinaryPrimitives.ReverseEndianness(UIntPtr>, UIntPtr>) method

```csharp
public static void ReverseEndianness (ReadOnlySpan<UIntPtr> source, Span<UIntPtr> destination);
```

Copies every primitive value from `source` to `destination`, reversing each primitive by performing an endianness swap as part of writing each.

Parameters:

- `source`: The source span to copy.
- `destination`: The destination to which the source elements should be copied.

To be added.

## BinaryPrimitives.TryReadBFloat16BigEndian(Byte>, BFloat16) method

```csharp
public static bool TryReadBFloat16BigEndian (ReadOnlySpan<byte> source, out System.Numerics.BFloat16 value);
```

To be added.

Parameters:

- `source`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## BinaryPrimitives.TryReadBFloat16LittleEndian(Byte>, BFloat16) method

```csharp
public static bool TryReadBFloat16LittleEndian (ReadOnlySpan<byte> source, out System.Numerics.BFloat16 value);
```

To be added.

Parameters:

- `source`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## BinaryPrimitives.TryReadDoubleBigEndian(Byte>, Double) method

```csharp
public static bool TryReadDoubleBigEndian (ReadOnlySpan<byte> source, out double value);
```

Reads a `Double` from the beginning of a read-only span of bytes, as big endian.

Parameters:

- `source`: The read-only span of bytes to read.
- `value`: When this method returns, contains the value read out of the read-only span of bytes, as big endian.

Returns: `true` if the span is large enough to contain a `Double`; otherwise, `false`.

#### Remarks

Reads exactly 8 bytes from the beginning of the span.

## BinaryPrimitives.TryReadDoubleLittleEndian(Byte>, Double) method

```csharp
public static bool TryReadDoubleLittleEndian (ReadOnlySpan<byte> source, out double value);
```

Reads a `Double` from the beginning of a read-only span of bytes, as little endian.

Parameters:

- `source`: The read-only span of bytes to read.
- `value`: When this method returns, contains the value read out of the read-only span of bytes, as little endian.

Returns: `true` if the span is large enough to contain a `Double`; otherwise, `false`.

#### Remarks

Reads exactly 8 bytes from the beginning of the span.

## BinaryPrimitives.TryReadHalfBigEndian(Byte>, Half) method

```csharp
public static bool TryReadHalfBigEndian (ReadOnlySpan<byte> source, out Half value);
```

Reads a `Half` from the beginning of a read-only span of bytes, as big endian.

Parameters:

- `source`: The read-only span of bytes to read.
- `value`: When this method returns, contains the value read out of the read-only span of bytes, as big endian.

Returns: `true` if the span is large enough to contain a `Half`; otherwise, `false`.

#### Remarks

Reads exactly 2 bytes from the beginning of the span.

## BinaryPrimitives.TryReadHalfLittleEndian(Byte>, Half) method

```csharp
public static bool TryReadHalfLittleEndian (ReadOnlySpan<byte> source, out Half value);
```

Reads a `Half` from the beginning of a read-only span of bytes, as little endian.

Parameters:

- `source`: The read-only span of bytes to read.
- `value`: When this method returns, contains the value read out of the read-only span of bytes, as little endian.

Returns: `true` if the span is large enough to contain a `Half`; otherwise, `false`.

#### Remarks

Reads exactly 2 bytes from the beginning of the span.

## BinaryPrimitives.TryReadInt128BigEndian(Byte>, Int128) method

```csharp
public static bool TryReadInt128BigEndian (ReadOnlySpan<byte> source, out Int128 value);
```

Reads a `Int128` from the beginning of a read-only span of bytes, as big endian.

Parameters:

- `source`: The read-only span of bytes to read.
- `value`: When this method returns, contains the value read out of the read-only span of bytes, as big endian.

Returns: `false` if the span is too small to contain a `Int128`; otherwise, `true`.

Reads exactly 16 bytes from the beginning of the span.

## BinaryPrimitives.TryReadInt128LittleEndian(Byte>, Int128) method

```csharp
public static bool TryReadInt128LittleEndian (ReadOnlySpan<byte> source, out Int128 value);
```

Reads a `Int128` from the beginning of a read-only span of bytes, as little endian.

Parameters:

- `source`: The read-only span of bytes to read.
- `value`: When this method returns, contains the value read out of the read-only span of bytes, as little endian.

Returns: `false` if the span is too small to contain a `Int128`; otherwise, `true`

Reads exactly 16 bytes from the beginning of the span.

## BinaryPrimitives.TryReadInt16BigEndian(Byte>, Int16) method

```csharp
public static bool TryReadInt16BigEndian (ReadOnlySpan<byte> source, out short value);
```

Reads an `Int16` from the beginning of a read-only span of bytes, as big endian.

Parameters:

- `source`: The read-only span of bytes to read.
- `value`: When this method returns, contains the value read out of the read-only span of bytes, as big endian.

Returns: `true` if the span is large enough to contain an `Int16`; otherwise, `false`.

#### Remarks

Reads exactly 2 bytes from the beginning of the span.

## BinaryPrimitives.TryReadInt16LittleEndian(Byte>, Int16) method

```csharp
public static bool TryReadInt16LittleEndian (ReadOnlySpan<byte> source, out short value);
```

Reads an `Int16` from the beginning of a read-only span of bytes, as little endian.

Parameters:

- `source`: The read-only span of bytes to read.
- `value`: When this method returns, contains the value read out of the read-only span of bytes, as little endian.

Returns: `true` if the span is large enough to contain an `Int16`; otherwise, `false`.

#### Remarks

Reads exactly 2 bytes from the beginning of the span.

## BinaryPrimitives.TryReadInt32BigEndian(Byte>, Int32) method

```csharp
public static bool TryReadInt32BigEndian (ReadOnlySpan<byte> source, out int value);
```

Reads an `Int32` from the beginning of a read-only span of bytes, as big endian.

Parameters:

- `source`: The read-only span of bytes to read.
- `value`: When this method returns, contains the value read out of the read-only span of bytes, as big endian.

Returns: `true` if the span is large enough to contain an `Int32`; otherwise, `false`.

#### Remarks

Reads exactly 4 bytes from the beginning of the span.

## BinaryPrimitives.TryReadInt32LittleEndian(Byte>, Int32) method

```csharp
public static bool TryReadInt32LittleEndian (ReadOnlySpan<byte> source, out int value);
```

Reads an `Int32` from the beginning of a read-only span of bytes, as little endian.

Parameters:

- `source`: The read-only span of bytes to read.
- `value`: When this method returns, contains the value read out of the read-only span of bytes, as little endian.

Returns: `true` if the span is large enough to contain an `Int32`; otherwise, `false`.

#### Remarks

Reads exactly 4 bytes from the beginning of the span.

## BinaryPrimitives.TryReadInt64BigEndian(Byte>, Int64) method

```csharp
public static bool TryReadInt64BigEndian (ReadOnlySpan<byte> source, out long value);
```

Reads an `Int64` from the beginning of a read-only span of bytes, as big endian.

Parameters:

- `source`: The read-only span of bytes to read.
- `value`: When this method returns, contains the value read out of the read-only span of bytes, as big endian.

Returns: `true` if the span is large enough to contain an `Int64`; otherwise, `false`.

#### Remarks

Reads exactly 8 bytes from the beginning of the span.

## BinaryPrimitives.TryReadInt64LittleEndian(Byte>, Int64) method

```csharp
public static bool TryReadInt64LittleEndian (ReadOnlySpan<byte> source, out long value);
```

Reads an `Int64` from the beginning of a read-only span of bytes, as little endian.

Parameters:

- `source`: The read-only span of bytes to read.
- `value`: When this method returns, contains the value read out of the read-only span of bytes, as little endian.

Returns: `true` if the span is large enough to contain an `Int64`; otherwise, `false`.

#### Remarks

Reads exactly 8 bytes from the beginning of the span.
