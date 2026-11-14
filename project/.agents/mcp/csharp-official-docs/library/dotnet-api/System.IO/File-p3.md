---
title: "File class (part 3 of 12)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/File.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# File class (part 3 of 12)

## File.Copy(String, String) method

```csharp
public static void Copy (string sourceFileName, string destFileName);
```

Copies an existing file to a new file. Overwriting a file of the same name is not allowed.

Parameters:

- `sourceFileName`: The file to copy.
- `destFileName`: The name of the destination file. This cannot be a directory or an existing file.

Exceptions:

- `UnauthorizedAccessException`: The caller does not have the required permission.
- `ArgumentException`: `sourceFileName` or `destFileName` is a zero-length string, contains only white space, or contains one or more invalid characters. You can query for invalid characters by using the `Path.GetInvalidPathChars` method.

-or-

`sourceFileName` or `destFileName` specifies a directory.
- `ArgumentNullException`: `sourceFileName` or `destFileName` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `DirectoryNotFoundException`: The path specified in `sourceFileName` or `destFileName` is invalid (for example, it is on an unmapped drive).
- `FileNotFoundException`: `sourceFileName` was not found.
- `IOException`: `destFileName` exists.

-or-

An I/O error has occurred.
- `NotSupportedException`: `sourceFileName` or `destFileName` is in an invalid format.

#### Remarks
This method is equivalent to the `Copy` method overload with the `overwrite` parameter set to `false`.

The `sourceFileName` and `destFileName` parameters can specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see the `Directory.GetCurrentDirectory` method. This method does not support wildcard characters in the parameters.

The attributes of the original file are retained in the copied file.

#### Examples
The following example copies files to the C:\archives\2008 backup folder. It uses the two overloads of the `File.Copy` method as follows:

- It first uses the `Copy` method overload to copy text (.txt) files. The code demonstrates that this overload does not allow overwriting files that were already copied.

- It then uses the `Copy` method overload to copy pictures (.jpg files). The code demonstrates that this overload does allow overwriting files that were already copied.

_Code sample not included: ~/snippets/csharp/System.IO/File/Copy/program.cs._

## File.Copy(String, String, Boolean) method

```csharp
public static void Copy (string sourceFileName, string destFileName, bool overwrite);
```

Copies an existing file to a new file. Overwriting a file of the same name is allowed.

Parameters:

- `sourceFileName`: The file to copy.
- `destFileName`: The name of the destination file. This cannot be a directory.
- `overwrite`: `true` if the destination file should be replaced if it already exists; otherwise, `false`.

Exceptions:

- `UnauthorizedAccessException`: The caller does not have the required permission.

-or-

`destFileName` is read-only.

-or-

`overwrite` is `true`, `destFileName` exists and is hidden, but `sourceFileName` is not hidden.
- `ArgumentException`: `sourceFileName` or `destFileName` is a zero-length string, contains only white space, or contains one or more invalid characters. You can query for invalid characters by using the `Path.GetInvalidPathChars` method.

-or-

`sourceFileName` or `destFileName` specifies a directory.
- `ArgumentNullException`: `sourceFileName` or `destFileName` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `DirectoryNotFoundException`: The path specified in `sourceFileName` or `destFileName` is invalid (for example, it is on an unmapped drive).
- `FileNotFoundException`: `sourceFileName` was not found.
- `IOException`: `destFileName` exists and `overwrite` is `false`.

-or-

An I/O error has occurred.
- `NotSupportedException`: `sourceFileName` or `destFileName` is in an invalid format.

#### Remarks
The `sourceFileName` and `destFileName` parameters can specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. This method does not support wildcard characters in the parameters.

The attributes of the original file are retained in the copied file.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example copies files to the C:\archives\2008 backup folder. It uses the two overloads of the `File.Copy` method as follows:

- It first uses the `Copy` method overload to copy text (.txt) files. The code demonstrates that this overload does not allow overwriting files that were already copied.

It then uses the `Copy` method overload to copy pictures (.jpg files). The code demonstrates that this overload does allow overwriting files that were already copied.

_Code sample not included: ~/snippets/csharp/System.IO/File/Copy/program.cs._

## File.Create(String) method

```csharp
public static System.IO.FileStream Create (string path);
```

Creates, or truncates and overwrites, a file in the specified path.

Parameters:

- `path`: The path and name of the file to create.

Returns: A `FileStream` that provides read/write access to the file specified in `path`.

Exceptions:

- `UnauthorizedAccessException`: The caller does not have the required permission.

-or-

`path` specified a file that is read-only.

-or-

`path` specified a file that is hidden.
- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `DirectoryNotFoundException`: The specified path is invalid (for example, it is on an unmapped drive).
- `IOException`: An I/O error occurred while creating the file.
- `NotSupportedException`: `path` is in an invalid format.

#### Remarks
The `FileStream` object created by this method has a default `FileShare` value of `None`; no other process or code can access the created file until the original file handle is closed.

This method is equivalent to the `Create` method overload using the default buffer size of 4,096 bytes.

The `path` parameter is permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

If the specified file does not exist, it is created; if it does exist and it is not read-only, the contents are deleted and overwritten.

By default, full read/write access to new files is granted to all users. The file is opened with read/write access and must be closed before it can be opened by another application.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example creates a file in the specified path, writes some information to the file, and reads from the file.

_Code sample not included: ~/snippets/csharp/System.IO/File/Create/file create1.cs._

## File.Create(String, Int32) method

```csharp
public static System.IO.FileStream Create (string path, int bufferSize);
```

Creates, or truncates and overwrites, a file in the specified path, specifying a buffer size.

Parameters:

- `path`: The path and name of the file to create.
- `bufferSize`: The number of bytes buffered for reads and writes to the file.

Returns: A `FileStream` with the specified buffer size that provides read/write access to the file specified in `path`.

Exceptions:

- `UnauthorizedAccessException`: The caller does not have the required permission.

-or-

`path` specified a file that is read-only.

-or-

`path` specified a file that is hidden.
- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `DirectoryNotFoundException`: The specified path is invalid (for example, it is on an unmapped drive).
- `IOException`: An I/O error occurred while creating the file.
- `NotSupportedException`: `path` is in an invalid format.

#### Remarks
The `FileStream` object created by this method has a default `FileShare` value of `None`; no other process or code can access the created file until the original file handle is closed.

The `path` parameter is permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

This method is equivalent to the `%23ctor` constructor overload. If the specified file does not exist, it is created; if it does exist and it is not read-only, the contents are replaced.

By default, full read/write access to new files is granted to all users. The file is opened with read/write access and must be closed before it can be opened by another application.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example creates a file with the specified buffer size.

_Code sample not included: ~/snippets/csharp/System.IO/File/Create/file create2.cs._

## File.Create(String, Int32, FileOptions) method

```csharp
public static System.IO.FileStream Create (string path, int bufferSize, System.IO.FileOptions options);
```

Creates or overwrites a file in the specified path, specifying a buffer size and options that describe how to create or overwrite the file.

Parameters:

- `path`: The path and name of the file to create.
- `bufferSize`: The number of bytes buffered for reads and writes to the file.
- `options`: One of the `FileOptions` values that describes how to create or overwrite the file.

Returns: A new file with the specified buffer size.

Exceptions:

- `UnauthorizedAccessException`: The caller does not have the required permission.

-or-

`path` specified a file that is read-only.

-or-

`path` specified a file that is hidden.
- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `DirectoryNotFoundException`: The specified path is invalid (for example, it is on an unmapped drive.
- `IOException`: An I/O error occurred while creating the file.
- `NotSupportedException`: `path` is in an invalid format.

#### Remarks
The `path` parameter is permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

This method is equivalent to the `%23ctor` constructor overload. If the specified file does not exist, it is created; if it does exist and it is not read-only, the contents are replaced.

By default, full read/write access to new files is granted to all users. The file is opened with read/write access and must be closed before it can be opened by another application.

For a list of common I/O tasks, see Common I/O Tasks.

## File.CreateHardLink(String, String) method

```csharp
public static System.IO.FileSystemInfo CreateHardLink (string path, string pathToTarget);
```

To be added.

Parameters:

- `path`: To be added.
- `pathToTarget`: To be added.

Returns: To be added.

To be added.

## File.CreateSymbolicLink(String, String) method

```csharp
public static System.IO.FileSystemInfo CreateSymbolicLink (string path, string pathToTarget);
```

Creates a file symbolic link identified by `path` that points to `pathToTarget`.

Parameters:

- `path`: The path where the symbolic link should be created.
- `pathToTarget`: The path of the target to which the symbolic link points.

Returns: A `FileInfo` instance that wraps the newly created file symbolic link.

Exceptions:

- `ArgumentNullException`: `path` or `pathToTarget` is `null`.
- `ArgumentException`: `path` or `pathToTarget` is empty.

-or-

`path` or `pathToTarget` contains a `null` character.
- `IOException`: A file or directory already exists in the location of `path`.

-or-

An I/O error occurred.

To be added.

## File.CreateText(String) method

```csharp
public static System.IO.StreamWriter CreateText (string path);
```

Creates or opens a file for writing UTF-8 encoded text. If the file already exists, its contents are replaced.

Parameters:

- `path`: The file to be opened for writing.

Returns: A `StreamWriter` that writes to the specified file using UTF-8 encoding.

Exceptions:

- `UnauthorizedAccessException`: The caller does not have the required permission.

-or-

`path` specified a file that is read-only.

-or-

`path` specified a file that is hidden.
- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `DirectoryNotFoundException`: The specified path is invalid (for example, it is on an unmapped drive).
- `NotSupportedException`: `path` is in an invalid format.

#### Remarks
This method is equivalent to the `%23ctor` constructor overload with the `append` parameter set to `false`. If the file specified by `path` does not exist, it is created. If the file does exist, its contents are replaced. Additional threads are permitted to read the file while it is open.

The `path` parameter is permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example creates a file for text writing and reading.

_Code sample not included: ~/snippets/csharp/System.IO/File/CreateText/file createtext.cs._
