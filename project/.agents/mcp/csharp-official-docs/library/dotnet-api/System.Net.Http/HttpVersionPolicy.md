---
title: "HttpVersionPolicy enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http/HttpVersionPolicy.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpVersionPolicy enum

Namespace: `System.Net.Http`

```csharp
public enum HttpVersionPolicy
```

Specifies behaviors for selecting and negotiating the HTTP version for a request.

To be added.

## HttpVersionPolicy.RequestVersionExact field

```csharp
RequestVersionExact
```

Only use the requested version.

This option allows for use of a prenegotiated clear text connection for the requested version.

#### Remarks

Note that this option allows to use prenegotiated clear text connection for the requested version.

## HttpVersionPolicy.RequestVersionOrHigher field

```csharp
RequestVersionOrHigher
```

Use the highest available version, downgrading only to the requested version but not below.

If the server supports a higher version than the requested version (either negotiated via ALPN (H2) or advertised via Alt-Svc (H3)) and a secure connection is requested, the result is the highest available version. Otherwise, the version downgrades to `Version`. This option allows use of a prenegotiated clear text connection for the requested version but not for a higher version.

#### Remarks

If the server supports higher than requested version, either negotiated via ALPN (H2) or advertised via Alt-Svc (H3),
as well as secure connection is being requested, the result is the highest available one.
Otherwise, downgrades to the `Version`.
Note that this option allows to use prenegotiated clear text connection for the requested version but not for anything higher.

## HttpVersionPolicy.RequestVersionOrLower field

```csharp
RequestVersionOrLower
```

Use the requested version or downgrade to a lower one. This is the default behavior.

If the server supports the requested version, either negotiated via ALPN (H2) or advertised via Alt-Svc (H3), and a secure connection is being requested, the result is the `Version`. Otherwise, the version downgrades to HTTP/1.1. This option does not allow use of a prenegotiated clear text connection, for example, H2C.

#### Remarks

If the server supports the requested version, either negotiated via ALPN (H2) or advertised via Alt-Svc (H3),
as well as a secure connection is being requested, the result is the `Version`.
Otherwise, downgrades to HTTP/1.1.
Note that this option does not allow use of prenegotiated clear text connection, e.g. H2C.
