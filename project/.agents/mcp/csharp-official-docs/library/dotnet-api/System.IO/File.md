---
title: "File class (part 1 of 12)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/File.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# File class

Namespace: `System.IO`

```csharp
public static class File
```

Provides static methods for the creation, copying, deletion, moving, and opening of a single file, and aids in the creation of `FileStream` objects.

#### Remarks
Use the `File` class for typical operations such as copying, moving, renaming, creating, opening, deleting, and appending to a single file at a time. You can also use the `File` class to get and set file attributes or `DateTime` information related to the creation, access, and writing of a file. If you want to perform operations on multiple files, see `Directory.GetFiles` or `DirectoryInfo.GetFiles`.

Many of the `File` methods return other I/O types when you create or open files. You can use these other types to further manipulate a file. For more information, see specific `File` members such as `File.OpenText`, `File.CreateText`, or `File.Create`.

Because all `File` methods are static, if you want to perform only one action, it might be more efficient to use a `File` method than a corresponding `FileInfo` instance method. All `File` methods require the path to the file that you are manipulating.

The static methods of the `File` class perform security checks on all methods. If you are going to reuse an object several times, consider using the corresponding instance method of `FileInfo` instead, because the security check won't always be necessary.

By default, full read/write access to new files is granted to all users.

The following table describes the enumerations that are used to customize the behavior of various `File` methods.

|Enumeration|Description|
|-----------------|-----------------|
|`FileAccess`|Specifies read and write access to a file.|
|`FileShare`|Specifies the level of access permitted for a file that is already in use.|
|`FileMode`|Specifies whether the contents of an existing file are preserved or overwritten, and whether requests to create an existing file cause an exception.|

> **Note:**
>  In members that accept a path as an input string, that path must be well-formed or an exception is raised. For example, if a path is fully qualified but begins with a space, the path is not trimmed in methods of the class. Therefore, the path is malformed and an exception is raised. Similarly, a path or a combination of paths cannot be fully qualified twice. For example, "c:\temp c:\windows" also raises an exception in most cases. Ensure that your paths are well-formed when using methods that accept a path string.

In members that accept a path, the path can refer to a file or just a directory. The specified path can also refer to a relative path or a Universal Naming Convention (UNC) path for a server and share name. For example, all the following are acceptable paths:

-   `"c:\\\MyDir\\\MyFile.txt"` in C#, or `"c:\MyDir\MyFile.txt"` in Visual Basic.
-   `"c:\\\MyDir"` in C#, or `"c:\MyDir"` in Visual Basic.
-   `"MyDir\\\MySubdir"` in C#, or `"MyDir\MySubDir"` in Visual Basic.
-   `"\\\\\\\MyServer\\\MyShare"` in C#, or `"\\\MyServer\MyShare"` in Visual Basic.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example demonstrates how to use the `File` class to check whether a file exists, and depending on the result, either create a new file and write to it, or open the existing file and read from it. Before running the code, create a `c:\temp` folder.

_Code sample not included: ~/snippets/csharp/System.IO/File/Overview/file class example.cs._

## File.AppendAllBytes(String, Byte[]) method

```csharp
public static void AppendAllBytes (string path, byte[] bytes);
```

Appends the specified byte array to the end of the file at the given path.

If the file doesn't exist, this method creates a new file.

Parameters:

- `path`: The file to append to.
- `bytes`: The bytes to append to the file.

Exceptions:

- `ArgumentNullException`: `path` or `bytes` is `null`.
- `ArgumentException`: `path` is empty.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `DirectoryNotFoundException`: The specified path is invalid (for example, it is on an unmapped drive).
- `IOException`: An I/O error occurred while opening the file.
- `UnauthorizedAccessException`: `path` specified a file that is read-only.

-or-

`path` specified a file that is hidden.

-or-

`path` specified a directory.

-or-

The caller does not have the required permission.

-or-

This operation is not supported on the current platform.
- `NotSupportedException`: `path` is in an invalid format.

To be added.

## File.AppendAllBytes(String, Byte>) method

```csharp
public static void AppendAllBytes (string path, ReadOnlySpan<byte> bytes);
```

Appends the specified byte array to the end of the file at the given path.

If the file doesn't exist, this method creates a new file.

Parameters:

- `path`: The file to append to.
- `bytes`: The bytes to append to the file.

Exceptions:

- `ArgumentNullException`: `path` is `null`.
- `ArgumentException`: `path` is empty.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `DirectoryNotFoundException`: The specified path is invalid (for example, it is on an unmapped drive).
- `IOException`: An I/O error occurred while opening the file.
- `UnauthorizedAccessException`: `path` specified a file that is read-only.

-or-

`path` specified a file that is hidden.

-or-

`path` specified a directory.

The caller does not have the required permission.

-or-

This operation is not supported on the current platform.
- `NotSupportedException`: `path` is in an invalid format.

To be added.

## File.AppendAllBytesAsync(String, Byte[], CancellationToken) method

```csharp
public static System.Threading.Tasks.Task AppendAllBytesAsync (string path, byte[] bytes, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously appends the specified byte array to the end of the file at the given path.

If the file doesn't exist, this method creates a new file. If the operation is canceled, the task will return in a canceled state.

Parameters:

- `path`: The file to append to.
- `bytes`: The bytes to append to the file.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous append operation.

Exceptions:

- `ArgumentNullException`: `path` or `bytes` is `null`.
- `ArgumentException`: `path` is empty.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## File.AppendAllBytesAsync(String, Byte>, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task AppendAllBytesAsync (string path, ReadOnlyMemory<byte> bytes, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously appends the specified byte array to the end of the file at the given path.

If the file doesn't exist, this method creates a new file. If the operation is canceled, the task will return in a canceled state.

Parameters:

- `path`: The file to append to.
- `bytes`: The bytes to append to the file.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous append operation.

Exceptions:

- `ArgumentNullException`: `path` is `null`.
- `ArgumentException`: `path` is empty.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## File.AppendAllLines(String, String>) method

```csharp
public static void AppendAllLines (string path, System.Collections.Generic.IEnumerable<string> contents);
```

Appends lines to a file, and then closes the file. If the specified file does not exist, this method creates a file, writes the specified lines to the file, and then closes the file.

Parameters:

- `path`: The file to append the lines to. The file is created if it doesn't already exist.
- `contents`: The lines to append to the file.

Exceptions:

- `ArgumentException`: `path` is a zero-length string, contains only white space, or contains one more invalid characters defined by the `Path.GetInvalidPathChars` method.
- `ArgumentNullException`: Either `path` or `contents` is `null`.
- `DirectoryNotFoundException`: `path` is invalid (for example, the directory doesn't exist or it is on an unmapped drive).
- `FileNotFoundException`: The file specified by `path` was not found.
- `IOException`: An I/O error occurred while opening the file.
- `PathTooLongException`: `path` exceeds the system-defined maximum length.
- `NotSupportedException`: `path` is in an invalid format.
- `SecurityException`: The caller does not have permission to write to the file.
- `UnauthorizedAccessException`: `path` specifies a file that is read-only.

-or-

This operation is not supported on the current platform.

-or-

`path` is a directory.

#### Remarks
The method creates the file if it doesn't exist, but it doesn't create new directories. Therefore, the value of the `path` parameter must contain existing directories.

#### Examples
The following example writes selected lines from a sample data file to a file, and then appends more lines. The directory named `temp` on drive C must exist for the example to complete successfully.

_Code sample not included: ~/snippets/csharp/System.IO/File/AppendAllLines/program.cs._

## File.AppendAllLines(String, String>, Encoding) method

```csharp
public static void AppendAllLines (string path, System.Collections.Generic.IEnumerable<string> contents, System.Text.Encoding encoding);
```

Appends lines to a file by using a specified encoding, and then closes the file. If the specified file does not exist, this method creates a file, writes the specified lines to the file, and then closes the file.

Parameters:

- `path`: The file to append the lines to. The file is created if it doesn't already exist.
- `contents`: The lines to append to the file.
- `encoding`: The character encoding to use.

Exceptions:

- `ArgumentException`: `path` is a zero-length string, contains only white space, or contains one more invalid characters defined by the `Path.GetInvalidPathChars` method.
- `ArgumentNullException`: Either `path`, `contents`, or `encoding` is `null`.
- `DirectoryNotFoundException`: `path` is invalid (for example, the directory doesn't exist or it is on an unmapped drive).
- `FileNotFoundException`: The file specified by `path` was not found.
- `IOException`: An I/O error occurred while opening the file.
- `PathTooLongException`: `path` exceeds the system-defined maximum length.
- `NotSupportedException`: `path` is in an invalid format.
- `SecurityException`: The caller does not have the required permission.
- `UnauthorizedAccessException`: `path` specifies a file that is read-only.

-or-

This operation is not supported on the current platform.

-or-

`path` is a directory.

-or-

The caller does not have the required permission.

#### Remarks
The method creates the file if it doesn't exist, but it doesn't create new directories. Therefore, the value of the `path` parameter must contain existing directories.

You can use this method to create a file that contains the following:

- The results of a LINQ to Objects query on the lines of a file, as obtained by using the `File.ReadLines` method.

- The contents of a collection that implements an `IEnumerable<T>` of strings.

## File.AppendAllLinesAsync(String, String>, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task AppendAllLinesAsync (string path, System.Collections.Generic.IEnumerable<string> contents, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously appends lines to a file, and then closes the file. If the specified file does not exist, this method creates a file, writes the specified lines to the file, and then closes the file.

Parameters:

- `path`: The file to append the lines to. The file is created if it doesn't already exist.
- `contents`: The lines to append to the file.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous append operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `File.AppendAllLines`.

## File.AppendAllLinesAsync(String, String>, Encoding, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task AppendAllLinesAsync (string path, System.Collections.Generic.IEnumerable<string> contents, System.Text.Encoding encoding, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously appends lines to a file by using a specified encoding, and then closes the file. If the specified file does not exist, this method creates a file, writes the specified lines to the file, and then closes the file.

Parameters:

- `path`: The file to append the lines to. The file is created if it doesn't already exist.
- `contents`: The lines to append to the file.
- `encoding`: The character encoding to use.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous append operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `File.AppendAllLines`.
