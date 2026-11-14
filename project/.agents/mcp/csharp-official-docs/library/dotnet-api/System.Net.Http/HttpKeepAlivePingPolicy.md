---
title: "HttpKeepAlivePingPolicy enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http/HttpKeepAlivePingPolicy.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpKeepAlivePingPolicy enum

Namespace: `System.Net.Http`

```csharp
public enum HttpKeepAlivePingPolicy
```

Specifies when the HTTP/2 ping frame is sent on an idle connection.

To be added.

## HttpKeepAlivePingPolicy.Always field

```csharp
Always
```

Sends a keep alive ping for the whole lifetime of the connection.

## HttpKeepAlivePingPolicy.WithActiveRequests field

```csharp
WithActiveRequests
```

Sends a keep alive ping only when there are active streams on the connection.
