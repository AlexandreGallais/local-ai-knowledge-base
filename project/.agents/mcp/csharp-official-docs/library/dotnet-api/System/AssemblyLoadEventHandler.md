---
title: "AssemblyLoadEventHandler delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/AssemblyLoadEventHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AssemblyLoadEventHandler delegate

Namespace: `System`

```csharp
public delegate void AssemblyLoadEventHandler(object? sender, AssemblyLoadEventArgs args);
```

Represents the method that handles the `AppDomain.AssemblyLoad` event of an `AppDomain`.

Parameters:

- `sender`: The source of the event.
- `args`: An `AssemblyLoadEventArgs` that contains the event data.

#### Remarks
An `AssemblyLoadEventHandler` is used to specify the methods that are invoked in response to an `AssemblyLoad` event. To associate an instance of `AssemblyLoadEventHandler` with an event, add the instance to the event. The methods referenced by the `AssemblyLoadEventHandler` are invoked whenever an assembly is loaded, until the `AssemblyLoadEventHandler` is removed from the event.
