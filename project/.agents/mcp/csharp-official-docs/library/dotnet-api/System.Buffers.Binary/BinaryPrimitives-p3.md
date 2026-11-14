---
title: "BinaryPrimitives class (part 3 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Buffers.Binary/BinaryPrimitives.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BinaryPrimitives class (part 3 of 5)

## BinaryPrimitives.TryReadIntPtrBigEndian(Byte>, IntPtr) method

```csharp
public static bool TryReadIntPtrBigEndian (ReadOnlySpan<byte> source, out IntPtr value);
```

Reads a `IntPtr` from the beginning of a read-only span of bytes, as big endian.

Parameters:

- `source`: The read-only span of bytes to read.
- `value`: When this method returns, contains the value read out of the read-only span of bytes, as big endian.

Returns: `false` if the span is too small to contain a `IntPtr`; otherwise, `true`.

Reads exactly 4 bytes on 32-bit platforms -or- 8 bytes on 64-bit platforms from the beginning of the span.

## BinaryPrimitives.TryReadIntPtrLittleEndian(Byte>, IntPtr) method

```csharp
public static bool TryReadIntPtrLittleEndian (ReadOnlySpan<byte> source, out IntPtr value);
```

Reads a `IntPtr` from the beginning of a read-only span of bytes, as little endian.

Parameters:

- `source`: The read-only span of bytes to read.
- `value`: When this method returns, contains the value read out of the read-only span of bytes, as little endian.

Returns: `false` if the span is too small to contain a `IntPtr`; otherwise, `true`.

Reads exactly 4 bytes on 32-bit platforms or 8 bytes on 64-bit platforms from the beginning of the span.

## BinaryPrimitives.TryReadSingleBigEndian(Byte>, Single) method

```csharp
public static bool TryReadSingleBigEndian (ReadOnlySpan<byte> source, out float value);
```

Reads a `Single` from the beginning of a read-only span of bytes, as big endian.

Parameters:

- `source`: The read-only span of bytes to read.
- `value`: When this method returns, contains the value read out of the read-only span of bytes, as big endian.

Returns: `true` if the span is large enough to contain a `Single`; otherwise, `false`.

#### Remarks

Reads exactly 4 bytes from the beginning of the span.

## BinaryPrimitives.TryReadSingleLittleEndian(Byte>, Single) method

```csharp
public static bool TryReadSingleLittleEndian (ReadOnlySpan<byte> source, out float value);
```

Reads a `Single` from the beginning of a read-only span of bytes, as little endian.

Parameters:

- `source`: The read-only span of bytes to read.
- `value`: When this method returns, contains the value read out of the read-only span of bytes, as little endian.

Returns: `true` if the span is large enough to contain a `Single`; otherwise, `false`.

#### Remarks

Reads exactly 4 bytes from the beginning of the span.

## BinaryPrimitives.TryReadUInt128BigEndian(Byte>, UInt128) method

```csharp
public static bool TryReadUInt128BigEndian (ReadOnlySpan<byte> source, out UInt128 value);
```

Reads a `UInt128` from the beginning of a read-only span of bytes, as big endian.

Parameters:

- `source`: The read-only span of bytes to read.
- `value`: When this method returns, contains the value read out of the read-only span of bytes, as big endian.

Returns: `false` if the span is too small to contain a `UInt128`; otherwise, `true`.

Reads exactly 16 bytes from the beginning of the span.

## BinaryPrimitives.TryReadUInt128LittleEndian(Byte>, UInt128) method

```csharp
public static bool TryReadUInt128LittleEndian (ReadOnlySpan<byte> source, out UInt128 value);
```

Reads a `UInt128` from the beginning of a read-only span of bytes, as little endian.

Parameters:

- `source`: The read-only span of bytes to read.
- `value`: When this method returns, contains the value read out of the read-only span of bytes, as little endian.

Returns: `false` if the span is too small to contain a `UInt128`; otherwise, `true`.

Reads exactly 16 bytes from the beginning of the span.

## BinaryPrimitives.TryReadUInt16BigEndian(Byte>, UInt16) method

```csharp
public static bool TryReadUInt16BigEndian (ReadOnlySpan<byte> source, out ushort value);
```

Reads a `UInt16` from the beginning of a read-only span of bytes, as big endian.

Parameters:

- `source`: The read-only span of bytes to read.
- `value`: When this method returns, contains the value read out of the read-only span of bytes, as big endian.

Returns: `true` if the span is large enough to contain a `UInt16`; otherwise, `false`.

#### Remarks

Reads exactly 2 bytes from the beginning of the span.

## BinaryPrimitives.TryReadUInt16LittleEndian(Byte>, UInt16) method

```csharp
public static bool TryReadUInt16LittleEndian (ReadOnlySpan<byte> source, out ushort value);
```

Reads a `UInt16` from the beginning of a read-only span of bytes, as little endian.

Parameters:

- `source`: The read-only span of bytes to read.
- `value`: When this method returns, contains the value read out of the read-only span of bytes, as little endian.

Returns: `true` if the span is large enough to contain a `UInt16`; otherwise, `false`.

#### Remarks

Reads exactly 2 bytes from the beginning of the span.

## BinaryPrimitives.TryReadUInt32BigEndian(Byte>, UInt32) method

```csharp
public static bool TryReadUInt32BigEndian (ReadOnlySpan<byte> source, out uint value);
```

Reads a `UInt32` from the beginning of a read-only span of bytes, as big endian.

Parameters:

- `source`: The read-only span of bytes to read.
- `value`: When this method returns, contains the value read out of the read-only span of bytes, as big endian.

Returns: `true` if the span is large enough to contain a `UInt32`; otherwise, `false`.

#### Remarks

Reads exactly 4 bytes from the beginning of the span.

## BinaryPrimitives.TryReadUInt32LittleEndian(Byte>, UInt32) method

```csharp
public static bool TryReadUInt32LittleEndian (ReadOnlySpan<byte> source, out uint value);
```

Reads a `UInt32` from the beginning of a read-only span of bytes, as little endian.

Parameters:

- `source`: The read-only span of bytes to read.
- `value`: When this method returns, contains the value read out of the read-only span of bytes, as little endian.

Returns: `true` if the span is large enough to contain a `UInt32`; otherwise, `false`.

#### Remarks

Reads exactly 4 bytes from the beginning of the span.

## BinaryPrimitives.TryReadUInt64BigEndian(Byte>, UInt64) method

```csharp
public static bool TryReadUInt64BigEndian (ReadOnlySpan<byte> source, out ulong value);
```

Reads a `UInt64` from the beginning of a read-only span of bytes, as big endian.

Parameters:

- `source`: The read-only span of bytes to read.
- `value`: When this method returns, contains the value read out of the read-only span of bytes, as big endian.

Returns: `true` if the span is large enough to contain a `UInt64`; otherwise, `false`.

#### Remarks

Reads exactly 8 bytes from the beginning of the span.

## BinaryPrimitives.TryReadUInt64LittleEndian(Byte>, UInt64) method

```csharp
public static bool TryReadUInt64LittleEndian (ReadOnlySpan<byte> source, out ulong value);
```

Reads a `UInt64` from the beginning of a read-only span of bytes, as little endian.

Parameters:

- `source`: The read-only span of bytes to read.
- `value`: When this method returns, contains the value read out of the read-only span of bytes, as little endian.

Returns: `true` if the span is large enough to contain a `UInt64`; otherwise, `false`.

#### Remarks

Reads exactly 8 bytes from the beginning of the span.

## BinaryPrimitives.TryReadUIntPtrBigEndian(Byte>, UIntPtr) method

```csharp
public static bool TryReadUIntPtrBigEndian (ReadOnlySpan<byte> source, out UIntPtr value);
```

Reads a `UIntPtr` from the beginning of a read-only span of bytes, as big endian.

Parameters:

- `source`: The read-only span of bytes to read.
- `value`: When this method returns, contains the value read out of the read-only span of bytes, as big endian.

Returns: `false` if the span is too small to contain a `UIntPtr`; otherwise, `true`.

Reads exactly 4 bytes on 32-bit platforms -or- 8 bytes on 64-bit platforms from the beginning of the span.

## BinaryPrimitives.TryReadUIntPtrLittleEndian(Byte>, UIntPtr) method

```csharp
public static bool TryReadUIntPtrLittleEndian (ReadOnlySpan<byte> source, out UIntPtr value);
```

Reads a `UIntPtr` from the beginning of a read-only span of bytes, as little endian.

Parameters:

- `source`: The read-only span of bytes to read.
- `value`: When this method returns, contains the value read out of the read-only span of bytes, as little endian.

Returns: `false` if the span is too small to contain a `UIntPtr`; otherwise, `true`.

Reads exactly 4 bytes on 32-bit platforms -or- 8 bytes on 64-bit platforms from the beginning of the span.

## BinaryPrimitives.TryWriteBFloat16BigEndian(Byte>, BFloat16) method

```csharp
public static bool TryWriteBFloat16BigEndian (Span<byte> destination, System.Numerics.BFloat16 value);
```

To be added.

Parameters:

- `destination`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## BinaryPrimitives.TryWriteBFloat16LittleEndian(Byte>, BFloat16) method

```csharp
public static bool TryWriteBFloat16LittleEndian (Span<byte> destination, System.Numerics.BFloat16 value);
```

To be added.

Parameters:

- `destination`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## BinaryPrimitives.TryWriteDoubleBigEndian(Byte>, Double) method

```csharp
public static bool TryWriteDoubleBigEndian (Span<byte> destination, double value);
```

Writes a `Double` into a span of bytes, as big endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as big endian.
- `value`: The value to write into the span of bytes.

Returns: `true` if the span is large enough to contain a `Double`; otherwise, `false`.

#### Remarks

Writes exactly 8 bytes to the beginning of the span.

## BinaryPrimitives.TryWriteDoubleLittleEndian(Byte>, Double) method

```csharp
public static bool TryWriteDoubleLittleEndian (Span<byte> destination, double value);
```

Writes a `Double` into a span of bytes, as little endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as little endian.
- `value`: The value to write into the span of bytes.

Returns: `true` if the span is large enough to contain a `Double`; otherwise, `false`.

#### Remarks

Writes exactly 8 bytes to the beginning of the span.

## BinaryPrimitives.TryWriteHalfBigEndian(Byte>, Half) method

```csharp
public static bool TryWriteHalfBigEndian (Span<byte> destination, Half value);
```

Writes a `Half` into a span of bytes, as big endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as big endian.
- `value`: The value to write into the span of bytes.

Returns: `true` if the span is large enough to contain a `Half`; otherwise, `false`.

#### Remarks

Writes exactly 2 bytes to the beginning of the span.

## BinaryPrimitives.TryWriteHalfLittleEndian(Byte>, Half) method

```csharp
public static bool TryWriteHalfLittleEndian (Span<byte> destination, Half value);
```

Writes a `Half` into a span of bytes, as little endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as little endian.
- `value`: The value to write into the span of bytes.

Returns: `true` if the span is large enough to contain a `Half`; otherwise, `false`.

#### Remarks

Writes exactly 2 bytes to the beginning of the span.

## BinaryPrimitives.TryWriteInt128BigEndian(Byte>, Int128) method

```csharp
public static bool TryWriteInt128BigEndian (Span<byte> destination, Int128 value);
```

Writes a `Int128` into a span of bytes, as big endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as big endian.
- `value`: The value to write into the span of bytes.

Returns: `false` if the span is too small to contain the value; otherwise, `true`.

Writes exactly 16 bytes to the beginning of the span.

## BinaryPrimitives.TryWriteInt128LittleEndian(Byte>, Int128) method

```csharp
public static bool TryWriteInt128LittleEndian (Span<byte> destination, Int128 value);
```

Writes a `Int128` into a span of bytes, as little endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as little endian.
- `value`: The value to write into the span of bytes.

Returns: `false` if the span is too small to contain the value; otherwise, `true`.

Writes exactly 16 bytes to the beginning of the span.

## BinaryPrimitives.TryWriteInt16BigEndian(Byte>, Int16) method

```csharp
public static bool TryWriteInt16BigEndian (Span<byte> destination, short value);
```

Writes an `Int16` into a span of bytes, as big endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as big endian.
- `value`: The value to write into the span of bytes.

Returns: `true` if the span is large enough to contain an `Int16`; otherwise, `false`.

#### Remarks

Writes exactly 2 bytes to the beginning of the span.

## BinaryPrimitives.TryWriteInt16LittleEndian(Byte>, Int16) method

```csharp
public static bool TryWriteInt16LittleEndian (Span<byte> destination, short value);
```

Writes an `Int16` into a span of bytes, as little endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as little endian.
- `value`: The value to write into the span of bytes.

Returns: `true` if the span is large enough to contain an `Int16`; otherwise, `false`.

#### Remarks

Writes exactly 2 bytes to the beginning of the span.

## BinaryPrimitives.TryWriteInt32BigEndian(Byte>, Int32) method

```csharp
public static bool TryWriteInt32BigEndian (Span<byte> destination, int value);
```

Writes an `Int32` into a span of bytes, as big endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as big endian.
- `value`: The value to write into the span of bytes.

Returns: `true` if the span is large enough to contain an `Int32`; otherwise, `false`.

#### Remarks

Writes exactly 4 bytes to the beginning of the span.

## BinaryPrimitives.TryWriteInt32LittleEndian(Byte>, Int32) method

```csharp
public static bool TryWriteInt32LittleEndian (Span<byte> destination, int value);
```

Writes an `Int32` into a span of bytes, as little endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as little endian.
- `value`: The value to write into the span of bytes.

Returns: `true` if the span is large enough to contain an `Int32`; otherwise, `false`.

#### Remarks

Writes exactly 4 bytes to the beginning of the span.

## BinaryPrimitives.TryWriteInt64BigEndian(Byte>, Int64) method

```csharp
public static bool TryWriteInt64BigEndian (Span<byte> destination, long value);
```

Writes an `Int64` into a span of bytes, as big endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as big endian.
- `value`: The value to write into the span of bytes.

Returns: `true` if the span is large enough to contain an `Int64`; otherwise, `false`.

#### Remarks

Writes exactly 8 bytes to the beginning of the span.
