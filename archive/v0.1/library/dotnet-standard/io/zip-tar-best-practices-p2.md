---
title: "Best practices for ZIP and TAR archives (part 2 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/io/zip-tar-best-practices.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Best practices for ZIP and TAR archives (part 2 of 4)

## Handle untrusted archives safely

For untrusted input—user uploads, third-party downloads, or network transfers—iterate over entries manually and enforce your own safety checks. The following subsections describe what you need to enforce and why.

- Enforce size and entry count limits
- Validate file names
- Validate destination paths
- Handle symbolic and hard links (TAR)
- Entry permission bits (Unix only)
- Complete safe extraction examples

### Enforce size and entry count limits

Neither `System.IO.Compression.ZipArchive` nor `System.Formats.Tar.TarReader` limits the total uncompressed size or the number of entries extracted, and neither do the `ExtractToDirectory` convenience methods. You must enforce these limits yourself.

> **Important:**
> A small compressed file can expand to terabytes of data—this is known as a *zip bomb*. Zip bombs come in two forms:
>
> - **Flat (non-recursive):** A single archive contains many entries that each decompress to a large size. DEFLATE achieves ratios up to ~1032×, so 100 KB of compressed data can expand to ~100 MB. Scaling up the entry count or entry size produces terabytes of output in a single extraction pass. These bombs are effective against any zip parser, including .NET.
> - **Recursive (nested):** An archive contains inner archives, each containing more archives, multiplying the expansion at every layer. The classic `42.zip` uses five layers of 16 nested zips to reach 4.5 PB. However, .NET's `ExtractToDirectory` doesn't recursively extract inner archives—it treats them as opaque files—so recursive bombs aren't a concern unless your code opens the extracted archives again.
>
> Always enforce limits on decompressed size and entry count when extracting untrusted archives.

- Enforce per-entry size limits

```csharp
void SafeExtractEntry(ZipArchiveEntry entry, string destinationPath, long maxDecompressedSize)
{
    // The runtime enforces that entry.Open() will never produce more than
    // entry.Length bytes, so checking the declared size is sufficient.
    if (entry.Length > maxDecompressedSize)
    {
        throw new InvalidOperationException(
            $"Entry '{entry.FullName}' declares size {entry.Length}, exceeding limit {maxDecompressedSize}.");
    }

    entry.ExtractToFile(destinationPath, overwrite: false);
}
```
- Track aggregate size and entry count

```csharp
void SafeExtractArchive(ZipArchive archive, string destinationDir,
    long maxTotalSize, int maxEntryCount)
{
    // Flat zip bombs can contain many entries that each expand to large sizes.
    // Reject the archive early if the entry count exceeds your limit.
    if (archive.Entries.Count > maxEntryCount)
    {
        throw new InvalidOperationException("Archive contains an excessive number of entries.");
    }

    long totalExtracted = 0;
    foreach (ZipArchiveEntry entry in archive.Entries)
    {
        totalExtracted = checked(totalExtracted + entry.Length);
        if (totalExtracted > maxTotalSize)
        {
            throw new InvalidOperationException(
                $"Archive total decompressed size exceeds the allowed limit of {maxTotalSize} bytes.");
        }
        // ... extract each entry with per-entry limits too
    }
}
```
> **Tip:**
> The same approach applies to TAR archives. Since TAR files are read entry-by-entry via `System.Formats.Tar.TarReader.GetNextEntry*`, track both the cumulative data size and entry count as you iterate.

### Validate file names

Depending on the filesystem, some characters might not be allowed in filenames (or allowed only in certain positions), or have special meaning. Applications should check that the extracted entry names conform to an acceptable pattern.

### Validate destination paths

When you use the streaming APIs, you're responsible for validating every entry's destination path. They perform no path validation at all.

For every entry, resolve the destination to an absolute path and verify it falls within your target directory:

```csharp
void ValidatePaths(ZipArchive archive, string destinationDir)
{
    string fullDestDir = Path.GetFullPath(destinationDir);
    if (!fullDestDir.EndsWith(Path.DirectorySeparatorChar))
        fullDestDir += Path.DirectorySeparatorChar;

    foreach (ZipArchiveEntry entry in archive.Entries)
    {
        string destPath = Path.GetFullPath(Path.Join(fullDestDir, entry.FullName));

        if (!destPath.StartsWith(fullDestDir, StringComparison.Ordinal))
            throw new IOException(
                $"Entry '{entry.FullName}' would extract outside the destination directory.");
    }
}
```
Key <example-value>:

- `Path.GetFullPath()` resolves relative segments like `../` into an absolute path.
- The `StartsWith` check ensures the resolved path is still inside the destination.
- The trailing directory separator on `fullDestDir` is critical—without it, a path like `/safe-dir-evil/file` would incorrectly match `/safe-dir`.

> **Note:**
> Boundary validation assumes the destination directory itself is a real directory you control. If the destination directory or one of its parents is already a junction or symbolic link, extraction follows that link and writes to the link's target, even when each entry's resolved path still appears to stay within the destination. When handling untrusted archives, extract into a fresh, application-controlled directory rather than a reused or externally writable location.

> **Warning:**
> The following APIs leave you completely unprotected against path traversal. You must validate paths yourself before calling them.

- `System.IO.Compression.ZipFileExtensions.ExtractToFile*` writes to whatever path you give it—no sanitization, no boundary check.
- `System.IO.Compression.ZipArchiveEntry.Open*` returns a raw `Stream`—the caller decides where to write.
- `System.Formats.Tar.TarEntry.ExtractToFile*` writes to the given path without validating it against any directory boundary.

**Vulnerable pattern—DO NOT USE without validation:**

```csharp
void DangerousExtract(string extractDir)
{
    // ⚠️ DANGEROUS: entry.FullName could contain "../" sequences
    using ZipArchive archive = ZipFile.OpenRead("archive.zip");
    foreach (ZipArchiveEntry entry in archive.Entries)
    {
        string destinationPath = Path.Combine(extractDir, entry.FullName);
        entry.ExtractToFile(destinationPath, overwrite: true); // Might write outside of `extractDir`
    }
}
```
### Handle symbolic and hard links (TAR)

TAR archives support symbolic links and hard links, which introduce attack vectors beyond basic path traversal:

- **Symlink escape:** A symlink entry points to an arbitrary location (for example, `/etc/`), then a subsequent file entry relative to the symlink directory writes through the link to that external location.
- **Hard link to sensitive file:** A hard link target references a file outside the extraction directory. Because a hard link shares the same inode as the original, any code that later opens the hard link for writing (for example, with `File.Create` or `File.WriteAllText`) modifies the original file's contents.

The safest approach for untrusted archives is to skip link entries entirely:

```csharp
if (entry.EntryType is TarEntryType.SymbolicLink or TarEntryType.HardLink)
    continue; // Skip link entries for untrusted input
```

If you need to preserve links, validate that the link target resolves within your destination directory before creating it:

```csharp
bool IsLinkTargetSafe(TarEntry entry, string fullDestDir)
{
    // A symlink with an absolute (rooted) target is resolved from the filesystem root, not from the extraction directory.
    if (Path.IsPathRooted(entry.LinkName))
        return false;

    if (!fullDestDir.EndsWith(Path.DirectorySeparatorChar))
        fullDestDir += Path.DirectorySeparatorChar;

    string resolvedTarget;

    if (entry.EntryType is TarEntryType.SymbolicLink)
    {
        // Symlink targets are relative to the symlink's own parent directory, or absolute.
        string entryDir = Path.GetDirectoryName(
            Path.GetFullPath(Path.Join(fullDestDir, entry.Name)))!;
        resolvedTarget = Path.GetFullPath(Path.Join(entryDir, entry.LinkName));
    }
    else
    {
        // Hard link targets are relative to the destination directory root.
        resolvedTarget = Path.GetFullPath(Path.Join(fullDestDir, entry.LinkName));
    }

    return resolvedTarget.StartsWith(fullDestDir, StringComparison.Ordinal);
}
```
If your use case requires extracting archives with hard links but you want to avoid hard links on disk, `System.Formats.Tar.TarHardLinkMode.CopyContents` copies the file content instead of creating a hard link. This eliminates hard-link-based attacks and produces more portable output on Windows.

For reference, `System.Formats.Tar.TarFile.ExtractToDirectory*` validates both the entry path and link target path against the destination directory boundary. If either resolves outside, an `System.IO.IOException` is thrown. `System.Formats.Tar.TarEntry.ExtractToFile*` rejects symbolic and hard link entries entirely—it throws `System.InvalidOperationException`.

### Entry permission bits (Unix only)

On Unix-like systems, the convenience APIs apply permission bits from the archive metadata to the extracted file or directory. These permissions might be too broad for the application scenario. In your application, you might want to prevent extraction of files that have executable permissions set. For more information, see the Unix file permissions section of this article.
