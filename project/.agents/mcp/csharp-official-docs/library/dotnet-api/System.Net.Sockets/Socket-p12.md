---
title: "Socket class (part 12 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/Socket.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Socket class (part 12 of 33)

## Socket.Connect(IPAddress, Int32) method

```csharp
public void Connect (System.Net.IPAddress address, int port);
```

Establishes a connection to a remote host. The host is specified by an IP address and a port number.

Parameters:

- `address`: The IP address of the remote host.
- `port`: The port number of the remote host.

Exceptions:

- `ArgumentNullException`: `address` is `null`.
- `ArgumentOutOfRangeException`: The port number is not valid.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `NotSupportedException`: This method is valid for sockets in the `AddressFamily.InterNetwork` or `AddressFamily.InterNetworkV6` families.
- `ArgumentException`: The length of `address` is zero.
- `InvalidOperationException`: The `Socket` has been placed in a listening state by calling `Socket.Listen`.

#### Remarks
If you are using a connection-oriented protocol such as TCP, the `Socket.Connect` method synchronously establishes a network connection between `Socket.LocalEndPoint` and the specified remote endpoint. If you are using a connectionless protocol, `Socket.Connect` establishes a default remote host. After you call `Socket.Connect` you can send data to the remote device with the `Socket.Send` method, or receive data from the remote device with the `Socket.Receive` method.

If you are using a connectionless protocol such as UDP, you do not have to call `Socket.Connect` before sending and receiving data. You can use `Socket.SendTo` and `Socket.ReceiveFrom` to synchronously communicate with a remote host. If you do call `Socket.Connect` any datagrams that arrive from an address other than the specified default will be discarded. If you want to set your default remote host to a broadcast address, you must first call the `Socket.SetSocketOption` method and set the socket option to `Broadcast`, or `Socket.Connect` will throw a `SocketException`. If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

`Socket.Connect` method will block, unless you specifically set the `Blocking` property to `false` prior to calling `Socket.Connect`. If you are using a connection-oriented protocol like TCP and you do disable blocking, `Socket.Connect` will throw a `SocketException` because it needs time to make the connection. Connectionless protocols will not throw an exception because they simply establish a default remote host. You can use `SocketException.ErrorCode` to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error. If the error returned WSAEWOULDBLOCK, the remote host connection has been initiated by a connection-oriented `Socket`, but has not yet completed successfully. Use the `Socket.Poll` method to determine when the `Socket` is finished connecting.

> **Note:**
> If you are using a connection-oriented protocol and did not call `Socket.Bind` before calling `Socket.Connect`, the underlying service provider will assign the local network address and port number. If you are using a connectionless protocol, the service provider will not assign a local network address and port number until you complete a send or receive operation. If you want to change the default remote host, call `Socket.Connect` again with the desired endpoint.

> **Note:**
> If the socket has been previously disconnected, then you cannot use this method to restore the connection. Use one of the asynchronous `Socket.BeginConnect` methods to reconnect. This is a limitation of the underlying provider.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example connects to a remote endpoint and then verifies the connection.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/Socket/BeginConnect/beginconnect.cs._
## Socket.Connect(IPAddress[], Int32) method

```csharp
public void Connect (System.Net.IPAddress[] addresses, int port);
```

Establishes a connection to a remote host. The host is specified by an array of IP addresses and a port number.

Parameters:

- `addresses`: The IP addresses of the remote host.
- `port`: The port number of the remote host.

Exceptions:

- `ArgumentNullException`: `addresses` is `null`.
- `ArgumentOutOfRangeException`: The port number is not valid.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `NotSupportedException`: The socket is not in the `AddressFamily.InterNetwork` or `AddressFamily.InterNetworkV6` families.
- `ArgumentException`: The length of `addresses` is zero.
- `InvalidOperationException`: The `Socket` has been placed in a listening state by calling `Socket.Listen`.

#### Remarks
This method is typically used immediately after a call to `Dns.GetHostAddresses`, which can return multiple IP addresses for a single host. If you are using a connection-oriented protocol such as TCP, the `Socket.Connect` method synchronously establishes a network connection between `Socket.LocalEndPoint` and the specified remote endpoint. If you are using a connectionless protocol, `Socket.Connect` establishes a default remote host. After you call `Socket.Connect` you can send data to the remote device with the `Socket.Send` method, or receive data from the remote device with the `Socket.Receive` method.

If you are using a connectionless protocol such as UDP, you do not have to call `Socket.Connect` before sending and receiving data. You can use `Socket.SendTo` and `Socket.ReceiveFrom` to synchronously communicate with a remote host. If you do call `Socket.Connect` any datagrams that arrive from an address other than the specified default will be discarded. If you want to set your default remote host to a broadcast address, you must first call the `Socket.SetSocketOption` method and set the socket option to `Broadcast`, or `Socket.Connect` will throw a `SocketException`. If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

`Socket.Connect` method will block, unless you specifically set the `Blocking` property to `false` prior to calling `Socket.Connect`. If you are using a connection-oriented protocol like TCP and you do disable blocking, `Socket.Connect` will throw a `SocketException` because it needs time to make the connection. Connectionless protocols will not throw an exception because they simply establish a default remote host. You can use `SocketException.ErrorCode` to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error. If the error returned WSAEWOULDBLOCK, the remote host connection has been initiated by a connection-oriented `Socket`, but has not yet completed successfully. Use the `Socket.Poll` method to determine when the `Socket` is finished connecting.

> **Note:**
> If you are using a connection-oriented protocol and did not call `Socket.Bind` before calling `Socket.Connect`, the underlying service provider will assign the local network address and port number. If you are using a connectionless protocol, the service provider will not assign a local network address and port number until you complete a send or receive operation. If you want to change the default remote host, call `Socket.Connect` again with the desired endpoint.

> **Note:**
> If the socket has been previously disconnected, then you cannot use this method to restore the connection. Use one of the asynchronous `Socket.BeginConnect` methods to reconnect. This is a limitation of the underlying provider.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example connects to a remote endpoint and then verifies the connection.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/Socket/BeginConnect/beginconnect.cs._
## Socket.Connect(String, Int32) method

```csharp
public void Connect (string host, int port);
```

Establishes a connection to a remote host. The host is specified by a host name and a port number.

Parameters:

- `host`: The name of the remote host.
- `port`: The port number of the remote host.

Exceptions:

- `ArgumentNullException`: `host` is `null`.
- `ArgumentOutOfRangeException`: The port number is not valid.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `NotSupportedException`: The socket is not in the `AddressFamily.InterNetwork` or `AddressFamily.InterNetworkV6` families.
- `InvalidOperationException`: The `Socket` has been placed in a listening state by calling `Socket.Listen`.

#### Remarks
If you're using a connection-oriented protocol such as TCP, the `Socket.Connect` method synchronously establishes a network connection between `Socket.LocalEndPoint` and the specified remote host. If you are using a connectionless protocol, `Socket.Connect` establishes a default remote host. After you call `Socket.Connect` you can send data to the remote device with the `Socket.Send` method, or receive data from the remote device with the `Socket.Receive` method.

If you're using a connectionless protocol such as UDP, you do not have to call `Socket.Connect` before sending and receiving data. You can use `Socket.SendTo` and `Socket.ReceiveFrom` to synchronously communicate with a remote host. If you do call `Socket.Connect` any datagrams that arrive from an address other than the specified default will be discarded. If you want to set your default remote host to a broadcast address, you must first call the `Socket.SetSocketOption` method and set the socket option to `Broadcast`, or `Socket.Connect` will throw a `SocketException`. If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

The `Socket.Connect` method will block, unless you specifically set the `Blocking` property to `false` prior to calling `Socket.Connect`. If you're using a connection-oriented protocol like TCP and you do disable blocking, `Socket.Connect` will throw a `SocketException` because it needs time to make the connection. Connectionless protocols will not throw an exception because they simply establish a default remote host. You can use `SocketException.ErrorCode` to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error. If the error returned WSAEWOULDBLOCK, the remote host connection has been initiated by a connection-oriented `Socket`, but has not yet completed successfully. Use the `Socket.Poll` method to determine when the `Socket` is finished connecting.

If IPv6 is enabled and the `Connect` method is called to connect to a host that resolves to both IPv6 and IPv4 addresses, the connection to the IPv6 address will be attempted first before the IPv4 address. This may have the effect of delaying the time to establish the connection if the host is not listening on the IPv6 address.

> **Note:**
> If you're using a connection-oriented protocol and did not call `Socket.Bind` before calling `Socket.Connect`, the underlying service provider will assign the local network address and port number. If you are using a connectionless protocol, the service provider will not assign a local network address and port number until you complete a send or receive operation. If you want to change the default remote host, call `Socket.Connect` again with the desired endpoint.

> **Note:**
> If the socket has been previously disconnected, then you cannot use this method to restore the connection. Use one of the asynchronous `Socket.BeginConnect` methods to reconnect. This is a limitation of the underlying provider.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example connects to a remote endpoint and then verifies the connection.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/Socket/BeginConnect/beginconnect.cs._
## Socket.ConnectAsync(EndPoint) method

```csharp
public System.Threading.Tasks.Task ConnectAsync (System.Net.EndPoint remoteEP);
```

Establishes a connection to a remote host.

Parameters:

- `remoteEP`: The endpoint to connect to.

Returns: An asynchronous task that completes when the connection is established.

Exceptions:

- `ArgumentNullException`: The `remoteEP` parameter cannot be null.
- `InvalidOperationException`: The `Socket` is listening.
- `SocketException`: An error occurred when attempting to access the socket.
- `NotSupportedException`: The local endpoint and the `remoteEP` parameter are not the same address family.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SecurityException`: A caller higher in the call stack does not have permission for the requested operation.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Socket.Connect`.
