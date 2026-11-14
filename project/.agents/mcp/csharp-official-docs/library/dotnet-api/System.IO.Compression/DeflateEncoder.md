---
title: "DeflateEncoder class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Compression/DeflateEncoder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DeflateEncoder class

Namespace: `System.IO.Compression`

```csharp
public sealed class DeflateEncoder : IDisposable
```

To be added.

To be added.

## DeflateEncoder.DeflateEncoder() constructor

```csharp
public DeflateEncoder ();
```

To be added.

To be added.

## DeflateEncoder.DeflateEncoder(Int32) constructor

```csharp
public DeflateEncoder (int quality);
```

To be added.

Parameters:

- `quality`: To be added.

To be added.

## DeflateEncoder.DeflateEncoder(ZLibCompressionOptions) constructor

```csharp
public DeflateEncoder (System.IO.Compression.ZLibCompressionOptions options);
```

To be added.

Parameters:

- `options`: To be added.

To be added.

## DeflateEncoder.DeflateEncoder(Int32, Int32) constructor

```csharp
public DeflateEncoder (int quality, int windowLog2);
```

To be added.

Parameters:

- `quality`: To be added.
- `windowLog2`: To be added.

To be added.

## DeflateEncoder.Compress(Byte>, Byte>, Int32, Int32, Boolean) method

```csharp
public System.Buffers.OperationStatus Compress (ReadOnlySpan<byte> source, Span<byte> destination, out int bytesConsumed, out int bytesWritten, bool isFinalBlock);
```

To be added.

Parameters:

- `source`: To be added.
- `destination`: To be added.
- `bytesConsumed`: To be added.
- `bytesWritten`: To be added.
- `isFinalBlock`: To be added.

Returns: To be added.

To be added.

## DeflateEncoder.Dispose() method

```csharp
public void Dispose ();
```

To be added.

To be added.

## DeflateEncoder.Flush(Byte>, Int32) method

```csharp
public System.Buffers.OperationStatus Flush (Span<byte> destination, out int bytesWritten);
```

To be added.

Parameters:

- `destination`: To be added.
- `bytesWritten`: To be added.

Returns: To be added.

To be added.

## DeflateEncoder.GetMaxCompressedLength(Int64) method

```csharp
public static long GetMaxCompressedLength (long inputLength);
```

To be added.

Parameters:

- `inputLength`: To be added.

Returns: To be added.

To be added.

## DeflateEncoder.Reset() method

```csharp
public void Reset ();
```

To be added.

To be added.

## DeflateEncoder.TryCompress(Byte>, Byte>, Int32) method

```csharp
public static bool TryCompress (ReadOnlySpan<byte> source, Span<byte> destination, out int bytesWritten);
```

To be added.

Parameters:

- `source`: To be added.
- `destination`: To be added.
- `bytesWritten`: To be added.

Returns: To be added.

To be added.

## DeflateEncoder.TryCompress(Byte>, Byte>, Int32, Int32) method

```csharp
public static bool TryCompress (ReadOnlySpan<byte> source, Span<byte> destination, out int bytesWritten, int quality);
```

To be added.

Parameters:

- `source`: To be added.
- `destination`: To be added.
- `bytesWritten`: To be added.
- `quality`: To be added.

Returns: To be added.

To be added.

## DeflateEncoder.TryCompress(Byte>, Byte>, Int32, Int32, Int32) method

```csharp
public static bool TryCompress (ReadOnlySpan<byte> source, Span<byte> destination, out int bytesWritten, int quality, int windowLog2);
```

To be added.

Parameters:

- `source`: To be added.
- `destination`: To be added.
- `bytesWritten`: To be added.
- `quality`: To be added.
- `windowLog2`: To be added.

Returns: To be added.

To be added.
