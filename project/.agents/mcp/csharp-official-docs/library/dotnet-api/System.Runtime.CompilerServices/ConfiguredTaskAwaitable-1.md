---
title: "ConfiguredTaskAwaitable<TResult> struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/ConfiguredTaskAwaitable`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConfiguredTaskAwaitable<TResult> struct

Namespace: `System.Runtime.CompilerServices`

```csharp
public readonly struct ConfiguredTaskAwaitable<TResult>
```

Provides an awaitable object that enables configured awaits on a task.

Parameters:

- `TResult`: The type of the result produced by this `Task<T>`.

#### Remarks
This type is intended for compiler use; do not use it directly in your code.

## ConfiguredTaskAwaitable<TResult>.GetAwaiter() method

```csharp
public System.Runtime.CompilerServices.ConfiguredTaskAwaitable<TResult>.ConfiguredTaskAwaiter GetAwaiter ();
```

Returns an awaiter for this awaitable object.

Returns: The awaiter.

#### Remarks
This method is intended for compiler use; do not use it directly in your code.
