---
title: "AssemblyLoadEventArgs class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/AssemblyLoadEventArgs.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AssemblyLoadEventArgs class

Namespace: `System`

```csharp
public class AssemblyLoadEventArgs : EventArgs
```

Provides data for the `AppDomain.AssemblyLoad` event.

To be added.

## AssemblyLoadEventArgs.AssemblyLoadEventArgs(Assembly) constructor

```csharp
public AssemblyLoadEventArgs (System.Reflection.Assembly loadedAssembly);
```

Initializes a new instance of the `AssemblyLoadEventArgs` class using the specified `Assembly`.

Parameters:

- `loadedAssembly`: An instance that represents the currently loaded assembly.

To be added.

## AssemblyLoadEventArgs.LoadedAssembly property

```csharp
public System.Reflection.Assembly LoadedAssembly { get; }
```

Gets an `Assembly` that represents the currently loaded assembly.

Returns: An instance of `Assembly` that represents the currently loaded assembly.

#### Remarks
The value of this property is set by the common language runtime when the `AssemblyLoad` event occurs.
