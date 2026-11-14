---
title: "BrotliCompressedContent class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http/BrotliCompressedContent.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BrotliCompressedContent class

Namespace: `System.Net.Http`

```csharp
public sealed class BrotliCompressedContent : System.Net.Http.HttpContent
```

To be added.

To be added.

## BrotliCompressedContent.BrotliCompressedContent(HttpContent, BrotliCompressionOptions) constructor

```csharp
public BrotliCompressedContent (System.Net.Http.HttpContent content, System.IO.Compression.BrotliCompressionOptions compressionOptions);
```

To be added.

Parameters:

- `content`: To be added.
- `compressionOptions`: To be added.

To be added.

## BrotliCompressedContent.BrotliCompressedContent(HttpContent, CompressionLevel) constructor

```csharp
public BrotliCompressedContent (System.Net.Http.HttpContent content, System.IO.Compression.CompressionLevel compressionLevel = System.IO.Compression.CompressionLevel.Optimal);
```

To be added.

Parameters:

- `content`: To be added.
- `compressionLevel`: To be added.

To be added.

## BrotliCompressedContent.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

To be added.

Parameters:

- `disposing`: To be added.

To be added.

## BrotliCompressedContent.SerializeToStream(Stream, TransportContext, CancellationToken) method

```csharp
protected override void SerializeToStream (System.IO.Stream stream, System.Net.TransportContext? context, System.Threading.CancellationToken <example-value>);
```

To be added.

Parameters:

- `stream`: To be added.
- `context`: To be added.
- `cancellationToken`: To be added.

To be added.

## BrotliCompressedContent.SerializeToStreamAsync(Stream, TransportContext) method

```csharp
protected override System.Threading.Tasks.Task SerializeToStreamAsync (System.IO.Stream stream, System.Net.TransportContext? context);
```

To be added.

Parameters:

- `stream`: To be added.
- `context`: To be added.

Returns: To be added.

To be added.

## BrotliCompressedContent.SerializeToStreamAsync(Stream, TransportContext, CancellationToken) method

```csharp
protected override System.Threading.Tasks.Task SerializeToStreamAsync (System.IO.Stream stream, System.Net.TransportContext? context, System.Threading.CancellationToken <example-value>);
```

To be added.

Parameters:

- `stream`: To be added.
- `context`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## BrotliCompressedContent.TryComputeLength(Int64) method

```csharp
protected internal override bool TryComputeLength (out long length);
```

To be added.

Parameters:

- `length`: To be added.

Returns: To be added.

To be added.
