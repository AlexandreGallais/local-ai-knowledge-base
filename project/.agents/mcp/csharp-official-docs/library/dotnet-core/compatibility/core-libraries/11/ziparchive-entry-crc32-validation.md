---
title: "Breaking change: CRC32 validation added when reading ZIP archive entries"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/core-libraries/11/ziparchive-entry-crc32-validation.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# CRC32 validation added when reading ZIP archive entries

Starting in .NET 11, the `System.IO.Compression` library validates CRC32 checksums when reading ZIP archive entries. If the computed CRC32 checksum doesn't match the expected value stored in the ZIP file's metadata, an `System.IO.InvalidDataException` is thrown.

## Version introduced

.NET 11

## Previous behavior

Previously, `System.IO.Compression` didn't validate CRC32 checksums when reading ZIP archive entries. Corrupted or tampered ZIP entries could be read without errors, potentially causing silent data corruption.

```csharp
using System.IO.Compression;

using var archive = ZipFile.OpenRead("corrupted.zip");
var entry = archive.GetEntry("file.txt") 
    ?? throw new FileNotFoundException("Entry 'file.txt' not found in archive.");

using var stream = entry.Open();

// Data read without any validation of its integrity.
byte[] buffer = new byte[entry.Length];
stream.ReadExactly(buffer);
```

## New behavior

Starting in .NET 11, the library verifies the integrity of ZIP entries during read operations. If the computed CRC32 checksum doesn't match the expected value from the ZIP file's metadata, an `System.IO.InvalidDataException` is thrown.

## Type of breaking change

This change is a behavioral change.

## Reason for change

This change improves the reliability and security of `System.IO.Compression`. By validating CRC32 checksums, the library detects and prevents use of corrupted or tampered ZIP entries, ensuring applications don't inadvertently process invalid data. For more information, see dotnet/runtime#124766.

## Recommended action

If your application processes ZIP files that might be corrupted or tampered with, handle `System.IO.InvalidDataException` appropriately:

```csharp
try
{
    using var archive = ZipFile.OpenRead("corrupted.zip");
    var entry = archive.GetEntry("file.txt") 
        ?? throw new FileNotFoundException("Entry 'file.txt' not found in archive.");

    using var stream = entry.Open();

    byte[] buffer = new byte[entry.Length];
    stream.ReadExactly(buffer);
}
catch (InvalidDataException ex)
{
    Console.WriteLine($"Error reading ZIP entry: {ex.Message}");
}
```

## Affected APIs

- `System.IO.Compression.ZipArchiveEntry.Open`
