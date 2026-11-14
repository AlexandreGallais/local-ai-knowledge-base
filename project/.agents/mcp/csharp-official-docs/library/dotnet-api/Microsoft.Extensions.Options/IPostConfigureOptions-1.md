---
title: "IPostConfigureOptions<TOptions> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Options/IPostConfigureOptions`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IPostConfigureOptions<TOptions> interface

Namespace: `Microsoft.Extensions.Options`

```csharp
public interface IPostConfigureOptions<in TOptions> where TOptions : class
```

Represents something that configures the `TOptions` type.

Parameters:

- `TOptions`: Options type being configured.

These are run after all `IConfigureOptions<T>`.

## IPostConfigureOptions<TOptions>.PostConfigure(String, TOptions) method

```csharp
public void PostConfigure (string? name, TOptions options);
```

Configures a `TOptions` instance.

Parameters:

- `name`: The name of the options instance being configured.
- `options`: The options instance to configured.

To be added.
