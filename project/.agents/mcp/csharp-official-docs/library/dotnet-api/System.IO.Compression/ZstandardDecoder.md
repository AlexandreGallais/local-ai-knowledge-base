---
title: "ZstandardDecoder class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Compression/ZstandardDecoder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ZstandardDecoder class

Namespace: `System.IO.Compression`

```csharp
public sealed class ZstandardDecoder : IDisposable
```

To be added.

To be added.

## ZstandardDecoder.ZstandardDecoder() constructor

```csharp
public ZstandardDecoder ();
```

To be added.

To be added.

## ZstandardDecoder.ZstandardDecoder(Int32) constructor

```csharp
public ZstandardDecoder (int maxWindowLog2);
```

To be added.

Parameters:

- `maxWindowLog2`: To be added.

To be added.

## ZstandardDecoder.ZstandardDecoder(ZstandardDecompressionOptions) constructor

```csharp
public ZstandardDecoder (System.IO.Compression.ZstandardDecompressionOptions decompressionOptions);
```

To be added.

Parameters:

- `decompressionOptions`: To be added.

To be added.

## ZstandardDecoder.ZstandardDecoder(ZstandardDictionary) constructor

```csharp
public ZstandardDecoder (System.IO.Compression.ZstandardDictionary dictionary);
```

To be added.

Parameters:

- `dictionary`: To be added.

To be added.

## ZstandardDecoder.ZstandardDecoder(ZstandardDictionary, Int32) constructor

```csharp
public ZstandardDecoder (System.IO.Compression.ZstandardDictionary dictionary, int maxWindowLog2);
```

To be added.

Parameters:

- `dictionary`: To be added.
- `maxWindowLog2`: To be added.

To be added.

## ZstandardDecoder.Decompress(Byte>, Byte>, Int32, Int32) method

```csharp
public System.Buffers.OperationStatus Decompress (ReadOnlySpan<byte> source, Span<byte> destination, out int bytesConsumed, out int bytesWritten);
```

To be added.

Parameters:

- `source`: To be added.
- `destination`: To be added.
- `bytesConsumed`: To be added.
- `bytesWritten`: To be added.

Returns: To be added.

To be added.

## ZstandardDecoder.Dispose() method

```csharp
public void Dispose ();
```

To be added.

To be added.

## ZstandardDecoder.Reset() method

```csharp
public void Reset ();
```

To be added.

To be added.

## ZstandardDecoder.SetPrefix(Byte>) method

```csharp
public void SetPrefix (ReadOnlyMemory<byte> prefix);
```

To be added.

Parameters:

- `prefix`: To be added.

To be added.

## ZstandardDecoder.TryDecompress(Byte>, Byte>, Int32) method

```csharp
public static bool TryDecompress (ReadOnlySpan<byte> source, Span<byte> destination, out int bytesWritten);
```

To be added.

Parameters:

- `source`: To be added.
- `destination`: To be added.
- `bytesWritten`: To be added.

Returns: To be added.

To be added.

## ZstandardDecoder.TryDecompress(Byte>, Byte>, Int32, ZstandardDictionary) method

```csharp
public static bool TryDecompress (ReadOnlySpan<byte> source, Span<byte> destination, out int bytesWritten, System.IO.Compression.ZstandardDictionary dictionary);
```

To be added.

Parameters:

- `source`: To be added.
- `destination`: To be added.
- `bytesWritten`: To be added.
- `dictionary`: To be added.

Returns: To be added.

To be added.

## ZstandardDecoder.TryGetMaxDecompressedLength(Byte>, Int64) method

```csharp
public static bool TryGetMaxDecompressedLength (ReadOnlySpan<byte> data, out long length);
```

To be added.

Parameters:

- `data`: To be added.
- `length`: To be added.

Returns: To be added.

To be added.
