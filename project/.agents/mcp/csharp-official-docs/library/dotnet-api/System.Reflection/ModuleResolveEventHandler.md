---
title: "ModuleResolveEventHandler delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/ModuleResolveEventHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ModuleResolveEventHandler delegate

Namespace: `System.Reflection`

```csharp
public delegate System.Reflection.Module ModuleResolveEventHandler(object sender, ResolveEventArgs e);
```

Represents the method that will handle the `Assembly.ModuleResolve` event of an `Assembly`.

Parameters:

- `sender`: The assembly that was the source of the event.
- `e`: The arguments supplied by the object describing the event.

Returns: The module that satisfies the request.

If the common language runtime class loader cannot resolve a reference to an internal module of an assembly through normal means, this event is raised. The event handler for this delegate must locate and return a module that satisfies the request.

The following example demonstrates the sequence of execution in which an event handler is called. In this example, Server1 is an external module of the MySample class.

_Code sample not included: ~/snippets/csharp/System.Reflection/ModuleResolveEventHandler/Overview/mysample.cs._
_Code sample not included: ~/snippets/csharp/System.Reflection/ModuleResolveEventHandler/Overview/server1.cs._
To compile and run the example:

1. Compile Server1 using the following command:

```console
   csc /out:subfolder\Server1.netmodule /t:module Server1.cs
```

1. Compile MySample using the following command:

```console
   csc /out:MySample.exe /t:exe /addmodule:subfolder\Server1.netmodule MySample.cs
```

1. Run MySample.exe.

> **Note:**
> The module file Server1.netmodule must be in a subdirectory named "subfolder" for this example to work properly.
