---
title: "Socket class (part 8 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/Socket.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Socket class (part 8 of 33)

## Socket.BeginReceiveFrom(Byte[], Int32, Int32, SocketFlags, EndPoint, AsyncCallback, Object) method

```csharp
public IAsyncResult BeginReceiveFrom (byte[] buffer, int offset, int size, System.Net.Sockets.SocketFlags socketFlags, ref System.Net.EndPoint remoteEP, AsyncCallback? callback, object? state);
```

Begins to asynchronously receive data from a specified network device.

Parameters:

- `buffer`: An array of type `Byte` that is the storage location for the received data.
- `offset`: The zero-based position in the `buffer` parameter at which to store the data.
- `size`: The number of bytes to receive.
- `socketFlags`: A bitwise combination of the `SocketFlags` values.
- `remoteEP`: A reference to an `EndPoint` of the same type as the endpoint of the remote host to be updated on synchronous receive.
- `callback`: The `AsyncCallback` delegate.
- `state`: An object that contains state information for this request.

Returns: An `IAsyncResult` that references the asynchronous read.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.

-or-

`remoteEP` is `null`.
- `ArgumentOutOfRangeException`: `offset` is less than 0.

-or-

`offset` is greater than the length of `buffer`.

-or-

`size` is less than 0.

-or-

`size` is greater than the length of `buffer` minus the value of the `offset` parameter.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SecurityException`: A caller higher in the call stack does not have permission for the requested operation.

#### Remarks
> **Important:**
> This is a compatibility API. We don't recommend using the APM (`Begin*` and `End*`) methods for new development. Instead, use the `Task`-based equivalents.

You can pass a callback that implements `AsyncCallback` to `Socket.BeginReceiveFrom` in order to get notified about the completion of the operation. Note that if the underlying network stack completes the operation synchronously, the callback will be executed inline, during the call to `Socket.BeginReceiveFrom`. In this case, the `CompletedSynchronously` property on the returned `IAsyncResult` will be set to `true` to indicate that the method completed synchronously. Use the `AsyncState` property of the `IAsyncResult` to obtain the state object passed to the `Socket.BeginReceiveFrom` method.

The asynchronous `Socket.BeginReceiveFrom` operation must be completed by calling the `Socket.EndReceiveFrom` method. Typically, the method is invoked by the `AsyncCallback` delegate. `Socket.EndReceiveFrom` will block the calling thread until the operation is completed.

This method reads data into the `buffer` parameter, and captures the remote host endpoint from which the data is sent. For information on how to retrieve this endpoint, refer to `Socket.EndReceiveFrom`. This method is most useful if you intend to asynchronously receive connectionless datagrams from an unknown host or multiple hosts. In these cases, `Socket.BeginReceiveFrom` will read the first enqueued datagram received into the local network buffer. If the datagram you receive is larger than the size of `buffer`, the `Socket.BeginReceiveFrom` method will fill `buffer` with as much of the message as is possible, and throw a `SocketException`. If you are using an unreliable protocol, the excess data will be lost. If you are using a reliable protocol, the excess data will be retained by the service provider and you can retrieve it by calling the `Socket.BeginReceiveFrom` method with a large enough buffer.

To guarantee that the remote host endpoint is always returned, an application should explicitly bind the `Socket` to a local endpoint using the `Socket.Bind` method and then call the `Socket.SetSocketOption` method with the `optionLevel` parameter set to `IP` or `IPv6` as appropriate, the `optionName` parameter set to `PacketInformation`, and the `optionValue` parameter to enable this option before calling the `Socket.BeginReceiveFrom` method. Otherwise, it is possible for the remote host endpoint to not be returned when the sender has sent a number of datagrams before the receiver has called the `Socket.BeginReceiveFrom` method.

Although `Socket.BeginReceiveFrom` is intended for connectionless protocols, you can use a connection-oriented protocol as well. If you choose to do so, you must first either establish a remote host connection by calling the `Socket.Connect` / `Socket.BeginConnect` method or accept an incoming connection request by calling the `Socket.Accept` or `Socket.BeginAccept` method. If you call the `Socket.BeginReceiveFrom` method before establishing or accepting a connection, you will get a `SocketException`. You can also establish a default remote host for a connectionless protocol prior to calling the `Socket.BeginReceiveFrom` method.

The `remoteEp` parameter

With connection-oriented sockets, `Socket.BeginReceiveFrom` will read as much data as is available up to the number of bytes specified by the `size` parameter.

To cancel a pending `Socket.BeginReceiveFrom`, call the `Socket.Close` method.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code.

> **Note:**
> The execution context (the security context, the impersonated user, and the calling context) is cached for the asynchronous `Socket` methods. After the first use of a particular context (a specific asynchronous `Socket` method, a specific `Socket` instance, and a specific callback), subsequent uses of that context will see a performance improvement.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

## Socket.BeginReceiveMessageFrom(Byte[], Int32, Int32, SocketFlags, EndPoint, AsyncCallback, Object) method

```csharp
public IAsyncResult BeginReceiveMessageFrom (byte[] buffer, int offset, int size, System.Net.Sockets.SocketFlags socketFlags, ref System.Net.EndPoint remoteEP, AsyncCallback? callback, object? state);
```

Begins to asynchronously receive the specified number of bytes of data into the specified location of the data buffer, using the specified `SocketFlags`, and stores the endpoint and packet information.

Parameters:

- `buffer`: An array of type `Byte` that is the storage location for the received data.
- `offset`: The zero-based position in the `buffer` parameter at which to store the data.
- `size`: The number of bytes to receive.
- `socketFlags`: A bitwise combination of the `SocketFlags` values.
- `remoteEP`: A reference to an `EndPoint` of the same type as the endpoint of the remote host to be updated on synchronous receive.
- `callback`: The `AsyncCallback` delegate.
- `state`: An object that contains state information for this request.

Returns: An `IAsyncResult` that references the asynchronous read.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.

-or-

`remoteEP` is `null`.
- `ArgumentOutOfRangeException`: `offset` is less than 0.

-or-

`offset` is greater than the length of `buffer`.

-or-

`size` is less than 0.

-or-

`size` is greater than the length of `buffer` minus the value of the `offset` parameter.
- `ObjectDisposedException`: The `Socket` has been closed.

#### Remarks
> **Important:**
> This is a compatibility API. We don't recommend using the APM (`Begin*` and `End*`) methods for new development. Instead, use the `Task`-based equivalents.

You can pass a callback that implements `AsyncCallback` to `Socket.BeginReceiveMessageFrom` in order to get notified about the completion of the operation. Note that if the underlying network stack completes the operation synchronously, the callback will be executed inline, during the call to `Socket.BeginReceiveMessageFrom`. In this case, the `CompletedSynchronously` property on the returned `IAsyncResult` will be set to `true` to indicate that the method completed synchronously. Use the `AsyncState` property of the `IAsyncResult` to obtain the state object passed to the `Socket.BeginReceiveMessageFrom` method.

The asynchronous `Socket.BeginReceiveMessageFrom` operation must be completed by calling the `Socket.EndReceiveMessageFrom` method. Typically, the method is invoked by the `AsyncCallback` delegate. `Socket.EndReceiveMessageFrom` will block the calling thread until the operation is completed.

To cancel a pending `Socket.BeginReceiveMessageFrom`, call the `Socket.Close` method.

This method reads data into the `buffer` parameter, and captures the remote host endpoint from which the data is sent, as well as information about the received packet. For information on how to retrieve this endpoint, refer to `Socket.EndReceiveMessageFrom`. This method is most useful if you intend to asynchronously receive connectionless datagrams from an unknown host or multiple hosts.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code.

> **Note:**
> The execution context (the security context, the impersonated user, and the calling context) is cached for the asynchronous `Socket` methods. After the first use of a particular context (a specific asynchronous `Socket` method, a specific `Socket` instance, and a specific callback), subsequent uses of that context will see a performance improvement.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

## Socket.BeginSend(Byte>>, SocketFlags, AsyncCallback, Object) method

```csharp
public IAsyncResult BeginSend (System.Collections.Generic.IList<ArraySegment<byte>> buffers, System.Net.Sockets.SocketFlags socketFlags, AsyncCallback? callback, object? state);
```

Sends data asynchronously to a connected `Socket`.

Parameters:

- `buffers`: An array of type `Byte` that contains the data to send.
- `socketFlags`: A bitwise combination of the `SocketFlags` values.
- `callback`: The `AsyncCallback` delegate.
- `state`: An object that contains state information for this request.

Returns: An `IAsyncResult` that references the asynchronous send.

Exceptions:

- `ArgumentNullException`: `buffers` is `null`.
- `ArgumentException`: `buffers` is empty.
- `ObjectDisposedException`: The `Socket` has been closed.

#### Remarks
> **Important:**
> This is a compatibility API. We don't recommend using the APM (`Begin*` and `End*`) methods for new development. Instead, use the `Task`-based equivalents.

You can pass a callback that implements `AsyncCallback` to `Socket.BeginSend` in order to get notified about the completion of the operation. Note that if the underlying network stack completes the operation synchronously, the callback will be executed inline, during the call to `Socket.BeginSend`. In this case, the `CompletedSynchronously` property on the returned `IAsyncResult` will be set to `true` to indicate that the method completed synchronously. Use the `AsyncState` property of the `IAsyncResult` to obtain the state object passed to the `Socket.BeginSend` method.

The asynchronous `Socket.BeginSend` operation must be completed by calling the `Socket.EndSend` method. Typically, the method is invoked by the `AsyncCallback` delegate. `Socket.EndSend` will block the calling thread until the operation is completed.

Although intended for connection-oriented protocols, `Socket.BeginSend` also works for connectionless protocols, provided that you first call the `Socket.Connect` or `Socket.BeginConnect` method to establish a default remote host. If you are using a connectionless protocol and plan to send data to several different hosts, you should use `Socket.BeginSendTo`. It is okay to use `Socket.BeginSendTo` even after you have established a default remote host with `Socket.Connect`. You can also change the default remote host prior to calling `Socket.BeginSend` by making another call to `Socket.Connect` or `Socket.BeginConnect`. With connectionless protocols, you must also be sure that the size of your buffer does not exceed the maximum packet size of the underlying service provider. If it does, the datagram will not be sent and `Socket.BeginSend` will throw a `SocketException`.

If you specify the `DontRoute` flag as the `socketflags` parameter, the data you are sending will not be routed.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code.

> **Note:**
> All I/O initiated by a given thread is canceled when that thread exits. A pending asynchronous operation can fail if the thread exits before the operation completes.

> **Note:**
> `state` is an instantiation of a user-defined class.

> **Note:**
> The successful completion of a send does not indicate that the data was successfully delivered. If no buffer space is available within the transport system to hold the data to be transmitted, send will block unless the socket has been placed in nonblocking mode.

> **Note:**
> The execution context (the security context, the impersonated user, and the calling context) is cached for the asynchronous `Socket` methods. After the first use of a particular context (a specific asynchronous `Socket` method, a specific `Socket` instance, and a specific callback), subsequent uses of that context will see a performance improvement.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.
