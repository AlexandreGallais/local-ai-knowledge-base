---
title: "IServiceProviderFactory<TContainerBuilder> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/IServiceProviderFactory`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IServiceProviderFactory<TContainerBuilder> interface

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public interface IServiceProviderFactory<TContainerBuilder>
```

Provides an extension point for creating a container specific builder and an `IServiceProvider`.

To be added.

## IServiceProviderFactory<TContainerBuilder>.CreateBuilder(IServiceCollection) method

```csharp
public TContainerBuilder CreateBuilder (Microsoft.Extensions.DependencyInjection.IServiceCollection services);
```

Creates a container builder from an `IServiceCollection`.

Parameters:

- `services`: The collection of services.

Returns: A container builder that can be used to create an `IServiceProvider`.

To be added.

## IServiceProviderFactory<TContainerBuilder>.CreateServiceProvider(TContainerBuilder) method

```csharp
public IServiceProvider CreateServiceProvider (TContainerBuilder containerBuilder);
```

Creates an `IServiceProvider` from the container builder.

Parameters:

- `containerBuilder`: The container builder.

Returns: An `IServiceProvider` instance.

To be added.
