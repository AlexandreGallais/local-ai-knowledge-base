---
title: "MemoryConfigurationBuilderExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Configuration/MemoryConfigurationBuilderExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MemoryConfigurationBuilderExtensions class

Namespace: `Microsoft.Extensions.Configuration`

```csharp
public static class MemoryConfigurationBuilderExtensions
```

IConfigurationBuilder extension methods for the MemoryConfigurationProvider.

#### Remarks

For more information and examples, see Memory configuration provider.

## MemoryConfigurationBuilderExtensions.AddInMemoryCollection(IConfigurationBuilder) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddInMemoryCollection (this Microsoft.Extensions.Configuration.IConfigurationBuilder configurationBuilder);
```

Adds the memory configuration provider to `configurationBuilder`.

Parameters:

- `configurationBuilder`: The `IConfigurationBuilder` to add to.

Returns: The `IConfigurationBuilder`.

To be added.

## MemoryConfigurationBuilderExtensions.AddInMemoryCollection(IConfigurationBuilder, String>>) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddInMemoryCollection (this Microsoft.Extensions.Configuration.IConfigurationBuilder configurationBuilder, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,string?>>? initialData);
```

Adds the memory configuration provider to `configurationBuilder`.

Parameters:

- `configurationBuilder`: The `IConfigurationBuilder` to add to.
- `initialData`: The data to add to memory configuration provider.

Returns: The `IConfigurationBuilder`.

To be added.
