---
title: "IServiceScope interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/IServiceScope.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IServiceScope interface

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public interface IServiceScope : IDisposable
```

Defines a disposable service scope.

The `IDisposable.Dispose` method ends the scope lifetime. Once Dispose
is called, any scoped services and any transient services that have been resolved from
`IServiceScope.ServiceProvider` will be
disposed.

## IServiceScope.ServiceProvider property

```csharp
public IServiceProvider ServiceProvider { get; }
```

Gets the `IServiceProvider` used to resolve dependencies from the scope.

Returns: To be added.

To be added.
