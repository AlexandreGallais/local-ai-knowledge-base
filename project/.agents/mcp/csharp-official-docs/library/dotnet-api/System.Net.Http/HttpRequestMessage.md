---
title: "HttpRequestMessage class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http/HttpRequestMessage.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpRequestMessage class

Namespace: `System.Net.Http`

```csharp
public class HttpRequestMessage : IDisposable
```

Represents a HTTP request message.

#### Remarks
The `HttpRequestMessage` class contains headers, the HTTP verb, and potentially data.

An `HttpRequestMessage` instance should not be modified and/or reused after being sent.

## HttpRequestMessage.HttpRequestMessage() constructor

```csharp
public HttpRequestMessage ();
```

Initializes a new instance of the `HttpRequestMessage` class.

To be added.

## HttpRequestMessage.HttpRequestMessage(HttpMethod, String) constructor

```csharp
public HttpRequestMessage (System.Net.Http.HttpMethod method, string? requestUri);
```

Initializes a new instance of the `HttpRequestMessage` class with an HTTP method and a request `Uri`.

Parameters:

- `method`: The HTTP method.
- `requestUri`: A string that represents the request  `Uri`.

To be added.

## HttpRequestMessage.HttpRequestMessage(HttpMethod, Uri) constructor

```csharp
public HttpRequestMessage (System.Net.Http.HttpMethod method, Uri? requestUri);
```

Initializes a new instance of the `HttpRequestMessage` class with an HTTP method and a request `Uri`.

Parameters:

- `method`: The HTTP method.
- `requestUri`: The `Uri` to request.

To be added.

## HttpRequestMessage.ConnectionId property

```csharp
public long? ConnectionId { get; set; }
```

To be added.

Returns: To be added.

To be added.

## HttpRequestMessage.Content property

```csharp
public System.Net.Http.HttpContent? Content { get; set; }
```

Gets or sets the contents of the HTTP message.

Returns: The content of a message.

#### Remarks
The contents of an HTTP message corresponds to the entity body defined in RFC 2616.

A number of classes can be used for HTTP content. These include the following.

1.  `ByteArrayContent` - HTTP content based on a byte array.

2.  `FormUrlEncodedContent` - HTTP content of name/value tuples encoded using application/x-www-form-urlencoded MIME type.

3.  `MultipartContent` - HTTP content that gets serialized using the multipart/* content type specification.

4.  `MultipartFormDataContent` - HTTP content encoded using the multipart/form-data MIME type.

5.  `StreamContent` - HTTP content based on a stream.

6.  `StringContent` - HTTP content based on a string.

## HttpRequestMessage.Headers property

```csharp
public System.Net.Http.Headers.HttpRequestHeaders Headers { get; }
```

Gets the collection of HTTP request headers.

Returns: The collection of HTTP request headers.

To be added.

## HttpRequestMessage.Method property

```csharp
public System.Net.Http.HttpMethod Method { get; set; }
```

Gets or sets the HTTP method used by the HTTP request message.

Returns: The HTTP method used by the request message. The default is the GET method.

To be added.

## HttpRequestMessage.Options property

```csharp
public System.Net.Http.HttpRequestOptions Options { get; }
```

Gets the collection of options to configure the HTTP request.

Returns: To be added.

To be added.

## HttpRequestMessage.Properties property

```csharp
public System.Collections.Generic.IDictionary<string,object?> Properties { get; }
```

Gets a set of properties for the HTTP request.

Returns: Returns `IDictionary<T1,T2>`.

To be added.

## HttpRequestMessage.RequestUri property

```csharp
public Uri? RequestUri { get; set; }
```

Gets or sets the `Uri` used for the HTTP request.

Returns: The `Uri` used for the HTTP request.

If the request `Uri` is a relative URI, it will be combined with the `HttpClient.BaseAddress`.

## HttpRequestMessage.Version property

```csharp
public Version Version { get; set; }
```

Gets or sets the HTTP message version.

Returns: The HTTP message version. The default value is `1.1`.

To be added.

## HttpRequestMessage.VersionPolicy property

```csharp
public System.Net.Http.HttpVersionPolicy VersionPolicy { get; set; }
```

Gets or sets the policy that determines how `Version` is interpreted and how the final HTTP version is negotiated with the server.

Returns: The HttpVersionPolicy used when the HTTP connection is established.

To be added.

## HttpRequestMessage.Dispose() method

```csharp
public void Dispose ();
```

Releases the unmanaged resources and disposes of the managed resources used by the `HttpRequestMessage`.

To be added.

## HttpRequestMessage.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `HttpRequestMessage` and optionally disposes of the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to releases only unmanaged resources.

#### Remarks
This method is called by the public `Dispose()` method and the `Finalize` method, if it has been overridden. `Dispose()` invokes this method with the `disposing` parameter set to `true`. `Finalize` invokes this method with `disposing` set to `false`.

When the `disposing` parameter is `true`, this method releases all resources held by any managed objects that this `HttpRequestMessage` references. This method invokes the `Dispose()` method of each referenced object.

## HttpRequestMessage.ToString() method

```csharp
public override string ToString ();
```

Returns a string that represents the current object.

Returns: A string representation of the current object.

To be added.
