---
title: "File class (part 4 of 12)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/File.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# File class (part 4 of 12)

## File.Decrypt(String) method

```csharp
public static void Decrypt (string path);
```

Decrypts a file that was encrypted by the current account using the `File.Encrypt` method.

Parameters:

- `path`: A path that describes a file to decrypt.

Exceptions:

- `ArgumentNullException`: The `path` parameter is `null`.
- `DriveNotFoundException`: An invalid drive was specified.
- `FileNotFoundException`: The file described by the `path` parameter could not be found.
- `IOException`: An I/O error occurred while opening the file. For example, the encrypted file is already open.

-or-

This operation is not supported on the current platform.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `PlatformNotSupportedException`: The current operating system is not Windows NT or later.
- `NotSupportedException`: The file system is not NTFS.
- `UnauthorizedAccessException`: The `path` parameter specified a file that is read-only.

-or-

This operation is not supported on the current platform.

-or-

The `path` parameter specified a directory.

-or-

The caller does not have the required permission.

#### Remarks
The `File.Decrypt` method allows you to decrypt a file that was encrypted using the `File.Encrypt` method. The `File.Decrypt` method can decrypt only files that were encrypted using the current user account.

> **Important:**
> This API is only supported on Windows platforms that are able to use the NTFS Encrypting File System (EFS). Any attempt to use this on non-Windows systems, Windows Home Edition systems, or non-NTFS drives results in a `PlatformNotSupportedException` or `NotSupportedException`, depending on the situation.
>
> Use of this API is not recommended; it is included to enable portability for applications that migrate from .NET Framework but still explicitly target Windows.

The `File.Decrypt` method requires exclusive access to the file being decrypted, and will raise an exception if another process is using the file.

Both the `File.Encrypt` method and the `File.Decrypt` method use the cryptographic service provider (CSP) installed on the computer and the file encryption keys of the process calling the method.

The current file system must be formatted as NTFS and the current operating system must be Windows NT or later.

## File.Delete(String) method

```csharp
public static void Delete (string path);
```

Deletes the specified file.

Parameters:

- `path`: The name of the file to be deleted. Wildcard characters are not supported.

Exceptions:

- `ArgumentNullException`: `path` is `null`.
- `DirectoryNotFoundException`: The specified path is invalid (for example, it is on an unmapped drive).
- `IOException`: The specified file is in use.
- `NotSupportedException`: `path` is in an invalid format.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `UnauthorizedAccessException`: The caller does not have the required permission.

-or-

The file is an executable file that is in use.

-or-

`path` is a directory.

-or-

`path` specified a read-only file.

#### Remarks
Specify a file name with any relative or absolute path information for the `path` parameter. Wildcard characters cannot be included. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

If the file to be deleted does not exist, no exception is thrown.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example copies groups of files to the C:\archives\2008 backup folder and then deletes them from the source folder.

_Code sample not included: ~/snippets/csharp/System.IO/File/Copy/program.cs._

## File.Encrypt(String) method

```csharp
public static void Encrypt (string path);
```

Encrypts a file so that only the account used to encrypt the file can decrypt it.

Parameters:

- `path`: A path that describes a file to encrypt.

Exceptions:

- `ArgumentNullException`: The `path` parameter is `null`.
- `DriveNotFoundException`: An invalid drive was specified.
- `FileNotFoundException`: The file described by the `path` parameter could not be found.
- `IOException`: An I/O error occurred while opening the file.

-or-

This operation is not supported on the current platform.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `PlatformNotSupportedException`: The current operating system is not Windows NT or later.
- `NotSupportedException`: The file system is not NTFS.
- `UnauthorizedAccessException`: The `path` parameter specified a file that is read-only.

-or-

This operation is not supported on the current platform.

-or-

The `path` parameter specified a directory.

-or-

The caller does not have the required permission.

#### Remarks
The `File.Encrypt` method allows you to encrypt a file so that only the account used to call this method can decrypt it. Use the `File.Decrypt` method to decrypt a file encrypted by the `File.Encrypt` method.

> **Important:**
> This API is only supported on Windows platforms that are able to use the NTFS Encrypting File System (EFS). Any attempt to use this on non-Windows systems, Windows Home Edition systems, or non-NTFS drives results in a `PlatformNotSupportedException` or `NotSupportedException`, depending on the situation.
>
> Use of this API isn't recommended; it is included to enable portability for applications that move from .NET Framework but still explicitly target Windows.

The `File.Encrypt` method requires exclusive access to the file being encrypted, and will fail if another process is using the file.

Both the `File.Encrypt` method and the `File.Decrypt` method use the cryptographic service provider (CSP) installed on the computer and the file encryption keys of the process calling the method.

This method is not available on all versions of Windows. For example, it is not available on Home editions.

The current file system must be formatted as NTFS.

## File.Exists(String) method

```csharp
public static bool Exists (string? path);
```

Determines whether the specified file exists.

Parameters:

- `path`: The file to check.

Returns: `true` if the caller has the required permissions and `path` contains the name of an existing file; otherwise, `false`. This method also returns `false` if `path` is `null`, an invalid path, or a zero-length string. If the caller does not have sufficient permissions to read the specified file, no exception is thrown and the method returns `false` regardless of the existence of `path`.

#### Remarks

Don't use the `File.Exists` method for path validation; this method merely checks if the file specified in `path` exists. Passing an invalid path to `File.Exists` returns `false`. To check whether the path contains any invalid characters, you can call the `Path.GetInvalidPathChars` method to retrieve the characters that are invalid for the file system. You can also create a regular expression to test the whether the path is valid for your environment. For examples of acceptable paths, see `File`.

To check if a directory exists, see `Directory.Exists`.

Be aware that another process can potentially do something with the file in between the time you call the `File.Exists` method and perform another operation on the file, such as `File.Delete`.

The `path` parameter is permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

If `path` describes a directory, this method returns `false`. Trailing spaces are removed from the `path` parameter before determining if the file exists.

The `File.Exists` method returns `false` if any error occurs while trying to determine if the specified file exists. This can occur in situations that raise exceptions such as passing a file name with invalid characters or too many characters, a failing or missing disk, or if the caller does not have permission to read the file.

#### Examples
The following example determines if a file exists.

_Code sample not included: ~/snippets/csharp/System.IO/File/Exists/program.cs._

## File.GetAttributes(SafeFileHandle) method

```csharp
public static System.IO.FileAttributes GetAttributes (Microsoft.Win32.SafeHandles.SafeFileHandle fileHandle);
```

Gets the specified `FileAttributes` of the file or directory associated with `fileHandle`.

Parameters:

- `fileHandle`: A `SafeFileHandle` to the file or directory for which the attributes are to be retrieved.

Returns: The `FileAttributes` of the file or directory.

Exceptions:

- `ArgumentNullException`: `fileHandle` is `null`.
- `UnauthorizedAccessException`: The caller does not have the required permission.

To be added.

## File.GetAttributes(String) method

```csharp
public static System.IO.FileAttributes GetAttributes (string path);
```

Gets the `FileAttributes` of the file on the path.

Parameters:

- `path`: The path to the file.

Returns: The `FileAttributes` of the file on the path.

Exceptions:

- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `NotSupportedException`: `path` is in an invalid format.
- `FileNotFoundException`: `path` represents a file and is invalid, such as being on an unmapped drive, or the file cannot be found.
- `DirectoryNotFoundException`: `path` represents a directory and is invalid, such as being on an unmapped drive, or the directory cannot be found.
- `IOException`: This file is being used by another process.
- `UnauthorizedAccessException`: The caller does not have the required permission.

#### Remarks
The `path` parameter is permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example demonstrates the `GetAttributes` and `SetAttributes` methods by applying the `Archive` and `Hidden` attributes to a file.

_Code sample not included: ~/snippets/csharp/System.IO/File/GetAttributes/file getattributes.cs._

## File.GetCreationTime(SafeFileHandle) method

```csharp
public static DateTime GetCreationTime (Microsoft.Win32.SafeHandles.SafeFileHandle fileHandle);
```

Returns the creation time of the specified file or directory.

Parameters:

- `fileHandle`: A `SafeFileHandle` to the file or directory for which to obtain creation date and time information.

Returns: A `DateTime` structure set to the creation date and time for the specified file or directory. This value is expressed in local time.

Exceptions:

- `ArgumentNullException`: `fileHandle` is `null`.
- `UnauthorizedAccessException`: The caller does not have the required permission.

To be added.

## File.GetCreationTime(String) method

```csharp
public static DateTime GetCreationTime (string path);
```

Returns the creation date and time of the specified file or directory.

Parameters:

- `path`: The file or directory for which to obtain creation date and time information.

Returns: A `DateTime` structure set to the creation date and time for the specified file or directory. This value is expressed in local time.

Exceptions:

- `UnauthorizedAccessException`: The caller does not have the required permission.
- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `NotSupportedException`: `path` is in an invalid format.

#### Remarks

> **Note:**
>  This method may return an inaccurate value, because it uses native functions whose values may not be continuously updated by the operating system.

The `path` parameter is permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

If the file described in the `path` parameter does not exist, this method returns 12:00 midnight, January 1, 1601 A.D. (C.E.) Coordinated Universal Time (UTC), adjusted to local time.

NTFS-formatted drives may cache information about a file, such as file creation time, for a short period of time. As a result, it may be necessary to explicitly set the creation time of a file if you are overwriting or replacing an existing file.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example demonstrates `GetCreationTime`.

## File.GetCreationTimeUtc(SafeFileHandle) method

```csharp
public static DateTime GetCreationTimeUtc (Microsoft.Win32.SafeHandles.SafeFileHandle fileHandle);
```

Returns the creation date and time, in Coordinated Universal Time (UTC), of the specified file or directory.

Parameters:

- `fileHandle`: A `SafeFileHandle` to the file or directory for which to obtain creation date and time information.

Returns: A `DateTime` structure set to the creation date and time for the specified file or directory. This value is expressed in UTC time.

Exceptions:

- `ArgumentNullException`: `fileHandle` is `null`.
- `UnauthorizedAccessException`: The caller does not have the required permission.

To be added.

## File.GetCreationTimeUtc(String) method

```csharp
public static DateTime GetCreationTimeUtc (string path);
```

Returns the creation date and time, in Coordinated Universal Time (UTC), of the specified file or directory.

Parameters:

- `path`: The file or directory for which to obtain creation date and time information.

Returns: A `DateTime` structure set to the creation date and time for the specified file or directory. This value is expressed in UTC time.

Exceptions:

- `UnauthorizedAccessException`: The caller does not have the required permission.
- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `NotSupportedException`: `path` is in an invalid format.

#### Remarks

> **Note:**
>  This method may return an inaccurate value, because it uses native functions whose values may not be continuously updated by the operating system.

If the file described in the `path` parameter does not exist, this method returns 12:00 midnight, January 1, 1601 A.D. (C.E.) Coordinated Universal Time (UTC).

NTFS-formatted drives may cache information about a file, such as file creation time, for a short period of time. As a result, it may be necessary to explicitly set the creation time of a file if you are overwriting or replacing an existing file.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example demonstrates the `File.GetCreationTimeUtc` method.
