---
title: "FileInfo class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/FileInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FileInfo class (part 2 of 3)

## FileInfo.CopyTo(String, Boolean) method

```csharp
public System.IO.FileInfo CopyTo (string destFileName, bool overwrite);
```

Copies an existing file to a new file, allowing the overwriting of an existing file.

Parameters:

- `destFileName`: The name of the new file to copy to.
- `overwrite`: `true` to allow an existing file to be overwritten; otherwise, `false`.

Returns: A new file, or an overwrite of an existing file if `overwrite` is `true`. If the file exists and `overwrite` is `false`, an `IOException` is thrown.

Exceptions:

- `IOException`: An error occurs, or the destination file already exists and `overwrite` is `false`.
- `SecurityException`: The caller does not have the required permission.
- `ArgumentNullException`: `destFileName` is `null`.
- `DirectoryNotFoundException`: The directory specified in `destFileName` does not exist.
- `UnauthorizedAccessException`: A directory path is passed in, or the file is being moved to a different drive.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `NotSupportedException`: `destFileName` contains a colon (:) in the middle of the string.

#### Remarks
Use this method to allow or prevent overwriting of an existing file. Use the `CopyTo` method to prevent overwriting of an existing file by default.

> **Caution:**
>  Whenever possible, avoid using short file names (such as XXXXXX~1.XXX) with this method. If two files have equivalent short file names then this method may fail and raise an exception and/or result in undesirable behavior

#### Examples
The following example demonstrates both overloads of the `CopyTo` method.

_Code sample not included: ~/snippets/csharp/System.IO/FileInfo/CopyTo/program.cs._

The following example demonstrates copying one file to another file, specifying whether to overwrite a file that already exists.

_Code sample not included: ~/snippets/csharp/System.IO/FileInfo/CopyTo/fileinfocopyto.cs._

## FileInfo.Create() method

```csharp
public System.IO.FileStream Create ();
```

Creates a file.

Returns: A new file.

#### Remarks
By default, full read/write access to new files is granted to all users.

This method is a wrapper for the functionality provided by `File.Create`.

#### Examples
The following example creates a reference to a file, and then creates the file on disk using `FileInfo.Create()`.

_Code sample not included: ~/snippets/csharp/System.IO/FileInfo/Create/fileinfodelete.cs._

The following example creates a file, adds some text to it, and reads from the file.

_Code sample not included: ~/snippets/csharp/System.IO/FileInfo/Create/finfo create.cs._

## FileInfo.CreateAsHardLink(String) method

```csharp
public void CreateAsHardLink (string pathToTarget);
```

To be added.

Parameters:

- `pathToTarget`: To be added.

To be added.

## FileInfo.CreateText() method

```csharp
public System.IO.StreamWriter CreateText ();
```

Creates a `StreamWriter` that writes a new text file.

Returns: A new `StreamWriter`.

Exceptions:

- `UnauthorizedAccessException`: The file name is a directory.
- `IOException`: The disk is read-only.
- `SecurityException`: The caller does not have the required permission.

#### Remarks
By default, full read/write access to new files is granted to all users.

#### Examples
The following example demonstrates the `CreateText` method.

_Code sample not included: ~/snippets/csharp/System.IO/FileInfo/CreateText/finfo createtext.cs._

## FileInfo.Decrypt() method

```csharp
public void Decrypt ();
```

Decrypts a file that was encrypted by the current account using the `FileInfo.Encrypt` method.

Exceptions:

- `DriveNotFoundException`: An invalid drive was specified.
- `FileNotFoundException`: The file described by the current `FileInfo` object could not be found.
- `IOException`: An I/O error occurred while opening the file.
- `NotSupportedException`: The file system is not NTFS.
- `PlatformNotSupportedException`: The current operating system is not Microsoft Windows NT or later.
- `UnauthorizedAccessException`: The file described by the current `FileInfo` object is read-only.

-or-

This operation is not supported on the current platform.

-or-

The caller does not have the required permission.

#### Remarks
The `FileInfo.Decrypt` method allows you to decrypt a file that was encrypted using the `FileInfo.Encrypt` method. The `FileInfo.Decrypt` method can decrypt only files that were encrypted using the current user account.

Both the `FileInfo.Encrypt` method and the `FileInfo.Decrypt` method use the cryptographic service provider (CSP) installed on the computer and the file encryption keys of the process calling the method.

The current file system must be formatted as NTFS and the current operating system must be Microsoft Windows NT or later.

#### Examples
The following code example uses the `FileInfo.Encrypt` method and the `FileInfo.Decrypt` method to encrypt and then decrypt a file.

_Code sample not included: ~/snippets/csharp/System.IO/FileInfo/Decrypt/sample.cs._

## FileInfo.Delete() method

```csharp
public override void Delete ();
```

Permanently deletes a file.

Exceptions:

- `SecurityException`: The caller does not have the required permission.
- `UnauthorizedAccessException`: The path is a directory.

#### Remarks
If the file does not exist, this method does nothing.

#### Examples
The following example demonstrates the `Delete` method.

_Code sample not included: ~/snippets/csharp/System.IO/FileInfo/Delete/finfo delete.cs._

The following example creates, closes, and deletes a file.

_Code sample not included: ~/snippets/csharp/System.IO/FileInfo/Create/fileinfodelete.cs._

## FileInfo.Encrypt() method

```csharp
public void Encrypt ();
```

Encrypts a file so that only the account used to encrypt the file can decrypt it.

Exceptions:

- `DriveNotFoundException`: An invalid drive was specified.
- `FileNotFoundException`: The file described by the current `FileInfo` object could not be found.
- `IOException`: An I/O error occurred while opening the file.
- `NotSupportedException`: The file system is not NTFS.
- `PlatformNotSupportedException`: The current operating system is not Microsoft Windows NT or later.
- `UnauthorizedAccessException`: The file described by the current `FileInfo` object is read-only.

-or-

This operation is not supported on the current platform.

-or-

The caller does not have the required permission.

#### Remarks
The `FileInfo.Encrypt` method allows you to encrypt a file so that only the account used to call this method can decrypt it. Use the `FileInfo.Decrypt` method to decrypt a file encrypted by the `FileInfo.Encrypt` method.

Both the `FileInfo.Encrypt` method and the `FileInfo.Decrypt` method use the cryptographic service provider (CSP) installed on the computer and the file encryption keys of the process calling the method.

The current file system must be formatted as NTFS and the current operating system must be Microsoft Windows NT or later.

#### Examples
The following code example uses the `FileInfo.Encrypt` method and the `FileInfo.Decrypt` method to encrypt a file and then decrypt it.

_Code sample not included: ~/snippets/csharp/System.IO/FileInfo/Decrypt/sample.cs._

## FileInfo.MoveTo(String) method

```csharp
public void MoveTo (string destFileName);
```

Moves a specified file to a new location, providing the option to specify a new file name.

Parameters:

- `destFileName`: The path to move the file to, which can specify a different file name.

Exceptions:

- `IOException`: An I/O error occurs, such as the destination file already exists or the destination device is not ready.
- `ArgumentNullException`: `destFileName` is `null`.
- `SecurityException`: The caller does not have the required permission.
- `UnauthorizedAccessException`: `destFileName` is read-only or is a directory.
- `FileNotFoundException`: The file is not found.
- `DirectoryNotFoundException`: The specified path is invalid, such as being on an unmapped drive.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `NotSupportedException`: `destFileName` contains a colon (:) in the middle of the string.

#### Remarks

This method works across disk volumes. For example, the file c:\MyFile.txt can be moved to d:\public and renamed NewFile.txt.

This method does not overwrite the destination file if it already exists. For that purpose, call `MoveTo` instead.

#### Examples

The following example demonstrates moving a file to a different location and renaming the file.

_Code sample not included: ~/snippets/csharp/System.IO/FileInfo/MoveTo/Program.cs._

## FileInfo.MoveTo(String, Boolean) method

```csharp
public void MoveTo (string destFileName, bool overwrite);
```

Moves a specified file to a new location, providing the options to specify a new file name and to overwrite the destination file if it already exists.

Parameters:

- `destFileName`: The path to move the file to, which can specify a different file name.
- `overwrite`: `true` to overwrite the destination file if it already exists; `false` otherwise.

Exceptions:

- `IOException`: An I/O error occurred, such as the destination device is not ready.
- `ArgumentNullException`: `destFileName` is `null`.
- `SecurityException`: The caller does not have the required permission.
- `UnauthorizedAccessException`: `destFileName` is read-only or is a directory.
- `FileNotFoundException`: The file is not found.
- `DirectoryNotFoundException`: The specified path is invalid, such as being on an unmapped drive.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `NotSupportedException`: `destFileName` contains a colon (:) in the middle of the string.

#### Remarks

This method works across disk volumes. For example, the file c:\MyFile.txt can be moved to d:\public and renamed NewFile.txt.

#### Examples

The following example demonstrates moving a file to a different location and renaming the file.

_Code sample not included: ~/snippets/csharp/System.IO/FileInfo/MoveTo/Program.cs._

## FileInfo.Open(FileMode) method

```csharp
public System.IO.FileStream Open (System.IO.FileMode mode);
```

Opens a file in the specified mode.

Parameters:

- `mode`: A `FileMode` constant specifying the mode (for example, `Open` or `Append`) in which to open the file.

Returns: A file opened in the specified mode, with read/write access and unshared.

Exceptions:

- `FileNotFoundException`: The file is not found.
- `UnauthorizedAccessException`: The file is read-only or is a directory.
- `DirectoryNotFoundException`: The specified path is invalid, such as being on an unmapped drive.
- `IOException`: The file is already open.

#### Examples
The following example opens a file, adds some information to the file, and reads the file.

_Code sample not included: ~/snippets/csharp/System.IO/FileInfo/Open/finfo open1.cs._

## FileInfo.Open(FileStreamOptions) method

```csharp
public System.IO.FileStream Open (System.IO.FileStreamOptions options);
```

Initializes a new instance of the `FileStream` class with the specified creation mode, read/write and sharing permission, the access other FileStreams can have to the same file, the buffer size, additional file options and the allocation size.

Parameters:

- `options`: An object that describes optional `FileStream` parameters to use.

Returns: A `FileStream` that wraps the opened file.

#### Remarks

`%23ctor` for information about exceptions.

## FileInfo.Open(FileMode, FileAccess) method

```csharp
public System.IO.FileStream Open (System.IO.FileMode mode, System.IO.FileAccess access);
```

Opens a file in the specified mode with read, write, or read/write access.

Parameters:

- `mode`: A `FileMode` constant specifying the mode (for example, `Open` or `Append`) in which to open the file.
- `access`: A `FileAccess` constant specifying whether to open the file with `Read`, `Write`, or `ReadWrite` file access.

Returns: A `FileStream` object opened in the specified mode and access, and unshared.

Exceptions:

- `SecurityException`: The caller does not have the required permission.
- `FileNotFoundException`: The file is not found.
- `UnauthorizedAccessException`: `FileInfo.Name` is read-only or is a directory.
- `DirectoryNotFoundException`: The specified path is invalid, such as being on an unmapped drive.
- `IOException`: The file is already open.
- `ArgumentException`: `FileInfo.Name` is empty or contains only white spaces.
- `ArgumentNullException`: One or more arguments is null.

#### Examples
The following example opens a file as read-only and reads from the file.

_Code sample not included: ~/snippets/csharp/System.IO/FileInfo/Open/finfo open2.cs._

## FileInfo.Open(FileMode, FileAccess, FileShare) method

```csharp
public System.IO.FileStream Open (System.IO.FileMode mode, System.IO.FileAccess access, System.IO.FileShare share);
```

Opens a file in the specified mode with read, write, or read/write access and the specified sharing option.

Parameters:

- `mode`: A `FileMode` constant specifying the mode (for example, `Open` or `Append`) in which to open the file.
- `access`: A `FileAccess` constant specifying whether to open the file with `Read`, `Write`, or `ReadWrite` file access.
- `share`: A `FileShare` constant specifying the type of access other `FileStream` objects have to this file.

Returns: A `FileStream` object opened with the specified mode, access, and sharing options.

Exceptions:

- `SecurityException`: The caller does not have the required permission.
- `FileNotFoundException`: The file is not found.
- `UnauthorizedAccessException`: `FileInfo.Name` is read-only or is a directory.
- `DirectoryNotFoundException`: The specified path is invalid, such as being on an unmapped drive.
- `IOException`: The file is already open.
- `ArgumentException`: `FileInfo.Name` is empty or contains only white spaces.
- `ArgumentNullException`: One or more arguments is null.

#### Examples
The following example demonstrates opening a file for reading and writing, but disallowing access to other users or processes.

_Code sample not included: ~/snippets/csharp/System.IO/FileInfo/Open/fileinfoopen.cs._

## FileInfo.OpenRead() method

```csharp
public System.IO.FileStream OpenRead ();
```

Creates a read-only `FileStream`.

Returns: A new read-only `FileStream` object.

Exceptions:

- `UnauthorizedAccessException`: `FileInfo.Name` is read-only or is a directory.
- `DirectoryNotFoundException`: The specified path is invalid, such as being on an unmapped drive.
- `IOException`: The file is already open.

#### Remarks
This method returns a read-only `FileStream` object with the `FileShare` mode set to `Read`.

#### Examples
The following example opens a file as read-only and reads from it.

_Code sample not included: ~/snippets/csharp/System.IO/FileInfo/OpenRead/finfo openread.cs._
