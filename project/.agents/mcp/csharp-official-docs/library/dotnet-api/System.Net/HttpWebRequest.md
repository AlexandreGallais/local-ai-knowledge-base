---
title: "HttpWebRequest class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/HttpWebRequest.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpWebRequest class

Namespace: `System.Net`

```csharp
public class HttpWebRequest : System.Net.WebRequest, System.Runtime.Serialization.ISerializable
```

Provides an HTTP-specific implementation of the `WebRequest` class.

#### Remarks

## HttpWebRequest.HttpWebRequest(SerializationInfo, StreamingContext) constructor

```csharp
protected HttpWebRequest (System.Runtime.Serialization.SerializationInfo serializationInfo, System.Runtime.Serialization.StreamingContext streamingContext);
```

Initializes a new instance of the `HttpWebRequest` class from the specified instances of the `SerializationInfo` and `StreamingContext` classes. This constructor is obsolete.

Parameters:

- `serializationInfo`: A `SerializationInfo` object that contains the information required to serialize the new `HttpWebRequest` object.
- `streamingContext`: A `StreamingContext` object that contains the source and destination of the serialized stream associated with the new `HttpWebRequest` object.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## HttpWebRequest.Accept property

```csharp
public string? Accept { get; set; }
```

Gets or sets the value of the `Accept` HTTP header.

Returns: The value of the `Accept` HTTP header. The default value is `null`.

## HttpWebRequest.Address property

```csharp
public Uri Address { get; }
```

Gets the Uniform Resource Identifier (URI) of the Internet resource that actually responds to the request.

Returns: A `Uri` that identifies the Internet resource that actually responds to the request. The default is the URI used by the `WebRequest.Create` method to initialize the request.

## HttpWebRequest.AllowAutoRedirect property

```csharp
public virtual bool AllowAutoRedirect { get; set; }
```

Gets or sets a value that indicates whether the request should follow redirection responses.

Returns: `true` if the request should automatically follow redirection responses from the Internet resource; otherwise, `false`. The default value is `true`.

## HttpWebRequest.AllowReadStreamBuffering property

```csharp
public virtual bool AllowReadStreamBuffering { get; set; }
```

Gets or sets a value that indicates whether to buffer the received from the Internet resource.

Returns: `true` to enable buffering of the data received from the Internet resource; `false` to disable buffering. The default is `false`.

To be added.

## HttpWebRequest.AllowWriteStreamBuffering property

```csharp
public virtual bool AllowWriteStreamBuffering { get; set; }
```

Gets or sets a value that indicates whether to buffer the data sent to the Internet resource.

Returns: `true` to enable buffering of the data sent to the Internet resource; `false` to disable buffering. The default is `true`.

## HttpWebRequest.AutomaticDecompression property

```csharp
public System.Net.DecompressionMethods AutomaticDecompression { get; set; }
```

Gets or sets the type of decompression that is used.

Returns: A `DecompressionMethods` object that indicates the type of decompression that is used.

Exceptions:

- `InvalidOperationException`: The object's current state does not allow this property to be set.

To be added.

## HttpWebRequest.ClientCertificates property

```csharp
public System.Security.Cryptography.X509Certificates.X509CertificateCollection ClientCertificates { get; set; }
```

Gets or sets the collection of security certificates that are associated with this request.

Returns: The `X509CertificateCollection` that contains the security certificates associated with this request.

Exceptions:

- `ArgumentNullException`: The value specified for a set operation is `null`.

## HttpWebRequest.Connection property

```csharp
public string? Connection { get; set; }
```

Gets or sets the value of the `Connection` HTTP header.

Returns: The value of the `Connection` HTTP header. The default value is `null`.

Exceptions:

- `ArgumentException`: The value of `HttpWebRequest.Connection` is set to Keep-alive or Close.

## HttpWebRequest.ConnectionGroupName property

```csharp
public override string? ConnectionGroupName { get; set; }
```

Gets or sets the name of the connection group for the request.

Returns: The name of the connection group for this request. The default value is `null`.

## HttpWebRequest.ContentLength property

```csharp
public override long ContentLength { get; set; }
```

Gets or sets the `Content-length` HTTP header.

Returns: The number of bytes of data to send to the Internet resource. The default is -1, which indicates the property has not been set and that there is no request data to send.

Exceptions:

- `InvalidOperationException`: The request has been started by calling the `HttpWebRequest.GetRequestStream`, `HttpWebRequest.BeginGetRequestStream`, `HttpWebRequest.GetResponse`, or `HttpWebRequest.BeginGetResponse` method.
- `ArgumentOutOfRangeException`: The new `HttpWebRequest.ContentLength` value is less than 0.

## HttpWebRequest.ContentType property

```csharp
public override string? ContentType { get; set; }
```

Gets or sets the value of the `Content-type` HTTP header.

Returns: The value of the `Content-type` HTTP header. The default value is `null`.

## HttpWebRequest.ContinueDelegate property

```csharp
public System.Net.HttpContinueDelegate? ContinueDelegate { get; set; }
```

Gets or sets the delegate method called when an HTTP 100-continue response is received from the Internet resource.

Returns: A delegate that implements the callback method that executes when an HTTP Continue response is returned from the Internet resource. The default value is `null`.

## HttpWebRequest.ContinueTimeout property

```csharp
public int ContinueTimeout { get; set; }
```

Gets or sets a timeout, in milliseconds, to wait until the 100-Continue is received from the server.

Returns: The timeout, in milliseconds, to wait until the 100-Continue is received.

## HttpWebRequest.CookieContainer property

```csharp
public virtual System.Net.CookieContainer? CookieContainer { get; set; }
```

Gets or sets the cookies associated with the request.

Returns: A `CookieContainer` that contains the cookies associated with this request.

## HttpWebRequest.Credentials <example-value>

```csharp
public override System.Net.ICredentials? Credentials { get; set; }
```

Gets or sets authentication information for the request.

Returns: An `ICredentials` that contains the authentication credentials <example-value> with the request. The default is `null`.

## HttpWebRequest.Date property

```csharp
public DateTime Date { get; set; }
```

Gets or sets the `Date` HTTP header value to use in an HTTP request.

Returns: The Date header value in the HTTP request.

## HttpWebRequest.DefaultCachePolicy property

```csharp
public static System.Net.Cache.RequestCachePolicy? DefaultCachePolicy { get; set; }
```

Gets or sets the default cache policy for this request.

Returns: A `HttpRequestCachePolicy` that specifies the cache policy in effect for this request when no other policy is applicable.

## HttpWebRequest.DefaultMaximumErrorResponseLength property

```csharp
public static int DefaultMaximumErrorResponseLength { get; set; }
```

Gets or sets the default maximum length of an HTTP error response.

Returns: The default maximum length, in kilobytes (1024 bytes), of an HTTP error response.

Exceptions:

- `ArgumentOutOfRangeException`: The value is less than 0 and is not equal to -1.

To be added.

## HttpWebRequest.DefaultMaximumResponseHeadersLength property

```csharp
public static int DefaultMaximumResponseHeadersLength { get; set; }
```

Gets or sets the default for the `HttpWebRequest.MaximumResponseHeadersLength` property.

Returns: The length, in kilobytes (1024 bytes), of the default maximum for response headers received. The default configuration file sets this value to 64 kilobytes.

Exceptions:

- `ArgumentOutOfRangeException`: The value is less than zero.

## HttpWebRequest.Expect property

```csharp
public string? Expect { get; set; }
```

Gets or sets the value of the `Expect` HTTP header.

Returns: The contents of the `Expect` HTTP header. The default value is `null`.

Exceptions:

- `ArgumentException`: `Expect` is set to a string that contains "100-continue" as a substring.

The value for this property is stored in `WebHeaderCollection`. If WebHeaderCollection is set, the property value is lost.

## HttpWebRequest.HaveResponse property

```csharp
public virtual bool HaveResponse { get; }
```

Gets a value that indicates whether a response has been received from an Internet resource.

Returns: `true` if a response has been received; otherwise, `false`.

#### Examples
The following code example checks the `HaveResponse` property to determine if a response has been received from an Internet resource.

_Code sample not included: ~/snippets/csharp/System.Net/HttpWebRequest/HaveResponse/httpwebrequest_haveresponse.cs._

## HttpWebRequest.Headers property

```csharp
public override System.Net.WebHeaderCollection Headers { get; set; }
```

Specifies a collection of the name/value pairs that make up the HTTP headers.

Returns: A `WebHeaderCollection` that contains the name/value pairs that make up the headers for the HTTP request.

Exceptions:

- `InvalidOperationException`: The request has been started by calling the `HttpWebRequest.GetRequestStream`, `HttpWebRequest.BeginGetRequestStream`, `HttpWebRequest.GetResponse`, or `HttpWebRequest.BeginGetResponse` method.

## HttpWebRequest.Host property

```csharp
public string Host { get; set; }
```

Gets or sets the Host header value to use in an HTTP request independent from the request URI.

Returns: The Host header value in the HTTP request.

Exceptions:

- `ArgumentNullException`: The Host header cannot be set to `null`.
- `ArgumentException`: The Host header cannot be set to an invalid value.
- `InvalidOperationException`: The Host header cannot be set after the `HttpWebRequest` has already started to be sent.

## HttpWebRequest.IfModifiedSince property

```csharp
public DateTime IfModifiedSince { get; set; }
```

Gets or sets the value of the `If-Modified-Since` HTTP header.

Returns: A `DateTime` that contains the contents of the `If-Modified-Since` HTTP header.

## HttpWebRequest.KeepAlive property

```csharp
public bool KeepAlive { get; set; }
```

Gets or sets a value that indicates whether to make a persistent connection to the Internet resource.

Returns: `true` if the request to the Internet resource should contain a `Connection` HTTP header with the value Keep-alive; otherwise, `false`. The default is `true`.

## HttpWebRequest.MaximumAutomaticRedirections property

```csharp
public int MaximumAutomaticRedirections { get; set; }
```

Gets or sets the maximum number of redirects that the request follows.

Returns: The maximum number of redirection responses that the request follows. The default value is 50.

Exceptions:

- `ArgumentException`: The value is set to 0 or less.

## HttpWebRequest.MaximumResponseHeadersLength property

```csharp
public int MaximumResponseHeadersLength { get; set; }
```

Gets or sets the maximum allowed length of the response headers.

Returns: The length, in kilobytes (1024 bytes), of the response headers.

Exceptions:

- `InvalidOperationException`: The property is set after the request has already been submitted.
- `ArgumentOutOfRangeException`: The value is less than 0.

## HttpWebRequest.MediaType property

```csharp
public string? MediaType { get; set; }
```

Gets or sets the media type of the request.

Returns: The media type of the request. The default value is `null`.

## HttpWebRequest.Method property

```csharp
public override string Method { get; set; }
```

Gets or sets the method for the request.

Returns: The request method to use to contact the Internet resource. The default value is GET.

Exceptions:

- `ArgumentException`: No method is supplied.

-or-

The method string contains invalid characters.

## HttpWebRequest.Pipelined property

```csharp
public bool Pipelined { get; set; }
```

Gets or sets a value that indicates whether to pipeline the request to the Internet resource.

Returns: `true` if the request should be pipelined; otherwise, `false`. The default is `true`.

## HttpWebRequest.PreAuthenticate property

```csharp
public override bool PreAuthenticate { get; set; }
```

Gets or sets a value that indicates whether to send an Authorization header with the request.

Returns: `true` to send an HTTP Authorization header with requests after authentication has taken place; otherwise, `false`. The default is `false`.

## HttpWebRequest.ProtocolVersion property

```csharp
public Version ProtocolVersion { get; set; }
```

Gets or sets the version of HTTP to use for the request.

Returns: The HTTP version to use for the request. The default is `HttpVersion.Version11`.

Exceptions:

- `ArgumentException`: The HTTP version is set to a value other than 1.0 or 1.1.

## HttpWebRequest.Proxy property

```csharp
public override System.Net.IWebProxy? Proxy { get; set; }
```

Gets or sets proxy information for the request.

Returns: The `IWebProxy` object to use to proxy the request. The default value is set by calling the `GlobalProxySelection.Select` property.

Exceptions:

- `ArgumentNullException`: `HttpWebRequest.Proxy` is set to `null`.
- `InvalidOperationException`: The request has been started by calling `HttpWebRequest.GetRequestStream`, `HttpWebRequest.BeginGetRequestStream`, `HttpWebRequest.GetResponse`, or `HttpWebRequest.BeginGetResponse`.
- `SecurityException`: The caller does not have permission for the requested operation.

## HttpWebRequest.ReadWriteTimeout property

```csharp
public int ReadWriteTimeout { get; set; }
```

Gets or sets a time-out in milliseconds when writing to or reading from a stream.

Returns: The number of milliseconds before the writing or reading times out. The default value is 300,000 milliseconds (5 minutes).

Exceptions:

- `InvalidOperationException`: The request has already been sent.
- `ArgumentOutOfRangeException`: The value specified for a set operation is less than or equal to zero and is not equal to `Timeout.Infinite`

## HttpWebRequest.Referer property

```csharp
public string? Referer { get; set; }
```

Gets or sets the value of the `Referer` HTTP header.

Returns: The value of the `Referer` HTTP header. The default value is `null`.

## HttpWebRequest.RequestUri property

```csharp
public override Uri RequestUri { get; }
```

Gets the original Uniform Resource Identifier (URI) of the request.

Returns: A `Uri` that contains the URI of the Internet resource passed to the `WebRequest.Create` method.
