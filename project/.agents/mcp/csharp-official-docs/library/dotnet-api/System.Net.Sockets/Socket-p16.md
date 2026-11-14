---
title: "Socket class (part 16 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/Socket.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Socket class (part 16 of 33)

## Socket.EndReceiveFrom(IAsyncResult, EndPoint) method

```csharp
public int EndReceiveFrom (IAsyncResult asyncResult, ref System.Net.EndPoint endPoint);
```

Ends a pending asynchronous read from a specific endpoint.

Parameters:

- `asyncResult`: An `IAsyncResult` that stores state information and any user defined data for this asynchronous operation.
- `endPoint`: The source `EndPoint`.

Returns: If successful, the number of bytes received. If unsuccessful, returns 0.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.
- `ArgumentException`: `asyncResult` was not returned by a call to the `Socket.BeginReceiveFrom` method.
- `InvalidOperationException`: `Socket.EndReceiveFrom` was previously called for the asynchronous read.
- `SocketException`: An error occurred when attempting to access the socket.

-or-

The `Socket` has been closed.

#### Remarks
> **Important:**
> This is a compatibility API. We don't recommend using the APM (`Begin*` and `End*`) methods for new development. Instead, use the `Task`-based equivalents.

`Socket.EndReceiveFrom` completes the operation started by `Socket.BeginReceiveFrom`. You need to pass the `IAsyncResult` created by the matching `Socket.BeginReceiveFrom` call.

The `Socket.EndReceiveFrom` method will block until data is available. If you are using a connectionless protocol, `Socket.EndReceiveFrom` will read the first enqueued datagram available in the incoming network buffer. If you are using a connection-oriented protocol, the `Socket.EndReceiveFrom` method will read as much data as is available up to the number of bytes you specified in the `size` parameter of the `Socket.BeginReceiveFrom` method. If the remote host shuts down the `Socket` connection with the `Socket.Shutdown` method, and all available data has been received, the `Socket.EndReceiveFrom` method will complete immediately and return zero bytes. To obtain the received data, call the `IAsyncResult.AsyncState` method of the `IAsyncResult` object, and extract the buffer contained in the resulting state object. To identify the originating host, extract the `EndPoint` and cast it to an `IPEndPoint`. Use the `IPEndPoint.Address` method to obtain the IP address and the `IPEndPoint.Port` method to obtain the port number.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

## Socket.EndReceiveMessageFrom(IAsyncResult, SocketFlags, EndPoint, IPPacketInformation) method

```csharp
public int EndReceiveMessageFrom (IAsyncResult asyncResult, ref System.Net.Sockets.SocketFlags socketFlags, ref System.Net.EndPoint endPoint, out System.Net.Sockets.IPPacketInformation ipPacketInformation);
```

Ends a pending asynchronous read from a specific endpoint. This method also reveals more information about the packet than `Socket.EndReceiveFrom`.

Parameters:

- `asyncResult`: An `IAsyncResult` that stores state information and any user defined data for this asynchronous operation.
- `socketFlags`: A bitwise combination of the `SocketFlags` values for the received packet.
- `endPoint`: The source `EndPoint`.
- `ipPacketInformation`: The `IPAddress` and interface of the received packet.

Returns: If successful, the number of bytes received. If unsuccessful, returns 0.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`

-or-

`endPoint` is `null`.
- `ArgumentException`: `asyncResult` was not returned by a call to the `Socket.BeginReceiveMessageFrom` method.
- `InvalidOperationException`: `Socket.EndReceiveMessageFrom` was previously called for the asynchronous read.
- `SocketException`: An error occurred when attempting to access the socket.

-or-

The `Socket` has been closed.

#### Remarks
> **Important:**
> This is a compatibility API. We don't recommend using the APM (`Begin*` and `End*`) methods for new development. Instead, use the `Task`-based equivalents.

`Socket.EndReceiveFrom` completes the operation started by `Socket.BeginReceiveFrom`. You need to pass the `IAsyncResult` created by the matching `Socket.BeginReceiveFrom` call. `Socket.EndReceiveFrom` will block the calling thread until the operation is completed.

Examine `ipPacketInformation` if you need to know if the datagram was sent using a unicast, multicast, or broadcast address.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code.

## Socket.EndSend(IAsyncResult) method

```csharp
public int EndSend (IAsyncResult asyncResult);
```

Ends a pending asynchronous send.

Parameters:

- `asyncResult`: An `IAsyncResult` that stores state information for this asynchronous operation.

Returns: If successful, the number of bytes sent to the `Socket`; otherwise, an invalid `Socket` error.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.
- `ArgumentException`: `asyncResult` was not returned by a call to the `Socket.BeginSend` method.
- `InvalidOperationException`: `Socket.EndSend` was previously called for the asynchronous send.
- `SocketException`: An error occurred when attempting to access the socket.

-or-

The `Socket` has been closed.

#### Remarks
> **Important:**
> This is a compatibility API. We don't recommend using the APM (`Begin*` and `End*`) methods for new development. Instead, use the `Task`-based equivalents.

`Socket.EndSend` completes the operation started by `Socket.BeginSend`. You need to pass the `IAsyncResult` created by the matching `Socket.BeginSend` call.

If you are using a connectionless protocol, `Socket.EndSend` will block until the datagram is sent. If you are using a connection-oriented protocol, `Socket.EndSend` will block until some of the buffer was sent. If the return value from `Socket.EndSend` indicates that the buffer was not completely sent, call the `Socket.BeginSend` method again, modifying the buffer to hold the unsent data.

There is no guarantee that the data you send will appear on the network immediately. To increase network efficiency, the underlying system may delay transmission until a significant amount of outgoing data is collected. A successful completion of the `Socket.BeginSend` method means that the underlying system has had room to buffer your data for a network send.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code.

> **Note:**
> All I/O initiated by a given thread is canceled when that thread exits. A pending asynchronous operation can fail if the thread exits before the operation completes.

> **Note:**
> The successful completion of a send does not indicate that the data was successfully delivered. If no buffer space is available within the transport system to hold the data to be transmitted, send will block unless the socket has been placed in nonblocking mode.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

## Socket.EndSend(IAsyncResult, SocketError) method

```csharp
public int EndSend (IAsyncResult asyncResult, out System.Net.Sockets.SocketError errorCode);
```

Ends a pending asynchronous send.

Parameters:

- `asyncResult`: An `IAsyncResult` that stores state information for this asynchronous operation.
- `errorCode`: A `SocketError` object that stores the socket error.

Returns: If successful, the number of bytes sent to the `Socket`; otherwise, an invalid `Socket` error.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.
- `ArgumentException`: `asyncResult` was not returned by a call to the `Socket.BeginSend` method.
- `InvalidOperationException`: `Socket.EndSend` was previously called for the asynchronous send.
- `SocketException`: An error occurred when attempting to access the socket.

-or-

The `Socket` has been closed.

#### Remarks
> **Important:**
> This is a compatibility API. We don't recommend using the APM (`Begin*` and `End*`) methods for new development. Instead, use the `Task`-based equivalents.

`Socket.EndSend` completes the operation started by `Socket.BeginSend`. You need to pass the `IAsyncResult` created by the matching `Socket.BeginSend` call.

If you are using a connectionless protocol, `Socket.EndSend` will block until the datagram is sent. If you are using a connection-oriented protocol, `Socket.EndSend` will block until some of the buffer was sent. If the return value from `Socket.EndSend` indicates that the buffer was not completely sent, call the `Socket.BeginSend` method again, modifying the buffer to hold the unsent data.

There is no guarantee that the data you send will appear on the network immediately. To increase network efficiency, the underlying system may delay transmission until a significant amount of outgoing data is collected. A successful completion of the `Socket.BeginSend` method means that the underlying system has had room to buffer your data for a network send.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code.

> **Note:**
> All I/O initiated by a given thread is canceled when that thread exits. A pending asynchronous operation can fail if the thread exits before the operation completes.

> **Note:**
> The successful completion of a send does not indicate that the data was successfully delivered. If no buffer space is available within the transport system to hold the data to be transmitted, send will block unless the socket has been placed in nonblocking mode.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

## Socket.EndSendFile(IAsyncResult) method

```csharp
public void EndSendFile (IAsyncResult asyncResult);
```

Ends a pending asynchronous send of a file.

Parameters:

- `asyncResult`: An `IAsyncResult` object that stores state information for this asynchronous operation.

Exceptions:

- `NotSupportedException`: .NET 8+ only: The socket is not connected to a remote host.
- `ArgumentNullException`: `asyncResult` is empty.
- `ArgumentException`: `asyncResult` was not returned by a call to the `Socket.BeginSendFile` method.
- `InvalidOperationException`: `Socket.EndSendFile` was previously called for the asynchronous `Socket.BeginSendFile`.
- `SocketException`: An error occurred when attempting to access the socket.

-or-

The `Socket` has been closed.

#### Remarks
> **Important:**
> This is a compatibility API. We don't recommend using the APM (`Begin*` and `End*`) methods for new development. Instead, use the `Task`-based equivalents.

`Socket.EndSendFile` completes the operation started by `Socket.BeginSend`. You need to pass the `IAsyncResult` created by the matching `Socket.BeginSend` call.

If you are using a connectionless protocol, `Socket.EndSendFile` blocks until the datagram is sent. If you are using a connection-oriented protocol, `Socket.EndSendFile` blocks until the entire file is sent. There is no guarantee that the data you send will appear on the network immediately. To increase network efficiency, the underlying system may delay transmission until a significant amount of outgoing data is collected. A successful completion of the `Socket.BeginSendFile` method means that the underlying system has had room to buffer your data for a network send.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

## Socket.EndSendTo(IAsyncResult) method

```csharp
public int EndSendTo (IAsyncResult asyncResult);
```

Ends a pending asynchronous send to a specific location.

Parameters:

- `asyncResult`: An `IAsyncResult` that stores state information and any user defined data for this asynchronous operation.

Returns: If successful, the number of bytes sent; otherwise, an invalid `Socket` error.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.
- `ArgumentException`: `asyncResult` was not returned by a call to the `Socket.BeginSendTo` method.
- `InvalidOperationException`: `Socket.EndSendTo` was previously called for the asynchronous send.
- `SocketException`: An error occurred when attempting to access the socket.

-or-

The `Socket` has been closed.

#### Remarks
> **Important:**
> This is a compatibility API. We don't recommend using the APM (`Begin*` and `End*`) methods for new development. Instead, use the `Task`-based equivalents.

`Socket.EndSendTo` completes the operation started by `Socket.BeginSendTo`. You need to pass the `IAsyncResult` created by the matching `Socket.BeginSendTo` call.

If you are using a connectionless protocol, `Socket.EndSendTo` will block until the datagram is sent. If you are using a connection-oriented protocol, `Socket.EndSendTo` will block until the requested number of bytes are sent. There is no guarantee that the data you send will appear on the network immediately. To increase network efficiency, the underlying system may delay transmission until a significant amount of outgoing data is collected. A successful completion of the `Socket.BeginSendTo` method means that the underlying system has had room to buffer your data for a network send.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

## Socket.Finalize() method

```csharp
~Socket ();
```

Frees resources used by the `Socket` class.

#### Remarks
The `Socket` class finalizer calls the `Socket.Close` method to close the `Socket` and free resources associated with the `Socket`.

## Socket.GetRawSocketOption(Int32, Int32, Byte>) method

```csharp
public int GetRawSocketOption (int optionLevel, int optionName, Span<byte> optionValue);
```

Gets a socket option value using platform-specific level and name identifiers.

Parameters:

- `optionLevel`: The platform-defined option level.
- `optionName`: The platform-defined option name.
- `optionValue`: The span into which the retrieved option value should be stored.

Returns: The number of bytes written into `optionValue` for a successfully retrieved value.

Exceptions:

- `ObjectDisposedException`: The `Socket` has been closed.
- `SocketException`: An error occurred when attempting to access the socket.

#### Remarks

In general, the `GetSocketOption` method should be used whenever getting a `Socket` option.

`GetRawSocketOption` method should be used only when `SocketOptionLevel` and `SocketOptionName` do not expose the required option.
