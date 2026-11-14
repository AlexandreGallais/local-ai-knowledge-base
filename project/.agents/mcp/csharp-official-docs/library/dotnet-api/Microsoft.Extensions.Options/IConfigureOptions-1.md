---
title: "IConfigureOptions<TOptions> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Options/IConfigureOptions`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IConfigureOptions<TOptions> interface

Namespace: `Microsoft.Extensions.Options`

```csharp
public interface IConfigureOptions<in TOptions> where TOptions : class
```

Represents something that configures the `TOptions` type.

Parameters:

- `TOptions`: The options type being configured.

These are run before all `IPostConfigureOptions<T>`.

## IConfigureOptions<TOptions>.Configure(TOptions) method

```csharp
public void Configure (TOptions options);
```

Configures a `TOptions` instance.

Parameters:

- `options`: The options instance to configure.

To be added.
