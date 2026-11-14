---
title: "ObjectFactory delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/ObjectFactory.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ObjectFactory delegate

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public delegate object ObjectFactory(IServiceProvider serviceProvider, object?[]? arguments);
```

The result of `ActivatorUtilities.CreateFactory`.

Parameters:

- `serviceProvider`: The `IServiceProvider` to get service arguments from.
- `arguments`: Additional constructor arguments.

Returns: The instantiated type.

To be added.
