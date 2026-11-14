---
title: "BinaryPrimitives class (part 5 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Buffers.Binary/BinaryPrimitives.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BinaryPrimitives class (part 5 of 5)

## BinaryPrimitives.WriteInt64LittleEndian(Byte>, Int64) method

```csharp
public static void WriteInt64LittleEndian (Span<byte> destination, long value);
```

Writes an `Int64` into a span of bytes, as little endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as little endian.
- `value`: The value to write into the span of bytes.

Exceptions:

- `ArgumentOutOfRangeException`: `destination` is too small to contain an `Int64`.

#### Remarks

Writes exactly 8 bytes to the beginning of the span.

## BinaryPrimitives.WriteIntPtrBigEndian(Byte>, IntPtr) method

```csharp
public static void WriteIntPtrBigEndian (Span<byte> destination, IntPtr value);
```

Writes a `IntPtr` into a span of bytes, as big endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as big endian.
- `value`: The value to write into the span of bytes.

Exceptions:

- `ArgumentOutOfRangeException`: `destination` is too small to contain a `IntPtr`.

Writes exactly 4 bytes on 32-bit platforms -or- 8 bytes on 64-bit platforms to the beginning of the span.

## BinaryPrimitives.WriteIntPtrLittleEndian(Byte>, IntPtr) method

```csharp
public static void WriteIntPtrLittleEndian (Span<byte> destination, IntPtr value);
```

Writes a `IntPtr` into a span of bytes, as little endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as little endian.
- `value`: The value to write into the span of bytes.

Exceptions:

- `ArgumentOutOfRangeException`: `destination` is too small to contain a `IntPtr`.

Writes exactly 4 bytes on 32-bit platforms -or- 8 bytes on 64-bit platforms to the beginning of the span.

## BinaryPrimitives.WriteSingleBigEndian(Byte>, Single) method

```csharp
public static void WriteSingleBigEndian (Span<byte> destination, float value);
```

Writes a `Single` into a span of bytes, as big endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as big endian.
- `value`: The value to write into the span of bytes.

Exceptions:

- `ArgumentOutOfRangeException`: `destination` is too small to contain a `Single`.

#### Remarks

Writes exactly 4 bytes to the beginning of the span.

## BinaryPrimitives.WriteSingleLittleEndian(Byte>, Single) method

```csharp
public static void WriteSingleLittleEndian (Span<byte> destination, float value);
```

Writes a `Single` into a span of bytes, as little endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as little endian.
- `value`: The value to write into the span of bytes.

Exceptions:

- `ArgumentOutOfRangeException`: `destination` is too small to contain a `Single`.

#### Remarks

Writes exactly 4 bytes to the beginning of the span.

## BinaryPrimitives.WriteUInt128BigEndian(Byte>, UInt128) method

```csharp
public static void WriteUInt128BigEndian (Span<byte> destination, UInt128 value);
```

Writes a `UInt128` into a span of bytes, as big endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as big endian.
- `value`: The value to write into the span of bytes.

Exceptions:

- `ArgumentOutOfRangeException`: `destination` is too small to contain a `UInt128`.

Writes exactly 16 bytes to the beginning of the span.

## BinaryPrimitives.WriteUInt128LittleEndian(Byte>, UInt128) method

```csharp
public static void WriteUInt128LittleEndian (Span<byte> destination, UInt128 value);
```

Writes a `UInt128` into a span of bytes, as little endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as little endian.
- `value`: The value to write into the span of bytes.

Exceptions:

- `ArgumentOutOfRangeException`: `destination` is too small to contain a `UInt128`.

Writes exactly 16 bytes to the beginning of the span.

## BinaryPrimitives.WriteUInt16BigEndian(Byte>, UInt16) method

```csharp
public static void WriteUInt16BigEndian (Span<byte> destination, ushort value);
```

Writes a `UInt16` into a span of bytes, as big endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as big endian.
- `value`: The value to write into the span of bytes.

Exceptions:

- `ArgumentOutOfRangeException`: `destination` is too small to contain a `UInt16`.

#### Remarks

Writes exactly 2 bytes to the beginning of the span.

## BinaryPrimitives.WriteUInt16LittleEndian(Byte>, UInt16) method

```csharp
public static void WriteUInt16LittleEndian (Span<byte> destination, ushort value);
```

Writes a `UInt16` into a span of bytes, as little endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as little endian.
- `value`: The value to write into the span of bytes.

Exceptions:

- `ArgumentOutOfRangeException`: `destination` is too small to contain a `UInt16`.

#### Remarks

Writes exactly 2 bytes to the beginning of the span.

## BinaryPrimitives.WriteUInt32BigEndian(Byte>, UInt32) method

```csharp
public static void WriteUInt32BigEndian (Span<byte> destination, uint value);
```

Writes a `UInt32` into a span of bytes, as big endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as big endian.
- `value`: The value to write into the span of bytes.

Exceptions:

- `ArgumentOutOfRangeException`: `destination` is too small to contain a `UInt32`.

#### Remarks

Writes exactly 4 bytes to the beginning of the span.

## BinaryPrimitives.WriteUInt32LittleEndian(Byte>, UInt32) method

```csharp
public static void WriteUInt32LittleEndian (Span<byte> destination, uint value);
```

Writes a `UInt32` into a span of bytes, as little endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as little endian.
- `value`: The value to write into the span of bytes.

Exceptions:

- `ArgumentOutOfRangeException`: `destination` is too small to contain a `UInt32`.

#### Remarks

Writes exactly 4 bytes to the beginning of the span.

## BinaryPrimitives.WriteUInt64BigEndian(Byte>, UInt64) method

```csharp
public static void WriteUInt64BigEndian (Span<byte> destination, ulong value);
```

Writes a `UInt64` into a span of bytes, as big endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as big endian.
- `value`: The value to write into the span of bytes.

Exceptions:

- `ArgumentOutOfRangeException`: `destination` is too small to contain a `UInt64`.

#### Remarks

Writes exactly 8 bytes to the beginning of the span.

## BinaryPrimitives.WriteUInt64LittleEndian(Byte>, UInt64) method

```csharp
public static void WriteUInt64LittleEndian (Span<byte> destination, ulong value);
```

Writes a `UInt64` into a span of bytes, as little endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as little endian.
- `value`: The value to write into the span of bytes.

Exceptions:

- `ArgumentOutOfRangeException`: `destination` is too small to contain a `UInt64`.

#### Remarks

Writes exactly 8 bytes to the beginning of the span.

## BinaryPrimitives.WriteUIntPtrBigEndian(Byte>, UIntPtr) method

```csharp
public static void WriteUIntPtrBigEndian (Span<byte> destination, UIntPtr value);
```

Writes a `UIntPtr` into a span of bytes, as big endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as big endian.
- `value`: The value to write into the span of bytes.

Exceptions:

- `ArgumentOutOfRangeException`: `destination` is too small to contain a `UIntPtr`.

Writes exactly 4 bytes on 32-bit platforms -or- 8 bytes on 64-bit platforms to the beginning of the span.

## BinaryPrimitives.WriteUIntPtrLittleEndian(Byte>, UIntPtr) method

```csharp
public static void WriteUIntPtrLittleEndian (Span<byte> destination, UIntPtr value);
```

Writes a `UIntPtr` into a span of bytes, as little endian.

Parameters:

- `destination`: The span of bytes where the value is to be written, as little endian.
- `value`: The value to write into the span of bytes.

Exceptions:

- `ArgumentOutOfRangeException`: `destination` is too small to contain a `UIntPtr`.

Writes exactly 4 bytes on 32-bit platforms -or- 8 bytes on 64-bit platforms to the beginning of the span.
