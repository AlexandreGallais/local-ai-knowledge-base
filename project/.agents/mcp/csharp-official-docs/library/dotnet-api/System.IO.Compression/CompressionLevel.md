---
title: "CompressionLevel enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Compression/CompressionLevel.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CompressionLevel enum

Namespace: `System.IO.Compression`

```csharp
public enum CompressionLevel
```

Specifies values that indicate whether a compression operation emphasizes speed or compression size.

Compression operations usually involve a tradeoff between the speed and the effectiveness of compression. You use the `CompressionLevel` enumeration to indicate which factor is more important in your development scenario: the time to complete the compression operation or the size of the compressed file. These values do not correspond to specific compression levels; the object that implements compression determines how to handle them.

The following methods of the `DeflateStream`, `GZipStream`, `ZipArchive`, `ZipFile`, and `ZipFileExtensions` classes include a parameter named `compressionLevel` that lets you specify the compression level:

- `%23ctor`
- `%23ctor`
- `%23ctor`
- `%23ctor`
- `CreateEntry`
- `CreateFromDirectory`
- `CreateEntryFromFile`

#### Examples

The following example shows how to set the compression level when creating a zip archive by using the `ZipFile` class.

_Code sample not included: ~/snippets/csharp/System.IO.Compression/ZipFile/CreateFromDirectory/program3.cs._

## CompressionLevel.Fastest field

```csharp
Fastest
```

The compression operation should complete as quickly as possible, even if the resulting file is not optimally compressed.

## CompressionLevel.NoCompression field

```csharp
NoCompression
```

No compression should be performed on the file.

## CompressionLevel.Optimal field

```csharp
Optimal
```

The compression operation should optimally balance compression speed and output size.

## CompressionLevel.SmallestSize field

```csharp
SmallestSize
```

The compression operation should create output as small as possible, even if the operation takes a longer time to complete.
