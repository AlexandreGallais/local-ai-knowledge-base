---
title: "File class (part 9 of 12)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/File.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# File class (part 9 of 12)

## File.Replace(String, String, String) method

```csharp
public static void Replace (string sourceFileName, string destinationFileName, string? destinationBackupFileName);
```

Replaces the contents of a specified file with the contents of another file, deleting the original file and creating a backup of the replaced file.

Parameters:

- `sourceFileName`: The name of a file that replaces the file specified by `destinationFileName`.
- `destinationFileName`: The name of the file being replaced.
- `destinationBackupFileName`: The name of the backup file.

Exceptions:

- `ArgumentException`: The path described by the `destinationFileName` or `destinationBackupFileName` parameter is not of a legal form.
- `ArgumentNullException`: The `destinationFileName` parameter is `null`.
- `DriveNotFoundException`: An invalid drive was specified.
- `FileNotFoundException`: The file described by `sourceFileName` or `destinationFileName` parameter could not be found.
- `IOException`: An I/O error occurred while opening the file.

-or-

The `sourceFileName` and `destinationFileName` parameters specify the same file.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `UnauthorizedAccessException`: The `sourceFileName` or `destinationFileName` parameter specifies a file that is read-only.

-or-

This operation is not supported on the current platform.

-or-

Source or destination parameters specify a directory instead of a file.

-or-

The caller does not have the required permission.

-or

`sourceFileName` and `destinationFileName` specify the same existing directory.

#### Remarks
The `File.Replace` method replaces the contents of a specified file with the contents of another file. It also creates a backup of the file that was replaced.

If the `sourceFileName` and `destinationFileName` are on different volumes, this method raises an exception. If the `destinationBackupFileName` is on a different volume from the source file, the backup file will be deleted.

Pass `null` to the `destinationBackupFileName` parameter if you don't want to create a backup of the file being replaced.

If the `destinationBackupFileName` already exists, it's replaced with the contents of the `destinationFileName` file.

#### Examples
The following code example uses the `File.Replace` method to replace a file with another file and create a backup of the replaced file.

_Code sample not included: ~/snippets/csharp/System.IO/File/Replace/sample.cs._

## File.Replace(String, String, String, Boolean) method

```csharp
public static void Replace (string sourceFileName, string destinationFileName, string? destinationBackupFileName, bool ignoreMetadataErrors);
```

Replaces the contents of a specified file with the contents of another file, deleting the original file and creating a backup of the replaced file, and optionally ignores merge errors.

Parameters:

- `sourceFileName`: The name of a file that replaces the file specified by `destinationFileName`.
- `destinationFileName`: The name of the file being replaced.
- `destinationBackupFileName`: The name of the backup file.
- `ignoreMetadataErrors`: `true` to ignore merge errors (such as attributes and access control lists (ACLs)) from the replaced file to the replacement file; otherwise, `false`.

Exceptions:

- `ArgumentException`: The path described by the `destinationFileName` or `destinationBackupFileName` parameter is not of a legal form.
- `ArgumentNullException`: The `destinationFileName` parameter is `null`.
- `DriveNotFoundException`: An invalid drive was specified.
- `FileNotFoundException`: The file described by `sourceFileName` or `destinationFileName` parameter could not be found.
- `IOException`: An I/O error occurred while opening the file.

-or-

`sourceFileName` and `destinationFileName` specify the same file.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `UnauthorizedAccessException`: The `sourceFileName` or `destinationFileName` parameter specifies a file that is read-only.

-or-

This operation is not supported on the current platform.

-or-

Source or destination parameters specify a directory instead of a file.

-or-

The caller does not have the required permission.

-or

`sourceFileName` and `destinationFileName` specify the same existing directory.

#### Remarks
The `File.Replace` method replaces the contents of a specified file with the contents of another file. It also creates a backup of the file that was replaced.

If the `sourceFileName` and `destinationFileName` are on different volumes, this method raises an exception. If the `destinationBackupFileName` is on a different volume from the source file, the backup file will be deleted.

Pass `null` to the `destinationBackupFileName` parameter if you don't want to create a backup of the file being replaced.

If the `destinationBackupFileName` already exists, it's replaced with the contents of the `destinationFileName` file.

#### Examples
The following code example uses the `File.Replace` method to replace a file with another file and create a backup of the replaced file.

_Code sample not included: ~/snippets/csharp/System.IO/File/Replace/sample.cs._

## File.ResolveLinkTarget(String, Boolean) method

```csharp
public static System.IO.FileSystemInfo? ResolveLinkTarget (string linkPath, bool returnFinalTarget);
```

Gets the target of the specified file link.

Parameters:

- `linkPath`: The path of the file link.
- `returnFinalTarget`: `true` to follow links to the final target; `false` to return the immediate next link.

Returns: A `FileInfo` instance if `linkPath` exists, independently of whether the target exists or not. `null` if `linkPath` is not a link.

Exceptions:

- `IOException`: The file on `linkPath` does not exist.

-or-

There are too many levels of symbolic links.

#### Remarks

When `returnFinalTarget` is `true`, the maximum number of symbolic links that are followed is 40 on Unix and 63 on Windows.

Symbolic links and junctions are the types of links this API can resolve.

## File.SetAttributes(SafeFileHandle, FileAttributes) method

```csharp
public static void SetAttributes (Microsoft.Win32.SafeHandles.SafeFileHandle fileHandle, System.IO.FileAttributes fileAttributes);
```

Sets the specified `FileAttributes` of the file or directory associated with `fileHandle`.

Parameters:

- `fileHandle`: A `SafeFileHandle` to the file or directory for which `fileAttributes` should be set.
- `fileAttributes`: A bitwise combination of the enumeration values.

Exceptions:

- `ArgumentNullException`: `fileHandle` is `null`.
- `UnauthorizedAccessException`: The caller does not have the required permission.

#### Remarks

It is not possible to change the compression status of a `File` object
using the `SetAttributes` method.

## File.SetAttributes(String, FileAttributes) method

```csharp
public static void SetAttributes (string path, System.IO.FileAttributes fileAttributes);
```

Sets the specified `FileAttributes` of the file on the specified path.

Parameters:

- `path`: The path to the file.
- `fileAttributes`: A bitwise combination of the enumeration values.

Exceptions:

- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `NotSupportedException`: `path` is in an invalid format.
- `DirectoryNotFoundException`: The specified path is invalid, (for example, it is on an unmapped drive).
- `FileNotFoundException`: The file cannot be found.
- `UnauthorizedAccessException`: `path` specified a file that is read-only.

-or-

This operation is not supported on the current platform.

-or-

`path` specified a directory.

-or-

The caller does not have the required permission.

#### Remarks
The `path` parameter is permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

Certain file attributes, such as `Hidden` and `ReadOnly`, can be combined. Other attributes, such as `Normal`, must be used alone.

It is not possible to change the compression status of a `File` object using the `File.SetAttributes` method.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example demonstrates the `GetAttributes` and `SetAttributes` methods by applying the `Archive` and `Hidden` attributes to a file.

_Code sample not included: ~/snippets/csharp/System.IO/File/GetAttributes/file getattributes.cs._

## File.SetCreationTime(SafeFileHandle, DateTime) method

```csharp
public static void SetCreationTime (Microsoft.Win32.SafeHandles.SafeFileHandle fileHandle, DateTime creationTime);
```

Sets the date and time the file or directory was created.

Parameters:

- `fileHandle`: A `SafeFileHandle` to the file or directory for which to set the creation date and time information.
- `creationTime`: A `DateTime` containing the value to set for the creation date and time of `fileHandle`.
This value is expressed in local time.

Exceptions:

- `ArgumentNullException`: `fileHandle` is `null`.
- `ArgumentOutOfRangeException`: `creationTime` specifies a value outside the range of dates, times, or both permitted for this operation.
- `UnauthorizedAccessException`: The caller does not have the required permission.
- `IOException`: An I/O error occurred while performing the operation.

To be added.

## File.SetCreationTime(String, DateTime) method

```csharp
public static void SetCreationTime (string path, DateTime creationTime);
```

Sets the date and time the file was created.

Parameters:

- `path`: The file for which to set the creation date and time information.
- `creationTime`: A `DateTime` containing the value to set for the creation date and time of `path`. This value is expressed in local time.

Exceptions:

- `FileNotFoundException`: The specified path was not found.
- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `IOException`: An I/O error occurred while performing the operation.
- `ArgumentOutOfRangeException`: `creationTime` specifies a value outside the range of dates, times, or both permitted for this operation.
- `UnauthorizedAccessException`: The caller does not have the required permission.
- `NotSupportedException`: `path` is in an invalid format.

#### Remarks
The `path` parameter is permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

NTFS-formatted drives may cache file meta-info, such as file creation time, for a short period of time. As a result, it may be necessary to explicitly set the creation time of a file if you are overwriting or replacing an existing file.

For a list of common I/O tasks, see Common I/O Tasks.

## File.SetCreationTimeUtc(SafeFileHandle, DateTime) method

```csharp
public static void SetCreationTimeUtc (Microsoft.Win32.SafeHandles.SafeFileHandle fileHandle, DateTime creationTimeUtc);
```

Sets the date and time, in Coordinated Universal Time (UTC), that the file or directory was created.

Parameters:

- `fileHandle`: A `SafeFileHandle` to the file or directory for which to set the creation date and time information.
- `creationTimeUtc`: The value to set for the creation date and time of `fileHandle`. This value is expressed in UTC time.

Exceptions:

- `ArgumentNullException`: `fileHandle` is `null`.
- `ArgumentOutOfRangeException`: `creationTimeUtc` specifies a value outside the range of dates, times, or both permitted for this operation.
- `UnauthorizedAccessException`: The caller does not have the required permission.
- `IOException`: An I/O error occurred while performing the operation.

To be added.

## File.SetCreationTimeUtc(String, DateTime) method

```csharp
public static void SetCreationTimeUtc (string path, DateTime creationTimeUtc);
```

Sets the date and time, in Coordinated Universal Time (UTC), that the file was created.

Parameters:

- `path`: The file for which to set the creation date and time information.
- `creationTimeUtc`: The value to set for the creation date and time of `path`. This value is expressed in UTC time.

Exceptions:

- `FileNotFoundException`: The specified path was not found.
- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `IOException`: An I/O error occurred while performing the operation.
- `ArgumentOutOfRangeException`: `creationTimeUtc` specifies a value outside the range of dates, times, or both permitted for this operation.
- `UnauthorizedAccessException`: The caller does not have the required permission.
- `NotSupportedException`: `path` is in an invalid format.

#### Remarks
The `path` parameter is permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

NTFS-formatted drives may cache file meta-info, such as file creation time, for a short period of time. As a result, it may be necessary to explicitly set the creation time of a file if you are overwriting or replacing an existing file.

For a list of common I/O tasks, see Common I/O Tasks.

## File.SetLastAccessTime(SafeFileHandle, DateTime) method

```csharp
public static void SetLastAccessTime (Microsoft.Win32.SafeHandles.SafeFileHandle fileHandle, DateTime lastAccessTime);
```

Sets the date and time the specified file or directory was last accessed.

Parameters:

- `fileHandle`: A `SafeFileHandle` to the file or directory for which to set the last access date and time information.
- `lastAccessTime`: A `DateTime` containing the value to set for the last access date and time of `fileHandle`.
This value is expressed in local time.

Exceptions:

- `ArgumentNullException`: `fileHandle` is `null`.
- `ArgumentOutOfRangeException`: `lastAccessTime` specifies a value outside the range of dates, times, or both permitted for this operation.
- `UnauthorizedAccessException`: The caller does not have the required permission.
- `IOException`: An I/O error occurred while performing the operation.

To be added.
