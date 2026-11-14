---
title: "IServiceScopeFactory interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/IServiceScopeFactory.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IServiceScopeFactory interface

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public interface IServiceScopeFactory
```

Creates instances of `IServiceScope`, which is used to create
services within a scope.

To be added.

## IServiceScopeFactory.CreateScope() method

```csharp
public Microsoft.Extensions.DependencyInjection.IServiceScope CreateScope ();
```

Create an `IServiceScope` that
contains an `IServiceProvider` used to resolve dependencies from a
newly created scope.

Returns: An `IServiceScope` controlling the
lifetime of the scope. Once this is disposed, any scoped services and any transient services
that have been resolved from the
`IServiceScope.ServiceProvider` will also be disposed.

To be added.
