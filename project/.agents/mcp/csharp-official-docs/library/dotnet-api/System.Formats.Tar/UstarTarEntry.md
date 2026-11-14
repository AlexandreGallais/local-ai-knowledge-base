---
title: "UstarTarEntry class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Formats.Tar/UstarTarEntry.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UstarTarEntry class

Namespace: `System.Formats.Tar`

```csharp
public sealed class UstarTarEntry : System.Formats.Tar.PosixTarEntry
```

Represents a tar entry from an archive of the Ustar format.

To be added.

## UstarTarEntry.UstarTarEntry(TarEntry) constructor

```csharp
public UstarTarEntry (System.Formats.Tar.TarEntry other);
```

Initializes a new `UstarTarEntry` instance by converting the specified `other` entry into the Ustar format.

Parameters:

- `other`: The `TarEntry` instance to convert to the Ustar format.

Exceptions:

- `ArgumentException`: `other` is a `PaxGlobalExtendedAttributesTarEntry` instance.

-or-

The entry type of `other` is not supported in the Ustar format.

To be added.

## UstarTarEntry.UstarTarEntry(TarEntryType, String) constructor

```csharp
public UstarTarEntry (System.Formats.Tar.TarEntryType entryType, string entryName);
```

Initializes a new `UstarTarEntry` instance with the specified entry type and entry name.

Parameters:

- `entryType`: The type of the entry.
- `entryName`: A string with the path and file name of this entry.

Exceptions:

- `ArgumentNullException`: `entryName` is `null`.
- `ArgumentException`: `entryName` is empty.

-or-

The entry type is not supported for creating an entry in the Ustar format.

When creating an instance using the `UstarTarEntry.#ctor` constructor, only the following entry types are supported: `TarEntryType.Directory`, `TarEntryType.HardLink`, `TarEntryType.SymbolicLink`, `TarEntryType.RegularFile`, `TarEntryType.BlockDevice`, `TarEntryType.CharacterDevice`, and `TarEntryType.Fifo`.
