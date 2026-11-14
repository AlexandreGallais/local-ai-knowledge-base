---
title: "ZLibCompressionOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Compression/ZLibCompressionOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ZLibCompressionOptions class

Namespace: `System.IO.Compression`

```csharp
public sealed class ZLibCompressionOptions
```

Provides compression options to be used with `ZLibStream`, `DeflateStream`, and `GZipStream`.

To be added.

## ZLibCompressionOptions.ZLibCompressionOptions() constructor

```csharp
public ZLibCompressionOptions ();
```

Initializes a `ZLibCompressionOptions` instance with default values.

To be added.

## ZLibCompressionOptions.CompressionLevel property

```csharp
public int CompressionLevel { get; set; }
```

Gets or sets the compression level for a compression stream.

Returns: The compression level for a compression stream. The default value is -1.

Exceptions:

- `ArgumentOutOfRangeException`: The value is less than -1 or greater than 9.

Can accept any value between -1 and 9 (inclusive). 0 gives no compression, 1 gives best speed, 9 gives best compression,

and -1 requests the default compression level, which is equivalent to 6.

## ZLibCompressionOptions.CompressionStrategy property

```csharp
public System.IO.Compression.ZLibCompressionStrategy CompressionStrategy { get; set; }
```

Gets or sets the compression algorithm for a compression stream.

Returns: To be added.

Exceptions:

- `ArgumentOutOfRangeException`: The value is not a valid `ZLibCompressionStrategy` value.

To be added.

## ZLibCompressionOptions.DefaultWindowLog2 property

```csharp
public static int DefaultWindowLog2 { get; }
```

To be added.

Returns: To be added.

To be added.

## ZLibCompressionOptions.MaxWindowLog2 property

```csharp
public static int MaxWindowLog2 { get; }
```

To be added.

Returns: To be added.

To be added.

## ZLibCompressionOptions.MinWindowLog2 property

```csharp
public static int MinWindowLog2 { get; }
```

To be added.

Returns: To be added.

To be added.

## ZLibCompressionOptions.WindowLog2 property

```csharp
public int WindowLog2 { get; set; }
```

To be added.

Returns: To be added.

To be added.
