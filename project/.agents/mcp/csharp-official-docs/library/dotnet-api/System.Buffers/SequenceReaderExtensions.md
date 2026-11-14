---
title: "SequenceReaderExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Buffers/SequenceReaderExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SequenceReaderExtensions class

Namespace: `System.Buffers`

```csharp
public static class SequenceReaderExtensions
```

Provides extended functionality for the `SequenceReader<T>` class that allows reading of endian specific numeric values from binary data.

To be added.

## SequenceReaderExtensions.TryReadBigEndian(Byte>, Int16) method

```csharp
public static bool TryReadBigEndian (this ref System.Buffers.SequenceReader<byte> reader, out short value);
```

Tries to read an `Int16` as big endian.

Parameters:

- `reader`: The byte sequence reader instance from which the value is to be read.
- `value`: When the method returns, the value read out of the byte sequence reader, as big endian.

Returns: `true` if the read operation is successful; `false` if there isn't enough data for an `Int16`.

To be added.

## SequenceReaderExtensions.TryReadBigEndian(Byte>, Int32) method

```csharp
public static bool TryReadBigEndian (this ref System.Buffers.SequenceReader<byte> reader, out int value);
```

Tries to read an `Int32` as big endian.

Parameters:

- `reader`: The byte sequence reader from which to read the value.
- `value`: When the method returns, the value read out of the byte sequence reader, as big endian.

Returns: `true` if the read operation is successful; `false` if there isn't enough data for an `Int32`.

To be added.

## SequenceReaderExtensions.TryReadBigEndian(Byte>, Int64) method

```csharp
public static bool TryReadBigEndian (this ref System.Buffers.SequenceReader<byte> reader, out long value);
```

Tries to read an `Int64` as big endian.

Parameters:

- `reader`: The byte sequence reader instance from which the value is to be read.
- `value`: When the method returns, the value read out of the byte sequence reader, as big endian.

Returns: `true` if the read operation is successful; `false` if there isn't enough data for an `Int64`.

To be added.

## SequenceReaderExtensions.TryReadLittleEndian(Byte>, Int16) method

```csharp
public static bool TryReadLittleEndian (this ref System.Buffers.SequenceReader<byte> reader, out short value);
```

Tries to read an `Int16` as little endian.

Parameters:

- `reader`: The byte sequence reader instance from which the value is to be read.
- `value`: When the method returns, the value read out of the byte sequence reader, as little endian.

Returns: `true` if the read operation is successful; `false` if there isn't enough data for an `Int16`.

To be added.

## SequenceReaderExtensions.TryReadLittleEndian(Byte>, Int32) method

```csharp
public static bool TryReadLittleEndian (this ref System.Buffers.SequenceReader<byte> reader, out int value);
```

Tries to read an `Int32` as little endian.

Parameters:

- `reader`: The byte sequence reader instance from which the value is to be read.
- `value`: When the method returns, the value read out of the byte sequence reader, as little endian.

Returns: `true` if the read operation is successful; `false` if there isn't enough data for an `Int32`.

To be added.

## SequenceReaderExtensions.TryReadLittleEndian(Byte>, Int64) method

```csharp
public static bool TryReadLittleEndian (this ref System.Buffers.SequenceReader<byte> reader, out long value);
```

Tries to read an `Int64` as little endian.

Parameters:

- `reader`: The byte sequence reader instance from which the value is to be read.
- `value`: When the method returns, the value read out of the byte sequence reader, as little endian.

Returns: `true` if the read operation is successful; `false` if there isn't enough data for an `Int64`.

To be added.
