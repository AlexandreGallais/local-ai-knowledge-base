---
title: "FileInfo class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/FileInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FileInfo class (part 3 of 3)

## FileInfo.OpenText() method

```csharp
public System.IO.StreamReader OpenText ();
```

Creates a `StreamReader` with UTF8 encoding that reads from an existing text file.

Returns: A new `StreamReader` with UTF8 encoding.

Exceptions:

- `SecurityException`: The caller does not have the required permission.
- `FileNotFoundException`: The file is not found.
- `UnauthorizedAccessException`: `FileInfo.Name` is read-only or is a directory.
- `DirectoryNotFoundException`: The specified path is invalid, such as being on an unmapped drive.

#### Examples
The following example reads text from a file.

_Code sample not included: ~/snippets/csharp/System.IO/FileInfo/OpenText/file opentext.cs._

## FileInfo.OpenWrite() method

```csharp
public System.IO.FileStream OpenWrite ();
```

Creates a write-only `FileStream`.

Returns: A write-only unshared `FileStream` object for a new or existing file.

Exceptions:

- `UnauthorizedAccessException`: The path specified when creating an instance of the `FileInfo` object is read-only or is a directory.
- `DirectoryNotFoundException`: The path specified when creating an instance of the `FileInfo` object is invalid, such as being on an unmapped drive.

#### Remarks
The `FileInfo.OpenWrite` method opens a file if one already exists for the file path, or creates a new file if one does not exist. For an existing file, it does not append the new text to the existing text. Instead, it overwrites the existing characters with the new characters. If you overwrite a longer string (such as "This is a test of the OpenWrite method") with a shorter string (like "Second run"), the file will contain a mix of the strings ("Second run test of the OpenWrite method.").

#### Examples
The following example opens a file for writing and then reads from the file.

_Code sample not included: ~/snippets/csharp/System.IO/FileInfo/OpenWrite/file openwrite.cs._

## FileInfo.Replace(String, String) method

```csharp
public System.IO.FileInfo Replace (string destinationFileName, string? destinationBackupFileName);
```

Replaces the contents of a specified file with the file described by the current `FileInfo` object, deleting the original file and creating a backup of the replaced file.

Parameters:

- `destinationFileName`: The name of a file to replace with the current file.
- `destinationBackupFileName`: The name of a file with which to create a backup of the file described by the `destinationFileName` parameter.

Returns: A `FileInfo` object that encapsulates information about the file described by the `destinationFileName` parameter.

Exceptions:

- `ArgumentException`: The path described by the `destinationFileName` parameter was not of a legal form.

-or-

The path described by the `destinationBackupFileName` parameter was not of a legal form.
- `ArgumentNullException`: The `destinationFileName` parameter is `null`.
- `FileNotFoundException`: The file described by the current `FileInfo` object could not be found.

-or-

The file described by the `destinationFileName` parameter could not be found.
- `PlatformNotSupportedException`: The current operating system is not Microsoft Windows NT or later.

#### Remarks
The `FileInfo.Replace` method replaces the contents of a specified file with the contents of the file described by the current `FileInfo` object. It also creates a backup of the file that was replaced. Finally, it returns a new `FileInfo` object that describes the overwritten file.

Pass `null` to the `destinationBackupFileName` parameter if you do not want to create a backup of the file being replaced.

#### Examples
The following example uses the `File.Replace` method to replace a file with another file and create a backup of the replaced file.

_Code sample not included: ~/snippets/csharp/System.IO/FileInfo/Replace/sample.cs._

## FileInfo.Replace(String, String, Boolean) method

```csharp
public System.IO.FileInfo Replace (string destinationFileName, string? destinationBackupFileName, bool ignoreMetadataErrors);
```

Replaces the contents of a specified file with the file described by the current `FileInfo` object, deleting the original file, and creating a backup of the replaced file. Also specifies whether to ignore merge errors.

Parameters:

- `destinationFileName`: The name of a file to replace with the current file.
- `destinationBackupFileName`: The name of a file with which to create a backup of the file described by the `destinationFileName` parameter.
- `ignoreMetadataErrors`: `true` to ignore merge errors (such as attributes and ACLs) from the replaced file to the replacement file; otherwise `false`.

Returns: A `FileInfo` object that encapsulates information about the file described by the `destinationFileName` parameter.

Exceptions:

- `ArgumentException`: The path described by the `destinationFileName` parameter was not of a legal form.

-or-

The path described by the `destinationBackupFileName` parameter was not of a legal form.
- `ArgumentNullException`: The `destinationFileName` parameter is `null`.
- `FileNotFoundException`: The file described by the current `FileInfo` object could not be found.

-or-

The file described by the `destinationFileName` parameter could not be found.
- `PlatformNotSupportedException`: The current operating system is not Microsoft Windows NT or later.

#### Remarks
The `FileInfo.Replace` method replaces the contents of a specified file with the contents of the file described by the current `FileInfo` object. It also creates a backup of the file that was replaced. Finally, it returns a new `FileInfo` object that describes the overwritten file.

Pass `null` to the `destinationBackupFileName` parameter if you do not want to create a backup of the file being replaced.

#### Examples
The following example uses the `File.Replace` method to replace a file with another file and create a backup of the replaced file.

_Code sample not included: ~/snippets/csharp/System.IO/FileInfo/Replace/sample.cs._
