---
title: "HttpRequestHeaders class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http.Headers/HttpRequestHeaders.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpRequestHeaders class

Namespace: `System.Net.Http.Headers`

```csharp
public sealed class HttpRequestHeaders : System.Net.Http.Headers.HttpHeaders
```

Represents the collection of Request Headers as defined in RFC 2616.

#### Remarks
This type is derived from `HttpHeaders`.

## HttpRequestHeaders.Accept property

```csharp
public System.Net.Http.Headers.HttpHeaderValueCollection<System.Net.Http.Headers.MediaTypeWithQualityHeaderValue> Accept { get; }
```

Gets the value of the `Accept` header for an HTTP request.

Returns: The value of the `Accept` header for an HTTP request.

To be added.

## HttpRequestHeaders.AcceptCharset property

```csharp
public System.Net.Http.Headers.HttpHeaderValueCollection<System.Net.Http.Headers.StringWithQualityHeaderValue> AcceptCharset { get; }
```

Gets the value of the `Accept-Charset` header for an HTTP request.

Returns: The value of the `Accept-Charset` header for an HTTP request.

To be added.

## HttpRequestHeaders.AcceptEncoding property

```csharp
public System.Net.Http.Headers.HttpHeaderValueCollection<System.Net.Http.Headers.StringWithQualityHeaderValue> AcceptEncoding { get; }
```

Gets the value of the `Accept-Encoding` header for an HTTP request.

Returns: The value of the `Accept-Encoding` header for an HTTP request.

To be added.

## HttpRequestHeaders.AcceptLanguage property

```csharp
public System.Net.Http.Headers.HttpHeaderValueCollection<System.Net.Http.Headers.StringWithQualityHeaderValue> AcceptLanguage { get; }
```

Gets the value of the `Accept-Language` header for an HTTP request.

Returns: The value of the `Accept-Language` header for an HTTP request.

To be added.

## HttpRequestHeaders.Authorization property

```csharp
public System.Net.Http.Headers.AuthenticationHeaderValue? Authorization { get; set; }
```

Gets or sets the value of the `Authorization` header for an HTTP request.

Returns: The value of the `Authorization` header for an HTTP request.

To be added.

## HttpRequestHeaders.CacheControl property

```csharp
public System.Net.Http.Headers.CacheControlHeaderValue? CacheControl { get; set; }
```

Gets or sets the value of the `Cache-Control` header for an HTTP request.

Returns: The value of the `Cache-Control` header for an HTTP request.

To be added.

## HttpRequestHeaders.Connection property

```csharp
public System.Net.Http.Headers.HttpHeaderValueCollection<string> Connection { get; }
```

Gets the value of the `Connection` header for an HTTP request.

Returns: The value of the `Connection` header for an HTTP request.

To be added.

## HttpRequestHeaders.ConnectionClose property

```csharp
public bool? ConnectionClose { get; set; }
```

Gets or sets a value that indicates if the `Connection` header for an HTTP request contains Close.

Returns: `true` if the `Connection` header contains Close, otherwise `false`.

To be added.

## HttpRequestHeaders.Date property

```csharp
public DateTimeOffset? Date { get; set; }
```

Gets or sets the value of the `Date` header for an HTTP request.

Returns: The value of the `Date` header for an HTTP request.

To be added.

## HttpRequestHeaders.Expect property

```csharp
public System.Net.Http.Headers.HttpHeaderValueCollection<System.Net.Http.Headers.NameValueWithParametersHeaderValue> Expect { get; }
```

Gets the value of the `Expect` header for an HTTP request.

Returns: The value of the `Expect` header for an HTTP request.

To be added.

## HttpRequestHeaders.ExpectContinue property

```csharp
public bool? ExpectContinue { get; set; }
```

Gets or sets a value that indicates if the `Expect` header for an HTTP request contains Continue.

Returns: `true` if the `Expect` header contains Continue, otherwise `false`.

To be added.

## HttpRequestHeaders.From property

```csharp
public string? From { get; set; }
```

Gets or sets the value of the `From` header for an HTTP request.

Returns: The value of the `From` header for an HTTP request.

To be added.

## HttpRequestHeaders.Host property

```csharp
public string? Host { get; set; }
```

Gets or sets the value of the `Host` header for an HTTP request.

Returns: The value of the `Host` header for an HTTP request.

To be added.

## HttpRequestHeaders.IfMatch property

```csharp
public System.Net.Http.Headers.HttpHeaderValueCollection<System.Net.Http.Headers.EntityTagHeaderValue> IfMatch { get; }
```

Gets the value of the `If-Match` header for an HTTP request.

Returns: Returns `HttpHeaderValueCollection<T>`.

The value of the `If-Match` header for an HTTP request.

To be added.

## HttpRequestHeaders.IfModifiedSince property

```csharp
public DateTimeOffset? IfModifiedSince { get; set; }
```

Gets or sets the value of the `If-Modified-Since` header for an HTTP request.

Returns: The value of the `If-Modified-Since` header for an HTTP request.

To be added.

## HttpRequestHeaders.IfNoneMatch property

```csharp
public System.Net.Http.Headers.HttpHeaderValueCollection<System.Net.Http.Headers.EntityTagHeaderValue> IfNoneMatch { get; }
```

Gets the value of the `If-None-Match` header for an HTTP request.

Returns: Gets the value of the `If-None-Match` header for an HTTP request.

To be added.

## HttpRequestHeaders.IfRange property

```csharp
public System.Net.Http.Headers.RangeConditionHeaderValue? IfRange { get; set; }
```

Gets or sets the value of the `If-Range` header for an HTTP request.

Returns: The value of the `If-Range` header for an HTTP request.

To be added.

## HttpRequestHeaders.IfUnmodifiedSince property

```csharp
public DateTimeOffset? IfUnmodifiedSince { get; set; }
```

Gets or sets the value of the `If-Unmodified-Since` header for an HTTP request.

Returns: The value of the `If-Unmodified-Since` header for an HTTP request.

To be added.

## HttpRequestHeaders.MaxForwards property

```csharp
public int? MaxForwards { get; set; }
```

Gets or sets the value of the `Max-Forwards` header for an HTTP request.

Returns: The value of the `Max-Forwards` header for an HTTP request.

To be added.

## HttpRequestHeaders.Pragma property

```csharp
public System.Net.Http.Headers.HttpHeaderValueCollection<System.Net.Http.Headers.NameValueHeaderValue> Pragma { get; }
```

Gets the value of the `Pragma` header for an HTTP request.

Returns: The value of the `Pragma` header for an HTTP request.

To be added.

## HttpRequestHeaders.Protocol property

```csharp
public string? Protocol { get; set; }
```

Gets or sets the value of the `:protocol` pseudo-header for an HTTP request.

Returns: The value of the `:protocol` pseudo-header for an HTTP request.

To be added.

## HttpRequestHeaders.ProxyAuthorization property

```csharp
public System.Net.Http.Headers.AuthenticationHeaderValue? ProxyAuthorization { get; set; }
```

Gets or sets the value of the `Proxy-Authorization` header for an HTTP request.

Returns: The value of the `Proxy-Authorization` header for an HTTP request.

To be added.

## HttpRequestHeaders.Range property

```csharp
public System.Net.Http.Headers.RangeHeaderValue? Range { get; set; }
```

Gets or sets the value of the `Range` header for an HTTP request.

Returns: The value of the `Range` header for an HTTP request.

To be added.

## HttpRequestHeaders.Referrer property

```csharp
public Uri? Referrer { get; set; }
```

Gets or sets the value of the `Referer` header for an HTTP request.

Returns: The value of the `Referer` header for an HTTP request.

To be added.

## HttpRequestHeaders.TE property

```csharp
public System.Net.Http.Headers.HttpHeaderValueCollection<System.Net.Http.Headers.TransferCodingWithQualityHeaderValue> TE { get; }
```

Gets the value of the `TE` header for an HTTP request.

Returns: The value of the `TE` header for an HTTP request.

To be added.

## HttpRequestHeaders.Trailer property

```csharp
public System.Net.Http.Headers.HttpHeaderValueCollection<string> Trailer { get; }
```

Gets the value of the `Trailer` header for an HTTP request.

Returns: The value of the `Trailer` header for an HTTP request.

To be added.

## HttpRequestHeaders.TransferEncoding property

```csharp
public System.Net.Http.Headers.HttpHeaderValueCollection<System.Net.Http.Headers.TransferCodingHeaderValue> TransferEncoding { get; }
```

Gets the value of the `Transfer-Encoding` header for an HTTP request.

Returns: The value of the `Transfer-Encoding` header for an HTTP request.

To be added.

## HttpRequestHeaders.TransferEncodingChunked property

```csharp
public bool? TransferEncodingChunked { get; set; }
```

Gets or sets a value that indicates if the `Transfer-Encoding` header for an HTTP request contains chunked.

Returns: `true` if the `Transfer-Encoding` header contains chunked, otherwise `false`.

To be added.

## HttpRequestHeaders.Upgrade property

```csharp
public System.Net.Http.Headers.HttpHeaderValueCollection<System.Net.Http.Headers.ProductHeaderValue> Upgrade { get; }
```

Gets the value of the `Upgrade` header for an HTTP request.

Returns: The value of the `Upgrade` header for an HTTP request.

To be added.

## HttpRequestHeaders.UserAgent property

```csharp
public System.Net.Http.Headers.HttpHeaderValueCollection<System.Net.Http.Headers.ProductInfoHeaderValue> UserAgent { get; }
```

Gets the value of the `User-Agent` header for an HTTP request.

Returns: The value of the `User-Agent` header for an HTTP request.

To be added.

## HttpRequestHeaders.Via property

```csharp
public System.Net.Http.Headers.HttpHeaderValueCollection<System.Net.Http.Headers.ViaHeaderValue> Via { get; }
```

Gets the value of the `Via` header for an HTTP request.

Returns: The value of the `Via` header for an HTTP request.

To be added.

## HttpRequestHeaders.Warning property

```csharp
public System.Net.Http.Headers.HttpHeaderValueCollection<System.Net.Http.Headers.WarningHeaderValue> Warning { get; }
```

Gets the value of the `Warning` header for an HTTP request.

Returns: The value of the `Warning` header for an HTTP request.

To be added.
