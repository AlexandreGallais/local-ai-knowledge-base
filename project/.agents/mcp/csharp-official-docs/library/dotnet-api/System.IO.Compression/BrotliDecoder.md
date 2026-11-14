---
title: "BrotliDecoder struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Compression/BrotliDecoder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BrotliDecoder struct

Namespace: `System.IO.Compression`

```csharp
public struct BrotliDecoder : IDisposable
```

Provides non-allocating, performant Brotli decompression methods. The methods decompress in a single pass <example-value> using a `BrotliStream` instance.

To be added.

## BrotliDecoder.Decompress(Byte>, Byte>, Int32, Int32) method

```csharp
public System.Buffers.OperationStatus Decompress (ReadOnlySpan<byte> source, Span<byte> destination, out int bytesConsumed, out int bytesWritten);
```

Decompresses data that was compressed using the Brotli algorithm.

Parameters:

- `source`: A buffer containing the compressed data.
- `destination`: When this method returns, a byte span containing the decompressed data.
- `bytesConsumed`: The total number of bytes that were read from `source`.
- `bytesWritten`: The total number of bytes that were written in the `destination`.

Returns: One of the enumeration values that indicates the status of the decompression operation.

The return value can be as follows:
- `OperationStatus.Done`: `source` was successfully and completely decompressed into `destination`.
- `OperationStatus.DestinationTooSmall`: There is not enough space in `destination` to decompress `source`.
- `OperationStatus.NeedMoreData`: The decompression action is partially done at least one more byte is required to complete the decompression task. This method should be called again with more input to decompress.
- `OperationStatus.InvalidData`: The data in `source` is invalid and could not be decompressed.

## BrotliDecoder.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the current Brotli decoder instance.

To be added.

## BrotliDecoder.TryDecompress(Byte>, Byte>, Int32) method

```csharp
public static bool TryDecompress (ReadOnlySpan<byte> source, Span<byte> destination, out int bytesWritten);
```

Attempts to decompress data that was compressed with the Brotli algorithm.

Parameters:

- `source`: A buffer containing the compressed data.
- `destination`: When this method returns, a byte span containing the decompressed data.
- `bytesWritten`: The total number of bytes that were written in the `destination`.

Returns: `true` on success; `false` otherwise.

If this method returns `false`, `destination` may be empty or contain partially decompressed data, with `bytesWritten` being zero or greater than zero but less than the expected total.
