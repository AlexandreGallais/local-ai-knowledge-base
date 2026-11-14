---
title: "NullLoggerFactory class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging.Abstractions/NullLoggerFactory.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NullLoggerFactory class

Namespace: `Microsoft.Extensions.Logging.Abstractions`

```csharp
public class NullLoggerFactory : IDisposable, Microsoft.Extensions.Logging.ILoggerFactory
```

An `ILoggerFactory` used to create an instance of
`NullLogger` that logs nothing.

To be added.

## NullLoggerFactory.NullLoggerFactory() constructor

```csharp
public NullLoggerFactory ();
```

Creates a new `NullLoggerFactory` instance.

To be added.

## NullLoggerFactory.AddProvider(ILoggerProvider) method

```csharp
public void AddProvider (Microsoft.Extensions.Logging.ILoggerProvider provider);
```

Adds an  to the logging system.

Parameters:

- `provider`: The <xref data-throw-if-not-resolved="true" uid="Microsoft.Extensions.Logging.ILoggerProvider"></xref>.

This method ignores the parameter and does nothing.

## NullLoggerFactory.CreateLogger(String) method

```csharp
public Microsoft.Extensions.Logging.ILogger CreateLogger (string name);
```

Creates a new  instance.

Returns: A new <xref data-throw-if-not-resolved="true" uid="Microsoft.Extensions.Logging.ILogger"></xref> instance.

This returns a `NullLogger` instance that logs nothing.

## NullLoggerFactory.Dispose() method

```csharp
public void Dispose ();
```

Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources.

To be added.

## NullLoggerFactory.Instance field

```csharp
public static readonly Microsoft.Extensions.Logging.Abstractions.NullLoggerFactory Instance;
```

Returns the shared instance of `NullLoggerFactory`.

To be added.
