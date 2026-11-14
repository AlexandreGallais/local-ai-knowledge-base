---
title: "HttpResponseHeaders class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http.Headers/HttpResponseHeaders.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpResponseHeaders class

Namespace: `System.Net.Http.Headers`

```csharp
public sealed class HttpResponseHeaders : System.Net.Http.Headers.HttpHeaders
```

Represents the collection of Response Headers as defined in RFC 2616.

#### Remarks
This type is derived from `HttpHeaders`.

## HttpResponseHeaders.AcceptRanges property

```csharp
public System.Net.Http.Headers.HttpHeaderValueCollection<string> AcceptRanges { get; }
```

Gets the value of the `Accept-Ranges` header for an HTTP response.

Returns: The value of the `Accept-Ranges` header for an HTTP response.

To be added.

## HttpResponseHeaders.Age property

```csharp
public TimeSpan? Age { get; set; }
```

Gets or sets the value of the `Age` header for an HTTP response.

Returns: The value of the `Age` header for an HTTP response.

To be added.

## HttpResponseHeaders.CacheControl property

```csharp
public System.Net.Http.Headers.CacheControlHeaderValue? CacheControl { get; set; }
```

Gets or sets the value of the `Cache-Control` header for an HTTP response.

Returns: The value of the `Cache-Control` header for an HTTP response.

To be added.

## HttpResponseHeaders.Connection property

```csharp
public System.Net.Http.Headers.HttpHeaderValueCollection<string> Connection { get; }
```

Gets the value of the `Connection` header for an HTTP response.

Returns: The value of the `Connection` header for an HTTP response.

To be added.

## HttpResponseHeaders.ConnectionClose property

```csharp
public bool? ConnectionClose { get; set; }
```

Gets or sets a value that indicates if the `Connection` header for an HTTP response contains Close.

Returns: `true` if the `Connection` header contains Close, otherwise `false`.

To be added.

## HttpResponseHeaders.Date property

```csharp
public DateTimeOffset? Date { get; set; }
```

Gets or sets the value of the `Date` header for an HTTP response.

Returns: The value of the `Date` header for an HTTP response.

To be added.

## HttpResponseHeaders.ETag property

```csharp
public System.Net.Http.Headers.EntityTagHeaderValue? ETag { get; set; }
```

Gets or sets the value of the `ETag` header for an HTTP response.

Returns: The value of the `ETag` header for an HTTP response.

To be added.

## HttpResponseHeaders.Location property

```csharp
public Uri? Location { get; set; }
```

Gets or sets the value of the `Location` header for an HTTP response.

Returns: The value of the `Location` header for an HTTP response.

To be added.

## HttpResponseHeaders.Pragma property

```csharp
public System.Net.Http.Headers.HttpHeaderValueCollection<System.Net.Http.Headers.NameValueHeaderValue> Pragma { get; }
```

Gets the value of the `Pragma` header for an HTTP response.

Returns: Returns `HttpHeaderValueCollection<T>`.

The value of the `Pragma` header for an HTTP response.

To be added.

## HttpResponseHeaders.ProxyAuthenticate property

```csharp
public System.Net.Http.Headers.HttpHeaderValueCollection<System.Net.Http.Headers.AuthenticationHeaderValue> ProxyAuthenticate { get; }
```

Gets the value of the `Proxy-Authenticate` header for an HTTP response.

Returns: The value of the `Proxy-Authenticate` header for an HTTP response.

To be added.

## HttpResponseHeaders.RetryAfter property

```csharp
public System.Net.Http.Headers.RetryConditionHeaderValue? RetryAfter { get; set; }
```

Gets or sets the value of the `Retry-After` header for an HTTP response.

Returns: The value of the `Retry-After` header for an HTTP response.

To be added.

## HttpResponseHeaders.Server property

```csharp
public System.Net.Http.Headers.HttpHeaderValueCollection<System.Net.Http.Headers.ProductInfoHeaderValue> Server { get; }
```

Gets the value of the `Server` header for an HTTP response.

Returns: The value of the `Server` header for an HTTP response.

To be added.

## HttpResponseHeaders.Trailer property

```csharp
public System.Net.Http.Headers.HttpHeaderValueCollection<string> Trailer { get; }
```

Gets the value of the `Trailer` header for an HTTP response.

Returns: The value of the `Trailer` header for an HTTP response.

To be added.

## HttpResponseHeaders.TransferEncoding property

```csharp
public System.Net.Http.Headers.HttpHeaderValueCollection<System.Net.Http.Headers.TransferCodingHeaderValue> TransferEncoding { get; }
```

Gets the value of the `Transfer-Encoding` header for an HTTP response.

Returns: The value of the `Transfer-Encoding` header for an HTTP response.

To be added.

## HttpResponseHeaders.TransferEncodingChunked property

```csharp
public bool? TransferEncodingChunked { get; set; }
```

Gets or sets a value that indicates if the `Transfer-Encoding` header for an HTTP response contains chunked.

Returns: `true` if the `Transfer-Encoding` header contains chunked, otherwise `false`.

To be added.

## HttpResponseHeaders.Upgrade property

```csharp
public System.Net.Http.Headers.HttpHeaderValueCollection<System.Net.Http.Headers.ProductHeaderValue> Upgrade { get; }
```

Gets the value of the `Upgrade` header for an HTTP response.

Returns: The value of the `Upgrade` header for an HTTP response.

To be added.

## HttpResponseHeaders.Vary property

```csharp
public System.Net.Http.Headers.HttpHeaderValueCollection<string> Vary { get; }
```

Gets the value of the `Vary` header for an HTTP response.

Returns: The value of the `Vary` header for an HTTP response.

To be added.

## HttpResponseHeaders.Via property

```csharp
public System.Net.Http.Headers.HttpHeaderValueCollection<System.Net.Http.Headers.ViaHeaderValue> Via { get; }
```

Gets the value of the `Via` header for an HTTP response.

Returns: The value of the `Via` header for an HTTP response.

To be added.

## HttpResponseHeaders.Warning property

```csharp
public System.Net.Http.Headers.HttpHeaderValueCollection<System.Net.Http.Headers.WarningHeaderValue> Warning { get; }
```

Gets the value of the `Warning` header for an HTTP response.

Returns: The value of the `Warning` header for an HTTP response.

To be added.

## HttpResponseHeaders.WwwAuthenticate property

```csharp
public System.Net.Http.Headers.HttpHeaderValueCollection<System.Net.Http.Headers.AuthenticationHeaderValue> WwwAuthenticate { get; }
```

Gets the value of the `WWW-Authenticate` header for an HTTP response.

Returns: The value of the `WWW-Authenticate` header for an HTTP response.

To be added.
