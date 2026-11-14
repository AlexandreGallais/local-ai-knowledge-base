---
title: "HttpListenerRequest class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/HttpListenerRequest.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpListenerRequest class (part 2 of 2)

## HttpListenerRequest.RemoteEndPoint property

```csharp
public System.Net.IPEndPoint RemoteEndPoint { get; }
```

Gets the client IP address and port number from which the request originated.

Returns: An `IPEndPoint` that represents the IP address and port number from which the request originated.

#### Examples
The following code example demonstrates using this property.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListenerRequest.RequestTraceIdentifier property

```csharp
public Guid RequestTraceIdentifier { get; }
```

Gets the request identifier of the incoming HTTP request.

Returns: A `Guid` object that contains the identifier of the HTTP request.

To be added.

## HttpListenerRequest.ServiceName property

```csharp
public string? ServiceName { get; }
```

Gets the Service Provider Name (SPN) that the client sent on the request.

Returns: A `String` that contains the SPN the client sent on the request.

#### Remarks
An application could use the `ServiceName` property to perform custom Service Provide Name (SPN) validation.

## HttpListenerRequest.TransportContext property

```csharp
public System.Net.TransportContext TransportContext { get; }
```

Gets the `TransportContext` for the client request.

Returns: A `TransportContext` object for the client request.

#### Remarks
The `TransportContext` property can be used to retrieve the channel binding token (CBT) for an `HttpListenerRequest` that was sent using HTTPS.

An application could use the `TransportContext` property to perform custom authentication using calls to the native Win32 AcceptSecurityContext function.

If an application attempts to retrieve the channel binding token (CBT) from this `TransportContext` property using the `TransportContext.GetChannelBinding` method and the `ChannelBindingKind` is not `Endpoint`, then the `HttpListenerRequest` will throw `NotSupportedException`. The `HttpListenerRequest` overrides the `TransportContext.GetChannelBinding` method with an internal implementation.

## HttpListenerRequest.Url property

```csharp
public Uri? Url { get; }
```

Gets the `Uri` object requested by the client.

Returns: A `Uri` object that identifies the resource requested by the client.

#### Remarks
The `Url` property allows you to obtain all the information available from a `Uri` object. If you need to know only the raw text of the URI request, consider using the `RawUrl` property instead.

The `Url` property is null if the `Uri` from the client could not be parsed.

The `UnescapeRequestUrl` property indicates if `HttpListener` uses the raw unescaped URI instead of the converted URI where any percent-encoded values are converted and other normalization steps are taken.

When a `HttpListener` instance receives a request through the `http.sys` service, it creates an instance of the URI string provided by `http.sys`, and exposes it as the `Url` property.

The `http.sys` service exposes two request URI strings:

- Raw URI

- Converted URI

The raw URI is the `Uri` provided in the request line of a HTTP request:

`GET /path/`

`Host: www.contoso.com`

The raw URI provided by `http.sys` for the request mentioned above, is "/path/". This represents the string following the HTTP verb as it was sent over the network.

The `http.sys` service creates a converted URI from the information provided in the request using the URI provided in the HTTP request line and the Host header to determine the origin server the request should be forwarded to. This is done by comparing the information from the request with a set of registered URI prefixes. In order to be able to compare those values, some normalization to the request needs to be done. For the sample above the converted URI would be as follows:

`http://www.contoso.com/path/`

The `http.sys` service combines the `Host` property value and the string in the request line to create a converted URI. In addition, `http.sys` and the `Uri` class also do the following:

- Un-escapes all percent encoded values.

- Converts percent-encoded non-ASCII characters into a UTF-16 character representation. Note that UTF-8 and ANSI/DBCS characters are supported as well as Unicode characters (Unicode encoding using the %uXXXX format).

- Executes other normalization steps, like path compression.

Since the request doesn't contain any information about the encoding used for percent-encoded values, it may not be possible to determine the correct encoding just by parsing the percent-encoded values.

Therefore `http.sys` provides two registry keys for modifying the process:

|Registry Key|Default Value|Description|
|------------------|-------------------|-----------------|
|EnableNonUTF8|1|If zero, `http.sys` accepts only UTF-8-encoded URLs. If non-zero, `http.sys` also accepts ANSI-encoded or DBCS-encoded URLs in requests.|
|FavorUTF8|1|If non-zero, `http.sys` always tries to decode a URL as UTF-8 first; if that conversion fails and EnableNonUTF8 is non-zero, Http.sys then tries to decode it as ANSI or DBCS. If zero (and EnableNonUTF8 is non-zero), `http.sys` tries to decode it as ANSI or DBCS; if that is not successful, it tries a UTF-8 conversion.|

When `HttpListener` receives a request, it uses the converted URI from `http.sys` as input to the `Url` property.

There is a need for supporting characters besides characters and numbers in URIs. An example is the following URI, which is used to retrieve customer information for customer number "1/3812":

`http://www.contoso.com/Customer('1%2F3812')/`

Note the percent-encoded slash in the Uri (%2F). This is necessary, since in this case the slash character represents data and not a path delimiter.

Passing the string to Uri constructor will lead to the following URI:

`http://www.contoso.com/Customer('1/3812')/`

Splitting the path into its segments would result in the following elements:

`Customer('1`

`3812')`

This is not the intent of the sender of the request.

If the `UnescapeRequestUrl` property is set to false, then when the `HttpListener` receives a request, it uses the raw URI instead of the converted URI from `http.sys` as input to the `Url` property.

#### Examples
The following code example demonstrates using the `Url` property.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListenerRequest.UrlReferrer property

```csharp
public Uri? UrlReferrer { get; }
```

Gets the Uniform Resource Identifier (URI) of the resource that referred the client to the server.

Returns: A `Uri` object that contains the text of the request's `HttpRequestHeader.Referer` header, or `null` if the header was not included in the request.

#### Remarks
If a client has followed a hyperlink to the requested URI, its request might contain a `Referrer` header that identifies the URI of the resource that contained the hyperlink.

Clients can falsify or choose not to present a `Referer` header. Therefore, while the `UrlReferrer` property can be useful for identifying basic <example-value> in Web traffic; you should not use it as part of an authorization scheme to control access to data.

For a complete list of request headers, see the `HttpRequestHeader` enumeration.

The `HttpListenerRequest.UrlReferrer` is null when there is no `Referrer` header in the request or when the `Referrer` header is present in the request but does not parse to a valid `Uri`.

#### Examples
The following code example demonstrates using this property.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListenerRequest.UserAgent property

```csharp
public string? UserAgent { get; }
```

Gets the user agent presented by the client.

Returns: A `String` object that contains the text of the request's `User-Agent` header.

#### Remarks
The `User-Agent` header typically contains text that identifies the name and version number of the software used to generate the request.

For a complete list of request headers, see the `HttpRequestHeader` enumeration.

The `HttpListenerRequest.UserAgent` is null when there is no `User-Agent` header in the request.

#### Examples
The following code example demonstrates using this property.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListenerRequest.UserHostAddress property

```csharp
public string UserHostAddress { get; }
```

Gets the server IP address and port number to which the request is directed.

Returns: A `String` that contains the host address information.

#### Remarks
The information returned by this property is also available in the `LocalEndPoint` property value.

#### Examples
The following code example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListenerRequest.UserHostName property

```csharp
public string UserHostName { get; }
```

Gets the DNS name and, if provided, the port number specified by the client.

Returns: A `String` value that contains the text of the request's `Host` header.

#### Remarks
The `Host` header contains the requested server host name and port number, if specified, separated by a colon (for example, `www.contoso.com:8080`).

You can use this property to return different responses depending on the host name specified in the request.

For a complete list of request headers, see the `HttpRequestHeader` enumeration.

#### Examples
The following code example demonstrates using this property.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListenerRequest.UserLanguages property

```csharp
public string[]? UserLanguages { get; }
```

Gets the natural languages that are preferred for the response.

Returns: A `String` array that contains the languages specified in the request's `HttpRequestHeader.AcceptLanguage` header or `null` if the client request did not include an `HttpRequestHeader.AcceptLanguage` header.

#### Remarks
For a detailed description of the `Accept-Language` header, see RFC 2616 Section 14.4, available at https://www.rfc-editor.org.

For a complete list of request headers, see the `HttpRequestHeader` enumeration.

#### Examples
The following code example displays the languages from the request's `Accept-Language` header.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListenerRequest.BeginGetClientCertificate(AsyncCallback, Object) method

```csharp
public IAsyncResult BeginGetClientCertificate (AsyncCallback? requestCallback, object? state);
```

Begins an asynchronous request for the client's X.509 v.3 certificate.

Parameters:

- `requestCallback`: An `AsyncCallback` delegate that references the method to invoke when the operation is complete.
- `state`: A user-defined object that contains information about the operation. This object is passed to the callback delegate when the operation completes.

Returns: An `IAsyncResult` that indicates the status of the operation.

To be added.

## HttpListenerRequest.EndGetClientCertificate(IAsyncResult) method

```csharp
public System.Security.Cryptography.X509Certificates.X509Certificate2? EndGetClientCertificate (IAsyncResult asyncResult);
```

Ends an asynchronous request for the client's X.509 v.3 certificate.

Parameters:

- `asyncResult`: The pending request for the certificate.

Returns: The `IAsyncResult` object that is returned when the operation started.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.
- `ArgumentException`: `asyncResult` was not obtained by calling `HttpListenerRequest.BeginGetClientCertificate`.
- `InvalidOperationException`: This method was already called for the operation identified by `asyncResult`.

To be added.

## HttpListenerRequest.GetClientCertificate() method

```csharp
public System.Security.Cryptography.X509Certificates.X509Certificate2? GetClientCertificate ();
```

Retrieves the client's X.509 v.3 certificate.

Returns: A `X509Certificates` object that contains the client's X.509 v.3 certificate.

Exceptions:

- `InvalidOperationException`: A call to this method to retrieve the client's X.509 v.3 certificate is in progress and therefore another call to this method cannot be made.

#### Remarks
This method blocks until the certificate is retrieved.

## HttpListenerRequest.GetClientCertificateAsync() method

```csharp
public System.Threading.Tasks.Task<System.Security.Cryptography.X509Certificates.X509Certificate2?> GetClientCertificateAsync ();
```

Retrieves the client's X.509 v.3 certificate as an asynchronous operation.

Returns: The task object representing the asynchronous operation. The `Task<T>.Result` property on the task object returns a `X509Certificates` object that contains the client's X.509 v.3 certificate.

#### Remarks
This operation will not block. The returned `Task<T>` object will complete when the certificate has been retrieved.

If a call to this method to retrieve the client's X.509 v.3 certificate is in progress, then another call to this method cannot be made.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `GetClientCertificate`.
