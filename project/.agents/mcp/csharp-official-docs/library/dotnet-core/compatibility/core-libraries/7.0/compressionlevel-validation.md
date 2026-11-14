---
title: ".NET 7 breaking change: Validate CompressionLevel for BrotliStream"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/core-libraries/7.0/compressionlevel-validation.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Validate CompressionLevel for BrotliStream

The `System.IO.Compression.CompressionLevel` argument that's passed to `System.IO.Compression.BrotliStream` constructors is now validated to be one of the defined values of the enumeration.

## Previous behavior

Passing any value between 0 and 11 for the `System.IO.Compression.CompressionLevel` parameter was considered valid. The value would either map to one of the enumeration's defined values or be passed as-is to the underlying Brotli implementation.

## New behavior

The only valid values for the `System.IO.Compression.CompressionLevel` parameter of `System.IO.Compression.BrotliStream` constructors are:

- `System.IO.Compression.CompressionLevel.Optimal`
- `System.IO.Compression.CompressionLevel.Fastest`
- `System.IO.Compression.CompressionLevel.NoCompression`
- `System.IO.Compression.CompressionLevel.SmallestSize`

If you pass any other value, an `System.ArgumentException` is thrown at runtime.

## Version introduced

.NET 7

## Type of breaking change

This change can affect binary compatibility.

## Reason for change

Being able to pass <example-value> values that aren't defined by the `System.IO.Compression.CompressionLevel` enumeration is unexpected and undocumented, and is likely to lead to mistakes.

## Recommended action

If necessary, change your code to pass in one of the valid `System.IO.Compression.CompressionLevel` values.

## Affected APIs

- `System.IO.Compression.BrotliStream.#ctor(System.IO.Stream,System.IO.Compression.CompressionLevel,System.Boolean)`
- `System.IO.Compression.BrotliStream.#ctor(System.IO.Stream,System.IO.Compression.CompressionLevel)`
