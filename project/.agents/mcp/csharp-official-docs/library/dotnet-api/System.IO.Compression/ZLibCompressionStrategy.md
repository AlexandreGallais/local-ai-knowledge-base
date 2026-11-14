---
title: "ZLibCompressionStrategy enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Compression/ZLibCompressionStrategy.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ZLibCompressionStrategy enum

Namespace: `System.IO.Compression`

```csharp
public enum ZLibCompressionStrategy
```

Defines the compression algorithms that can be used for `DeflateStream`, `GZipStream`, and `ZLibStream`.

To be added.

## ZLibCompressionStrategy.Default field

```csharp
Default
```

Used for normal data.

## ZLibCompressionStrategy.Filtered field

```csharp
Filtered
```

Used for data produced by a filter (or predictor). The effect of Filtered is to force more Huffman coding and less string matching; it's an intermediate between Default and HuffmanOnly.

## ZLibCompressionStrategy.Fixed field

```csharp
Fixed
```

Prevents the use of dynamic Huffman codes, allowing for a simpler decoder for special applications.

## ZLibCompressionStrategy.HuffmanOnly field

```csharp
HuffmanOnly
```

Used to force Huffman encoding only (no string match).

## ZLibCompressionStrategy.RunLengthEncoding field

```csharp
RunLengthEncoding
```

Used to limit match distances to one (run-length encoding). Gives better compression for PNG image data.
