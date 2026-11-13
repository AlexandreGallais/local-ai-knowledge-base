---
title: "Best practices for ZIP and TAR archives (part 3 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/io/zip-tar-best-practices.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Best practices for ZIP and TAR archives (part 3 of 4)

### Complete safe extraction examples

Combine path traversal validation, size limits, entry count limits, and link handling in a single extraction loop.

- **ZIP**

  The following method extracts a ZIP archive while enforcing all recommended safety checks:

```csharp
void SafeExtractZip(string archivePath, string destinationDir,
    long maxTotalSize, long maxEntrySize, int maxEntryCount)
{
    // Resolve the destination to an absolute path and ensure it ends with a
    // directory separator. This trailing separator is essential — without it,
    // the StartsWith check below could be tricked by paths like
    // "/safe-dir-evil/" matching "/safe-dir".
    string fullDestDir = Path.GetFullPath(destinationDir);
    if (!fullDestDir.EndsWith(Path.DirectorySeparatorChar))
        fullDestDir += Path.DirectorySeparatorChar;

    Directory.CreateDirectory(fullDestDir);

    using var archive = new ZipArchive(File.OpenRead(archivePath), ZipArchiveMode.Read);

    // Check the entry count up front. ZIP central directory is read eagerly,
    // so archive.Entries.Count is available immediately without iterating.
    if (archive.Entries.Count > maxEntryCount)
        throw new InvalidOperationException("Archive contains too many entries.");

    long totalSize = 0;
    foreach (ZipArchiveEntry entry in archive.Entries)
    {
        // Enforce per-entry and cumulative size limits using the declared uncompressed size.
        totalSize += entry.Length;
        if (entry.Length > maxEntrySize)
            throw new InvalidOperationException(
                $"Entry '{entry.FullName}' exceeds per-entry size limit.");
        if (totalSize > maxTotalSize)
            throw new InvalidOperationException("Archive exceeds total size limit.");

        // The entry Name can contain arbitrary characters. Some characters might not be
        // allowed on certain filesystems or have a special meaning. Applications should
        // apply their own policies regarding allowed filenames. ValidateName is a placeholder
        // for such a policy.
        if (!ValidateName(entry.FullName))
        {
            throw new IOException($"Entry name '{entry.FullName}' is not allowed.");
        }

        // ExternalAttributes carry permission bits for Unix platforms. Clearing the
        // attributes enforces extraction with default file permissions.
        entry.ExternalAttributes = 0;

        // Resolve the full destination path using Path.GetFullPath, which
        // normalizes away any "../" segments. Then verify the result still
        // starts with the destination directory.
        string destPath = Path.GetFullPath(Path.Join(fullDestDir, entry.FullName));
        if (!destPath.StartsWith(fullDestDir, StringComparison.Ordinal))
            throw new IOException(
                $"Entry '{entry.FullName}' would extract outside the destination.");

        // By convention, directory entries in ZIP archives have names ending
        // in '/'. Path.GetFileName returns empty for these, so we use that
        // to distinguish directories from files.
        if (string.IsNullOrEmpty(Path.GetFileName(destPath)))
        {
            Directory.CreateDirectory(destPath);
        }
        else
        {
            // Create the parent directory and any missing intermediate directories.
            Directory.CreateDirectory(Path.GetDirectoryName(destPath)!);
            entry.ExtractToFile(destPath, overwrite: false);
        }
    }
}
```
- **TAR**

  TAR extraction differs from ZIP in several ways: entries are read sequentially (there's no central directory), link entries need explicit handling, and the `DataStream` must be consumed before advancing to the next entry.

```csharp
void SafeExtractTar(Stream archiveStream, string destinationDir,
    long maxTotalSize, long maxEntrySize, int maxEntryCount)
{
    // Same trailing-separator technique as the ZIP example.
    string fullDestDir = Path.GetFullPath(destinationDir);
    if (!fullDestDir.EndsWith(Path.DirectorySeparatorChar))
        fullDestDir += Path.DirectorySeparatorChar;

    Directory.CreateDirectory(fullDestDir);

    using var reader = new TarReader(archiveStream);
    TarEntry? entry;
    long totalSize = 0;
    int entryCount = 0;

    // TAR has no central directory — entries are read one at a time.
    // GetNextEntry() returns null when the archive is exhausted.
    while ((entry = reader.GetNextEntry()) is not null)
    {
        if (++entryCount > maxEntryCount)
            throw new InvalidOperationException("Archive contains too many entries.");

        if (entry.Length > maxEntrySize)
            throw new InvalidOperationException(
                $"Entry '{entry.Name}' exceeds per-entry size limit.");
        totalSize += entry.Length;
        if (totalSize > maxTotalSize)
            throw new InvalidOperationException("Archive exceeds total size limit.");

        // Allow-list of entry types to process. Any type not listed here is
        // silently skipped. We exclude symlinks, hard links (which can
        // escape the destination), and metadata types
        // (GlobalExtendedAttributes, ExtendedAttributes, LongLink, and
        // LongPath) that contain no file data.
        TarEntryType[] allowedTypes =
        [
            TarEntryType.RegularFile,
            TarEntryType.V7RegularFile,
            TarEntryType.ContiguousFile,
            TarEntryType.Directory
        ];

        if (!allowedTypes.Contains(entry.EntryType))
            continue;

        // The entry Name can contain arbitrary characters. Some characters might not be
        // allowed on certain filesystems or have a special meaning. Applications should
        // apply their own policies regarding allowed filenames. ValidateName is a placeholder
        // for such a policy.
        if (!ValidateName(entry.Name))
        {
            throw new IOException($"Entry name '{entry.Name}' is not allowed.");
        }

        // Mask the entry's permission bits to a safe subset.
        // This subset depends on your application's needs.
        const UnixFileMode PermittedFileModes =
            UnixFileMode.UserRead | UnixFileMode.UserWrite |
            UnixFileMode.GroupRead |
            UnixFileMode.OtherRead;

        const UnixFileMode PermittedDirectoryModes =
            PermittedFileModes |
            UnixFileMode.UserExecute | UnixFileMode.GroupExecute | UnixFileMode.OtherExecute;

        if (entry.EntryType == TarEntryType.Directory)
        {
            entry.Mode &= PermittedDirectoryModes;
        }
        else
        {
            entry.Mode &= PermittedFileModes;
        }

        // Normalize and validate the path, same as the ZIP example.
        string destPath = Path.GetFullPath(Path.Join(fullDestDir, entry.Name));
        if (!destPath.StartsWith(fullDestDir, StringComparison.Ordinal))
            throw new IOException(
                $"Entry '{entry.Name}' would extract outside the destination.");

        if (entry.EntryType is TarEntryType.Directory)
        {
            Directory.CreateDirectory(destPath);
        }
        else
        {
            // Create the parent directory and any missing intermediate directories.
            Directory.CreateDirectory(Path.GetDirectoryName(destPath)!);
            entry.ExtractToFile(destPath, overwrite: false);
        }
    }
}
```
## Memory and performance considerations

Understanding how .NET manages memory for ZIP and TAR operations helps you avoid unexpected issues with large or untrusted archives.

- ZipArchive memory usage
- TAR streaming model
- Thread safety

### ZipArchive memory usage

Don't use `System.IO.Compression.ZipArchiveMode.Update` for large or untrusted archives. When you open a `System.IO.Compression.ZipArchive` in `Update` mode and call `System.IO.Compression.ZipArchiveEntry.Open*` or `System.IO.Compression.ZipArchiveEntry.OpenAsync*` on an entry, its uncompressed data is loaded into a `System.IO.MemoryStream` to support in-place modifications. Accessing entry metadata (such as `System.IO.Compression.ZipArchiveEntry.FullName`, `System.IO.Compression.ZipArchiveEntry.Length`, or `System.IO.Compression.ZipArchiveEntry.ExternalAttributes`) does not trigger decompression. For large or malicious archives, opening entry content streams can cause `System.OutOfMemoryException`. Check `System.IO.Compression.ZipArchiveEntry.Length` before calling `System.IO.Compression.ZipArchiveEntry.Open*` to avoid decompressing unexpectedly large entries.

Additionally, when you open a `System.IO.Compression.ZipArchive` in `System.IO.Compression.ZipArchiveMode.Read` mode with an **unseekable** stream (for example, a network stream), the runtime buffers the entire archive contents in memory to enable seeking through the central directory.

**Recommendation:** Only use `Update` mode for archives you trust and know are small enough to fit in memory. `System.IO.Compression.ZipArchiveMode.Read` and `System.IO.Compression.ZipArchiveMode.Create` modes are safer because they stream entry data rather than buffering it entirely in memory. To modify a large archive, open the original in `Read` mode, create a new archive in `Create` mode, and selectively copy entries:

```csharp
void StreamingModify()
{
    // ✅ Streaming approach for large archives
    using var input = new ZipArchive(File.OpenRead("large.zip"), ZipArchiveMode.Read);
    using var output = new ZipArchive(File.Create("modified.zip"), ZipArchiveMode.Create);

    foreach (var entry in input.Entries)
    {
        if (ShouldKeep(entry))
        {
            var newEntry = output.CreateEntry(entry.FullName);
            using var src = entry.Open();
            using var dst = newEntry.Open();
            src.CopyTo(dst);
        }
    }
}

bool ShouldKeep(ZipArchiveEntry entry) => true;
```
### TAR streaming model

`System.Formats.Tar.TarReader` reads entries one at a time and doesn't buffer the entire archive. However, for unseekable streams, each entry's `System.Formats.Tar.TarEntry.DataStream` is only valid until the next `System.Formats.Tar.TarReader.GetNextEntry*` call. If you need to retain entry data, copy it immediately to a separate `System.IO.MemoryStream` that remains valid after advancing.

> **Warning:**
> Avoid using `System.Formats.Tar.TarReader.GetNextEntry*` with `copyContents: true` on untrusted archives, as it allocates a potentially large amount of memory for the `System.IO.MemoryStream` to hold the entry contents. Pass `copyContents: false` and validate the entry size before materializing the contents manually.

```csharp
void TarStreamingRead(Stream archiveStream, string destDir)
{
    using var reader = new TarReader(archiveStream);
    TarEntry? entry;
    while ((entry = reader.GetNextEntry()) is not null)
    {
        if (entry.DataStream is not null)
        {
            // DataStream is only valid until the next GetNextEntry() call,
            // so consume
            string destPath = Path.Join(destDir, entry.Name);
            using var fileStream = File.Create(destPath);
            entry.DataStream.CopyTo(fileStream);

            // Alternatively, you can copy the entry contents into
            // in a separate MemoryStream that remains valid after advancing:
            if (entry.Length < 1_000_000) // Example limit
            {
                MemoryStream memoryStream = new MemoryStream();
                entry.DataStream.CopyTo(memoryStream);
                // memoryStream can be used after GetNextEntry() is called again
            }
        }
    }
}
```
### Thread safety

`System.IO.Compression.ZipArchive`, `System.Formats.Tar.TarReader`, and `System.Formats.Tar.TarWriter` are not thread-safe. Don't access an instance from multiple threads concurrently. If you need to read multiple archives in parallel, open a separate instance per thread. For writing, synchronize access externally—multiple writers can't safely target the same archive file concurrently.
