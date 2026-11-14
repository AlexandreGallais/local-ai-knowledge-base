---
title: "IDynamicInterfaceCastable interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/IDynamicInterfaceCastable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IDynamicInterfaceCastable interface

Namespace: `System.Runtime.InteropServices`

```csharp
public interface IDynamicInterfaceCastable
```

Interface used to participate in a type cast failure.

#### Remarks

Implementation of this interface on a value type will be ignored. Only non-value types are allowed to participate in a type cast failure through this interface.

## IDynamicInterfaceCastable.GetInterfaceImplementation(RuntimeTypeHandle) method

```csharp
public RuntimeTypeHandle GetInterfaceImplementation (RuntimeTypeHandle interfaceType);
```

Called during interface dispatch when the given interface type cannot be found in the class's metadata.

Parameters:

- `interfaceType`: The interface type.

Returns: The type that should be used to dispatch for `interfaceType` on the current object.

Exceptions:

- `InvalidOperationException`: The returned type is not an interface type, or it was not marked with the `DynamicInterfaceCastableImplementationAttribute`.

#### Remarks

When this function is called, the cast of this object to the given interface should already have been verified through the `castclass/isinst` instructions.
The returned type must be an interface type and be marked with the `DynamicInterfaceCastableImplementationAttribute`. Otherwise, `InvalidOperationException` will be thrown.

## IDynamicInterfaceCastable.IsInterfaceImplemented(RuntimeTypeHandle, Boolean) method

```csharp
public bool IsInterfaceImplemented (RuntimeTypeHandle interfaceType, bool throwIfNotImplemented);
```

Called when an implementing class instance is cast to an interface type that is not contained in the class's metadata.

Parameters:

- `interfaceType`: The interface type.
- `throwIfNotImplemented`: Indicates if the function should throw an exception instead of returning `false`.

Returns: `true` if this object can be cast to the given interface; otherwise, `false`.

#### Remarks

This is called if casting this object to the given interface type would otherwise fail. Casting here means the IL `isinst` and `castclass` instructions in the case where they are given an interface type as the target type.
If `throwIfNotImplemented` is `false`, this function should avoid throwing exceptions. If `throwIfNotImplemented` is `true` and this function returns `false`, then `InvalidCastException` will be thrown unless an exception is thrown by the implementation.
