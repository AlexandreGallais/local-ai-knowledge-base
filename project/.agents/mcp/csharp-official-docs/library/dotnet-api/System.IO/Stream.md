---
title: "Stream class (part 1 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/Stream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Stream class

Namespace: `System.IO`

```csharp
public abstract class Stream : MarshalByRefObject, IAsyncDisposable, IDisposable
```

Provides a generic view of a sequence of bytes. This is an abstract class.

#### Remarks
`Stream` is the abstract base class of all streams. A stream is an abstraction of a sequence of bytes, such as a file, an input/output device, an inter-process communication pipe, or a TCP/IP socket. The `Stream` class and its derived classes provide a generic view of these different types of input and output, and isolate the programmer from the specific details of the operating system and the underlying devices.

Streams involve three fundamental operations:

- You can read from streams. Reading is the transfer of data from a stream into a data structure, such as an array of bytes.

- You can write to streams. Writing is the transfer of data from a data structure into a stream.

- Streams can support seeking. Seeking refers to querying and modifying the current position within a stream. Seek capability depends on the kind of backing store a stream has. For example, network streams have no unified concept of a current position, and therefore typically do not support seeking.

Some of the more commonly used streams that inherit from `Stream` are `FileStream`, and `MemoryStream`.

Depending on the underlying data source or repository, streams might support only some of these capabilities. You can query a stream for its capabilities by using the `Stream.CanRead`, `Stream.CanWrite`, and `Stream.CanSeek` properties of the `Stream` class.

The `Stream.Read` and `Stream.Write` methods read and write data in a variety of formats. For streams that support seeking, use the `Stream.Seek` and `Stream.SetLength` methods and the `Stream.Position` and `Stream.Length` properties to query and modify the current position and length of a stream.

This type implements the `IDisposable` interface. When you've finished using the type, you should dispose of it either directly (by calling its `Dispose` method) or indirectly (with a language construct such as `using` in C#). For more information, see Use an object that implements IDisposable.

Disposing a `Stream` object flushes any buffered data, and essentially calls the `Stream.Flush` method for you. `Stream.Dispose` also releases operating system resources such as file handles, network connections, or memory used for any internal buffering. The `BufferedStream` class provides the capability of wrapping a buffered stream around another stream in order to improve read and write performance.

The `Stream` class includes async methods to simplify asynchronous operations. An async method contains `Async` in its name, such as `Stream.ReadAsync`, `Stream.WriteAsync`, `Stream.CopyToAsync`, and `Stream.FlushAsync`. These methods enable you to perform resource-intensive I/O operations without blocking the main thread. This performance consideration is particularly important in desktop apps where a time-consuming stream operation can block the UI thread and make your app appear as if it is not working. The async methods are used in conjunction with the `async` and `await` keywords in Visual Basic and C#.

`Stream` includes two extension methods, `WindowsRuntimeStreamExtensions.AsInputStream` and `WindowsRuntimeStreamExtensions.AsOutputStream`, to convert a `Stream` object to a stream in the Windows Runtime. You can also convert a stream in the Windows Runtime to a `Stream` object by using the `WindowsRuntimeStreamExtensions.AsStreamForRead` and `WindowsRuntimeStreamExtensions.AsStreamForWrite` methods. For more information, see How to: Convert Between .NET Streams and Windows Runtime Streams

Some stream implementations perform local buffering of the underlying data to improve performance. For such streams, you can use the `Stream.Flush` or `Stream.FlushAsync` method to clear any internal buffers and ensure that all data has been written to the underlying data source or repository.

If you need a stream with no backing store (also known as a bit bucket), use the `Null` field to retrieve an instance of a stream that is designed for this purpose.

#### Examples
The following example demonstrates how to use two `FileStream` objects to asynchronously copy the files from one directory to another directory. The `FileStream` class derives from the `Stream` class. Notice that the `Click` event handler for the `Button` control is marked with the `async` modifier because it calls an asynchronous method.

_Code sample not included: ~/snippets/csharp/System.IO/FileStream/Overview/example.cs._

## Stream.Stream() constructor

```csharp
protected Stream ();
```

Initializes a new instance of the `Stream` class.

#### Remarks
`Stream` is the abstract base class of all streams.

Some of the more commonly used streams that inherit from `Stream` are `FileStream`, and `MemoryStream`.

## Stream.CanRead property

```csharp
public abstract bool CanRead { get; }
```

When overridden in a derived class, gets a value indicating whether the current stream supports reading.

Returns: `true` if the stream supports reading; otherwise, `false`.

#### Remarks
If a class derived from `Stream` does not support reading, calls to the `Stream.Read`, `Stream.ReadByte`, and `Stream.BeginRead` methods throw a `NotSupportedException`.

#### Examples
The following is an example of using the `CanRead` property.

_Code sample not included: ~/snippets/csharp/System.IO/FileStream/CanRead/source.cs._

## Stream.CanSeek property

```csharp
public abstract bool CanSeek { get; }
```

When overridden in a derived class, gets a value indicating whether the current stream supports seeking.

Returns: `true` if the stream supports seeking; otherwise, `false`.

#### Remarks
If a class derived from `Stream` does not support seeking, calls to `Stream.Length`, `Stream.SetLength`, `Stream.Position`, and `Stream.Seek` may throw a `NotSupportedException`.

## Stream.CanTimeout property

```csharp
public virtual bool CanTimeout { get; }
```

Gets a value that determines whether the current stream can time out.

Returns: A value that determines whether the current stream can time out.

#### Remarks
The `CanTimeout` property always returns `false`. Some stream implementations require different behavior, such as `NetworkStream`, which times out if network connectivity is interrupted or lost. If you are implementing a stream that must be able to time out, this property should be overridden to return `true`.

## Stream.CanWrite property

```csharp
public abstract bool CanWrite { get; }
```

When overridden in a derived class, gets a value indicating whether the current stream supports writing.

Returns: `true` if the stream supports writing; otherwise, `false`.

#### Remarks
If a class derived from `Stream` does not support writing, a call to `Stream.Write`, `Stream.BeginWrite`, or `Stream.WriteByte` throws a `NotSupportedException`. In such cases, `Stream.Flush` is typically implemented as an empty method to ensure full compatibility with other `Stream` types since it's valid to flush a read-only stream.

#### Examples
The following is an example of using the `CanWrite` property.

_Code sample not included: ~/snippets/csharp/System.IO/Stream/CanWrite/source.cs._

## Stream.Length property

```csharp
public abstract long Length { get; }
```

When overridden in a derived class, gets the length in bytes of the stream.

Returns: A long value representing the length of the stream in bytes.

Exceptions:

- `NotSupportedException`: A class derived from `Stream` does not support seeking and the length is unknown.
- `ObjectDisposedException`: Methods were called after the stream was closed.

To be added.

## Stream.Position property

```csharp
public abstract long Position { get; set; }
```

When overridden in a derived class, gets or sets the position within the current stream.

Returns: The current position within the stream.

Exceptions:

- `IOException`: An I/O error occurs.
- `NotSupportedException`: The stream does not support seeking.
- `ObjectDisposedException`: Methods were called after the stream was closed.

#### Remarks
The stream must support seeking to get or set the position. Use the `CanSeek` property to determine whether the stream supports seeking.

Seeking to any location beyond the length of the stream is supported.

## Stream.ReadTimeout property

```csharp
public virtual int ReadTimeout { get; set; }
```

Gets or sets a value, in milliseconds, that determines how long the stream will attempt to read before timing out.

Returns: A value, in milliseconds, that determines how long the stream will attempt to read before timing out.

Exceptions:

- `InvalidOperationException`: The `Stream.ReadTimeout` method always throws an `InvalidOperationException`.

To be added.

## Stream.WriteTimeout property

```csharp
public virtual int WriteTimeout { get; set; }
```

Gets or sets a value, in milliseconds, that determines how long the stream will attempt to write before timing out.

Returns: A value, in milliseconds, that determines how long the stream will attempt to write before timing out.

Exceptions:

- `InvalidOperationException`: The `Stream.WriteTimeout` method always throws an `InvalidOperationException`.

To be added.

## Stream.BeginRead(Byte[], Int32, Int32, AsyncCallback, Object) method

```csharp
public virtual IAsyncResult BeginRead (byte[] buffer, int offset, int count, AsyncCallback? callback, object? state);
```

Begins an asynchronous read operation. (Consider using `Stream.ReadAsync` instead.)

Parameters:

- `buffer`: The buffer to read the data into.
- `offset`: The byte offset in `buffer` at which to begin writing data read from the stream.
- `count`: The maximum number of bytes to read.
- `callback`: An optional asynchronous callback, to be called when the read is complete.
- `state`: A user-provided object that distinguishes this particular asynchronous read request from other requests.

Returns: An `IAsyncResult` that represents the asynchronous read, which could still be pending.

Exceptions:

- `IOException`: Attempted an asynchronous read past the end of the stream, or a disk error occurs.
- `ArgumentException`: One or more of the arguments is invalid.
- `ObjectDisposedException`: Methods were called after the stream was closed.
- `NotSupportedException`: The current `Stream` implementation does not support the read operation.

#### Remarks

This method is available to support legacy code; however, the newer async methods, such as `Stream.ReadAsync`, `Stream.WriteAsync`, `Stream.CopyToAsync`, and `Stream.FlushAsync`, help you implement asynchronous I/O operations more easily.

The default implementation of `BeginRead` on a stream calls the `Stream.Read` method synchronously, which means that `Read` might block on some streams. However, instances of classes such as `FileStream` and `NetworkStream` fully support asynchronous operations if the instances have been opened asynchronously. Therefore, calls to `BeginRead` will not block on those streams. You can override `BeginRead` (by using async delegates, for example) to provide asynchronous behavior.

Pass the `IAsyncResult` return value to the `Stream.EndRead` method of the stream to determine how many bytes were read and to release operating system resources used for reading. `Stream.EndRead` must be called once for every call to `Stream.BeginRead`. You can do this either by using the same code that called `BeginRead` or in a callback passed to `BeginRead`.

The current position in the stream is updated when the asynchronous read or write is issued, not when the I/O operation completes.

Multiple simultaneous asynchronous requests render the request completion order uncertain.

Use the `CanRead` property to determine whether the current instance supports reading.

If a stream is closed or you pass an invalid argument, exceptions are thrown immediately from `BeginRead`. Errors that occur during an asynchronous read request, such as a disk failure during the I/O request, occur on the thread pool thread and throw exceptions when calling `EndRead`.
