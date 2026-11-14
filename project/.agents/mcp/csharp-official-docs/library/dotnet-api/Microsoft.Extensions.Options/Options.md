---
title: "Options class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Options/Options.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Options class

Namespace: `Microsoft.Extensions.Options`

```csharp
public static class Options
```

Helper class for options.

To be added.

## Options.Create<TOptions>(TOptions) method

```csharp
public static Microsoft.Extensions.Options.IOptions<TOptions> Create<TOptions> (TOptions options) where TOptions : class;
```

Creates a wrapper around an instance of `TOptions` to return itself as an `IOptions<T>`.

Parameters:

- `TOptions`: Options type.
- `options`: Options object.

Returns: Wrapped options object.

To be added.

## Options.DefaultName field

```csharp
public static readonly string DefaultName;
```

The default name used for options instances: "".

To be added.
