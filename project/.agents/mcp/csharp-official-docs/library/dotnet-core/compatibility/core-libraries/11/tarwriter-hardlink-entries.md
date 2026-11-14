---
title: "Breaking change: TarWriter uses HardLink entries for hard-linked files"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/core-libraries/11/tarwriter-hardlink-entries.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# TarWriter uses HardLink entries for hard-linked files

`System.Formats.Tar.TarWriter` now detects when multiple files are hard-linked to the same inode. It writes a `HardLink` entry for subsequent files instead of duplicating the file content.

## Version introduced

.NET 11

## Previous behavior

Previously, when creating a tar archive with `TarWriter`, files that were hard-linked to the same inode were treated as separate, independent files. The full file content was duplicated in the archive for each hard-linked file.

```csharp
using System.Formats.Tar;
using System.IO;

string filePath1 = "file1.txt";
string filePath2 = "file2.txt";

// Create two hard-linked files.
File.WriteAllText(filePath1, "Hello, world!");
File.CreateHardLink(filePath2, filePath1);

using (var stream = File.Create("archive.tar"))
using (var writer = new TarWriter(stream, TarEntryFormat.Pax, leaveOpen: false))
{
    writer.WriteEntry(filePath1, "file1.txt");
    writer.WriteEntry(filePath2, "file2.txt");
}
```

In the resulting `archive.tar`, both `file1.txt` and `file2.txt` had separate file entries, each containing the full file content.

## New behavior

Starting in .NET 11, `System.Formats.Tar.TarWriter` detects when multiple files are hard-linked to the same inode and writes a `System.Formats.Tar.TarEntryType.HardLink` entry for subsequent files instead of duplicating the file content.

Using the same code as shown in the Previous behavior section, the resulting `archive.tar` now contains a full file entry for `file1.txt`, while `file2.txt` has a `HardLink` entry pointing to `file1.txt`.

## Type of breaking change

This change is a behavioral change.

## Reason for change

This change improves the efficiency of tar archives created by the `System.Formats.Tar` library. By using <System.Formats.Tar.TarEntryType.HardLink> entries for files that share the same inode, the size of the resulting archive is reduced and the hard-link relationships between files are preserved. This behavior is consistent with GNU tar and other widely used tar implementations.

## Recommended action

If your application depends on duplicating file content for hard-linked files, you can restore the previous behavior. Set the `System.Formats.Tar.TarWriterOptions.HardLinkMode` property to `System.Formats.Tar.TarHardLinkMode.CopyContents` in a new `System.Formats.Tar.TarWriterOptions` instance:

```csharp
using System.Formats.Tar;
using System.IO;

string filePath1 = "file1.txt";
string filePath2 = "file2.txt";

// Create two hard-linked files.
File.WriteAllText(filePath1, "Hello, world!");
File.CreateHardLink(filePath2, filePath1);

var options = new TarWriterOptions
{
    HardLinkMode = TarHardLinkMode.CopyContents
};

using (var stream = File.Create("archive.tar"))
using (var writer = new TarWriter(stream, options, leaveOpen: false))
{
    writer.WriteEntry(filePath1, "file1.txt");
    writer.WriteEntry(filePath2, "file2.txt");
}
```

Extracting a tar archive that contains `HardLink` entries to a file system without hard link support throws an `System.IO.IOException`. Use the new `System.Formats.Tar.TarExtractOptions` class to specify whether to extract hard links as hard links or copy them as separate files. This enables extraction to file systems without hard link support.

## Affected APIs

- `System.Formats.Tar.TarWriter`
- `System.Formats.Tar.TarWriter.WriteEntry(System.String,System.String)`
- `System.Formats.Tar.TarWriter.WriteEntryAsync(System.String,System.String,System.Threading.CancellationToken)`
