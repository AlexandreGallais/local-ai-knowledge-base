---
title: "TcpListener class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/TcpListener.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TcpListener class

Namespace: `System.Net.Sockets`

```csharp
public class TcpListener : IDisposable
```

Listens for connections from TCP network clients.

#### Remarks
The `TcpListener` class provides simple methods that listen for and accept incoming connection requests in blocking synchronous mode. You can use either a `TcpClient` or a `Socket` to connect with a `TcpListener`. Create a `TcpListener` using an `IPEndPoint`, a Local IP address and port number, or just a port number. Specify `Any` for the local IP address and 0 for the local port number if you want the underlying service provider to assign those values for you. If you choose to do this, you can use the `LocalEndpoint` property to identify the assigned information, after the socket has connected.

Use the `TcpListener.Start` method to begin listening for incoming connection requests. `TcpListener.Start` will queue incoming connections until you either call the `TcpListener.Stop` method or it has queued `MaxConnections`. Use either `TcpListener.AcceptSocket` or `TcpListener.AcceptTcpClient` to pull a connection from the incoming connection request queue. These two methods will block. If you want to avoid blocking, you can use the `TcpListener.Pending` method first to determine if connection requests are available in the queue.

Call the `TcpListener.Stop` method to close the `TcpListener`.

> **Note:**
> The `TcpListener.Stop` method does not close any accepted connections. You are responsible for closing these separately.

#### Examples
The following code example creates a `TcpListener`.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/TcpListener/Overview/tcpserver.cs._

See `TcpClient` for a client example.

## TcpListener.TcpListener(Int32) constructor

```csharp
public TcpListener (int port);
```

Initializes a new instance of the `TcpListener` class that listens on the specified port.

Parameters:

- `port`: The port on which to listen for incoming connection attempts.

Exceptions:

- `ArgumentOutOfRangeException`: `port` is not between `IPEndPoint.MinPort` and `IPEndPoint.MaxPort`.

To be added.

## TcpListener.TcpListener(IPEndPoint) constructor

```csharp
public TcpListener (System.Net.IPEndPoint localEP);
```

Initializes a new instance of the `TcpListener` class with the specified local endpoint.

Parameters:

- `localEP`: An `IPEndPoint` that represents the local endpoint to which to bind the listener `Socket`.

Exceptions:

- `ArgumentNullException`: `localEP` is `null`.

#### Remarks
This constructor allows you to specify the local IP address and port number on which to listen for incoming connection attempts. Before using this constructor, you must create an `IPEndPoint` using the desired local IP address and port number. Pass this `IPEndPoint` to the constructor as the `localEP` parameter.

If you do not care which local address is assigned, you can create an `IPEndPoint` using `Any` as the address parameter, and the underlying service provider will assign the most appropriate network address. This might help simplify your application if you have multiple network interfaces. If you do not care which local port is used, you can create an `IPEndPoint` using 0 for the port number. In this case, the service provider will assign an available ephemeral port number. If you use this approach, you can discover what local network address and port number has been assigned by using the `LocalEndpoint` property.

Call the `TcpListener.Start` method to begin listening for incoming connection attempts.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example creates an instance of the `TcpListener` class using the local endpoint.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/TcpListener/.ctor/source.cs._

## TcpListener.TcpListener(IPAddress, Int32) constructor

```csharp
public TcpListener (System.Net.IPAddress localaddr, int port);
```

Initializes a new instance of the `TcpListener` class that listens for incoming connection attempts on the specified local IP address and port number.

Parameters:

- `localaddr`: An `IPAddress` that represents the local IP address.
- `port`: The port on which to listen for incoming connection attempts.

Exceptions:

- `ArgumentNullException`: `localaddr` is `null`.
- `ArgumentOutOfRangeException`: `port` is not between `IPEndPoint.MinPort` and `IPEndPoint.MaxPort`.

#### Remarks
This constructor allows you to specify the local IP address and port number on which to listen for incoming connection attempts. Before calling this constructor you must first create an `IPAddress` using the desired local address. Pass this `IPAddress` to the constructor as the `localaddr` parameter. If you do not care which local address is assigned, specify `Any` for the `localaddr` parameter, and the underlying service provider will assign the most appropriate network address. This might help simplify your application if you have multiple network interfaces. If you do not care which local port is used, you can specify 0 for the port number. In this case, the service provider will assign an available port number between 1024 and 65535. If you use this approach, you can discover what local network address and port number has been assigned by using the `LocalEndpoint` property.

Call the `TcpListener.Start` method to begin listening for incoming connection attempts.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example creates an instance of the `TcpListener` class using a local IP address and port number.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/TcpListener/.ctor/source.cs._

## TcpListener.Active property

```csharp
protected bool Active { get; }
```

Gets a value that indicates whether `TcpListener` is actively listening for client connections.

Returns: `true` if `TcpListener` is actively listening; otherwise, `false`.

#### Remarks
Classes deriving from `TcpListener` can use this property to determine if the `Socket` is currently listening for incoming connection attempts. The `Active` property can be used to avoid redundant `TcpListener.Start` attempts.

## TcpListener.ExclusiveAddressUse property

```csharp
public bool ExclusiveAddressUse { get; set; }
```

Gets or sets a `Boolean` value that specifies whether the `TcpListener` allows only one underlying socket to listen to a specific port.

Returns: `true` if the `TcpListener` allows only one `TcpListener` to listen to a specific port; otherwise, `false`. The default is `true`.

Exceptions:

- `InvalidOperationException`: The `TcpListener` has been started. Call the `TcpListener.Stop` method and then set the `Socket.ExclusiveAddressUse` property.
- `SocketException`: An error occurred when attempting to access the underlying socket.
- `ObjectDisposedException`: The underlying `Socket` has been closed.

#### Remarks
By default, multiple listeners can listen to a specific port. However, only one of the listeners can perform operations on the network traffic sent to the port. If more than one listener attempts to bind to a particular port, then the one with the more specific IP address handles the network traffic sent to that port. You can use the `ExclusiveAddressUse` property to prevent multiple listeners from listening to a specific port.

Set this property before calling `TcpListener.Start`, or call the `TcpListener.Stop` method and then set this property.

#### Examples
The following code example gets and sets the `ExclusiveAddressUse` property.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/TcpListener/BeginAcceptSocket/tcpserver.cs._

## TcpListener.LocalEndpoint property

```csharp
public System.Net.EndPoint LocalEndpoint { get; }
```

Gets the underlying `EndPoint` of the current `TcpListener`.

Returns: The `EndPoint` to which the `Socket` is bound.

#### Remarks
You can use the `LocalEndpoint` property to identify the local network interface and port number being used to listen for incoming client connection requests, after a socket connection has been made. You must first cast this `EndPoint` to an `IPEndPoint`. You can then call the `Address` property to retrieve the local IP address, and the `Port` property to retrieve the local port number.

#### Examples
The following code example displays the local IP address and port number on which the `TcpListener` is listening for incoming connection requests.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/TcpListener/LocalEndpoint/source.cs._

## TcpListener.Server property

```csharp
public System.Net.Sockets.Socket Server { get; }
```

Gets the underlying network `Socket`.

Returns: The underlying `Socket`.

#### Remarks
`TcpListener` creates a `Socket` to listen for incoming client connection requests. Classes deriving from `TcpListener` can use this property to get this `Socket`. Use the underlying `Socket` returned by the `Server` property if you require access beyond that which `TcpListener` provides.

> **Note:**
> The `Server` property only returns the `Socket` used to listen for incoming client connection requests. Use the `TcpListener.AcceptSocket` method to accept a pending connection request and obtain a `Socket` for sending and receiving data. You can also use the `TcpListener.AcceptTcpClient` method to accept a pending connection request and obtain a `TcpClient` for sending and receiving data.

#### Examples
The following code example demonstrates the use of the `Server` property. The underlying `Socket` is retrieved and the `Linger``Socket` option is configured to time out after 10 seconds if data still remains in the network buffer after the connection is closed.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/TcpListener/Server/source.cs._

## TcpListener.AcceptSocket() method

```csharp
public System.Net.Sockets.Socket AcceptSocket ();
```

Accepts a pending connection request.

Returns: A `Socket` used to send and receive data.

Exceptions:

- `InvalidOperationException`: The listener has not been started with a call to `TcpListener.Start`.

#### Remarks
`TcpListener.AcceptSocket` is a blocking method that returns a `Socket` that you can use to send and receive data. If you want to avoid blocking, use the `TcpListener.Pending` method to determine if connection requests are available in the incoming connection queue.

The `Socket` returned is initialized with the IP address and port number of the remote host. You can use any of the `Socket.Send` and `Socket.Receive` methods available in the `Socket` class to communicate with the remote host. When you are finished using the `Socket`, be sure to call its `Socket.Close` method. If your application is relatively simple, consider using the `TcpListener.AcceptTcpClient` method rather than the `TcpListener.AcceptSocket` method. `TcpClient` provides you with simple methods for sending and receiving data over a network in blocking synchronous mode.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
In the following code example, the `TcpListener.AcceptSocket` method is used to return a `Socket`. This `Socket` is used to communicate with the newly connected client.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/TcpListener/.ctor/source.cs._

## TcpListener.AcceptSocketAsync() method

```csharp
public System.Threading.Tasks.Task<System.Net.Sockets.Socket> AcceptSocketAsync ();
```

Accepts a pending connection request as an asynchronous operation.

Returns: The task object representing the asynchronous operation. The `Task<T>.Result` property on the task object returns a `Socket` used to send and receive data.

Exceptions:

- `InvalidOperationException`: The listener has not been started with a call to `TcpListener.Start`.

#### Remarks
This operation will not block. The returned `Task<T>` object will complete after the socket connection has been accepted.

The `Socket` returned in `Task<T>` is initialized with the IP address and port number of the remote host. You can use any of the `Socket.Send` and `Socket.Receive` methods available in the `Socket` class to communicate with the remote host. When you are finished using the `Socket`, be sure to call its `Socket.Close` method. If your application is relatively simple, consider using the `TcpListener.AcceptTcpClient` method rather than the `TcpListener.AcceptSocketAsync` method. `TcpClient` provides you with simple methods for sending and receiving data over a network in blocking synchronous mode.

> **Note:**
> This member outputs trace information when you enable network tracing in your application. This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `AcceptSocket`.
