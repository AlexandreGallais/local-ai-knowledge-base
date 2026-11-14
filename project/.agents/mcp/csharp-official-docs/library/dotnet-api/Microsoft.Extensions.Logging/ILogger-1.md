---
title: "ILogger<TCategoryName> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging/ILogger`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ILogger<TCategoryName> interface

Namespace: `Microsoft.Extensions.Logging`

```csharp
public interface ILogger<out TCategoryName> : Microsoft.Extensions.Logging.ILogger
```

A generic interface for logging where the category name is derived from the specified
`TCategoryName` type name.
Generally used to enable activation of a named `ILogger` from dependency injection.

Parameters:

- `TCategoryName`: The type whose name is used for the logger category name.

To be added.
