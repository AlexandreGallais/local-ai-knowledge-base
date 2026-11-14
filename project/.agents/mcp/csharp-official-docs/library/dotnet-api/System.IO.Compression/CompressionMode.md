---
title: "CompressionMode enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Compression/CompressionMode.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CompressionMode enum

Namespace: `System.IO.Compression`

```csharp
public enum CompressionMode
```

Specifies whether to compress data to or decompress data from the underlying stream.

#### Remarks
This enumeration is used with the `GZipStream` and `DeflateStream` classes.

#### Examples
The following code example uses the `CompressionMode` enumeration with the `GZipStream` class to compress and decompress a file.

_Code sample not included: ~/snippets/csharp/System.IO.Compression/GZip/FileCompressionModeExample.cs._

## CompressionMode.Compress field

```csharp
Compress
```

Compresses data to the underlying stream.

## CompressionMode.Decompress field

```csharp
Decompress
```

Decompresses data from the underlying stream.
