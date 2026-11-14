---
title: "DistributedContextPropagator+PropagatorSetterCallback delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/DistributedContextPropagator+PropagatorSetterCallback.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DistributedContextPropagator+PropagatorSetterCallback delegate

Namespace: `System.Diagnostics`

```csharp
public delegate void DistributedContextPropagator.PropagatorSetterCallback(object? carrier, string fieldName, string fieldValue);
```

Represents the callback method that's used in propagators' inject methods. This callback is invoked to set the value of a named field.
Propagators may invoke it multiple times in order to set multiple fields.

Parameters:

- `carrier`: The medium used by propagators to write values to.
- `fieldName`: The propagation field name.
- `fieldValue`: The value corresponding to `fieldName`.

To be added.
