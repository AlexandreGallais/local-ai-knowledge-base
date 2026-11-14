---
title: "SystemdHostBuilderExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Hosting/SystemdHostBuilderExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SystemdHostBuilderExtensions class

Namespace: `Microsoft.Extensions.Hosting`

```csharp
public static class SystemdHostBuilderExtensions
```

Extension methods for setting up `SystemdLifetime`.

To be added.

## SystemdHostBuilderExtensions.AddSystemd(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddSystemd (this Microsoft.Extensions.DependencyInjection.IServiceCollection services);
```

Configures the lifetime of the `IHost` built from `services` to
`SystemdLifetime`, provides notification messages for application started
and stopping, and configures console logging to the systemd format when running as a systemd service.

Parameters:

- `services`: The `IServiceCollection` used to build the `IHost`.
For example, `HostApplicationBuilder.Services` or the `IServiceCollection` passed to the
`IHostBuilder.ConfigureServices` callback.

Returns: The `services` instance for chaining.

This is context aware and will only activate if it detects the process is running
as a systemd Service or if `NOTIFY_SOCKET` is set.

The console log formatter is enabled when the process is detected as a systemd service.
The `SystemdLifetime` and `SystemdNotifier` are registered when
`NOTIFY_SOCKET` is set or the process is detected as a systemd service.

The systemd service file must be configured with `Type=notify` to enable
notifications. See .

## SystemdHostBuilderExtensions.UseSystemd(IHostBuilder) method

```csharp
public static Microsoft.Extensions.Hosting.IHostBuilder UseSystemd (this Microsoft.Extensions.Hosting.IHostBuilder hostBuilder);
```

Configures the `IHost` lifetime to `SystemdLifetime`,
provides notification messages for application started and stopping,
and configures console logging to the systemd format when running as a systemd service.

Parameters:

- `hostBuilder`: The `IHostBuilder` to configure.

Returns: The `hostBuilder` instance for chaining.

This is context aware and will only activate if it detects the process is running
as a systemd Service or if `NOTIFY_SOCKET` is set.

The console log formatter is enabled when the process is detected as a systemd service.
The `SystemdLifetime` and `SystemdNotifier` are registered when
`NOTIFY_SOCKET` is set or the process is detected as a systemd service.

The systemd service file must be configured with `Type=notify` to enable
notifications. See .
