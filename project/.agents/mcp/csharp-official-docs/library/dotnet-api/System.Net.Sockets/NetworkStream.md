---
title: "NetworkStream class (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/NetworkStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NetworkStream class

Namespace: `System.Net.Sockets`

```csharp
public class NetworkStream : System.IO.Stream
```

Provides the underlying stream of data for network access.

#### Remarks
The `NetworkStream` class provides methods for sending and receiving data over `Stream` sockets in blocking mode. For more information about blocking versus nonblocking `Socket`s, see Using an Asynchronous Client Socket. You can use the `NetworkStream` class for both synchronous and asynchronous data transfer. For more information about synchronous and asynchronous communication, see Sockets.

To create a `NetworkStream`, you must provide a connected `Socket`. You can also specify what `FileAccess` permission the `NetworkStream` has over the provided `Socket`. By default, closing the `NetworkStream` does not close the provided `Socket`. If you want the `NetworkStream` to have permission to close the provided `Socket`, you must specify `true` for the value of the `ownsSocket` parameter.

Use the `NetworkStream.Write` and `NetworkStream.Read` methods for simple single threaded synchronous blocking I/O. If you want to process your I/O asynchronously, consider using the `Task` or `ValueTask`-based methods `NetworkStream.ReadAsync` and `NetworkStream.WriteAsync`.

The `NetworkStream` does not support random access to the network data stream. The value of the `CanSeek` property, which indicates whether the stream supports seeking, is always `false`; reading the `Position` property, reading the `Length` property, or calling the `NetworkStream.Seek` method will throw a `NotSupportedException`.

Read and write operations can be performed simultaneously on an instance of the `NetworkStream` class without the need for synchronization. As long as there is one unique thread for the write operations and one unique thread for the read operations, there will be no cross-interference between read and write threads and no synchronization is required.

## NetworkStream.NetworkStream(Socket) constructor

```csharp
public NetworkStream (System.Net.Sockets.Socket socket);
```

Creates a new instance of the `NetworkStream` class for the specified `Socket`.

Parameters:

- `socket`: The `Socket` that the `NetworkStream` will use to send and receive data.

Exceptions:

- `ArgumentNullException`: The `socket` parameter is `null`.
- `IOException`: The `socket` parameter is not connected.

-or-

The `Socket.SocketType` property of the `socket` parameter is not `SocketType.Stream`.

-or-

The `socket` parameter is in a nonblocking state.

#### Remarks
The `NetworkStream` is created with read/write access to the specified `Socket`.
The `NetworkStream` does not own the underlying `Socket`, so calling the `NetworkStream.Close` or `NetworkStream.Dispose` method does not close the `Socket`.

## NetworkStream.NetworkStream(Socket, Boolean) constructor

```csharp
public NetworkStream (System.Net.Sockets.Socket socket, bool ownsSocket);
```

Initializes a new instance of the `NetworkStream` class for the specified `Socket` with the specified `Socket` ownership.

Parameters:

- `socket`: The `Socket` that the `NetworkStream` will use to send and receive data.
- `ownsSocket`: Set to `true` to indicate that the `NetworkStream` will take ownership of the `Socket`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: The `socket` parameter is `null`.
- `IOException`: The `socket` parameter is not connected.

-or-

the value of the `Socket.SocketType` property of the `socket` parameter is not `SocketType.Stream`.

-or-

the `socket` parameter is in a nonblocking state.

#### Remarks
The `NetworkStream` is created with read/write access to the specified `Socket`.
If the value of `ownsSocket` parameter is `true`, the `NetworkStream` takes ownership of the underlying `Socket`, and calling the `NetworkStream.Close` or `NetworkStream.Dispose` method also closes the underlying `Socket`.

## NetworkStream.NetworkStream(Socket, FileAccess) constructor

```csharp
public NetworkStream (System.Net.Sockets.Socket socket, System.IO.FileAccess access);
```

Creates a new instance of the `NetworkStream` class for the specified `Socket` with the specified access rights.

Parameters:

- `socket`: The `Socket` that the `NetworkStream` will use to send and receive data.
- `access`: A bitwise combination of the `FileAccess` values that specify the type of access given to the `NetworkStream` over the provided `Socket`.

Exceptions:

- `ArgumentNullException`: The `socket` parameter is `null`.
- `IOException`: The `socket` parameter is not connected.

-or-

the `Socket.SocketType` property of the `socket` parameter is not `SocketType.Stream`.

-or-

the `socket` parameter is in a nonblocking state.

#### Remarks
The `NetworkStream` is created with the specified access to the specified `Socket`.
With this constructor, the `NetworkStream` does not own the underlying `Socket`, so calling the `NetworkStream.Close` or `NetworkStream.Dispose` method does not close the underlying `Socket`.

The `access` parameter sets the `NetworkStream.CanRead` and `NetworkStream.CanWrite` properties of the `NetworkStream`. If you specify `Write`, then the `NetworkStream` allows calls to the `NetworkStream.Write` method. If you specify `Read`, then the `NetworkStream` allows calls to the `NetworkStream.Read` method. If you specify `ReadWrite`, both method calls are allowed.

## NetworkStream.NetworkStream(Socket, FileAccess, Boolean) constructor

```csharp
public NetworkStream (System.Net.Sockets.Socket socket, System.IO.FileAccess access, bool ownsSocket);
```

Creates a new instance of the `NetworkStream` class for the specified `Socket` with the specified access rights and the specified `Socket` ownership.

Parameters:

- `socket`: The `Socket` that the `NetworkStream` will use to send and receive data.
- `access`: A bitwise combination of the `FileAccess` values that specifies the type of access given to the `NetworkStream` over the provided `Socket`.
- `ownsSocket`: Set to `true` to indicate that the `NetworkStream` will take ownership of the `Socket`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: The `socket` parameter is `null`.
- `IOException`: The `socket` parameter is not connected.

-or-

The `Socket.SocketType` property of the `socket` parameter is not `SocketType.Stream`.

-or-

The `socket` parameter is in a nonblocking state.

#### Remarks
The `NetworkStream` is created with read/write access to the specified `Socket`.
If the value of the `ownsSocket` parameter is `true`, the `NetworkStream` takes ownership of the underlying `Socket`, and calling the `NetworkStream.Close` or `NetworkStream.Dispose` method also closes the underlying `Socket`.

The `access` parameter sets the `NetworkStream.CanRead` and `NetworkStream.CanWrite` properties of the `NetworkStream`. If you specify `Write`, then the `NetworkStream` allows calls to the `NetworkStream.Write` method. If you specify `Read`, then the `NetworkStream` allows calls to the `NetworkStream.Read` method. If you specify `ReadWrite`, both method calls are allowed.

## NetworkStream.CanRead property

```csharp
public override bool CanRead { get; }
```

Gets a value that indicates whether the `NetworkStream` supports reading.

Returns: `true` if data can be read from the stream; otherwise, `false`. The default value is `true`.

#### Remarks
If `NetworkStream.CanRead` is `true`, `NetworkStream` allows calls to the `NetworkStream.Read` method. Provide the appropriate `FileAccess` enumerated value in the constructor to set the readability and writability of the `NetworkStream`.

> **Note:**
> The `CanRead` property is set when the `NetworkStream` is initialized.
> Changes in the underlying `Socket`'s state (eg. closure) do not affect the value of `NetworkStream.CanRead`.

## NetworkStream.CanSeek property

```csharp
public override bool CanSeek { get; }
```

Gets a value that indicates whether the stream supports seeking. This property is not currently supported. This property always returns `false`.

Returns: `false` in all cases to indicate that `NetworkStream` cannot seek a specific location in the stream.

To be added.

## NetworkStream.CanTimeout property

```csharp
public override bool CanTimeout { get; }
```

Indicates whether timeout properties are usable for `NetworkStream`.

Returns: `true` in all cases.

#### Remarks
This property is present because it is inherited from `Stream`.

## NetworkStream.CanWrite property

```csharp
public override bool CanWrite { get; }
```

Gets a value that indicates whether the `NetworkStream` supports writing.

Returns: `true` if data can be written to the `NetworkStream`; otherwise, `false`. The default value is `true`.

#### Remarks
If `NetworkStream.CanWrite` is `true`, `NetworkStream` allows calls to the `NetworkStream.Write` method. Provide the appropriate `FileAccess` enumerated value in the constructor to set the readability and writability of the `NetworkStream`.

> **Note:**
> The `CanWrite` property is set when the `NetworkStream` is initialized.
> Changes in the underlying `Socket`'s state (eg. closure) do not affect the value of `NetworkStream.CanWrite`.

## NetworkStream.DataAvailable property

```csharp
public virtual bool DataAvailable { get; }
```

Gets a value that indicates whether data is available on the `NetworkStream` to be immediately read.

Returns: `true` if data is available on the stream to be read; otherwise, `false`.

Exceptions:

- `ObjectDisposedException`: The `NetworkStream` is closed.
- `IOException`: The underlying `Socket` is closed.
- `SocketException`: Use the `SocketException.ErrorCode` property to obtain the specific error code and refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

#### Remarks
Use the `DataAvailable` property to determine if data is queued to be immediately read.
If `NetworkStream.DataAvailable` is `true`, a call to `NetworkStream.Read` returns immediately.
If the remote host shuts down or closes the connection, `NetworkStream.DataAvailable` may throw a `SocketException`.

> **Note:**
> Do not use `DataAvailable` to determine whether the transmission has ended. Even if there's no data available to be immediately read, the underlying socket may receive more data later.

## NetworkStream.Length property

```csharp
public override long Length { get; }
```

Gets the length of the data available on the stream. This property is not currently supported and always throws a `NotSupportedException`.

Returns: The length of the data available on the stream.

Exceptions:

- `NotSupportedException`: Any use of this property.

To be added.

## NetworkStream.Position property

```csharp
public override long Position { get; set; }
```

Gets or sets the current position in the stream. This property is not currently supported and always throws a `NotSupportedException`.

Returns: The current position in the stream.

Exceptions:

- `NotSupportedException`: Any use of this property.

To be added.

## NetworkStream.Readable property

```csharp
protected bool Readable { get; set; }
```

Gets or sets a value that indicates whether the `NetworkStream` can be read.

Returns: `true` to indicate that the `NetworkStream` can be read; otherwise, `false`. The default value is `true`.

#### Remarks
You must derive from the `NetworkStream` class to use the `Readable` property. If `NetworkStream.Readable` is `true`, `NetworkStream` allows calls to the `NetworkStream.Read` method. You can also determine whether a `NetworkStream` is readable by checking the publicly accessible `CanRead` property.

The `Readable` property is set when the `NetworkStream` is initialized.

#### Examples
In the following code example, the `CanCommunicate` property checks the `Readable` property to determine if the `NetworkStream` is readable.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/NetworkStream/Readable/source.cs._

## NetworkStream.ReadTimeout property

```csharp
public override int ReadTimeout { get; set; }
```

Gets or sets the amount of time that a read operation blocks waiting for data.

Returns: A `Int32` that specifies the amount of time, in milliseconds, that will elapse before a read operation fails. The default value, `Timeout.Infinite`, specifies that the read operation does not time out.

Exceptions:

- `ArgumentOutOfRangeException`: The value specified is less than or equal to zero and is not `Timeout.Infinite`.

#### Remarks
If the read operation does not complete within the time specified by this property, the read operation throws an `IOException`.

> **Note:**
>  This property affects only synchronous reads performed by calling the `NetworkStream.Read` method. This property does not affect asynchronous reads performed by calling the `NetworkStream.BeginRead` or `NetworkStream.ReadAsync` method.

#### Examples
The following code example sets the read time-out for a network stream to 10 milliseconds.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/NetworkStream/ReadTimeout/tcpclient.cs._
## NetworkStream.Socket property

```csharp
public System.Net.Sockets.Socket Socket { get; }
```

Gets the underlying `Socket`.

Returns: A `Socket` that represents the underlying network connection.

#### Remarks
Classes deriving from `NetworkStream` can use this property to get the underlying `Socket`. Use the underlying `Socket` returned from the `Socket` property if you require access beyond that which `NetworkStream` provides.

> **Note:**
>  This property is accessible only through this class or a derived class.

#### Examples
The following code example retrieves the underlying `Socket` to verify an active connection.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/NetworkStream/Readable/source.cs._

## NetworkStream.Writeable property

```csharp
protected bool Writeable { get; set; }
```

Gets a value that indicates whether the `NetworkStream` is writable.

Returns: `true` if data can be written to the stream; otherwise, `false`. The default value is `true`.

#### Remarks
You must derive from the `NetworkStream` class to use the `Writeable` property. If `NetworkStream.Writeable` is `true`, `NetworkStream` allows calls to the `NetworkStream.Write` method. You can also determine whether a `NetworkStream` is writable by checking the publicly accessible `CanWrite` property.

The `Writeable` property is set when the `NetworkStream` is initialized.

#### Examples
In the following code example, the `CanCommunicate` property checks the `Writeable` property to determine if the `NetworkStream` is writable.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/NetworkStream/Readable/source.cs._
