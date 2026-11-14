---
title: "TarEntryType enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Formats.Tar/TarEntryType.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TarEntryType enum

Namespace: `System.Formats.Tar`

```csharp
public enum TarEntryType
```

Specifies the tar entry types.

Tar entries with a metadata entry type aren't exposed to the user. They are handled internally.

## TarEntryType.BlockDevice field

```csharp
BlockDevice
```

Block device special file.

This entry type is supported only in the Unix platforms for writing.

## TarEntryType.CharacterDevice field

```csharp
CharacterDevice
```

Character device special file.

This entry type is supported only in the Unix platforms for writing.

## TarEntryType.ContiguousFile field

```csharp
ContiguousFile
```

GNU contiguous file.

This entry type is specific to the `TarEntryFormat.Gnu` format, and is treated as a `TarEntryType.RegularFile` entry type.

## TarEntryType.Directory field

```csharp
Directory
```

Directory.

## TarEntryType.DirectoryList field

```csharp
DirectoryList
```

GNU directory with a list of entries.

This entry type is specific to the `TarEntryFormat.Gnu` format, and is treated as a `TarEntryType.Directory` entry type that contains a data section.

## TarEntryType.ExtendedAttributes field

```csharp
ExtendedAttributes
```

PAX Extended Attributes entry.

Metadata entry type.

## TarEntryType.Fifo field

```csharp
Fifo
```

FIFO special file.

This entry type is supported only in the Unix platforms for writing.

## TarEntryType.GlobalExtendedAttributes field

```csharp
GlobalExtendedAttributes
```

PAX Global Extended Attributes entry.

Metadata entry type.

## TarEntryType.HardLink field

```csharp
HardLink
```

Hard link.

## TarEntryType.LongLink field

```csharp
LongLink
```

GNU long link.

Metadata entry type.

## TarEntryType.LongPath field

```csharp
LongPath
```

GNU long path.

Metadata entry type.

## TarEntryType.MultiVolume field

```csharp
MultiVolume
```

GNU multi-volume file.

This entry type is specific to the `TarEntryFormat.Gnu` format and is not supported for writing.

## TarEntryType.RegularFile field

```csharp
RegularFile
```

Regular file.

This entry type is specific to the `TarEntryFormat.Ustar`, `TarEntryFormat.Pax` and `TarEntryFormat.Gnu` formats.

## TarEntryType.RenamedOrSymlinked field

```csharp
RenamedOrSymlinked
```

GNU file to be renamed/symlinked.

This entry type is specific to the `TarEntryFormat.Gnu` format. It is considered unsafe and is ignored by other tools.

## TarEntryType.SparseFile field

```csharp
SparseFile
```

GNU sparse file.

This entry type is specific to the `TarEntryFormat.Gnu` format and is not supported for writing.

## TarEntryType.SymbolicLink field

```csharp
SymbolicLink
```

Symbolic link.

## TarEntryType.TapeVolume field

```csharp
TapeVolume
```

GNU tape volume.

This entry type is specific to the `TarEntryFormat.Gnu` format and is not supported for writing.

## TarEntryType.V7RegularFile field

```csharp
V7RegularFile
```

V7 Regular file.

This entry type is specific to the `TarEntryFormat.V7` format.
