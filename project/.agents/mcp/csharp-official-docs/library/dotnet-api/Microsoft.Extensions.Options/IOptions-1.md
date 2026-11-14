---
title: "IOptions<TOptions> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Options/IOptions`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IOptions<TOptions> interface

Namespace: `Microsoft.Extensions.Options`

```csharp
public interface IOptions<out TOptions> where TOptions : class
```

Retrieves configured `TOptions` instances.

Parameters:

- `TOptions`: The type of options being requested.

To be added.

## IOptions<TOptions>.Value property

```csharp
public TOptions Value { get; }
```

Gets the default configured `TOptions` instance.

Returns: To be added.

To be added.
