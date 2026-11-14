---
title: "HttpListenerResponse class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/HttpListenerResponse.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpListenerResponse class

Namespace: `System.Net`

```csharp
public sealed class HttpListenerResponse : IDisposable
```

Represents a response to a request being handled by an `HttpListener` object.

#### Remarks

When a client makes a request for a resource handled by an `HttpListener` object, the request and response are made available to your application in an `HttpListenerContext` object. The request is represented by an `HttpListenerRequest` object and is available in the `Request` property. The response is represented by an `HttpListenerResponse` object and is available in the `Response` property.

You can customize the response by setting various properties, such as `HttpListenerResponse.StatusCode`, `HttpListenerResponse.StatusDescription`, and `HttpListenerResponse.Cookies`. Use the `OutputStream` property to obtain a `Stream` instance to which response data can be written. Finally, send the response data to the client by calling the `HttpListenerResponse.Close` method.

## HttpListenerResponse.ContentEncoding property

```csharp
public System.Text.Encoding? ContentEncoding { get; set; }
```

Gets or sets the `Encoding` for this response's `HttpListenerResponse.OutputStream`.

Returns: An `Encoding` object suitable for use with the data in the `HttpListenerResponse.OutputStream` property, or `null` if no encoding is specified.

#### Remarks
An `Encoding` object can be used to convert byte sequences into character sets (code pages) and characters into byte sequences.

#### Examples
The following code example demonstrates using this property.

_Code sample not included: ~/snippets/csharp/System.Net/AuthenticationSchemes/Overview/sample.cs._

## HttpListenerResponse.ContentLength64 property

```csharp
public long ContentLength64 { get; set; }
```

Gets or sets the number of bytes in the body data included in the response.

Returns: The value of the response's `Content-Length` header.

Exceptions:

- `ArgumentOutOfRangeException`: The value specified for a set operation is less than zero.
- `InvalidOperationException`: The response is already being sent.
- `ObjectDisposedException`: This object is closed.

#### Remarks
The `Content-Length` header expresses the length, in bytes, of the response's body data. When using a format that does not send the data chunked or raw, you must set the `ContentLength64` property. If you do not, the `HttpListener` does not send the response data.

For a complete list of response headers, see the `HttpResponseHeader` enumeration.

#### Examples
The following code example demonstrates setting the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListenerResponse.ContentType property

```csharp
public string? ContentType { get; set; }
```

Gets or sets the MIME type of the content returned.

Returns: A `String` instance that contains the text of the response's `Content-Type` header.

Exceptions:

- `ArgumentNullException`: The value specified for a set operation is `null`.
- `ArgumentException`: The value specified for a set operation is an empty string ("").
- `ObjectDisposedException`: This object is closed.

#### Remarks
When communicating with a Web browser, you should explicitly set this property when returning any content type other than `text/html`.

For a complete list of response headers, see the `HttpResponseHeader` enumeration.

## HttpListenerResponse.Cookies property

```csharp
public System.Net.CookieCollection Cookies { get; set; }
```

Gets or sets the collection of cookies returned with the response.

Returns: A `CookieCollection` that contains cookies to accompany the response. The collection is empty if no cookies have been added to the response.

#### Remarks
A cookie is name/value text data from a Web server that is stored on the local (client) computer. The following cookie formats are supported: Netscape, RFC 2109, and RFC 2965.

#### Examples
The following code example checks a request for a cookie, and returns a new cookie with the response if the request did not have one.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListenerResponse.Headers property

```csharp
public System.Net.WebHeaderCollection Headers { get; set; }
```

Gets or sets the collection of header name/value pairs returned by the server.

Returns: A `WebHeaderCollection` instance that contains all the explicitly set HTTP headers to be included in the response.

Exceptions:

- `InvalidOperationException`: The `WebHeaderCollection` instance specified for a set operation is not valid for a response.

#### Remarks
Response headers contain metadata information such as the date and time of the response, the identity of the responding server, and the MIME type of the data contained in the response body.

For a complete list of response headers, see the `HttpResponseHeader` enumeration.

> **Note:**
> If you attempt to set a Content-Length, Keep-Alive, Transfer-Encoding, or WWW-Authenticate header using the Headers property, an exception will be thrown. Use the `HttpListenerResponse.KeepAlive` or `HttpListenerResponse.ContentLength64` properties to set these headers. You cannot set the Transfer-Encoding or WWW-Authenticate headers manually.

#### Examples
The following code example demonstrates displaying the headers in a `WebHeaderCollection`.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListenerResponse.KeepAlive property

```csharp
public bool KeepAlive { get; set; }
```

Gets or sets a value indicating whether the server requests a persistent connection.

Returns: `true` if the server requests a persistent connection; otherwise, `false`. The default is `true`.

Exceptions:

- `ObjectDisposedException`: This object is closed.

#### Remarks
If an HTTP client and server expect to exchange data multiple times in a short period, a persistent connection speeds up their communications by allowing them to avoid the overhead required to open and close a TCP connection for each message. Persistent connections are in widespread use in communications between modern Web browsers and Web servers.

Persistent connections are described in detail in the HTTP/1.1 protocol specification (RFC 2616) available at the RTF Editor Web site (https://www.rfc-editor.org/).

#### Examples
The following code example demonstrates setting the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net/AuthenticationSchemes/Overview/sample.cs._

## HttpListenerResponse.OutputStream property

```csharp
public System.IO.Stream OutputStream { get; }
```

Gets a `Stream` object to which a response can be written.

Returns: A `Stream` object to which a response can be written.

Exceptions:

- `ObjectDisposedException`: This object is closed.

#### Remarks
The `ContentLength64` property must be set explicitly before writing to the returned `Stream` object.

> **Note:**
> Closing the request does not close the stream returned by this property. When you no longer need the stream, you should close it by calling the Close method.

#### Examples
The following code example demonstrates calling this method.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListenerResponse.ProtocolVersion property

```csharp
public Version ProtocolVersion { get; set; }
```

Gets or sets the HTTP version used for the response.

Returns: A `Version` object indicating the version of HTTP used when responding to the client. Note that this property is now obsolete.

Exceptions:

- `ArgumentNullException`: The value specified for a set operation is `null`.
- `ArgumentException`: The value specified for a set operation does not have its `Version.Major` property set to 1 or does not have its `Version.Minor` property set to either 0 or 1.
- `ObjectDisposedException`: This object is closed.

#### Remarks
The capabilities of different HTTP versions are specified in the documents available at https://www.ietf.org.

#### Examples
The following code example demonstrates setting the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net/AuthenticationSchemes/Overview/sample.cs._

## HttpListenerResponse.RedirectLocation property

```csharp
public string? RedirectLocation { get; set; }
```

Gets or sets the value of the HTTP `Location` header in this response.

Returns: A `String` that contains the absolute URL to be sent to the client in the `Location` header.

Exceptions:

- `ArgumentException`: The value specified for a set operation is an empty string ("").
- `ObjectDisposedException`: This object is closed.

#### Remarks
The `Location` header specifies the URL to which the client is directed to locate a requested resource.

> **Note:**
> Setting this property does not automatically set the `StatusCode` property.

#### Examples
The following code example demonstrates setting this property.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListenerResponse.SendChunked property

```csharp
public bool SendChunked { get; set; }
```

Gets or sets whether the response uses chunked transfer encoding.

Returns: `true` if the response is set to use chunked transfer encoding; otherwise, `false`. The default is `false`.

#### Remarks
The body of a chunked message is made up of a series of chunks. Each chunk comprises of two parts - the size of the chunk data and the actual data. When set to true the response is sent using chunked transfer encoding.

## HttpListenerResponse.StatusCode property

```csharp
public int StatusCode { get; set; }
```

Gets or sets the HTTP status code to be returned to the client.

Returns: An `Int32` value that specifies the HTTP status code for the requested resource. The default is `HttpStatusCode.OK`, indicating that the server successfully processed the client's request and included the requested resource in the response body.

Exceptions:

- `ObjectDisposedException`: This object is closed.
- `ProtocolViolationException`: The value specified for a set operation is not valid. Valid values are between 100 and 999 inclusive.

#### Remarks
Clients use the status code returned by the server to decide how to proceed. A value of `OK` indicates that the server successfully processed the client's request and included the requested resource in the response body. Other common status codes include `NotFound`, indicating that the requested resource was not found on the server, and `NotModified`, indicating that it was unnecessary to return the requested resource in the response body because the client's cached copy of the resource is up-to-date.

For a complete list of possible status codes, see the `HttpStatusCode` enumeration.

#### Examples
The following code example demonstrates setting the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net/AuthenticationSchemes/Overview/sample.cs._

## HttpListenerResponse.StatusDescription property

```csharp
public string StatusDescription { get; set; }
```

Gets or sets a text description of the HTTP status code returned to the client.

Returns: The text description of the HTTP status code returned to the client. The default is the RFC 2616 description for the `HttpListenerResponse.StatusCode` property value, or an empty string ("") if an RFC 2616 description does not exist.

Exceptions:

- `ArgumentNullException`: The value specified for a set operation is `null`.
- `ArgumentException`: The value specified for a set operation contains non-printable characters.

#### Remarks
The status description typically provides details that explain the `HttpListenerResponse.StatusCode` value.

#### Examples
The following code example demonstrates setting the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net/AuthenticationSchemes/Overview/sample.cs._

## HttpListenerResponse.Abort() method

```csharp
public void Abort ();
```

Closes the connection to the client without sending a response.

#### Remarks
Calling this method on an object that has already been closed has no effect. If the response has not already been closed, this method closes it and the associated `HttpListenerRequest` and `HttpListenerContext` objects. The connection to the client is also closed, regardless of the `KeepAlive` property value of the client request.

## HttpListenerResponse.AddHeader(String, String) method

```csharp
public void AddHeader (string name, string value);
```

Adds the specified header and value to the HTTP headers for this response.

Parameters:

- `name`: The name of the HTTP header to set.
- `value`: The value for the `name` header.

Exceptions:

- `ArgumentNullException`: `name` is `null` or an empty string ("").
- `ArgumentException`: You are not allowed to specify a value for the specified header.

-or-

`name` or `value` contains invalid characters.

#### Remarks
Calling this method is equivalent to calling the `WebHeaderCollection.Set` method on the collection returned by the `Headers` property.

If the header specified in `name` does not exist, this method inserts a new header into the `Headers` property's collection. If `name` is present in the collection, this method replaces the existing value with `value`. To add a value to an existing header without replacing the existing value, use the `HttpListenerResponse.AppendHeader` method.

#### Examples
The following code example demonstrates adding a header using this property.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListenerResponse.AppendCookie(Cookie) method

```csharp
public void AppendCookie (System.Net.Cookie cookie);
```

Adds the specified `Cookie` to the collection of cookies for this response.

Parameters:

- `cookie`: The `Cookie` to add to the collection to be sent with this response.

Exceptions:

- `ArgumentNullException`: `cookie` is `null`.

#### Remarks
Calling this method is equivalent to calling the `CookieCollection.Add` method on the collection returned by the `Cookies` property.

If the specified cookie does not exist in the `Cookies` property's collection, `cookie` is added. If the cookie exists in the collection, `cookie` replaces it.

#### Examples
The following code example demonstrates adding a cookie to a response

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._
