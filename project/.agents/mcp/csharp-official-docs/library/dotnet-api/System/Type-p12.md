---
title: "Type class (part 12 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Type.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Type class (part 12 of 33)

## Type.GetFields(BindingFlags) method

```csharp
public abstract System.Reflection.FieldInfo[] GetFields (System.Reflection.BindingFlags bindingAttr);
```

When overridden in a derived class, searches for the fields defined for the current `Type`, using the specified binding constraints.

Parameters:

- `bindingAttr`: A bitwise combination of the enumeration values that specify how the search is conducted.

-or-

`BindingFlags.Default` to return an empty array.

Returns: An array of `FieldInfo` objects representing all fields defined for the current `Type` that match the specified binding constraints.

-or-

An empty array of type `FieldInfo`, if no fields are defined for the current `Type`, or if none of the defined fields match the binding constraints.

#### Remarks

For the `GetFields(BindingFlags)` overload to successfully retrieve property information, the `bindingAttr` argument must include at least one of `Instance` and `Static`, along with at least one of `NonPublic` and `Public`.

The following `BindingFlags` filter flags can be used to define which fields to include in the search:

- Specify `BindingFlags.Instance` to include instance methods.

- Specify `BindingFlags.Static` to include static methods.

- Specify `BindingFlags.Public` to include public fields in the search.

- Specify `BindingFlags.NonPublic` to include non-public fields (that is, private, internal, and protected fields) in the search. Only protected and internal fields on base classes are returned; private fields on base classes are not returned.

- Specify `BindingFlags.FlattenHierarchy` to include `public` and `protected` static members up the hierarchy; `private` static members in inherited classes are not included.

- Specify `BindingFlags.Default` alone to return an empty `PropertyInfo` array.

The following `BindingFlags` modifier flags can be used to change how the search works:

- `BindingFlags.DeclaredOnly` to search only the fields declared on the `Type`, not fields that were simply inherited.

See `BindingFlags` for more information.

The `Type.GetFields` method returns fields in a deterministic order based upon the metadata ordering in the assembly.

If the current `Type` represents a constructed generic type, this method returns the `FieldInfo` objects with the type parameters replaced by the appropriate type arguments.

If the current `Type` represents a type parameter in the definition of a generic type or generic method, this method searches the public fields of the class constraint.

#### Examples
The following example shows a use of the `GetFields(BindingFlags)` method.

_Code sample not included: ~/snippets/csharp/System/Type/GetFields/source.cs._

## Type.GetFunctionPointerCallingConventions() method

```csharp
public virtual Type[] GetFunctionPointerCallingConventions ();
```

When overridden in a derived class, returns the calling conventions of the current function pointer `Type`.

Returns: An array of `Type` objects representing all the calling conventions for the current function pointer `Type`.

-or-

An empty array of type `Type`, if no calling conventions are defined for the current function pointer `Type`.

-or-

An empty array of type `Type`, if the current function pointer `Type` is not a modified `Type`. A modified `Type` is obtained from `FieldInfo.GetModifiedFieldType`, `PropertyInfo.GetModifiedPropertyType`, or `ParameterInfo.GetModifiedParameterType`.

Exceptions:

- `InvalidOperationException`: The current type is not a function pointer. That is, the `Type.IsFunctionPointer` property returns `false`.

#### Remarks
This method is provided for designers of managed compilers. For more information on custom modifiers, see classes in the `CompilerServices` namespace.

## Type.GetFunctionPointerParameterTypes() method

```csharp
public virtual Type[] GetFunctionPointerParameterTypes ();
```

When overridden in a derived class, returns the parameter types of the current function pointer `Type`.

Returns: An array of `Type` objects representing all the parameter types for the current function pointer `Type`.

-or-

An empty array of type `Type`, if no parameters are defined for the current function pointer `Type`.

Exceptions:

- `InvalidOperationException`: The current type is not a function pointer. That is, the `Type.IsFunctionPointer` property returns `false`.

To be added.

## Type.GetFunctionPointerReturnType() method

```csharp
public virtual Type GetFunctionPointerReturnType ();
```

When overridden in a derived class, returns the return type of the current function pointer `Type`.

Returns: A `Type` object representing the return type for the current function pointer `Type`.

Exceptions:

- `InvalidOperationException`: The current type is not a function pointer. That is, the `Type.IsFunctionPointer` property returns `false`.

To be added.

## Type.GetGenericArguments() method

```csharp
public virtual Type[] GetGenericArguments ();
```

Returns an array of `Type` objects that represent the type arguments of a closed generic type or the type parameters of a generic type definition.

Returns: An array of `Type` objects that represent the type arguments of a generic type. Returns an empty array if the current type is not a generic type.

Exceptions:

- `NotSupportedException`: The invoked method is not supported in the base class. Derived classes must provide an implementation.

#### Remarks
The array elements are returned in the order in which they appear in the list of type arguments for the generic type.

- If the current type is a closed constructed type (that is, the `ContainsGenericParameters` property returns `false`), the array returned by the `Type.GetGenericArguments` method contains the types that have been assigned to the generic type parameters of the generic type definition.

- If the current type is a generic type definition, the array contains the type parameters.

- If the current type is an open constructed type (that is, the `ContainsGenericParameters` property returns `true`) in which specific types have not been assigned to all of the type parameters and type parameters of enclosing generic types or methods, the array contains both types and type parameters. Use the `IsGenericParameter` property to tell them apart. For a demonstration of this scenario, see the code example for the `ContainsGenericParameters` property.

For a list of the invariant conditions for terms used in generic reflection, see the `IsGenericType` property remarks.

#### Examples
The following code example uses the `Type.GetGenericArguments` method to display the type arguments of a constructed type and the type parameters of its generic type definition.

This code example is part of a larger example provided for the `IsGenericTypeDefinition` property. See the larger example for sample output.

_Code sample not included: ~/snippets/csharp/System/Type/IsGenericParameter/source.cs._

## Type.GetGenericParameterConstraints() method

```csharp
public virtual Type[] GetGenericParameterConstraints ();
```

Returns an array of `Type` objects that represent the constraints on the current generic type parameter.

Returns: An array of `Type` objects that represent the constraints on the current generic type parameter.

Exceptions:

- `InvalidOperationException`: The current `Type` object is not a generic type parameter. That is, the `Type.IsGenericParameter` property returns `false`.

#### Remarks
Each constraint on a generic type parameter is expressed as a `Type` object. Use the `IsClass` property to determine whether a constraint is the base class constraint; if the property returns `false`, the constraint is an interface constraint. If a type parameter has no class constraint and no interface constraints, an empty array is returned.

For a list of the invariant conditions for terms used in generic reflection, see the `IsGenericType` property remarks.

#### Examples
The following code example defines a generic type `Test` with two type parameters that have different constraints. When the program executes, the constraints are examined using the `GenericParameterAttributes` property and the `Type.GetGenericParameterConstraints` method.

_Code sample not included: ~/snippets/csharp/System/Type/GenericParameterAttributes/source.cs._

## Type.GetGenericTypeDefinition() method

```csharp
public virtual Type GetGenericTypeDefinition ();
```

Returns a `Type` object that represents a generic type definition from which the current generic type can be constructed.

Returns: A `Type` object representing a generic type from which the current type can be constructed.

Exceptions:

- `InvalidOperationException`: The current type is not a generic type. That is, `Type.IsGenericType` returns `false`.
- `NotSupportedException`: The invoked method is not supported in the base class. Derived classes must provide an implementation.

#### Remarks
A generic type definition is a template from which other types can be constructed. For example, from the C# generic type definition `G<T>`, you can construct and instantiate the type `G<int>`. Given a `Type` object representing this constructed type, the `Type.GetGenericTypeDefinition` method returns the generic type definition.

If two constructed types are created from the same generic type definition, using the same type arguments, the `Type.GetGenericTypeDefinition` method returns the same `Type` object for both types.

If you call the `Type.GetGenericTypeDefinition` method on a `Type` object that already represents a generic type definition, it returns the current `Type`.

> **Important:**
> An array of generic types is not itself generic. In the C# code `A<int>[] v;` or the Visual Basic code `Dim v() As A(Of Integer)`, the type of variable `v` is not generic. Use `Type.IsGenericType` to determine whether a type is generic before calling `Type.GetGenericTypeDefinition`.

For a list of the invariant conditions for terms used in generic reflection, see the `IsGenericType` property remarks.

#### Examples
The following code example creates an instance of a constructed type by using ordinary instance creation and then uses the `Type.GetType` and `Type.GetGenericTypeDefinition` methods to retrieve the constructed type and the generic type definition. This example uses the generic `Dictionary<T1,T2>` type; the constructed type represents a `Dictionary<T1,T2>` of `Test` objects with string keys.

_Code sample not included: ~/snippets/csharp/System/Type/GetGenericTypeDefinition/source.cs._

## Type.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: The hash code for this instance.

#### Remarks
This method overrides `Object.GetHashCode`.

#### Examples
The following example displays the hash code of the `System.Windows.Forms.Button` class.

_Code sample not included: ~/snippets/csharp/System/Type/GetHashCode/type_gethashcode_getfields.cs._

## Type.GetInterface(String) method

```csharp
public Type? GetInterface (string name);
```

Searches for the interface with the specified name.

Parameters:

- `name`: The string containing the name of the interface to get. For generic interfaces, this is the mangled name.

Returns: An object representing the interface with the specified name, implemented or inherited by the current `Type`, if found; otherwise, `null`.

Exceptions:

- `ArgumentNullException`: `name` is `null`.
- `AmbiguousMatchException`: The current `Type` represents a type that implements the same generic interface with different type arguments.

#### Remarks
The search for `name` is case-sensitive.

If the current `Type` represents a constructed generic type, this method returns the `Type` with the type parameters replaced by the appropriate type arguments.

If the current `Type` represents a type parameter in the definition of a generic type or generic method, this method searches the interface constraints and any interfaces inherited from class or interface constraints.

> **Note:**
> For generic interfaces, the `name` parameter is the mangled name, ending with a grave accent (\`) and the number of type parameters. This is true for both generic interface definitions and constructed generic interfaces. For example, to find `IExample<T>` (`IExample(Of T)` in Visual Basic) or `IExample<string>` (`IExample(Of String)` in Visual Basic), search for ``"IExample`1"``.

#### Examples
The following code example uses the `GetInterface` method to search the `Hashtable` class for the `IDeserializationCallback` interface, and lists the methods of the interface.

The code example also demonstrates the `GetInterface` method overload and the `Type.GetInterfaceMap` method.

_Code sample not included: ~/snippets/csharp/System/Type/GetInterface/type_getinterface.cs._
