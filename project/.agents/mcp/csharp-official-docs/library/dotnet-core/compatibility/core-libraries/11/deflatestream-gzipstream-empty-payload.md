---
title: "Breaking change: DeflateStream and GZipStream write headers and footers for empty payload"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/core-libraries/11/deflatestream-gzipstream-empty-payload.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# DeflateStream and GZipStream write headers and footers for empty payload

`System.IO.Compression.DeflateStream` and `System.IO.Compression.GZipStream` now always write format headers and footers to the output stream, even when no data is written. This ensures the output is a valid compressed stream according to the Deflate and GZip specifications.

## Version introduced

.NET 11

## Previous behavior

Previously, `DeflateStream` and `GZipStream` didn't produce any output if no data was written to the stream. This resulted in an empty output stream when compressing an empty input.

```csharp
using var output = new MemoryStream();
using (var deflate = new DeflateStream(output, CompressionMode.Compress))
{
    // No data written.
}
Console.WriteLine(output.Length); // 0
```

## New behavior

Starting in .NET 11, `DeflateStream` and `GZipStream` always write the appropriate headers and footers to the output stream, even when no data is written. This ensures the output contains valid compressed data according to the format specifications.

```csharp
using var output = new MemoryStream();
using (var deflate = new DeflateStream(output, CompressionMode.Compress))
{
    // No data written.
}
Console.WriteLine(output.Length); // 2 (for Deflate) or 20 (for GZip).
```

## Type of breaking change

This change is a behavioral change.

## Reason for change

Deflate and GZip compression formats include delimiters for the start and end of compressed data. The correct way to compress an empty payload with these formats includes only those delimiters. Some tools don't correctly react to empty content and always expect the compressed content to contain at least the appropriate header and footer. This change ensures compatibility with such tools and produces properly formatted compressed streams according to the specifications.

## Recommended action

If the previous behavior is desired, special-case empty content to not compress it via `DeflateStream` or `GZipStream`.

```csharp
byte[] dataToCompress = GetData();

if (dataToCompress.Length == 0)
{
    // Don't compress empty data.
    return Array.Empty<byte>();
}

using var output = new MemoryStream();
using (var deflate = new DeflateStream(output, CompressionMode.Compress))
{
    deflate.Write(dataToCompress);
}
return output.ToArray();
```

If you need to distinguish between empty and nonempty compressed streams, track whether any data was written or check the original uncompressed data length before compression.

## Affected APIs

- `System.IO.Compression.DeflateStream`
- `System.IO.Compression.GZipStream`
