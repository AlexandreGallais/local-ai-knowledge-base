---
title: "ZstandardEncoder class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Compression/ZstandardEncoder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ZstandardEncoder class

Namespace: `System.IO.Compression`

```csharp
public sealed class ZstandardEncoder : IDisposable
```

To be added.

To be added.

## ZstandardEncoder.ZstandardEncoder() constructor

```csharp
public ZstandardEncoder ();
```

To be added.

To be added.

## ZstandardEncoder.ZstandardEncoder(Int32) constructor

```csharp
public ZstandardEncoder (int quality);
```

To be added.

Parameters:

- `quality`: To be added.

To be added.

## ZstandardEncoder.ZstandardEncoder(ZstandardCompressionOptions) constructor

```csharp
public ZstandardEncoder (System.IO.Compression.ZstandardCompressionOptions compressionOptions);
```

To be added.

Parameters:

- `compressionOptions`: To be added.

To be added.

## ZstandardEncoder.ZstandardEncoder(ZstandardDictionary) constructor

```csharp
public ZstandardEncoder (System.IO.Compression.ZstandardDictionary dictionary);
```

To be added.

Parameters:

- `dictionary`: To be added.

To be added.

## ZstandardEncoder.ZstandardEncoder(Int32, Int32) constructor

```csharp
public ZstandardEncoder (int quality, int windowLog2);
```

To be added.

Parameters:

- `quality`: To be added.
- `windowLog2`: To be added.

To be added.

## ZstandardEncoder.ZstandardEncoder(ZstandardDictionary, Int32) constructor

```csharp
public ZstandardEncoder (System.IO.Compression.ZstandardDictionary dictionary, int windowLog2);
```

To be added.

Parameters:

- `dictionary`: To be added.
- `windowLog2`: To be added.

To be added.

## ZstandardEncoder.Compress(Byte>, Byte>, Int32, Int32, Boolean) method

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

## ZstandardEncoder.Dispose() method

```csharp
public void Dispose ();
```

To be added.

To be added.

## ZstandardEncoder.Flush(Byte>, Int32) method

```csharp
public System.Buffers.OperationStatus Flush (Span<byte> destination, out int bytesWritten);
```

To be added.

Parameters:

- `destination`: To be added.
- `bytesWritten`: To be added.

Returns: To be added.

To be added.

## ZstandardEncoder.GetMaxCompressedLength(Int64) method

```csharp
public static long GetMaxCompressedLength (long inputLength);
```

To be added.

Parameters:

- `inputLength`: To be added.

Returns: To be added.

To be added.

## ZstandardEncoder.Reset() method

```csharp
public void Reset ();
```

To be added.

To be added.

## ZstandardEncoder.SetPrefix(Byte>) method

```csharp
public void SetPrefix (ReadOnlyMemory<byte> prefix);
```

To be added.

Parameters:

- `prefix`: To be added.

To be added.

## ZstandardEncoder.SetSourceLength(Int64) method

```csharp
public void SetSourceLength (long length);
```

To be added.

Parameters:

- `length`: To be added.

To be added.

## ZstandardEncoder.TryCompress(Byte>, Byte>, Int32) method

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

## ZstandardEncoder.TryCompress(Byte>, Byte>, Int32, Int32, Int32) method

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

## ZstandardEncoder.TryCompress(Byte>, Byte>, Int32, ZstandardDictionary, Int32) method

```csharp
public static bool TryCompress (ReadOnlySpan<byte> source, Span<byte> destination, out int bytesWritten, System.IO.Compression.ZstandardDictionary dictionary, int windowLog2);
```

To be added.

Parameters:

- `source`: To be added.
- `destination`: To be added.
- `bytesWritten`: To be added.
- `dictionary`: To be added.
- `windowLog2`: To be added.

Returns: To be added.

To be added.
