---
title: "ConfiguredTaskAwaitable struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/ConfiguredTaskAwaitable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConfiguredTaskAwaitable struct

Namespace: `System.Runtime.CompilerServices`

```csharp
public readonly struct ConfiguredTaskAwaitable
```

Provides an awaitable object that enables configured awaits on a task.

#### Remarks
This type is intended for compiler use; do not use it directly in your code.

## ConfiguredTaskAwaitable.GetAwaiter() method

```csharp
public System.Runtime.CompilerServices.ConfiguredTaskAwaitable.ConfiguredTaskAwaiter GetAwaiter ();
```

Returns an awaiter for this awaitable object.

Returns: The awaiter.

#### Remarks
This method is intended for compiler use; do not use it directly in your code.
