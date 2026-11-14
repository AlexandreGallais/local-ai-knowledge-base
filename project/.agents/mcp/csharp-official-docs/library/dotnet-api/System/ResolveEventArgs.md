---
title: "ResolveEventArgs class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/ResolveEventArgs.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ResolveEventArgs class

Namespace: `System`

```csharp
public class ResolveEventArgs : EventArgs
```

Provides data for loader resolution events, such as the `AppDomain.TypeResolve`, `AppDomain.ResourceResolve`, `AppDomain.ReflectionOnlyAssemblyResolve`, and `AppDomain.AssemblyResolve` events.

#### Remarks
When the loader cannot resolve an assembly reference and a handler has been provided for the appropriate loader resolution event, the event is raised and the `ResolveEventArgs` contains information about the item to be resolved.

- The `Name` property contains the name of the item to be resolved.
- The `RequestingAssembly` property contains the assembly that requested an assembly that can provide the named item. For more information, see the `RequestingAssembly` property.

## ResolveEventArgs.ResolveEventArgs(String) constructor

```csharp
public ResolveEventArgs (string name);
```

Initializes a new instance of the `ResolveEventArgs` class, specifying the name of the item to resolve.

Parameters:

- `name`: The name of an item to resolve.

#### Remarks
This constructor is typically called only by the common language runtime.

## ResolveEventArgs.ResolveEventArgs(String, Assembly) constructor

```csharp
public ResolveEventArgs (string name, System.Reflection.Assembly? requestingAssembly);
```

Initializes a new instance of the `ResolveEventArgs` class, specifying the name of the item to resolve and the assembly whose dependency is being resolved.

Parameters:

- `name`: The name of an item to resolve.
- `requestingAssembly`: The assembly whose dependency is being resolved.

To be added.

## ResolveEventArgs.Name property

```csharp
public string Name { get; }
```

Gets the name of the item to resolve.

Returns: The name of the item to resolve.

#### Remarks
For the `AssemblyResolve` event, `ResolveEventArgs.Name` is the assembly name before policy is applied.

## ResolveEventArgs.RequestingAssembly property

```csharp
public System.Reflection.Assembly? RequestingAssembly { get; }
```

Gets the assembly whose dependency is being resolved.

Returns: The assembly that requested the item specified by the `ResolveEventArgs.Name` property.

#### Remarks
The assembly that is returned by this property is an assembly that was unable to resolve the item specified by the `Name` property, because the item did not exist in that assembly, in any of its loaded dependencies, or in any dependencies the loader could find through probing.

For example, suppose the current assembly uses the `Assembly.LoadFile` method to load assembly A from a directory outside the probing path, in order to use class CA. Suppose further that class CA uses class CB, in assembly B, and that assembly A has a compile-time reference to assembly B, also located outside the probing path. When the current assembly attempts to instantiate CA, the loader attempts to resolve the reference to assembly B. However, because assembly A was loaded by using the `Assembly.LoadFile` method, the loader cannot resolve the dependency. If there is a handler for the `AssemblyResolve` event, the event is raised, and the `RequestingAssembly` property of the resulting `ResolveEventArgs` object contains assembly A, because assembly A is the assembly that is missing a dependency.

The semantics of the `RequestingAssembly` property vary, depending on how the requesting assembly was loaded:

- Load context: The value of the property might be `null`. The load context is load-order independent, and the identity of the requesting assembly is not necessarily meaningful. A non-null example occurs when the `Type.GetType` method is called and the specified type is not known to the requesting assembly or any of its dependencies.

- Load-from context: The property can be used as a probing hint, but the event handler should not get more than one request for a given assembly name.

- No context (that is, the requesting assembly was loaded by using the `Assembly.LoadFile` method, or as a byte stream, or in mixed mode): The handler can use the `RequestingAssembly` property to load different implementations of the same assembly based on the identity of the requesting assembly.
