---
title: "Best practices for ZIP and TAR archives (part 4 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/io/zip-tar-best-practices.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Best practices for ZIP and TAR archives (part 4 of 4)

## Platform considerations

Archive behavior can vary between Windows and Unix. Keep these differences in mind when writing cross-platform code.

- Unix file permissions
- Special entry types (TAR)
- File name sanitization differs by platform

### Unix file permissions

- **ZIP:** Unix permissions are stored in the upper 16 bits of `System.IO.Compression.ZipArchiveEntry.ExternalAttributes`. When extracting on Unix via `ExtractToDirectory` or `ExtractToFile`, the runtime restores ownership permissions (read/write/execute for user/group/other), subject to the process umask. SetUID, SetGID, and StickyBit are stripped. Permissions are not applied if the upper bits are zero. This happens when the ZIP was created on Windows, because .NET on Windows sets `DefaultFileExternalAttributes` to `0`. On Windows, these attributes are always ignored during extraction.
- **TAR:** The `System.Formats.Tar.TarEntry.Mode` property represents `UnixFileMode` and can store all 12 permission bits (read/write/execute for user/group/other, plus SetUID, SetGID, and StickyBit). When extracting on Unix via `ExtractToDirectory` or `ExtractToFile`, the runtime applies only the 9 ownership bits (rwx for user/group/other), subject to the process umask. SetUID, SetGID, and StickyBit are stripped for security.

When processing untrusted archives, be aware that extracted files might have executable permissions set by the archive author. Untrusted archives could contain malicious executable files. Since `System.IO.Compression.ZipArchiveEntry.ExternalAttributes` and `System.Formats.Tar.TarEntry.Mode` are writable, you can modify them before extraction:

```csharp
foreach (ZipArchiveEntry entry in archive.Entries)
{
    // Unset the external attributes to force extraction with default Unix permission bits.
    entry.ExternalAttributes = 0;

    // .. other validation omitted for brevity

    Directory.CreateDirectory(Path.GetDirectoryName(destPath)!);
    entry.ExtractToFile(destPath, overwrite: false);
}
```

```csharp

const UnixFileMode PermittedFileModes =
    UnixFileMode.UserRead | UnixFileMode.UserWrite |
    UnixFileMode.GroupRead |
    UnixFileMode.OtherRead;

const UnixFileMode PermittedDirectoryModes =
    PermittedFileModes |
    UnixFileMode.UserExecute | UnixFileMode.GroupExecute | UnixFileMode.OtherExecute;

while ((entry = reader.GetNextEntry()) is not null)
{
    if (entry.EntryType == TarEntryType.Directory)
    {
        entry.Mode &= PermittedDirectoryModes;
    }
    else
    {
        entry.Mode &= PermittedFileModes;
    }
}
```

### Special entry types (TAR)

Block devices, character devices, and FIFOs can only be created on Unix. Extracting these on Windows throws an exception. Elevated privileges are required to create block and character device entries.

### File name sanitization differs by platform

On Windows, when using `ExtractToDirectory`, the runtime replaces control characters and `"*:<>?|` with underscores in entry names. On Unix, only null characters are replaced. Archive entries with names like `file:name.txt` are renamed to `file_name.txt` on Windows but extracted as-is on Unix. The per-entry APIs (`Open()`, `ExtractToFile()`) do not perform any name sanitization, so when using them with entry names from untrusted archives, validate the name and path before extracting (as shown in the Validate destination paths section).

## Data integrity

ZIP and TAR archives use different integrity checks. ZIP stores CRC-32 values for entry data. TAR stores a header checksum for each entry header.

Starting with .NET 11, the runtime validates ZIP CRC-32 values automatically when reading ZIP entries. When you read an entry's data stream to completion, the runtime compares the computed CRC-32 value of the decompressed data against the value stored in the archive. If the values don't match, an `System.IO.InvalidDataException` is thrown. Starting with .NET 11, the runtime also validates TAR header checksums when reading TAR entry headers.

> **Note:**
> In versions earlier than .NET 11, the runtime didn't validate ZIP CRC-32 values on read. The runtime computed CRC-32 values when writing ZIP entries for storage in the archive, but didn't verify them during extraction. If you target a runtime earlier than .NET 11, corrupt or tampered ZIP entries might be accepted silently.
>
> CRC-32 isn't a cryptographic hash—it detects accidental corruption but doesn't protect against intentional tampering by a sophisticated attacker.

## Untrusted metadata

### ZIP comments and extra fields

- **Archive and entry comments** are arbitrary strings. If your application displays or processes comments, sanitize them appropriately.
- **Extra fields** are binary key-value pairs attached to each entry. The runtime preserves unknown extra fields and trailing data when reading and writing archives in `System.IO.Compression.ZipArchiveMode.Update` mode and round-trips them as-is. If your application reads or interprets extra fields, validate their contents.
- **Entry name encoding:** when writing, the runtime uses ASCII for entry names that contain only ASCII printable characters (32-126) and UTF-8 (with the language encoding flag set) for names that contain other characters. When reading without a custom encoding, entries with or without the language encoding flag are decoded as UTF-8 (which also correctly decodes ASCII). Use the `entryNameEncoding` parameter on `System.IO.Compression.ZipArchive` to override encoding when needed, but be aware the override affects all entries uniformly.

### TAR extended attributes and link names

- **PAX extended attributes** (`System.Formats.Tar.PaxTarEntry.ExtendedAttributes`) are an arbitrary, archive-supplied set of key-value strings. A PAX entry can carry many attributes, and individual values can be large. The format also uses these attributes to override standard header fields such as the entry path, link name, and size. Treat them as untrusted input: if your application reads or acts on extended attributes, validate their contents and set limits on how many you process and how large they can be.
- **Link names** (`System.Formats.Tar.TarEntry.LinkName`) on symbolic-link and hard-link entries are archive-supplied paths. Validate them the same way you validate entry names—see Handle symbolic and hard links (TAR).

## Encryption considerations (.NET 11+)

.NET 11 adds support for reading and writing encrypted ZIP archives. The following subsections explain how to choose an encryption method, read encrypted entries, and use encrypted archives with the convenience APIs.

- Choose AES-256 for new archives
- Read encrypted entries
- Convenience methods with encryption

> **Note:**
> ZIP encryption support (ZipCrypto and WinZip AES) is new in .NET 11.

The `ZipEncryptionMethod` enum specifies the encryption method:

| Value | Description |
|-------|-------------|
| `None` | No encryption. |
| `ZipCrypto` | Legacy ZIP encryption. Use only for backward compatibility—vulnerable to known-plaintext attacks. |
| `Aes128` | WinZip AES-128. |
| `Aes192` | WinZip AES-192. |
| `Aes256` | WinZip AES-256. **Recommended**—strongest available option. |
| `Unknown` | Returned when the entry uses an encryption method that .NET does not support. |

### Choose AES-256 for new archives

When creating encrypted entries, always prefer `Aes256`. `ZipCrypto` is a legacy method with known cryptographic weaknesses and shouldn't be relied upon for security—use it only when interoperating with tools that don't support WinZip AES.

```csharp
string password = "<example-value>";

// ⚠️ Weak encryption — use only for backward compatibility
archive.CreateEntry("<example-value>", password, ZipEncryptionMethod.ZipCrypto);

// ✅ Prefer AES-256
archive.CreateEntry("<example-value>", password, ZipEncryptionMethod.Aes256);
```

### Read encrypted entries

Use `ZipArchiveEntry.EncryptionMethod` to check the encryption method, and provide a password to `Open`:

```csharp
using ZipArchive archive = ZipFile.OpenRead("encrypted.zip");

foreach (ZipArchiveEntry entry in archive.Entries)
{
    if (entry.EncryptionMethod == ZipEncryptionMethod.Unknown)
    {
        // Unsupported encryption method, skip this entry
        continue;
    }

    using Stream stream = entry.Open("<example-value>");
    // ... read the decrypted data
}
```

> **Important:**
> `System.IO.Compression.ZipArchive` doesn't guarantee the integrity of an archive or its entries. If your application requires integrity guarantees, establish them through a separate trusted channel before extraction.
>
> The runtime doesn't guarantee that the hash-based message authentication code (HMAC) embedded in a WinZip AES entry will be validated. For example, validation might not run if you don't read the data stream to the end or if the input is malformed. Read the stream to the end to allow validation to run, but don't treat that step as an integrity guarantee. The runtime can return all entry data to your application before validation completes.

Attempting to open an entry that uses an unsupported encryption method (`ZipEncryptionMethod.Unknown`) throws `System.NotSupportedException`.

### Convenience methods with encryption

New option types let you pass a password and encryption method to the convenience APIs:

```csharp
// Extract an encrypted archive
ZipFile.ExtractToDirectory("encrypted.zip", destDir, new ZipExtractionOptions
{
    Password = "<example-value>".AsMemory(),
    OverwriteFiles = false
});

// Create an encrypted archive
ZipFile.CreateFromDirectory(sourceDir, "encrypted.zip", new ZipFileCreationOptions
{
    Password = "<example-value>".AsMemory(),
    EncryptionMethod = ZipEncryptionMethod.Aes256,
    CompressionLevel = CompressionLevel.Optimal
});
```

## Best practices checklist

Before deploying code that handles archives from untrusted sources, verify you've addressed each of the following:

- **Manual iteration:** Don't use `ExtractToDirectory` for untrusted input—iterate entries manually to enforce all limits.
- **Path traversal:** Validate all destination paths with `Path.GetFullPath()` + `StartsWith()`.
- **Special characters in names:** Validate that entry names conform to the application-defined policy.
- **Decompression bombs:** Enforce limits on decompressed size (per-entry and total) and entry count.
- **Symlink/hardlink attacks (TAR):** Validate link targets resolve within the destination, or skip link entries entirely.
- **Unix permissions:** Validate each entry's permission bits. Skip entries with too broad permissions or mask/modify the unwanted permission bits before extraction.
- **Memory limits:** Avoid `System.IO.Compression.ZipArchiveMode.Update` for large untrusted archives. Avoid `System.IO.Compression.ZipArchiveMode.Read` mode with unseekable streams from untrusted sources.
- **Thread safety:** Don't share `System.IO.Compression.ZipArchive`, `System.Formats.Tar.TarReader`, or `System.Formats.Tar.TarWriter` instances across threads.
- **Untrusted metadata:** Treat entry names, link names, comments, ZIP extra fields, and TAR PAX extended attributes as untrusted input. Validate them and set limits before display or processing.
- **Overwrite behavior:** Default to `overwrite: false`.
- **Resource disposal:** Always dispose `System.IO.Compression.ZipArchive`, `System.Formats.Tar.TarReader`, `System.Formats.Tar.TarWriter`, and their streams.

## Related content

- `System.IO.Compression`
- `System.Formats.Tar`
- `System.IO.Compression.ZipFile`
- `System.Formats.Tar.TarFile`
