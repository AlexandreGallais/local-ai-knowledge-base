---
title: "ResolveEventHandler delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/ResolveEventHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ResolveEventHandler delegate

Namespace: `System`

```csharp
public delegate System.Reflection.Assembly? ResolveEventHandler(object? sender, ResolveEventArgs args);
```

Represents a method that handles the `AppDomain.TypeResolve`, `AppDomain.ResourceResolve`, or `AppDomain.AssemblyResolve` event of an `AppDomain`.

Parameters:

- `sender`: The source of the event.
- `args`: The event data.

Returns: The assembly that resolves the type, assembly, or resource; or `null` if the assembly cannot be resolved.

#### Remarks
If the runtime class loader cannot resolve a reference to an assembly, type, or resource, the corresponding events are raised to give the callback a chance to tell the runtime which assembly the referenced assembly, type, or resource is in. It is the responsibility of the `ResolveEventHandler` to return the assembly that resolves the type, assembly, or resource, or to return null if the assembly is not recognized. For more information, see Resolving Assembly Loads and the `ResourceResolve`, `AssemblyResolve`, and `ReflectionOnlyAssemblyResolve` events.

> **Important:**
> The `ResolveEventHandler` event is raised for all assemblies, including resource assemblies. If the operating system is localized, the handler might be called multiple times: once for each culture in the fallback chain.

Every derived class of `Delegate` and `MulticastDelegate` has a constructor and an `Invoke` method.
