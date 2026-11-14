---
title: "MemoryStream class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/MemoryStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MemoryStream class

Namespace: `System.IO`

```csharp
public class MemoryStream : System.IO.Stream
```

Creates a stream whose backing store is memory.

#### Remarks
The current position of a stream is the position at which the next read or write operation could take place. The current position can be retrieved or set through the `MemoryStream.Seek` method. When a new instance of `MemoryStream` is created, the current position is set to zero.

Memory streams created with an unsigned byte array provide a non-resizable stream of the data. When using a byte array, you can neither append to nor shrink the stream, although you might be able to modify the existing contents depending on the parameters passed into the constructor. Empty memory streams are resizable, and can be written to and read from.

If a `MemoryStream` object is added to a ResX file or a .resources file, call the `ResourceManager.GetStream` method at runtime to retrieve it.

If a `MemoryStream` object is serialized to a resource file it will actually be serialized as an `UnmanagedMemoryStream`. This behavior provides better performance, as well as the ability to get a pointer to the data directly, without having to go through `Stream` methods.

#### Examples
The following code example shows how to read and write data using memory as a backing store.

_Code sample not included: ~/snippets/csharp/System.IO/MemoryStream/Overview/memstream.cs._

## MemoryStream.MemoryStream() constructor

```csharp
public MemoryStream ();
```

Initializes a new instance of the `MemoryStream` class with an expandable capacity initialized to zero.

#### Remarks
The `MemoryStream.CanRead`, `MemoryStream.CanSeek`, and `MemoryStream.CanWrite` properties are all set to `true`.

The capacity of the current stream automatically increases when you use the `MemoryStream.SetLength` method to set the length to a value larger than the capacity of the current stream.

This constructor exposes the underlying stream, which `MemoryStream.GetBuffer` returns.

## MemoryStream.MemoryStream(Byte[]) constructor

```csharp
public MemoryStream (byte[] buffer);
```

Initializes a new non-resizable instance of the `MemoryStream` class based on the specified byte array.

Parameters:

- `buffer`: The array of unsigned bytes from which to create the current stream.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.

#### Remarks
The `MemoryStream.CanRead`, `MemoryStream.CanSeek`, and `MemoryStream.CanWrite` properties are all set to `true`. `MemoryStream.Capacity` is set to the length of the specified byte array. The new stream can be written to, but is not resizable.

The length of the stream cannot be set to a value greater than the initial length of the specified byte array; however, the stream can be truncated (see `MemoryStream.SetLength`).

This constructor does not expose the underlying stream. `MemoryStream.GetBuffer` throws `UnauthorizedAccessException`.

## MemoryStream.MemoryStream(Int32) constructor

```csharp
public MemoryStream (int capacity);
```

Initializes a new instance of the `MemoryStream` class with an expandable capacity initialized as specified.

Parameters:

- `capacity`: The initial size of the internal array in bytes.

Exceptions:

- `ArgumentOutOfRangeException`: `capacity` is negative.

-or-

In .NET 11 and later versions, `capacity` is greater than <see cref="P:System.Array.MaxLength">Array.MaxLength</see>.

#### Remarks
The `MemoryStream.CanRead`, `MemoryStream.CanSeek`, and `MemoryStream.CanWrite` properties are all set to `true`.

The capacity automatically increases when you use the `MemoryStream.SetLength` method to set the length to a value larger than the capacity of the current stream. Except for a `MemoryStream` constructed with a byte[] parameter, write operations at the end of a `MemoryStream` expand the `MemoryStream`.

This constructor exposes the underlying stream that `MemoryStream.GetBuffer` returns.

#### Examples
This code example is part of a larger example provided for the `MemoryStream` class.

_Code sample not included: ~/snippets/csharp/System.IO/MemoryStream/Overview/memstream.cs._

## MemoryStream.MemoryStream(Byte[], Boolean) constructor

```csharp
public MemoryStream (byte[] buffer, bool writable);
```

Initializes a new non-resizable instance of the `MemoryStream` class based on the specified byte array with the `MemoryStream.CanWrite` property set as specified.

Parameters:

- `buffer`: The array of unsigned bytes from which to create this stream.
- `writable`: The setting of the `MemoryStream.CanWrite` property, which determines whether the stream supports writing.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.

#### Remarks
The `MemoryStream.CanRead` and `MemoryStream.CanSeek` properties are both set to `true`. `MemoryStream.Capacity` is set to the length of the specified byte array.

The length of the stream cannot be set to a value greater than the initial length of the specified byte array; however, the stream can be truncated (see `MemoryStream.SetLength`).

This constructor does not expose the underlying stream. `MemoryStream.GetBuffer` throws `UnauthorizedAccessException`.

## MemoryStream.MemoryStream(Byte[], Int32, Int32) constructor

```csharp
public MemoryStream (byte[] buffer, int index, int count);
```

Initializes a new non-resizable instance of the `MemoryStream` class based on the specified region (index) of a byte array.

Parameters:

- `buffer`: The array of unsigned bytes from which to create this stream.
- `index`: The index into `buffer` at which the stream begins.
- `count`: The length of the stream in bytes.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `index` or `count` is less than zero.
- `ArgumentException`: The buffer length minus `index` is less than `count`.

#### Remarks
The `CanRead`, `CanSeek`, and `CanWrite` properties are all set to `true`, but the capacity cannot be changed. `MemoryStream.Capacity` is set to `count`.

The length of the stream cannot be set to a value greater than the initial length of the specified byte array; however, the stream can be truncated (see `MemoryStream.SetLength`).

This constructor does not expose the underlying stream. `MemoryStream.GetBuffer` throws `UnauthorizedAccessException`. However, you can write to the stream.

## MemoryStream.MemoryStream(Byte[], Int32, Int32, Boolean) constructor

```csharp
public MemoryStream (byte[] buffer, int index, int count, bool writable);
```

Initializes a new non-resizable instance of the `MemoryStream` class based on the specified region of a byte array, with the `MemoryStream.CanWrite` property set as specified.

Parameters:

- `buffer`: The array of unsigned bytes from which to create this stream.
- `index`: The index in `buffer` at which the stream begins.
- `count`: The length of the stream in bytes.
- `writable`: The setting of the `MemoryStream.CanWrite` property, which determines whether the stream supports writing.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `index` or `count` are negative.
- `ArgumentException`: The buffer length minus `index` is less than `count`.

#### Remarks
The `CanRead` and `CanSeek` properties are both set to `true`. `Capacity` is set to `count`.

The length of the stream cannot be set to a value greater than the initial length of the specified byte array; however, the stream can be truncated (see `MemoryStream.SetLength`).

This constructor does not expose the underlying stream. `MemoryStream.GetBuffer` throws `UnauthorizedAccessException`. However, you can write to the stream if `writable` is `true`.

## MemoryStream.MemoryStream(Byte[], Int32, Int32, Boolean, Boolean) constructor

```csharp
public MemoryStream (byte[] buffer, int index, int count, bool writable, bool publiclyVisible);
```

Initializes a new instance of the `MemoryStream` class based on the specified region of a byte array, with the `MemoryStream.CanWrite` property set as specified, and the ability to call `MemoryStream.GetBuffer` set as specified.

Parameters:

- `buffer`: The array of unsigned bytes from which to create this stream.
- `index`: The index into `buffer` at which the stream begins.
- `count`: The length of the stream in bytes.
- `writable`: The setting of the `MemoryStream.CanWrite` property, which determines whether the stream supports writing.
- `publiclyVisible`: `true` to enable `MemoryStream.GetBuffer`, which returns the unsigned byte array from which the stream was created; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `index` or `count` is negative.
- `ArgumentException`: The buffer length minus `index` is less than `count`.

#### Remarks
The `CanRead` and `CanSeek` properties are both set to `true`. `Capacity` is set to `count`.

The new stream instance can be written to, but the `MemoryStream.Capacity` of the underlying byte array cannot be changed. The length of the stream cannot be set to a value greater than the initial length of the specified byte array; however, the stream can be truncated (see `MemoryStream.SetLength`).

## MemoryStream.CanRead property

```csharp
public override bool CanRead { get; }
```

Gets a value indicating whether the current stream supports reading.

Returns: `true` if the stream is open.

#### Remarks
If a class derived from `Stream` does not support reading, calls to the `MemoryStream.Read` and `MemoryStream.ReadByte` methods throw a `NotSupportedException`.

If the stream is closed, this property returns `false`.

## MemoryStream.CanSeek property

```csharp
public override bool CanSeek { get; }
```

Gets a value indicating whether the current stream supports seeking.

Returns: `true` if the stream is open.

#### Remarks
If a class derived from `Stream` does not support seeking, calls to `MemoryStream.Length`, `MemoryStream.SetLength`, `MemoryStream.Position`, and `MemoryStream.Seek` throw a `NotSupportedException`.

If the stream is closed, this property returns `false`.

## MemoryStream.CanWrite property

```csharp
public override bool CanWrite { get; }
```

Gets a value indicating whether the current stream supports writing.

Returns: `true` if the stream supports writing; otherwise, `false`.

#### Remarks
If a class derived from `Stream` does not support writing, a call to `Stream.SetLength`, `Stream.Write`, or `Stream.WriteByte` throws a `NotSupportedException`.

If the stream is closed, this property returns `false`.

## MemoryStream.Capacity property

```csharp
public virtual int Capacity { get; set; }
```

Gets or sets the number of bytes allocated for this stream.

Returns: The length of the usable portion of the buffer for the stream.

Exceptions:

- `ArgumentOutOfRangeException`: A capacity is set that is negative or less than the current length of the stream.

-or-

In .NET 11 and later versions, the value being set is greater than <see cref="P:System.Array.MaxLength">Array.MaxLength</see>.
- `ObjectDisposedException`: The current stream is closed.
- `NotSupportedException`: `set` is invoked on a stream whose capacity cannot be modified.

`Capacity` is the buffer length for system-provided byte arrays. `Capacity` cannot be set to a value less than the current length of the stream.

#### Examples

This code example is part of a larger example provided for the `MemoryStream` class.

_Code sample not included: ~/snippets/csharp/System.IO/MemoryStream/Overview/memstream.cs._

## MemoryStream.Length property

```csharp
public override long Length { get; }
```

Gets the length of the stream in bytes.

Returns: The length of the stream in bytes.

Exceptions:

- `ObjectDisposedException`: The stream is closed.

#### Examples
This code example is part of a larger example provided for the `MemoryStream` class.

_Code sample not included: ~/snippets/csharp/System.IO/MemoryStream/Overview/memstream.cs._

## MemoryStream.Position property

```csharp
public override long Position { get; set; }
```

Gets or sets the current position within the stream.

Returns: The current position within the stream.

Exceptions:

- `ArgumentOutOfRangeException`: The position is set to a negative value or a value greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.
- `ObjectDisposedException`: The stream is closed.

#### Examples
This code example is part of a larger example provided for the `MemoryStream` class.

_Code sample not included: ~/snippets/csharp/System.IO/MemoryStream/Overview/memstream.cs._

## MemoryStream.BeginRead(Byte[], Int32, Int32, AsyncCallback, Object) method

```csharp
public override IAsyncResult BeginRead (byte[] buffer, int offset, int count, AsyncCallback? callback, object? state);
```

Begins an asynchronous read operation. (Consider using `MemoryStream.ReadAsync` instead.)

Parameters:

- `buffer`: The buffer to read the data into.
- `offset`: The byte offset in `buffer` at which to begin writing data read from the memory stream.
- `count`: The maximum number of bytes to read.
- `callback`: An optional asynchronous callback, to be called when the read is complete.
- `state`: A user-provided object that distinguishes this particular asynchronous read request from other requests.

Returns: An `IAsyncResult` that represents the asynchronous read, which could still be pending.

Exceptions:

- `IOException`: Attempted an asynchronous read past the end of the memory stream, or a disk error occurred.
- `ArgumentException`: One or more of the arguments is invalid.
- `ObjectDisposedException`: Methods were called after the memory stream was closed.
- `NotSupportedException`: The current memory stream implementation does not support the read operation.

#### Remarks

Refer to the `Stream.BeginRead` remarks for additional usage information for this method.
