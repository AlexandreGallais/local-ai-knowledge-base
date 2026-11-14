---
title: "ConsoleLoggerProvider class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging.Console/ConsoleLoggerProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConsoleLoggerProvider class

Namespace: `Microsoft.Extensions.Logging.Console`

```csharp
public class ConsoleLoggerProvider : IDisposable, Microsoft.Extensions.Logging.ILoggerProvider, Microsoft.Extensions.Logging.ISupportExternalScope
```

A provider of `ConsoleLogger` instances.

To be added.

## ConsoleLoggerProvider.ConsoleLoggerProvider(ConsoleLoggerOptions>) constructor

```csharp
public ConsoleLoggerProvider (Microsoft.Extensions.Options.IOptionsMonitor<Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions> options);
```

Creates an instance of `ConsoleLoggerProvider`.

Parameters:

- `options`: The options to create `ConsoleLogger` instances with.

To be added.

## ConsoleLoggerProvider.ConsoleLoggerProvider(ConsoleLoggerOptions>, ConsoleFormatter>) constructor

```csharp
public ConsoleLoggerProvider (Microsoft.Extensions.Options.IOptionsMonitor<Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions> options, System.Collections.Generic.IEnumerable<Microsoft.Extensions.Logging.Console.ConsoleFormatter>? formatters);
```

Creates an instance of `ConsoleLoggerProvider`.

Parameters:

- `options`: The options to create `ConsoleLogger` instances with.
- `formatters`: Log formatters added for `ConsoleLogger` instances.

To be added.

## ConsoleLoggerProvider.CreateLogger(String) method

```csharp
public Microsoft.Extensions.Logging.ILogger CreateLogger (string name);
```

Creates a new  instance.

Returns: The instance of <xref data-throw-if-not-resolved="true" uid="Microsoft.Extensions.Logging.ILogger"></xref> that was created.

To be added.

## ConsoleLoggerProvider.Dispose() method

```csharp
public void Dispose ();
```

Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources.

To be added.

## ConsoleLoggerProvider.SetScopeProvider(IExternalScopeProvider) method

```csharp
public void SetScopeProvider (Microsoft.Extensions.Logging.IExternalScopeProvider scopeProvider);
```

Sets external scope information source for logger provider.

Parameters:

- `scopeProvider`: The provider of scope data.

To be added.
