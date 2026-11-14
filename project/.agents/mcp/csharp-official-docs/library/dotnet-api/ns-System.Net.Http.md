---
title: "System.Net.Http namespace"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/ns-System.Net.Http.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# System.Net.Http namespace

Provides a programming interface for modern HTTP applications.

#### Remarks

The `Http` namespace is designed to provide the following components:

- HTTP client components that allow users to consume modern web services over HTTP.
- HTTP components that can be used by both clients and servers (HTTP headers and messages, for example). This provides a consistent programming model on both the client and the server side for modern web services over HTTP.

The `Http` namespace and the related `Headers` namespace provide the following set of components:

- `HttpClient` - The primary class used to send and receive requests over HTTP.
- `HttpRequestMessage` and `HttpResponseMessage` - HTTP messages as defined in RFC 2616 by the IETF.
- `HttpHeaders` - HTTP headers as defined in RFC 2616 by the IETF.
- `HttpClientHandler` - HTTP handlers responsible for producing HTTP response messages.

There are various HTTP message handlers that you can use:

- `DelegatingHandler` - A class used to plug a handler into a handler chain.
- `HttpMessageHandler` - A simple class to derive from that supports the most common requirements for most applications.
- `HttpClientHandler` - A class that operates at the bottom of the handler chain that actually handles the HTTP transport operations.

The contents of an HTTP message corresponds to the entity body defined in RFC 2616.

The following classes can be used for HTTP content:

- `ByteArrayContent` - HTTP content based on a byte array.
- `FormUrlEncodedContent` - HTTP content of name/value tuples encoded using application/x-www-form-urlencoded MIME type.
- `MultipartContent` - HTTP content that gets serialized using the multipart/* content type specification.
- `MultipartFormDataContent` - HTTP content encoded using the multipart/form-data MIME type.
- `StreamContent` - HTTP content based on a stream.
- `StringContent` - HTTP content based on a string.

If your app uses the `Http` and `Headers` namespaces and intends to download large amounts of data (50 megabytes or more), then it should stream those downloads and not use the default buffering. If you use the default buffering, the client memory usage will get very large, potentially resulting in substantially reduced performance.
