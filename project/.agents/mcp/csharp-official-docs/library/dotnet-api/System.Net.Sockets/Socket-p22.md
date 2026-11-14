---
title: "Socket class (part 22 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/Socket.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Socket class (part 22 of 33)

## Socket.ReceiveFrom(Byte[], SocketFlags, EndPoint) method

```csharp
public int ReceiveFrom (byte[] buffer, System.Net.Sockets.SocketFlags socketFlags, ref System.Net.EndPoint remoteEP);
```

Receives a datagram into the data buffer, using the specified `SocketFlags`, and stores the endpoint.

Parameters:

- `buffer`: An array of type `Byte` that is the storage location for the received data.
- `socketFlags`: A bitwise combination of the `SocketFlags` values.
- `remoteEP`: A reference to an `EndPoint` of the same type as the endpoint of the remote host to be updated on successful receive.

Returns: The number of bytes received.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.

-or-

`remoteEP` is `null`.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SecurityException`: A caller in the call stack does not have the required permissions.

#### Remarks
The `Socket.ReceiveFrom` method reads data into the `buffer` parameter, returns the number of bytes successfully read, and captures the remote host endpoint from which the data was sent. This method is useful if you intend to receive connectionless datagrams from an unknown host or multiple hosts.

This overload only requires you to provide a receive buffer, the necessary `SocketFlags`, and an `EndPoint` that represents the remote host. The offset defaults to 0 and the size defaults to the length of the buffer parameter.

> **Note:**
> Before calling `Socket.ReceiveFrom`, you must explicitly bind the `Socket` to a local endpoint using the `Socket.Bind` method. If you do not, `Socket.ReceiveFrom` will throw a `SocketException`.

With connectionless protocols, `Socket.ReceiveFrom` will read the first enqueued datagram received into the local network buffer. If the datagram you receive is larger than the size of `buffer`, the `Socket.ReceiveFrom` method will fill `buffer` with as much of the message as is possible, and throw a `SocketException`. If you are using an unreliable protocol, the excess data will be lost. If you are using a reliable protocol, the excess data will be retained by the service provider and you can retrieve it by calling the `Socket.ReceiveFrom` method with a large enough buffer.

If no data is available for reading, the `Socket.ReceiveFrom` method will block until data is available. If you are in non-blocking mode, and there is no data available in the protocol stack buffer, the `Socket.ReceiveFrom` method will complete immediately and throw a `SocketException`. You can use the `Available` property to determine if data is available for reading. When `Socket.Available` is non-zero, retry the receive operation.

Although `Socket.ReceiveFrom` is intended for connectionless protocols, you can use a connection-oriented protocol as well. If you choose to do so, you must first either establish a remote host connection by calling the `Socket.Connect` method or accept an incoming remote host connection by calling the `Socket.Accept` method. If you do not establish or accept a connection before calling the `Socket.ReceiveFrom` method, you will get a `SocketException`. You can also establish a default remote host for a connectionless protocol prior to calling the `Socket.ReceiveFrom` method.

With connection-oriented sockets, `Socket.ReceiveFrom` will read as much data as is available up to the size of `buffer`. If the remote host shuts down the `Socket` connection with the `Socket.Shutdown` method, and all available data has been Received, the `Socket.ReceiveFrom` method will complete immediately and return zero bytes.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> The `AddressFamily` of the `EndPoint` used in `Socket.ReceiveFrom` needs to match the `AddressFamily` of the `EndPoint` used in `Socket.SendTo`.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example receives a connectionless datagram from a remote host. `SocketFlags` are passed to the `Socket.ReceiveFrom` method.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/Socket/Receive/source.cs._

## Socket.ReceiveFrom(Byte>, SocketFlags, EndPoint) method

```csharp
public int ReceiveFrom (Span<byte> buffer, System.Net.Sockets.SocketFlags socketFlags, ref System.Net.EndPoint remoteEP);
```

Receives a datagram into the data buffer, using the specified `SocketFlags`, and stores the endpoint.

Parameters:

- `buffer`: A span of bytes that is the storage location for received data.
- `socketFlags`: A bitwise combination of the `SocketFlags` values.
- `remoteEP`: A reference to an `EndPoint` of the same type as the endpoint of the remote host to be updated on successful receive.

Returns: The number of bytes received.

Exceptions:

- `ArgumentNullException`: `remoteEP` is `null`.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

To be added.

## Socket.ReceiveFrom(Byte>, SocketFlags, SocketAddress) method

```csharp
public int ReceiveFrom (Span<byte> buffer, System.Net.Sockets.SocketFlags socketFlags, System.Net.SocketAddress receivedAddress);
```

Receives a datagram into the data buffer, using the specified `SocketFlags`, and stores the endpoint.

Parameters:

- `buffer`: A span of bytes that is the storage location for received data.
- `socketFlags`: A bitwise combination of the `SocketFlags` values.
- `receivedAddress`: A `SocketAddress` instance that gets updated with the value of the remote peer when this method returns.

Returns: The number of bytes received.

Exceptions:

- `ArgumentNullException`: `receivedAddress` is `null`.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

To be added.

## Socket.ReceiveFrom(Byte[], Int32, SocketFlags, EndPoint) method

```csharp
public int ReceiveFrom (byte[] buffer, int size, System.Net.Sockets.SocketFlags socketFlags, ref System.Net.EndPoint remoteEP);
```

Receives the specified number of bytes into the data buffer, using the specified `SocketFlags`, and stores the endpoint.

Parameters:

- `buffer`: An array of type `Byte` that is the storage location for received data.
- `size`: The number of bytes to receive.
- `socketFlags`: A bitwise combination of the `SocketFlags` values.
- `remoteEP`: A reference to an `EndPoint` of the same type as the endpoint of the remote host to be updated on successful receive.

Returns: The number of bytes received.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.

-or-

`remoteEP` is `null`.
- `ArgumentOutOfRangeException`: `size` is less than 0.

-or-

`size` is greater than the length of `buffer`.
- `SocketException`: `socketFlags` is not a valid combination of values.

-or-

The `Socket.LocalEndPoint` property was not set.

-or-

An operating system error occurs while accessing the `Socket`.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SecurityException`: A caller in the call stack does not have the required permissions.

#### Remarks
The `Socket.ReceiveFrom` method reads data into the `buffer` parameter, returns the number of bytes successfully read, and captures the remote host endpoint from which the data was sent. This method is useful if you intend to receive connectionless datagrams from an unknown host or multiple hosts.

This overload only requires you to provide a receive buffer, the number of bytes you want to receive, the necessary `SocketFlags`, and an `EndPoint` that represents the remote host. The buffer offset defaults to 0.

With connectionless protocols, `Socket.ReceiveFrom` will read the first enqueued datagram received into the local network buffer. If the datagram you receive is larger than the size of `buffer`, the `Socket.ReceiveFrom` method will fill `buffer` with as much of the message as is possible, and throw a `SocketException`. If you are using an unreliable protocol, the excess data will be lost. If you are using a reliable protocol, the excess data will be retained by the service provider and you can retrieve it by calling the `Socket.ReceiveFrom` method with a large enough buffer.

If no data is available for reading, the `Socket.ReceiveFrom` method will block until data is available. If you are in non-blocking mode, and there is no data available in the protocol stack buffer, the `Socket.ReceiveFrom` method will complete immediately and throw a `SocketException`. You can use the `Available` property to determine if data is available for reading. When `Socket.Available` is non-zero, retry the receive operation.

Although `Socket.ReceiveFrom` is intended for connectionless protocols, you can use a connection-oriented protocol as well. If you choose to do so, you must first either establish a remote host connection by calling the `Socket.Connect` method or accept an incoming remote host connection by calling the `Socket.Accept` method. If you do not establish or accept a connection before calling the `Socket.ReceiveFrom` method, you will get a `SocketException`. You can also establish a default remote host for a connectionless protocol prior to calling the `Socket.ReceiveFrom` method.

With connection-oriented sockets, `Socket.ReceiveFrom` will read as much data as is available up to the number of bytes specified by the `size` parameter. If the remote host shuts down the `Socket` connection with the `Socket.Shutdown` method, and all available data has been received, the `Socket.ReceiveFrom` method will complete immediately and return zero bytes.

> **Note:**
> Before calling `Socket.ReceiveFrom`, you must explicitly bind the `Socket` to a local endpoint using the `Socket.Bind` method. If you do not, `Socket.ReceiveFrom` will throw a `SocketException`. If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> The `AddressFamily` of the `EndPoint` used in `Socket.ReceiveFrom` needs to match the `AddressFamily` of the `EndPoint` used in `Socket.SendTo`.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example receives a connectionless datagram from a remote host. The buffer size, and `SocketFlags` are passed to the `Socket.ReceiveFrom` method.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/Socket/Receive/source.cs._
