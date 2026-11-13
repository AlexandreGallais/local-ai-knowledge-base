---
title: "What's new in .NET libraries for .NET 11 (part 4 of 8)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/whats-new/dotnet-11/libraries.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# What's new in .NET libraries for .NET 11 (part 4 of 8)

The converter's total generic arity must match the target type's arity. The serializer closes the converter with the target type arguments without requiring `System.Text.Json.Serialization.JsonConverterFactory`. For supported nesting patterns, constraints, and error behavior, see Use open generic converters with `JsonConverter`.

**Extension data.** A member marked with `System.Text.Json.Serialization.JsonExtensionDataAttribute` can use `System.Collections.Generic.IReadOnlyDictionary`2` with `string` keys and either `object` or `System.Text.Json.JsonElement` values. During deserialization, the serializer assigns a mutable `System.Collections.Generic.Dictionary`2` implementation. If the property already contains entries, the serializer copies them first and then adds JSON properties, so an incoming value replaces an existing value with the same key. A `System.Text.Json.Nodes.JsonObject` extension-data member writes its child properties directly into the containing object. For example, an `Id` property and a `JsonObject` entry named `nested` produce `{"Id":1,"nested":true}`. For more information, see Handle overflow JSON.

**Read-only sets.** `System.Text.Json.JsonSerializer` serializes `System.Collections.Generic.IReadOnlySet`1` as a JSON array and deserializes it into a `System.Collections.Generic.HashSet`1` instance. For source-generated metadata, `System.Text.Json.Serialization.Metadata.JsonMetadataServices.CreateIReadOnlySetInfo*` creates the collection contract.

For more information about built-in numeric and collection contracts, see Supported types in System.Text.Json.

#### Writer reuse

`System.Text.Json.Utf8JsonWriter.Reset*` accepts a `System.Text.Json.JsonWriterOptions` together with either a `System.IO.Stream` or `System.Buffers.IBufferWriter`1`. After you flush one JSON document, you can reuse or pool the writer with a different output target and different options instead of constructing another writer instance:

```csharp
using var stream = new MemoryStream();
using var writer = new Utf8JsonWriter(stream, new JsonWriterOptions { Indented = true });
writer.WriteStartObject();
writer.WriteString("name", "example");
writer.WriteEndObject();
writer.Flush();

// Reset with different options for next use — no new allocation needed
stream.SetLength(0);
writer.Reset(stream, new JsonWriterOptions { Indented = false });
```
For more information, see Reuse a writer.

You can also opt a single closed hierarchy in to this behavior with `System.Text.Json.Serialization.JsonPolymorphicAttribute.InferClosedTypePolymorphism`, without changing the application-wide `JsonSerializerOptions` setting:

```csharp
[JsonPolymorphic(InferClosedTypePolymorphism = true)]
public abstract record Shape;

public sealed record Circle(double Radius) : Shape;

public sealed record Square(double Side) : Shape;
```

### Regular expression improvements

#### AnyNewLine option

A new `System.Text.RegularExpressions.RegexOptions.AnyNewLine` flag makes `^`, `$`, and `.` treat the full set of Unicode newline characters as line terminators—not just `\n`. This helps when parsing text that mixes Windows (`\r\n`), Unix (`\n`), and Unicode-specific (`\u0085`, `\u2028`, `\u2029`) line endings.

```csharp
string text = "line1\r\nline2\u0085line3\u2028line4";

// RegexOptions.AnyNewLine makes ^, $, and . treat all Unicode newline
// sequences as line terminators, not just \n.
MatchCollection matches = Regex.Matches(
    text,
    @"^line\d$",
    RegexOptions.Multiline | RegexOptions.AnyNewLine);

Console.WriteLine(matches.Count); // 4
```
#### Regex engine and source generator fixes

.NET 11 includes several regex correctness and code-quality fixes:

- The non-backtracking engine no longer takes super-linear time on certain nested-loop patterns and produces correct results for cases that previously diverged.
- The regex compiler and source generator handle `resumeAt` correctly when a conditional appears inside a loop body.
- The SYSLIB1045 code fixer no longer creates duplicate class names when applied across multiple partial declarations of the same class.

### Read CBOR incrementally

`System.Formats.Cbor.CborReader` can read a Concise Binary Object Representation (CBOR) payload that's delivered in chunks, without first copying the entire document into contiguous memory. To read incrementally:

1. Construct a reader with `isFinalBlock: false`.
1. Check for `CborReaderState.NeedsMoreData` to determine when the reader needs the next chunk.
1. Pass the next chunk to `CborReader.SlideData`, and set `isFinalBlock` to `true` for the last chunk.

Incremental reading requires `System.Formats.Cbor.CborConformanceMode.Lax`. Other conformance modes reject a non-final block.

```csharp
ReadOnlyMemory<byte> firstChunk = new byte[] { 0x82, 0x0a };
ReadOnlyMemory<byte> nextChunk = new byte[] { 0x14 };

// Incremental reading requires CborConformanceMode.Lax.
var reader = new CborReader(
    firstChunk,
    new CborReaderOptions { ConformanceMode = CborConformanceMode.Lax },
    isFinalBlock: false);

reader.ReadStartArray();
int first = reader.ReadInt32(); // 10

if (reader.PeekState() == CborReaderState.NeedsMoreData)
{
    // Slide in the next chunk after the reader consumes all the buffered bytes.
    if (reader.BytesRemaining == 0)
    {
        reader.SlideData(nextChunk, isFinalBlock: true);
    }
    else
    {
        throw new InvalidOperationException("Buffer management omitted from the sample.");
    }
}

int second = reader.ReadInt32(); // 20
reader.ReadEndArray();
```
## Compression and archive formats

- Compression enhancements
- Zstandard compression
- Tar archive format selection

### Compression enhancements

.NET 11 includes several improvements to compression APIs.

#### ZIP archive entry access modes

The `System.IO.Compression.ZipArchiveEntry` class now supports opening entries with specific file access modes through new overloads: `System.IO.Compression.ZipArchiveEntry.Open(System.IO.FileAccess)` and `System.IO.Compression.ZipArchiveEntry.OpenAsync(System.IO.FileAccess,System.Threading.CancellationToken)`. These overloads accept a `System.IO.FileAccess` parameter and allow you to open ZIP entries for read, write, or read-write access.

Additionally, a new `System.IO.Compression.ZipArchiveEntry.CompressionMethod` property exposes the compression method used for an entry through the `System.IO.Compression.ZipCompressionMethod` enum, which includes values for `System.IO.Compression.ZipCompressionMethod.Stored`, `System.IO.Compression.ZipCompressionMethod.Deflate`, and `System.IO.Compression.ZipCompressionMethod.Deflate64`.

#### ZIP CRC32 validation

`System.IO.Compression.ZipArchive` validates the CRC32 checksum when reading ZIP entries. Corrupted or truncated archives that previously passed without error now throw `System.IO.InvalidDataException`, helping you detect data integrity issues early.

#### ZIP archive password <example-value>

`System.IO.Compression.ZipArchiveEntry` now supports password-protected entries for read and write operations. Use the new password-aware `System.IO.Compression.ZipArchiveEntry.Open(System.ReadOnlySpan{System.Char})` and `System.IO.Compression.ZipArchiveEntry.OpenAsync(System.ReadOnlySpan{System.Char},System.Threading.CancellationToken)` overloads, and use password plus `System.IO.Compression.ZipEncryptionMethod` when you create encrypted entries.

#### DeflateStream and GZipStream behavior change

Starting in .NET 11, `System.IO.Compression.DeflateStream` and `System.IO.Compression.GZipStream` always write format headers and footers to the output stream, even when no data is written. This ensures the output is a valid compressed stream according to the Deflate and GZip specifications.

Previously, these streams didn't produce any output if no data was written, resulting in an empty output stream. This change ensures compatibility with tools that expect properly formatted compressed streams.

For more information, see DeflateStream and GZipStream write headers and footers for empty payload.

#### Span-based Deflate, ZLib, and GZip APIs

`System.IO.Compression` now offers `Span<byte>`/`ReadOnlySpan<byte>` encode and decode entry points for the Deflate, ZLib, and GZip formats. The new APIs, on types such as `System.IO.Compression.DeflateEncoder`, `System.IO.Compression.ZLibEncoder`, and `System.IO.Compression.GZipEncoder`, mirror the shape of `System.IO.Compression.BrotliEncoder`/`System.IO.Compression.BrotliDecoder` and the Zstandard primitives. You can compress and decompress buffers without allocating a `Stream`. This is useful for high-throughput scenarios such as protocol parsers, log shippers, and middleware that already operate on spans.

```csharp
ReadOnlySpan<byte> source = [0x48, 0x65, 0x6C, 0x6C, 0x6F]; // "Hello"
byte[] buffer = new byte[source.Length + 32];
Span<byte> destination = buffer;

using ZLibEncoder encoder = new();
OperationStatus status = encoder.Compress(
    source, destination, out int bytesConsumed, out int bytesWritten,
    isFinalBlock: true);

Console.WriteLine($"Compressed {bytesConsumed} bytes into {bytesWritten} bytes. Status: {status}");
```
The streamless `DeflateEncoder`, `DeflateDecoder`, `ZLibEncoder`, `ZLibDecoder`, `GZipEncoder`, and `GZipDecoder` types also gain a `Reset()` method. Resetting returns an instance to its initial state so you can process another independent payload without allocating a replacement encoder or decoder.

### Zstandard compression

The Zstandard compression APIs, for example, `System.IO.Compression.ZstandardStream` and `System.IO.Compression.ZstandardEncoder`, are now part of the `System.IO.Compression` namespace, alongside `DeflateStream`, `GZipStream`, and `BrotliStream`. The API surface is otherwise unchanged.

`System.IO.Compression.ZstandardDictionary` provides dictionary training and construction. `System.IO.Compression.ZstandardDictionary.Train*` returns raw dictionary data as a `byte[]`; pass that data to `System.IO.Compression.ZstandardDictionary.Create*` with the desired compression quality:

```csharp
byte[] data = ZstandardDictionary.Train(samples, sampleLengths, maxDictionarySize: 4096);
using ZstandardDictionary dictionary = ZstandardDictionary.Create(data, quality: 19);
```

### Tar archive format selection

New overloads on `System.Formats.Tar.TarFile.CreateFromDirectory*` and `System.Formats.Tar.TarFile.CreateFromDirectoryAsync*` accept a `System.Formats.Tar.TarEntryFormat` parameter, giving you direct control over the archive format. Previously, `CreateFromDirectory` always produced Pax archives. The new overloads support all four tar formats—Pax, Ustar, GNU, and V7—for compatibility with specific tools and environments.

```csharp
// Create a GNU format tar archive for Linux compatibility
TarFile.CreateFromDirectory("/source/dir", "/dest/archive.tar",
    includeBaseDirectory: true, format: TarEntryFormat.Gnu);

// Create a Ustar format archive for broader compatibility
using Stream outputStream = File.OpenWrite("/dest/ustar.tar");
TarFile.CreateFromDirectory("/source/dir", outputStream,
    includeBaseDirectory: false, format: TarEntryFormat.Ustar);

// Async version
CancellationToken <example-value> = CancellationToken.None;
await TarFile.CreateFromDirectoryAsync("/source/dir", "/dest/archive.tar",
    includeBaseDirectory: true, format: TarEntryFormat.Pax,
    cancellationToken: <example-value>);
```
`TarReader` can now also read entries that use the GNU sparse format 1.0 (PAX) representation. The earlier 0.1 representation was already supported. With 1.0 support in place, `TarReader` matches what modern `tar` implementations write by default for sparse files.
