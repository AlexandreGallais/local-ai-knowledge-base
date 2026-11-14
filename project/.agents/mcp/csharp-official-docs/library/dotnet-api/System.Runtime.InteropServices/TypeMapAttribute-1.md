---
title: "TypeMapAttribute<TTypeMapGroup> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/TypeMapAttribute`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TypeMapAttribute<TTypeMapGroup> class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class TypeMapAttribute<TTypeMapGroup> : Attribute
```

Represents an attribute that defines type mapping between a string and a type.

Parameters:

- `TTypeMapGroup`: The type of the type map group.

#### Remarks

Types involved in unmanaged-to-managed interop operations can be referenced in a `TypeMapAttribute<T>` assembly attribute that declares the external type system name, a target type, and optionally a "trim target" to determine if the target type should be included in the map. If the constructor that doesn't take a trim target is used, the entry is always emitted into the type map.

When an application is trimmed, an entry in the External Type Map is included when the "trim target" type is referenced in one of the following ways in reachable code:

- The argument to the `ldtoken` IL instruction.
- The argument to the `unbox` IL instruction.
- The argument to the `unbox.any` IL instruction.
- The argument to the `isinst` IL instruction.
- The argument to the `castclass` IL instruction.
- The argument to the `box` instruction. (If the trimming tool can determine that this box doesn't escape and could be stack allocated, it can ignore this `box` instruction and any corresponding `unbox` or `unbox.any` instructions.)
- The argument to the `mkrefany` instruction.
- The argument to the `refanyval` instruction.
- The argument to the `newarr` instruction.
- The type of a method argument to the `newobj` instruction if it's a class type.
- The owning type of an instance method argument to `call` or `ldftn`, or the owning type of any method argument to `callvirt` or `ldvirtftn`. If the owning type is an interface and the trimming tool can determine that there'<example-value>'s free to interpret the method token <example-value> as though it's the method on the only implementing type.
- The generic argument to the `CreateInstance<T>` method.
- Calls to `Type.GetType` with a constant string representing the type name.

Many of these instructions can be passed a generic parameter. In that case, the trimming tool should consider type arguments of instantiations of that type as having met one of these rules and include any entries with those types as "trim target" types.

> **Important:**
> Conflicting key/value mappings are not allowed.

> **Note:**
> The underlying format of the produced maps is implementation-defined. Different .NET form factors might use different formats. Additionally, it isn't guaranteed that the `TypeMapAttribute<T>`, `TypeMapAssociationAttribute<T>`, and `TypeMapAssemblyTargetAttribute<T>` attributes are present in the final image after a trimming tool has been run.

## TypeMapAttribute<TTypeMapGroup>.TypeMapAttribute(String, Type) constructor

```csharp
public TypeMapAttribute (string value, Type target);
```

Initializes a new instance of `TypeMapAttribute<T>`.

Parameters:

- `value`: The string representation of the key.
- `target`: The type value.

This mapping is unconditionally inserted into the type map.

## TypeMapAttribute<TTypeMapGroup>.TypeMapAttribute(String, Type, Type) constructor

```csharp
public TypeMapAttribute (string value, Type target, Type trimTarget);
```

Initializes a new instance of `TypeMapAttribute<T>`.

Parameters:

- `value`: The string representation of key.
- `target`: The type value.
- `trimTarget`: The type used by the trimmer to determine type map inclusion.

This mapping is only included in the type map if trimming observes a type check using the `Type` represented by `trimTarget`.
