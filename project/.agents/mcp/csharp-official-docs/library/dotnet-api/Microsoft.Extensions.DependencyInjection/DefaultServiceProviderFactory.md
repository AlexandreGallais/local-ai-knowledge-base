---
title: "DefaultServiceProviderFactory class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/DefaultServiceProviderFactory.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DefaultServiceProviderFactory class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public class DefaultServiceProviderFactory : Microsoft.Extensions.DependencyInjection.IServiceProviderFactory<Microsoft.Extensions.DependencyInjection.IServiceCollection>
```

Default implementation of `IServiceProviderFactory<T>`.

To be added.

## DefaultServiceProviderFactory.DefaultServiceProviderFactory() constructor

```csharp
public DefaultServiceProviderFactory ();
```

Initializes a new instance of the `DefaultServiceProviderFactory` class
with default options.

To be added.

## DefaultServiceProviderFactory.DefaultServiceProviderFactory(ServiceProviderOptions) constructor

```csharp
public DefaultServiceProviderFactory (Microsoft.Extensions.DependencyInjection.ServiceProviderOptions options);
```

Initializes a new instance of the `DefaultServiceProviderFactory` class
with the specified `options`.

Parameters:

- `options`: The options to use for this instance.

To be added.

## DefaultServiceProviderFactory.CreateBuilder(IServiceCollection) method

```csharp
public Microsoft.Extensions.DependencyInjection.IServiceCollection CreateBuilder (Microsoft.Extensions.DependencyInjection.IServiceCollection services);
```

Creates a container builder from an .

Parameters:

- `services`: The collection of services.

Returns: A container builder that can be used to create an <xref data-throw-if-not-resolved="true" uid="System.IServiceProvider"></xref>.

To be added.

## DefaultServiceProviderFactory.CreateServiceProvider(IServiceCollection) method

```csharp
public IServiceProvider CreateServiceProvider (Microsoft.Extensions.DependencyInjection.IServiceCollection containerBuilder);
```

Creates an  from the container builder.

Parameters:

- `containerBuilder`: The container builder.

Returns: The newly created service provider.

To be added.
