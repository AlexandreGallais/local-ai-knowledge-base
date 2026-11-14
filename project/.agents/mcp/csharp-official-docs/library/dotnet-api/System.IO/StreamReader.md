---
title: "StreamReader class (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/StreamReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StreamReader class

Namespace: `System.IO`

```csharp
public class StreamReader : System.IO.TextReader
```

Implements a `TextReader` that reads characters from a byte stream in a particular encoding.

#### Remarks
`StreamReader` is designed for character input in a particular encoding, whereas the `Stream` class is designed for byte input and output. Use `StreamReader` for reading lines of information from a standard text file.

> **Important:**
> This type implements the `IDisposable` interface. When you've finished using the type, you should dispose of it either directly (by calling its `Dispose` method) or indirectly (with a language construct such as `using` in C#). For more information, see Use an object that implements IDisposable.

`StreamReader` defaults to UTF-8 encoding unless specified otherwise, instead of defaulting to the ANSI code page for the current system. UTF-8 handles Unicode characters correctly and provides consistent results on localized versions of the operating system. If you get the current character encoding using the `CurrentEncoding` property, the value is not reliable until after the first `StreamReader.Read` method, since encoding auto detection is not done until the first call to a `StreamReader.Read` method.

By default, a `StreamReader` is not thread safe. See `TextReader.Synchronized` for a thread-safe wrapper.

The `Read` and `Write` method overloads read and write the number of characters specified by the `count` parameter. These are to be distinguished from `BufferedStream.Read` and `BufferedStream.Write`, which read and write the number of bytes specified by the `count` parameter. Use the `BufferedStream` methods only for reading and writing an integral number of byte array elements.

> **Note:**
> When reading from a `Stream`, it is more efficient to use a buffer that is the same size as the internal buffer of the stream.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example uses an instance of `StreamReader` to read text from a file. The constructor used in this example is not supported for use in Windows Store Apps.

_Code sample not included: ~/snippets/csharp/System.IO/StreamReader/Overview/readtextfile.cs._

The following example instantiates a `StreamReader` object and calls its `StreamReader.ReadAsync` method to read a file asynchronously.

_Code sample not included: ~/snippets/csharp/System.IO/StreamReader/Overview/asyncex1.cs._

## StreamReader.StreamReader(Stream) constructor

```csharp
public StreamReader (System.IO.Stream stream);
```

Initializes a new instance of the `StreamReader` class for the specified stream.

Parameters:

- `stream`: The stream to be read.

Exceptions:

- `ArgumentException`: `stream` does not support reading.
- `ArgumentNullException`: `stream` is `null`.

#### Remarks
This constructor initializes the encoding to `UTF8Encoding`, the `BaseStream` property using the `stream` parameter, and the internal buffer size to 1024 bytes.

The `StreamReader` object calls `Dispose` on the provided `Stream` object when `StreamReader.Dispose` is called.

> **Caution:**
> When you compile a set of characters with a particular cultural setting and retrieve those same characters with a different cultural setting, the characters might not be interpretable, and could cause an exception to be thrown.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following code example demonstrates this `StreamReader` constructor.

_Code sample not included: ~/snippets/csharp/System.IO/StreamReader/.ctor/strmreader ctor1.cs._

## StreamReader.StreamReader(String) constructor

```csharp
public StreamReader (string path);
```

Initializes a new instance of the `StreamReader` class for the specified file name.

Parameters:

- `path`: The complete file path to be read.

Exceptions:

- `ArgumentException`: `path` is an empty string ("").
- `ArgumentNullException`: `path` is `null`.
- `FileNotFoundException`: The file cannot be found.
- `DirectoryNotFoundException`: The specified path is invalid, such as being on an unmapped drive.
- `IOException`: `path` includes an incorrect or invalid syntax for file name, directory name, or volume label.

#### Remarks
The complete file path is specified by the `path` parameter. This constructor initializes the encoding to `UTF8Encoding` and the buffer size to 1024 bytes.

The `path` parameter can be a file name, including a file on a Universal Naming Convention (UNC) share.

The `path` parameter is not required to be a file stored on disk; it can be any part of a system that supports access using streams.

> **Caution:**
> When you compile a set of characters with a particular cultural setting and retrieve those same characters with a different cultural setting, the characters might not be interpretable, and could cause an exception to be thrown.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following code example demonstrates this `StreamReader` constructor.

_Code sample not included: ~/snippets/csharp/System.IO/StreamReader/.ctor/strmreader ctor2.cs._

## StreamReader.StreamReader(Stream, Boolean) constructor

```csharp
public StreamReader (System.IO.Stream stream, bool detectEncodingFromByteOrderMarks);
```

Initializes a new instance of the `StreamReader` class for the specified stream, with the specified byte order mark detection option.

Parameters:

- `stream`: The stream to be read.
- `detectEncodingFromByteOrderMarks`: Indicates whether to look for byte order marks at the beginning of the file.

Exceptions:

- `ArgumentException`: `stream` does not support reading.
- `ArgumentNullException`: `stream` is `null`.

#### Remarks
This constructor initializes the encoding to `UTF8Encoding`, the `BaseStream` property using the `stream` parameter, and the internal buffer size to 1024 bytes.

The `detectEncodingFromByteOrderMarks` parameter detects the encoding by looking at the first four bytes of the stream. It automatically recognizes UTF-8, little-endian UTF-16, big-endian UTF-16, little-endian UTF-32, and big-endian UTF-32 text if the file starts with the appropriate byte order marks. See the `Encoding.GetPreamble` method for more information.

The `StreamReader` object calls `Dispose` on the provided `Stream` object when `StreamReader.Dispose` is called.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following code example demonstrates this `StreamReader` constructor.

_Code sample not included: ~/snippets/csharp/System.IO/StreamReader/Overview/streamreadersample.cs._

## StreamReader.StreamReader(Stream, Encoding) constructor

```csharp
public StreamReader (System.IO.Stream stream, System.Text.Encoding? encoding);
```

Initializes a new instance of the `StreamReader` class for the specified stream, with the specified character encoding.

Parameters:

- `stream`: The stream to be read.
- `encoding`: The character encoding to use.

Exceptions:

- `ArgumentException`: `stream` does not support reading.
- `ArgumentNullException`: `stream` or `encoding` is `null`.

#### Remarks
The character encoding is set by the `encoding` parameter, and the buffer size is set to 1024 bytes. The `StreamReader` object attempts to  detect the encoding by looking at the first four bytes of the stream. It automatically recognizes UTF-8, little-endian UTF-16, big-endian UTF-16, little-endian UTF-32, and big-endian UTF-32 text if the file starts with the appropriate byte order marks. Otherwise, the user-provided encoding is used. See the `Encoding.GetPreamble` method for more information.

The `StreamReader` object calls `Dispose` on the provided `Stream` object when `StreamReader.Dispose` is called.

> **Caution:**
> When you compile a set of characters with a particular cultural setting and retrieve those same characters with a different cultural setting, the characters might not be interpretable, and could cause an exception to be thrown.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following code example demonstrates this `StreamReader` constructor.

_Code sample not included: ~/snippets/csharp/System.IO/StreamReader/Overview/streamreadersample.cs._

## StreamReader.StreamReader(String, Boolean) constructor

```csharp
public StreamReader (string path, bool detectEncodingFromByteOrderMarks);
```

Initializes a new instance of the `StreamReader` class for the specified file name, with the specified byte order mark detection option.

Parameters:

- `path`: The complete file path to be read.
- `detectEncodingFromByteOrderMarks`: Indicates whether to look for byte order marks at the beginning of the file.

Exceptions:

- `ArgumentException`: `path` is an empty string ("").
- `ArgumentNullException`: `path` is `null`.
- `FileNotFoundException`: The file cannot be found.
- `DirectoryNotFoundException`: The specified path is invalid, such as being on an unmapped drive.
- `IOException`: `path` includes an incorrect or invalid syntax for file name, directory name, or volume label.

#### Remarks
This constructor initializes the encoding to `UTF8Encoding`, the `BaseStream` property using the `stream` parameter, and the internal buffer size to 1024 bytes.

The `path` parameter can be a file name, including a file on a Universal Naming Convention (UNC) share.

The `path` parameter is not required to be a file stored on disk; it can be any part of a system that supports access using streams.

The `detectEncodingFromByteOrderMarks` parameter detects the encoding by looking at the first four bytes of the stream. It automatically recognizes UTF-8, little-endian UTF-16, big-endian UTF-16, little-endian UTF-32, and big-endian UTF-32 text if the file starts with the appropriate byte order marks. Otherwise, the `UTF8Encoding` is used. See the `Encoding.GetPreamble` method for more information.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following code example demonstrates this `StreamReader` constructor.

_Code sample not included: ~/snippets/csharp/System.IO/StreamReader/Overview/streamreadersample.cs._

## StreamReader.StreamReader(String, FileStreamOptions) constructor

```csharp
public StreamReader (string path, System.IO.FileStreamOptions options);
```

Initializes a new instance of the `StreamReader` class for the specified file path, using the default encoding, enabling detection of byte order marks at the beginning of the file, and configured with the specified `FileStreamOptions` object.

Parameters:

- `path`: The complete file path to be read.
- `options`: An object that specifies the configuration options for the underlying `FileStream`.

Exceptions:

- `ArgumentException`: `path` is not readable.

-or-

`path` is an empty string ("").
- `ArgumentNullException`: `path` or `options` is `null`.
- `FileNotFoundException`: The file cannot be found.
- `DirectoryNotFoundException`: The specified path is invalid, such as being on an unmapped drive.
- `IOException`: `path` includes an incorrect or invalid syntax for file name, directory name, or volume label.

To be added.

## StreamReader.StreamReader(String, Encoding) constructor

```csharp
public StreamReader (string path, System.Text.Encoding? encoding);
```

Initializes a new instance of the `StreamReader` class for the specified file name, with the specified character encoding.

Parameters:

- `path`: The complete file path to be read.
- `encoding`: The character encoding to use.

Exceptions:

- `ArgumentException`: `path` is an empty string ("").
- `ArgumentNullException`: `path` or `encoding` is `null`.
- `FileNotFoundException`: The file cannot be found.
- `DirectoryNotFoundException`: The specified path is invalid, such as being on an unmapped drive.
- `NotSupportedException`: `path` includes an incorrect or invalid syntax for file name, directory name, or volume label.

#### Remarks
This constructor initializes the encoding as specified by the `encoding` parameter, and the internal buffer size to 1024 bytes. The `StreamReader` object attempts to  detect the encoding by looking at the first four bytes of the stream. It automatically recognizes UTF-8, little-endian UTF-16, big-endian UTF-16, little-endian UTF-32, and big-endian UTF-32 text if the file starts with the appropriate byte order marks. Otherwise, the user-provided encoding is used. See the `Encoding.GetPreamble` method for more information.

The `path` parameter can be a file name, including a file on a Universal Naming Convention (UNC) share.

The `path` parameter is not required to be a file stored on disk; it can be any part of a system that supports access using streams.

> **Caution:**
> When you compile a set of characters with a particular cultural setting and retrieve those same characters with a different cultural setting, the characters might not be interpretable, and could cause an exception to be thrown.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following code example demonstrates this `StreamReader` constructor.

_Code sample not included: ~/snippets/csharp/System.IO/StreamReader/Overview/streamreadersample.cs._
