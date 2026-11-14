---
title: "GnuTarEntry class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Formats.Tar/GnuTarEntry.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# GnuTarEntry class

Namespace: `System.Formats.Tar`

```csharp
public sealed class GnuTarEntry : System.Formats.Tar.PosixTarEntry
```

Represents a tar entry in the GNU format.

Even though the `TarEntryFormat.Gnu` format is not POSIX compatible, it implements and supports the Unix-specific fields that were defined in the POSIX IEEE P1003.1 standard from 1988: `devmajor`, `devminor`, `gname`, and `uname`.

## GnuTarEntry.GnuTarEntry(TarEntry) constructor

```csharp
public GnuTarEntry (System.Formats.Tar.TarEntry other);
```

Initializes a new `GnuTarEntry` instance by converting the specified `other` entry into the GNU format.

Parameters:

- `other`: The `TarEntry` instance to convert to the GNU format.

Exceptions:

- `ArgumentException`: `other` is a `PaxGlobalExtendedAttributesTarEntry` instance.

-or-

The entry type of `other` is not supported in the GNU format.

When creating an instance of `GnuTarEntry` using this constructor, if `other` is `TarEntryFormat.Gnu` or `TarEntryFormat.Pax`, then the `GnuTarEntry.AccessTime` and `GnuTarEntry.ChangeTime` properties are set to the same values set in `other`. But if `other` is of any other format, then `GnuTarEntry.AccessTime` and `GnuTarEntry.ChangeTime` are set to `default`, which in the entry header `atime` and `ctime` fields is written as `null` bytes. This ensures compatibility with other tools that are unable to read the `atime` and `ctime` in `TarEntryFormat.Gnu` entries, as these two fields are not POSIX compatible because other formats expect the `prefix` field in the same header location where `TarEntryFormat.Gnu` writes `atime` and `ctime`.

## GnuTarEntry.GnuTarEntry(TarEntryType, String) constructor

```csharp
public GnuTarEntry (System.Formats.Tar.TarEntryType entryType, string entryName);
```

Initializes a new `GnuTarEntry` instance with the specified entry type and entry name.

Parameters:

- `entryType`: The type of the entry.
- `entryName`: A string with the path and file name of this entry.

Exceptions:

- `ArgumentNullException`: `entryName` is `null`.
- `ArgumentException`: `entryName` is empty.

-or-

The entry type is not supported for creating an entry in the GNU format.

When creating an instance using the `GnuTarEntry.#ctor` constructor, only the following entry types are supported: `TarEntryType.Directory`, `TarEntryType.HardLink`, `TarEntryType.SymbolicLink`, `TarEntryType.RegularFile`, `TarEntryType.BlockDevice`, `TarEntryType.CharacterDevice`, and `TarEntryType.Fifo`.

## GnuTarEntry.AccessTime property

```csharp
public DateTimeOffset AccessTime { get; set; }
```

A timestamp that represents the last time the file represented by this entry was accessed.

Returns: To be added.

In Unix platforms, this timestamp is commonly known as `atime`.

## GnuTarEntry.ChangeTime property

```csharp
public DateTimeOffset ChangeTime { get; set; }
```

A timestamp that represents the last time the metadata of the file represented by this entry was changed.

Returns: To be added.

In Unix platforms, this timestamp is commonly known as `ctime`.
