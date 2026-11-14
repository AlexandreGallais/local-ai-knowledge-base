---
title: "File class (part 7 of 12)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/File.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# File class (part 7 of 12)

## File.OpenRead(String) method

```csharp
public static System.IO.FileStream OpenRead (string path);
```

Opens an existing file for reading.

Parameters:

- `path`: The file to be opened for reading.

Returns: A read-only `FileStream` on the specified path.

Exceptions:

- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `DirectoryNotFoundException`: The specified path is invalid, (for example, it is on an unmapped drive).
- `UnauthorizedAccessException`: `path` specified a directory.

-or-

The caller does not have the required permission.
- `FileNotFoundException`: The file specified in `path` was not found.
- `NotSupportedException`: `path` is in an invalid format.
- `IOException`: An I/O error occurred while opening the file.

#### Remarks
This method is equivalent to the `%23ctor` constructor overload with a `FileMode` value of `Open`, a `FileAccess` value of `Read` and a `FileShare` value of `Read`.

The `path` parameter is permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example opens a file for reading.

_Code sample not included: ~/snippets/csharp/System.IO/File/OpenRead/file openread.cs._

## File.OpenText(String) method

```csharp
public static System.IO.StreamReader OpenText (string path);
```

Opens an existing UTF-8 encoded text file for reading.

Parameters:

- `path`: The file to be opened for reading.

Returns: A `StreamReader` on the specified path.

Exceptions:

- `UnauthorizedAccessException`: The caller does not have the required permission.
- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `DirectoryNotFoundException`: The specified path is invalid, (for example, it is on an unmapped drive).
- `FileNotFoundException`: The file specified in `path` was not found.
- `NotSupportedException`: `path` is in an invalid format.

#### Remarks
This method is equivalent to the `%23ctor` constructor overload.

The `path` parameter is permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example opens a text file for reading.

_Code sample not included: ~/snippets/csharp/System.IO/File/OpenText/file opentext.cs._

## File.OpenWrite(String) method

```csharp
public static System.IO.FileStream OpenWrite (string path);
```

Opens an existing file or creates a new file for writing.

Parameters:

- `path`: The file to be opened for writing.

Returns: An unshared `FileStream` object on the specified path with `FileAccess.Write` access.

Exceptions:

- `UnauthorizedAccessException`: The caller does not have the required permission.

-or-

`path` specified a read-only file or directory.
- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `DirectoryNotFoundException`: The specified path is invalid, (for example, it is on an unmapped drive).
- `NotSupportedException`: `path` is in an invalid format.

#### Remarks
This method is equivalent to the `%23ctor` constructor overload with file mode set to `OpenOrCreate`, the access set to `Write`, and the share mode set to `None`.

The `File.OpenWrite` method opens a file if one already exists for the file path, or creates a new file if one does not exist. For an existing file, it does not append the new text to the existing text. Instead, it overwrites the existing characters with the new characters. If you overwrite a longer string (such as "This is a test of the OpenWrite method") with a shorter string (such as "Second run"), the file will contain a mix of the strings ("Second runtest of the OpenWrite method").

The `path` parameter may specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, use the `Directory.GetCurrentDirectory` method.

The returned `FileStream` does not support reading. To open a file for both reading and writing, use `File.Open`.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example opens a file for reading and writing.

_Code sample not included: ~/snippets/csharp/System.IO/File/OpenWrite/file openwrite.cs._

## File.ReadAllBytes(String) method

```csharp
public static byte[] ReadAllBytes (string path);
```

Opens a binary file, reads the contents of the file into a byte array, and then closes the file.

Parameters:

- `path`: The file to open for reading.

Returns: A byte array containing the contents of the file.

Exceptions:

- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `DirectoryNotFoundException`: The specified path is invalid (for example, it is on an unmapped drive).
- `IOException`: An I/O error occurred while opening the file.
- `UnauthorizedAccessException`: This operation is not supported on the current platform.

-or-

`path` specified a directory.

-or-

The caller does not have the required permission.
- `FileNotFoundException`: The file specified in `path` was not found.
- `NotSupportedException`: `path` is in an invalid format.
- `SecurityException`: The caller does not have the required permission.

#### Remarks
Given a file path, this method opens the file, reads the contents of the file into a byte array, and then closes the file.

## File.ReadAllBytesAsync(String, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<byte[]> ReadAllBytesAsync (string path, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously opens a binary file, reads the contents of the file into a byte array, and then closes the file.

Parameters:

- `path`: The file to open for reading.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous read operation, which wraps the byte array containing the contents of the file.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `File.ReadAllBytes`.

## File.ReadAllLines(String) method

```csharp
public static string[] ReadAllLines (string path);
```

Opens a text file, reads all lines of the file, and then closes the file.

Parameters:

- `path`: The file to open for reading.

Returns: A string array containing all lines of the file.

Exceptions:

- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `DirectoryNotFoundException`: The specified path is invalid (for example, it is on an unmapped drive).
- `IOException`: An I/O error occurred while opening the file.
- `UnauthorizedAccessException`: This operation is not supported on the current platform.

-or-

`path` specified a directory.

-or-

The caller does not have the required permission.
- `FileNotFoundException`: The file specified in `path` was not found.
- `NotSupportedException`: `path` is in an invalid format.
- `SecurityException`: The caller does not have the required permission.

#### Remarks
This method opens a file, reads each line of the file, then adds each line as an element of a string array. It then closes the file. A line is defined as a sequence of characters followed by a carriage return ('\r'), a line feed ('\n'), or a carriage return immediately followed by a line feed. The resulting string does not contain the terminating carriage return and/or line feed.

If the file ends with a newline sequence, no additional empty line is appended to the array. For example, a file containing `"line1\nline2\n"` produces the same two-element array (`["line1", "line2"]`) as a file containing `"line1\nline2"`.

This method attempts to automatically detect the encoding of a file based on the presence of byte order marks. Encoding formats UTF-8 and UTF-32 (both big-endian and little-endian) can be detected.

#### Examples
The following code example demonstrates the use of the `File.ReadAllLines` method to display the contents of a file. In this example a file is created, if it doesn't already exist, and text is added to it.

_Code sample not included: ~/snippets/csharp/System.IO/File/ReadAllLines/AllText.cs._

## File.ReadAllLines(String, Encoding) method

```csharp
public static string[] ReadAllLines (string path, System.Text.Encoding encoding);
```

Opens a file, reads all lines of the file with the specified encoding, and then closes the file.

Parameters:

- `path`: The file to open for reading.
- `encoding`: The encoding applied to the contents of the file.

Returns: A string array containing all lines of the file.

Exceptions:

- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `DirectoryNotFoundException`: The specified path is invalid (for example, it is on an unmapped drive).
- `IOException`: An I/O error occurred while opening the file.
- `UnauthorizedAccessException`: This operation is not supported on the current platform.

-or-

`path` specified a directory.

-or-

The caller does not have the required permission.
- `FileNotFoundException`: The file specified in `path` was not found.
- `NotSupportedException`: `path` is in an invalid format.
- `SecurityException`: The caller does not have the required permission.

#### Remarks
This method opens a file, reads each line of the file, and then adds each line as an element of a string array. It then closes the file. A line is defined as a sequence of characters followed by a carriage return ('\r'), a line feed ('\n'), or a carriage return immediately followed by a line feed. The resulting string does not contain the terminating carriage return and/or line feed.

If the file ends with a newline sequence, no additional empty line is appended to the array. For example, a file containing `"line1\nline2\n"` produces the same two-element array (`["line1", "line2"]`) as a file containing `"line1\nline2"`.

This method attempts to automatically detect the encoding of a file based on the presence of byte order marks. Encoding formats UTF-8 and UTF-32 (both big-endian and little-endian) can be detected.

#### Examples
The following code example demonstrates the use of the `File.ReadAllLines` method to display the contents of a file. In this example a file is created, if it doesn't already exist, and text is added to it.

_Code sample not included: ~/snippets/csharp/System.IO/File/ReadAllLines/AllText_Encoding.cs._

## File.ReadAllLinesAsync(String, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<string[]> ReadAllLinesAsync (string path, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously opens a text file, reads all lines of the file, and then closes the file.

Parameters:

- `path`: The file to open for reading.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous read operation, which wraps the string array containing all lines of the file.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `File.ReadAllLines`.

## File.ReadAllLinesAsync(String, Encoding, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<string[]> ReadAllLinesAsync (string path, System.Text.Encoding encoding, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously opens a text file, reads all lines of the file with the specified encoding, and then closes the file.

Parameters:

- `path`: The file to open for reading.
- `encoding`: The encoding applied to the contents of the file.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous read operation, which wraps the string array containing all lines of the file.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `File.ReadAllLines`.
