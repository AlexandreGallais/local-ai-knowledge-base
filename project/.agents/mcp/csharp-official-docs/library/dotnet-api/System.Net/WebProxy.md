---
title: "WebProxy class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/WebProxy.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WebProxy class

Namespace: `System.Net`

```csharp
public class WebProxy : System.Net.IWebProxy, System.Runtime.Serialization.ISerializable
```

Contains HTTP proxy settings for the `HttpClient` class.

#### Remarks
The `WebProxy` class contains the proxy settings that `HttpClient` instances use to determine whether a Web proxy is used to send requests. Global Web proxy settings can be specified in machine and application configuration files, and applications can use instances of the `WebProxy` class to customize Web proxy use. The `WebProxy` class is the base implementation of the `IWebProxy` interface.

To obtain instances of the Web proxy class, you can use any of the following methods:

- The `WebProxy.%23ctor` constructor.
- The `WebProxy.GetDefaultProxy` method.
- The `GlobalProxySelection.Select` method.

These methods each supply a `WebProxy` instance that you can further customize; the difference between them is how the instance is initialized before it is returned to your application. The `WebProxy.%23ctor` constructor returns an instance of the `WebProxy` class with the `Address` property set to `null`. When a request uses a `WebProxy` instance in this state, no proxy is used to send the request.

The `WebProxy.GetDefaultProxy` method returns an instance of the `WebProxy` class with the `WebProxy.Address`, `WebProxy.BypassProxyOnLocal`, and `WebProxy.BypassList` properties set to the values used by the local computer.

The `GlobalProxySelection.Select` method returns an instance of the `WebProxy` class with it properties set according to a combination of Internet and configuration file settings.

The `WebProxy` class supports automatic detection and execution of proxy configuration scripts. This feature is also known as Web Proxy Auto-Discovery (WPAD). When using automatic proxy configuration, a configuration script, typically named Wpad.dat, must be located, downloaded, compiled, and run. If these operations are successful, the script returns the proxies that can be used for a request.

#### Examples
The following code example sets up an `HttpClient` instance with a `WebProxy` instance. The `HttpClient` instance uses the proxy to connect to external Internet resources. (For an example that demonstrates using the WPAD feature, see the documentation for the `IWebProxyScript` class.)

_Code sample not included: ~/snippets/csharp/System.Net/WebProxy/Overview/source.cs._

## WebProxy.WebProxy() constructor

```csharp
public WebProxy ();
```

Initializes an empty instance of the `WebProxy` class.

#### Remarks
The parameterless constructor initializes an empty instance of the `WebProxy` class with the `Address` property set to `null`.

When the `Address` property is `null`, the `WebProxy.IsBypassed` method returns `true` and the `WebProxy.GetProxy` method returns the destination address.

#### Examples
The following code example demonstrates calling this constructor.

_Code sample not included: ~/snippets/csharp/System.Net/WebProxy/.ctor/nclwebproxy.cs._
## WebProxy.WebProxy(String) constructor

```csharp
public WebProxy (string? Address);
```

Initializes a new instance of the `WebProxy` class with the specified URI.

Parameters:

- `Address`: The URI of the proxy server.

Exceptions:

- `UriFormatException`: `Address` is an invalid URI.

#### Remarks
The `WebProxy` instance is initialized with the `Address` property set to a `Uri` instance containing `Address`.

#### Examples
The following code example demonstrates calling this constructor.

_Code sample not included: ~/snippets/csharp/System.Net/WebProxy/.ctor/nclwebproxy.cs._
## WebProxy.WebProxy(Uri) constructor

```csharp
public WebProxy (Uri? Address);
```

Initializes a new instance of the `WebProxy` class from the specified `Uri` instance.

Parameters:

- `Address`: A `Uri` instance that contains the address of the proxy server.

#### Remarks
The `WebProxy` instance is initialized with the `Address` property set to the `Address` parameter.

#### Examples
The following code example demonstrates calling this constructor.

_Code sample not included: ~/snippets/csharp/System.Net/WebProxy/.ctor/nclwebproxy.cs._
## WebProxy.WebProxy(SerializationInfo, StreamingContext) constructor

```csharp
protected WebProxy (System.Runtime.Serialization.SerializationInfo serializationInfo, System.Runtime.Serialization.StreamingContext streamingContext);
```

Initializes an instance of the `WebProxy` class using previously serialized content.

Parameters:

- `serializationInfo`: The serialization data.
- `streamingContext`: The context for the serialized data.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

#### Remarks
This method is called by the system to deserialize a `WebProxy` instance; applications do not call it.

## WebProxy.WebProxy(String, Boolean) constructor

```csharp
public WebProxy (string? Address, bool BypassOnLocal);
```

Initializes a new instance of the `WebProxy` class with the specified URI and bypass setting.

Parameters:

- `Address`: The URI of the proxy server.
- `BypassOnLocal`: `true` to bypass the proxy for local addresses; otherwise, `false`.

Exceptions:

- `UriFormatException`: `Address` is an invalid URI.

#### Remarks
The `WebProxy` instance is initialized with the `Address` property set to a `Uri` instance that contains `Address` and the `BypassProxyOnLocal` property set to `BypassOnLocal`.

#### Examples
The following code example demonstrates calling this constructor.

_Code sample not included: ~/snippets/csharp/System.Net/WebProxy/.ctor/nclwebproxy.cs._
## WebProxy.WebProxy(String, Int32) constructor

```csharp
public WebProxy (string Host, int Port);
```

Initializes a new instance of the `WebProxy` class with the specified host and port number.

Parameters:

- `Host`: The name of the proxy host.
- `Port`: The port number on `Host` to use.

Exceptions:

- `UriFormatException`: The URI formed by combining `Host` and `Port` is not a valid URI.

#### Remarks
The `WebProxy` instance is initialized with the `Address` property set to a `Uri` instance of the form http:// `Host` : `Port`.

#### Examples
The following code example demonstrates calling this constructor.

_Code sample not included: ~/snippets/csharp/System.Net/WebProxy/.ctor/nclwebproxy.cs._
## WebProxy.WebProxy(Uri, Boolean) constructor

```csharp
public WebProxy (Uri? Address, bool BypassOnLocal);
```

Initializes a new instance of the `WebProxy` class with the `Uri` instance and bypass setting.

Parameters:

- `Address`: A `Uri` instance that contains the address of the proxy server.
- `BypassOnLocal`: `true` to bypass the proxy for local addresses; otherwise, `false`.

#### Remarks
The `WebProxy` instance is initialized with the `Address` property set to `Address` and with the `BypassProxyOnLocal` property set to `BypassOnLocal`.

#### Examples
The following code example demonstrates calling this constructor.

_Code sample not included: ~/snippets/csharp/System.Net/WebProxy/.ctor/nclwebproxy.cs._
## WebProxy.WebProxy(String, Boolean, String[]) constructor

```csharp
public WebProxy (string? Address, bool BypassOnLocal, string[]? BypassList);
```

Initializes a new instance of the `WebProxy` class with the specified URI, bypass <example-value>, and list of URIs to bypass.

Parameters:

- `Address`: The URI of the proxy server.
- `BypassOnLocal`: `true` to bypass the proxy for local addresses; otherwise, `false`.
- `BypassList`: An array of regular expression strings that contain the URIs of the servers to bypass.

Exceptions:

- `UriFormatException`: `Address` is an invalid URI.

#### Remarks
The `WebProxy` instance is initialized with the `Address` property set to a `Uri` instance that contains `Address`, the `BypassProxyOnLocal` property set to `BypassOnLocal`, and the `BypassList` property set to `BypassList`.

#### Examples
The following code example demonstrates calling this constructor.

_Code sample not included: ~/snippets/csharp/System.Net/WebProxy/.ctor/nclwebproxy.cs._
## WebProxy.WebProxy(Uri, Boolean, String[]) constructor

```csharp
public WebProxy (Uri? Address, bool BypassOnLocal, string[]? BypassList);
```

Initializes a new instance of the `WebProxy` class with the specified `Uri` instance, bypass <example-value>, and list of URIs to bypass.

Parameters:

- `Address`: A `Uri` instance that contains the address of the proxy server.
- `BypassOnLocal`: `true` to bypass the proxy for local addresses; otherwise, `false`.
- `BypassList`: An array of regular expression strings that contains the URIs of the servers to bypass.

#### Remarks
The `WebProxy` instance is initialized with the `Address` property set to `Address`, the `BypassProxyOnLocal` property set to `BypassOnLocal`, and the `BypassList` property set to `BypassList`.

#### Examples
The following code example demonstrates calling this constructor.

_Code sample not included: ~/snippets/csharp/System.Net/WebProxy/.ctor/nclwebproxy.cs._
## WebProxy.WebProxy(String, Boolean, String[], ICredentials) constructor

```csharp
public WebProxy (string? Address, bool BypassOnLocal, string[]? BypassList, System.Net.ICredentials? Credentials);
```

Initializes a new instance of the `WebProxy` class with the specified URI, bypass <example-value>, list of URIs to bypass, and credentials.

Parameters:

- `Address`: The URI of the proxy server.
- `BypassOnLocal`: `true` to bypass the proxy for local addresses; otherwise, `false`.
- `BypassList`: An array of regular expression strings that contains the URIs of the servers to bypass.
- `Credentials`: An `ICredentials` instance to submit to the proxy server for authentication.

Exceptions:

- `UriFormatException`: `Address` is an invalid URI.

#### Remarks
The `WebProxy` instance is initialized with the `Address` property set to a `Uri` instance that contains `Address`, the `BypassProxyOnLocal` property set to `BypassOnLocal`, the `BypassList` property set to `BypassList`, and the `Credentials` property set to `Credentials`.

#### Examples
The following code example demonstrates calling this constructor.

_Code sample not included: ~/snippets/csharp/System.Net/WebProxy/.ctor/nclwebproxy.cs._
## WebProxy.WebProxy(Uri, Boolean, String[], ICredentials) constructor

```csharp
public WebProxy (Uri? Address, bool BypassOnLocal, string[]? BypassList, System.Net.ICredentials? Credentials);
```

Initializes a new instance of the `WebProxy` class with the specified `Uri` instance, bypass <example-value>, list of URIs to bypass, and credentials.

Parameters:

- `Address`: A `Uri` instance that contains the address of the proxy server.
- `BypassOnLocal`: `true` to bypass the proxy for local addresses; otherwise, `false`.
- `BypassList`: An array of regular expression strings that contains the URIs of the servers to bypass.
- `Credentials`: An `ICredentials` instance to submit to the proxy server for authentication.

#### Remarks
The `WebProxy` instance is initialized with the `Address` property set to `Address`, the `BypassProxyOnLocal` property set to `BypassOnLocal`, the `BypassList` property set to `BypassList`, and the `Credentials` property set to `Credentials`.

#### Examples
The following code example demonstrates calling this constructor.

_Code sample not included: ~/snippets/csharp/System.Net/WebProxy/.ctor/nclwebproxy.cs._
## WebProxy.Address property

```csharp
public Uri? Address { get; set; }
```

Gets or sets the address of the proxy server.

Returns: A `Uri` instance that contains the address of the proxy server.

#### Remarks
The `Address` property contains the address of the proxy server. When automatic proxy detection is not enabled, and no automatic configuration script is specified, the `Address` property and `WebProxy.BypassList` determine the proxy used for a request.

When the `Address` property is `null`, requests bypass the proxy and connect directly to the destination host.

#### Examples
The following code example displays the properties of a `WebProxy` object, including its `WebProxy.Address`.

_Code sample not included: ~/snippets/csharp/System.Net/WebProxy/Address/proxy.cs._
## WebProxy.BypassArrayList property

```csharp
public System.Collections.ArrayList BypassArrayList { get; }
```

Gets a list of addresses that do not use the proxy server.

Returns: An `ArrayList` that contains a list of `WebProxy.BypassList` arrays that represents URIs that do not use the proxy server when accessed.

#### Remarks
The `WebProxy.BypassList` is an array list of regular expression strings that describe the URIs that are accessed directly instead of through the proxy server.

## WebProxy.BypassList property

```csharp
public string[] BypassList { get; set; }
```

Gets or sets an array of addresses that do not use the proxy server.

Returns: An array that contains a list of regular expressions that describe URIs that do not use the proxy server when accessed.

#### Remarks
The `BypassList` property contains an array of regular expressions that describe URIs that are accessed directly instead of through the proxy server.

#### Examples
The following code example displays the properties of a `WebProxy` object, including its `BypassList` property.

_Code sample not included: ~/snippets/csharp/System.Net/WebProxy/Address/proxy.cs._
## WebProxy.BypassProxyOnLocal property

```csharp
public bool BypassProxyOnLocal { get; set; }
```

Gets or sets a value that indicates whether to bypass the proxy server for local addresses.

Returns: `true` to bypass the proxy server for local addresses; otherwise, `false`. The default value is `false`.

#### Remarks
The setting of the `BypassProxyOnLocal` property determines whether to use the proxy server when accessing local Internet resources.

If `WebProxy.BypassProxyOnLocal` is `true`, requests to local Internet resources do not use the proxy server. Local requests are identified by the lack of a period (.) in the URI, as in `http://webserver/`, or access the local server, including `http://localhost`, `http://loopback`, or `http://127.0.0.1`. When `WebProxy.BypassProxyOnLocal` is `false`, all Internet requests are made through the proxy server.

> **Note:**
> Requests to a local host with a URI that contain a period use the proxy. To avoid using a proxy in these cases, create an entry for the host in the `WebProxy.BypassList`.

#### Examples
The following code example demonstrates calling a constructor that sets this property and getting the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net/WebProxy/.ctor/nclwebproxy.cs._
