---
title: "FileSystemAclExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/FileSystemAclExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FileSystemAclExtensions class

Namespace: `System.IO`

```csharp
public static class FileSystemAclExtensions
```

Provides Windows-specific static extension methods for manipulating Access Control List (ACL) security attributes for files and directories.

To be added.

## FileSystemAclExtensions.Create(DirectoryInfo, DirectorySecurity) method

```csharp
public static void Create (this System.IO.DirectoryInfo directoryInfo, System.Security.AccessControl.DirectorySecurity directorySecurity);
```

Creates a new directory, ensuring it is created with the specified directory security. If the directory already exists, nothing is done.

Parameters:

- `directoryInfo`: A directory that does not exist yet that will be created by the method.
- `directorySecurity`: The access control and audit security for the directory.

Exceptions:

- `ArgumentNullException`: `directoryInfo` or `directorySecurity` is `null`.
- `DirectoryNotFoundException`: Could not find a part of the path.
- `UnauthorizedAccessException`: Access to the path is denied.

#### Remarks

This extension method was added to .NET to provide the functionality of the DirectoryInfo.Create(DirectorySecurity) .NET Framework method.

#### Examples

The following code example creates a new directory inside the user's temporary folder with the specified directory security attributes:

_Code sample not included: ~/snippets/csharp/System.IO/FileSystemAclExtensions/Create/DirectoryInfoCreateDirectory.cs._
## FileSystemAclExtensions.Create(FileInfo, FileMode, FileSystemRights, FileShare, Int32, FileOptions, FileSecurity) method

```csharp
public static System.IO.FileStream Create (this System.IO.FileInfo fileInfo, System.IO.FileMode mode, System.Security.AccessControl.FileSystemRights rights, System.IO.FileShare share, int bufferSize, System.IO.FileOptions options, System.Security.AccessControl.FileSecurity? fileSecurity);
```

Creates a new file stream, ensuring it is created with the specified properties and security settings.

Parameters:

- `fileInfo`: A file that does not exist yet that will be created by the method.
- `mode`: One of the enumeration values that specifies how the operating system should open a file.
- `rights`: One of the enumeration values that defines the access rights to use when creating access and audit rules.
- `share`: One of the enumeration values for controlling the kind of access other file stream objects can have to the same file.
- `bufferSize`: The number of bytes buffered for reads and writes to the file.
- `options`: One of the enumeration values that describes how to create or overwrite the file.
- `fileSecurity`: An object that determines the access control and audit security for the file.

Returns: A file stream for the newly created file.

Exceptions:

- `ArgumentException`: The `rights` and `mode` combination is invalid.
- `ArgumentNullException`: `fileInfo` or `fileSecurity` is `null`.
- `ArgumentOutOfRangeException`: `mode` or `share` are out of their legal enum range.

-or-

`bufferSize` is not a positive number.
- `DirectoryNotFoundException`: Could not find a part of the path.
- `IOException`: An I/O error occurred.
- `UnauthorizedAccessException`: Access to the path is denied.

#### Remarks

This extension method was added to .NET to provide the functionality of the following .NET Framework members:

- The FileStream(String, FileMode, FileSystemRights, FileShare, Int32, FileOptions, FileSecurity) constructor.
- The File.Create(String, Int32, FileOptions, FileSecurity method.

#### Examples

The following code example creates a new text file inside the user's temporary folder, explicitly specifying all security attributes:

_Code sample not included: ~/snippets/csharp/System.IO/FileSystemAclExtensions/Create/FileInfoCreate.cs._
## FileSystemAclExtensions.CreateDirectory(DirectorySecurity, String) method

```csharp
public static System.IO.DirectoryInfo CreateDirectory (this System.Security.AccessControl.DirectorySecurity directorySecurity, string path);
```

Creates a directory and returns it, ensuring it is created with the specified directory security. If the directory already exists, the existing directory is returned.

Parameters:

- `directorySecurity`: An object that determines the access control and audit security for the directory.
- `path`: The path of the directory to create.

Returns: A directory information object representing either a created directory with the provided security properties, or the existing directory.

Exceptions:

- `ArgumentNullException`: `directorySecurity` or `path` is `null`.
- `ArgumentException`: `path` is empty.
- `DirectoryNotFoundException`: Could not find a part of the path.
- `UnauthorizedAccessException`: Access to the path is denied.

#### Remarks

This extension method was added to .NET to provide the functionality of the `System.IO.Directory.CreateDirectory(System.String,System.Security.AccessControl.DirectorySecurity)` .NET Framework method.

## FileSystemAclExtensions.GetAccessControl(DirectoryInfo) method

```csharp
public static System.Security.AccessControl.DirectorySecurity GetAccessControl (this System.IO.DirectoryInfo directoryInfo);
```

Returns the security information of a directory.

Parameters:

- `directoryInfo`: The existing directory from which to obtain the security information.

Returns: The security descriptors of all the access control sections of the directory.

To be added.

## FileSystemAclExtensions.GetAccessControl(FileInfo) method

```csharp
public static System.Security.AccessControl.FileSecurity GetAccessControl (this System.IO.FileInfo fileInfo);
```

Returns the security information of a file.

Parameters:

- `fileInfo`: The file from which to obtain the security information.

Returns: The security descriptors of all the access control sections of the file.

To be added.

## FileSystemAclExtensions.GetAccessControl(FileStream) method

```csharp
public static System.Security.AccessControl.FileSecurity GetAccessControl (this System.IO.FileStream fileStream);
```

Returns the security information of a file.

Parameters:

- `fileStream`: An existing file from which to obtain the security information.

Returns: The security descriptors of all the access control sections of the file.

Exceptions:

- `ArgumentNullException`: `fileStream` is `null`.
- `ObjectDisposedException`: The file stream is closed.

To be added.

## FileSystemAclExtensions.GetAccessControl(DirectoryInfo, AccessControlSections) method

```csharp
public static System.Security.AccessControl.DirectorySecurity GetAccessControl (this System.IO.DirectoryInfo directoryInfo, System.Security.AccessControl.AccessControlSections includeSections);
```

Returns the security information of a directory.

Parameters:

- `directoryInfo`: An existing directory from which to obtain the security information.
- `includeSections`: The desired access control sections to retrieve.

Returns: The security descriptors of the specified access control sections of the directory.

To be added.

## FileSystemAclExtensions.GetAccessControl(FileInfo, AccessControlSections) method

```csharp
public static System.Security.AccessControl.FileSecurity GetAccessControl (this System.IO.FileInfo fileInfo, System.Security.AccessControl.AccessControlSections includeSections);
```

Returns the security information of a file.

Parameters:

- `fileInfo`: An existing file from which to obtain the security information.
- `includeSections`: The desired access control sections to retrieve from the file.

Returns: The security descriptors of the specified access control sections of the file.

To be added.

## FileSystemAclExtensions.SetAccessControl(DirectoryInfo, DirectorySecurity) method

```csharp
public static void SetAccessControl (this System.IO.DirectoryInfo directoryInfo, System.Security.AccessControl.DirectorySecurity directorySecurity);
```

Changes the security attributes of an existing directory.

Parameters:

- `directoryInfo`: An existing directory.
- `directorySecurity`: The security information to apply to the directory.

Exceptions:

- `ArgumentNullException`: `directorySecurity` is `null`.

To be added.

## FileSystemAclExtensions.SetAccessControl(FileInfo, FileSecurity) method

```csharp
public static void SetAccessControl (this System.IO.FileInfo fileInfo, System.Security.AccessControl.FileSecurity fileSecurity);
```

Changes the security attributes of an existing file.

Parameters:

- `fileInfo`: An existing file.
- `fileSecurity`: The security information to apply to the file.

Exceptions:

- `ArgumentNullException`: `fileSecurity` is `null`.

To be added.

## FileSystemAclExtensions.SetAccessControl(FileStream, FileSecurity) method

```csharp
public static void SetAccessControl (this System.IO.FileStream fileStream, System.Security.AccessControl.FileSecurity fileSecurity);
```

Changes the security attributes of an existing file.

Parameters:

- `fileStream`: An existing file.
- `fileSecurity`: The security information to apply to the file.

Exceptions:

- `ArgumentNullException`: `fileStream` or `fileSecurity` is `null`.
- `ObjectDisposedException`: The file stream is closed.

To be added.
