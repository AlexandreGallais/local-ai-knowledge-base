---
title: "SocketsHttpPlaintextStreamFilterContext class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http/SocketsHttpPlaintextStreamFilterContext.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SocketsHttpPlaintextStreamFilterContext class

Namespace: `System.Net.Http`

```csharp
public sealed class SocketsHttpPlaintextStreamFilterContext
```

Represents the context passed to the PlaintextStreamFilter for a SocketsHttpHandler instance.

To be added.

## SocketsHttpPlaintextStreamFilterContext.ConnectionId property

```csharp
public long ConnectionId { get; }
```

To be added.

Returns: To be added.

To be added.

## SocketsHttpPlaintextStreamFilterContext.InitialRequestMessage property

```csharp
public System.Net.Http.HttpRequestMessage InitialRequestMessage { get; }
```

Gets the initial HttpRequestMessage that is causing the stream to be used.

Returns: The HTTP request message that is causing the stream to be used.

To be added.

## SocketsHttpPlaintextStreamFilterContext.NegotiatedHttpVersion property

```csharp
public Version NegotiatedHttpVersion { get; }
```

Gets the version of HTTP in use for this stream.

Returns: The version of HTTP in use for this stream.

To be added.

## SocketsHttpPlaintextStreamFilterContext.PlaintextStream property

```csharp
public System.IO.Stream PlaintextStream { get; }
```

Gets the plaintext Stream that will be used for HTTP protocol requests and responses.

Returns: The plaintext stream that will be used for HTTP protocol requests and responses.

To be added.
