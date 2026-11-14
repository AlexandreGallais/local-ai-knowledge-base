---
title: "FakeHostingExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Hosting/FakeHostingExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FakeHostingExtensions class

Namespace: `Microsoft.Extensions.Hosting`

```csharp
public static class FakeHostingExtensions
```

Extension methods supporting host unit testing scenarios.

To be added.

## FakeHostingExtensions.AddFakeLoggingOutputSink(IHostBuilder, String>) method

```csharp
public static Microsoft.Extensions.Hosting.IHostBuilder AddFakeLoggingOutputSink (this Microsoft.Extensions.Hosting.IHostBuilder builder, Action<string> callback);
```

Adds an action invoked on each log message.

Parameters:

- `builder`: An `IHostBuilder` instance.
- `callback`: The action to invoke on each log message.

Returns: The `IHostBuilder` instance.

To be added.

## FakeHostingExtensions.Configure(IHostBuilder, IHostBuilder>) method

```csharp
public static Microsoft.Extensions.Hosting.IHostBuilder Configure (this Microsoft.Extensions.Hosting.IHostBuilder builder, Action<Microsoft.Extensions.Hosting.IHostBuilder> configure);
```

Exposes `IHostBuilder` for changes via a delegate.

Parameters:

- `builder`: An `IHostBuilder` instance.
- `configure`: Configures the `IHostBuilder` instance.

Returns: The `IHostBuilder` instance.

Designed to ease host configuration in unit tests by defining common configuration methods.

## FakeHostingExtensions.ConfigureAppConfiguration(IHostBuilder, String>[]) method

```csharp
public static Microsoft.Extensions.Hosting.IHostBuilder ConfigureAppConfiguration (this Microsoft.Extensions.Hosting.IHostBuilder builder, params (string key, string value)[] configurations);
```

Adds configuration entries.

Parameters:

- `builder`: An `IHostBuilder` instance.
- `configurations`: A list of key and value tuples that will be used as configuration entries.

Returns: The `IHostBuilder` instance.

To be added.

## FakeHostingExtensions.ConfigureAppConfiguration(IHostBuilder, String, String) method

```csharp
public static Microsoft.Extensions.Hosting.IHostBuilder ConfigureAppConfiguration (this Microsoft.Extensions.Hosting.IHostBuilder builder, string key, string value);
```

Adds a configuration value.

Parameters:

- `builder`: An `IHostBuilder` instance.
- `key`: The configuration key.
- `value`: The configuration value.

Returns: The `IHostBuilder` instance.

To be added.

## FakeHostingExtensions.ConfigureHostConfiguration(IHostBuilder, String>[]) method

```csharp
public static Microsoft.Extensions.Hosting.IHostBuilder ConfigureHostConfiguration (this Microsoft.Extensions.Hosting.IHostBuilder builder, params (string key, string value)[] configurations);
```

Adds configuration entries.

Parameters:

- `builder`: An `IHostBuilder` instance.
- `configurations`: A list of key and value tuples that will be used as configuration entries.

Returns: The `IHostBuilder` instance.

To be added.

## FakeHostingExtensions.ConfigureHostConfiguration(IHostBuilder, String, String) method

```csharp
public static Microsoft.Extensions.Hosting.IHostBuilder ConfigureHostConfiguration (this Microsoft.Extensions.Hosting.IHostBuilder builder, string key, string value);
```

Adds a configuration value.

Parameters:

- `builder`: An `IHostBuilder` instance.
- `key`: The configuration key.
- `value`: The configuration value.

Returns: The `IHostBuilder` instance.

To be added.

## FakeHostingExtensions.GetFakeLogCollector(IHost) method

```csharp
public static Microsoft.Extensions.Logging.Testing.FakeLogCollector GetFakeLogCollector (this Microsoft.Extensions.Hosting.IHost host);
```

Gets the object that collects log records sent to the fake logger.

Parameters:

- `host`: An `IHost` instance.

Returns: The collector that tracks records logged to fake loggers.

Exceptions:

- `InvalidOperationException`: No collector exists in the provider.

To be added.

## FakeHostingExtensions.GetFakeRedactionCollector(IHost) method

```csharp
public static Microsoft.Extensions.Compliance.Testing.FakeRedactionCollector GetFakeRedactionCollector (this Microsoft.Extensions.Hosting.IHost host);
```

Gets the object reporting all redactions performed.

Parameters:

- `host`: An `IHost` instance.

Returns: The collector that tracks redactions performed on log messages.

Exceptions:

- `InvalidOperationException`: No collector exists in the provider.

To be added.

## FakeHostingExtensions.StartAndStopAsync(IHostedService, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task StartAndStopAsync (this Microsoft.Extensions.Hosting.IHostedService service, System.Threading.CancellationToken <example-value> = default);
```

Starts and immediately stops the service.

Parameters:

- `service`: The tested service.
- `cancellationToken`: Cancellation token. See `CancellationToken`.

Returns: A `Task` representing the asynchronous operation.

To be added.
