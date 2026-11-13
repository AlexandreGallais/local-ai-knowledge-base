---
title: "ZipArchiveEntry names and comments respect UTF8 flag"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/9.0/ziparchiveentry-encoding.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ZipArchiveEntry names and comments respect UTF8 flag

A `System.IO.Compression.ZipArchive` can be created with an `System.Text.Encoding` parameter, which is used to decode the names and comments of entries in the ZIP archive. .NET 7 introduced a regression where this encoding was used by default, with a fallback to the system default code page (UTF8 in .NET Core) if no encoding was supplied. This regression is corrected in .NET 9: if the entry's general purpose bit flags indicate that UTF8 should be used, that is respected. If the UTF8 bit flag is not set, the user-supplied encoding is used (with the existing fallback to the system default code page if none is supplied.)

## Previous behavior

In .NET 7 and .NET 8, if a `ZipArchive` was instantiated with a user-specified `entryNameEncoding` parameter, this encoding was always used when decoding the names and comments of entries in the ZIP archive. `entryNameEncoding` was used even if the entry had the bit set to signify that its name and comment were encoded in UTF8.

## New behavior

Starting in .NET 9, when a ZIP archive entry's name and comment are decoded, its UTF8 bit flag is respected. The user-supplied `entryNameEncoding` parameter is only used to decode the entry's name and comment if this bit flag is unset.

## Version introduced

.NET 9 RC 1

## Type of breaking change

This change is a behavioral change.

## Reason for change

This change corrects a regression in .NET 7 and .NET 8. It also returns `System.IO.Compression.ZipArchive` to compliance with the ZIP file format specification, sections 4.4.4 and appendix D.

## Recommended action

If your code passes an encoding to the ZipArchive constructor), be aware that this encoding isn't respected in all situations. It will only be used if the entry's UTF8 bit is not set.

If you're using `System.IO.Compression.ZipArchive` to parse ZIP entries with names encoded in non-UTF8 format (but which have the UTF8 bit flag set), you will no longer be able to do so. The previous behavior was a bug.

## Affected APIs

- `System.IO.Compression.ZipArchive.#ctor(System.IO.Stream,System.IO.Compression.ZipArchiveMode,System.Boolean,System.Text.Encoding)`
- `System.IO.Compression.ZipFile.ExtractToDirectory(System.IO.Stream,System.String,System.Text.Encoding,System.Boolean)`
- `System.IO.Compression.ZipFile.ExtractToDirectory(System.String,System.String,System.Text.Encoding,System.Boolean)`
- `System.IO.Compression.ZipFile.ExtractToDirectory(System.String,System.String,System.Text.Encoding)`
- `System.IO.Compression.ZipFile.ExtractToDirectory(System.IO.Stream,System.String,System.Text.Encoding)`
- `System.IO.Compression.ZipFile.Open(System.String,System.IO.Compression.ZipArchiveMode,System.Text.Encoding)`
