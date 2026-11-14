---
title: "HttpRequestError enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http/HttpRequestError.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpRequestError enum

Namespace: `System.Net.Http`

```csharp
public enum HttpRequestError
```

Defines error categories representing the reason for `HttpRequestException` or `HttpIOException`.

To be added.

## HttpRequestError.ConfigurationLimitExceeded field

```csharp
ConfigurationLimitExceeded
```

The response exceeded a pre-configured limit such as `HttpClient.MaxResponseContentBufferSize` or `HttpClientHandler.MaxResponseHeadersLength`.

## HttpRequestError.ConnectionError field

```csharp
ConnectionError
```

A transport-level failure occurred while connecting to the remote endpoint.

## HttpRequestError.ExtendedConnectNotSupported field

```csharp
ExtendedConnectNotSupported
```

Extended CONNECT for WebSockets over HTTP/2 is not supported by the peer.

## HttpRequestError.HttpProtocolError field

```csharp
HttpProtocolError
```

An HTTP/2 or HTTP/3 protocol error occurred.

## HttpRequestError.InvalidResponse field

```csharp
InvalidResponse
```

An invalid or malformed response has been received.

## HttpRequestError.NameResolutionError field

```csharp
NameResolutionError
```

The DNS name resolution failed.

## HttpRequestError.ProxyTunnelError field

```csharp
ProxyTunnelError
```

An error occurred while establishing a connection to the proxy tunnel.

## HttpRequestError.ResponseEnded field

```csharp
ResponseEnded
```

The response ended prematurely.

## HttpRequestError.SecureConnectionError field

```csharp
SecureConnectionError
```

An error occurred during the TLS handshake.

## HttpRequestError.Unknown field

```csharp
Unknown
```

A generic or unknown error occurred.

## HttpRequestError.UserAuthenticationError field

```csharp
UserAuthenticationError
```

The authentication failed.

## HttpRequestError.VersionNegotiationError field

```csharp
VersionNegotiationError
```

Cannot negotiate the HTTP version requested.
