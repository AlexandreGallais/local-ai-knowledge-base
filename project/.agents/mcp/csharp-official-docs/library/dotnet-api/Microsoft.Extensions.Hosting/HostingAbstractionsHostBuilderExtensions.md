---
title: "HostingAbstractionsHostBuilderExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Hosting/HostingAbstractionsHostBuilderExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HostingAbstractionsHostBuilderExtensions class

Namespace: `Microsoft.Extensions.Hosting`

```csharp
public static class HostingAbstractionsHostBuilderExtensions
```

Provides extension methods for the `IHostBuilder` from the hosting abstractions package.

To be added.

## HostingAbstractionsHostBuilderExtensions.Start(IHostBuilder) method

```csharp
public static Microsoft.Extensions.Hosting.IHost Start (this Microsoft.Extensions.Hosting.IHostBuilder hostBuilder);
```

Builds and starts the host.

Parameters:

- `hostBuilder`: The `IHostBuilder` to start.

Returns: The started `IHost`.

To be added.

## HostingAbstractionsHostBuilderExtensions.StartAsync(IHostBuilder, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<Microsoft.Extensions.Hosting.IHost> StartAsync (this Microsoft.Extensions.Hosting.IHostBuilder hostBuilder, System.Threading.CancellationToken <example-value> = default);
```

Builds and starts the host.

Parameters:

- `hostBuilder`: The `IHostBuilder` to start.
- `cancellationToken`: A `CancellationToken` that can be used to cancel the start.

Returns: The started `IHost`.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `HostingAbstractionsHostBuilderExtensions.Start`.
