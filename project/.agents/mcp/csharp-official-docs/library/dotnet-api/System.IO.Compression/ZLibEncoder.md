---
title: "ZLibEncoder class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Compression/ZLibEncoder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ZLibEncoder class

Namespace: `System.IO.Compression`

```csharp
public sealed class ZLibEncoder : IDisposable
```

To be added.

To be added.

## ZLibEncoder.ZLibEncoder() constructor

```csharp
public ZLibEncoder ();
```

To be added.

To be added.

## ZLibEncoder.ZLibEncoder(Int32) constructor

```csharp
public ZLibEncoder (int quality);
```

To be added.

Parameters:

- `quality`: To be added.

To be added.

## ZLibEncoder.ZLibEncoder(ZLibCompressionOptions) constructor

```csharp
public ZLibEncoder (System.IO.Compression.ZLibCompressionOptions options);
```

To be added.

Parameters:

- `options`: To be added.

To be added.

## ZLibEncoder.ZLibEncoder(Int32, Int32) constructor

```csharp
public ZLibEncoder (int quality, int windowLog2);
```

To be added.

Parameters:

- `quality`: To be added.
- `windowLog2`: To be added.

To be added.

## ZLibEncoder.Compress(Byte>, Byte>, Int32, Int32, Boolean) method

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

## ZLibEncoder.Dispose() method

```csharp
public void Dispose ();
```

To be added.

To be added.

## ZLibEncoder.Flush(Byte>, Int32) method

```csharp
public System.Buffers.OperationStatus Flush (Span<byte> destination, out int bytesWritten);
```

To be added.

Parameters:

- `destination`: To be added.
- `bytesWritten`: To be added.

Returns: To be added.

To be added.

## ZLibEncoder.GetMaxCompressedLength(Int64) method

```csharp
public static long GetMaxCompressedLength (long inputLength);
```

To be added.

Parameters:

- `inputLength`: To be added.

Returns: To be added.

To be added.

## ZLibEncoder.Reset() method

```csharp
public void Reset ();
```

To be added.

To be added.

## ZLibEncoder.TryCompress(Byte>, Byte>, Int32) method

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

## ZLibEncoder.TryCompress(Byte>, Byte>, Int32, Int32) method

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

## ZLibEncoder.TryCompress(Byte>, Byte>, Int32, Int32, Int32) method

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
