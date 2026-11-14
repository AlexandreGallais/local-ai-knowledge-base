---
title: "File class (part 2 of 12)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/File.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# File class (part 2 of 12)

## File.AppendAllText(String, Char>) method

```csharp
public static void AppendAllText (string path, ReadOnlySpan<char> contents);
```

Appends the specified string to the file, creating the file if it does not already exist.

Parameters:

- `path`: The file to append to.
- `contents`: The characters to write to the file.

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

-or-

The caller does not have the required permission.

-or-

This operation is not supported on the current platform.
- `NotSupportedException`: `path` is in an invalid format.

Given a string and a file path, this method opens the specified file, appends the string to the end of the file using the specified encoding,

and then closes the file. The file handle is guaranteed to be closed by this method, even if exceptions are raised. The method creates the file

if it doesn't exist, but it doesn't create new directories. Therefore, the value of the path parameter must contain existing directories.

## File.AppendAllText(String, String) method

```csharp
public static void AppendAllText (string path, string? contents);
```

Opens a file, appends the specified string to the file, and then closes the file. If the file does not exist, this method creates a file, writes the specified string to the file, then closes the file.

Parameters:

- `path`: The file to append the specified string to.
- `contents`: The string to append to the file.

Exceptions:

- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `DirectoryNotFoundException`: The specified path is invalid (for example, the directory doesn't exist or it is on an unmapped drive).
- `IOException`: An I/O error occurred while opening the file.
- `UnauthorizedAccessException`: `path` specified a file that is read-only.

-or-

This operation is not supported on the current platform.

-or-

`path` specified a directory.

-or-

The caller does not have the required permission.
- `NotSupportedException`: `path` is in an invalid format.
- `SecurityException`: The caller does not have the required permission.

#### Remarks
Given a string and a file path, this method opens the specified file, appends the string to the end of the file, and then closes the file. The file handle is guaranteed to be closed by this method, even if exceptions are raised.

The method creates the file if it doesn't exist, but it doesn't create new directories. Therefore, the value of the `path` parameter must contain existing directories.

#### Examples
The following code example demonstrates the use of the `File.AppendAllText` method to add extra text to the end of a file. In this example, a file is created if it doesn't already exist, and text is added to it. However, the directory named `temp` on drive C must exist for the example to complete successfully.

_Code sample not included: ~/snippets/csharp/System.IO/File/AppendAllText/AllText.cs._

## File.AppendAllText(String, Char>, Encoding) method

```csharp
public static void AppendAllText (string path, ReadOnlySpan<char> contents, System.Text.Encoding encoding);
```

Appends the specified string to the file, creating the file if it does not already exist.

Parameters:

- `path`: The file to append to.
- `contents`: The characters to write to the file.
- `encoding`: The encoding to apply to the string.

Exceptions:

- `ArgumentNullException`: `path` or `encoding` is `null`.
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

Given a string and a file path, this method opens the specified file, appends the string to the end of the file using the specified encoding,

and then closes the file. The file handle is guaranteed to be closed by this method, even if exceptions are raised. The method creates the file

if it doesn't exist, but it doesn't create new directories. Therefore, the value of the path parameter must contain existing directories.

## File.AppendAllText(String, String, Encoding) method

```csharp
public static void AppendAllText (string path, string? contents, System.Text.Encoding encoding);
```

Appends the specified string to the file using the specified encoding, creating the file if it does not already exist.

Parameters:

- `path`: The file to append the specified string to.
- `contents`: The string to append to the file.
- `encoding`: The character encoding to use.

Exceptions:

- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `DirectoryNotFoundException`: The specified path is invalid (for example, the directory doesn't exist or it is on an unmapped drive).
- `IOException`: An I/O error occurred while opening the file.
- `UnauthorizedAccessException`: `path` specified a file that is read-only.

-or-

This operation is not supported on the current platform.

-or-

`path` specified a directory.

-or-

The caller does not have the required permission.
- `NotSupportedException`: `path` is in an invalid format.
- `SecurityException`: The caller does not have the required permission.

#### Remarks
Given a string and a file path, this method opens the specified file, appends the string to the end of the file using the specified encoding, and then closes the file. The file handle is guaranteed to be closed by this method, even if exceptions are raised.

The method creates the file if it doesn't exist, but it doesn't create new directories. Therefore, the value of the `path` parameter must contain existing directories.

#### Examples
The following code example demonstrates the use of the `File.AppendAllText` method to add extra text to the end of a file. In this example, a file is created if it doesn't already exist, and text is added to it. However, the directory named `temp` on drive C must exist for the example to complete successfully.

_Code sample not included: ~/snippets/csharp/System.IO/File/AppendAllText/AllText1.cs._

## File.AppendAllTextAsync(String, Char>, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task AppendAllTextAsync (string path, ReadOnlyMemory<char> contents, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously opens a file or creates a file if it does not already exist, appends the specified string to the file, and then closes the file.

Parameters:

- `path`: The file to append the specified string to.
- `contents`: The characters to append to the file.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous append operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## File.AppendAllTextAsync(String, String, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task AppendAllTextAsync (string path, string? contents, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously opens a file or creates a file if it does not already exist, appends the specified string to the file, and then closes the file.

Parameters:

- `path`: The file to append the specified string to.
- `contents`: The string to append to the file.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous append operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `File.AppendAllText`.

## File.AppendAllTextAsync(String, Char>, Encoding, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task AppendAllTextAsync (string path, ReadOnlyMemory<char> contents, System.Text.Encoding encoding, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously opens a file or creates the file if it does not already exist, appends the specified string to the file using the specified encoding, and then closes the file.

Parameters:

- `path`: The file to append the specified string to.
- `contents`: The characters to append to the file.
- `encoding`: The character encoding to use.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous append operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## File.AppendAllTextAsync(String, String, Encoding, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task AppendAllTextAsync (string path, string? contents, System.Text.Encoding encoding, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously opens a file or creates the file if it does not already exist, appends the specified string to the file using the specified encoding, and then closes the file.

Parameters:

- `path`: The file to append the specified string to.
- `contents`: The string to append to the file.
- `encoding`: The character encoding to use.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous append operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `File.AppendAllText`.

## File.AppendText(String) method

```csharp
public static System.IO.StreamWriter AppendText (string path);
```

Creates a `StreamWriter` that appends UTF-8 encoded text to an existing file, or to a new file if the specified file does not exist.

Parameters:

- `path`: The path to the file to append to.

Returns: A stream writer that appends UTF-8 encoded text to the specified file or to a new file.

Exceptions:

- `UnauthorizedAccessException`: The caller does not have the required permission.
- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `DirectoryNotFoundException`: The specified path is invalid (for example, the directory doesn't exist or it is on an unmapped drive).
- `NotSupportedException`: `path` is in an invalid format.

#### Remarks
This method is equivalent to the `%23ctor` constructor overload. If the file specified by `path` does not exist, it is created. If the file does exist, write operations to the `StreamWriter` append text to the file. Additional threads are permitted to read the file while it is open.

The `path` parameter is permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

The `path` parameter is not case-sensitive.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example appends text to a file. The method creates a new file if the file doesn't exist. However, the directory named `temp` on drive C must exist for the example to complete successfully.

_Code sample not included: ~/snippets/csharp/System.IO/File/AppendText/file_appendtext.cs._
