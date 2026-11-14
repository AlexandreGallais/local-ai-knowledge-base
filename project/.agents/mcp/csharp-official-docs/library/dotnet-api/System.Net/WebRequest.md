---
title: "WebRequest class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/WebRequest.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WebRequest class

Namespace: `System.Net`

```csharp
public abstract class WebRequest : MarshalByRefObject, System.Runtime.Serialization.ISerializable
```

Makes a request to a Uniform Resource Identifier (URI). This is an `abstract` class.

#### Remarks

## WebRequest.WebRequest() constructor

```csharp
protected WebRequest ();
```

Initializes a new instance of the `WebRequest` class.

To be added.

## WebRequest.WebRequest(SerializationInfo, StreamingContext) constructor

```csharp
protected WebRequest (System.Runtime.Serialization.SerializationInfo serializationInfo, System.Runtime.Serialization.StreamingContext streamingContext);
```

Initializes a new instance of the `WebRequest` class from the specified instances of the `SerializationInfo` and `StreamingContext` classes.

Parameters:

- `serializationInfo`: The information required to serialize the new `WebRequest` instance.
- `streamingContext`: A `StreamingContext` that indicates the source of the serialized stream associated with the new `WebRequest` instance.

Exceptions:

- `NotImplementedException`: Any attempt is made to access the constructor, when the constructor is not overridden in a descendant class.
- `PlatformNotSupportedException`: In all cases.

To be added.

## WebRequest.AuthenticationLevel property

```csharp
public System.Net.Security.AuthenticationLevel AuthenticationLevel { get; set; }
```

Gets or sets values indicating the level of authentication and impersonation used for this request.

Returns: A bitwise combination of the `AuthenticationLevel` values. The default value is `AuthenticationLevel.MutualAuthRequested`.

In mutual authentication, both the client and server present credentials to establish their identity. The `AuthenticationLevel.MutualAuthRequired` and `AuthenticationLevel.MutualAuthRequested` values are relevant for Kerberos authentication. Kerberos authentication can be supported directly, or can be used if the Negotiate security protocol is used to select the actual security protocol. For more information about authentication protocols, see Internet Authentication.

To determine whether mutual authentication occurred, check the `WebResponse.IsMutuallyAuthenticated` property.

If you specify the `AuthenticationLevel.MutualAuthRequired` authentication flag value and mutual authentication does not occur, your application will receive an `IOException` with a `ProtocolViolationException` inner exception indicating that mutual authentication failed.

#### Examples
The following code example sets the value of this property.

_Code sample not included: ~/snippets/csharp/Microsoft.Win32/IntranetZoneCredentialPolicy/Overview/websample.cs._
## WebRequest.CachePolicy property

```csharp
public virtual System.Net.Cache.RequestCachePolicy? CachePolicy { get; set; }
```

Gets or sets the cache policy for this request.

Returns: A `RequestCachePolicy` object that defines a cache policy.

## WebRequest.ConnectionGroupName property

```csharp
public virtual string? ConnectionGroupName { get; set; }
```

When overridden in a descendant class, gets or sets the name of the connection group for the request.

Returns: The name of the connection group for the request.

Exceptions:

- `NotImplementedException`: Any attempt is made to get or set the property, when the property is not overridden in a descendant class.

## WebRequest.ContentLength property

```csharp
public virtual long ContentLength { get; set; }
```

When overridden in a descendant class, gets or sets the content length of the request data being sent.

Returns: The number of bytes of request data being sent.

Exceptions:

- `NotImplementedException`: Any attempt is made to get or set the property, when the property is not overridden in a descendant class.

## WebRequest.ContentType property

```csharp
public virtual string? ContentType { get; set; }
```

When overridden in a descendant class, gets or sets the content type of the request data being sent.

Returns: The content type of the request data.

Exceptions:

- `NotImplementedException`: Any attempt is made to get or set the property, when the property is not overridden in a descendant class.

## WebRequest.Credentials <example-value>

```csharp
public virtual System.Net.ICredentials? Credentials { get; set; }
```

When overridden in a descendant class, gets or sets the network credentials used for authenticating the request with the Internet resource.

Returns: An `ICredentials` containing the authentication credentials <example-value> with the request. The default is `null`.

Exceptions:

- `NotImplementedException`: Any attempt is made to get or set the property, when the property is not overridden in a descendant class.

## WebRequest.DefaultCachePolicy property

```csharp
public static System.Net.Cache.RequestCachePolicy? DefaultCachePolicy { get; set; }
```

Gets or sets the default cache policy for this request.

Returns: A `HttpRequestCachePolicy` that specifies the cache policy in effect for this request when no other policy is applicable.

## WebRequest.DefaultWebProxy property

```csharp
public static System.Net.IWebProxy? DefaultWebProxy { get; set; }
```

Gets or sets the global HTTP proxy.

Returns: An `IWebProxy` used by every call to instances of `WebRequest`.

## WebRequest.Headers property

```csharp
public virtual System.Net.WebHeaderCollection Headers { get; set; }
```

When overridden in a descendant class, gets or sets the collection of header name/value pairs associated with the request.

Returns: A `WebHeaderCollection` containing the header name/value pairs associated with this request.

Exceptions:

- `NotImplementedException`: Any attempt is made to get or set the property, when the property is not overridden in a descendant class.

## WebRequest.ImpersonationLevel property

```csharp
public System.Security.Principal.TokenImpersonationLevel ImpersonationLevel { get; set; }
```

Gets or sets the impersonation level for the current request.

Returns: A `TokenImpersonationLevel` value.

## WebRequest.Method property

```csharp
public virtual string Method { get; set; }
```

When overridden in a descendant class, gets or sets the protocol method to use in this request.

Returns: The protocol method to use in this request.

Exceptions:

- `NotImplementedException`: If the property is not overridden in a descendant class, any attempt is made to get or set the property.

## WebRequest.PreAuthenticate property

```csharp
public virtual bool PreAuthenticate { get; set; }
```

When overridden in a descendant class, indicates whether to pre-authenticate the request.

Returns: `true` to pre-authenticate; otherwise, `false`.

Exceptions:

- `NotImplementedException`: Any attempt is made to get or set the property, when the property is not overridden in a descendant class.

## WebRequest.Proxy property

```csharp
public virtual System.Net.IWebProxy? Proxy { get; set; }
```

When overridden in a descendant class, gets or sets the network proxy to use to access this Internet resource.

Returns: The `IWebProxy` to use to access the Internet resource.

Exceptions:

- `NotImplementedException`: Any attempt is made to get or set the property, when the property is not overridden in a descendant class.

## WebRequest.RequestUri property

```csharp
public virtual Uri RequestUri { get; }
```

When overridden in a descendant class, gets the URI of the Internet resource associated with the request.

Returns: A `Uri` representing the resource associated with the request.

Exceptions:

- `NotImplementedException`: Any attempt is made to get or set the property, when the property is not overridden in a descendant class.

## WebRequest.Timeout property

```csharp
public virtual int Timeout { get; set; }
```

Gets or sets the length of time, in milliseconds, before the request times out.

Returns: The length of time, in milliseconds, until the request times out, or the value `Timeout.Infinite` to indicate that the request does not time out. The default value is defined by the descendant class.

Exceptions:

- `NotImplementedException`: Any attempt is made to get or set the property, when the property is not overridden in a descendant class.

## WebRequest.UseDefaultCredentials <example-value>

```csharp
public virtual bool UseDefaultCredentials { get; set; }
```

When overridden in a descendant class, gets or sets a `Boolean` value that controls whether `CredentialCache.DefaultCredentials` are sent with requests.

Returns: `true` if the default credentials are used; otherwise `false`. The default value is `false`.

Exceptions:

- `InvalidOperationException`: You attempted to set this property after the request was sent.
- `NotImplementedException`: Any attempt is made to access the property, when the property is not overridden in a descendant class.

## WebRequest.Abort() method

```csharp
public virtual void Abort ();
```

Aborts the request.

Exceptions:

- `NotImplementedException`: Any attempt is made to access the method, when the method is not overridden in a descendant class.

## WebRequest.BeginGetRequestStream(AsyncCallback, Object) method

```csharp
public virtual IAsyncResult BeginGetRequestStream (AsyncCallback? callback, object? state);
```

When overridden in a descendant class, provides an asynchronous version of the `WebRequest.GetRequestStream` method.

Parameters:

- `callback`: The `AsyncCallback` delegate.
- `state`: An object containing state information for this asynchronous request.

Returns: An `IAsyncResult` that references the asynchronous request.

Exceptions:

- `NotImplementedException`: Any attempt is made to access the method, when the method is not overridden in a descendant class.

## WebRequest.BeginGetResponse(AsyncCallback, Object) method

```csharp
public virtual IAsyncResult BeginGetResponse (AsyncCallback? callback, object? state);
```

When overridden in a descendant class, begins an asynchronous request for an Internet resource.

Parameters:

- `callback`: The `AsyncCallback` delegate.
- `state`: An object containing state information for this asynchronous request.

Returns: An `IAsyncResult` that references the asynchronous request.

Exceptions:

- `NotImplementedException`: Any attempt is made to access the method, when the method is not overridden in a descendant class.

## WebRequest.Create(String) method

```csharp
public static System.Net.WebRequest Create (string requestUriString);
```

Initializes a new `WebRequest` instance for the specified URI scheme.

Parameters:

- `requestUriString`: The URI that identifies the Internet resource.

Returns: A `WebRequest` descendant for the specific URI scheme.

Exceptions:

- `NotSupportedException`: The request scheme specified in `requestUriString` has not been registered.
- `ArgumentNullException`: `requestUriString` is `null`.
- `SecurityException`: The caller does not have `WebPermissionAttribute` permission to connect to the requested URI or a URI that the request is redirected to.
- `UriFormatException`: The URI specified in `requestUriString` is not a valid URI.

To be added.

## WebRequest.Create(Uri) method

```csharp
public static System.Net.WebRequest Create (Uri requestUri);
```

Initializes a new `WebRequest` instance for the specified URI scheme.

Parameters:

- `requestUri`: A `Uri` containing the URI of the requested resource.

Returns: A `WebRequest` descendant for the specified URI scheme.

Exceptions:

- `NotSupportedException`: The request scheme specified in `requestUri` is not registered.
- `ArgumentNullException`: `requestUri` is `null`.
- `SecurityException`: The caller does not have `WebPermissionAttribute` permission to connect to the requested URI or a URI that the request is redirected to.

To be added.

## WebRequest.CreateDefault(Uri) method

```csharp
public static System.Net.WebRequest CreateDefault (Uri requestUri);
```

Initializes a new `WebRequest` instance for the specified URI scheme.

Parameters:

- `requestUri`: A `Uri` containing the URI of the requested resource.

Returns: A `WebRequest` descendant for the specified URI scheme.

Exceptions:

- `NotSupportedException`: The request scheme specified in `requestUri` is not registered.
- `ArgumentNullException`: `requestUri` is `null`.
- `SecurityException`: The caller does not have `WebPermissionAttribute` permission to connect to the requested URI or a URI that the request is redirected to.

To be added.

## WebRequest.CreateHttp(String) method

```csharp
public static System.Net.HttpWebRequest CreateHttp (string requestUriString);
```

Initializes a new `HttpWebRequest` instance for the specified URI string.

Parameters:

- `requestUriString`: A URI string that identifies the Internet resource.

Returns: An `HttpWebRequest` instance for the specific URI string.

Exceptions:

- `NotSupportedException`: The request scheme specified in `requestUriString` is the http or https scheme.
- `ArgumentNullException`: `requestUriString` is `null`.
- `SecurityException`: The caller does not have `WebPermissionAttribute` permission to connect to the requested URI or a URI that the request is redirected to.
- `UriFormatException`: The URI specified in `requestUriString` is not a valid URI.

To be added.

## WebRequest.CreateHttp(Uri) method

```csharp
public static System.Net.HttpWebRequest CreateHttp (Uri requestUri);
```

Initializes a new `HttpWebRequest` instance for the specified URI.

Parameters:

- `requestUri`: A URI that identifies the Internet resource.

Returns: An `HttpWebRequest` instance for the specific URI string.

Exceptions:

- `NotSupportedException`: The request scheme specified in `requestUri` is the http or https scheme.
- `ArgumentNullException`: `requestUri` is `null`.
- `SecurityException`: The caller does not have `WebPermissionAttribute` permission to connect to the requested URI or a URI that the request is redirected to.
- `UriFormatException`: The URI specified in `requestUri` is not a valid URI.

To be added.

## WebRequest.EndGetRequestStream(IAsyncResult) method

```csharp
public virtual System.IO.Stream EndGetRequestStream (IAsyncResult asyncResult);
```

When overridden in a descendant class, returns a `Stream` for writing data to the Internet resource.

Parameters:

- `asyncResult`: An `IAsyncResult` that references a pending request for a stream.

Returns: A `Stream` to write data to.

Exceptions:

- `NotImplementedException`: Any attempt is made to access the method, when the method is not overridden in a descendant class.
