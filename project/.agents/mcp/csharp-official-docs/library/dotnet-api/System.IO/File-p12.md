---
title: "File class (part 12 of 12)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/File.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# File class (part 12 of 12)

## File.WriteAllText(String, String, Encoding) method

```csharp
public static void WriteAllText (string path, string? contents, System.Text.Encoding encoding);
```

Creates a new file, writes the specified string to the file using the specified encoding, and then closes the file. If the target file already exists, it is truncated and overwritten.

Parameters:

- `path`: The file to write to.
- `contents`: The string to write to the file.
- `encoding`: The encoding to apply to the string.

Exceptions:

- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `DirectoryNotFoundException`: The specified path is invalid (for example, it is on an unmapped drive).
- `IOException`: An I/O error occurred while opening the file.
- `UnauthorizedAccessException`: `path` specified a file that is read-only.

-or-

`path` specified a file that is hidden.

-or-

This operation is not supported on the current platform.

-or-

`path` specified a directory.

-or-

The caller does not have the required permission.
- `NotSupportedException`: `path` is in an invalid format.
- `SecurityException`: The caller does not have the required permission.

#### Remarks
Given a string and a file path, this method opens the specified file, writes the string to the file using the specified encoding, and then closes the file. The file handle is guaranteed to be closed by this method, even if exceptions are raised.

#### Examples
The following code example demonstrates the use of the `File.WriteAllText` method to write text to a file. In this example a file is created, if it doesn't already exist, and text is added to it.

_Code sample not included: ~/snippets/csharp/System.IO/File/AppendAllText/AllText1.cs._

## File.WriteAllTextAsync(String, Char>, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task WriteAllTextAsync (string path, ReadOnlyMemory<char> contents, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously creates a new file, writes the specified string to the file, and then closes the file.

If the target file already exists, it is truncated and overwritten.

Parameters:

- `path`: The file to write to.
- `contents`: The characters to write to the file.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## File.WriteAllTextAsync(String, String, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task WriteAllTextAsync (string path, string? contents, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously creates a new file, writes the specified string to the file, and then closes the file. If the target file already exists, it is truncated and overwritten.

Parameters:

- `path`: The file to write to.
- `contents`: The string to write to the file.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `File.WriteAllText`.

## File.WriteAllTextAsync(String, Char>, Encoding, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task WriteAllTextAsync (string path, ReadOnlyMemory<char> contents, System.Text.Encoding encoding, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously creates a new file, writes the specified string to the file using the specified encoding, and then closes the file.

If the target file already exists, it is truncated and overwritten.

Parameters:

- `path`: The file to write to.
- `contents`: The characters to write to the file.
- `encoding`: The encoding to apply to the string.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## File.WriteAllTextAsync(String, String, Encoding, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task WriteAllTextAsync (string path, string? contents, System.Text.Encoding encoding, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously creates a new file, writes the specified string to the file using the specified encoding, and then closes the file. If the target file already exists, it is truncated and overwritten.

Parameters:

- `path`: The file to write to.
- `contents`: The string to write to the file.
- `encoding`: The encoding to apply to the string.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `File.WriteAllText`.
