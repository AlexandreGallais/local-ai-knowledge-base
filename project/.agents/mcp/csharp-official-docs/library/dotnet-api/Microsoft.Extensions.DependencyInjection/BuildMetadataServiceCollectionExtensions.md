---
title: "BuildMetadataServiceCollectionExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/BuildMetadataServiceCollectionExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BuildMetadataServiceCollectionExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class BuildMetadataServiceCollectionExtensions
```

Extensions for Build metadata.

To be added.

## BuildMetadataServiceCollectionExtensions.AddBuildMetadata(IServiceCollection, IConfigurationSection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddBuildMetadata (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Microsoft.Extensions.Configuration.IConfigurationSection section);
```

Adds an instance of `BuildMetadata` to the `IServiceCollection`.

Parameters:

- `services`: The `IServiceCollection` to add the services to.
- `section`: The configuration section to bind the instance of `BuildMetadata` against.

Returns: The `IServiceCollection` for call chaining.

Exceptions:

- `ArgumentNullException`: The argument `services` or `section` is `null`.

To be added.

## BuildMetadataServiceCollectionExtensions.AddBuildMetadata(IServiceCollection, BuildMetadata>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddBuildMetadata (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Action<Microsoft.Extensions.AmbientMetadata.BuildMetadata> configure);
```

Adds an instance of `BuildMetadata` to the `IServiceCollection`.

Parameters:

- `services`: The `IServiceCollection` to add the services to.
- `configure`: The delegate to configure `BuildMetadata` with.

Returns: The `IServiceCollection` for call chaining.

Exceptions:

- `ArgumentNullException`: The argument `services` or `configure` is `null`.

To be added.
