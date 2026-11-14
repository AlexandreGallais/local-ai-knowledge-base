---
title: "StreamWriter class (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/StreamWriter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StreamWriter class

Namespace: `System.IO`

```csharp
public class StreamWriter : System.IO.TextWriter
```

Implements a `TextWriter` for writing characters to a stream in a particular encoding.

#### Remarks
`StreamWriter` is designed for character output in a particular encoding, whereas classes derived from `Stream` are designed for byte input and output.

> **Important:**
> This type implements the `IDisposable` interface. When you've finished using the type, you should dispose of it either directly (by calling its `Dispose` method) or indirectly (with a language construct such as `using` in C#). For more information, see Use an object that implements IDisposable.

`StreamWriter` defaults to using an instance of `UTF8Encoding` unless specified otherwise. This instance of `UTF8Encoding` is constructed without a byte order mark (BOM), so its `Encoding.GetPreamble` method returns an empty byte array. The default UTF-8 encoding for this constructor throws an exception on invalid bytes. This behavior is different from the behavior provided by the encoding object in the `UTF8` property. To specify a BOM and determine whether an exception is thrown on invalid bytes, use a constructor that accepts an encoding object as a parameter, such as `%23ctor` or `StreamWriter.%23ctor`.

By default, a `StreamWriter` is not thread safe. See `TextWriter.Synchronized` for a thread-safe wrapper.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example shows how to use a `StreamWriter` object to write a file that lists the directories on the C drive, and then uses a `StreamReader` object to read and display each directory name. A good practice is to use these objects in a `using` statement so that the unmanaged resources are correctly disposed. The `using` statement automatically calls `IDisposable.Dispose` on the object when the code that is using it has completed. The constructor used in this example is not supported for use in Windows Store Apps.

_Code sample not included: ~/snippets/csharp/System.IO/StreamWriter/Overview/program.cs._

## StreamWriter.StreamWriter(Stream) constructor

```csharp
public StreamWriter (System.IO.Stream stream);
```

Initializes a new instance of the `StreamWriter` class for the specified stream by using UTF-8 encoding and the default buffer size.

Parameters:

- `stream`: The stream to write to.

Exceptions:

- `ArgumentException`: `stream` is not writable.
- `ArgumentNullException`: `stream` is `null`.

#### Remarks
This constructor creates a `StreamWriter` with UTF-8 encoding without a Byte-Order Mark (BOM), so its `Encoding.GetPreamble` method returns an empty byte array. The default UTF-8 encoding for this constructor throws an exception on invalid bytes. This behavior is different from the behavior provided by the encoding object in the `UTF8` property. To specify whether an exception is thrown on invalid bytes, use a constructor that accepts an encoding object as a parameter, such as `StreamWriter.%23ctor`. The `BaseStream` property is initialized using the `stream` parameter. The position of the stream is not reset.

The `StreamWriter` object calls `Dispose` on the provided `Stream` object when `StreamWriter.Dispose` is called.

> **Caution:**
> When you compile a set of characters with a particular cultural setting and retrieve those same characters with a different cultural setting, the characters might not be interpretable and could cause an exception to be thrown.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following code example demonstrates this constructor.

_Code sample not included: ~/snippets/csharp/System.IO/StreamWriter/.ctor/program1.cs._

## StreamWriter.StreamWriter(String) constructor

```csharp
public StreamWriter (string path);
```

Initializes a new instance of the `StreamWriter` class for the specified file by using the default encoding and buffer size.

Parameters:

- `path`: The complete file path to write to. `path` can be a file name.

Exceptions:

- `UnauthorizedAccessException`: Access is denied.
- `ArgumentException`: `path` is an empty string ("").

-or-

`path` contains the name of a system device (com1, com2, and so on).
- `ArgumentNullException`: `path` is `null`.
- `DirectoryNotFoundException`: The specified path is invalid (for example, it is on an unmapped drive).
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `IOException`: `path` includes an incorrect or invalid syntax for file name, directory name, or volume label syntax.
- `SecurityException`: The caller does not have the required permission.

#### Remarks
This constructor creates a `StreamWriter` with UTF-8 encoding without a Byte-Order Mark (BOM), so its `Encoding.GetPreamble` method returns an empty byte array. The default UTF-8 encoding for this constructor throws an exception on invalid bytes. This behavior is different from the behavior provided by the encoding object in the `UTF8` property. To specify a BOM and determine whether an exception is thrown on invalid bytes, use a constructor that accepts an encoding object as a parameter, such as `%23ctor`.

The `path` parameter can be a file name, including a file on a Universal Naming Convention (UNC) share. If the file exists, it is overwritten; otherwise, a new file is created.

The `path` parameter is not required to be a file stored on disk; it can be any part of a system that supports access using streams.

> **Caution:**
> When you compile a set of characters with a particular cultural setting and retrieve those same characters with a different cultural setting, the characters might not be interpretable and could cause an exception to be thrown.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following code example demonstrates this constructor.

_Code sample not included: ~/snippets/csharp/System.IO/StreamWriter/.ctor/program5.cs._

## StreamWriter.StreamWriter(Stream, Encoding) constructor

```csharp
public StreamWriter (System.IO.Stream stream, System.Text.Encoding? encoding);
```

Initializes a new instance of the `StreamWriter` class for the specified stream by using the specified encoding and the default buffer size.

Parameters:

- `stream`: The stream to write to.
- `encoding`: The character encoding to use.

Exceptions:

- `ArgumentNullException`: `stream` or `encoding` is `null`.
- `ArgumentException`: `stream` is not writable.

#### Remarks
This constructor initializes the `Encoding` property using the encoding parameter, and the `BaseStream` property using the stream parameter. The position of the stream is not reset. For additional information, see `TextWriter.Encoding`.

The `StreamWriter` object calls `Dispose` on the provided `Stream` object when `StreamWriter.Dispose` is called.

> **Caution:**
> When you compile a set of characters with a particular cultural setting and retrieve those same characters with a different cultural setting, the characters might not be interpretable, and could cause an exception to be thrown.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example demonstrates this constructor.

_Code sample not included: ~/snippets/csharp/System.IO/StreamWriter/.ctor/program2.cs._

## StreamWriter.StreamWriter(String, Boolean) constructor

```csharp
public StreamWriter (string path, bool append);
```

Initializes a new instance of the `StreamWriter` class for the specified file by using the default encoding and buffer size. If the file exists, it can be either overwritten or appended to. If the file does not exist, this constructor creates a new file.

Parameters:

- `path`: The complete file path to write to.
- `append`: `true` to append data to the file; `false` to overwrite the file. If the specified file does not exist, this parameter has no effect, and the constructor creates a new file.

Exceptions:

- `UnauthorizedAccessException`: Access is denied.
- `ArgumentException`: `path` is empty.

-or-

`path` contains the name of a system device (com1, com2, and so on).
- `ArgumentNullException`: `path` is `null`.
- `DirectoryNotFoundException`: The specified path is invalid (for example, it is on an unmapped drive).
- `IOException`: `path` includes an incorrect or invalid syntax for file name, directory name, or volume label syntax.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `SecurityException`: The caller does not have the required permission.

#### Remarks
This constructor creates a `StreamWriter` with UTF-8 encoding without a Byte-Order Mark (BOM), so its `Encoding.GetPreamble` method returns an empty byte array. The default UTF-8 encoding for this constructor throws an exception on invalid bytes. This behavior is different from the behavior provided by the encoding object in the `UTF8` property. To specify a BOM and determine whether an exception is thrown on invalid bytes, use a constructor that accepts an encoding object as a parameter, such as `%23ctor`.

The `path` parameter can be a file name, including a file on a Universal Naming Convention (UNC) share.

The `path` parameter is not required to be a file stored on disk; it can be any part of a system that supports access using streams.

> **Caution:**
> When you compile a set of characters with a particular cultural setting and retrieve those same characters with a different cultural setting, the characters might not be interpretable, and could cause an exception to be thrown.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following code example demonstrates this constructor.

_Code sample not included: ~/snippets/csharp/System.IO/StreamWriter/.ctor/program6.cs._

## StreamWriter.StreamWriter(String, FileStreamOptions) constructor

```csharp
public StreamWriter (string path, System.IO.FileStreamOptions options);
```

Initializes a new instance of the `StreamWriter` class for the specified file, using the default encoding, and configured with the specified `FileStreamOptions` object.

Parameters:

- `path`: The complete file path to write to.
- `options`: An object that specifies the configuration options for the underlying `FileStream`.

Exceptions:

- `ArgumentNullException`: `options` is `null`
.
- `ArgumentException`: `path` is not writable.

To be added.

## StreamWriter.StreamWriter(Stream, Encoding, Int32) constructor

```csharp
public StreamWriter (System.IO.Stream stream, System.Text.Encoding? encoding, int bufferSize);
```

Initializes a new instance of the `StreamWriter` class for the specified stream by using the specified encoding and buffer size.

Parameters:

- `stream`: The stream to write to.
- `encoding`: The character encoding to use.
- `bufferSize`: The buffer size, in characters.

Exceptions:

- `ArgumentNullException`: `stream` or `encoding` is `null`.
- `ArgumentOutOfRangeException`: `bufferSize` is less than or equal to zero, except for -1, which is allowed to indicate the default buffer size.
- `ArgumentException`: `stream` is not writable.

#### Remarks
This constructor initializes the `Encoding` property using the `encoding` parameter, and the `BaseStream` property using the `stream` parameter. The position of the stream is not reset. For additional information, see `TextWriter.Encoding`.

The `StreamWriter` object calls `Dispose` on the provided `Stream` object when `StreamWriter.Dispose` is called.

> **Caution:**
> When you compile a set of characters with a particular cultural setting and retrieve those same characters with a different cultural setting, the characters might not be interpretable, and could cause an exception to be thrown.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example demonstrates this constructor.

_Code sample not included: ~/snippets/csharp/System.IO/StreamWriter/.ctor/program3.cs._

## StreamWriter.StreamWriter(String, Boolean, Encoding) constructor

```csharp
public StreamWriter (string path, bool append, System.Text.Encoding? encoding);
```

Initializes a new instance of the `StreamWriter` class for the specified file by using the specified encoding and default buffer size. If the file exists, it can be either overwritten or appended to. If the file does not exist, this constructor creates a new file.

Parameters:

- `path`: The complete file path to write to.
- `append`: `true` to append data to the file; `false` to overwrite the file. If the specified file does not exist, this parameter has no effect, and the constructor creates a new file.
- `encoding`: The character encoding to use.

Exceptions:

- `UnauthorizedAccessException`: Access is denied.
- `ArgumentException`: `path` is empty.

-or-

`path` contains the name of a system device (com1, com2, and so on).
- `ArgumentNullException`: `path` is `null`.
- `DirectoryNotFoundException`: The specified path is invalid (for example, it is on an unmapped drive).
- `IOException`: `path` includes an incorrect or invalid syntax for file name, directory name, or volume label syntax.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `SecurityException`: The caller does not have the required permission.

#### Remarks
This constructor initializes the `Encoding` property using the encoding parameter. For additional information, see `TextWriter.Encoding`.

`path` can be a file name, including a file on a Universal Naming Convention (UNC) share.

`path` is not required to be a file stored on disk; it can be any part of a system that supports access via streams.

> **Caution:**
> When you compile a set of characters with a particular cultural setting and retrieve those same characters with a different cultural setting, the characters might not be interpretable, and could cause an exception to be thrown.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example demonstrates this constructor.

_Code sample not included: ~/snippets/csharp/System.IO/StreamWriter/.ctor/program7.cs._

## StreamWriter.StreamWriter(String, Encoding, FileStreamOptions) constructor

```csharp
public StreamWriter (string path, System.Text.Encoding? encoding, System.IO.FileStreamOptions options);
```

Initializes a new instance of the `StreamWriter` class for the specified file, using the specified encoding, and configured with the specified `FileStreamOptions` object.

Parameters:

- `path`: The complete file path to write to.
- `encoding`: The character encoding to use.
- `options`: An object that specifies the configuration options for the underlying `FileStream`.

Exceptions:

- `ArgumentNullException`: `options` is `null`
.
- `ArgumentException`: `path` is not writable.

To be added.
