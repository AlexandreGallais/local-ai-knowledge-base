---
title: "Type class (part 31 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Type.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Type class (part 31 of 33)

## Type.IsAssignableTo(Type) method

```csharp
public bool IsAssignableTo (Type? targetType);
```

Determines whether the current type can be assigned to a variable of the specified `targetType`.

Parameters:

- `targetType`: The type to compare with the current type.

Returns: `true` if any of the following conditions is true:

- The current instance and `targetType` represent the same type.

- The current type is derived either directly or indirectly from `targetType`. The current type is derived directly from `targetType` if it inherits from `targetType`; the current type is derived indirectly from `targetType` if it inherits from a succession of one or more classes that inherit from `targetType`.

-   `targetType` is an interface that the current type implements.

- The current type is a generic type parameter, and `targetType` represents one of the constraints of the current type.

- The current type represents a value type, and `targetType` represents `Nullable<c>` (`Nullable(Of c)` in Visual Basic).

`false` if none of these conditions are true, or if `targetType` is `null`.

To be added.

## Type.IsByRefImpl() method

```csharp
protected abstract bool IsByRefImpl ();
```

When overridden in a derived class, implements the `Type.IsByRef` property and determines whether the `Type` is passed by reference.

Returns: `true` if the `Type` is passed by reference; otherwise, `false`.

To be added.

## Type.IsCOMObjectImpl() method

```csharp
protected abstract bool IsCOMObjectImpl ();
```

When overridden in a derived class, implements the `Type.IsCOMObject` property and determines whether the `Type` is a COM object.

Returns: `true` if the `Type` is a COM object; otherwise, `false`.

#### Remarks
This method returns `false` for COM interfaces because they are not objects. COM interfaces can be implemented by .NET objects.

## Type.IsContextfulImpl() method

```csharp
protected virtual bool IsContextfulImpl ();
```

Implements the `Type.IsContextful` property and determines whether the `Type` can be hosted in a context.

Returns: `true` if the `Type` can be hosted in a context; otherwise, `false`.

#### Remarks
This method can be overridden by a derived class.

A context intercepts calls to the class members and enforce policies that are applied to the class, such as synchronization.

#### Examples
The following example demonstrates a use of the `IsContextfulImpl` method.

_Code sample not included: ~/snippets/csharp/System/Type/IsContextfulImpl/type_iscontextfulimpl.cs._

## Type.IsEnumDefined(Object) method

```csharp
public virtual bool IsEnumDefined (object value);
```

Returns a value that indicates whether the specified value exists in the current enumeration type.

Parameters:

- `value`: The value to be tested.

Returns: `true` if the specified value is a member of the current enumeration type; otherwise, `false`.

Exceptions:

- `ArgumentException`: The current type is not an enumeration.
- `ArgumentNullException`: `value` is `null`.
- `InvalidOperationException`: `value` is of a type that cannot be the underlying type of an enumeration.

To be added.

## Type.IsEquivalentTo(Type) method

```csharp
public virtual bool IsEquivalentTo (Type? other);
```

Determines whether two COM types have the same identity and are eligible for type equivalence.

Parameters:

- `other`: The COM type that is tested for equivalence with the current type.

Returns: `true` if the COM types are equivalent; otherwise, `false`. This method also returns `false` if one type is in an assembly that is loaded for execution, and the other is in an assembly that is loaded into the reflection-only context.

#### Remarks

The common language runtime supports the embedding of type information for COM types directly into managed assemblies, instead of requiring the managed assemblies to obtain type information for COM types from interop assemblies. Because the embedded type information includes only the types and members that are actually used by a managed assembly, two managed assemblies might have very different views of the same COM type. Each managed assembly has a different `Type` object to represent its view of the COM type. The common language runtime supports type equivalence between these different views for interfaces, structures, enumerations, and delegates.

Type equivalence means that a COM object that is passed from one managed assembly to another can be cast to the appropriate managed type in the receiving assembly. The `Type.IsEquivalentTo` method enables an assembly to determine that a COM object obtained from another assembly has the same COM identity as one of the first assembly's own embedded interop types, and thus can be cast to that type.

For more information, see Type Equivalence and Embedded Interop Types.

## Type.IsInstanceOfType(Object) method

```csharp
public virtual bool IsInstanceOfType (object? o);
```

Determines whether the specified object is an instance of the current `Type`.

Parameters:

- `o`: The object to compare with the current type.

Returns: `true` if the current `Type` is in the inheritance hierarchy of the object represented by `o`, or if the current `Type` is an interface that `o` implements. `false` if neither of these conditions is the case, if `o` is `null`, or if the current `Type` is an open generic type (that is, `Type.ContainsGenericParameters` returns `true`).

#### Remarks
This method can be overridden by a derived class.

> **Note:**
> A constructed type is not an instance of its generic type definition. That is, `MyGenericList<int>` (`MyGenericList(Of Integer)` in Visual Basic) is not an instance of `MyGenericList<T>` (`MyGenericList(Of T)` in Visual Basic).

#### Examples
The following example demonstrates the use of the `IsInstanceOfType` method.

_Code sample not included: ~/snippets/csharp/System/Type/IsInstanceOfType/testisinstanceoftype.cs._

## Type.IsMarshalByRefImpl() method

```csharp
protected virtual bool IsMarshalByRefImpl ();
```

Implements the `Type.IsMarshalByRef` property and determines whether the `Type` is marshaled by reference.

Returns: `true` if the `Type` is marshaled by reference; otherwise, `false`.

#### Remarks
This method can be overridden by a derived class.

#### Examples
The following example determines whether the given type is marshaled by reference and displays the result.

_Code sample not included: ~/snippets/csharp/System/Type/IsMarshalByRefImpl/type_ismarshalbyrefimpl.cs._

## Type.IsPointerImpl() method

```csharp
protected abstract bool IsPointerImpl ();
```

When overridden in a derived class, implements the `Type.IsPointer` property and determines whether the `Type` is a pointer.

Returns: `true` if the `Type` is a pointer; otherwise, `false`.

To be added.

## Type.IsPrimitiveImpl() method

```csharp
protected abstract bool IsPrimitiveImpl ();
```

When overridden in a derived class, implements the `Type.IsPrimitive` property and determines whether the `Type` is one of the primitive types.

Returns: `true` if the `Type` is one of the primitive types; otherwise, `false`.

#### Remarks
The primitive types are `Boolean`, `Byte`, `SByte`, `Int16`, `UInt16`, `Int32`, `UInt32`, `Int64`, `UInt64`, `Char`, `Double`, and `Single`.

#### Examples
The following example determines whether the given type is a primitive type and displays the result.

_Code sample not included: ~/snippets/csharp/System/Type/IsPrimitiveImpl/type_isprimitiveimpl.cs._

## Type.IsSubclassOf(Type) method

```csharp
public virtual bool IsSubclassOf (Type c);
```

Determines whether the current `Type` derives from the specified `Type`.

Parameters:

- `c`: The type to compare with the current type.

Returns: `true` if the current `Type` derives from `c`; otherwise, `false`. This method also returns `false` if `c` and the current `Type` are equal.

Exceptions:

- `ArgumentNullException`: `c` is `null`.

#### Remarks
You can call the `Type.IsSubclassOf` method to determine any of the following:

- Whether one class derives from another.

- Whether a type derives from `ValueType`. However, the `Type.IsValueType` is a more efficient way to determine whether a type is a value type.

- Whether a type derives from `Enum`. However, the `Type.IsEnum` method is a more efficient way to determine whether a type is an enumeration.

- Whether a type is a delegate, that is, whether it derives from either `Delegate` or `MulticastDelegate`.

The `Type.IsSubclassOf` method cannot be used to determine whether an interface derives from another interface, or whether a class implements an interface. Use the `Type.IsAssignableFrom` method for that purpose, as the following example shows.

_Code sample not included: ~/snippets/csharp/System/Type/IsSubclassOf/issubclassof_interface1.cs._

If the current `Type` represents a type parameter in the definition of a generic type or generic method, it derives from its class constraint or from `Object` if it has no class constraint.

> **Note:**
> Except when used with interfaces, `Type.IsSubclassOf` is the converse of `Type.IsAssignableFrom`. That is, if `t1.IsSubclassOf(t2)` is `true`, then `t2.IsAssignableFrom(t1)` is also `true`.

This method can be overridden by a derived class.

#### Examples
The following example creates a class named `Class1` and a derived class named `DerivedC1`. It calls the `Type.IsSubclassOf` method to show that `DerivedC1` is a subclass of `Class1`.

_Code sample not included: ~/snippets/csharp/System/Type/IsSubclassOf/testissubclassof.cs._

## Type.IsValueTypeImpl() method

```csharp
protected virtual bool IsValueTypeImpl ();
```

Implements the `Type.IsValueType` property and determines whether the `Type` is a value type; that is, not a class or an interface.

Returns: `true` if the `Type` is a value type; otherwise, `false`.

#### Remarks
This method is provided to enable the implementation of alternate type systems. it's not generally used in application code.

## Type.MakeArrayType() method

```csharp
public virtual Type MakeArrayType ();
```

Returns a `Type` object representing a one-dimensional array of the current type, with a lower bound of zero.

Returns: A `Type` object representing a one-dimensional array of the current type, with a lower bound of zero.

Exceptions:

- `NotSupportedException`: The invoked method is not supported in the base class. Derived classes must provide an implementation.
- `TypeLoadException`: The current type is `TypedReference`.

-or-

The current type is a `ByRef` type. That is, `Type.IsByRef` returns `true`.

#### Remarks
The `Type.MakeArrayType` method provides a way to generate array types whose element types are computed at run time.

**Note** The common language runtime makes a distinction between vectors (that is, one-dimensional arrays that are always zero-based) and multidimensional arrays. A vector, which always has only one dimension, is not the same as a multidimensional array that happens to have only one dimension. This method overload can only be used to create vector types, and it's the only way to create a vector type. Use the `MakeArrayType` method overload to create multidimensional array types.

## Type.MakeArrayType(Int32) method

```csharp
public virtual Type MakeArrayType (int rank);
```

Returns a `Type` object representing an array of the current type, with the specified number of dimensions.

Parameters:

- `rank`: The number of dimensions for the array. This number must be less than or equal to 32.

Returns: An object representing an array of the current type, with the specified number of dimensions.

Exceptions:

- `IndexOutOfRangeException`: `rank` is invalid. For example, 0 or negative.
- `NotSupportedException`: The invoked method is not supported in the base class.
- `TypeLoadException`: The current type is `TypedReference`.

-or-

The current type is a `ByRef` type. That is, `Type.IsByRef` returns `true`.

-or-

`rank` is greater than 32.

#### Remarks
The `Type.MakeArrayType` method provides a way to generate array types whose element types are computed at run time.

> **Note:**
> The common language runtime makes a distinction between vectors (that is, one-dimensional arrays that are always zero-based) and multidimensional arrays. A vector, which always has only one dimension, is not the same as a multidimensional array that happens to have only one dimension. You cannot use this method overload to create a vector type; if `rank` is 1, this method overload returns a multidimensional array type that happens to have one dimension. Use the `MakeArrayType` method overload to create vector types.

## Type.MakeByRefType() method

```csharp
public virtual Type MakeByRefType ();
```

Returns a `Type` object that represents the current type when passed as a `ref` parameter (`ByRef` parameter in Visual Basic).

Returns: A `Type` object that represents the current type when passed as a `ref` parameter (`ByRef` parameter in Visual Basic).

Exceptions:

- `NotSupportedException`: The invoked method is not supported in the base class.
- `TypeLoadException`: The current type is `TypedReference`.

-or-

The current type is a `ByRef` type. That is, `Type.IsByRef` returns `true`.

#### Remarks
The `Type.MakeByRefType` method provides a way to generate `ref` types (`ByRef` in Visual Basic) for parameter lists.

Using the syntax of Microsoft intermediate language (MSIL), if the current `Type` object represents `Int32`, this method returns a `Type` object representing `Int32&`.

#### Examples
The following code example creates array, `ref` (`ByRef` in Visual Basic), and pointer types for the `Test` class.

_Code sample not included: ~/snippets/csharp/System/Type/MakeByRefType/source.cs._

## Type.MakeFunctionPointerSignatureType(Type, Type[], Boolean, Type[]) method

```csharp
public static Type MakeFunctionPointerSignatureType (Type returnType, Type[]? parameterTypes, bool isUnmanaged = false, Type[]? callingConventions = default);
```

To be added.

Parameters:

- `returnType`: To be added.
- `parameterTypes`: To be added.
- `isUnmanaged`: To be added.
- `callingConventions`: To be added.

Returns: To be added.

To be added.

## Type.MakeFunctionPointerType(Type[], Boolean) method

```csharp
public virtual Type MakeFunctionPointerType (Type[]? parameterTypes, bool isUnmanaged = false);
```

To be added.

Parameters:

- `parameterTypes`: To be added.
- `isUnmanaged`: To be added.

Returns: To be added.

To be added.
