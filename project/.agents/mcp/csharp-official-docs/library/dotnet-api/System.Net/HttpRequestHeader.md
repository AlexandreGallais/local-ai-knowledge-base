---
title: "HttpRequestHeader enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/HttpRequestHeader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpRequestHeader enum

Namespace: `System.Net`

```csharp
public enum HttpRequestHeader
```

The HTTP headers that may be specified in a client request.

#### Remarks
The appropriate contents of various headers are described in detail in the HTTP/1.1 specification, available at rfc2616.

## HttpRequestHeader.Accept field

```csharp
Accept
```

The Accept header, which specifies the MIME types that are acceptable for the response.

## HttpRequestHeader.AcceptCharset field

```csharp
AcceptCharset
```

The Accept-Charset header, which specifies the character sets that are acceptable for the response.

## HttpRequestHeader.AcceptEncoding field

```csharp
AcceptEncoding
```

The Accept-Encoding header, which specifies the content encodings that are acceptable for the response.

## HttpRequestHeader.AcceptLanguage field

```csharp
AcceptLanguage
```

The Accept-Language header, which specifies that natural languages that are preferred for the response.

## HttpRequestHeader.Allow field

```csharp
Allow
```

The Allow header, which specifies the set of HTTP methods supported.

## HttpRequestHeader.Authorization field

```csharp
Authorization
```

The Authorization header, which specifies the credentials that the client presents in order to authenticate itself to the server.

## HttpRequestHeader.CacheControl field

```csharp
CacheControl
```

The Cache-Control header, which specifies directives that must be obeyed by all cache control mechanisms along the request/response chain.

## HttpRequestHeader.Connection field

```csharp
Connection
```

The Connection header, which specifies options that are desired for a particular connection.

## HttpRequestHeader.ContentEncoding field

```csharp
ContentEncoding
```

The Content-Encoding header, which specifies the encodings that have been applied to the accompanying body data.

## HttpRequestHeader.ContentLanguage field

```csharp
ContentLanguage
```

The Content-Language header, which specifies the natural language(s) of the accompanying body data.

## HttpRequestHeader.ContentLength field

```csharp
ContentLength
```

The Content-Length header, which specifies the length, in bytes, of the accompanying body data.

## HttpRequestHeader.ContentLocation field

```csharp
ContentLocation
```

The Content-Location header, which specifies a URI from which the accompanying body may be obtained.

## HttpRequestHeader.ContentMd5 field

```csharp
ContentMd5
```

The Content-MD5 header, which specifies the MD5 digest of the accompanying body data, for the purpose of providing an end-to-end message integrity check. Due to collision problems with MD5, Microsoft recommends a security model based on SHA-256 or better.

## HttpRequestHeader.ContentRange field

```csharp
ContentRange
```

The Content-Range header, which specifies where in the full body the accompanying partial body data should be applied.

## HttpRequestHeader.ContentType field

```csharp
ContentType
```

The Content-Type header, which specifies the MIME type of the accompanying body data.

## HttpRequestHeader.Cookie field

```csharp
Cookie
```

The Cookie header, which specifies cookie data presented to the server.

## HttpRequestHeader.Date field

```csharp
Date
```

The Date header, which specifies the date and time at which the request originated.

## HttpRequestHeader.Expect field

```csharp
Expect
```

The Expect header, which specifies particular server behaviors that are required by the client.

## HttpRequestHeader.Expires field

```csharp
Expires
```

The Expires header, which specifies the date and time after which the accompanying body data should be considered stale.

## HttpRequestHeader.From field

```csharp
From
```

The From header, which specifies an Internet Email address for the human user who controls the requesting user agent.

## HttpRequestHeader.Host field

```csharp
Host
```

The Host header, which specifies the host name and port number of the resource being requested.

## HttpRequestHeader.IfMatch field

```csharp
IfMatch
```

The If-Match header, which specifies that the requested operation should be performed only if the client's cached copy of the indicated resource is current.

## HttpRequestHeader.IfModifiedSince field

```csharp
IfModifiedSince
```

The If-Modified-Since header, which specifies that the requested operation should be performed only if the requested resource has been modified since the indicated date and time.

## HttpRequestHeader.IfNoneMatch field

```csharp
IfNoneMatch
```

The If-None-Match header, which specifies that the requested operation should be performed only if none of client's cached copies of the indicated resources are current.

## HttpRequestHeader.IfRange field

```csharp
IfRange
```

The If-Range header, which specifies that only the specified range of the requested resource should be sent, if the client's cached copy is current.

## HttpRequestHeader.IfUnmodifiedSince field

```csharp
IfUnmodifiedSince
```

The If-Unmodified-Since header, which specifies that the requested operation should be performed only if the requested resource has not been modified since the indicated date and time.

## HttpRequestHeader.KeepAlive field

```csharp
KeepAlive
```

The Keep-Alive header, which specifies a parameter used into order to maintain a persistent connection.

## HttpRequestHeader.LastModified field

```csharp
LastModified
```

The Last-Modified header, which specifies the date and time at which the accompanying body data was last modified.

## HttpRequestHeader.MaxForwards field

```csharp
MaxForwards
```

The Max-Forwards header, which specifies an integer indicating the remaining number of times that this request may be forwarded.

## HttpRequestHeader.Pragma field

```csharp
Pragma
```

The Pragma header, which specifies implementation-specific directives that might apply to any agent along the request/response chain.

## HttpRequestHeader.ProxyAuthorization field

```csharp
ProxyAuthorization
```

The Proxy-Authorization header, which specifies the credentials that the client presents in order to authenticate itself to a proxy.

## HttpRequestHeader.Range field

```csharp
Range
```

The Range header, which specifies the sub-range(s) of the response that the client requests be returned in lieu of the entire response.

## HttpRequestHeader.Referer field

```csharp
Referer
```

The Referer header, which specifies the URI of the resource from which the request URI was obtained.

## HttpRequestHeader.Te field

```csharp
Te
```

The TE header, which specifies the transfer encodings that are acceptable for the response.

## HttpRequestHeader.Trailer field

```csharp
Trailer
```

The Trailer header, which specifies the header fields present in the trailer of a message encoded with chunked transfer-coding.

## HttpRequestHeader.TransferEncoding field

```csharp
TransferEncoding
```

The Transfer-Encoding header, which specifies what (if any) type of transformation that has been applied to the message body.

## HttpRequestHeader.Translate field

```csharp
Translate
```

The Translate header, a Microsoft extension to the HTTP specification used in conjunction with WebDAV functionality.

## HttpRequestHeader.Upgrade field

```csharp
Upgrade
```

The Upgrade header, which specifies additional communications protocols that the client supports.

## HttpRequestHeader.UserAgent field

```csharp
UserAgent
```

The User-Agent header, which specifies information about the client agent.

## HttpRequestHeader.Via field

```csharp
Via
```

The Via header, which specifies intermediate protocols to be used by gateway and proxy agents.

## HttpRequestHeader.Warning field

```csharp
Warning
```

The Warning header, which specifies additional information about that status or transformation of a message that might not be reflected in the message.
