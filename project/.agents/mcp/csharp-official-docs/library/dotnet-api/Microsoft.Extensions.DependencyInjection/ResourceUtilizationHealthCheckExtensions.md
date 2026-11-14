---
title: "ResourceUtilizationHealthCheckExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/ResourceUtilizationHealthCheckExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ResourceUtilizationHealthCheckExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class ResourceUtilizationHealthCheckExtensions
```

Controls resource utilization health check features.

To be added.

## ResourceUtilizationHealthCheckExtensions.AddResourceUtilizationHealthCheck(IHealthChecksBuilder, IConfigurationSection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder AddResourceUtilizationHealthCheck (this Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder builder, Microsoft.Extensions.Configuration.IConfigurationSection section);
```

Registers a health check provider that monitors resource utilization to assess the application's health.

Parameters:

- `builder`: The builder to add the provider to.
- `section`: Configuration for `ResourceUtilizationHealthCheckOptions`.

Returns: The value of `builder`.

Exceptions:

- `ArgumentNullException`: `builder` or `section` is `null`.

To be added.

## ResourceUtilizationHealthCheckExtensions.AddResourceUtilizationHealthCheck(IHealthChecksBuilder, ResourceUtilizationHealthCheckOptions>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder AddResourceUtilizationHealthCheck (this Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder builder, Action<Microsoft.Extensions.Diagnostics.HealthChecks.ResourceUtilizationHealthCheckOptions> configure);
```

Registers a health check provider that monitors resource utilization to assess the application's health.

Parameters:

- `builder`: The builder to add the provider to.
- `configure`: Configuration callback.

Returns: The value of `builder`.

Exceptions:

- `ArgumentNullException`: `builder` or `configure` is `null`.

To be added.

## ResourceUtilizationHealthCheckExtensions.AddResourceUtilizationHealthCheck(IHealthChecksBuilder, String>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder AddResourceUtilizationHealthCheck (this Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder builder, System.Collections.Generic.IEnumerable<string> tags);
```

Registers a health check provider that monitors resource utilization to assess the application's health.

Parameters:

- `builder`: The builder to add the provider to.
- `tags`: A list of tags that can be used to filter health checks.

Returns: The value of `builder`.

Exceptions:

- `ArgumentNullException`: `builder` is `null`.

To be added.

## ResourceUtilizationHealthCheckExtensions.AddResourceUtilizationHealthCheck(IHealthChecksBuilder, String[]) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder AddResourceUtilizationHealthCheck (this Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder builder, params string[] tags);
```

Registers a health check provider that monitors resource utilization to assess the application's health.

Parameters:

- `builder`: The builder to add the provider to.
- `tags`: A list of tags that can be used to filter health checks.

Returns: The value of `builder`.

Exceptions:

- `ArgumentNullException`: `builder` is `null`.

To be added.

## ResourceUtilizationHealthCheckExtensions.AddResourceUtilizationHealthCheck(IHealthChecksBuilder, IConfigurationSection, String>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder AddResourceUtilizationHealthCheck (this Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder builder, Microsoft.Extensions.Configuration.IConfigurationSection section, System.Collections.Generic.IEnumerable<string> tags);
```

Registers a health check provider that monitors resource utilization to assess the application's health.

Parameters:

- `builder`: The builder to add the provider to.
- `section`: Configuration section holding an instance of `ResourceUtilizationHealthCheckOptions`.
- `tags`: A list of tags that can be used to filter health checks.

Returns: The value of `builder`.

Exceptions:

- `ArgumentNullException`: `builder`, `section` or `tags` is `null`.

To be added.

## ResourceUtilizationHealthCheckExtensions.AddResourceUtilizationHealthCheck(IHealthChecksBuilder, IConfigurationSection, String[]) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder AddResourceUtilizationHealthCheck (this Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder builder, Microsoft.Extensions.Configuration.IConfigurationSection section, params string[] tags);
```

Registers a health check provider that monitors resource utilization to assess the application's health.

Parameters:

- `builder`: The builder to add the provider to.
- `section`: Configuration section holding an instance of `ResourceUtilizationHealthCheckOptions`.
- `tags`: A list of tags that can be used to filter health checks.

Returns: The value of `builder`.

Exceptions:

- `ArgumentNullException`: `builder`, `section` or `tags` is `null`.

To be added.

## ResourceUtilizationHealthCheckExtensions.AddResourceUtilizationHealthCheck(IHealthChecksBuilder, ResourceUtilizationHealthCheckOptions>, String>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder AddResourceUtilizationHealthCheck (this Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder builder, Action<Microsoft.Extensions.Diagnostics.HealthChecks.ResourceUtilizationHealthCheckOptions> configure, System.Collections.Generic.IEnumerable<string> tags);
```

Registers a health check provider that monitors resource utilization to assess the application's health.

Parameters:

- `builder`: The builder to add the provider to.
- `configure`: Configuration callback.
- `tags`: A list of tags that can be used to filter health checks.

Returns: The value of `builder`.

Exceptions:

- `ArgumentNullException`: `builder`, `configure` or `tags` is `null`.

To be added.

## ResourceUtilizationHealthCheckExtensions.AddResourceUtilizationHealthCheck(IHealthChecksBuilder, ResourceUtilizationHealthCheckOptions>, String[]) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder AddResourceUtilizationHealthCheck (this Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder builder, Action<Microsoft.Extensions.Diagnostics.HealthChecks.ResourceUtilizationHealthCheckOptions> configure, params string[] tags);
```

Registers a health check provider that monitors resource utilization to assess the application's health.

Parameters:

- `builder`: The builder to add the provider to.
- `configure`: Configuration callback.
- `tags`: A list of tags that can be used to filter health checks.

Returns: The value of `builder`.

Exceptions:

- `ArgumentNullException`: `builder`, `configure` or `tags` is `null`.

To be added.
