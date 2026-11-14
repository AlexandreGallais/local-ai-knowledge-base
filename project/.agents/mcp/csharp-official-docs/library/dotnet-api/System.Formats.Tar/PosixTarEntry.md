---
title: "PosixTarEntry class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Formats.Tar/PosixTarEntry.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PosixTarEntry class

Namespace: `System.Formats.Tar`

```csharp
public abstract class PosixTarEntry : System.Formats.Tar.TarEntry
```

Defines the core behavior of a tar entry from an archive of a format that is based on the POSIX IEEE P1003.1 standard from 1988. This includes the formats `TarEntryFormat.Ustar` (represented by the `UstarTarEntry` class), `TarEntryFormat.Pax` (represented by the `PaxTarEntry` class), and `TarEntryFormat.Gnu` (represented by the `GnuTarEntry` class).

Formats that implement the POSIX IEEE P1003.1 standard from 1988 support the following header fields: `devmajor`, `devminor`, `gname`, and `uname`.

Even though the `TarEntryFormat.Gnu` format is not POSIX compatible, it implements and supports the Unix-specific fields that were defined in that POSIX standard.

## PosixTarEntry.DeviceMajor property

```csharp
public int DeviceMajor { get; set; }
```

Gets or sets the device's major number. When the current entry represents a character device or a block device, the major number identifies the driver associated with the device.

Returns: To be added.

Exceptions:

- `InvalidOperationException`: The entry does not represent a block device or a character device.
- `ArgumentOutOfRangeException`: The value is negative, or larger than 2097151.

Character and block devices are Unix-specific entry types.

## PosixTarEntry.DeviceMinor property

```csharp
public int DeviceMinor { get; set; }
```

Gets or sets the device's minor number. When the current entry represents a character device or a block device, the minor number is used by the driver to distinguish individual devices it controls.

Returns: To be added.

Exceptions:

- `InvalidOperationException`: The entry does not represent a block device or a character device.
- `ArgumentOutOfRangeException`: The value is negative, or larger than 2097151.

Character and block devices are Unix-specific entry types.

## PosixTarEntry.GroupName property

```csharp
public string GroupName { get; set; }
```

Gets or sets the name of the group that owns this entry.

Returns: To be added.

Exceptions:

- `ArgumentNullException`: The group name is `null`.

`PosixTarEntry.GroupName` is only used in Unix platforms.

## PosixTarEntry.UserName property

```csharp
public string UserName { get; set; }
```

Gets or sets the name of the user that owns this entry.

Returns: To be added.

Exceptions:

- `ArgumentNullException`: The user name is `null`.

`PosixTarEntry.UserName` is only used in Unix platforms.
