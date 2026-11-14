---
title: "WebProxy class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/WebProxy.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WebProxy class (part 2 of 2)

## WebProxy.Credentials <example-value>

```csharp
public System.Net.ICredentials? Credentials { get; set; }
```

Gets or sets the credentials to submit to the proxy server for authentication.

Returns: An `ICredentials` instance that contains the credentials to submit to the proxy server for authentication.

Exceptions:

- `InvalidOperationException`: You attempted to set this property when the `WebProxy.UseDefaultCredentials` property was set to `true`.

#### Remarks
The `Credentials` property contains the authentication credentials to send to the proxy server in response to an HTTP 407 (proxy authorization) status code. In most client scenarios, you should use the `CredentialCache.DefaultCredentials`, which are the credentials of the currently logged on user. To do this, set the `UseDefaultCredentials` property to `true` instead of setting this property.

> **Note:**
> If you set the `Credentials` property to credentials other than the `CredentialCache.DefaultCredentials`, setting the `UseDefaultCredentials` property to `true` causes a `InvalidOperationException`. To prevent this, you must set the `Credentials` property to `null` before setting the `UseDefaultCredentials` property to `true`. Likewise, you cannot set this property to any value when `WebProxy.UseDefaultCredentials` is `true`.

## WebProxy.UseDefaultCredentials <example-value>

```csharp
public bool UseDefaultCredentials { get; set; }
```

Gets or sets a `Boolean` value that controls whether the `CredentialCache.DefaultCredentials` are sent with requests.

Returns: `true` if the default credentials are used; otherwise, `false`. The default value is `false`.

Exceptions:

- `InvalidOperationException`: You attempted to set this property when the `WebProxy.Credentials` property contains credentials other than the default credentials.

#### Remarks
Set this property to `true` when requests made by this `WebProxy` object should, if requested by the server, be authenticated using the credentials of the currently logged on user. For client applications, this is the desired behavior in most scenarios. For middle tier applications, such as ASP.NET applications, instead of using this property, you would typically set the `Credentials` property to the credentials of the client on whose behalf the request is made.

The following table shows the effect of setting the `WebProxy.UseDefaultCredentials` value, based on the value of the `Credentials` property.

|`WebProxy.Credentials` value|`WebProxy.UseDefaultCredentials` value|Effect|
|----------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|------------|
|`CredentialCache.DefaultCredentials`|`true`|No effect.|
|`CredentialCache.DefaultCredentials`|`false`|`WebProxy.Credentials` is set to `null`.|
|`null`|`true`|`WebProxy.Credentials` is set to `CredentialCache.DefaultCredentials`.|
|Any value other than `CredentialCache.DefaultCredentials` or `null`|`true` or `false`|Setting `WebProxy.UseDefaultCredentials` throws an exception.|

If `WebProxy.UseDefaultCredentials` is `false`, you can change the `Credentials` property to any credentials. If `WebProxy.UseDefaultCredentials` is `true`, changing the `Credentials` property from `CredentialCache.DefaultCredentials` (the value that is set when the `UseDefaultCredentials` property is set to `true`) will throw an exception.

## WebProxy.GetDefaultProxy() method

```csharp
public static System.Net.WebProxy GetDefaultProxy ();
```

Reads the Internet options nondynamic proxy settings.

Returns: A `WebProxy` instance that contains the nondynamic proxy settings from Internet options.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

> **Note:**
> This method is not supported.

## WebProxy.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
protected virtual void GetObjectData (System.Runtime.Serialization.SerializationInfo serializationInfo, System.Runtime.Serialization.StreamingContext streamingContext);
```

Populates a `SerializationInfo` with the data that is needed to serialize the target object.

Parameters:

- `serializationInfo`: The `SerializationInfo` to populate with data.
- `streamingContext`: A `StreamingContext` that specifies the destination for this serialization.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

#### Remarks
Any objects included in the `SerializationInfo` are automatically tracked and serialized by the formatter.

## WebProxy.GetProxy(Uri) method

```csharp
public Uri? GetProxy (Uri destination);
```

Returns the proxied URI for a request.

Parameters:

- `destination`: The `Uri` instance of the requested Internet resource.

Returns: The `Uri` instance of the Internet resource, if the resource is on the bypass list; otherwise, the `Uri` instance of the proxy.

Exceptions:

- `ArgumentNullException`: The `destination` parameter is `null`.

#### Remarks
The `WebProxy.GetProxy` method returns the URI that the `HttpClient` instance uses to access the Internet resource.

`WebProxy.GetProxy` compares `destination` with the contents of `WebProxy.BypassList`, using the `WebProxy.IsBypassed` method. If `WebProxy.IsBypassed` returns `true`, `WebProxy.GetProxy` returns `destination` and the `HttpClient` instance does not use the proxy server.

If `destination` is not in `WebProxy.BypassList`, the `HttpClient` instance uses the proxy server and the `Address` property is returned.

#### Examples
The following code example creates a `WebProxy` object and calls this method to get the proxy that is selected for a resource.

_Code sample not included: ~/snippets/csharp/System.Net/WebProxy/Address/proxy.cs._
## WebProxy.IsBypassed(Uri) method

```csharp
public bool IsBypassed (Uri host);
```

Indicates whether to use the proxy server for the specified host.

Parameters:

- `host`: The `Uri` instance of the host to check for proxy use.

Returns: `true` if the proxy server should not be used for `host`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: The `host` parameter is `null`.

#### Remarks
The `WebProxy.IsBypassed` method is used to determine whether to bypass the proxy server when accessing an Internet resource.

The `WebProxy.BypassProxyOnLocal` and `WebProxy.BypassList` properties control the return value of the `WebProxy.IsBypassed` method.

`WebProxy.IsBypassed` returns `true` under any of the following conditions:

- If `WebProxy.BypassProxyOnLocal` is `true` and `host` is a local URI. Local requests are identified by the lack of a period (.) in the URI, as in `http://webserver/`.

- If `host` matches a regular expression in `WebProxy.BypassList`.

- If `WebProxy.Address` is `null`.

All other conditions return `false`.

#### Examples
The following code example creates a `WebProxy` object and calls this method to check whether the bypass list is properly set.

_Code sample not included: ~/snippets/csharp/System.Net/WebProxy/.ctor/nclwebproxy.cs._
## WebProxy.System.Runtime.Serialization.ISerializable.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
void ISerializable.GetObjectData (System.Runtime.Serialization.SerializationInfo? serializationInfo, System.Runtime.Serialization.StreamingContext streamingContext);
```

Creates the serialization data and context that are used by the system to serialize a `WebProxy` object.

Parameters:

- `serializationInfo`: The `SerializationInfo` object to populate with data.
- `streamingContext`: A `StreamingContext` structure that indicates the destination for this serialization.

#### Remarks
The system calls this method to serialize an object; applications do not call it directly.
