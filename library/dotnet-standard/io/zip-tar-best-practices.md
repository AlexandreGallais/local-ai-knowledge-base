---
title: "Best practices for ZIP and TAR archives (part 1 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/io/zip-tar-best-practices.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Best practices for working with ZIP and TAR archives in .NET

This article covers best practices for working with ZIP and TAR archives in .NET. You'll learn how to choose the right API for your scenario, use the convenience methods effectively for trusted input, and safely handle untrusted archives to protect against common attacks like path traversal and zip bombs.

.NET provides built-in support for two of the most common archive formats:

- **ZIP** (`System.IO.Compression`): A compressed archive format that bundles multiple files and directories into a single file. ZIP supports per-entry compression (Deflate, Deflate64, Stored). The primary types are `System.IO.Compression.ZipArchive` for reading and writing archives, `System.IO.Compression.ZipFile` for file-based convenience methods, and `System.IO.Compression.ZipFileExtensions` for extraction helpers.

- **TAR** (`System.Formats.Tar`): A Unix-origin archive format that stores files, directories, and metadata (permissions, ownership, timestamps) without compression. .NET supports the V7, UStar, PAX, and GNU formats. The primary types are `System.Formats.Tar.TarReader` and `System.Formats.Tar.TarWriter` for streaming access, and `System.Formats.Tar.TarFile` for file-based convenience methods. TAR is often combined with a compression layer (for example, `System.IO.Compression.GZipStream` for `.tar.gz` files).

## Choose the right API

.NET offers two categories of archive APIs. Pick the category that matches your scenario.

- Convenience APIs (one-shot operations)
- Streaming APIs (entry-by-entry control)

If you control the archive source (your own build output, known-safe backups), the convenience APIs are the simplest choice. If the archive comes from an external source (user uploads, downloads, network transfers), use the streaming APIs with the safety checks described in this article.

> **Caution:**
> ZIP and TAR archives differ significantly in what they store. ZIP primarily transmits files, while TAR transmits a complete filesystem topology, including file types, symbolic links, hard links, permissions, and other metadata. This difference has important security implications: TAR's richer structure gives an adversary more ways to influence how data is represented on disk, well beyond just filenames and file contents. Exercise extra caution when processing untrusted TAR archives.

### Convenience APIs (one-shot operations)

Use these APIs to create or extract an entire archive in a single call. They're ideal for simple, trusted scenarios.

- `System.IO.Compression.ZipFile.CreateFromDirectory*`
- `System.IO.Compression.ZipFile.ExtractToDirectory*`
- `System.Formats.Tar.TarFile.CreateFromDirectory*`
- `System.Formats.Tar.TarFile.ExtractToDirectory*`

Best for: simple workflows with trusted input, quick scripts, and build tooling.

### Streaming APIs (entry-by-entry control)

Use these APIs for full control over each archive entry. They're essential for large archives or untrusted input.

- **ZIP:** Use `System.IO.Compression.ZipArchive` to open an archive and iterate, read, or write entries selectively. Use `System.IO.Compression.ZipFileExtensions.ExtractToFile*` to extract individual entries.

- **TAR:** Use `System.Formats.Tar.TarReader` and `System.Formats.Tar.TarWriter` for sequential entry-by-entry access. Use `System.Formats.Tar.TarEntry.ExtractToFile*` to extract individual entries.

Best for: large archives, selective extraction, untrusted input, and custom processing.

> **Tip:**
> Import the `System.IO.Compression` namespace to access the extension methods on `System.IO.Compression.ZipArchive` and `System.IO.Compression.ZipArchiveEntry`.

## Work with trusted archives

When the archive source is known and trusted, the convenience methods give you a one-line extraction path:

- `System.IO.Compression.ZipFile.ExtractToDirectory*` and `System.Formats.Tar.TarFile.ExtractToDirectory*` automatically validate entry paths against the specified destination directory boundary. These checks don't guarantee containment on disk: a pre-existing junction or symbolic link in the destination path can redirect writes outside that directory.

- `System.IO.Compression.ZipFile.ExtractToDirectory*` has overloads that default to not overwriting existing files. All `System.Formats.Tar.TarFile.ExtractToDirectory*` overloads require the `overwriteFiles` parameter, so you must always choose explicitly.

- When overwriting is enabled during ZIP extraction, .NET extracts to a temporary file first and only replaces the target after successful extraction. This prevents partial corruption if the extraction fails.

- TAR extraction handles overwriting differently: it deletes the existing file before writing the replacement. If extraction fails after deletion (for example, due to an I/O error or process interruption), the original file is lost and the replacement might be incomplete. Consider backing up critical files before overwriting with TAR extraction.

> **Warning:**
> Use the `ExtractToDirectory` convenience methods only on trusted inputs. For both ZIP and TAR, their path validation provides only a best-effort attempt to keep extraction within the specified destination directory, not a guarantee. For example, a pre-existing junction or symbolic link in the destination directory or one of its parents can redirect writes even when the validated paths appear to stay within the destination. See Validate destination paths for guidance on a fresh, application-controlled destination.
>
> These helpers also don't enforce size limits, entry count limits, or other policies needed for safe extraction of untrusted archives. To enforce these limits, even for trusted input, use the streaming approach described in Handle untrusted archives safely. Streaming APIs don't provide a containment guarantee either: you must validate paths yourself and control the destination directory.
