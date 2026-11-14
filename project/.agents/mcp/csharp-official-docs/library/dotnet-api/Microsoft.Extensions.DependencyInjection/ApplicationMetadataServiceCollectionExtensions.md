---
title: "ApplicationMetadataServiceCollectionExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/ApplicationMetadataServiceCollectionExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ApplicationMetadataServiceCollectionExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class ApplicationMetadataServiceCollectionExtensions
```

Extensions for application metadata.

To be added.

## ApplicationMetadataServiceCollectionExtensions.AddApplicationMetadata(IServiceCollection, IConfigurationSection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddApplicationMetadata (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Microsoft.Extensions.Configuration.IConfigurationSection section);
```

Adds an instance of `ApplicationMetadata` to a dependency injection container.

Parameters:

- `services`: The dependency injection container to add the instance to.
- `section`: The configuration section to bind.

Returns: The value of `services`.

Exceptions:

- `ArgumentNullException`: `section` or `section` is `null`.

To be added.

## ApplicationMetadataServiceCollectionExtensions.AddApplicationMetadata(IServiceCollection, ApplicationMetadata>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddApplicationMetadata (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Action<Microsoft.Extensions.AmbientMetadata.ApplicationMetadata> configure);
```

Adds an instance of `ApplicationMetadata` to a dependency injection container.

Parameters:

- `services`: The dependency injection container to add the instance to.
- `configure`: The delegate to configure `ApplicationMetadata` with.

Returns: The value of `services`.

Exceptions:

- `ArgumentNullException`: `services` or `configure` is `null`.

To be added.
