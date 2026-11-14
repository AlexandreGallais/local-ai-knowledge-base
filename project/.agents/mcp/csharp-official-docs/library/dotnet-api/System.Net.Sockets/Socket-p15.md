---
title: "Socket class (part 15 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/Socket.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Socket class (part 15 of 33)

## Socket.EndAccept(IAsyncResult) method

```csharp
public System.Net.Sockets.Socket EndAccept (IAsyncResult asyncResult);
```

Asynchronously accepts an incoming connection attempt and creates a new `Socket` to handle remote host communication.

Parameters:

- `asyncResult`: An `IAsyncResult` that stores state information for this asynchronous operation as well as any user defined data.

Returns: A `Socket` to handle communication with the remote host.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.
- `ArgumentException`: `asyncResult` was not created by a call to `Socket.BeginAccept`.
- `SocketException`: An error occurred when attempting to access the socket.

-or-

The `Socket` has been closed.
- `InvalidOperationException`: `Socket.EndAccept` method was previously called.

#### Remarks
> **Important:**
> This is a compatibility API. We don't recommend using the APM (`Begin*` and `End*`) methods for new development. Instead, use the `Task`-based equivalents.

`Socket.EndAccept` completes the operation started by `Socket.BeginAccept`. You need to pass the `IAsyncResult` created by the matching `Socket.BeginAccept` call.

The `Socket.EndAccept` method blocks until a connection is pending in the incoming connection queue. The `Socket.EndAccept` method accepts the incoming connection and returns a new `Socket` that can be used to send data to and receive data from the remote host.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

## Socket.EndAccept(Byte[], IAsyncResult) method

```csharp
public System.Net.Sockets.Socket EndAccept (out byte[] buffer, IAsyncResult asyncResult);
```

Asynchronously accepts an incoming connection attempt and creates a new `Socket` object to handle remote host communication. This method returns a buffer that contains the initial data transferred.

Parameters:

- `buffer`: An array of type `Byte` that contains the bytes transferred.
- `asyncResult`: An `IAsyncResult` object that stores state information for this asynchronous operation as well as any user defined data.

Returns: A `Socket` object to handle communication with the remote host.

Exceptions:

- `ArgumentNullException`: `asyncResult` is empty.
- `ArgumentException`: `asyncResult` was not created by a call to `Socket.BeginAccept`.
- `InvalidOperationException`: `Socket.EndAccept` method was previously called.
- `SocketException`: An error occurred when attempting to access the socket.

-or-

The `Socket` has been closed.

#### Remarks
> **Important:**
> This is a compatibility API. We don't recommend using the APM (`Begin*` and `End*`) methods for new development. Instead, use the `Task`-based equivalents.

`Socket.EndAccept` completes the operation started by `Socket.BeginAccept`. You need to pass the `IAsyncResult` created by the matching `Socket.BeginAccept` call.

The `buffer` parameter of this overload contains the data that was received in the call to `Socket.BeginAccept` and the `bytesTransferred` parameter contains the number of bytes that were transferred in the call.

The `Socket.EndAccept` method blocks until a connection is pending in the incoming connection queue. The `Socket.EndAccept` method accepts the incoming connection and returns a new `Socket` that can be used to send data to and receive data from the remote host.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

## Socket.EndAccept(Byte[], Int32, IAsyncResult) method

```csharp
public System.Net.Sockets.Socket EndAccept (out byte[] buffer, out int bytesTransferred, IAsyncResult asyncResult);
```

Asynchronously accepts an incoming connection attempt and creates a new `Socket` object to handle remote host communication. This method returns a buffer that contains the initial data and the number of bytes transferred.

Parameters:

- `buffer`: An array of type `Byte` that contains the bytes transferred.
- `bytesTransferred`: The number of bytes transferred.
- `asyncResult`: An `IAsyncResult` object that stores state information for this asynchronous operation as well as any user defined data.

Returns: A `Socket` object to handle communication with the remote host.

Exceptions:

- `ArgumentNullException`: `asyncResult` is empty.
- `ArgumentException`: `asyncResult` was not created by a call to `Socket.BeginAccept`.
- `InvalidOperationException`: `Socket.EndAccept` method was previously called.
- `SocketException`: An error occurred when attempting to access the socket.

-or-

The `Socket` has been closed.

#### Remarks
> **Important:**
> This is a compatibility API. We don't recommend using the APM (`Begin*` and `End*`) methods for new development. Instead, use the `Task`-based equivalents.

`Socket.EndAccept` completes the operation started by `Socket.BeginAccept`. You need to pass the `IAsyncResult` created by the matching `Socket.BeginAccept` call.

The `Socket.EndAccept` method blocks until a connection is pending in the incoming connection queue. The `Socket.EndAccept` method accepts the incoming connection and returns a new `Socket` that can be used to send data to and receive data from the remote host.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

## Socket.EndConnect(IAsyncResult) method

```csharp
public void EndConnect (IAsyncResult asyncResult);
```

Ends a pending asynchronous connection request.

Parameters:

- `asyncResult`: An `IAsyncResult` that stores state information and any user defined data for this asynchronous operation.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.
- `ArgumentException`: `asyncResult` was not returned by a call to the `Socket.BeginConnect` method.
- `InvalidOperationException`: `Socket.EndConnect` was previously called for the asynchronous connection.
- `SocketException`: An error occurred when attempting to access the socket.

-or-

The `Socket` has been closed.

#### Remarks
> **Important:**
> This is a compatibility API. We don't recommend using the APM (`Begin*` and `End*`) methods for new development. Instead, use the `Task`-based equivalents.

`Socket.EndConnect` completes the operation started by `Socket.BeginConnect`. You need to pass the `IAsyncResult` created by the matching `Socket.BeginConnect` call. `Socket.EndConnect` will block the calling thread until the operation is completed.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

## Socket.EndDisconnect(IAsyncResult) method

```csharp
public void EndDisconnect (IAsyncResult asyncResult);
```

Ends a pending asynchronous disconnect request.

Parameters:

- `asyncResult`: An `IAsyncResult` object that stores state information and any user-defined data for this asynchronous operation.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.
- `ArgumentException`: `asyncResult` was not returned by a call to the `Socket.BeginDisconnect` method.
- `InvalidOperationException`: `Socket.EndDisconnect` was previously called for the asynchronous connection.
- `SocketException`: An error occurred when attempting to access the socket.

-or-

The `Socket` has been closed.
- `WebException`: The disconnect request has timed out.

#### Remarks
> **Important:**
> This is a compatibility API. We don't recommend using the APM (`Begin*` and `End*`) methods for new development. Instead, use the `Task`-based equivalents.

`Socket.EndDisconnect` completes the operation started by `Socket.BeginDisconnect`. You need to pass the `IAsyncResult` created by the matching `Socket.BeginDisconnect` call. `Socket.EndDisconnect` will block the calling thread until the operation is completed.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

## Socket.EndReceive(IAsyncResult) method

```csharp
public int EndReceive (IAsyncResult asyncResult);
```

Ends a pending asynchronous read.

Parameters:

- `asyncResult`: An `IAsyncResult` that stores state information and any user defined data for this asynchronous operation.

Returns: The total number of bytes received. The method returns zero (0) only if zero bytes were requested or if no more bytes are available because the peer socket performed a graceful shutdown. If zero bytes are requested, receive operations may complete immediately or may not complete until at least one byte is available (but without consuming any data).

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.
- `ArgumentException`: `asyncResult` was not returned by a call to the `Socket.BeginReceive` method.
- `InvalidOperationException`: `Socket.EndReceive` was previously called for the asynchronous read.
- `SocketException`: An error occurred when attempting to access the socket.

-or-

The `Socket` has been closed.

#### Remarks
> **Important:**
> This is a compatibility API. We don't recommend using the APM (`Begin*` and `End*`) methods for new development. Instead, use the `Task`-based equivalents.

`Socket.EndReceive` completes the operation started by `Socket.BeginReceive`. You need to pass the `IAsyncResult` created by the matching `Socket.BeginReceive` call.

The `Socket.EndReceive` method will block until data is available. If you are using a connectionless protocol, `Socket.EndReceive` will read the first enqueued datagram available in the incoming network buffer. If you are using a connection-oriented protocol, the `Socket.EndReceive` method will read as much data as is available up to the number of bytes you specified in the `size` parameter of the `Socket.BeginReceive` method. If the remote host shuts down the `Socket` connection with the `Socket.Shutdown` method, and all available data has been received, the `Socket.EndReceive` method will complete immediately and return zero bytes.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code.

> **Note:**
> All I/O initiated by a given thread is canceled when that thread exits. A pending asynchronous operation can fail if the thread exits before the operation completes.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

## Socket.EndReceive(IAsyncResult, SocketError) method

```csharp
public int EndReceive (IAsyncResult asyncResult, out System.Net.Sockets.SocketError errorCode);
```

Ends a pending asynchronous read.

Parameters:

- `asyncResult`: An `IAsyncResult` that stores state information and any user defined data for this asynchronous operation.
- `errorCode`: A `SocketError` object that stores the socket error.

Returns: The total number of bytes received. The method returns zero (0) only if zero bytes were requested or if no more bytes are available because the peer socket performed a graceful shutdown. If zero bytes are requested, receive operations may complete immediately or may not complete until at least one byte is available (but without consuming any data).

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.
- `ArgumentException`: `asyncResult` was not returned by a call to the `Socket.BeginReceive` method.
- `InvalidOperationException`: `Socket.EndReceive` was previously called for the asynchronous read.
- `SocketException`: An error occurred when attempting to access the socket.

-or-

The `Socket` has been closed.

#### Remarks
> **Important:**
> This is a compatibility API. We don't recommend using the APM (`Begin*` and `End*`) methods for new development. Instead, use the `Task`-based equivalents.

`Socket.EndReceive` completes the operation started by `Socket.BeginReceive`. You need to pass the `IAsyncResult` created by the matching `Socket.BeginReceive` call.

The `Socket.EndReceive` method will block until data is available. If you are using a connectionless protocol, `Socket.EndReceive` will read the first enqueued datagram available in the incoming network buffer. If you are using a connection-oriented protocol, the `Socket.EndReceive` method will read as much data as is available up to the number of bytes you specified in the `size` parameter of the `Socket.BeginReceive` method. If the remote host shuts down the `Socket` connection with the `Socket.Shutdown` method, and all available data has been received, the `Socket.EndReceive` method will complete immediately and return zero bytes.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code.

> **Note:**
> All I/O initiated by a given thread is canceled when that thread exits. A pending asynchronous operation can fail if the thread exits before the operation completes.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.
