---
title: "ServicePointManager class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/ServicePointManager.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ServicePointManager class

Namespace: `System.Net`

```csharp
public class ServicePointManager
```

Manages the collection of `ServicePoint` objects.

#### Remarks
`ServicePointManager` is a static class used to create, maintain, and delete instances of the `ServicePoint` class.

When an application requests a connection to an Internet resource Uniform Resource Identifier (URI) through the `ServicePointManager` object, the `ServicePointManager` returns a `ServicePoint` object that contains connection information for the host and scheme identified by the URI. If there is an existing `ServicePoint` object for that host and scheme, the `ServicePointManager` object returns the existing `ServicePoint` object; otherwise, the `ServicePointManager` object creates a new `ServicePoint` object.

To opt out of the behavior that blocks insecure cipher and hashing algorithms for connections in order to maintain interoperability with your existing SSL3 services or TLS w/ RC4 services, see Cannot connect to a server by using the ServicePointManager or SslStream APIs after upgrade to the .NET Framework 4.6.

> **Important:**
> We don't recommend that you use the `ServicePointManager` class for new development. Instead, use the `HttpClient` class.

#### Examples
The following code example creates a `ServicePoint` object for connections to the URI `www.contoso.com`.

_Code sample not included: ~/snippets/csharp/System.Net/ServicePointManager/Overview/source.cs._

## ServicePointManager.CheckCertificateRevocationList property

```csharp
public static bool CheckCertificateRevocationList { get; set; }
```

Gets or sets a `Boolean` value that indicates whether the certificate is checked against the certificate authority revocation list.

Returns: `true` if the certificate revocation list is checked; otherwise, `false`.

#### Remarks
When the `ServicePointManager.CheckCertificateRevocationList` is `true`, the certificate is checked against the certificate authority revocation list, as part of the certificate validation process. Its default value is `false`.

> **Note:**
> Since .NET 9, this property maps to `CertificateRevocationCheckMode` on `SslOptions`.

#### Examples
The following code example sets this property.

_Code sample not included: ~/snippets/csharp/System.Net/HttpWebRequest/ServicePoint/servicepoint.cs._

## ServicePointManager.DefaultConnectionLimit property

```csharp
public static int DefaultConnectionLimit { get; set; }
```

Gets or sets the maximum number of concurrent connections allowed by a `ServicePoint` object.

Returns: The maximum number of concurrent connections allowed by a `ServicePoint` object. The default connection limit is 10 for ASP.NET hosted applications and 2 for all others. When an app is running as an ASP.NET host, it is not possible to alter the value of this property through the config file if the autoConfig property is set to `true`. However, you can change the value programmatically when the autoConfig property is `true`. Set your preferred value once, when the AppDomain loads.

Exceptions:

- `ArgumentOutOfRangeException`: `ServicePointManager.DefaultConnectionLimit` is less than or equal to 0.

#### Remarks
The `DefaultConnectionLimit` property sets the default maximum number of concurrent connections that the `ServicePointManager` object assigns to the `ConnectionLimit` property when creating `ServicePoint` objects.

Changing the `DefaultConnectionLimit` property has no effect on existing `ServicePoint` objects; it affects only `ServicePoint` objects that are initialized after the change. If the value of this property has not been set either directly or through configuration, the value defaults to the constant `DefaultPersistentConnectionLimit`.

> **Note:**
> Any changes to the `DefaultConnectionLimit` property affect both HTTP 1.0 and HTTP 1.1 connections. It is not possible to separately alter the connection limit for HTTP 1.0 and HTTP 1.1 protocols.

> **Note:**
> Since .NET 9, this property maps to `MaxConnectionsPerServer` unless overridden by `ConnectionLimit`. However, handlers are not being reused between requests so it doesn't have any meaningful impact.

#### Examples
The following code example sets this property.

_Code sample not included: ~/snippets/csharp/System.Net/HttpWebRequest/ServicePoint/servicepoint.cs._

## ServicePointManager.DnsRefreshTimeout property

```csharp
public static int DnsRefreshTimeout { get; set; }
```

Gets or sets a value that indicates how long a Domain Name Service (DNS) resolution is considered valid.

Returns: The time-out value, in milliseconds. A value of -1 indicates an infinite time-out period. The default value is 120,000 milliseconds (two minutes).

#### Remarks

> **Note:**
> This property is only implemented on .NET Framework.

#### Examples
The following code example sets this property.

_Code sample not included: ~/snippets/csharp/System.Net/ServicePointManager/DnsRefreshTimeout/servicepoint.cs._

## ServicePointManager.EnableDnsRoundRobin property

```csharp
public static bool EnableDnsRoundRobin { get; set; }
```

Gets or sets a value that indicates whether a Domain Name Service (DNS) resolution rotates among the applicable Internet Protocol (IP) addresses.

Returns: `false` if a DNS resolution always returns the first IP address for a particular host; otherwise `true`. The default is `false`.

#### Remarks
When more than one IP address is associated with a host name, a DNS resolution normally returns only the first IP address. If you set this property to `true`, then subsequent DNS resolutions will cycle through all available IP addresses for a particular host. This option is useful when a service uses DNS as a load balancing mechanism between servers or server clusters.

> **Note:**
> This property is only implemented on .NET Framework.

#### Examples
The following code example sets this property.

_Code sample not included: ~/snippets/csharp/System.Net/ServicePointManager/DnsRefreshTimeout/servicepoint.cs._

## ServicePointManager.EncryptionPolicy property

```csharp
public static System.Net.Security.EncryptionPolicy EncryptionPolicy { get; }
```

Gets the `EncryptionPolicy` for this `ServicePointManager` instance.

Returns: The encryption policy to use for this `ServicePointManager` instance.

#### Remarks
If a value is not specified in the configuration file, the `EncryptionPolicy` property defaults to `RequireEncryption`. This is applied to an SSL/TLS session on this `ServicePointManager` instance.

The use of the Null cipher is required when the encryption policy is set to `NoEncryption`.

> **Note:**
> This property is only implemented on .NET Framework.

## ServicePointManager.Expect100Continue property

```csharp
public static bool Expect100Continue { get; set; }
```

Gets or sets a `Boolean` value that determines whether 100-Continue behavior is used.

Returns: `true` to enable 100-Continue behavior. The default value is `true`.

#### Remarks
When this property is set to `true`, 100-Continue behavior is used. Client requests that use the `PUT` and `POST` methods will add an Expect header to the request if the `Expect100Continue` property is `true` and `ContentLength` property is greater than zero or the `SendChunked` property is true. The client will expect to receive a 100-Continue response from the server to indicate that the client should send the data to be posted. This mechanism allows clients to avoid sending large amounts of data over the network when the server, based on the request headers, intends to reject the request.

For example, assume the `Expect100Continue` property is `false`. When the request is sent to the server, it includes the data. If, after reading the request headers, the server requires authentication and must send a 401 response, the client must resend the data with proper authentication headers.

If this property is `true`, the request headers are sent to the server. If the server has not rejected the request, it sends a 100-Continue response signaling that the data can be transmitted. If, as in the preceding example, the server requires authentication, it sends the 401 response and the client has not unnecessarily transmitted the data.

Changing the value of this property does not affect existing `ServicePoint` objects. Only new `ServicePoint` objects created after the change are affected.

The 100-Continue behavior is not used for HTTP 1.0 requests even if this property is set to `true`.

The Expect 100-Continue behavior is fully described in IETF RFC 2616 Section 10.1.1.

> **Note:**
> Since .NET 9, this property sets `ExpectContinue` on the `Headers` unless overridden by `Expect100Continue`.

#### Examples
The following code example sets this property.

_Code sample not included: ~/snippets/csharp/System.Net/HttpWebRequest/ServicePoint/servicepoint.cs._

## ServicePointManager.MaxServicePointIdleTime property

```csharp
public static int MaxServicePointIdleTime { get; set; }
```

Gets or sets the maximum idle time of a `ServicePoint` object.

Returns: The maximum idle time, in milliseconds, of a `ServicePoint` object. The default value is 100,000 milliseconds (100 seconds).

Exceptions:

- `ArgumentOutOfRangeException`: `ServicePointManager.MaxServicePointIdleTime` is less than `Timeout.Infinite` or greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Remarks
The `MaxServicePointIdleTime` property sets the maximum idle time that the `ServicePointManager` object assigns to the `MaxIdleTime` property when creating `ServicePoint` objects. Changes to this value affect only `ServicePoint` objects that are initialized after the value is changed.

After a `ServicePoint` object has been idle for the time specified in `ServicePoint.MaxIdleTime`, it is eligible for garbage collection. A `ServicePoint` object is idle when the list of connections associated with the `ServicePoint` object is empty.

> **Note:**
> Since .NET 9, this property maps to `PooledConnectionIdleTimeout` unless overridden by `MaxIdleTime`. However, handlers are not being reused between requests so it doesn't have any meaningful impact.

#### Examples
The following code example sets this property.

_Code sample not included: ~/snippets/csharp/System.Net/HttpWebRequest/ServicePoint/servicepoint.cs._

## ServicePointManager.MaxServicePoints property

```csharp
public static int MaxServicePoints { get; set; }
```

Gets or sets the maximum number of `ServicePoint` objects to maintain at any time.

Returns: The maximum number of `ServicePoint` objects to maintain. The default value is 0, which means there is no limit to the number of `ServicePoint` objects.

Exceptions:

- `ArgumentOutOfRangeException`: `ServicePointManager.MaxServicePoints` is less than 0 or greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Remarks
When you reduce the `MaxServicePoints` property below the number of `ServicePoint` objects currently in existence, the `ServicePointManager` deletes the `ServicePoint` objects with the longest idle times. If the number of `ServicePoint` objects with active connections is greater than the value of `ServicePointManager.MaxServicePoints`, the `ServicePointManager` object deletes the `ServicePoint` objects as they become idle. If this limit is set and more distinct `ServicePoint` instances are requested, `ServicePointManager.FindServicePoint` will throw. As a result, `HttpWebRequest` requests leading to new, distinct endpoints will fail.

> **Note:**
> This property is only implemented on .NET Framework.

#### Examples
The following code example sets this property.

_Code sample not included: ~/snippets/csharp/System.Net/HttpWebRequest/ServicePoint/servicepoint.cs._

## ServicePointManager.ReusePort property

```csharp
public static bool ReusePort { get; set; }
```

Gets or sets a value that indicates whether to reuse the port for outbound connections.

Returns: `true` for all outbound TCP connections from HttpWebRequest to use the native socket option SO_REUSE_UNICASTPORT on the socket; otherwise, `false`. The default value is `false`.

> **Note:**
> This property is only implemented on .NET Framework.

## ServicePointManager.SecurityProtocol property

```csharp
public static System.Net.SecurityProtocolType SecurityProtocol { get; set; }
```

Gets or sets the security protocol used by the `ServicePoint` objects managed by the `ServicePointManager` object.

Returns: One of the values defined in the `SecurityProtocolType` enumeration. The default value is `SecurityProtocolType.SystemDefault`.

Exceptions:

- `NotSupportedException`: The value specified to set the property is not a valid `SecurityProtocolType` enumeration value.

#### Remarks
This property selects the version of the Secure Sockets Layer (SSL) or Transport Layer Security (TLS) protocol to use for new connections; existing connections aren't changed.

The default value of this property is `SystemDefault`, which allows networking APIs based on `SslStream` (such as FTP, HTTP, and SMTP) to inherit the default security protocols from the operating system or from any custom configurations performed by a system administrator. For information about which SSL/TLS protocols are enabled by default on each version of the Windows operating system, see Protocols in TLS/SSL (Schannel SSP).

Your code should never implicitly depend on using a particular protection level, or on the assumption that a given security level is used by default. If your app depends on the use of a particular security level, you must explicitly specify that level and then check to be sure that it is actually in use on the established connection. Further, your code should be designed to be robust in the face of changes to which protocols are supported, as such changes are often made with little advance notice in order to mitigate emerging threats.

To opt out of the behavior that blocks insecure cipher and hashing algorithms for connections in order to maintain interoperability with your existing SSL3, or TLS with RC4, services, see Cannot connect to a server by using the ServicePointManager or SslStream APIs after upgrade to the .NET Framework 4.6.

> **Note:**
> Since .NET 9, this property maps to `EnabledSslProtocols` on `SslOptions`.
