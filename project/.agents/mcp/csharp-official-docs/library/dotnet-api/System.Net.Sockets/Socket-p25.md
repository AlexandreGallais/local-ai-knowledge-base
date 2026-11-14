---
title: "Socket class (part 25 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/Socket.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Socket class (part 25 of 33)

## Socket.Select(IList, IList, IList, Int32) method

```csharp
public static void Select (System.Collections.IList? checkRead, System.Collections.IList? checkWrite, System.Collections.IList? checkError, int microSeconds);
```

Determines the status of one or more sockets.

Parameters:

- `checkRead`: An `IList` of `Socket` instances to check for readability.
- `checkWrite`: An `IList` of `Socket` instances to check for writability.
- `checkError`: An `IList` of `Socket` instances to check for errors.
- `microSeconds`: The time-out value, in microseconds. A -1 value indicates an infinite time-out.

Exceptions:

- `ArgumentNullException`: The `checkRead`, `checkWrite`, and `checkError` parameters are all `null` or empty. At least one of `checkRead`, `checkWrite`, or `checkError` must contain at least one `Socket`.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: One or more sockets are disposed.
- `ArgumentOutOfRangeException`: The `checkRead`, `checkWrite`, or `checkError` parameter contains too many sockets.

#### Remarks
`Socket.Select` is a static method that determines the status of one or more `Socket` instances. You must place one or more sockets into an `IList` before you can use the `Socket.Select` method. Check for readability by calling `Socket.Select` with the `IList` as the `checkRead` parameter. To check your sockets for writability, use the `checkWrite` parameter. For detecting error conditions, use `checkError`. After calling `Socket.Select`, the `IList` will be filled with only those sockets that satisfy the conditions.

If you are in a listening state, readability means that a call to `Socket.Accept` will succeed without blocking. If you have already accepted the connection, readability means that data is available for reading. In these cases, all receive operations will succeed without blocking. Readability can also indicate whether the remote `Socket` has shut down the connection; in that case a call to `Socket.Receive` will return immediately, with zero bytes returned.

`Socket.Select` returns when at least one of the sockets of interest (the sockets in the `checkRead`, `checkWrite`, and `checkError` lists) meets its specified criteria, or the `microSeconds` parameter is exceeded, whichever comes first. Setting `microSeconds` to -1 specifies an infinite time-out.

If you make a nonblocking call to `Socket.Connect`, writability means that you have connected successfully. If you already have a connection established, writability means that all send operations will succeed without blocking.

If you have made a non-blocking call to `Socket.Connect`, the `checkerror` parameter identifies sockets that have not connected successfully.

> **Note:**
> Use the `Socket.Poll` method if you only want to determine the status of a single `Socket`.

> **Note:**
> This method cannot detect certain kinds of connection problems, such as a broken network cable, or that the remote host was shut down ungracefully. You must attempt to send or receive data to detect these kinds of errors.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

#### Examples
The following code example uses `Socket.Select` to determine which listening sockets have a connection request.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/Socket/Select/source.cs._

## Socket.Select(IList, IList, IList, TimeSpan) method

```csharp
public static void Select (System.Collections.IList? checkRead, System.Collections.IList? checkWrite, System.Collections.IList? checkError, TimeSpan timeout);
```

Determines the status of one or more sockets.

Parameters:

- `checkRead`: An `IList` of `Socket` instances to check for readability.
- `checkWrite`: An `IList` of `Socket` instances to check for writability.
- `checkError`: An `IList` of `Socket` instances to check for errors.
- `timeout`: The timeout value. A value equal to -1 microseconds indicates an infinite timeout.

Exceptions:

- `ArgumentNullException`: The `checkRead`, `checkWrite`, and `checkError` parameters are all `null` or empty. At least one of `checkRead`, `checkWrite`, or `checkError` must contain at least one `Socket`.
- `ArgumentOutOfRangeException`: The `checkRead`, `checkWrite`, or `checkError` parameter contains too many sockets.
- `ArgumentOutOfRangeException`: The `timeout` was less than -1 microseconds or greater than `Int32.MaxValue` microseconds
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: One or more sockets was disposed.

To be added.

## Socket.Send(Byte[]) method

```csharp
public int Send (byte[] buffer);
```

Sends data to a connected `Socket`.

Parameters:

- `buffer`: An array of type `Byte` that contains the data to be sent.

Returns: The number of bytes sent to the `Socket`.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

#### Remarks
`Socket.Send` synchronously sends data to the remote host specified in the `Socket.Connect` or `Socket.Accept` method and returns the number of bytes successfully sent. `Socket.Send` can be used for both connection-oriented and connectionless protocols.

This overload requires a buffer that contains the data you want to send. The `SocketFlags` value defaults to 0, the buffer offset defaults to 0, and the number of bytes to send defaults to the size of the buffer.

If you are using a connectionless protocol, you must call `Socket.Connect` before calling this method, or `Socket.Send` will throw a `SocketException`. If you are using a connection-oriented protocol, you must either use `Socket.Connect` to establish a remote host connection, or use `Socket.Accept` to accept an incoming connection.

If you are using a connectionless protocol and plan to send data to several different hosts, you should use the `Socket.SendTo` method. If you do not use the `Socket.SendTo` method, you will have to call `Socket.Connect` before each call to `Socket.Send`. You can use `Socket.SendTo` even after you have established a default remote host with `Socket.Connect`. You can also change the default remote host prior to calling `Socket.Send` by making another call to `Socket.Connect`.

If you are using a connection-oriented protocol, `Socket.Send` will block until all of the bytes in the buffer are sent, unless a time-out was set by using `Socket.SendTimeout`. If the time-out value was exceeded, the `Socket.Send` call will throw a `SocketException`. In nonblocking mode, `Socket.Send` may complete successfully even if it sends less than the number of bytes in the buffer. It is your application's responsibility to keep track of the number of bytes sent and to retry the operation until the application sends the bytes in the buffer. There is also no guarantee that the data you send will appear on the network immediately. To increase network efficiency, the underlying system may delay transmission until a significant amount of outgoing data is collected. A successful completion of the `Socket.Send` method means that the underlying system has had room to buffer your data for a network send.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> The successful completion of a send does not indicate that the data was successfully delivered. If no buffer space is available within the transport system to hold the data to be transmitted, send will block unless the socket has been placed in nonblocking mode.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example demonstrates sending data on a connected `Socket`.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/Socket/Receive/source.cs._

## Socket.Send(Byte>>) method

```csharp
public int Send (System.Collections.Generic.IList<ArraySegment<byte>> buffers);
```

Sends the set of buffers in the list to a connected `Socket`.

Parameters:

- `buffers`: A list of `ArraySegment<T>`s of type `Byte` that contains the data to be sent.

Returns: The number of bytes sent to the `Socket`.

Exceptions:

- `ArgumentNullException`: `buffers` is `null`.
- `ArgumentException`: `buffers` is empty.
- `SocketException`: An error occurred when attempting to access the socket. See remarks section below.
- `ObjectDisposedException`: The `Socket` has been closed.

#### Remarks
`Socket.Send` can be used for both connection-oriented and connectionless protocols.

This overload requires at least one buffer that contains the data you want to send.

If you are using a connectionless protocol, you must call `Socket.Connect` before calling this method, or `Socket.Send` will throw a `SocketException`. If you are using a connection-oriented protocol, you must either use `Socket.Connect` to establish a remote host connection, or use `Socket.Accept` to accept an incoming connection.

If you are using a connectionless protocol and plan to send data to several different hosts, you should use the `Socket.SendTo` method. If you do not use the `Socket.SendTo` method, you will have to call `Socket.Connect` before each call to `Socket.Send`. You can use `Socket.SendTo` even after you have established a default remote host with `Socket.Connect`. You can also change the default remote host prior to calling `Socket.Send` by making another call to `Socket.Connect`.

If you are using a connection-oriented protocol, `Socket.Send` will block until all of the bytes in the buffer are sent, unless a time-out was set by using `Socket.SendTimeout`. If the time-out value was exceeded, the `Socket.Send` call will throw a `SocketException`. In nonblocking mode, `Socket.Send` may complete successfully even if it sends less than the number of bytes in the buffer. It is your application's responsibility to keep track of the number of bytes sent and to retry the operation until the application sends the bytes in the buffer. There is also no guarantee that the data you send will appear on the network immediately. To increase network efficiency, the underlying system may delay transmission until a significant amount of outgoing data is collected. A successful completion of the `Socket.Send` method means that the underlying system has had room to buffer your data for a network send.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> The successful completion of a send does not indicate that the data was successfully delivered. If no buffer space is available within the transport system to hold the data to be transmitted, send will block unless the socket has been placed in nonblocking mode.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

## Socket.Send(Byte>) method

```csharp
public int Send (ReadOnlySpan<byte> buffer);
```

Sends data to a connected `Socket`.

Parameters:

- `buffer`: A span of bytes that contains the data to be sent.

Returns: The number of bytes sent to the `Socket`.

Exceptions:

- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

#### Remarks

`Socket.Send` synchronously sends data to the remote host specified in the `Socket.Connect` or `Socket.Accept` method and returns the number of bytes successfully sent. `Socket.Send` can be used for both connection-oriented and connectionless protocols.

This overload requires a buffer that contains the data you want to send. The `SocketFlags` value defaults to 0, the buffer offset defaults to 0, and the number of bytes to send defaults to the size of the buffer.

If you're using a connectionless protocol, you must call `Socket.Connect` before calling this method, or `Socket.Send` will throw a `SocketException`. If you're using a connection-oriented protocol, you must either use `Socket.Connect` to establish a remote host connection, or use `Socket.Accept` to accept an incoming connection.

If you're using a connectionless protocol and plan to send data to several different hosts, you should use the `Socket.SendTo` method. If you don't use the `Socket.SendTo` method, you'll have to call `Socket.Connect` before each call to `Socket.Send`. You can use `Socket.SendTo` even after you have established a default remote host with `Socket.Connect`. You can also change the default remote host before calling `Socket.Send` by making another call to `Socket.Connect`.

If you're using a connection-oriented protocol, `Socket.Send` will block until all of the bytes in the buffer are sent, unless a time-out was set by using `Socket.SendTimeout`. If the time-out value was exceeded, the `Socket.Send` call will throw a `SocketException`. In nonblocking mode, `Socket.Send` may complete successfully even if it sends less than the number of bytes in the buffer. It is your application's responsibility to keep track of the number of bytes sent and to retry the operation until the application sends the bytes in the buffer. There's also no guarantee that the data you send will appear on the network immediately. To increase network efficiency, the underlying system may delay transmission until a significant amount of outgoing data is collected. A successful completion of the `Socket.Send` method means that the underlying system has had room to buffer your data for a network send.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

> **Important:**
> The successful completion of a send does not indicate that the data was successfully delivered. If no buffer space is available within the transport system to hold the data to be transmitted, send will block unless the socket has been placed in nonblocking mode.
