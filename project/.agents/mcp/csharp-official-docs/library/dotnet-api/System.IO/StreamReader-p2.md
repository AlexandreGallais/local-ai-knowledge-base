---
title: "StreamReader class (part 2 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/StreamReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StreamReader class (part 2 of 4)

## StreamReader.StreamReader(Stream, Encoding, Boolean) constructor

```csharp
public StreamReader (System.IO.Stream stream, System.Text.Encoding? encoding, bool detectEncodingFromByteOrderMarks);
```

Initializes a new instance of the `StreamReader` class for the specified stream, with the specified character encoding and byte order mark detection option.

Parameters:

- `stream`: The stream to be read.
- `encoding`: The character encoding to use.
- `detectEncodingFromByteOrderMarks`: Indicates whether to look for byte order marks at the beginning of the file.

Exceptions:

- `ArgumentException`: `stream` does not support reading.
- `ArgumentNullException`: `stream` or `encoding` is `null`.

#### Remarks
This constructor initializes the encoding as specified by the `encoding` parameter, the `BaseStream` property using the `stream` parameter, and the internal buffer size to 1024 bytes.

The `detectEncodingFromByteOrderMarks` parameter detects the encoding by looking at the first four bytes of the stream. It automatically recognizes UTF-8, little-endian UTF-16, big-endian UTF-16, little-endian UTF-32, and big-endian UTF-32 text if the file starts with the appropriate byte order marks. Otherwise, the user-provided encoding is used. See the `Encoding.GetPreamble` method for more information.

The `StreamReader` object calls `Dispose` on the provided `Stream` object when `StreamReader.Dispose` is called.

> **Caution:**
> When you compile a set of characters with a particular cultural setting and retrieve those same characters with a different cultural setting, the characters might not be interpretable, and could cause an exception to be thrown.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following code example demonstrates this `StreamReader` constructor.

_Code sample not included: ~/snippets/csharp/System.IO/StreamReader/Overview/streamreadersample.cs._

## StreamReader.StreamReader(String, Encoding, Boolean) constructor

```csharp
public StreamReader (string path, System.Text.Encoding? encoding, bool detectEncodingFromByteOrderMarks);
```

Initializes a new instance of the `StreamReader` class for the specified file name, with the specified character encoding and byte order mark detection option.

Parameters:

- `path`: The complete file path to be read.
- `encoding`: The character encoding to use.
- `detectEncodingFromByteOrderMarks`: Indicates whether to look for byte order marks at the beginning of the file.

Exceptions:

- `ArgumentException`: `path` is an empty string ("").
- `ArgumentNullException`: `path` or `encoding` is `null`.
- `FileNotFoundException`: The file cannot be found.
- `DirectoryNotFoundException`: The specified path is invalid, such as being on an unmapped drive.
- `NotSupportedException`: `path` includes an incorrect or invalid syntax for file name, directory name, or volume label.

#### Remarks
This constructor initializes the encoding as specified by the `encoding` parameter, and the internal buffer size to 1024 bytes.

The `detectEncodingFromByteOrderMarks` parameter detects the encoding by looking at the first four bytes of the stream. It automatically recognizes UTF-8, little-endian UTF-16, big-endian UTF-16, little-endian UTF-32, and big-endian UTF-32 text if the file starts with the appropriate byte order marks. Otherwise, the user-provided encoding is used. See the `Encoding.GetPreamble` method for more information.

The `path` parameter can be a file name, including a file on a Universal Naming Convention (UNC) share.

The `path` parameter is not required to be a file stored on disk; it can be any part of a system that supports access using streams.

> **Caution:**
> When you compile a set of characters with a particular cultural setting and retrieve those same characters with a different cultural setting, the characters might not be interpretable, and could cause an exception to be thrown.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following code example demonstrates this `StreamReader` constructor.

_Code sample not included: ~/snippets/csharp/System.IO/StreamReader/Overview/streamreadersample.cs._

## StreamReader.StreamReader(Stream, Encoding, Boolean, Int32) constructor

```csharp
public StreamReader (System.IO.Stream stream, System.Text.Encoding? encoding, bool detectEncodingFromByteOrderMarks, int bufferSize);
```

Initializes a new instance of the `StreamReader` class for the specified stream, with the specified character encoding, byte order mark detection option, and buffer size.

Parameters:

- `stream`: The stream to be read.
- `encoding`: The character encoding to use.
- `detectEncodingFromByteOrderMarks`: Indicates whether to look for byte order marks at the beginning of the file.
- `bufferSize`: The minimum buffer size, in bytes.

Exceptions:

- `ArgumentException`: The stream does not support reading.
- `ArgumentNullException`: `stream` or `encoding` is `null`.
- `ArgumentOutOfRangeException`: `bufferSize` is less than or equal to zero, except for -1, which is allowed to indicate the default buffer size.

#### Remarks
The buffer size, in bytes, is set by the `bufferSize` parameter. If `bufferSize` is less than the minimum allowable size (128 bytes), the minimum allowable size is used.

This constructor allows you to change the encoding the first time you read from the `StreamReader` object. The `detectEncodingFromByteOrderMarks` parameter detects the encoding by looking at the first four bytes of the stream. It automatically recognizes UTF-8, little-endian UTF-16, big-endian UTF-16, little-endian UTF-32, and big-endian UTF-32 text if the file starts with the appropriate byte order marks. Otherwise, the user-provided encoding is used. See the `Encoding.GetPreamble` method for more information.

The `StreamReader` object calls `Dispose` on the provided `Stream` object when `StreamReader.Dispose` is called.

> **Note:**
> When reading from a `Stream`, it is more efficient to use a buffer that is the same size as the internal buffer of the stream.

> **Caution:**
> When you compile a set of characters with a particular cultural setting and retrieve those same characters with a different cultural setting, the characters might not be interpretable, and could cause an exception to be thrown.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following code example demonstrates this `StreamReader` constructor.

_Code sample not included: ~/snippets/csharp/System.IO/StreamReader/Overview/streamreadersample.cs._

## StreamReader.StreamReader(String, Encoding, Boolean, Int32) constructor

```csharp
public StreamReader (string path, System.Text.Encoding? encoding, bool detectEncodingFromByteOrderMarks, int bufferSize);
```

Initializes a new instance of the `StreamReader` class for the specified file name, with the specified character encoding, byte order mark detection option, and buffer size.

Parameters:

- `path`: The complete file path to be read.
- `encoding`: The character encoding to use.
- `detectEncodingFromByteOrderMarks`: Indicates whether to look for byte order marks at the beginning of the file.
- `bufferSize`: The minimum buffer size, in bytes.

Exceptions:

- `ArgumentException`: `path` is an empty string ("").
- `ArgumentNullException`: `path` or `encoding` is `null`.
- `FileNotFoundException`: The file cannot be found.
- `DirectoryNotFoundException`: The specified path is invalid, such as being on an unmapped drive.
- `NotSupportedException`: `path` includes an incorrect or invalid syntax for file name, directory name, or volume label.
- `ArgumentOutOfRangeException`: `bufferSize` is less than or equal to zero, except for -1, which is allowed to indicate the default buffer size.

#### Remarks
This constructor initializes the encoding as specified by the `encoding` parameter.

This constructor allows you to change the encoding the first time you read from the `StreamReader` object. The `detectEncodingFromByteOrderMarks` parameter detects the encoding by looking at the first four bytes of the stream. It automatically recognizes UTF-8, little-endian UTF-16, big-endian UTF-16, little-endian UTF-32, and big-endian UTF-32 text if the file starts with the appropriate byte order marks. Otherwise, the user-provided encoding is used. See the `Encoding.GetPreamble` method for more information.

The buffer size, in bytes, is set by the `bufferSize` parameter. If `bufferSize` is less than the minimum allowable size (128 bytes), the minimum allowable size is used.

The `path` parameter can be a file name, including a file on a Universal Naming Convention (UNC) share.

The `path` parameter is not required to be a file stored on disk; it can be any part of a system that supports access using streams.

> **Caution:**
> When you compile a set of characters with a particular cultural setting and retrieve those same characters with a different cultural setting, the characters might not be interpretable, and could cause an exception to be thrown.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following code example demonstrates this `StreamReader` constructor.

_Code sample not included: ~/snippets/csharp/System.IO/StreamReader/Overview/streamreadersample.cs._

## StreamReader.StreamReader(String, Encoding, Boolean, FileStreamOptions) constructor

```csharp
public StreamReader (string path, System.Text.Encoding? encoding, bool detectEncodingFromByteOrderMarks, System.IO.FileStreamOptions options);
```

Initializes a new instance of the `StreamReader` class for the specified file path, with the specified character encoding, byte order mark detection option, and configured with the specified `FileStreamOptions` object.

Parameters:

- `path`: The complete file path to be read.
- `encoding`: The character encoding to use.
- `detectEncodingFromByteOrderMarks`: Indicates whether to look for byte order marks at the beginning of the file.
- `options`: An object that specifies the configuration options for the underlying `FileStream`.

Exceptions:

- `ArgumentException`: `path` is not readable.

-or-

`path` is an empty string ("").
- `ArgumentNullException`: `path` or `encoding` or `options` is `null`.
- `FileNotFoundException`: The file cannot be found.
- `DirectoryNotFoundException`: The specified path is invalid, such as being on an unmapped drive.
- `NotSupportedException`: `path` includes an incorrect or invalid syntax for file name, directory name, or volume label.

To be added.

## StreamReader.StreamReader(Stream, Encoding, Boolean, Int32, Boolean) constructor

```csharp
public StreamReader (System.IO.Stream stream, System.Text.Encoding? encoding = default, bool detectEncodingFromByteOrderMarks = true, int bufferSize = -1, bool leaveOpen = false);
```

Initializes a new instance of the `StreamReader` class for the specified stream based on the specified character encoding, byte order mark detection option, and buffer size, and optionally leaves the stream open.

Parameters:

- `stream`: The stream to read.
- `encoding`: The character encoding to use.
- `detectEncodingFromByteOrderMarks`: `true` to look for byte order marks at the beginning of the file; otherwise, `false`.
- `bufferSize`: The minimum buffer size, in bytes.
- `leaveOpen`: `true` to leave the stream open after the `StreamReader` object is disposed; otherwise, `false`.

#### Remarks
Unless you set the `leaveOpen` parameter to `true`, the `StreamReader` object calls `Dispose` on the provided `Stream` object when `StreamReader.Dispose` is called.

The buffer size, in bytes, is set by the `bufferSize` parameter. If `bufferSize` is less than the minimum allowable size (128 bytes), the minimum allowable size is used.

This constructor enables you to change the encoding the first time you read from the `StreamReader` object. If the `detectEncodingFromByteOrderMarks` parameter is `true`, the constructor detects the encoding by looking at the first four bytes of the stream. It automatically recognizes UTF-8, little-endian UTF-16, big-endian UTF-16, little-endian UTF-32, and big-endian UTF-32 text if the file starts with the appropriate byte order marks. Otherwise, the user-provided encoding is used. See the `Encoding.GetPreamble` method for more information.

> **Note:**
> When reading from a `Stream`, it is more efficient to use a buffer that is the same size as the internal buffer of the stream.

> **Caution:**
> When you compile a set of characters with a particular cultural setting and retrieve those same characters with a different cultural setting, the characters might not be interpreted correctly, and could cause an exception to be thrown.

## StreamReader.BaseStream property

```csharp
public virtual System.IO.Stream BaseStream { get; }
```

Returns the underlying stream.

Returns: The underlying stream.

#### Remarks
You use this property to access the underlying stream. The `StreamReader` class buffers input from the underlying stream when you call one of the `StreamReader.Read` methods. If you manipulate the position of the underlying stream after reading data into the buffer, the position of the underlying stream might not match the position of the internal buffer. To reset the internal buffer, call the `StreamReader.DiscardBufferedData` method; however, this method slows performance and should be called only when absolutely necessary. The `StreamReader` constructors that have the `detectEncodingFromByteOrderMarks` parameter can change the encoding the first time you read from the `StreamReader` object.

For a list of common I/O tasks, see Common I/O Tasks.

## StreamReader.CurrentEncoding property

```csharp
public virtual System.Text.Encoding CurrentEncoding { get; }
```

Gets the current character encoding that the current `StreamReader` object is using.

Returns: The current character encoding used by the current reader. The value can be different after the first call to any `Read` method of `StreamReader`, since encoding autodetection is not done until the first call to a `Read` method.

#### Remarks
For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following code example gets the encoding of the specified `StreamReader` object.

_Code sample not included: ~/snippets/csharp/System.IO/StreamReader/CurrentEncoding/strmreader currentencoding.cs._

## StreamReader.EndOfStream property

```csharp
public bool EndOfStream { get; }
```

Gets a value that indicates whether the current stream position is at the end of the stream.

Returns: `true` if the current stream position is at the end of the stream; otherwise `false`.

Exceptions:

- `ObjectDisposedException`: The underlying stream has been disposed.

If the instance hasn't yet received an indication from the underlying stream that the stream has reached the end, the property will issue a synchronous read operation on the stream.
