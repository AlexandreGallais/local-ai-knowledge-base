---
title: "ModuleHandle struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/ModuleHandle.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ModuleHandle struct

Namespace: `System`

```csharp
public struct ModuleHandle : IEquatable<ModuleHandle>
```

Represents a runtime handle for a module.

#### Remarks
The `ModuleHandle.ResolveFieldHandle`, `ModuleHandle.ResolveMethodHandle`, and `ModuleHandle.ResolveTypeHandle` methods provide efficient resolution of metadata tokens to runtime handles for fields, methods, and types in the current module.

## ModuleHandle.MDStreamVersion property

```csharp
public int MDStreamVersion { get; }
```

Gets the metadata stream version.

Returns: A 32-bit integer representing the metadata stream version. The high-order two bytes represent the major version number, and the low-order two bytes represent the minor version number.

#### Remarks

> **Note:**
> For more information on the metadata header, see the metadata specification in Partition II of ECMA-335 Common Language Infrastructure (CLI).

## ModuleHandle.Equals(ModuleHandle) method

```csharp
public bool Equals (ModuleHandle handle);
```

Returns a `Boolean` value indicating whether the specified `ModuleHandle` structure is equal to the current `ModuleHandle`.

Parameters:

- `handle`: The `ModuleHandle` structure to be compared with the current `ModuleHandle`.

Returns: `true` if `handle` is equal to the current `ModuleHandle` structure; otherwise `false`.

To be added.

## ModuleHandle.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a `Boolean` value indicating whether the specified object is a `ModuleHandle` structure, and equal to the current `ModuleHandle`.

Parameters:

- `obj`: The object to be compared with the current `ModuleHandle` structure.

Returns: `true` if `obj` is a `ModuleHandle` structure, and is equal to the current `ModuleHandle` structure; otherwise, `false`.

To be added.

## ModuleHandle.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer that is the hash code for this instance.

To be added.

## ModuleHandle.GetRuntimeFieldHandleFromMetadataToken(Int32) method

```csharp
public RuntimeFieldHandle GetRuntimeFieldHandleFromMetadataToken (int fieldToken);
```

Returns a runtime handle for the field identified by the specified metadata token.

Parameters:

- `fieldToken`: A metadata token that identifies a field in the module.

Returns: A `RuntimeFieldHandle` for the field identified by `fieldToken`.

To be added.

## ModuleHandle.GetRuntimeMethodHandleFromMetadataToken(Int32) method

```csharp
public RuntimeMethodHandle GetRuntimeMethodHandleFromMetadataToken (int methodToken);
```

Returns a runtime method handle for the method or constructor identified by the specified metadata token.

Parameters:

- `methodToken`: A metadata token that identifies a method or constructor in the module.

Returns: A `RuntimeMethodHandle` for the method or constructor identified by `methodToken`.

To be added.

## ModuleHandle.GetRuntimeTypeHandleFromMetadataToken(Int32) method

```csharp
public RuntimeTypeHandle GetRuntimeTypeHandleFromMetadataToken (int typeToken);
```

Returns a runtime type handle for the type identified by the specified metadata token.

Parameters:

- `typeToken`: A metadata token that identifies a type in the module.

Returns: A `RuntimeTypeHandle` for the type identified by `typeToken`.

To be added.

## ModuleHandle.op_Equality(ModuleHandle, ModuleHandle) method

```csharp
public static bool operator == (ModuleHandle left, ModuleHandle right);
```

Tests whether two `ModuleHandle` structures are equal.

Parameters:

- `left`: The `ModuleHandle` structure to the left of the equality operator.
- `right`: The `ModuleHandle` structure to the right of the equality operator.

Returns: `true` if the `ModuleHandle` structures are equal; otherwise, `false`.

The equivalent method for this operator is `Equals`.

## ModuleHandle.op_Inequality(ModuleHandle, ModuleHandle) method

```csharp
public static bool operator != (ModuleHandle left, ModuleHandle right);
```

Tests whether two `ModuleHandle` structures are unequal.

Parameters:

- `left`: The `ModuleHandle` structure to the left of the inequality operator.
- `right`: The `ModuleHandle` structure to the right of the inequality operator.

Returns: `true` if the `ModuleHandle` structures are unequal; otherwise, `false`.

The equivalent method for this operator is `Equals`.

## ModuleHandle.ResolveFieldHandle(Int32) method

```csharp
public RuntimeFieldHandle ResolveFieldHandle (int fieldToken);
```

Returns a runtime handle for the field identified by the specified metadata token.

Parameters:

- `fieldToken`: A metadata token that identifies a field in the module.

Returns: A `RuntimeFieldHandle` for the field identified by `fieldToken`.

Exceptions:

- `BadImageFormatException`: `fieldToken` is not a valid token in the scope of the current module.

-or-

`fieldToken` is not a token for a field in the scope of the current module.

-or-

`fieldToken` identifies a field whose parent `TypeSpec` has a signature containing element type `var` or `mvar`.
- `InvalidOperationException`: The method is called on an empty field handle.

#### Remarks
To resolve a metadata token that identifies a field whose parent `TypeSpec` has a signature containing element type `var` or `mvar`, use the `ResolveFieldHandle` method overload, which allows you to supply the necessary context.

> **Note:**
> Information about metadata tokens can be found in the Common Language Infrastructure (CLI) documentation, especially "<example-value>".

## ModuleHandle.ResolveFieldHandle(Int32, RuntimeTypeHandle[], RuntimeTypeHandle[]) method

```csharp
public RuntimeFieldHandle ResolveFieldHandle (int fieldToken, RuntimeTypeHandle[]? typeInstantiationContext, RuntimeTypeHandle[]? methodInstantiationContext);
```

Returns a runtime field handle for the field identified by the specified metadata token, specifying the generic type arguments of the type and method where the token is in scope.

Parameters:

- `fieldToken`: A metadata token that identifies a field in the module.
- `typeInstantiationContext`: An array of `RuntimeTypeHandle` structures representing the generic type arguments of the type where the token is in scope, or `null` if that type is not generic.
- `methodInstantiationContext`: An array of `RuntimeTypeHandle` structures representing the generic type arguments of the method where the token is in scope, or `null` if that method is not generic.

Returns: A `RuntimeFieldHandle` for the field identified by `fieldToken`.

Exceptions:

- `BadImageFormatException`: `fieldToken` is not a valid token in the scope of the current module.

-or-

`fieldToken` is not a token for a field in the scope of the current module.

-or-

`fieldToken` identifies a field whose parent `TypeSpec` has a signature containing element type `var` or `mvar`.
- `InvalidOperationException`: The method is called on an empty field handle.
- `ArgumentOutOfRangeException`: `fieldToken` is not a valid token.

#### Remarks

> **Note:**
> Information about metadata tokens can be found in the Common Language Infrastructure (CLI) documentation, especially "<example-value>".

## ModuleHandle.ResolveMethodHandle(Int32) method

```csharp
public RuntimeMethodHandle ResolveMethodHandle (int methodToken);
```

Returns a runtime method handle for the method or constructor identified by the specified metadata token.

Parameters:

- `methodToken`: A metadata token that identifies a method or constructor in the module.

Returns: A `RuntimeMethodHandle` for the method or constructor identified by `methodToken`.

Exceptions:

- `BadImageFormatException`: `methodToken` is not a valid metadata token for a method in the current module.

-or-

`methodToken` is not a token for a method or constructor in the scope of the current module.

-or-

`methodToken` is a `MethodSpec` whose signature contains element type `var` or `mvar`.
- `InvalidOperationException`: The method is called on an empty method handle.

#### Remarks
To resolve a metadata token for a `MethodSpec` whose signature contains element type `var` or `mvar`, use the `ResolveMethodHandle` method overload, which allows you to supply the necessary context.

> **Note:**
> Information about metadata tokens can be found in the Common Language Infrastructure (CLI) documentation, especially "<example-value>".

## ModuleHandle.ResolveMethodHandle(Int32, RuntimeTypeHandle[], RuntimeTypeHandle[]) method

```csharp
public RuntimeMethodHandle ResolveMethodHandle (int methodToken, RuntimeTypeHandle[]? typeInstantiationContext, RuntimeTypeHandle[]? methodInstantiationContext);
```

Returns a runtime method handle for the method or constructor identified by the specified metadata token, specifying the generic type arguments of the type and method where the token is in scope.

Parameters:

- `methodToken`: A metadata token that identifies a method or constructor in the module.
- `typeInstantiationContext`: An array of `RuntimeTypeHandle` structures representing the generic type arguments of the type where the token is in scope, or `null` if that type is not generic.
- `methodInstantiationContext`: An array of `RuntimeTypeHandle` structures representing the generic type arguments of the method where the token is in scope, or `null` if that method is not generic.

Returns: A `RuntimeMethodHandle` for the method or constructor identified by `methodToken`.

Exceptions:

- `BadImageFormatException`: `methodToken` is not a valid metadata token for a method in the current module.

-or-

`methodToken` is not a token for a method or constructor in the scope of the current module.

-or-

`methodToken` is a `MethodSpec` whose signature contains element type `var` or `mvar`.
- `InvalidOperationException`: The method is called on an empty method handle.
- `ArgumentOutOfRangeException`: `methodToken` is not a valid token.

#### Remarks

> **Note:**
> Information about metadata tokens can be found in the Common Language Infrastructure (CLI) documentation, especially "<example-value>".

## ModuleHandle.ResolveTypeHandle(Int32) method

```csharp
public RuntimeTypeHandle ResolveTypeHandle (int typeToken);
```

Returns a runtime type handle for the type identified by the specified metadata token.

Parameters:

- `typeToken`: A metadata token that identifies a type in the module.

Returns: A `RuntimeTypeHandle` for the type identified by `typeToken`.

Exceptions:

- `BadImageFormatException`: `typeToken` is not a valid metadata token for a type in the current module.

-or-

`typeToken` is not a token for a type in the scope of the current module.

-or-

`typeToken` is a `TypeSpec` whose signature contains element type `var` or `mvar`.
- `InvalidOperationException`: The method is called on an empty type handle.

#### Remarks
To resolve a metadata token for a `TypeSpec` whose signature contains element type `var` or `mvar`, use the `ResolveTypeHandle` method overload, which allows you to supply the necessary context.

> **Note:**
> Information about metadata tokens can be found in the Common Language Infrastructure (CLI) documentation, especially "<example-value>".

## ModuleHandle.ResolveTypeHandle(Int32, RuntimeTypeHandle[], RuntimeTypeHandle[]) method

```csharp
public RuntimeTypeHandle ResolveTypeHandle (int typeToken, RuntimeTypeHandle[]? typeInstantiationContext, RuntimeTypeHandle[]? methodInstantiationContext);
```

Returns a runtime type handle for the type identified by the specified metadata token, specifying the generic type arguments of the type and method where the token is in scope.

Parameters:

- `typeToken`: A metadata token that identifies a type in the module.
- `typeInstantiationContext`: An array of `RuntimeTypeHandle` structures representing the generic type arguments of the type where the token is in scope, or `null` if that type is not generic.
- `methodInstantiationContext`: An array of `RuntimeTypeHandle` structures objects representing the generic type arguments of the method where the token is in scope, or `null` if that method is not generic.

Returns: A `RuntimeTypeHandle` for the type identified by `typeToken`.

Exceptions:

- `BadImageFormatException`: `typeToken` is not a valid metadata token for a type in the current module.

-or-

`typeToken` is not a token for a type in the scope of the current module.

-or-

`typeToken` is a `TypeSpec` whose signature contains element type `var` or `mvar`.
- `InvalidOperationException`: The method is called on an empty type handle.
- `ArgumentOutOfRangeException`: `typeToken` is not a valid token.

#### Remarks

> **Note:**
> Information about metadata tokens can be found in the Common Language Infrastructure (CLI) documentation, especially "<example-value>".

## ModuleHandle.EmptyHandle field

```csharp
public static readonly ModuleHandle EmptyHandle;
```

Represents an empty module handle.

To be added.
