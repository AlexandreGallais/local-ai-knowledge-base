---
title: "WindowsServiceLifetimeHostBuilderExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Hosting/WindowsServiceLifetimeHostBuilderExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WindowsServiceLifetimeHostBuilderExtensions class

Namespace: `Microsoft.Extensions.Hosting`

```csharp
public static class WindowsServiceLifetimeHostBuilderExtensions
```

Extension methods for setting up WindowsServiceLifetime.

To be added.

## WindowsServiceLifetimeHostBuilderExtensions.AddWindowsService(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddWindowsService (this Microsoft.Extensions.DependencyInjection.IServiceCollection services);
```

Configures the lifetime of the `IHost` built from `services` to
`WindowsServiceLifetime` and enables logging to the event log with the application
name as the default source name.

Parameters:

- `services`: The `IServiceCollection` used to build the `IHost`.
For example, `HostApplicationBuilder.Services` or the `IServiceCollection` passed to the
`IHostBuilder.ConfigureServices` callback.

Returns: The `services` instance for chaining.

This is context aware and will only activate if it detects the process is running
as a Windows Service.

## WindowsServiceLifetimeHostBuilderExtensions.AddWindowsService(IServiceCollection, WindowsServiceLifetimeOptions>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddWindowsService (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Action<Microsoft.Extensions.Hosting.WindowsServiceLifetimeOptions> configure);
```

Configures the lifetime of the `IHost` built from `services` to
`WindowsServiceLifetime` and enables logging to the event log with the application name as the default source name.

Parameters:

- `services`: The `IServiceCollection` used to build the `IHost`.
For example, `HostApplicationBuilder.Services` or the `IServiceCollection` passed to the
`IHostBuilder.ConfigureServices` callback.
- `configure`: An `Action<T>` to configure the provided `WindowsServiceLifetimeOptions`.

Returns: The `services` instance for chaining.

This is context aware and will only activate if it detects the process is running
as a Windows Service.

## WindowsServiceLifetimeHostBuilderExtensions.UseWindowsService(IHostBuilder) method

```csharp
public static Microsoft.Extensions.Hosting.IHostBuilder UseWindowsService (this Microsoft.Extensions.Hosting.IHostBuilder hostBuilder);
```

Sets the host lifetime to `WindowsServiceLifetime` and enables logging to the event log with
the application name as the default source name.

Parameters:

- `hostBuilder`: The `IHostBuilder` to operate on.

Returns: The `hostBuilder` instance for chaining.

This is context aware and will only activate if it detects the process is running as a Windows Service.

## WindowsServiceLifetimeHostBuilderExtensions.UseWindowsService(IHostBuilder, WindowsServiceLifetimeOptions>) method

```csharp
public static Microsoft.Extensions.Hosting.IHostBuilder UseWindowsService (this Microsoft.Extensions.Hosting.IHostBuilder hostBuilder, Action<Microsoft.Extensions.Hosting.WindowsServiceLifetimeOptions> configure);
```

Sets the host lifetime to `WindowsServiceLifetime` and enables logging to the event log with the application
name as the default source name.

Parameters:

- `hostBuilder`: The `IHostBuilder` to operate on.
- `configure`: An `Action<T>` to configure the provided `WindowsServiceLifetimeOptions`.

Returns: The `hostBuilder` instance for chaining.

This is context aware and will only activate if it detects the process is running
as a Windows Service.
