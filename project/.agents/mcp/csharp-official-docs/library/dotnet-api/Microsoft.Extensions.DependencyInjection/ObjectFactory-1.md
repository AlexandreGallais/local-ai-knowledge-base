---
title: "ObjectFactory<T> delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/ObjectFactory`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ObjectFactory<T> delegate

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public delegate T ObjectFactory<out T>(IServiceProvider serviceProvider, object?[]? arguments);
```

Returns the result of `ActivatorUtilities.CreateFactory<T>`, which is a delegate that specifies a factory method to call to instantiate an instance of type `T`.

Parameters:

- `T`: The type of the instance that's returned.
- `serviceProvider`: The `IServiceProvider` to get service arguments from.
- `arguments`: Additional constructor arguments.

Returns: An instance of type `T`.

To be added.
