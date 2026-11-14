---
title: "HttpListener class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/HttpListener.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpListener class

Namespace: `System.Net`

```csharp
public sealed class HttpListener : IDisposable
```

Provides a simple, programmatically controlled HTTP protocol listener. This class cannot be inherited. The `HttpListener` type is not recommended for new development; for more information, see the Remarks section.

Using the `HttpListener` class, you can create a simple HTTP protocol listener that responds to HTTP requests. The listener is active for the lifetime of the `HttpListener` object and runs within your application with its permissions.

To use `HttpListener`, create a new instance of the class using the `HttpListener` constructor and use the `Prefixes` property to gain access to the collection that holds the strings that specify which Uniform Resource Identifier (URI) prefixes the `HttpListener` should process.

A URI prefix string is composed of a scheme (http or https), a host, an optional port, and an optional path. An example of a complete prefix string is `http://www.contoso.com:8080/customerData/`. Prefixes must end in a forward slash ("/"). The `HttpListener` object with the prefix that most closely matches a requested URI responds to the request. Multiple `HttpListener` objects cannot add the same prefix; a `Win32Exception` exception is thrown if a `HttpListener` adds a prefix that is already in use.

When a port is specified, the host element can be replaced with "\*" to indicate that the `HttpListener` accepts requests sent to the port if the requested URI does not match any other prefix. For example, to receive all requests sent to port 8080 when the requested URI is not handled by any `HttpListener`, the prefix is *http://\*:8080/*. Similarly, to specify that the `HttpListener` accepts all requests sent to a port, replace the host element with the "+" character. For example, *https://+:8080*. The "\*" and "+" characters can be present in prefixes that include paths.

Wildcard subdomains are supported in URI prefixes that are managed by an `HttpListener` object. To specify a wildcard subdomain, use the "\*" character as part of the hostname in a URI prefix. For example, *http://\*.foo.com/*. Pass this as the argument to the `HttpListenerPrefixCollection.Add` method.

> **Warning:**
> Top-level wildcard bindings (*http://\*:8080/* and *http://+:8080*) should **not** be used. Top-level wildcard bindings can open up your app to security vulnerabilities. This applies to both strong and weak wildcards. Use explicit host names rather than wildcards. Subdomain wildcard binding (for example, `*.mysub.com`) doesn't have this security risk if you control the entire parent domain (as opposed to `*.com`, which is vulnerable). See rfc7230 section-5.4 for more information.

To begin listening for requests from clients, add the URI prefixes to the collection and call the `HttpListener.Start` method. `HttpListener` offers both synchronous and asynchronous models for processing client requests. Requests and their associated responses are accessed using the `HttpListenerContext` object returned by the `HttpListener.GetContext` method or its asynchronous counterparts, the `HttpListener.BeginGetContext` and `HttpListener.EndGetContext` methods.

The synchronous model is appropriate if your application should block while waiting for a client request and if you want to process only one request at a time. Using the synchronous model, call the `HttpListener.GetContext` method, which waits for a client to send a request. The method returns an `HttpListenerContext` object to you for processing when one occurs.

In the more complex asynchronous model, your application does not block while waiting for requests and each request is processed in its own execution thread. Use the `HttpListener.BeginGetContext` method to specify an application-defined method to be called for each incoming request. Within that method, call the `HttpListener.EndGetContext` method to obtain the request, process it, and respond.

In either model, incoming requests are accessed using the `Request` property and are represented by `HttpListenerRequest` objects. Similarly, responses are accessed using the `Response` property and are represented by `HttpListenerResponse` objects. These objects share some functionality with the `HttpWebRequest` and `HttpWebResponse` objects, but the latter objects cannot be used in conjunction with `HttpListener` because they implement client, not server, behaviors.

An `HttpListener` can require client authentication. You can either specify a particular scheme to use for authentication, or you can specify a delegate that determines the scheme to use. You must require some form of authentication to obtain information about the client's identity. For additional information, see the `User`, `AuthenticationSchemes`, and `AuthenticationSchemeSelectorDelegate` properties.

> **Note:**
> If you create an `HttpListener` using https, you must select a Server Certificate for that listener. Otherwise, requests to this `HttpListener` will fail with an unexpected close of the connection.

> **Note:**
> You can configure Server Certificates and other listener options by using Network Shell (netsh.exe). See Network Shell (Netsh) for more details. The executable began shipping with Windows Server 2008 and Windows Vista.

> **Note:**
> If you specify multiple authentication schemes for the `HttpListener`, the listener will challenge clients in the following order: `Negotiate`, `NTLM`, `Digest`, and then `Basic`.

#### HTTP.sys

The `HttpListener` class is built on top of `HTTP.sys`, which is the kernel mode listener that handles all HTTP traffic for Windows.
`HTTP.sys` provides connection management, bandwidth throttling, and web server logging.
Use the HttpCfg.exe tool to add SSL certificates.

Starting in .NET 11, the Windows `HTTP.sys` implementation of `HttpListener` supports enabling kernel-level response buffering. When enabled, response data is buffered by `HTTP.sys` before being sent to the client, which can improve throughput for high-latency connections. This can be enabled by calling the `AppContext.SetSwitch` method as follows:

```csharp
   AppContext.SetSwitch("System.Net.HttpListener.EnableKernelResponseBuffering", true);
```

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListener.HttpListener() constructor

```csharp
public HttpListener ();
```

Initializes a new instance of the `HttpListener` class. The `HttpListener` type is not recommended for new development; for more information, see the Remarks section.

Exceptions:

- `PlatformNotSupportedException`: The operating system is not supported.

#### Remarks

Before using the instance returned by this constructor, you must invoke its `HttpListener.Start` method.

#### Examples
The following code example demonstrates using the `HttpListener` constructor to create a new `HttpListener` object. For the complete example, see the `HttpListener` class topic.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListener.AuthenticationSchemes property

```csharp
public System.Net.AuthenticationSchemes AuthenticationSchemes { get; set; }
```

Gets or sets the scheme used to authenticate clients.

Returns: A bitwise combination of `AuthenticationSchemes` enumeration values that indicates how clients are to be authenticated. The default value is `AuthenticationSchemes.Anonymous`.

Exceptions:

- `ObjectDisposedException`: This object has been closed.

#### Remarks
The `HttpListener` uses the specified scheme to authenticate all incoming requests. The `HttpListener.GetContext` and `HttpListener.EndGetContext` methods return an incoming client request only if the `HttpListener` successfully authenticates the request.

You can interrogate the identity of a successfully authenticated client by using the `User` property.

If you want an `HttpListener` object to use different authentication mechanisms based on characteristics of the requests it receives (for example, the request's `HttpListenerRequest.Url` or `UserHostName` property), you must implement a method that chooses the authentication scheme. For instructions about how to do this, see the `AuthenticationSchemeSelectorDelegate` property documentation.

> **Note:**
> To set this property to enable Digest, NTLM, or Negotiate requires the `SecurityPermission`, `ControlPrincipal`.

#### Examples
The following code example demonstrates using the `AuthenticationSchemes` property to specify an authentication scheme.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListener.AuthenticationSchemeSelectorDelegate property

```csharp
public System.Net.AuthenticationSchemeSelector? AuthenticationSchemeSelectorDelegate { get; set; }
```

Gets or sets the delegate called to determine the protocol used to authenticate clients.

Returns: An `AuthenticationSchemeSelector` delegate that invokes the method used to select an authentication protocol. The default value is `null`.

Exceptions:

- `ObjectDisposedException`: This object has been closed.

#### Remarks

> **Note:**
> If you want the same authentication protocol to be used for all requests handled by a particular instance of `HttpListener`, you do not need to set this property. To specify a protocol to be used for all client requests, use the `AuthenticationSchemes` property.

If the client has not specified authentication information in its headers, the `HttpListener` calls the specified delegate for each unauthenticated incoming request to determine which, if any, protocol to use to authenticate the client. The `HttpListener.GetContext` and `HttpListener.EndGetContext` methods return an incoming request only if the `HttpListener` successfully authenticated the request. If a request cannot be authenticated, the `HttpListener` automatically sends back a 401 response. You can get the identity of a successfully authenticated client using the `LogonUserIdentity` property.

The ability to delegate the choice of authentication protocol to an application-specific method is useful if you want an instance of `HttpListener` to use different authentication protocols depending on the characteristics of the requests it receives (for example, the request's `HttpListenerRequest.Url` or `UserHostAddress` property).

> **Note:**
> To set this property to enable Digest, NTLM, or Negotiate requires the `SecurityPermission`, `ControlPrincipal`.

#### Examples
The following code example sets the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net/AuthenticationSchemes/Overview/sample.cs._

The following code example provides an implementation of a method invoked by an `AuthenticationSchemeSelector` delegate.

_Code sample not included: ~/snippets/csharp/System.Net/AuthenticationSchemes/Overview/sample.cs._

## HttpListener.DefaultServiceNames property

```csharp
public System.Security.Authentication.ExtendedProtection.ServiceNameCollection DefaultServiceNames { get; }
```

Gets a default list of Service Provider Names (SPNs) as determined by registered prefixes.

Returns: A `ServiceNameCollection` that contains a list of SPNs.

#### Remarks
The `DefaultServiceNames` property is used with integrated Windows authentication to provide extended protection. The list of SPNs is initialized from the `Prefixes` property when accessed and cleared when new prefixes are added to the `Prefixes` property.

The `DefaultServiceNames` property is used if an application doesn't set the `CustomServiceNames` property on its extended protection policy.

The `ServiceNameCollection` that is retrieved with the `DefaultServiceNames` property is built from the `Prefixes` property according to the following rules:

1.  If the hostname is "+", "*", or an IPv4 or IPv6 literal (equivalent to "\*" but restricted to a specific local interface), the following SPN is added:

`"HTTP/"` plus the fully qualified domain name of the computer.

1.  If the hostname contains no dots (no domains or subdomains), an attempt is made to resolve the fully-qualified domain name using DNS (the same behavior used by `HttpWebRequest`). If the fully-qualified domain name can be resolved, the following SPNs are added:

`"HTTP/"` plus the hostname (the short name).

`"HTTP/"` plus the fully qualified domain name for the hostname.

1.  If the hostname contains not dots (no domains or subdomains) and a fully-qualified domain name can't be resolved, the following SPN is added:

`"HTTP/"` plus the hostname.

1.  If the hostname contains dots (domains or subdomains), the following SPN is added:

`"HTTP/"` plus the hostname.

The `DefaultServiceNames` property can be used by an application to review the list of default SPNs which will be used for authentication if no custom list is supplied. If other SPNs are needed, an application can add them using one of the `ServiceNameCollection.Merge` methods.

It is not safe when using extended protection to make policy decisions based on the requested URL, since this can be spoofed. Rather, applications should rely on the `HttpListenerRequest.LocalEndPoint` or `HttpListenerRequest.RemoteEndPoint` properties to make such policy decisions.

## HttpListener.ExtendedProtectionPolicy property

```csharp
public System.Security.Authentication.ExtendedProtection.ExtendedProtectionPolicy ExtendedProtectionPolicy { get; set; }
```

Gets or sets the `ExtendedProtectionPolicy` to use for extended protection for a session.

Returns: A `ExtendedProtectionPolicy` that specifies the policy to use for extended protection.

Exceptions:

- `ArgumentException`: An attempt was made to set the `HttpListener.ExtendedProtectionPolicy` property, but the `ExtendedProtectionPolicy.CustomChannelBinding` property was not `null`.
- `ArgumentNullException`: An attempt was made to set the `HttpListener.ExtendedProtectionPolicy` property to `null`.
- `InvalidOperationException`: An attempt was made to set the `HttpListener.ExtendedProtectionPolicy` property after the `HttpListener.Start` method was already called.
- `ObjectDisposedException`: This object is closed.
- `PlatformNotSupportedException`: The `ExtendedProtectionPolicy.PolicyEnforcement` property was set to `PolicyEnforcement.Always` on a platform that does not support extended protection.

#### Remarks
The `ExtendedProtectionPolicy` property is used with integrated Windows authentication to provide extended protection. The `ExtendedProtectionPolicy` property allows the configuration of the extended protection policy for the whole `HttpListener` session. The `ExtendedProtectionSelectorDelegate` property allows the configuration of the extended protection policy for each individual request.

The `CustomChannelBinding` property must be `null`. The `HttpListener` instance gets the Channel Binding Token (CBT) directly from its own TLS session if there is one.
