---
title: "ServicePoint class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/ServicePoint.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ServicePoint class

Namespace: `System.Net`

```csharp
public class ServicePoint
```

Provides connection management for HTTP connections.

#### Remarks

## ServicePoint.Address property

```csharp
public Uri Address { get; }
```

Gets the Uniform Resource Identifier (URI) of the server that this `ServicePoint` object connects to.

Returns: An instance of the `Uri` class that contains the URI of the Internet server that this `ServicePoint` object connects to.

Exceptions:

- `NotSupportedException`: The `ServicePoint` is in host mode.

#### Examples
The following code example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net/HttpWebRequest/ServicePoint/servicepoint.cs._

## ServicePoint.BindIPEndPointDelegate property

```csharp
public System.Net.BindIPEndPoint? BindIPEndPointDelegate { get; set; }
```

Specifies the delegate to associate a local `IPEndPoint` with a `ServicePoint`.

Returns: A delegate that forces a `ServicePoint` to use a particular local Internet Protocol (IP) address and port number. The default value is `null`.

## ServicePoint.Certificate property

```csharp
public System.Security.Cryptography.X509Certificates.X509Certificate? Certificate { get; }
```

Gets the certificate received for this `ServicePoint` object.

Returns: An instance of the `X509Certificate` class that contains the security certificate received for this `ServicePoint` object.

## ServicePoint.ClientCertificate property

```csharp
public System.Security.Cryptography.X509Certificates.X509Certificate? ClientCertificate { get; }
```

Gets the last client certificate sent to the server.

Returns: An `X509Certificate` object that contains the public values of the last client certificate sent to the server.

#### Remarks

> **Note:**
> This property is only implemented on .NET Framework.

#### Examples
The following code example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net/HttpWebRequest/ServicePoint/servicepoint.cs._

## ServicePoint.ConnectionLeaseTimeout property

```csharp
public int ConnectionLeaseTimeout { get; set; }
```

Gets or sets the number of milliseconds after which an active `ServicePoint` connection is closed.

Returns: A `Int32` that specifies the number of milliseconds that an active `ServicePoint` connection remains open. The default is -1, which allows an active `ServicePoint` connection to stay connected indefinitely. Set this property to 0 to force `ServicePoint` connections to close after servicing a request.

Exceptions:

- `ArgumentOutOfRangeException`: The value specified for a set operation is a negative number less than -1.

## ServicePoint.ConnectionLimit property

```csharp
public int ConnectionLimit { get; set; }
```

Gets or sets the maximum number of connections allowed on this `ServicePoint` object.

Returns: The maximum number of connections allowed on this `ServicePoint` object.

Exceptions:

- `ArgumentOutOfRangeException`: The connection limit is equal to or less than 0.

## ServicePoint.ConnectionName property

```csharp
public string ConnectionName { get; }
```

Gets the connection name.

Returns: A `String` that represents the connection name.

## ServicePoint.CurrentConnections property

```csharp
public int CurrentConnections { get; }
```

Gets the number of open connections associated with this `ServicePoint` object.

Returns: The number of open connections associated with this `ServicePoint` object.

## ServicePoint.Expect100Continue property

```csharp
public bool Expect100Continue { get; set; }
```

Gets or sets a `Boolean` value that determines whether 100-Continue behavior is used.

Returns: `true` to expect 100-Continue responses for `POST` requests; otherwise, `false`. The default value is `true`.

## ServicePoint.IdleSince property

```csharp
public DateTime IdleSince { get; }
```

Gets the date and time that the `ServicePoint` object was last connected to a host.

Returns: A `DateTime` object that contains the date and time at which the `ServicePoint` object was last connected.

## ServicePoint.MaxIdleTime property

```csharp
public int MaxIdleTime { get; set; }
```

Gets or sets the amount of time a connection associated with the `ServicePoint` object can remain idle before the connection is closed.

Returns: The length of time, in milliseconds, that a connection associated with the `ServicePoint` object can remain idle before it is closed and reused for another connection.

Exceptions:

- `ArgumentOutOfRangeException`: `ServicePoint.MaxIdleTime` is set to less than `Timeout.Infinite` or greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

## ServicePoint.ProtocolVersion property

```csharp
public virtual Version ProtocolVersion { get; }
```

Gets the version of the HTTP protocol that the `ServicePoint` object uses.

Returns: A `Version` object that contains the HTTP protocol version that the `ServicePoint` object uses.

## ServicePoint.ReceiveBufferSize property

```csharp
public int ReceiveBufferSize { get; set; }
```

Gets or sets the size of the receiving buffer for the socket used by this `ServicePoint`.

Returns: A `Int32` that contains the size, in bytes, of the receive buffer. The default is 8192.

Exceptions:

- `ArgumentOutOfRangeException`: The value specified for a set operation is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

## ServicePoint.SupportsPipelining property

```csharp
public bool SupportsPipelining { get; }
```

Indicates whether the `ServicePoint` object supports pipelined connections.

Returns: `true` if the `ServicePoint` object supports pipelined connections; otherwise, `false`.

## ServicePoint.UseNagleAlgorithm property

```csharp
public bool UseNagleAlgorithm { get; set; }
```

Gets or sets a `Boolean` value that determines whether the Nagle algorithm is used on connections managed by this `ServicePoint` object.

Returns: `true` to use the Nagle algorithm; otherwise, `false`. The default value is `true`.

## ServicePoint.CloseConnectionGroup(String) method

```csharp
public bool CloseConnectionGroup (string connectionGroupName);
```

Removes the specified connection group from this `ServicePoint` object.

Parameters:

- `connectionGroupName`: The name of the connection group that contains the connections to close and remove from this service point.

Returns: A `Boolean` value that indicates whether the connection group was closed.

## ServicePoint.SetTcpKeepAlive(Boolean, Int32, Int32) method

```csharp
public void SetTcpKeepAlive (bool enabled, int keepAliveTime, int keepAliveInterval);
```

Enables or disables the keep-alive option on a TCP connection.

Parameters:

- `enabled`: If set to true, then the TCP keep-alive option on a TCP connection will be enabled using the specified `keepAliveTime` and `keepAliveInterval` values.

If set to false, then the TCP keep-alive option is disabled and the remaining parameters are ignored.

The default value is false.
- `keepAliveTime`: Specifies the timeout, in milliseconds, with no activity until the first keep-alive packet is sent.

The value must be greater than 0.  If a value of less than or equal to zero is passed an `ArgumentOutOfRangeException` is thrown.
- `keepAliveInterval`: Specifies the interval, in milliseconds, between when successive keep-alive packets are sent if no acknowledgement is received.

The value must be greater than 0.  If a value of less than or equal to zero is passed an `ArgumentOutOfRangeException` is thrown.

Exceptions:

- `ArgumentOutOfRangeException`: The value specified for `keepAliveTime` or `keepAliveInterval` parameter is less than or equal to 0.
