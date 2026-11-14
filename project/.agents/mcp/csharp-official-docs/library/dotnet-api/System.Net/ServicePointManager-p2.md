---
title: "ServicePointManager class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/ServicePointManager.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ServicePointManager class (part 2 of 2)

## ServicePointManager.ServerCertificateValidationCallback property

```csharp
public static System.Net.Security.RemoteCertificateValidationCallback? ServerCertificateValidationCallback { get; set; }
```

Gets or sets the callback to validate a server certificate.

Returns: A `RemoteCertificateValidationCallback`. The default value is `null`.

#### Remarks
An application can set the `ServerCertificateValidationCallback` property to a method to use for custom validation by the client of the server certificate. When doing custom validation, the `sender` parameter passed to the `RemoteCertificateValidationCallback` can be a host string name or an object derived from `WebRequest` (`HttpWebRequest`, for example) depending on the `CertificatePolicy` property.

When custom validation is not used, the certificate name is compared with the host name used to create the request. For example, if `Create` was passed a parameter of `"https://www.contoso.com/default.html"`, the default behavior is for the client to check the certificate against `www.contoso.com`.

Despite being a multicast delegate, only the value returned from the last-executed event handler is considered authoritative.
In other words, you can attach multiple delegates, and they all get a callback from `ServicePointManager.ServerCertificateValidationCallback`.
Each callback returns a value that indicates whether the certificate is accepted or not; however, only the value from the last delegate is respected.

> **Note:**
> Since .NET 9, this property maps to `RemoteCertificateValidationCallback` on `SslOptions`.

## ServicePointManager.UseNagleAlgorithm property

```csharp
public static bool UseNagleAlgorithm { get; set; }
```

Determines whether the Nagle algorithm is used by the service points managed by this `ServicePointManager` object.

Returns: `true` to use the Nagle algorithm; otherwise, `false`. The default value is `true`.

#### Remarks
The Nagle algorithm is used to reduce network traffic by buffering small packets of data and transmitting them as a single packet. This process is also referred to as "nagling"; it is widely used because it reduces the number of packets transmitted and lowers the overhead per packet.

Changing the value of this property does not affect existing `ServicePoint` objects. Only new service points created after the change are affected.

The Nagle algorithm is fully described in IETF RFC 896.

> **Note:**
> Since .NET 9, `HttpWebRequest` uses `ConnectCallback` to set `NoDelay` to the opposite value than this property.

#### Examples
The following code example sets this property.

_Code sample not included: ~/snippets/csharp/System.Net/HttpWebRequest/ServicePoint/servicepoint.cs._

## ServicePointManager.FindServicePoint(Uri) method

```csharp
public static System.Net.ServicePoint FindServicePoint (Uri address);
```

Finds an existing `ServicePoint` object or creates a new `ServicePoint` object to manage communications with the specified `Uri` object.

Parameters:

- `address`: The `Uri` object of the Internet resource to contact.

Returns: The `ServicePoint` object that manages communications for the request.

Exceptions:

- `ArgumentNullException`: `address` is `null`.
- `InvalidOperationException`: The maximum number of `ServicePoint` objects defined in `ServicePointManager.MaxServicePoints` has been reached.

To be added.

## ServicePointManager.FindServicePoint(String, IWebProxy) method

```csharp
public static System.Net.ServicePoint FindServicePoint (string uriString, System.Net.IWebProxy? proxy);
```

Finds an existing `ServicePoint` object or creates a new `ServicePoint` object to manage communications with the specified Uniform Resource Identifier (URI).

Parameters:

- `uriString`: The URI of the Internet resource to be contacted.
- `proxy`: The proxy data for this request.

Returns: The `ServicePoint` object that manages communications for the request.

Exceptions:

- `UriFormatException`: The URI specified in `uriString` is invalid.
- `InvalidOperationException`: The maximum number of `ServicePoint` objects defined in `ServicePointManager.MaxServicePoints` has been reached.

To be added.

## ServicePointManager.FindServicePoint(Uri, IWebProxy) method

```csharp
public static System.Net.ServicePoint FindServicePoint (Uri address, System.Net.IWebProxy? proxy);
```

Finds an existing `ServicePoint` object or creates a new `ServicePoint` object to manage communications with the specified `Uri` object.

Parameters:

- `address`: A `Uri` object that contains the address of the Internet resource to contact.
- `proxy`: The proxy data for this request.

Returns: The `ServicePoint` object that manages communications for the request.

Exceptions:

- `ArgumentNullException`: `address` is `null`.
- `InvalidOperationException`: The maximum number of `ServicePoint` objects defined in `ServicePointManager.MaxServicePoints` has been reached.

To be added.

## ServicePointManager.SetTcpKeepAlive(Boolean, Int32, Int32) method

```csharp
public static void SetTcpKeepAlive (bool enabled, int keepAliveTime, int keepAliveInterval);
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

#### Remarks
An application can request that a TCP/IP provider enable the use of keep-alive packets on a TCP connection. The default is that the use of keep-alive packets on a TCP connection is disabled.

The default settings when a TCP socket is initialized sets the keep-alive timeout to 2 hours and the keep-alive interval to 1 second. The `keepAliveTime` parameter specifies the timeout, in milliseconds, with no activity until the first keep-alive packet is sent. The `keepAliveInterval` parameter specifies the interval, in milliseconds, between when successive keep-alive packets are sent if no acknowledgement is received. The number of keep-alive probes cannot be changed and is set to 10.

If a TCP connection is dropped as the result of keep-alives, a `SocketError` of `NetworkReset` is returned to any calls in progress on the socket, and any subsequent calls will fail with a `SocketError` of `NotConnected`.

This method is not thread-safe. Any `ServicePoint` created at the same time might see partially changed values for the TCP keep-alive.

> **Note:**
> Since .NET 9, `HttpWebRequest` uses `ConnectCallback` to set TCP keep alive options on the underlying socket to the values provided to this method.

## ServicePointManager.DefaultNonPersistentConnectionLimit field

```csharp
public const int DefaultNonPersistentConnectionLimit = 4;
```

The default number of non-persistent connections (4) allowed on a `ServicePoint` object connected to an HTTP/1.0 or later server. This field is constant but is no longer used.

To be added.

## ServicePointManager.DefaultPersistentConnectionLimit field

```csharp
public const int DefaultPersistentConnectionLimit = 2;
```

The default number of persistent connections (2) allowed on a `ServicePoint` object connected to an HTTP/1.1 or later server. This field is constant and is used to initialize the `ServicePointManager.DefaultConnectionLimit` property if the value of the `ServicePointManager.DefaultConnectionLimit` property has not been set either directly or through configuration.

#### Examples
The following code example sets the `DefaultConnectionLimit` property using this field.

_Code sample not included: ~/snippets/csharp/System.Net/HttpWebRequest/ServicePoint/servicepoint.cs._
