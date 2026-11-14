---
title: "IOptionsFactory<TOptions> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Options/IOptionsFactory`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IOptionsFactory<TOptions> interface

Namespace: `Microsoft.Extensions.Options`

```csharp
public interface IOptionsFactory<TOptions> where TOptions : class
```

Creates `TOptions` instances.

Parameters:

- `TOptions`: The type of options being requested.

To be added.

## IOptionsFactory<TOptions>.Create(String) method

```csharp
public TOptions Create (string name);
```

Returns a configured `TOptions` instance with the given `name`.

Parameters:

- `name`: The name of the `TOptions` instance to create.

Returns: The created `TOptions` instance with the given `name`.

To be added.
