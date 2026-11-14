---
title: "FakeLoggerServiceProviderExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/FakeLoggerServiceProviderExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FakeLoggerServiceProviderExtensions class

Namespace: `System`

```csharp
public static class FakeLoggerServiceProviderExtensions
```

Extensions for configuring fake logging, used in unit tests.

To be added.

## FakeLoggerServiceProviderExtensions.GetFakeLogCollector(IServiceProvider) method

```csharp
public static Microsoft.Extensions.Logging.Testing.FakeLogCollector GetFakeLogCollector (this IServiceProvider services);
```

Gets the object that collects log records sent to the fake logger.

Parameters:

- `services`: The service provider containing the logger.

Returns: The collector that tracks records logged to fake loggers.

Exceptions:

- `InvalidOperationException`: No collector exists in the provider.

To be added.
