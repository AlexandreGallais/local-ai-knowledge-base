---
title: "Socket class (part 11 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/Socket.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Socket class (part 11 of 33)

## Socket.Bind(EndPoint) method

```csharp
public void Bind (System.Net.EndPoint localEP);
```

Associates a `Socket` with a local endpoint.

Parameters:

- `localEP`: The local `EndPoint` to associate with the `Socket`.

Exceptions:

- `ArgumentNullException`: `localEP` is `null`.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SecurityException`: A caller higher in the call stack does not have permission for the requested operation.

#### Remarks
Use the `Socket.Bind` method if you need to use a specific local endpoint. You must call `Socket.Bind` before you can call the `Socket.Listen` method. You do not need to call `Socket.Bind` before using the `Socket.Connect` method unless you need to use a specific local endpoint. You can use the `Socket.Bind` method on both connectionless and connection-oriented protocols.

Before calling `Socket.Bind`, you must first create the local `IPEndPoint` from which you intend to communicate data. If you do not care which local address is assigned, you can create an `IPEndPoint` using `Any` as the address parameter, and the underlying service provider will assign the most appropriate network address. This might help simplify your application if you have multiple network interfaces. If you do not care which local port is used, you can create an `IPEndPoint` using 0 for the port number. In this case, the service provider will assign an available port number between 1024 and 5000.

If you use the above approach, you can discover what local network address and port number has been assigned by calling the `Socket.LocalEndPoint`. If you are using a connection-oriented protocol, `Socket.LocalEndPoint` will not return the locally assigned network address until after you have made a call to the `Socket.Connect` or `Socket.EndConnect` method. If you are using a connectionless protocol, you will not have access to this information until you have completed a send or receive.

If a UDP socket wants to receive interface information on received packets,  the `Socket.SetSocketOption` method should be explicitly called with the socket option set to `PacketInformation` immediately after calling the `Socket.Bind` method.

> **Note:**
> If you intend to receive multicast datagrams, you must call the `Socket.Bind` method with a multicast port number.

> **Note:**
> You must call the `Socket.Bind` method if you intend to receive connectionless datagrams using the `Socket.ReceiveFrom` method.

> **Note:**
> If you receive a `SocketException` when calling the `Socket.Bind` method, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example binds a `Socket` using the specified local endpoint.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/Socket/Bind/source.cs._

## Socket.CancelConnectAsync(SocketAsyncEventArgs) method

```csharp
public static void CancelConnectAsync (System.Net.Sockets.SocketAsyncEventArgs e);
```

Cancels an asynchronous request for a remote host connection.

Parameters:

- `e`: The `SocketAsyncEventArgs` object used to request the connection to the remote host by calling one of the `Socket.ConnectAsync` methods.

Exceptions:

- `ArgumentNullException`: The `e` parameter cannot be null and the `SocketAsyncEventArgs.RemoteEndPoint` cannot be null.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SecurityException`: A caller higher in the call stack does not have permission for the requested operation.

#### Remarks
The `Socket.CancelConnectAsync` method cancels an asynchronous request for a remote host connection.

## Socket.Close() method

```csharp
public void Close ();
```

Closes the `Socket` connection and releases all associated resources.

#### Remarks
The `Socket.Close` method closes the remote host connection and releases all managed and unmanaged resources associated with the `Socket`. Upon closing, the `Connected` property is set to `false`.

For connection-oriented protocols, it is recommended that you call `Socket.Shutdown` before calling the `Socket.Close` method. This ensures that all data is sent and received on the connected socket before it is closed.

If you need to call `Socket.Close` without first calling `Socket.Shutdown`, you can ensure that data queued for outgoing transmission will be sent by setting the `DontLinger``Socket` option to `false` and specifying a non-zero time-out interval. `Socket.Close` will then block until this data is sent or until the specified time-out expires. If you set `DontLinger` to `false` and specify a zero time-out interval, `Socket.Close` releases the connection and automatically discards outgoing queued data.

> **Note:**
> To set the `DontLinger` socket option to `false`, create a `LingerOption`, set the enabled property to `true`, and set the `LingerTime` property to the desired time out period. Use this `LingerOption` along with the `DontLinger` socket option to call the `Socket.SetSocketOption` method.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example closes a `Socket`.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/Socket/Close/source.cs._

## Socket.Close(Int32) method

```csharp
public void Close (int timeout);
```

Closes the `Socket` connection and releases all associated resources with a specified timeout to allow queued data to be sent.

Parameters:

- `timeout`: Wait up to `timeout` milliseconds to send any remaining data, then close the socket.

#### Remarks
The `Socket.Close` method closes the remote host connection and releases all managed and unmanaged resources associated with the `Socket`. Upon closing, the `Connected` property is set to `false`.

For connection-oriented protocols, it is recommended that you call `Socket.Shutdown` before calling `Socket.Close`. This ensures that all data is sent and received on the connected socket before it is closed.

If you need to call `Socket.Close` without first calling `Socket.Shutdown`, you can ensure that data queued for outgoing transmission will be sent by setting the `DontLinger` option to `false` and specifying a non-zero time-out interval. `Socket.Close` will then block until this data is sent or until the specified time-out expires. If you set `DontLinger` to `false` and specify a zero time-out interval, `Socket.Close` releases the connection and automatically discards outgoing queued data.

> **Note:**
> To set the `DontLinger` socket option to `false`, create a `LingerOption`, set the enabled property to `true`, and set the `LingerTime` property to the desired time-out period. Use this `LingerOption` along with the `DontLinger` socket option to call the `Socket.SetSocketOption` method.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example demonstrates how to close a `Socket`.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/Socket/Close/source.cs._

## Socket.Connect(EndPoint) method

```csharp
public void Connect (System.Net.EndPoint remoteEP);
```

Establishes a connection to a remote host.

Parameters:

- `remoteEP`: An `EndPoint` that represents the remote device.

Exceptions:

- `ArgumentNullException`: `remoteEP` is `null`.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SecurityException`: A caller higher in the call stack does not have permission for the requested operation.
- `InvalidOperationException`: The `Socket` has been placed in a listening state by calling `Socket.Listen`.

#### Remarks
If you are using a connection-oriented protocol such as TCP, the `Socket.Connect` method synchronously establishes a network connection between `Socket.LocalEndPoint` and the specified remote endpoint. If you are using a connectionless protocol, `Socket.Connect` establishes a default remote host. After you call `Socket.Connect`, you can send data to the remote device with the `Socket.Send` method, or receive data from the remote device with the `Socket.Receive` method.

If you are using a connectionless protocol such as UDP, you do not have to call `Socket.Connect` before sending and receiving data. You can use `Socket.SendTo` and `Socket.ReceiveFrom` to synchronously communicate with a remote host. If you do call `Socket.Connect`, any datagrams that arrive from an address other than the specified default will be discarded. If you want to set your default remote host to a broadcast address, you must first call the `Socket.SetSocketOption` method and set the socket option to `Broadcast`, or `Socket.Connect` will throw a `SocketException`. If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

The `Socket.Connect` method will block, unless you specifically set the `Blocking` property to `false` prior to calling `Socket.Connect`. If you are using a connection-oriented protocol like TCP and you do disable blocking, `Socket.Connect` will throw a `SocketException` because it needs time to make the connection. Connectionless protocols will not throw an exception because they simply establish a default remote host. You can use `SocketException.ErrorCode` to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error. If the error returned WSAEWOULDBLOCK, the remote host connection has been initiated by a connection-oriented `Socket`, but has not yet completed successfully. Use the `Socket.Poll` method to determine when the `Socket` is finished connecting.

> **Note:**
> If you are using a connection-oriented protocol and did not call `Socket.Bind` before calling `Socket.Connect`, the underlying service provider will assign the local network address and port number. If you are using a connectionless protocol, the service provider will not assign a local network address and port number until you complete a send or receive operation. If you want to change the default remote host, call `Socket.Connect` again with the desired endpoint.

> **Note:**
> If the socket has been previously disconnected, then you cannot use this method to restore the connection. Use one of the asynchronous `Socket.BeginConnect` methods to reconnect. This is a limitation of the underlying provider.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.
#### Examples
The following code example connects to a remote endpoint and then verifies the connection.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/Socket/Connect/source.cs._
