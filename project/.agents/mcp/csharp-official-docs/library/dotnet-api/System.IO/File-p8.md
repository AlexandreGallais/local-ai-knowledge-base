---
title: "File class (part 8 of 12)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/File.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# File class (part 8 of 12)

## File.ReadAllText(String) method

```csharp
public static string ReadAllText (string path);
```

Opens a text file, reads all the text in the file, and then closes the file.

Parameters:

- `path`: The file to open for reading.

Returns: A string containing all the text in the file.

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
This method opens a file, reads all the text in the file, and returns it as a string. It then closes the file.

This method attempts to automatically detect the encoding of a file based on the presence of byte order marks. It automatically recognizes UTF-8, little-endian UTF-16, big-endian UTF-16, little-endian UTF-32, and big-endian UTF-32 text if the file starts with the appropriate byte order marks.

Use the `ReadAllText` method overload when reading files that might contain imported text, because unrecognized characters may not be read correctly.

The file handle is guaranteed to be closed by this method, even if exceptions are raised.

#### Examples
The following code example demonstrates the use of the `File.ReadAllText` method to display the contents of a file. In this example a file is created, if it doesn't already exist, and text is added to it.

_Code sample not included: ~/snippets/csharp/System.IO/File/AppendAllText/AllText.cs._

## File.ReadAllText(String, Encoding) method

```csharp
public static string ReadAllText (string path, System.Text.Encoding encoding);
```

Opens a file, reads all text in the file with the specified encoding, and then closes the file.

Parameters:

- `path`: The file to open for reading.
- `encoding`: The encoding applied to the contents of the file.

Returns: A string containing all text in the file.

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
This method opens a file, reads all the text in the file, and returns it as a string. It then closes the file.

This method attempts to automatically detect the encoding of a file based on the presence of byte order marks. It automatically recognizes UTF-8, little-endian UTF-16, big-endian UTF-16, little-endian UTF-32, and big-endian UTF-32 text if the file starts with the appropriate byte order marks.

The file handle is guaranteed to be closed by this method, even if exceptions are raised.

To use the encoding settings as configured for your operating system, specify the `Default` property for the `encoding` parameter.

#### Examples
The following code example demonstrates the use of the `File.ReadAllText` method to display the contents of a file. In this example a file is created, if it doesn't already exist, and text is added to it.

_Code sample not included: ~/snippets/csharp/System.IO/File/AppendAllText/AllText1.cs._

## File.ReadAllTextAsync(String, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<string> ReadAllTextAsync (string path, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously opens a text file, reads all the text in the file, and then closes the file.

Parameters:

- `path`: The file to open for reading.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous read operation, which wraps the string containing all text in the file.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `File.ReadAllText`.

## File.ReadAllTextAsync(String, Encoding, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<string> ReadAllTextAsync (string path, System.Text.Encoding encoding, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously opens a text file, reads all text in the file with the specified encoding, and then closes the file.

Parameters:

- `path`: The file to open for reading.
- `encoding`: The encoding applied to the contents of the file.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous read operation, which wraps the string containing all text in the file.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `File.ReadAllText`.

## File.ReadLines(String) method

```csharp
public static System.Collections.Generic.IEnumerable<string> ReadLines (string path);
```

Reads the lines of a file.

Parameters:

- `path`: The file to read.

Returns: All the lines of the file, or the lines that are the result of a query.

Exceptions:

- `ArgumentNullException`: `path` is `null`.
- `DirectoryNotFoundException`: `path` is invalid (for example, it is on an unmapped drive).
- `FileNotFoundException`: The file specified by `path` was not found.
- `IOException`: An I/O error occurred while opening the file.
- `PathTooLongException`: `path` exceeds the system-defined maximum length.
- `SecurityException`: The caller does not have the required permission.
- `UnauthorizedAccessException`: `path` specifies a file that is read-only.

-or-

This operation is not supported on the current platform.

-or-

`path` is a directory.

-or-

The caller does not have the required permission.

The `File.ReadLines` and `File.ReadAllLines` methods differ as follows: When you use `File.ReadLines`, you can start enumerating the collection of strings before the whole collection is returned; when you use `File.ReadAllLines`, you must wait for the whole array of strings be returned before you can access the array. Therefore, when you are working with very large files, `File.ReadLines` can be more efficient.

You can use the `File.ReadLines` method to do the following:

- Perform LINQ to Objects queries on a file to obtain a filtered set of its lines.
- Write the returned collection of lines to a file with the `WriteAllLines` method, or append them to an existing file with the `AppendAllLines` method.
- Create an immediately populated instance of a collection that takes an `IEnumerable<T>` collection of strings for its constructor, such as a `IList<T>` or a `Queue<T>`.

This method uses `Encoding.UTF8` for the encoding value.

A line is defined as a sequence of characters followed by a carriage return ('\r'), a line feed ('\n'), or a carriage return immediately followed by a line feed, or as the final sequence of characters in the file or stream if it ends without a newline sequence. If the file ends with a newline sequence, no additional empty line is returned. For example, a file containing `"line1\nline2\n"` produces the same two lines (`"line1"` and `"line2"`) as a file containing `"line1\nline2"`.

#### Examples

The following example reads the lines of a file to find lines that contain specified strings.

_Code sample not included: ~/snippets/csharp/System.IO/File/ReadLines/program.cs._

The following example uses the `File.ReadLines` method in a LINQ query that enumerates all directories for files that have a .txt extension, reads each line of the file, and displays the line if it contains the string "Microsoft".

_Code sample not included: ~/snippets/csharp/System.IO/Directory/EnumerateFiles/program.cs._

## File.ReadLines(String, Encoding) method

```csharp
public static System.Collections.Generic.IEnumerable<string> ReadLines (string path, System.Text.Encoding encoding);
```

Read the lines of a file that has a specified encoding.

Parameters:

- `path`: The file to read.
- `encoding`: The encoding that is applied to the contents of the file.

Returns: All the lines of the file, or the lines that are the result of a query.

Exceptions:

- `ArgumentNullException`: `path` is `null`.
- `DirectoryNotFoundException`: `path` is invalid (for example, it is on an unmapped drive).
- `FileNotFoundException`: The file specified by `path` was not found.
- `IOException`: An I/O error occurred while opening the file.
- `PathTooLongException`: `path` exceeds the system-defined maximum length.
- `SecurityException`: The caller does not have the required permission.
- `UnauthorizedAccessException`: `path` specifies a file that is read-only.

-or-

This operation is not supported on the current platform.

-or-

`path` is a directory.

-or-

The caller does not have the required permission.

Use this method to specify an encoding to use read the file.

The `File.ReadLines` and `File.ReadAllLines` methods differ as follows: When you use `File.ReadLines`, you can start enumerating the collection of strings before the whole collection is returned. When you use `File.ReadAllLines`, you must wait for the whole array of strings be returned before you can access the array. Therefore, when you are working with very large files, `File.ReadLines` can be more efficient.

You can use the `File.ReadLines` method to do the following:

- Perform LINQ to Objects queries on a file to obtain a filtered set of its lines.
- Write the returned collection of lines to a file with the `WriteAllLines` method, or append them to an existing file with the `AppendAllLines` method.
- Create an immediately populated instance of a collection that takes an `IEnumerable<T>` collection of strings for its constructor, such as a `IList<T>` or a `Queue<T>`.

A line is defined as a sequence of characters terminated by a carriage return ('\r'), a line feed ('\n'), a carriage return immediately followed by a line feed, or the end of the file or stream. If the file ends with a newline sequence, no additional empty line is returned. For example, a file containing `"line1\nline2\n"` produces the same two lines (`"line1"` and `"line2"`) as a file containing `"line1\nline2"`.

## File.ReadLinesAsync(String, CancellationToken) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<string> ReadLinesAsync (string path, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously reads the lines of a file.

Parameters:

- `path`: The file to read.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: The async enumerable that represents all the lines of the file, or the lines that are the result of a query.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `File.ReadLines`.

## File.ReadLinesAsync(String, Encoding, CancellationToken) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<string> ReadLinesAsync (string path, System.Text.Encoding encoding, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously reads the lines of a file that has a specified encoding.

Parameters:

- `path`: The file to read.
- `encoding`: The encoding that is applied to the contents of the file.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: The async enumerable that represents all the lines of the file, or the lines that are the result of a query.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `File.ReadLines`.
