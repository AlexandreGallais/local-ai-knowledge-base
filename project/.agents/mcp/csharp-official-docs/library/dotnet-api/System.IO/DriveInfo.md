---
title: "DriveInfo class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/DriveInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DriveInfo class

Namespace: `System.IO`

```csharp
public sealed class DriveInfo : System.Runtime.Serialization.ISerializable
```

Provides access to information on a drive.

#### Remarks
This class models a drive and provides methods and properties to query for drive information. Use `DriveInfo` to determine what drives are available, and what type of drives they are. You can also query to determine the capacity and available free space on the drive.

#### Examples
The following code example demonstrates the use of the `DriveInfo` class to display information about all of the drives on the current system.

_Code sample not included: ~/snippets/csharp/System.IO/DriveInfo/Overview/DriveInfo.cs._

## DriveInfo.DriveInfo(String) constructor

```csharp
public DriveInfo (string driveName);
```

Creates a new instance of the `DriveInfo` class.

Parameters:

- `driveName`: A valid drive letter or fully qualified path.

Exceptions:

- `ArgumentNullException`: The drive letter cannot be `null`.
- `ArgumentException`: `driveName` does not refer to a valid drive.

#### Remarks
You can't use this constructor to obtain information on drive names that are `null` or use UNC (`\\server\share`) paths.

On Windows, passing a mounted directory (for example, C:\\NetworkMountedDrive) obtains information for the root drive (for example, C:).

## DriveInfo.AvailableFreeSpace property

```csharp
public long AvailableFreeSpace { get; }
```

Indicates the amount of available free space on a drive, in bytes.

Returns: The amount of free space available on the drive, in bytes.

Exceptions:

- `UnauthorizedAccessException`: Access to the drive information is denied.
- `IOException`: An I/O error occurred (for example, a disk error or a drive was not ready).

#### Remarks
This property indicates the amount of free space available on the drive. Note that this number may be different from the `DriveInfo.TotalFreeSpace` number because this property takes into account disk quotas.

#### Examples
The following code example demonstrates the use of the `DriveInfo` class to display information about all of the drives on the current system.

_Code sample not included: ~/snippets/csharp/System.IO/DriveInfo/Overview/DriveInfo.cs._

## DriveInfo.DriveFormat property

```csharp
public string DriveFormat { get; }
```

Gets the name of the file system, such as NTFS or FAT32.

Returns: The name of the file system on the specified drive.

Exceptions:

- `UnauthorizedAccessException`: Access to the drive information is denied.
- `DriveNotFoundException`: The drive does not exist or is not mapped.
- `IOException`: An I/O error occurred (for example, a disk error or a drive was not ready).

#### Remarks
Use `DriveInfo.DriveFormat` to determine what formatting a drive uses.

#### Examples
The following code example demonstrates the use of the `DriveInfo` class to display information about all of the drives on the current system.

_Code sample not included: ~/snippets/csharp/System.IO/DriveInfo/Overview/DriveInfo.cs._

## DriveInfo.DriveType property

```csharp
public System.IO.DriveType DriveType { get; }
```

Gets the drive type, such as CD-ROM, removable, network, or fixed.

Returns: One of the enumeration values that specifies a drive type.

#### Remarks
The `DriveType` property indicates whether a drive is one of the following: `CDRom`, `Fixed`, `Network`, `NoRootDirectory`, `Ram`, `Removable`, or `Unknown`. These values are described in the `DriveType` enumeration.

#### Examples
The following code example demonstrates the use of the `DriveInfo` class to display information about all the drives on the current system.

_Code sample not included: ~/snippets/csharp/System.IO/DriveInfo/Overview/DriveInfo.cs._

## DriveInfo.IsReady property

```csharp
public bool IsReady { get; }
```

Gets a value that indicates whether a drive is ready.

Returns: `true` if the drive is ready; `false` if the drive is not ready.

#### Remarks
`DriveInfo.IsReady` indicates whether a drive is ready. For example, it indicates whether a CD is in a CD drive or whether a removable storage device is ready for read/write operations. If you do not test whether a drive is ready, and it is not ready,  querying the drive using `DriveInfo` will raise an `IOException`.

Do not rely on `DriveInfo.IsReady` to avoid catching exceptions from other members such as `DriveInfo.TotalSize`, `DriveInfo.TotalFreeSpace`, and `DriveInfo.DriveFormat`. Between the time that your code checks `DriveInfo.IsReady` and then accesses one of the other properties (even if the access occurs immediately after the check), a drive may have been disconnected or a disk may have been removed.

#### Examples
The following code example demonstrates the use of the `DriveInfo` class to display information about all of the drives on the current system.

_Code sample not included: ~/snippets/csharp/System.IO/DriveInfo/Overview/DriveInfo.cs._

## DriveInfo.Name property

```csharp
public string Name { get; }
```

Gets the name of a drive, such as C:\\.

Returns: The name of the drive.

#### Remarks
This property is the name assigned to the drive, such as C:\ or E:\\.

#### Examples
The following code example demonstrates the use of the `DriveInfo` class to display information about all of the drives on the current system.

_Code sample not included: ~/snippets/csharp/System.IO/DriveInfo/Overview/DriveInfo.cs._

## DriveInfo.RootDirectory property

```csharp
public System.IO.DirectoryInfo RootDirectory { get; }
```

Gets the root directory of a drive.

Returns: An object that contains the root directory of the drive.

To be added.

## DriveInfo.TotalFreeSpace property

```csharp
public long TotalFreeSpace { get; }
```

Gets the total amount of free space available on a drive, in bytes.

Returns: The total free space available on a drive, in bytes.

Exceptions:

- `UnauthorizedAccessException`: Access to the drive information is denied.
- `DriveNotFoundException`: The drive is not mapped or does not exist.
- `IOException`: An I/O error occurred (for example, a disk error or a drive was not ready).

#### Remarks
This property indicates the total amount of free space available on the drive, not just what is available to the current user.

#### Examples
The following code example demonstrates the use of the `DriveInfo` class to display information about all of the drives on the current system.

_Code sample not included: ~/snippets/csharp/System.IO/DriveInfo/Overview/DriveInfo.cs._

## DriveInfo.TotalSize property

```csharp
public long TotalSize { get; }
```

Gets the total size of storage space on a drive, in bytes.

Returns: The total size of the drive, in bytes.

Exceptions:

- `UnauthorizedAccessException`: Access to the drive information is denied.
- `DriveNotFoundException`: The drive is not mapped or does not exist.
- `IOException`: An I/O error occurred (for example, a disk error or a drive was not ready).

#### Remarks
This property indicates the total size of the drive in bytes, not just what is available to the current user.

#### Examples
The following code example demonstrates the use of the `DriveInfo` class to display information about all of the drives on the current system.

_Code sample not included: ~/snippets/csharp/System.IO/DriveInfo/Overview/DriveInfo.cs._

## DriveInfo.VolumeLabel property

```csharp
public string VolumeLabel { get; set; }
```

Gets or sets the volume label of a drive.

Returns: The volume label.

Exceptions:

- `IOException`: An I/O error occurred (for example, a disk error or a drive was not ready).
- `DriveNotFoundException`: The drive is not mapped or does not exist.
- `SecurityException`: The caller does not have the required permission.
- `UnauthorizedAccessException`: The volume label is being set on a network or CD-ROM drive.

-or-

Access to the drive information is denied.

#### Remarks
The label length is determined by the operating system. For example, NTFS allows a volume label to be up to 32 characters long. Note that `null` is a valid `DriveInfo.VolumeLabel`.

#### Examples
The following example demonstrates the use of the `DriveInfo` class to display information about all the drives on the current system.

_Code sample not included: ~/snippets/csharp/System.IO/DriveInfo/Overview/DriveInfo.cs._

## DriveInfo.GetDrives() method

```csharp
public static System.IO.DriveInfo[] GetDrives ();
```

Retrieves the drive names of all logical drives on a computer.

Returns: An array of type `DriveInfo` that represents the logical drives on a computer.

Exceptions:

- `IOException`: An I/O error occurred (for example, a disk error or a drive was not ready).
- `UnauthorizedAccessException`: The caller does not have the required permission.

#### Remarks
This method retrieves all logical drive names on a computer. You can use this information to iterate through the array and obtain information on the drives using other `DriveInfo` methods and properties. Use the `IsReady` property to test whether a drive is ready because using this method on a drive that is not ready will throw a `IOException`.

#### Examples
The following code example demonstrates the use of the `DriveInfo` class to display information about all of the drives on the current system.

_Code sample not included: ~/snippets/csharp/System.IO/DriveInfo/Overview/DriveInfo.cs._

## DriveInfo.System.Runtime.Serialization.ISerializable.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
void ISerializable.GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Populates a `SerializationInfo` object with the data needed to serialize the target object.

Parameters:

- `info`: The object to populate with data.
- `context`: The destination (see `StreamingContext`) for this serialization.

#### Remarks
Any objects included in the `SerializationInfo` object are automatically tracked and serialized by the formatter.

This member is an explicit interface member implementation. It can be used only when the `DriveInfo` instance is cast to an `ISerializable` interface.

## DriveInfo.ToString() method

```csharp
public override string ToString ();
```

Returns a drive name as a string.

Returns: The name of the drive.

#### Remarks
This method returns the `Name` property.
