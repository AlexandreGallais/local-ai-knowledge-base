---
title: "ComDefaultInterfaceAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/ComDefaultInterfaceAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ComDefaultInterfaceAttribute class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class ComDefaultInterfaceAttribute : Attribute
```

Specifies a default interface to expose to COM. This class cannot be inherited.

#### Remarks
Compilers do not necessarily respect the order in which interfaces are implemented. For example, suppose you have the following code:

```cs
interface IBase {}

interface IDerived : IBase {}

class MyClass : IBase, IDerived {}  
```  

The compiler emits the implemented interfaces as `IDerived, IBase`. The ordering of interfaces is important  when using the `ClassInterfaceAttribute` class with `[ClassInterface(ClassInterfaceType.None)]` to expose an explicit interface as the default interface. Regardless of the specified `ClassInterfaceType`, use the `ComDefaultInterfaceAttribute` attribute to specify which interface should be recognized as the default.

Note that the type decorated by the `ComDefaultInterfaceAttribute` must actually derive from the interface specified as the default interface.

## ComDefaultInterfaceAttribute.ComDefaultInterfaceAttribute(Type) constructor

```csharp
public ComDefaultInterfaceAttribute (Type defaultInterface);
```

Initializes a new instance of the `ComDefaultInterfaceAttribute` class with the specified `Type` object as the default interface exposed to COM.

Parameters:

- `defaultInterface`: A `Type` value indicating the default interface to expose to COM.

#### Remarks
The `defaultInterface` type passed to the constructor must be visible to COM.

## ComDefaultInterfaceAttribute.Value property

```csharp
public Type Value { get; }
```

Gets the `Type` object that specifies the default interface to expose to COM.

Returns: The `Type` object that specifies the default interface to expose to COM.

To be added.
