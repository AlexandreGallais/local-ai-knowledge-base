---
title: "HttpWebResponse class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/HttpWebResponse.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpWebResponse class

Namespace: `System.Net`

```csharp
public class HttpWebResponse : System.Net.WebResponse, System.Runtime.Serialization.ISerializable
```

Provides an HTTP-specific implementation of the `WebResponse` class.

#### Remarks
This class contains support for HTTP-specific uses of the properties and methods of the `WebResponse` class. The `HttpWebResponse` class is used to build HTTP stand-alone client applications that send HTTP requests and receive HTTP responses.

> **Note:**
> Do not confuse `HttpWebResponse` with the `HttpResponse` class that is used in ASP.NET applications and whose methods and properties are exposed through ASP.NET's intrinsic `Response` object.

You should never directly create an instance of the `HttpWebResponse` class. Instead, use the instance returned by a call to `HttpWebRequest.GetResponse`. You must call either the `Stream.Close` or the `HttpWebResponse.Close` method to close the response and release the connection for reuse. It is not necessary to call both `Stream.Close` and `HttpWebResponse.Close`, but doing so does not cause an error.

Common header information returned from the Internet resource is exposed as properties of the class. See the following table for a complete list. Other headers can be read from the `Headers` property as name/value pairs.

The following table shows the common HTTP headers that are available through properties of the `HttpWebResponse` class.

|Header|Property|
|------------|--------------|
|Content-Encoding|`HttpWebResponse.ContentEncoding`|
|Content-Length|`HttpWebResponse.ContentLength`|
|Content-Type|`HttpWebResponse.ContentType`|
|Last-Modified|`HttpWebResponse.LastModified`|
|Server|`HttpWebResponse.Server`|

The contents of the response from the Internet resource are returned as a `Stream` by calling the `HttpWebResponse.GetResponseStream` method.

#### Examples
The following example returns an `HttpWebResponse` from an `HttpWebRequest`.

_Code sample not included: ~/snippets/csharp/System.Net/HttpWebResponse/Overview/source.cs._

## HttpWebResponse.HttpWebResponse() constructor

```csharp
public HttpWebResponse ();
```

Initializes a new instance of the `HttpWebResponse` class.

To be added.

## HttpWebResponse.HttpWebResponse(SerializationInfo, StreamingContext) constructor

```csharp
protected HttpWebResponse (System.Runtime.Serialization.SerializationInfo serializationInfo, System.Runtime.Serialization.StreamingContext streamingContext);
```

Initializes a new instance of the `HttpWebResponse` class from the specified `SerializationInfo` and `StreamingContext` instances.

Parameters:

- `serializationInfo`: A `SerializationInfo` that contains the information required to serialize the new `HttpWebRequest`.
- `streamingContext`: A `StreamingContext` that contains the source of the serialized stream that is associated with the new `HttpWebRequest`.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## HttpWebResponse.CharacterSet property

```csharp
public string? CharacterSet { get; }
```

Gets the character set of the response.

Returns: A string that contains the character set of the response.

Exceptions:

- `ObjectDisposedException`: The current instance has been disposed.

#### Remarks
The `CharacterSet` property contains a value that describes the character set of the response. This character set information is taken from the header returned with the response.

#### Examples
The following example obtains the character set of the response.

_Code sample not included: ~/snippets/csharp/System.Net/HttpWebResponse/CharacterSet/source.cs._

## HttpWebResponse.ContentEncoding property

```csharp
public string ContentEncoding { get; }
```

Gets the method that is used to encode the body of the response.

Returns: A string that describes the method that is used to encode the body of the response.

Exceptions:

- `ObjectDisposedException`: The current instance has been disposed.

#### Remarks
The `ContentEncoding` property contains the value of the Content-Encoding header returned with the response.

#### Examples
The following example uses the `ContentEncoding` property to obtain the value of the Content-Encoding header returned with the response.

_Code sample not included: ~/snippets/csharp/System.Net/HttpWebResponse/CharacterSet/source.cs._

## HttpWebResponse.ContentLength property

```csharp
public override long ContentLength { get; }
```

Gets the length of the content returned by the request.

Returns: The number of bytes returned by the request. Content length does not include header information.

Exceptions:

- `ObjectDisposedException`: The current instance has been disposed.

#### Remarks
The `ContentLength` property contains the value of the Content-Length header returned with the response. If the Content-Length header is not set in the response, `HttpWebResponse.ContentLength` is set to the value -1.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net/HttpWebRequest/Credentials/httpwebrequest1.cs._

## HttpWebResponse.ContentType property

```csharp
public override string ContentType { get; }
```

Gets the content type of the response.

Returns: A string that contains the content type of the response.

Exceptions:

- `ObjectDisposedException`: The current instance has been disposed.

#### Remarks
The `ContentType` property contains the value of the Content-Type header returned with the response.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net/HttpWebRequest/Credentials/httpwebrequest1.cs._

## HttpWebResponse.Cookies property

```csharp
public virtual System.Net.CookieCollection Cookies { get; set; }
```

Gets or sets the cookies that are associated with this response.

Returns: A `CookieCollection` that contains the cookies that are associated with this response.

Exceptions:

- `ObjectDisposedException`: The current instance has been disposed.

#### Remarks
The `Cookies` property provides an instance of the `CookieCollection` class that holds the cookies associated with this response.

If the `CookieContainer` property of the associated `HttpWebRequest` is `null`, the `Cookies` property will also be `null`. Any cookie information sent by the server will be available in the `Headers` property, however.

#### Examples
The following example sends a request to a URL and displays the cookies returned in the response.

_Code sample not included: ~/snippets/csharp/System.Net/Cookie/Overview/cookiessnippets.cs._

## HttpWebResponse.Headers property

```csharp
public override System.Net.WebHeaderCollection Headers { get; }
```

Gets the headers that are associated with this response from the server.

Returns: A `WebHeaderCollection` that contains the header information returned with the response.

Exceptions:

- `ObjectDisposedException`: The current instance has been disposed.

#### Remarks
The `Headers` property is a collection of name/value pairs that contain the HTTP header values returned with the response. Common header information returned from the Internet resource is exposed as properties of the `HttpWebResponse` class. The following table lists common headers that the API exposes as properties.

|Header|Property|
|------------|--------------|
|Content-Encoding|`HttpWebResponse.ContentEncoding`|
|Content-Length|`HttpWebResponse.ContentLength`|
|Content-Type|`HttpWebResponse.ContentType`|
|Last-Modified|`HttpWebResponse.LastModified`|
|Server|`HttpWebResponse.Server`|

#### Examples
The following example writes the contents of all of the response headers to the console.

_Code sample not included: ~/snippets/csharp/System.Net/HttpWebResponse/Headers/httpwebresponse_headers.cs._

## HttpWebResponse.IsMutuallyAuthenticated property

```csharp
public override bool IsMutuallyAuthenticated { get; }
```

Gets a `Boolean` value that indicates whether both client and server were authenticated.

Returns: `true` if mutual authentication occurred; otherwise, `false`.

Exceptions:

- `ObjectDisposedException`: The current instance has been disposed.

#### Remarks
You can specify mutual authentication using the `AuthenticationLevel` property.

## HttpWebResponse.LastModified property

```csharp
public DateTime LastModified { get; }
```

Gets the last date and time that the contents of the response were modified.

Returns: A `DateTime` that contains the date and time that the contents of the response were modified.

Exceptions:

- `ObjectDisposedException`: The current instance has been disposed.

#### Remarks
The `LastModified` property contains the value of the Last-Modified header received with the response. The date and time are assumed to be local time.

#### Examples
This example creates an `HttpWebRequest` and queries for a response. This example then checks whether the entity requested had been modified any time today.

_Code sample not included: ~/snippets/csharp/System.Net/HttpWebResponse/LastModified/httpwebresponse_lastmodified.cs._

## HttpWebResponse.Method property

```csharp
public virtual string Method { get; }
```

Gets the method that is used to return the response.

Returns: A string that contains the HTTP method that is used to return the response.

Exceptions:

- `ObjectDisposedException`: The current instance has been disposed.

#### Remarks
`HttpWebResponse.Method` returns the method that is used to return the response. Common HTTP methods are GET, HEAD, POST, PUT, and DELETE.

#### Examples
The following example checks the string contained in `HttpWebResponse.Method`, to determine the Http method invoked by the Web server.

_Code sample not included: ~/snippets/csharp/System.Net/HttpWebResponse/Method/httpwebresponse_method_server.cs._

## HttpWebResponse.ProtocolVersion property

```csharp
public Version ProtocolVersion { get; }
```

Gets the version of the HTTP protocol that is used in the response.

Returns: A `Version` that contains the HTTP protocol version of the response.

Exceptions:

- `ObjectDisposedException`: The current instance has been disposed.

#### Remarks
The `ProtocolVersion` property contains the HTTP protocol version number of the response sent by the Internet resource.

#### Examples
This example creates an `HttpWebRequest` and queries for an `HttpWebResponse`. The example then checks to see if the server is responding with the same version.

_Code sample not included: ~/snippets/csharp/System.Net/HttpWebResponse/ProtocolVersion/httpwebresponse_protocolversion.cs._

## HttpWebResponse.ResponseUri property

```csharp
public override Uri ResponseUri { get; }
```

Gets the URI of the Internet resource that responded to the request.

Returns: The URI of the Internet resource that responded to the request.

Exceptions:

- `ObjectDisposedException`: The current instance has been disposed.

#### Remarks
The `ResponseUri` property contains the URI of the Internet resource that actually responded to the request. This URI might not be the same as the originally requested URI, if the original server redirected the request.

The `ResponseUri` property will use the Content-Location header if present.

Applications that need to access the last redirected `HttpWebResponse.ResponseUri` should use the `Address` property rather than `HttpWebResponse.ResponseUri`, since the use of `ResponseUri` property may open security vulnerabilities.

#### Examples
This example creates a `HttpWebRequest` and queries for an `HttpWebResponse` and then checks to see whether the original URI was redirected by the server.

_Code sample not included: ~/snippets/csharp/System.Net/HttpWebResponse/ResponseUri/httpwebresponse_responseuri.cs._

## HttpWebResponse.Server property

```csharp
public string Server { get; }
```

Gets the name of the server that sent the response.

Returns: A string that contains the name of the server that sent the response.

Exceptions:

- `ObjectDisposedException`: The current instance has been disposed.

#### Remarks
The `Server` property contains the value of the Server header returned with the response.

#### Examples
The following example uses the `Server` property to display the Web server's name to the console.

_Code sample not included: ~/snippets/csharp/System.Net/HttpWebResponse/Method/httpwebresponse_method_server.cs._

## HttpWebResponse.StatusCode property

```csharp
public virtual System.Net.HttpStatusCode StatusCode { get; }
```

Gets the status of the response.

Returns: One of the `HttpStatusCode` values.

Exceptions:

- `ObjectDisposedException`: The current instance has been disposed.

#### Remarks
The `HttpWebResponse.StatusCode` parameter is a number that indicates the status of the HTTP response. The expected values for status are defined in the `HttpStatusCode` class.

#### Examples
The following example uses `HttpWebResponse.StatusCode` to verify that the status of the `HttpWebResponse` is OK.

_Code sample not included: ~/snippets/csharp/System.Net/HttpWebResponse/StatusCode/httpwebresponse_statuscode_statusdescription.cs._

## HttpWebResponse.StatusDescription property

```csharp
public virtual string StatusDescription { get; }
```

Gets the status description returned with the response.

Returns: A string that describes the status of the response.

Exceptions:

- `ObjectDisposedException`: The current instance has been disposed.

#### Remarks
A common status message is OK.

#### Examples
The following example uses `HttpWebResponse.StatusDescription` to verify that the status of the `HttpWebResponse` is OK.

_Code sample not included: ~/snippets/csharp/System.Net/HttpWebResponse/StatusCode/httpwebresponse_statuscode_statusdescription.cs._

## HttpWebResponse.SupportsHeaders property

```csharp
public override bool SupportsHeaders { get; }
```

Gets a value that indicates whether headers are supported.

Returns: `true` if headers are supported; otherwise, `false`. Always returns `true`.
