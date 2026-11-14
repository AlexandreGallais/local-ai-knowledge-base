---
title: "HttpContentHeaders class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http.Headers/HttpContentHeaders.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpContentHeaders class

Namespace: `System.Net.Http.Headers`

```csharp
public sealed class HttpContentHeaders : System.Net.Http.Headers.HttpHeaders
```

Represents the collection of Content Headers as defined in RFC 2616.

To be added.

## HttpContentHeaders.Allow property

```csharp
public System.Collections.Generic.ICollection<string> Allow { get; }
```

Gets the value of the `Allow` content header on an HTTP response.

Returns: The value of the `Allow` header on an HTTP response.

To be added.

## HttpContentHeaders.ContentDisposition property

```csharp
public System.Net.Http.Headers.ContentDispositionHeaderValue? ContentDisposition { get; set; }
```

Gets the value of the `Content-Disposition` content header on an HTTP response.

Returns: The value of the `Content-Disposition` content header on an HTTP response.

To be added.

## HttpContentHeaders.ContentEncoding property

```csharp
public System.Collections.Generic.ICollection<string> ContentEncoding { get; }
```

Gets the value of the `Content-Encoding` content header on an HTTP response.

Returns: The value of the `Content-Encoding` content header on an HTTP response.

To be added.

## HttpContentHeaders.ContentLanguage property

```csharp
public System.Collections.Generic.ICollection<string> ContentLanguage { get; }
```

Gets the value of the `Content-Language` content header on an HTTP response.

Returns: The value of the `Content-Language` content header on an HTTP response.

To be added.

## HttpContentHeaders.ContentLength property

```csharp
public long? ContentLength { get; set; }
```

Gets or sets the value of the `Content-Length` content header on an HTTP response.

Returns: The value of the `Content-Length` content header on an HTTP response.

Exceptions:

- `ObjectDisposedException`: The value was never set and underlying `HttpContent` was disposed when trying to calculate it.

#### Remarks
If the header has not been set, its value may be computed on demand from buffered content or by using `HttpContent.TryComputeLength`.

## HttpContentHeaders.ContentLocation property

```csharp
public Uri? ContentLocation { get; set; }
```

Gets or sets the value of the `Content-Location` content header on an HTTP response.

Returns: The value of the `Content-Location` content header on an HTTP response.

To be added.

## HttpContentHeaders.ContentMD5 property

```csharp
public byte[]? ContentMD5 { get; set; }
```

Gets or sets the value of the `Content-MD5` content header on an HTTP response.

Returns: The value of the `Content-MD5` content header on an HTTP response.

Due to collision problems with MD5, Microsoft recommends a security model based on SHA-256 or better.

## HttpContentHeaders.ContentRange property

```csharp
public System.Net.Http.Headers.ContentRangeHeaderValue? ContentRange { get; set; }
```

Gets or sets the value of the `Content-Range` content header on an HTTP response.

Returns: The value of the `Content-Range` content header on an HTTP response.

To be added.

## HttpContentHeaders.ContentType property

```csharp
public System.Net.Http.Headers.MediaTypeHeaderValue? ContentType { get; set; }
```

Gets or sets the value of the `Content-Type` content header on an HTTP response.

Returns: The value of the `Content-Type` content header on an HTTP response.

To be added.

## HttpContentHeaders.Expires property

```csharp
public DateTimeOffset? Expires { get; set; }
```

Gets or sets the value of the `Expires` content header on an HTTP response.

Returns: The value of the `Expires` content header on an HTTP response.

To be added.

## HttpContentHeaders.LastModified property

```csharp
public DateTimeOffset? LastModified { get; set; }
```

Gets or sets the value of the `Last-Modified` content header on an HTTP response.

Returns: The value of the `Last-Modified` content header on an HTTP response.

To be added.
