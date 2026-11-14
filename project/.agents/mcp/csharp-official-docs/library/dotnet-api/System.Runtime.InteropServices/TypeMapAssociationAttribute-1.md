---
title: "TypeMapAssociationAttribute<TTypeMapGroup> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/TypeMapAssociationAttribute`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TypeMapAssociationAttribute<TTypeMapGroup> class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class TypeMapAssociationAttribute<TTypeMapGroup> : Attribute
```

Represents an attribute that creates a type association between a type and its proxy.

Parameters:

- `TTypeMapGroup`: The type of the type map group.

#### Remarks

Types used in a managed-to-unmanaged interop operation can use `TypeMapAssociationAttribute<T>` to define a conditional link between the source and proxy type. If the source is kept, so is the proxy type. If trimming observes an explicit allocation of the source type, the entry is inserted into the map.

When an application is trimmed, an entry in the Proxy Type Map is included when the "source type" is referenced in one of the following ways in reachable code:

- The argument to the `ldtoken` IL instruction when `DynamicallyAccessedMembersAttribute` is specified with a flag that preserves constructors for the storage location.
- Calls to `Type.GetType` with a constant string representing the type name when `DynamicallyAccessedMembersAttribute` is specified with a flag that preserves constructors.
- The type of a method argument to the `newobj` instruction.
- The generic argument to the `CreateInstance<T>` method.
- The argument to the `box` instruction.
- The argument to the `newarr` instruction.
- The argument to the `mkrefany` instruction.
- The argument to the `refanyval` instruction.

If the type is an interface type and the user could possibly see a `RuntimeTypeHandle` for the type as part of a casting or virtual method resolution operation (such as with `IDynamicInterfaceCastable`), then the following cases also apply:

- The argument to the `isinst` IL instruction.
- The argument to the `castclass` IL instruction.
- The owning type of the method argument to `callvirt` or `ldvirtftn`.

Finally, if the trimming tool determines that it's impossible to retrieve a `Type` instance that represents the "source type" at runtime, then the entry might be omitted from the Proxy Type Map as its existence is unobservable.

> **Important:**
> Conflicting key/value mappings are not allowed.

> **Note:**
> The underlying format of the produced maps is implementation-defined. Different .NET form factors might use different formats. Additionally, it isn't guaranteed that the `TypeMapAttribute<T>`, `TypeMapAssociationAttribute<T>`, and `TypeMapAssemblyTargetAttribute<T>` attributes are present in the final image after a trimming tool has been run.

## TypeMapAssociationAttribute<TTypeMapGroup>.TypeMapAssociationAttribute(Type, Type) constructor

```csharp
public TypeMapAssociationAttribute (Type source, Type proxy);
```

Initializes a new instance of `TypeMapAssociationAttribute<T>`.

Parameters:

- `source`: The target type.
- `proxy`: The type to associate with `source`.

This mapping will only exist in the type map if trimming observes an allocation using the `Type` represented by `source`.
