---
title: "ContextCallback delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/ContextCallback.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ContextCallback delegate

Namespace: `System.Threading`

```csharp
public delegate void ContextCallback(object? state);
```

Represents a method to be called within a new context.

Parameters:

- `state`: An object containing information to be used by the callback method each time it executes.

#### Remarks
`ContextCallback` is used by the `ExecutionContext.Run` and the `SecurityContext.Run` methods. `ContextCallback` represents the method to be run in the provided context. Upon completion of the method execution, the context is restored to its previous state.

Create the delegate by passing your callback method to the `ContextCallback` constructor. Your method must have the signature shown here.
