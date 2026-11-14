---
title: "HttpListenerTimeoutManager class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/HttpListenerTimeoutManager.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpListenerTimeoutManager class

Namespace: `System.Net`

```csharp
public class HttpListenerTimeoutManager
```

The timeout manager to use for an `HttpListener` object.

#### Remarks

The timeout manager defines the connection timeout limits for a  `HttpListener` instance.

## HttpListenerTimeoutManager.DrainEntityBody property

```csharp
public TimeSpan DrainEntityBody { get; set; }
```

Gets or sets the time allowed for the `HttpListener` to drain the entity body on a Keep-Alive connection.

Returns: The time allowed for the `HttpListener` to drain the entity body on a Keep-Alive connection.

#### Remarks
The default value for this property is 2 minutes.

On a Keep-Alive connection, after the app has sent a response for a request and before the request entity body has completely arrived, the `HttpListener` starts draining the remainder of the entity body to reach another potentially pipelined request from the client. If the time to drain the remaining entity body exceeds the allowed period the connection is timed out.

## HttpListenerTimeoutManager.EntityBody property

```csharp
public TimeSpan EntityBody { get; set; }
```

Gets or sets the time allowed for the request entity body to arrive.

Returns: The time allowed for the request entity body to arrive.

#### Remarks
The default value for this property is 2 minutes.

The `HttpListener` turns on this timer when the request has an entity body. The timer expiration is initially set to the configured value. When the `HttpListener` receives additional data indications on the request, it resets the timer to give the connection another interval.

## HttpListenerTimeoutManager.HeaderWait property

```csharp
public TimeSpan HeaderWait { get; set; }
```

Gets or sets the time allowed for the `HttpListener` to parse the request header.

Returns: The time allowed for the `HttpListener` to parse the request header.

#### Remarks
The default value for this property is 2 minutes.

This timeout is only enforced after the first request on the connection is routed to the `HttpListener`.

The system cannot determine the request queue or URL group that the request is associated with until the headers have been parsed. Therefore, the `HttpListener` enforces the default `HttpListenerTimeoutManager.HeaderWait` timer for the first request on a connection. Subsequent requests on a Keep-Alive connection will use the value set on this property.

## HttpListenerTimeoutManager.IdleConnection property

```csharp
public TimeSpan IdleConnection { get; set; }
```

Gets or sets the time allowed for an idle connection.

Returns: The time allowed for an idle connection.

#### Remarks
The default value for this property is 2 minutes.

This timeout is only enforced after the first request on the connection is routed to the `HttpListener`.

The system cannot determine the request queue or URL group that the request is associated with until the headers have been parsed. Therefore, the `HttpListener` enforces the default `HttpListenerTimeoutManager.IdleConnection` timer for the first request on a connection. Subsequent requests on a Keep-Alive connection will use the value set on this property.

## HttpListenerTimeoutManager.MinSendBytesPerSecond property

```csharp
public long MinSendBytesPerSecond { get; set; }
```

Gets or sets the minimum send rate, in bytes-per-second, for the response.

Returns: The minimum send rate, in bytes-per-second, for the response.

#### Remarks
The default response send rate is 150 bytes-per-second.

To disable this timer, set `HttpListenerTimeoutManager.MinSendBytesPerSecond` to MAXULONG.

## HttpListenerTimeoutManager.RequestQueue property

```csharp
public TimeSpan RequestQueue { get; set; }
```

Gets or sets the time allowed for the request to remain in the request queue before the `HttpListener` picks it up.

Returns: The time allowed for the request to remain in the request queue before the `HttpListener` picks it up.

#### Remarks
The default value for this property is 2 minutes.
