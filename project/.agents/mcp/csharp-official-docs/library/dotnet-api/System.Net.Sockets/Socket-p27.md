---
title: "Socket class (part 27 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/Socket.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Socket class (part 27 of 33)

## Socket.Send(Byte>>, SocketFlags, SocketError) method

```csharp
public int Send (System.Collections.Generic.IList<ArraySegment<byte>> buffers, System.Net.Sockets.SocketFlags socketFlags, out System.Net.Sockets.SocketError errorCode);
```

Sends the set of buffers in the list to a connected `Socket`, using the specified `SocketFlags`.

Parameters:

- `buffers`: A list of `ArraySegment<T>`s of type `Byte` that contains the data to be sent.
- `socketFlags`: A bitwise combination of the `SocketFlags` values.
- `errorCode`: A `SocketError` object that stores the socket error.

Returns: The number of bytes sent to the `Socket`.

Exceptions:

- `ArgumentNullException`: `buffers` is `null`.
- `ArgumentException`: `buffers` is empty.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

#### Remarks
This overload requires at least one buffer that contains the data you want to send. The `SocketFlags` value defaults to 0. If you specify the `DontRoute` flag as the `socketFlags` parameter, the data you are sending will not be routed.

If you are using a connectionless protocol, you must call `Socket.Connect` before calling this method, or `Socket.Send` will throw a `SocketException`. If you are using a connection-oriented protocol, you must either use `Socket.Connect` to establish a remote host connection, or use `Socket.Accept` to accept an incoming connection.

If you are using a connectionless protocol and plan to send data to several different hosts, you should use the `Socket.SendTo` method. If you do not use the `Socket.SendTo` method, you will have to call `Socket.Connect` before each call to `Socket.Send`. You can use `Socket.SendTo` even after you have established a default remote host with `Socket.Connect`. You can also change the default remote host prior to calling `Socket.Send` by making another call to `Socket.Connect`.

If you are using a connection-oriented protocol, `Socket.Send` will block until all of the bytes in the buffer are sent, unless a time-out was set by using `Socket.SendTimeout`. If the time-out value was exceeded, the `Socket.Send` call will throw a `SocketException`. In non-blocking mode, `Socket.Send` may complete successfully even if it sends less than the number of bytes in the buffer. It is your application's responsibility to keep track of the number of bytes sent and to retry the operation until the application sends the bytes in the buffer. There is also no guarantee that the data you send will appear on the network immediately. To increase network efficiency, the underlying system may delay transmission until a significant amount of outgoing data is collected. A successful completion of the `Socket.Send` method means that the underlying system has had room to buffer your data for a network send.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> The successful completion of a send does not indicate that the data was successfully delivered. If no buffer space is available within the transport system to hold the data to be transmitted, send will block unless the socket has been placed in nonblocking mode.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

## Socket.Send(Byte>, SocketFlags, SocketError) method

```csharp
public int Send (ReadOnlySpan<byte> buffer, System.Net.Sockets.SocketFlags socketFlags, out System.Net.Sockets.SocketError errorCode);
```

Sends data to a connected `Socket` using the specified `SocketFlags`.

Parameters:

- `buffer`: A span of bytes that contains the data to be sent.
- `socketFlags`: A bitwise combination of the enumeration values that specifies send and receive behaviors.
- `errorCode`: When this method returns, contains one of the enumeration values that defines error codes for the socket.

Returns: The number of bytes sent to the `Socket`.

Exceptions:

- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

#### Remarks

`Socket.Send` synchronously sends data to the remote host specified in the `Socket.Connect` or `Socket.Accept` method and returns the number of bytes successfully sent. `Socket.Send` can be used for both connection-oriented and connectionless protocols.

This overload requires a buffer that contains the data you want to send. The `SocketFlags` value defaults to 0, the buffer offset defaults to 0, and the number of bytes to send defaults to the size of the buffer.

If you're using a connectionless protocol, you must call `Socket.Connect` before calling this method, or `Socket.Send` will throw a `SocketException`. If you're using a connection-oriented protocol, you must either use `Socket.Connect` to establish a remote host connection, or use `Socket.Accept` to accept an incoming connection.

If you're using a connectionless protocol and plan to send data to several different hosts, you should use the `Socket.SendTo` method. If you don't use the `Socket.SendTo` method, you'll have to call `Socket.Connect` before each call to `Socket.Send`. You can use `Socket.SendTo` even after you've established a default remote host with `Socket.Connect`. You can also change the default remote host before calling `Socket.Send` by making another call to `Socket.Connect`.

If you're using a connection-oriented protocol, `Socket.Send` will block until all of the bytes in the buffer are sent, unless a time-out was set by using `Socket.SendTimeout`. If the time-out value was exceeded, the `Socket.Send` call will throw a `SocketException`. In nonblocking mode, `Socket.Send` may complete successfully even if it sends less than the number of bytes in the buffer. It is your application's responsibility to keep track of the number of bytes sent and to retry the operation until the application sends the bytes in the buffer. There's also no guarantee that the data you send will appear on the network immediately. To increase network efficiency, the underlying system may delay transmission until a significant amount of outgoing data is collected. A successful completion of the `Socket.Send` method means that the underlying system has had room to buffer your data for a network send.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you've obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Important:**
> The successful completion of a send does not indicate that the data was successfully delivered. If no buffer space is available within the transport system to hold the data to be transmitted, send will block unless the socket has been placed in nonblocking mode.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

## Socket.Send(Byte[], Int32, Int32, SocketFlags) method

```csharp
public int Send (byte[] buffer, int offset, int size, System.Net.Sockets.SocketFlags socketFlags);
```

Sends the specified number of bytes of data to a connected `Socket`, starting at the specified offset, and using the specified `SocketFlags`.

Parameters:

- `buffer`: An array of type `Byte` that contains the data to be sent.
- `offset`: The position in the data buffer at which to begin sending data.
- `size`: The number of bytes to send.
- `socketFlags`: A bitwise combination of the `SocketFlags` values.

Returns: The number of bytes sent to the `Socket`.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `offset` is less than 0.

-or-

`offset` is greater than the length of `buffer`.

-or-

`size` is less than 0.

-or-

`size` is greater than the length of `buffer` minus the value of the `offset` parameter.
- `SocketException`: `socketFlags` is not a valid combination of values.

-or-

An operating system error occurs while accessing the `Socket`.
- `ObjectDisposedException`: The `Socket` has been closed.

#### Remarks
`Socket.Send` synchronously sends data to the remote host specified in the `Socket.Connect` or `Socket.Accept` method and returns the number of bytes successfully sent. `Socket.Send` can be used for both connection-oriented and connectionless protocols.

In this overload, if you specify the `DontRoute` flag as the `socketflags` parameter, the data you are sending will not be routed.

If you are using a connectionless protocol, you must call `Socket.Connect` before calling this method or `Socket.Send` will throw a `SocketException`. If you are using a connection-oriented protocol, you must either use `Socket.Connect` to establish a remote host connection, or use `Socket.Accept` to accept an incoming connection.

If you are using a connectionless protocol and plan to send data to several different hosts, you should use `Socket.SendTo`. If you do not use `Socket.SendTo`, you will have to call `Socket.Connect` before each call to `Socket.Send`. It is okay to use `Socket.SendTo` even after you have established a default remote host with `Socket.Connect`. You can also change the default remote host prior to calling `Socket.Send` by making another call to `Socket.Connect`.

You must also be sure that the size does not exceed the maximum packet size of the underlying service provider. If it does, the datagram will not be sent and `Socket.Send` will throw a `SocketException`.

If you are using a connection-oriented protocol, `Socket.Send` will block until the requested number of bytes are sent, unless a time-out was set by using `Socket.SendTimeout`. If the time-out value was exceeded, the `Socket.Send` call will throw a `SocketException`. In nonblocking mode, `Socket.Send` may complete successfully even if it sends less than the number of bytes you request. It is your application's responsibility to keep track of the number of bytes sent and to retry the operation until the application sends the requested number of bytes. There is also no guarantee that the data you send will appear on the network immediately. To increase network efficiency, the underlying system may delay transmission until a significant amount of outgoing data is collected. A successful completion of the `Socket.Send` method means that the underlying system has had room to buffer your data for a network send.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> The successful completion of a send does not indicate that the data was successfully delivered. If no buffer space is available within the transport system to hold the data to be transmitted, send will block unless the socket has been placed in nonblocking mode.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example specifies the data buffer, an offset, a size, and `SocketFlags` for sending data to a connected `Socket`.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/Socket/Receive/source.cs._
