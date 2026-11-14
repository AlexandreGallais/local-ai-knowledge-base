---
title: "ClientCertificateOption enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http/ClientCertificateOption.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ClientCertificateOption enum

Namespace: `System.Net.Http`

```csharp
public enum ClientCertificateOption
```

Specifies how client certificates are provided.

To be added.

## ClientCertificateOption.Automatic field

```csharp
Automatic
```

The `HttpClientHandler` will attempt to provide all available client certificates  automatically.

## ClientCertificateOption.Manual field

```csharp
Manual
```

The application manually provides the client certificates to the `WebRequestHandler`. This value is the default.
