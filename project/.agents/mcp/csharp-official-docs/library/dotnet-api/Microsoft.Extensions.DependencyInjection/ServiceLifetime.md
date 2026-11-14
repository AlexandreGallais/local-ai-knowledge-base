---
title: "ServiceLifetime enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/ServiceLifetime.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ServiceLifetime enum

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public enum ServiceLifetime
```

Specifies the lifetime of a service in an `IServiceCollection`.

To be added.

## ServiceLifetime.Scoped field

```csharp
Scoped
```

Specifies that a new instance of the service will be created for each scope.

In ASP.NET Core applications a scope is created around each server request.

## ServiceLifetime.Singleton field

```csharp
Singleton
```

Specifies that a single instance of the service will be created.

## ServiceLifetime.Transient field

```csharp
Transient
```

Specifies that a new instance of the service will be created every time it is requested.
