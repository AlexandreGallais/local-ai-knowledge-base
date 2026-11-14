---
title: "IConfigureNamedOptions<TOptions> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Options/IConfigureNamedOptions`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IConfigureNamedOptions<TOptions> interface

Namespace: `Microsoft.Extensions.Options`

```csharp
public interface IConfigureNamedOptions<in TOptions> : Microsoft.Extensions.Options.IConfigureOptions<in TOptions> where TOptions : class
```

Represents something that configures the `TOptions` type.

Parameters:

- `TOptions`: The options type being configured.

To be added.

## IConfigureNamedOptions<TOptions>.Configure(String, TOptions) method

```csharp
public void Configure (string? name, TOptions options);
```

Configures a `TOptions` instance.

Parameters:

- `name`: The name of the options instance being configured.
- `options`: The options instance to configure.

To be added.
