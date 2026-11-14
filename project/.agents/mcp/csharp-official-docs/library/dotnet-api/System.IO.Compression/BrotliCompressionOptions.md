---
title: "BrotliCompressionOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Compression/BrotliCompressionOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BrotliCompressionOptions class

Namespace: `System.IO.Compression`

```csharp
public sealed class BrotliCompressionOptions
```

Provides compression options to be used with `BrotliStream`.

To be added.

## BrotliCompressionOptions.BrotliCompressionOptions() constructor

```csharp
public BrotliCompressionOptions ();
```

Initializes a `BrotliCompressionOptions` instance with default values.

To be added.

## BrotliCompressionOptions.Quality property

```csharp
public int Quality { get; set; }
```

Gets or sets the compression quality for a Brotli compression stream.

Returns: The compression quality for a Brotli compression stream. The default value is 4.

Exceptions:

- `ArgumentOutOfRangeException`: The value is less than 0 or greater than 11.

The higher the quality, the slower the compression. The range is from 0 to 11.

## BrotliCompressionOptions.WindowLog2 property

```csharp
public int WindowLog2 { get; set; }
```

To be added.

Returns: To be added.

To be added.
