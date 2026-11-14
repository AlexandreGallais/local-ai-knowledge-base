---
title: "YieldAwaitable struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/YieldAwaitable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# YieldAwaitable struct

Namespace: `System.Runtime.CompilerServices`

```csharp
public readonly struct YieldAwaitable
```

Provides the context for waiting when asynchronously switching into a target environment.

#### Remarks
This type and its members are intended for use by the compiler.

## YieldAwaitable.GetAwaiter() method

```csharp
public System.Runtime.CompilerServices.YieldAwaitable.YieldAwaiter GetAwaiter ();
```

Retrieves a `YieldAwaiter` object  for this instance of the class.

Returns: The object that is used to monitor the completion of an asynchronous operation.

#### Remarks
This type and its members are intended for use by the compiler.
