---
title: "PaxTarEntry class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Formats.Tar/PaxTarEntry.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PaxTarEntry class

Namespace: `System.Formats.Tar`

```csharp
public sealed class PaxTarEntry : System.Formats.Tar.PosixTarEntry
```

Represents a tar entry in the PAX format.

To be added.

## PaxTarEntry.PaxTarEntry(TarEntry) constructor

```csharp
public PaxTarEntry (System.Formats.Tar.TarEntry other);
```

Initializes a new `PaxTarEntry` instance by converting the specified `other` entry into the PAX format.

Parameters:

- `other`: The `TarEntry` instance to convert to the PAX format.

Exceptions:

- `ArgumentException`: `other` is a `PaxGlobalExtendedAttributesTarEntry` instance.

-or-

The entry type of `other` is not supported in the PAX format.

When converting a `GnuTarEntry` to `PaxTarEntry` using this constructor, the `GnuTarEntry.AccessTime` and `GnuTarEntry.ChangeTime` values are transferred to the `PaxTarEntry.ExtendedAttributes` dictionary only if their values are not `default` (which is `DateTimeOffset.MinValue`).

## PaxTarEntry.PaxTarEntry(TarEntryType, String) constructor

```csharp
public PaxTarEntry (System.Formats.Tar.TarEntryType entryType, string entryName);
```

Initializes a new `PaxTarEntry` instance with the specified entry type and entry name, and the default extended attributes.

Parameters:

- `entryType`: The type of the entry.
- `entryName`: A string with the path and file name of this entry.

Exceptions:

- `ArgumentNullException`: `entryName` is `null`.
- `ArgumentException`: `entryName` is empty.

-or-

The entry type is not supported for creating an entry in the PAX format.

#### Remarks

When creating an instance using the `%23ctor` constructor, only the following entry types are supported: `Directory`, `HardLink`, `SymbolicLink`, `RegularFile`, `BlockDevice`, `CharacterDevice`, and `Fifo`.

Use the `%23ctor` constructor to include additional extended attributes when creating the entry.

The following entries are always found in the extended attributes dictionary of any PAX entry:

- Modification time, under the name `mtime`, as a `Double` number.
- Access time, under the name `atime`, as a `Double` number.
- Change time, under the name `ctime`, as a `Double` number.
- Path, under the name `path`, as a string.

The following entries are only found in the extended attributes dictionary of a PAX entry if certain conditions are met:

- Group name, under the name `gname`, as a string, if it is larger than 32 bytes.
- User name, under the name `uname`, as a string, if it is larger than 32 bytes.
- File length, under the name `size`, as an `Int32`, if the string representation of the number is larger than 12 bytes.

## PaxTarEntry.PaxTarEntry(TarEntryType, String, String>>) constructor

```csharp
public PaxTarEntry (System.Formats.Tar.TarEntryType entryType, string entryName, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,string>> extendedAttributes);
```

Initializes a new `PaxTarEntry` instance with the specified entry type, entry name, and extended attributes enumeration.

Parameters:

- `entryType`: The type of the entry.
- `entryName`: A string with the path and file name of this entry.
- `extendedAttributes`: An enumeration of string key-value pairs that represents the metadata to include in the extended attributes entry that precedes the current entry.

Exceptions:

- `ArgumentNullException`: `extendedAttributes` or `entryName` is `null`.
- `ArgumentException`: `entryName` is empty.

-or-

The entry type is not supported for creating an entry in the PAX format.

#### Remarks

Use this constructor to include additional extended attributes when creating the entry.

The following entries are always found in the extended attributes dictionary of any PAX entry:

- Modification time, under the name `mtime`, as a `Double` number.
- Access time, under the name `atime`, as a `Double` number.
- Change time, under the name `ctime`, as a `Double` number.
- Path, under the name `path`, as a string.

The following entries are only found in the extended attributes dictionary of a PAX entry if certain conditions are met:

- Group name, under the name `gname`, as a string, if it is larger than 32 bytes.
- User name, under the name `uname`, as a string, if it is larger than 32 bytes.
- File length, under the name `size`, as an `Int32`, if the string representation of the number is larger than 12 bytes.

## PaxTarEntry.ExtendedAttributes property

```csharp
public System.Collections.Generic.IReadOnlyDictionary<string,string> ExtendedAttributes { get; }
```

Returns the extended attributes for this entry.

Returns: To be added.

#### Remarks

The extended attributes are specified when constructing an entry. Use `%23ctor` to append your own enumeration of extended attributes to the current entry on top of the default ones. Use `%23ctor` to only use the default extended attributes.

The following entries are always found in the extended attributes dictionary of any PAX entry:

- Modification time, under the name `mtime`, as a `Double` number.
- Access time, under the name `atime`, as a `Double` number.
- Change time, under the name `ctime`, as a `Double` number.
- Path, under the name `path`, as a string.

The following entries are only found in the extended attributes dictionary of a PAX entry if certain conditions are met:

- Group name, under the name `gname`, as a string, if it is larger than 32 bytes.
- User name, under the name `uname`, as a string, if it is larger than 32 bytes.
- File length, under the name `size`, as an `Int32`, if the string representation of the number is larger than 12 bytes.
