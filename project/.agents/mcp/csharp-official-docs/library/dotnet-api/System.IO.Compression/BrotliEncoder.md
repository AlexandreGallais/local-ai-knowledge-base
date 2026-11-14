---
title: "BrotliEncoder struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Compression/BrotliEncoder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BrotliEncoder struct

Namespace: `System.IO.Compression`

```csharp
public struct BrotliEncoder : IDisposable
```

Provides methods and static methods to encode and decode data in a streamless, non-allocating, and performant manner using the Brotli data format specification.

To be added.

## BrotliEncoder.BrotliEncoder(Int32, Int32) constructor

```csharp
public BrotliEncoder (int quality, int window);
```

Initializes a new instance of the `BrotliEncoder` structure using the specified quality and window.

Parameters:

- `quality`: A number representing quality of the Brotli compression. 0 is the minimum (no compression), 11 is the maximum.
- `window`: A number representing the encoder window bits. The minimum value is 10, and the maximum value is 24.

Exceptions:

- `ArgumentOutOfRangeException`: `quality` is not between the minimum value of 0 and the maximum value of 11.
-or-
`window` is not between the minimum value of 10 and the maximum value of 24.
- `IOException`: Failed to create the `BrotliEncoder` instance.

To be added.

## BrotliEncoder.Compress(Byte>, Byte>, Int32, Int32, Boolean) method

```csharp
public System.Buffers.OperationStatus Compress (ReadOnlySpan<byte> source, Span<byte> destination, out int bytesConsumed, out int bytesWritten, bool isFinalBlock);
```

Compresses a read-only byte span into a destination span.

Parameters:

- `source`: A read-only span of bytes containing the source data to compress.
- `destination`: When this method returns, a byte span where the compressed is stored.
- `bytesConsumed`: When this method returns, the total number of bytes that were read from `source`.
- `bytesWritten`: When this method returns, the total number of bytes that were written to `destination`.
- `isFinalBlock`: `true` to finalize the internal stream, which prevents adding more input data when this method returns; `false` to allow the encoder to postpone the production of output until it has processed enough input.

Returns: One of the enumeration values that describes the status with which the span-based operation finished.

To be added.

## BrotliEncoder.Dispose() method

```csharp
public void Dispose ();
```

Frees and disposes unmanaged resources.

To be added.

## BrotliEncoder.Flush(Byte>, Int32) method

```csharp
public System.Buffers.OperationStatus Flush (Span<byte> destination, out int bytesWritten);
```

Compresses an empty read-only span of bytes into its destination, which ensures that output is produced for all the processed input. An actual flush is performed when the source is depleted and there is enough space in the destination for the remaining data.

Parameters:

- `destination`: When this method returns, a span of bytes where the compressed data will be stored.
- `bytesWritten`: When this method returns, the total number of bytes that were written to `destination`.

Returns: One of the enumeration values that describes the status with which the operation finished.

To be added.

## BrotliEncoder.GetMaxCompressedLength(Int32) method

```csharp
public static int GetMaxCompressedLength (int inputSize);
```

Gets the maximum expected compressed length for the provided input size.

Parameters:

- `inputSize`: The input size to get the maximum expected compressed length from. Must be greater or equal than 0 and less or equal than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see> - 515.

Returns: A number representing the maximum compressed length for the provided input size.

Exceptions:

- `ArgumentOutOfRangeException`: `inputSize` is less than 0, the minimum allowed input size, or greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see> - 515, the maximum allowed input size.

Returns 1 if `inputSize` is 0.

## BrotliEncoder.TryCompress(Byte>, Byte>, Int32) method

```csharp
public static bool TryCompress (ReadOnlySpan<byte> source, Span<byte> destination, out int bytesWritten);
```

Tries to compress a source byte span into a destination span.

Parameters:

- `source`: A read-only span of bytes containing the source data to compress.
- `destination`: When this method returns, a span of bytes where the compressed data is stored.
- `bytesWritten`: When this method returns, the total number of bytes that were written to `destination`.

Returns: `true` if the compression operation was successful; `false` otherwise.

To be added.

## BrotliEncoder.TryCompress(Byte>, Byte>, Int32, Int32, Int32) method

```csharp
public static bool TryCompress (ReadOnlySpan<byte> source, Span<byte> destination, out int bytesWritten, int quality, int window);
```

Tries to compress a source byte span into a destination byte span, using the provided compression quality leven and encoder window bits.

Parameters:

- `source`: A read-only span of bytes containing the source data to compress.
- `destination`: When this method returns, a span of bytes where the compressed data is stored.
- `bytesWritten`: When this method returns, the total number of bytes that were written to `destination`.
- `quality`: A number representing quality of the Brotli compression. 0 is the minimum (no compression), 11 is the maximum.
- `window`: A number representing the encoder window bits. The minimum value is 10, and the maximum value is 24.

Returns: `true` if the compression operation was successful; `false` otherwise.

To be added.
