---
title: "V7TarEntry class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Formats.Tar/V7TarEntry.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# V7TarEntry class

Namespace: `System.Formats.Tar`

```csharp
public sealed class V7TarEntry : System.Formats.Tar.TarEntry
```

Represents a tar entry from an archive of the V7 format.

To be added.

## V7TarEntry.V7TarEntry(TarEntry) constructor

```csharp
public V7TarEntry (System.Formats.Tar.TarEntry other);
```

Initializes a new `V7TarEntry` instance by converting the specified `other` entry into the V7 format.

Parameters:

- `other`: The `TarEntry` instance to convert to the V7 format.

Exceptions:

- `ArgumentException`: `other` is a `PaxGlobalExtendedAttributesTarEntry` and cannot be converted.

-or-

The entry type of `other` is not supported in the V7 format.

To be added.

## V7TarEntry.V7TarEntry(TarEntryType, String) constructor

```csharp
public V7TarEntry (System.Formats.Tar.TarEntryType entryType, string entryName);
```

Initializes a new `V7TarEntry` instance with the specified entry type and entry name.

Parameters:

- `entryType`: The type of the entry.
- `entryName`: A string with the path and file name of this entry.

Exceptions:

- `ArgumentNullException`: `entryName` is `null`.
- `ArgumentException`: `entryName` is empty.

-or-

The entry type is not supported for creating an entry in the V7 format.

When creating an instance using the `V7TarEntry.#ctor` constructor, only the following entry types are supported: `TarEntryType.Directory`, `TarEntryType.HardLink`, `TarEntryType.SymbolicLink`, and `TarEntryType.V7RegularFile`.
