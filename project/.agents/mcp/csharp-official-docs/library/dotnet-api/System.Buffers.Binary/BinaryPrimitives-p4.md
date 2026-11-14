---
title: "BinaryPrimitives class (part 4 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Buffers.Binary/BinaryPrimitives.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BinaryPrimitives class (part 4 of 5)

## BinaryPrimitives.TryWriteInt64LittleEndian(Byte>, Int64) method

```csharp
public static bool TryWriteInt64LittleEndian (Span<byte> destination, long value);
```

Writes an `Int64` into a span of bytes, as little endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as little endian.
- `value`: The value to write into the span of bytes.

Returns: `true` if the span is large enough to contain an `Int64`; otherwise, `false`.

#### Remarks

Writes exactly 8 bytes to the beginning of the span.

## BinaryPrimitives.TryWriteIntPtrBigEndian(Byte>, IntPtr) method

```csharp
public static bool TryWriteIntPtrBigEndian (Span<byte> destination, IntPtr value);
```

Writes a `IntPtr` into a span of bytes, as big endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as big endian.
- `value`: The value to write into the span of bytes.

Returns: `false` if the span is too small to contain the value; otherwise, `true`.

Writes exactly 4 bytes on 32-bit platforms -or- 8 bytes on 64-bit platforms to the beginning of the span.

## BinaryPrimitives.TryWriteIntPtrLittleEndian(Byte>, IntPtr) method

```csharp
public static bool TryWriteIntPtrLittleEndian (Span<byte> destination, IntPtr value);
```

Writes a `IntPtr` into a span of bytes, as little endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as little endian.
- `value`: The value to write into the span of bytes.

Returns: `false` if the span is too small to contain the value; otherwise, `true`.

Writes exactly 4 bytes on 32-bit platforms -or- 8 bytes on 64-bit platforms to the beginning of the span.

## BinaryPrimitives.TryWriteSingleBigEndian(Byte>, Single) method

```csharp
public static bool TryWriteSingleBigEndian (Span<byte> destination, float value);
```

Writes a `Single` into a span of bytes, as big endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as big endian.
- `value`: The value to write into the span of bytes.

Returns: `true` if the span is large enough to contain a `Single`; otherwise, `false`.

#### Remarks

Writes exactly 4 bytes to the beginning of the span.

## BinaryPrimitives.TryWriteSingleLittleEndian(Byte>, Single) method

```csharp
public static bool TryWriteSingleLittleEndian (Span<byte> destination, float value);
```

Writes a `Single` into a span of bytes, as little endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as little endian.
- `value`: The value to write into the span of bytes.

Returns: `true` if the span is large enough to contain a `Single`; otherwise, `false`.

#### Remarks

Writes exactly 4 bytes to the beginning of the span.

## BinaryPrimitives.TryWriteUInt128BigEndian(Byte>, UInt128) method

```csharp
public static bool TryWriteUInt128BigEndian (Span<byte> destination, UInt128 value);
```

Writes a `UInt128` into a span of bytes, as big endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as big endian.
- `value`: The value to write into the span of bytes.

Returns: `false` if the span is too small to contain the value; otherwise, `true`.

Writes exactly 16 bytes to the beginning of the span.

## BinaryPrimitives.TryWriteUInt128LittleEndian(Byte>, UInt128) method

```csharp
public static bool TryWriteUInt128LittleEndian (Span<byte> destination, UInt128 value);
```

Writes a `UInt128` into a span of bytes, as little endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as little endian.
- `value`: The value to write into the span of bytes.

Returns: `false` if the span is too small to contain the value; otherwise, `true`.

Writes exactly 16 bytes to the beginning of the span.

## BinaryPrimitives.TryWriteUInt16BigEndian(Byte>, UInt16) method

```csharp
public static bool TryWriteUInt16BigEndian (Span<byte> destination, ushort value);
```

Writes a `UInt16` into a span of bytes, as big endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as big endian.
- `value`: The value to write into the span of bytes.

Returns: `true` if the span is large enough to contain a `UInt16`; otherwise, `false`.

#### Remarks

Writes exactly 2 bytes to the beginning of the span.

## BinaryPrimitives.TryWriteUInt16LittleEndian(Byte>, UInt16) method

```csharp
public static bool TryWriteUInt16LittleEndian (Span<byte> destination, ushort value);
```

Writes a `UInt16` into a span of bytes, as little endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as little endian.
- `value`: The value to write into the span of bytes.

Returns: `true` if the span is large enough to contain a `UInt16`; otherwise, `false`.

#### Remarks

Writes exactly 2 bytes to the beginning of the span.

## BinaryPrimitives.TryWriteUInt32BigEndian(Byte>, UInt32) method

```csharp
public static bool TryWriteUInt32BigEndian (Span<byte> destination, uint value);
```

Writes a `UInt32` into a span of bytes, as big endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as big endian.
- `value`: The value to write into the span of bytes.

Returns: `true` if the span is large enough to contain a `UInt32`; otherwise, `false`.

#### Remarks

Writes exactly 4 bytes to the beginning of the span.

## BinaryPrimitives.TryWriteUInt32LittleEndian(Byte>, UInt32) method

```csharp
public static bool TryWriteUInt32LittleEndian (Span<byte> destination, uint value);
```

Writes a `UInt32` into a span of bytes, as little endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as little endian.
- `value`: The value to write into the span of bytes.

Returns: `true` if the span is large enough to contain a `UInt32`; otherwise, `false`.

#### Remarks

Writes exactly 4 bytes to the beginning of the span.

## BinaryPrimitives.TryWriteUInt64BigEndian(Byte>, UInt64) method

```csharp
public static bool TryWriteUInt64BigEndian (Span<byte> destination, ulong value);
```

Writes a `UInt64` into a span of bytes, as big endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as big endian.
- `value`: The value to write into the span of bytes.

Returns: `true` if the span is large enough to contain a `UInt64`; otherwise, `false`.

#### Remarks

Writes exactly 8 bytes to the beginning of the span.

## BinaryPrimitives.TryWriteUInt64LittleEndian(Byte>, UInt64) method

```csharp
public static bool TryWriteUInt64LittleEndian (Span<byte> destination, ulong value);
```

Writes a `UInt64` into a span of bytes, as little endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as little endian.
- `value`: The value to write into the span of bytes.

Returns: `true` if the span is large enough to contain a `UInt64`; otherwise, `false`.

#### Remarks

Writes exactly 8 bytes to the beginning of the span.

## BinaryPrimitives.TryWriteUIntPtrBigEndian(Byte>, UIntPtr) method

```csharp
public static bool TryWriteUIntPtrBigEndian (Span<byte> destination, UIntPtr value);
```

Writes a `UIntPtr` into a span of bytes, as big endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as big endian.
- `value`: The value to write into the span of bytes.

Returns: `false` if the span is too small to contain the value; otherwise, `true`.

Writes exactly 4 bytes on 32-bit platforms -or- 8 bytes on 64-bit platforms to the beginning of the span.

## BinaryPrimitives.TryWriteUIntPtrLittleEndian(Byte>, UIntPtr) method

```csharp
public static bool TryWriteUIntPtrLittleEndian (Span<byte> destination, UIntPtr value);
```

Writes a `UIntPtr` into a span of bytes, as little endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as little endian.
- `value`: The value to write into the span of bytes.

Returns: `false` if the span is too small to contain the value; otherwise, `true`.

Writes exactly 4 bytes on 32-bit platforms -or- 8 bytes on 64-bit platforms to the beginning of the span.

## BinaryPrimitives.WriteBFloat16BigEndian(Byte>, BFloat16) method

```csharp
public static void WriteBFloat16BigEndian (Span<byte> destination, System.Numerics.BFloat16 value);
```

To be added.

Parameters:

- `destination`: To be added.
- `value`: To be added.

To be added.

## BinaryPrimitives.WriteBFloat16LittleEndian(Byte>, BFloat16) method

```csharp
public static void WriteBFloat16LittleEndian (Span<byte> destination, System.Numerics.BFloat16 value);
```

To be added.

Parameters:

- `destination`: To be added.
- `value`: To be added.

To be added.

## BinaryPrimitives.WriteDoubleBigEndian(Byte>, Double) method

```csharp
public static void WriteDoubleBigEndian (Span<byte> destination, double value);
```

Writes a `Double` into a span of bytes, as big endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as big endian.
- `value`: The value to write into the span of bytes.

Exceptions:

- `ArgumentOutOfRangeException`: `destination` is too small to contain a `Double`.

#### Remarks

Writes exactly 8 bytes to the beginning of the span.

## BinaryPrimitives.WriteDoubleLittleEndian(Byte>, Double) method

```csharp
public static void WriteDoubleLittleEndian (Span<byte> destination, double value);
```

Writes a `Double` into a span of bytes, as little endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as little endian.
- `value`: The value to write into the span of bytes.

Exceptions:

- `ArgumentOutOfRangeException`: `destination` is too small to contain a `Double`.

#### Remarks

Writes exactly 8 bytes to the beginning of the span.

## BinaryPrimitives.WriteHalfBigEndian(Byte>, Half) method

```csharp
public static void WriteHalfBigEndian (Span<byte> destination, Half value);
```

Writes a `Half` into a span of bytes, as big endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as big endian.
- `value`: The value to write into the span of bytes.

Exceptions:

- `ArgumentOutOfRangeException`: `destination` is too small to contain a `Half`.

#### Remarks

Writes exactly 2 bytes to the beginning of the span.

## BinaryPrimitives.WriteHalfLittleEndian(Byte>, Half) method

```csharp
public static void WriteHalfLittleEndian (Span<byte> destination, Half value);
```

Writes a `Half` into a span of bytes, as little endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as little endian.
- `value`: The value to write into the span of bytes.

Exceptions:

- `ArgumentOutOfRangeException`: `destination` is too small to contain a `Half`.

#### Remarks

Writes exactly 2 bytes to the beginning of the span.

## BinaryPrimitives.WriteInt128BigEndian(Byte>, Int128) method

```csharp
public static void WriteInt128BigEndian (Span<byte> destination, Int128 value);
```

Writes a `Int128` into a span of bytes, as big endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as big endian.
- `value`: The value to write into the span of bytes.

Exceptions:

- `ArgumentOutOfRangeException`: `destination` is too small to contain a `Int128`.

Writes exactly 16 bytes to the beginning of the span.

## BinaryPrimitives.WriteInt128LittleEndian(Byte>, Int128) method

```csharp
public static void WriteInt128LittleEndian (Span<byte> destination, Int128 value);
```

Writes a `Int128` into a span of bytes, as little endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as little endian.
- `value`: The value to write into the span of bytes.

Exceptions:

- `ArgumentOutOfRangeException`: `destination` is too small to contain a `Int128`.

Writes exactly 16 bytes to the beginning of the span.

## BinaryPrimitives.WriteInt16BigEndian(Byte>, Int16) method

```csharp
public static void WriteInt16BigEndian (Span<byte> destination, short value);
```

Writes an `Int16` into a span of bytes, as big endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as big endian.
- `value`: The value to write into the span of bytes.

Exceptions:

- `ArgumentOutOfRangeException`: `destination` is too small to contain an `Int16`.

#### Remarks

Writes exactly 2 bytes to the beginning of the span.

## BinaryPrimitives.WriteInt16LittleEndian(Byte>, Int16) method

```csharp
public static void WriteInt16LittleEndian (Span<byte> destination, short value);
```

Writes an `Int16` into a span of bytes, as little endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as little endian.
- `value`: The value to write into the span of bytes.

Exceptions:

- `ArgumentOutOfRangeException`: `destination` is too small to contain an `Int16`.

#### Remarks

Writes exactly 2 bytes to the beginning of the span.

## BinaryPrimitives.WriteInt32BigEndian(Byte>, Int32) method

```csharp
public static void WriteInt32BigEndian (Span<byte> destination, int value);
```

Writes an `Int32` into a span of bytes, as big endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as big endian.
- `value`: The value to write into the span of bytes.

Exceptions:

- `ArgumentOutOfRangeException`: `destination` is too small to contain an `Int32`.

#### Remarks

Writes exactly 4 bytes to the beginning of the span.

## BinaryPrimitives.WriteInt32LittleEndian(Byte>, Int32) method

```csharp
public static void WriteInt32LittleEndian (Span<byte> destination, int value);
```

Writes an `Int32` into a span of bytes, as little endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as little endian.
- `value`: The value to write into the span of bytes.

Exceptions:

- `ArgumentOutOfRangeException`: `destination` is too small to contain an `Int32`.

#### Remarks

Writes exactly 4 bytes to the beginning of the span.

## BinaryPrimitives.WriteInt64BigEndian(Byte>, Int64) method

```csharp
public static void WriteInt64BigEndian (Span<byte> destination, long value);
```

Writes an `Int64` into a span of bytes, as big endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as big endian.
- `value`: The value to write into the span of bytes.

Exceptions:

- `ArgumentOutOfRangeException`: `destination` is too small to contain an `Int64`.

#### Remarks

Writes exactly 8 bytes to the beginning of the span.
