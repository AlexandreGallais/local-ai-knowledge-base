---
title: "File class (part 11 of 12)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/File.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# File class (part 11 of 12)

## File.WriteAllLines(String, String>) method

```csharp
public static void WriteAllLines (string path, System.Collections.Generic.IEnumerable<string> contents);
```

Creates a new file, writes a collection of strings to the file, and then closes the file.

Parameters:

- `path`: The file to write to.
- `contents`: The lines to write to the file.

Exceptions:

- `ArgumentNullException`: Either `path` or `contents` is `null`.
- `DirectoryNotFoundException`: `path` is invalid (for example, it is on an unmapped drive).
- `IOException`: An I/O error occurred while opening the file.
- `PathTooLongException`: `path` exceeds the system-defined maximum length.
- `NotSupportedException`: `path` is in an invalid format.
- `SecurityException`: The caller does not have the required permission.
- `UnauthorizedAccessException`: `path` specified a file that is read-only.

-or-

`path` specified a file that is hidden.

-or-

This operation is not supported on the current platform.

-or-

`path` is a directory.

-or-

The caller does not have the required permission.

The default behavior of the `WriteAllLines` method is to write out data by using UTF-8 encoding without a byte order mark (BOM). If it is necessary to include a UTF-8 identifier, such as a byte order mark, at the beginning of a file, use the `WriteAllLines` method overload with `Encoding.UTF8` encoding.

If the target file already exists, it is truncated and overwritten.

You can use this method to create the contents for a collection class that takes an `IEnumerable<T>` in its constructor, such as a `List<T>.%23ctor`, `HashSet<T>.%23ctor`, or a `SortedSet<T>.%23ctor` class.

#### Examples
The following example writes selected lines from a sample data file to a file.

_Code sample not included: ~/snippets/csharp/System.IO/File/AppendAllLines/program.cs._

## File.WriteAllLines(String, String[]) method

```csharp
public static void WriteAllLines (string path, string[] contents);
```

Creates a new file, write the specified string array to the file, and then closes the file.

Parameters:

- `path`: The file to write to.
- `contents`: The string array to write to the file.

Exceptions:

- `ArgumentNullException`: Either `path` or `contents` is `null`.
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

If the target file already exists, it is truncated and overwritten.

The default behavior of the `File.WriteAllLines` method is to write out data using UTF-8 encoding without a byte order mark (BOM). If it is necessary to include a UTF-8 identifier, such as a byte order mark, at the beginning of a file, use the `WriteAllLines` method overload with `Encoding.UTF8` encoding.

Given a string array and a file path, this method opens the specified file, writes the string array to the file, and then closes the file.

#### Examples
The following code example demonstrates the use of the `File.WriteAllLines` method to write text to a file. In this example a file is created, if it doesn't already exist, and text is added to it.

_Code sample not included: ~/snippets/csharp/System.IO/File/ReadAllLines/AllText.cs._

## File.WriteAllLines(String, String>, Encoding) method

```csharp
public static void WriteAllLines (string path, System.Collections.Generic.IEnumerable<string> contents, System.Text.Encoding encoding);
```

Creates a new file by using the specified encoding, writes a collection of strings to the file, and then closes the file.

Parameters:

- `path`: The file to write to.
- `contents`: The lines to write to the file.
- `encoding`: The character encoding to use.

Exceptions:

- `ArgumentNullException`: Either `path`, `contents`, or `encoding` is `null`.
- `DirectoryNotFoundException`: `path` is invalid (for example, it is on an unmapped drive).
- `IOException`: An I/O error occurred while opening the file.
- `PathTooLongException`: `path` exceeds the system-defined maximum length.
- `NotSupportedException`: `path` is in an invalid format.
- `SecurityException`: The caller does not have the required permission.
- `UnauthorizedAccessException`: `path` specified a file that is read-only.

-or-

`path` specified a file that is hidden.

-or-

This operation is not supported on the current platform.

-or-

`path` is a directory.

-or-

The caller does not have the required permission.

#### Remarks
If the target file already exists, it is truncated and overwritten.

You can use this method to create a file that contains the following:

- The results of a LINQ to Objects query on the lines of a file, as obtained by using the `File.ReadLines` method.

- The contents of a collection that implements an `IEnumerable<T>` of strings.

## File.WriteAllLines(String, String[], Encoding) method

```csharp
public static void WriteAllLines (string path, string[] contents, System.Text.Encoding encoding);
```

Creates a new file, writes the specified string array to the file by using the specified encoding, and then closes the file.

Parameters:

- `path`: The file to write to.
- `contents`: The string array to write to the file.
- `encoding`: An `Encoding` object that represents the character encoding applied to the string array.

Exceptions:

- `ArgumentNullException`: Either `path` or `contents` is `null`.
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
If the target file already exists, it is truncated and overwritten.

Given a string array and a file path, this method opens the specified file, writes the string array to the file using the specified encoding, and then closes the file.

#### Examples
The following code example demonstrates the use of the `File.WriteAllLines` method to write text to a file. In this example a file is created, if it doesn't already exist, and text is added to it.

_Code sample not included: ~/snippets/csharp/System.IO/File/ReadAllLines/AllText_Encoding.cs._

## File.WriteAllLinesAsync(String, String>, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task WriteAllLinesAsync (string path, System.Collections.Generic.IEnumerable<string> contents, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously creates a new file, writes the specified lines to the file, and then closes the file.

Parameters:

- `path`: The file to write to.
- `contents`: The lines to write to the file.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `File.WriteAllLines`.

## File.WriteAllLinesAsync(String, String>, Encoding, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task WriteAllLinesAsync (string path, System.Collections.Generic.IEnumerable<string> contents, System.Text.Encoding encoding, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously creates a new file, write the specified lines to the file by using the specified encoding, and then closes the file.

Parameters:

- `path`: The file to write to.
- `contents`: The lines to write to the file.
- `encoding`: The character encoding to use.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `File.WriteAllLines`.

## File.WriteAllText(String, Char>) method

```csharp
public static void WriteAllText (string path, ReadOnlySpan<char> contents);
```

Creates a new file, writes the specified string to the file, and then closes the file.

If the target file already exists, it is truncated and overwritten.

Parameters:

- `path`: The file to write to.
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

This operation is not supported on the current platform.

The caller does not have the required permission.
- `NotSupportedException`: `path` is in an invalid format.

This method uses UTF-8 encoding without a Byte-Order Mark (BOM), so using the `Encoding.GetPreamble` method will return an empty byte array. If it is necessary to include a UTF-8 identifier, such as a byte order mark, at the beginning of a file, use the `File.WriteAllText` method.

## File.WriteAllText(String, String) method

```csharp
public static void WriteAllText (string path, string? contents);
```

Creates a new file, writes the specified string to the file, and then closes the file. If the target file already exists, it is truncated and overwritten.

Parameters:

- `path`: The file to write to.
- `contents`: The string to write to the file.

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
This method uses UTF-8 encoding without a Byte-Order Mark (BOM), so using the `Encoding.GetPreamble` method will return an empty byte array. If it is necessary to include a UTF-8 identifier, such as a byte order mark, at the beginning of a file, use the `WriteAllText` method overload with `Encoding.UTF8` encoding.

Given a string and a file path, this method opens the specified file, writes the string to the file, and then closes the file.

#### Examples
The following code example demonstrates the use of the `File.WriteAllText` method to write text to a file. In this example a file is created, if it doesn't already exist, and text is added to it.

_Code sample not included: ~/snippets/csharp/System.IO/File/AppendAllText/AllText.cs._

## File.WriteAllText(String, Char>, Encoding) method

```csharp
public static void WriteAllText (string path, ReadOnlySpan<char> contents, System.Text.Encoding encoding);
```

Creates a new file, writes the specified string to the file using the specified encoding, and then closes the file.

If the target file already exists, it is truncated and overwritten.

Parameters:

- `path`: The file to write to.
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

To be added.
