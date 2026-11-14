---
title: "IWebProxy interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/IWebProxy.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IWebProxy interface

Namespace: `System.Net`

```csharp
public interface IWebProxy
```

Provides the base interface for implementation of proxy access for the `HttpClient` class.

#### Remarks
The `IWebProxy` interface provides the methods and properties that are required by the `HttpClient` class to access proxy servers.

The `WebProxy` class is the base implementation of the `IWebProxy` interface.

## IWebProxy.Credentials <example-value>

```csharp
public System.Net.ICredentials? Credentials { get; set; }
```

The credentials to submit to the proxy server for authentication.

Returns: An `ICredentials` instance that contains the credentials that are needed to authenticate a request to the proxy server.

#### Remarks
The `Credentials` property is an `ICredentials` instance that contains the authorization credentials to send to the proxy server in response to an HTTP 407 (proxy authorization) status code.

#### Examples
The following example uses the `Credentials` property to set the credentials that will be submitted to the proxy server for authentication.

_Code sample not included: ~/snippets/csharp/System.Net/IWebProxy/Credentials/iwebproxy_interface.cs._

## IWebProxy.GetProxy(Uri) method

```csharp
public Uri? GetProxy (Uri destination);
```

Returns the URI of a proxy.

Parameters:

- `destination`: A `Uri` that specifies the requested Internet resource.

Returns: A `Uri` instance that contains the URI of the proxy used to contact `destination`; otherwise null or `destination` itself.

#### Remarks
The `IWebProxy.GetProxy` method returns the URI of the proxy server that handles requests to the Internet resource that is specified in the `destination` parameter. If the `IWebProxy.GetProxy` method returns null or `destination` itself, the proxy is not used to contact the host and the request is passed directly to the server.

#### Examples
The following example uses the `WebProxy.GetProxy` method to return the URI that the `HttpClient` uses to access the Internet resource.

_Code sample not included: ~/snippets/csharp/System.Net/IWebProxy/Credentials/iwebproxy_interface.cs._

## IWebProxy.IsBypassed(Uri) method

```csharp
public bool IsBypassed (Uri host);
```

Indicates that the proxy should not be used for the specified host.

Parameters:

- `host`: The `Uri` of the host to check for proxy use.

Returns: `true` if the proxy server should not be used for `host`; otherwise, `false`.

#### Remarks
The `IWebProxy.IsBypassed` method indicates whether to use the proxy server to access the host that is specified in the `host` parameter. If `IWebProxy.IsBypassed` returns `true`, the proxy is not used to contact the host and the request is passed directly to the server. Getting `false` from  `IWebProxy.IsBypassed` does not guarantee that the URI is proxied; you still need to call the `IWebProxy.GetProxy` method to determine this.

#### Examples
The following example uses the `WebProxy.IsBypassed` property to determine whether the proxy server should be used for the specified host.

_Code sample not included: ~/snippets/csharp/System.Net/IWebProxy/Credentials/iwebproxy_interface.cs._
