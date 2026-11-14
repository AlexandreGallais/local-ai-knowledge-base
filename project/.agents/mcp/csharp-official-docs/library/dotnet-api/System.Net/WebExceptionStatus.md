---
title: "WebExceptionStatus enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/WebExceptionStatus.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WebExceptionStatus enum

Namespace: `System.Net`

```csharp
public enum WebExceptionStatus
```

Defines status codes for the `WebException` class.

#### Remarks
The `WebExceptionStatus` enumeration defines the status codes assigned to the `Status` property.

## WebExceptionStatus.CacheEntryNotFound field

```csharp
CacheEntryNotFound
```

The specified cache entry was not found.

## WebExceptionStatus.ConnectFailure field

```csharp
ConnectFailure
```

The remote service point could not be contacted at the transport level.

## WebExceptionStatus.ConnectionClosed field

```csharp
ConnectionClosed
```

The connection was prematurely closed.

## WebExceptionStatus.KeepAliveFailure field

```csharp
KeepAliveFailure
```

The connection for a request that specifies the Keep-alive header was closed unexpectedly.

## WebExceptionStatus.MessageLengthLimitExceeded field

```csharp
MessageLengthLimitExceeded
```

A message was received that exceeded the specified limit when sending a request or receiving a response from the server.

## WebExceptionStatus.NameResolutionFailure field

```csharp
NameResolutionFailure
```

The name resolver service could not resolve the host name.

## WebExceptionStatus.Pending field

```csharp
Pending
```

An internal asynchronous request is pending.

## WebExceptionStatus.PipelineFailure field

```csharp
PipelineFailure
```

The request was a pipelined request and the connection was closed before the response was received.

## WebExceptionStatus.ProtocolError field

```csharp
ProtocolError
```

The response received from the server was complete but indicated a protocol-level error. For example, an HTTP protocol error such as 401 Access Denied would use this status.

## WebExceptionStatus.ProxyNameResolutionFailure field

```csharp
ProxyNameResolutionFailure
```

The name resolver service could not resolve the proxy host name.

## WebExceptionStatus.ReceiveFailure field

```csharp
ReceiveFailure
```

A complete response was not received from the remote server.

## WebExceptionStatus.RequestCanceled field

```csharp
RequestCanceled
```

The request was canceled, the `WebRequest.Abort` method was called, or an unclassifiable error occurred. This is the default value for `WebException.Status`.

## WebExceptionStatus.RequestProhibitedByCachePolicy field

```csharp
RequestProhibitedByCachePolicy
```

The request was not permitted by the cache policy. In general, this occurs when a request is not cacheable and the effective policy prohibits sending the request to the server. You might receive this status if a request method implies the presence of a request body, a request method requires direct interaction with the server, or a request contains a conditional header.

## WebExceptionStatus.RequestProhibitedByProxy field

```csharp
RequestProhibitedByProxy
```

This request was not permitted by the proxy.

## WebExceptionStatus.SecureChannelFailure field

```csharp
SecureChannelFailure
```

An error occurred while establishing a connection using SSL.

## WebExceptionStatus.SendFailure field

```csharp
SendFailure
```

A complete request could not be sent to the remote server.

## WebExceptionStatus.ServerProtocolViolation field

```csharp
ServerProtocolViolation
```

The server response was not a valid HTTP response.

## WebExceptionStatus.Success field

```csharp
Success
```

No error was encountered.

## WebExceptionStatus.Timeout field

```csharp
Timeout
```

No response was received during the time-out period for a request.

## WebExceptionStatus.TrustFailure field

```csharp
TrustFailure
```

A server certificate could not be validated.

## WebExceptionStatus.UnknownError field

```csharp
UnknownError
```

An exception of unknown type has occurred.
