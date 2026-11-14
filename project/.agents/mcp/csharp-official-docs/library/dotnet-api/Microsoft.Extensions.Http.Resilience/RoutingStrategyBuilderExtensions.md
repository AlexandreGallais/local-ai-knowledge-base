---
title: "RoutingStrategyBuilderExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Http.Resilience/RoutingStrategyBuilderExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RoutingStrategyBuilderExtensions class

Namespace: `Microsoft.Extensions.Http.Resilience`

```csharp
public static class RoutingStrategyBuilderExtensions
```

Extensions for `IRoutingStrategyBuilder`.

To be added.

## RoutingStrategyBuilderExtensions.ConfigureOrderedGroups(IRoutingStrategyBuilder, IConfigurationSection) method

```csharp
public static Microsoft.Extensions.Http.Resilience.IRoutingStrategyBuilder ConfigureOrderedGroups (this Microsoft.Extensions.Http.Resilience.IRoutingStrategyBuilder builder, Microsoft.Extensions.Configuration.IConfigurationSection section);
```

Configures ordered groups routing using `OrderedGroupsRoutingOptions`.

Parameters:

- `builder`: The routing builder.
- `section`: The section that the `OrderedGroupsRoutingOptions` will bind against.

Returns: The value of `builder`.

To be added.

## RoutingStrategyBuilderExtensions.ConfigureOrderedGroups(IRoutingStrategyBuilder, IServiceProvider>) method

```csharp
public static Microsoft.Extensions.Http.Resilience.IRoutingStrategyBuilder ConfigureOrderedGroups (this Microsoft.Extensions.Http.Resilience.IRoutingStrategyBuilder builder, Action<Microsoft.Extensions.Http.Resilience.OrderedGroupsRoutingOptions,IServiceProvider> configure);
```

Configures ordered groups routing using `OrderedGroupsRoutingOptions`.

Parameters:

- `builder`: The routing builder.
- `configure`: The callback that configures `OrderedGroupsRoutingOptions`.

Returns: The value of `builder`.

To be added.

## RoutingStrategyBuilderExtensions.ConfigureOrderedGroups(IRoutingStrategyBuilder, OrderedGroupsRoutingOptions>) method

```csharp
public static Microsoft.Extensions.Http.Resilience.IRoutingStrategyBuilder ConfigureOrderedGroups (this Microsoft.Extensions.Http.Resilience.IRoutingStrategyBuilder builder, Action<Microsoft.Extensions.Http.Resilience.OrderedGroupsRoutingOptions> configure);
```

Configures ordered groups routing using `OrderedGroupsRoutingOptions`.

Parameters:

- `builder`: The routing builder.
- `configure`: The callback that configures `OrderedGroupsRoutingOptions`.

Returns: The value of `builder`.

To be added.

## RoutingStrategyBuilderExtensions.ConfigureWeightedGroups(IRoutingStrategyBuilder, IConfigurationSection) method

```csharp
public static Microsoft.Extensions.Http.Resilience.IRoutingStrategyBuilder ConfigureWeightedGroups (this Microsoft.Extensions.Http.Resilience.IRoutingStrategyBuilder builder, Microsoft.Extensions.Configuration.IConfigurationSection section);
```

Configures weighted groups routing using `WeightedGroupsRoutingOptions`.

Parameters:

- `builder`: The routing builder.
- `section`: The section that the `WeightedGroupsRoutingOptions` will bind against.

Returns: The value of `builder`.

To be added.

## RoutingStrategyBuilderExtensions.ConfigureWeightedGroups(IRoutingStrategyBuilder, IServiceProvider>) method

```csharp
public static Microsoft.Extensions.Http.Resilience.IRoutingStrategyBuilder ConfigureWeightedGroups (this Microsoft.Extensions.Http.Resilience.IRoutingStrategyBuilder builder, Action<Microsoft.Extensions.Http.Resilience.WeightedGroupsRoutingOptions,IServiceProvider> configure);
```

Configures weighted groups routing using `WeightedGroupsRoutingOptions`.

Parameters:

- `builder`: The routing builder.
- `configure`: The callback that configures `WeightedGroupsRoutingOptions`.

Returns: The value of `builder`.

To be added.

## RoutingStrategyBuilderExtensions.ConfigureWeightedGroups(IRoutingStrategyBuilder, WeightedGroupsRoutingOptions>) method

```csharp
public static Microsoft.Extensions.Http.Resilience.IRoutingStrategyBuilder ConfigureWeightedGroups (this Microsoft.Extensions.Http.Resilience.IRoutingStrategyBuilder builder, Action<Microsoft.Extensions.Http.Resilience.WeightedGroupsRoutingOptions> configure);
```

Configures weighted groups routing using `WeightedGroupsRoutingOptions`.

Parameters:

- `builder`: The routing builder.
- `configure`: The callback that configures `WeightedGroupsRoutingOptions`.

Returns: The value of `builder`.

To be added.
