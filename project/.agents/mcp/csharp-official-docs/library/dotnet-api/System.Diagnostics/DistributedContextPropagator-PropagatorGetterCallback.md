---
title: "DistributedContextPropagator+PropagatorGetterCallback delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/DistributedContextPropagator+PropagatorGetterCallback.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DistributedContextPropagator+PropagatorGetterCallback delegate

Namespace: `System.Diagnostics`

```csharp
public delegate void DistributedContextPropagator.PropagatorGetterCallback(object? carrier, string fieldName, out string? fieldValue, out IEnumerable<string>? fieldValues);
```

Represents the callback method that's used in the extract methods of propagators. The callback is invoked to look up the value of a named field.

Parameters:

- `carrier`: The medium used by propagators to read values from.
- `fieldName`: The propagation field name.
- `fieldValue`: When this method returns, contains the value that corresponds to `fieldName`. The value is non-`null` if there is only one value for the input field name.
- `fieldValues`: When this method returns, contains a collection of values that correspond to `fieldName`. The value is non-`null` if there is more than one value for the input field name.

To be added.
