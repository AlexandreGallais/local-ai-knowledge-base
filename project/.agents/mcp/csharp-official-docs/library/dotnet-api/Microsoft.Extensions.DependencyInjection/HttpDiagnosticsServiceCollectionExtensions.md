---
title: "HttpDiagnosticsServiceCollectionExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/HttpDiagnosticsServiceCollectionExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpDiagnosticsServiceCollectionExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class HttpDiagnosticsServiceCollectionExtensions
```

Extensions for telemetry utilities.

To be added.

## HttpDiagnosticsServiceCollectionExtensions.AddDownstreamDependencyMetadata(IServiceCollection, IDownstreamDependencyMetadata) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddDownstreamDependencyMetadata (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Microsoft.Extensions.Http.Diagnostics.IDownstreamDependencyMetadata downstreamDependencyMetadata);
```

Adds dependency metadata.

Parameters:

- `services`: `IServiceCollection` object instance.
- `downstreamDependencyMetadata`: DownstreamDependencyMetadata object to add.

Returns: The value of `services`.

To be added.

## HttpDiagnosticsServiceCollectionExtensions.AddDownstreamDependencyMetadata<T>(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddDownstreamDependencyMetadata<T> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services) where T : class, Microsoft.Extensions.Http.Diagnostics.IDownstreamDependencyMetadata;
```

Adds dependency metadata.

Parameters:

- `T`: `IDownstreamDependencyMetadata` instance to be registered.
- `services`: `IServiceCollection` object instance.

Returns: The value of `services`.

To be added.
