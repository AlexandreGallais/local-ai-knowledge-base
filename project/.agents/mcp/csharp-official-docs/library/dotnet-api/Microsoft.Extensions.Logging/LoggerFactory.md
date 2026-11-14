---
title: "LoggerFactory class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging/LoggerFactory.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LoggerFactory class

Namespace: `Microsoft.Extensions.Logging`

```csharp
public class LoggerFactory : IDisposable, Microsoft.Extensions.Logging.ILoggerFactory
```

Produces instances of `ILogger` classes based on the given providers.

To be added.

## LoggerFactory.LoggerFactory() constructor

```csharp
public LoggerFactory ();
```

Creates a new `LoggerFactory` instance.

To be added.

## LoggerFactory.LoggerFactory(ILoggerProvider>) constructor

```csharp
public LoggerFactory (System.Collections.Generic.IEnumerable<Microsoft.Extensions.Logging.ILoggerProvider> providers);
```

Creates a new `LoggerFactory` instance.

Parameters:

- `providers`: The providers to use in producing `ILogger` instances.

To be added.

## LoggerFactory.LoggerFactory(ILoggerProvider>, LoggerFilterOptions) constructor

```csharp
public LoggerFactory (System.Collections.Generic.IEnumerable<Microsoft.Extensions.Logging.ILoggerProvider> providers, Microsoft.Extensions.Logging.LoggerFilterOptions filterOptions);
```

Creates a new `LoggerFactory` instance.

Parameters:

- `providers`: The providers to use in producing `ILogger` instances.
- `filterOptions`: The filter options to use.

To be added.

## LoggerFactory.LoggerFactory(ILoggerProvider>, LoggerFilterOptions>) constructor

```csharp
public LoggerFactory (System.Collections.Generic.IEnumerable<Microsoft.Extensions.Logging.ILoggerProvider> providers, Microsoft.Extensions.Options.IOptionsMonitor<Microsoft.Extensions.Logging.LoggerFilterOptions> filterOption);
```

Creates a new `LoggerFactory` instance.

Parameters:

- `providers`: The providers to use in producing `ILogger` instances.
- `filterOption`: The filter option to use.

To be added.

## LoggerFactory.LoggerFactory(ILoggerProvider>, LoggerFilterOptions>, LoggerFactoryOptions>) constructor

```csharp
public LoggerFactory (System.Collections.Generic.IEnumerable<Microsoft.Extensions.Logging.ILoggerProvider> providers, Microsoft.Extensions.Options.IOptionsMonitor<Microsoft.Extensions.Logging.LoggerFilterOptions> filterOption, Microsoft.Extensions.Options.IOptions<Microsoft.Extensions.Logging.LoggerFactoryOptions>? options);
```

Creates a new `LoggerFactory` instance.

Parameters:

- `providers`: The providers to use in producing `ILogger` instances.
- `filterOption`: The filter option to use.
- `options`: The `LoggerFactoryOptions`.

To be added.

## LoggerFactory.LoggerFactory(ILoggerProvider>, LoggerFilterOptions>, LoggerFactoryOptions>, IExternalScopeProvider) constructor

```csharp
public LoggerFactory (System.Collections.Generic.IEnumerable<Microsoft.Extensions.Logging.ILoggerProvider> providers, Microsoft.Extensions.Options.IOptionsMonitor<Microsoft.Extensions.Logging.LoggerFilterOptions> filterOption, Microsoft.Extensions.Options.IOptions<Microsoft.Extensions.Logging.LoggerFactoryOptions>? options = default, Microsoft.Extensions.Logging.IExternalScopeProvider? scopeProvider = default);
```

Creates a new `LoggerFactory` instance.

Parameters:

- `providers`: The providers to use in producing `ILogger` instances.
- `filterOption`: The filter option to use.
- `options`: The `LoggerFactoryOptions`.
- `scopeProvider`: The `IExternalScopeProvider`.

To be added.

## LoggerFactory.AddProvider(ILoggerProvider) method

```csharp
public void AddProvider (Microsoft.Extensions.Logging.ILoggerProvider provider);
```

Adds the given provider to those used in creating `ILogger` instances.

Parameters:

- `provider`: The `ILoggerProvider` to add.

Exceptions:

- `ArgumentNullException`: `provider` is `null`.

To be added.

## LoggerFactory.CheckDisposed() method

```csharp
protected virtual bool CheckDisposed ();
```

Check if the factory has been disposed.

Returns: `true` when `LoggerFactory.Dispose` as been called

To be added.

## LoggerFactory.Create(ILoggingBuilder>) method

```csharp
public static Microsoft.Extensions.Logging.ILoggerFactory Create (Action<Microsoft.Extensions.Logging.ILoggingBuilder> configure);
```

Creates new instance of `ILoggerFactory` configured using provided `configure` delegate.

Parameters:

- `configure`: A delegate to configure the `ILoggingBuilder`.

Returns: The `ILoggerFactory` that was created.

To be added.

## LoggerFactory.CreateLogger(String) method

```csharp
public Microsoft.Extensions.Logging.ILogger CreateLogger (string categoryName);
```

Creates an `ILogger` with the given `categoryName`.

Parameters:

- `categoryName`: The category name for messages produced by the logger.

Returns: The `ILogger` that was created.

To be added.

## LoggerFactory.Dispose() method

```csharp
public void Dispose ();
```

Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources.

To be added.
