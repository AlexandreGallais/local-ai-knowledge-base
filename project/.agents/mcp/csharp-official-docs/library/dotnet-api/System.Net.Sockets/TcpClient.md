---
title: "TcpClient class (part 1 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/TcpClient.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TcpClient class

Namespace: `System.Net.Sockets`

```csharp
public class TcpClient : IDisposable
```

Provides client connections for TCP network services.

#### Remarks
The `TcpClient` class provides simple methods for connecting, sending, and receiving stream data over a network in synchronous blocking mode.

In order for `TcpClient` to connect and exchange data, a `TcpListener` or `Socket` created with the TCP `ProtocolType` must be listening for incoming connection requests. You can connect to this listener in one of the following two ways:

- Create a `TcpClient` and call one of the three available `TcpClient.Connect` methods.

- Create a `TcpClient` using the host name and port number of the remote host. This constructor will automatically attempt a connection.

> **Note:**
> If you want to send connectionless datagrams in synchronous blocking mode, use the `UdpClient` class.

#### Examples
The following code example establishes a `TcpClient` connection.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/TcpClient/Overview/tcpclient.cs._

## TcpClient.TcpClient() constructor

```csharp
public TcpClient ();
```

Initializes a new instance of the `TcpClient` class.

#### Remarks
This constructor creates a new `TcpClient` and allows the underlying service provider to assign the most appropriate local IP address and port number. You must first call the `TcpClient.Connect` method before sending and receiving data.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example demonstrates how to use the parameterless constructor to create a new `TcpClient`.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/TcpClient/.ctor/source.cs._

## TcpClient.TcpClient(IPEndPoint) constructor

```csharp
public TcpClient (System.Net.IPEndPoint localEP);
```

Initializes a new instance of the `TcpClient` class and binds it to the specified local endpoint.

Parameters:

- `localEP`: The `IPEndPoint` to which you bind the TCP `Socket`.

Exceptions:

- `ArgumentNullException`: The  `localEP` parameter is `null`.

#### Remarks
This constructor creates a new `TcpClient` and binds it to the `IPEndPoint` specified by the `localEP` parameter. Before you call this constructor, you must create an `IPEndPoint` using the IP address and port number from which you intend to send and receive data. You do not need to specify a local IP address and port number before connecting and communicating. If you create a `TcpClient` using any other constructor, the underlying service provider will assign the most appropriate local IP address and port number.

You must call the `TcpClient.Connect` method before sending and receiving data.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example demonstrates how to create an instance of the `TcpClient` class using a local endpoint.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/TcpClient/.ctor/source.cs._

## TcpClient.TcpClient(AddressFamily) constructor

```csharp
public TcpClient (System.Net.Sockets.AddressFamily family);
```

Initializes a new instance of the `TcpClient` class with the specified family.

Parameters:

- `family`: The `IPAddress.AddressFamily` of the IP protocol.

Exceptions:

- `ArgumentException`: The `family` parameter is not equal to AddressFamily.InterNetwork

-or-

The `family` parameter is not equal to AddressFamily.InterNetworkV6

#### Remarks

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example demonstrates how to create an instance of the `TcpClient` class.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/TcpClient/.ctor/source.cs._

## TcpClient.TcpClient(String, Int32) constructor

```csharp
public TcpClient (string hostname, int port);
```

Initializes a new instance of the `TcpClient` class and connects to the specified port on the specified host.

Parameters:

- `hostname`: The DNS name of the remote host to which you intend to connect.
- `port`: The port number of the remote host to which you intend to connect.

Exceptions:

- `ArgumentNullException`: The `hostname` parameter is `null`.
- `ArgumentOutOfRangeException`: The `port` parameter is not between `IPEndPoint.MinPort` and `IPEndPoint.MaxPort`.
- `SocketException`: An error occurred when accessing the socket.

#### Remarks
This constructor creates a new `TcpClient` and makes a synchronous connection attempt to the provided host name and port number. The underlying service provider will assign the most appropriate local IP address and port number. `TcpClient` will block until it either connects or fails. This constructor allows you to initialize, resolve the DNS host name, and connect in one convenient step.

If IPv6 is enabled and the `%23ctor` method is called to connect to a host that resolves to both IPv6 and IPv4 addresses, the connection to the IPv6 address will be attempted first before the IPv4 address. This may have the effect of delaying the time to establish the connection if the host is not listening on the IPv6 address.

> **Note:**
> If you receive a `SocketException`, use `SocketException.ErrorCode` to obtain the specific error code. After you have obtained this code, you can refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example demonstrates how to create an instance of the `TcpClient` class using a host name and port number.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/TcpClient/.ctor/source.cs._

## TcpClient.Active property

```csharp
protected bool Active { get; set; }
```

Gets or sets a value that indicates whether a connection has been made.

Returns: `true` if the connection has been made; otherwise, `false`.

#### Remarks
Classes deriving from `TcpClient` can use this property to determine if a connection attempt has succeeded. It does not monitor the ongoing connection state of `TcpClient`. If the remote host closes the connection, `Active` will not be updated. If you are deriving from `TcpClient` and require closer attention to the connection state, use the `Connected` property of the `Socket` returned by the `Client` property.

## TcpClient.Available property

```csharp
public int Available { get; }
```

Gets the amount of data that has been received from the network and is available to be read.

Returns: The number of bytes of data received from the network and available to be read.

Exceptions:

- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

#### Remarks
The `Available` property is a way to determine whether data is queued for reading. If data is available, call `NetworkStream.Read` to get the data. The available data is the total amount of data queued in the network buffer for reading. If no data is queued in the network buffer, `Available` returns 0.

If the remote host shuts down or closes the connection, `Available` may throw a `SocketException`. If you receive a `SocketException`, use `SocketException.ErrorCode` to obtain the specific error code. After you have obtained this code, you can refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

#### Examples
The following code example shows the use of the `Available` property.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/TcpClient/Available/newtcpclient.cs._
## TcpClient.Client property

```csharp
public System.Net.Sockets.Socket Client { get; set; }
```

Gets or sets the underlying `Socket`.

Returns: The underlying network `Socket`.

#### Remarks
`TcpClient` creates a `Socket` to send and receive data over a network. Classes deriving from `TcpClient` can use this property to get or set this `Socket`. Use the underlying `Socket` returned from `Client` if you require access beyond that which `TcpClient` provides. You can also use `Client` to set the underlying `Socket` to an existing `Socket`. This might be useful if you want to take advantage of the simplicity of `TcpClient` using a pre-existing `Socket`.

#### Examples
The following code example demonstrates the use of the `Client` property. In this example, the receive buffer size of the underlying `Socket` is changed.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/TcpClient/Client/source.cs._

## TcpClient.Connected property

```csharp
public bool Connected { get; }
```

Gets a value indicating whether the underlying `Socket` for a `TcpClient` is connected to a remote host.

Returns: `true` if the `TcpClient.Client` socket was connected to a remote resource as of the most recent operation; otherwise, `false`.

#### Remarks
The `Connected` property gets the connection state of the `TcpClient.Client` socket as of the last I/O operation. When it returns `false`, the `Client` socket was either never connected, or is no longer connected.

Because the `Connected` property only reflects the state of the connection as of the most recent operation, you should attempt to send or receive a message to determine the current state. After the message send fails, this property no longer returns `true`. Note that this behavior is by design. You cannot reliably test the state of the connection because, in the time between the test and a send/receive, the connection could have been lost. Your code should assume the socket is connected, and gracefully handle failed transmissions.

#### Examples
The following code example connects to a remote endpoint and then verifies the connection.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/TcpClient/Available/newtcpclient.cs._
## TcpClient.ExclusiveAddressUse property

```csharp
public bool ExclusiveAddressUse { get; set; }
```

Gets or sets a `Boolean` value that specifies whether the `TcpClient` allows only one client to use a port.

Returns: `true` if the `TcpClient` allows only one client to use a specific port; otherwise, `false`. The default is `true`.

Exceptions:

- `SocketException`: An error occurred when attempting to access the underlying socket.
- `ObjectDisposedException`: The underlying `Socket` has been closed.

#### Remarks
By default, multiple clients can use a specific port; however, only one of the clients can perform operations on the network traffic sent to the port. You can use the `ExclusiveAddressUse` property to prevent multiple clients from using a specific port.

This property must be set before the underlying socket is bound to a client port. If you call `TcpClient.Connect`, `TcpClient.BeginConnect`, `%23ctor`, or `%23ctor`, the client port is bound as a side effect of the method, and you cannot subsequently set the `ExclusiveAddressUse` property.

#### Examples
The following code example creates a `TcpClient` and gets and sets the value of the `ExclusiveAddressUse` property.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/TcpClient/Available/newtcpclient.cs._
## TcpClient.LingerState property

```csharp
public System.Net.Sockets.LingerOption? LingerState { get; set; }
```

Gets or sets information about the linger state of the associated socket.

Returns: A `LingerOption`. By default, lingering is disabled.

#### Remarks
The `LingerState` property changes the way `Socket.Close` method behaves. This property when set modifies the conditions under which the connection can be reset by Winsock. Connection resets can still occur based on the IP protocol behavior.

This property controls the length of time that the TCP connection will remain open after a call to `TcpClient.Close` when data remains to be sent. When you call the `NetworkStream.Write` method, data is placed in the outgoing network buffer. This property can be used to ensure that this data is sent to the remote host before the `TcpClient.Close` method drops the connection.

To enable lingering, create a `LingerOption` instance containing the desired values, and set the `LingerState` property to this instance.

The following table describes the behavior of the `TcpClient.Close` method for the possible values of the `Enabled` property and the `LingerTime` property stored in the `LingerState` property.

|LingerState.Enabled|LingerState.LingerTime|Behavior|
|-------------------------|----------------------------|--------------|
|`false` (disabled), the default value|The time-out is not applicable, (default).|Attempts to send pending data until the default IP protocol time-out expires.|
|`true` (enabled)|A nonzero time-out|Attempts to send pending data until the specified time-out expires, and if the attempt fails, then Winsock resets the connection.|
|`true` (enabled)|A zero timeout.|Discards any pending data and Winsock resets the connection.|

The IP stack computes the default IP protocol time-out period to use based on the round trip time of the connection. In most cases, the time-out computed by the stack is more relevant than one defined by an application. This is the default behavior for a socket when the `LingerState` property is not set.

When the `LingerTime` property stored in the `LingerState` property is set greater than the default IP protocol time-out, the default IP protocol time-out will still apply and override.

#### Examples
The following code example sets and gets the sockets linger time.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/TcpClient/.ctor/source.cs._

## TcpClient.NoDelay property

```csharp
public bool NoDelay { get; set; }
```

Gets or sets a value that disables a delay when send or receive buffers are not full.

Returns: `true` if the delay is disabled; otherwise, `false`. The default value is `false`.

#### Remarks
When `NoDelay` is `false`, a `TcpClient` does not send a packet over the network until it has collected a significant amount of outgoing data. Because of the amount of overhead in a TCP segment, sending small amounts of data is inefficient. However, situations do exist where you need to send very small amounts of data or expect immediate responses from each packet you send. Your decision should weigh the relative importance of network efficiency versus application requirements.

#### Examples
The following code example disables the delay. It then checks the value of `NoDelay` to verify that the property was successfully set.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/TcpClient/.ctor/source.cs._
